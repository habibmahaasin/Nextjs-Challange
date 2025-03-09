import React, { useEffect } from "react";
import type { FormProps } from "antd";
import { Button, Form, Input, Select } from "antd";
import { userStore } from "@/store/users-store";
import { useUsers } from "@/hooks/use-users";
import { IUserFields } from "@/types/users-type";

const PostForm: React.FC = () => {
  const { mutate: createUser, isPending } = useUsers();
  const { data, setUserField } = userStore();

  const onFinish: FormProps<IUserFields>["onFinish"] = (values) => {
    createUser({ data: values, token: data.token });
  };

  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(data);
  }, [data, form]);

  return (
    <Form
      name="basic"
      form={form}
      style={{ maxWidth: 1200 }}
      onFinish={onFinish}
      layout="vertical"
      autoComplete="off"
      initialValues={data}
      onValuesChange={(_, allValues) => setUserField(allValues)}
    >
      <Form.Item<IUserFields>
        label="Title"
        // name="title"
        rules={[{ required: true, message: "Please input your title!" }]}
      >
        <Input onChange={(e) => setUserField({ name: e.target.value })} />
      </Form.Item>

      <Form.Item<IUserFields>
        label="Title"
        // name="title"
        rules={[{ required: true, message: "Please input your title!" }]}
      >
        <Input.TextArea
          onChange={(e) => setUserField({ name: e.target.value })}
        />
      </Form.Item>

      <Form.Item className="w-full">
        <Button
          type="primary"
          htmlType="submit"
          className="w-full"
          loading={isPending}
        >
          Add User and Continue
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PostForm;
