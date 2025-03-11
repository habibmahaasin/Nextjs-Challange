import React from "react";
import {
  Avatar,
  Button,
  Dropdown,
  Layout,
  MenuProps,
  message,
  Switch,
  theme,
  Typography,
} from "antd";
import PostsFormModal from "../Modules/posts-form-modal";
import { UserOutlined } from "@ant-design/icons";
import { useTheme } from "@/pages/_app";
import { usePathname } from "next/navigation";
import { authStore } from "@/store/auth-store";
import { useRouter } from "nextjs-toploader/app";

const { Header, Content } = Layout;
const { Text } = Typography;

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { theme: themeToggle, toggleTheme } = useTheme();
  const {
    token: { colorBgContainer, colorBgBase, borderRadiusLG },
  } = theme.useToken();
  const pathname = usePathname();
  const { logout } = authStore();
  const router = useRouter();

  const items: MenuProps["items"] = [
    {
      key: "1",
      danger: true,
      label: (
        <Button
          type="text"
          className="w-full"
          onClick={() => {
            logout();
            router.push("/login");
            message.success("Logout success");
          }}
        >
          Logout
        </Button>
      ),
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }} className="relative">
      <Header
        className="fixed top-0 w-full z-50 !px-4 md:!px-6 flex items-center"
        style={{
          background: themeToggle === "dark" ? colorBgBase : "#f5f5f5",
        }}
      >
        <div
          className={`w-full flex items-center ${pathname === "/posts" ? "justify-between" : "justify-end"}`}
        >
          {pathname === "/posts" && <PostsFormModal type="create" />}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Text className="!m-0">Mode</Text>
              <Switch
                checkedChildren="Dark"
                unCheckedChildren="Light"
                checked={themeToggle === "dark"}
                onChange={toggleTheme}
              />
            </div>

            <Dropdown
              menu={{ items }}
              placement="bottomRight"
              trigger={["click"]}
              className="cursor-pointer"
            >
              <Avatar shape="square" icon={<UserOutlined />} />
            </Dropdown>
          </div>
        </div>
      </Header>

      <Content className="p-0 mt-12 md:p-6">
        <div
          style={{
            padding: 24,
            height: "100%",
            minHeight: "calc(100vh - 64px)",
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
