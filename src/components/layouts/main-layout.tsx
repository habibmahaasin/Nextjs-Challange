import React from "react";
import { Layout, theme } from "antd";

const { Content } = Layout;

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content
        style={{
          padding: 24,
        }}
      >
        <div
          style={{
            padding: 24,
            height: "100%",
            minHeight: "calc(100vh - 48px)",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </div>
      </Content>
    </Layout>
  );
};

export default MainLayout;
