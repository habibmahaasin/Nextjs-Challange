import React from "react";
import { Modal } from "antd";
import PostForm from "./posts-form";

interface IPostsFormModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const PostsFormModal = ({ open, setOpen }: IPostsFormModalProps) => {
  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <Modal
        title="Create New Post"
        open={open}
        onCancel={handleCancel}
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
        centered={true}
      >
        <div className="w-full flex flex-col gap-4">
          <div>
            <PostForm />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default PostsFormModal;
