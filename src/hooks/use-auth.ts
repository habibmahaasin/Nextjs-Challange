import { showMessage } from "@/components/Elements/global-message";
import {
  getUserLists,
  ILoginData,
  IUsersResponse,
} from "@/services/users-services";
import { useMutation } from "@tanstack/react-query";

export const useLogin = () => {
  return useMutation<IUsersResponse[], Error, ILoginData>({
    mutationFn: (data) => getUserLists(data),
    onSuccess: () => {
      showMessage("success", "Authentication success");
    },
    onError: (error) => {
      showMessage("error", error.message);
    },
  });
};
