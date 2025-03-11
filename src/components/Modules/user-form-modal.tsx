import React from "react";
import { Modal } from "antd";
import UserForm from "./user-form";

interface IuserFormModalProps {
  open: boolean;
  setOpen: (_open: boolean) => void;
}

const UserFormModal = ({ open, setOpen }: IuserFormModalProps) => {
  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <Modal
        title="Add New User"
        open={open}
        onCancel={handleCancel}
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
        centered={true}
      >
        <div className="w-full flex flex-col gap-4">
          <p className="text-xs text-red-500 leading-2">
            Your token is valid, but your name is not registered in the system.
            Please add your user information to continue
          </p>
          <div>
            <UserForm />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default UserFormModal;
