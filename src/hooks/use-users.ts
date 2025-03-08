import { showMessage } from "@/components/Elements/global-message";
import { createUser, IUsersResponse } from "@/services/users-services";
import { IuserFields, userStore } from "@/store/user-store";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useRouter } from "nextjs-toploader/app";

export const useUsers = () => {
  const router = useRouter();
  const { data } = userStore();

  return useMutation({
    mutationFn: ({ data, token }: { data: IuserFields; token: string }) =>
      createUser(data, token),
    onSuccess: () => {
      Cookies.set("token", data.token);
      showMessage("success", "User created successfully");
      router.push("/");
    },
    onError: (error) => {
      showMessage("error", error.message);
    },
  });
};
