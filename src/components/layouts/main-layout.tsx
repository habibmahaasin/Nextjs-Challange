import React, { useState } from "react";
import { DesktopOutlined, PieChartOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu, theme } from "antd";
import { usePathname, useRouter } from "next/navigation";

const { Content, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode
): MenuItem {
  return {
    key,
    icon,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Dashboard", "/", <PieChartOutlined />),
  getItem("Posts", "/posts", <DesktopOutlined />),
];

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const router = useRouter();
  const pathname = usePathname();

  const handleMenu = (e: any) => {
    router.push(e.key);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Desktop Sidebar */}
      <Sider
        className="hidden md:block"
        collapsible
        collapsed={collapsed}
        theme="light"
        onCollapse={setCollapsed}
        style={{
          position: "fixed",
          height: "100vh",
          left: 0,
          top: 0,
          bottom: 0,
          overflow: "auto",
        }}
      >
        <Menu
          theme="light"
          selectedKeys={[pathname]}
          mode="inline"
          items={items}
          className="!pt-[24px]"
          onClick={handleMenu}
        />
      </Sider>

      {/* Main Content */}
      <Layout
        style={{
          marginLeft: collapsed ? 80 : 200,
          transition: "margin-left 0.2s",
        }}
        className="!ml-0 md:ml-[80px] md:!ml-[200px]"
      >
        <Content style={{ margin: "16px", paddingTop: 12, paddingBottom: 12 }}>
          <div
            style={{
              padding: 24,
              minHeight: "100%",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              marginBottom: 24,
            }}
          >
            {children}
          </div>
        </Content>

        <div className="fixed bottom-0 left-0 w-full bg-white shadow-md md:hidden">
          <Menu
            mode="horizontal"
            selectedKeys={[pathname]}
            onClick={handleMenu}
            className="flex justify-around"
            items={
              items.map((item) => ({
                key: item?.key,
                label: (
                  <div className="flex flex-col items-center">
                    <span className="text-xs">{item?.key}</span>
                  </div>
                ),
              })) as MenuItem[]
            }
          />
        </div>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
