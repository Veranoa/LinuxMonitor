/* 
* @file ViewFooter.tsx
* Copyright (c) 2023 Yun LIU
*/
import { Layout } from "antd";
import React from "react";

const { Footer } = Layout;

const ViewFooter = () => {
  return (
    <Footer style={{ textAlign: "right" }}>
      <strong style={{ userSelect: "none" }}>
        Provided by CCF GLCC LMP Program.
      </strong>
    </Footer>
  );
};

export default ViewFooter;