/* 
* @file SiderBar.tsx
* Copyright (c) 2023 Yun LIU
*/
import {
  ControlOutlined,
  HighlightOutlined,
  HomeOutlined,
  BuildOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Space } from "antd";
import logo from "assets/CCF.png";
import logo2 from "assets/GitLink.png";

import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const { Sider } = Layout;

const SiderBar = () => {
  const location = useLocation();
  const [current, setCurrent] = useState<string>(location.pathname);

  const onMenuClick = (event: any) => {
    setCurrent(event?.key);
  };

  const menuItems = [
    {
      key: "/",
      icon: <HomeOutlined />,
      label: "Home",
      link: "/",
    },
    {
      key: "/Overview",
      icon: <ControlOutlined />,
      label: "Overview",
      link: "/Overview",
    },
    {
      key: "/Scripts",
      icon: <HighlightOutlined />,
      label: "Scripts",
      link: "/Scripts",
    },
    
    {
      key: "/Parameters",
      icon: <BuildOutlined />,
      label: "Parameters",
      link: "/Parameters",
    },
    // Add more menu items as needed
  ];

  return (
    <Sider className="siderbar-style" style={{ height: "100vh" }}>
      <Space direction="vertical" style={{ marginTop: 20, marginBottom: 20 }}>
        <img
          className="CCF-logo"
          style={{ marginTop: 20, width: "100px" }}
          src={logo}
          alt="logo"
        />
        <img
          className="GLCC-logo"
          style={{ width: "120px", marginBottom: 10 }}
          src={logo2}
          alt="logo2"
        />
        <h3
         style={{ color: 'rgba(255, 255, 255,255)' }}>
          <b>QueueMonitor</b>
        </h3>
      </Space>
      <Menu mode="inline" defaultSelectedKeys={["/"]} selectedKeys={[current]} onClick={onMenuClick}>
        {menuItems.map((item) => (
          <Menu.Item key={item.key} icon={item.icon}>
            <Link to={item.link}>{item.label}</Link>
          </Menu.Item>
        ))}
      </Menu>
    </Sider>
  );
};

export default SiderBar;
