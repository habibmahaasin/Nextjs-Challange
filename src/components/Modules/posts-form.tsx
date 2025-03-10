import React, { useEffect } from "react";
import type { FormProps } from "antd";
import { Button, Form, Input, Select } from "antd";
import { IPostsField } from "@/types/posts-type";
import { postsStore } from "@/store/posts-store";
import { usePosts } from "@/hooks/use-posts";

const PostForm = ({
  setOpen,
  type,
}: {
  setOpen: (open: boolean) => void;
  type: "create" | "update";
}) => {
  const { data, setPostsField } = postsStore();
  const { createPostMutation, isCreating, updatePostMutation, isUpdating } =
    usePosts();

  const onFinish: FormProps<IPostsField>["onFinish"] = () => {
    if (type === "create") {
      createPostMutation(data, {
        onSuccess: () => {
          setOpen(false);
          setPostsField({
            ...data,
            title: "",
            body: "",
          });
        },
      });
    } else if (type === "update") {
      updatePostMutation(data, {
        onSuccess: () => {
          setOpen(false);
          setPostsField({
            ...data,
            title: "",
            body: "",
          });
        },
      });
    }
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
      onValuesChange={(_, allValues) => setPostsField(allValues)}
    >
      <Form.Item<IPostsField>
        label="Title"
        name="title"
        rules={[{ required: true, message: "Please input your Title!" }]}
      >
        <Input
          onChange={(e) => setPostsField({ title: e.target.value })}
          placeholder="Input Post Title"
        />
      </Form.Item>

      <Form.Item<IPostsField>
        label="Body"
        name="body"
        rules={[
          { required: true, message: "Please input your Body!" },
          { max: 500, message: "Body must not exceed 500 characters!" },
        ]}
      >
        <Input.TextArea
          onChange={(e) => setPostsField({ body: e.target.value })}
          placeholder="Input Post Body"
          autoSize={{ minRows: 5 }}
        />
      </Form.Item>

      <Form.Item className="w-full">
        <Button
          type="primary"
          htmlType="submit"
          className="w-full"
          loading={isCreating || isUpdating}
        >
          {type === "create" ? "Create Post" : "Update Post"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PostForm;
