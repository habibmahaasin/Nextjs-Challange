import { showMessage } from "@/components/Elements/global-message";
import { createUser } from "@/services/users-services";
import { userStore } from "@/store/users-store";
import { IUserFields } from "@/types/users-type";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useRouter } from "nextjs-toploader/app";

export const useUsers = () => {
  const router = useRouter();
  const { data } = userStore();

  const mutationFn = async ({
    data,
    token,
  }: {
    data: IUserFields;
    token: string;
  }) => {
    return await createUser(data, token);
  };

  return useMutation({
    mutationFn,
    onSuccess: (response) => {
      const { id } = response;
      Cookies.set("user_id", id?.toString() || "");
      Cookies.set("token", data.token);
      showMessage("success", "User created successfully");
      router.push("/");
    },
    onError: (error: unknown) => {
      const errorMessage =
        error instanceof Error ? error.message : "Something went wrong";
      showMessage("error", errorMessage);
    },
  });
};
