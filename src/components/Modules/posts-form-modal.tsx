import React, { useState } from "react";
import { Button, Modal } from "antd";
import PostForm from "./posts-form";
import { SearchOutlined } from "@ant-design/icons";
import { IPostsField } from "@/types/posts-type";
import { postsStore } from "@/store/posts-store";
import Cookies from "js-cookie";

const PostsFormModal = ({
  type,
  data,
}: {
  type: "create" | "update";
  data?: IPostsField;
}) => {
  const { setPostsField } = postsStore();
  const [open, setOpen] = useState(false);
  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        type={type === "create" ? "primary" : "link"}
        icon={type === "create" && <SearchOutlined />}
        onClick={() => {
          setOpen(true);
          if (type === "update") {
            setPostsField(data as IPostsField);
          } else {
            setPostsField({
              id: null,
              user_id: Cookies.get("user_id")
                ? Number(Cookies.get("user_id"))
                : null,
              title: "",
              body: "",
            });
          }
        }}
        className={type === "update" ? "!w-full" : ""}
      >
        {type === "create" ? "Create Post" : "Edit"}
      </Button>
      <Modal
        title={type === "create" ? "Create Post" : "Edit Post"}
        open={open}
        onCancel={handleCancel}
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
        centered={true}
      >
        <div className="w-full flex flex-col gap-4">
          <PostForm setOpen={setOpen} type={type} />
        </div>
      </Modal>
    </>
  );
};

export default PostsFormModal;
