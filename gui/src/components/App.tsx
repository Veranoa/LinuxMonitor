/* 
* @file App.tsx
* Copyright (c) 2023 Yun LIU
*/
import "./App.css";
import { Affix, Layout } from "antd";
import React from "react";
import ViewFooter from "./ViewFooter";
import Home from "./views/Home";
import Scripts from "./views/Scripts";
import Overview from "./views/Overview";
import Parameters from "./views/Parameters";
import SiderBar from "./SiderBar";
import { Routes, Route } from "react-router-dom"; // 注意这里引入的是 Routes 而不是 Switch

const { Content } = Layout;

const App: React.FC = () => {
  return (
    <div className="App">
      <Layout>
        <Affix>
          <SiderBar />
        </Affix>
        <Layout className="site-layout">
          <Content className="site-layout-background" style={{ margin: '24px 16px 0', overflow: 'initial' }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Scripts" element={<Scripts />} />
              <Route path="/Overview" element={<Overview />} />
              <Route path="/Parameters" element={<Parameters />} />
            </Routes>
          </Content>
          <ViewFooter />
        </Layout>
      </Layout>
    </div>
  );
};

export default App;
