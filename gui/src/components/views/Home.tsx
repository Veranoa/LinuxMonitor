
/* 
* @file Home.tsx
* Copyright (c) 2023 Yun LIU
*/
import {SnippetsOutlined} from "@ant-design/icons"
import { Space } from "antd";
import React from "react";

const HomePage = () => {

  return (
    <Space direction="vertical">
       <SnippetsOutlined style={{marginTop:200, fontSize: 100}} className="New Project"/>
       <p>New Project</p>
    </Space>
   
  );
};

export default (HomePage);