/* 
* @file index.tsx
* Copyright (c) 2023 Yun LIU
*/
import "./index.css";
import "./customed.css";

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./components/App";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
        <App />
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById("root"),
);

reportWebVitals();
