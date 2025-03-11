import React from "react";
import { Card, theme, Typography } from "antd";

const { Title, Text } = Typography;
const { useToken } = theme;

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const { token } = useToken();
  return (
    <div
      className="w-full h-[100svh] flex items-center justify-center p-4 md:p-0"
      style={{ backgroundColor: token.colorBgBase }}
    >
      <Card style={{ width: 400 }} className="shadow-xl">
        <div className="w-full flex flex-col gap-0 mb-4">
          <Title level={3} className="text-center font-bold !mb-0">
            Authentication
          </Title>
          <Text className="text-center">
            Please login with gorest token to continue
          </Text>
        </div>
        {children}
      </Card>
    </div>
  );
};

export default AuthLayout;
