import React, { useEffect } from "react";
import type { FormProps } from "antd";
import { Button, Form, Input, Select } from "antd";
import { userStore } from "@/store/users-store";
import { useUsers } from "@/hooks/use-users";
import { IUserFields } from "@/types/users-type";

const UserForm: React.FC = () => {
  const { createUserMutation: createUser, isPending } = useUsers();
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
        label="Name"
        name="name"
        rules={[{ required: true, message: "Please input your name!" }]}
      >
        <Input onChange={(e) => setUserField({ name: e.target.value })} />
      </Form.Item>

      <Form.Item<IUserFields>
        label="Email"
        name="email"
        rules={[
          { required: true, message: "Please input your email!" },
          { type: "email", message: "Please enter a valid email!" },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item<IUserFields>
        label="Gender"
        name="gender"
        rules={[{ required: true, message: "Please select your gender!" }]}
      >
        <Select
          placeholder="Select gender"
          onChange={(value) => setUserField({ gender: value })}
        >
          <Select.Option value="male">Male</Select.Option>
          <Select.Option value="female">Female</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item<IUserFields>
        label="Status"
        name="status"
        rules={[{ required: true, message: "Please select your status!" }]}
      >
        <Select
          placeholder="Select status"
          onChange={(value) => setUserField({ status: value })}
        >
          <Select.Option value="active">Active</Select.Option>
          <Select.Option value="inactive">Inactive</Select.Option>
        </Select>
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

export default UserForm;
