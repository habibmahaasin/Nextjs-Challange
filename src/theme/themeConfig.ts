import type { ThemeConfig } from "antd";
import { theme } from "antd";

export const lightTheme: ThemeConfig = {
  algorithm: theme.defaultAlgorithm,
  token: {
    colorPrimary: "#1890ff",
    colorBgBase: "#ffffff",
  },
};

export const darkTheme: ThemeConfig = {
  algorithm: theme.darkAlgorithm,
  token: {
    colorPrimary: "#1890ff",
    colorBgBase: "#141414",
  },
};
