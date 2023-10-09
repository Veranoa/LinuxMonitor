const { app, BrowserWindow, nativeTheme, ipcMain } = require('electron')
const path = require('path')
const url = require('url')
const { ipcMessage } = require("../src/common/messages");
const { EVAL_ALTER_TIME } = require("../src/common/constants");

// check if it's in development mode
const isDevelopment = process.env.ELECTRON_ENV === "development";
// check if it's in evaluation mode
const isEval = app.getVersion().toLowerCase().indexOf("eval") !== -1;
// check if it's exteral launched backend
const ExtralBackend = process.env.EXTERNAL_BACKEND;

let mainWindow;
let quitFlag = false;

function createWindow(backend) {
  nativeTheme.themeSource = 'dark'; // set electron to dark mode
  mainWindow = new BrowserWindow({
    show: false,
    width: 1500,
    height: 1000,
    icon: path.join(__dirname, "../public/resources/icons/256x256.png"),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true
    }
  })
  module.exports.mainWindow = mainWindow;
  // show the browser window when it's ready
  mainWindow.once('ready-to-show', () => {
    mainWindow.maximize()
    mainWindow.show()
  })

  if (isDevelopment) {
    mainWindow.webContents.openDevTools()
  }

  if (isDevelopment) {
    // for debugging with Electron
    mainWindow.loadURL(`http://localhost:3000?backend=${backend}`);
  } else {
    mainWindow.loadURL(`${url.format({
      pathname: path.join(__dirname, "..", `index.html`),
      protocol: 'file:',
      slashes: true
    })}?backend=${backend}`);
  }

  if (isEval) {
    /**
     * after use the evaluation package for EVAL_ALTER_TIME, 
     * show the eval alter every 20 minutes.
     */
    setTimeout(() => {
      setInterval(() => {
        mainWindow.webContents.send(ipcMessage.SEND_EVAL_ALTER);
      }, 20 * 60 * 1000 /** milliseconds */);
    }, EVAL_ALTER_TIME);
  }

  // trigger event before closing the window
  mainWindow.on('close', function (e) {
    if (!quitFlag && mainWindow) {
      e.preventDefault();
      mainWindow.webContents.send(ipcMessage.APP_BEFORE_QUIT);
    }
  });

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

const log = require('electron-log');
log.transports.file.fileName = "error.log"
ipcMain.handle(ipcMessage.ERROR_LOG, (event, message) => {
  log.error(message);
});

const debugLog = log.create('debug');
debugLog.transports.file.fileName = "debug.log"
ipcMain.handle(ipcMessage.DEBUG_LOG, (event, message) => {
  debugLog.info(message);
});

ipcMain.handle(ipcMessage.APP_QUIT, () => {
  quitFlag = true;
  mainWindow = null;
  app.quit();
});

function handleBackendStatusChanged(started) {
  const { MenuID, enableMenu } = require("./components/menu");
  enableMenu(MenuID.VIEW_BACKEND, started);
};

function backendStart() {
  return new Promise((resolve, reject) => {
    let started = false;
    serverProc = require("child_process").fork(
      require.resolve("audio-middleware"),
      [],
      { silent: true, env: { EDGE_TYPE: "electron" } },
    );
    serverProc.stdout.on('data', (data) => {
      const output = data.toString().trim();
      if (output === undefined) {
        return;
      }
      console.log(`Backend Server: ${output}`);
      // Check for the server having started properly
      if (output.includes("Your server is listening on port")) {
        console.log(`Backend Server: successfully started`);
        if (!started) {
          started = true;
          resolve(/http.*(?=\))/.exec(output)[0]);
        } else {
          mainWindow.webContents.send(ipcMessage.SERVER_RESTARTED);
        }
      }
      if (output.includes("died with code:")) {
        reject(`Backend Server: stopped`);
      }
    });
    serverProc.stderr.on('data', (data) => {
      const output = data.toString().trim();
      if (output.includes("Error: bind EADDRINUSE null:")) reject("One or more of Backend server ports are already in use.");
      reject(`Backend Server (stderr): ${output}`);
    });
    serverProc.on('exit', (code, sig) => {
      // finishing
      reject(`Backend Server exited! ${code || "no code"} ${sig || "no signal"}`);
    });
    serverProc.on("error", (error) => {
      // error handling
      reject(error);
    });
  });
}

app
  .whenReady()
  .then(() => {
    const uiStart = (output) => {
      createWindow(output);
      // import menu after mainWindow is ready
      const { createMenu } = require('./components/menu')
      createMenu(output);
      handleBackendStatusChanged(output !== undefined);
    };

    if (ExtralBackend === undefined) {
      backendStart().then((output) => {
        uiStart(output);
      }).catch((error) => {
        uiStart();
        console.log(`Unable to start Backend Server! ${error}`);
      });
    } else {
      uiStart(ExtralBackend);
      console.log(`External backend '${ExtralBackend}' is listening`);
    }
    
  })
  .catch(console.error);

// Get rid of the electron warning message
// "The default value of app.allowRendererProcessReuse is deprecated, it is currently "false"."
app.allowRendererProcessReuse = true;

app
  .on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
  // Quit when all windows are closed.
  .on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
module.exports = {
  mainWindow,
  isEval,
}

