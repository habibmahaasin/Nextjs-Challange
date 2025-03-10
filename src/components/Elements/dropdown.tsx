import React from "react";
import { SettingOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";

const items: MenuProps["items"] = [
  {
    key: "1",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.antgroup.com"
      >
        Update
      </a>
    ),
  },
  {
    key: "4",
    danger: true,
    label: "Delete",
  },
];

const DropdownMenu: React.FC = () => (
  <Dropdown menu={{ items }}>
    <a onClick={(e) => e.preventDefault()}>
      <Space>
        <SettingOutlined />
      </Space>
    </a>
  </Dropdown>
);

export default DropdownMenu;
