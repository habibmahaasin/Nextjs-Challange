"use client";

import React from "react";
import { message } from "antd";

export type MessageType = "success" | "error" | "warning";

export const showMessage = (type: MessageType, content: string) => {
  message.open({
    type,
    content,
  });
};

const GlobalMessage: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();

  return <>{contextHolder}</>;
};

export default GlobalMessage;
