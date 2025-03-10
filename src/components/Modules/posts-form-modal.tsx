import React, { useState } from "react";
import { Button, Modal } from "antd";
import PostForm from "./posts-form";
import { SearchOutlined } from "@ant-design/icons";

const PostsFormModal = () => {
  const [open, setOpen] = useState(false);
  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        type="primary"
        icon={<SearchOutlined />}
        onClick={() => {
          setOpen(true);
        }}
      >
        Create Posts
      </Button>
      <Modal
        title="Create New Post"
        open={open}
        onCancel={handleCancel}
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
        centered={true}
      >
        <div className="w-full flex flex-col gap-4">
          <PostForm setOpen={setOpen} />
        </div>
      </Modal>
    </>
  );
};

export default PostsFormModal;
