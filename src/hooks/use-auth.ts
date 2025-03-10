import {
  getUserLists,
  ILoginData,
  IUsersResponse,
} from "@/services/users-services";
import { useMutation } from "@tanstack/react-query";
import { message } from "antd";

export const useLogin = () => {
  return useMutation<IUsersResponse[], Error, ILoginData>({
    mutationFn: (data) => getUserLists(data),
    onSuccess: () => {
      message.success("Login successfully");
    },
    onError: (error) => {
      message.error(error.message);
    },
  });
};
