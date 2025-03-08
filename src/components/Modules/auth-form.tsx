import React, { useEffect, useState } from "react";
import type { FormProps } from "antd";
import { Button, Form, Input } from "antd";
import { useLogin } from "@/hooks/use-auth";
import { IUsersResponse } from "@/services/users-services";
import UserFormModal from "./user-form-modal";
import { userStore } from "@/store/user-store";
import Cookies from "js-cookie";
import { useRouter } from "nextjs-toploader/app";

type FieldType = {
  name: string;
  token: string;
};

const AuthForm: React.FC = () => {
  const { mutate: loginUser, isPending } = useLogin();
  const [open, setOpen] = useState(false);
  const { setUserField, data } = userStore();
  const [form] = Form.useForm();
  const router = useRouter();

  useEffect(() => {
    form.setFieldsValue(data);
  }, [data, form]);

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    loginUser(values, {
      onSuccess: (data: IUsersResponse[]) => {
        if (!data.find((item) => item.name === values.name)) {
          setOpen(true);
        } else {
          Cookies.set("token", values.token);
          router.push("/");
        }
      },
    });
  };

  return (
    <>
      <UserFormModal open={open} setOpen={setOpen} />
      <Form
        form={form}
        name="basic"
        style={{ maxWidth: 1200 }}
        onFinish={onFinish}
        layout="vertical"
        autoComplete="off"
        onValuesChange={(_, allValues) => setUserField(allValues)}
      >
        <Form.Item<FieldType>
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input placeholder="input your name" />
        </Form.Item>

        <Form.Item<FieldType>
          label="Token"
          name="token"
          rules={[{ required: true, message: "Please input your token!" }]}
        >
          <Input.Password placeholder="input your token" />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={isPending}
            className="w-full mt-4"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default AuthForm;
