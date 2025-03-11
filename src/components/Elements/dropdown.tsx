import React from "react";
import { SettingOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Dropdown, Space, Popconfirm } from "antd";
import PostsFormModal from "../Modules/posts-form-modal";
import { IPostsField } from "@/types/posts-type";
import { usePosts } from "@/hooks/use-posts";

const DropdownMenu = ({ data }: { data: IPostsField }) => {
  const { deletePostMutation } = usePosts();

  const confirm = (e?: React.MouseEvent<HTMLElement>) => {
    e?.stopPropagation();
    deletePostMutation(data);
  };

  const cancel = (e?: React.MouseEvent<HTMLElement>) => {
    e?.stopPropagation();
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <PostsFormModal type="update" data={data} />,
    },
    {
      key: "4",
      danger: true,
      label: (
        <Popconfirm
          title="Delete the post"
          description="Are you sure you want to delete this post?"
          onConfirm={confirm}
          onCancel={cancel}
          okText="Yes"
          cancelText="No"
        >
          <Button
            variant="link"
            type="link"
            className="hover:!text-white"
            id="delete-post"
            onClick={(e) => e.stopPropagation()}
          >
            Delete
          </Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <Dropdown menu={{ items }} trigger={["click"]}>
      <Space className="text-blue-500 cursor-pointer" id="dropdown-btn">
        <SettingOutlined />
      </Space>
    </Dropdown>
  );
};

export default DropdownMenu;
