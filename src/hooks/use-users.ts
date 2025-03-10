import { createUser, getUserDetailApi } from "@/services/users-services";
import { userStore } from "@/store/users-store";
import { IUserFields } from "@/types/users-type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import Cookies from "js-cookie";
import { useRouter } from "nextjs-toploader/app";

export const useUsers = (postDetail?: { user_id?: string }) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data } = userStore();

  const { data: userDetail, isLoading: isFetchingUserDetail } = useQuery({
    queryKey: ["userDetail", postDetail?.user_id],
    queryFn: () => getUserDetailApi({ id: postDetail?.user_id || "" }),
    enabled: !!postDetail?.user_id,
    retry: false,
    refetchOnWindowFocus: false,
  });

  const { mutate: createUserMutation, isPending } = useMutation({
    mutationFn: async ({ data, token }: { data: IUserFields; token: string }) =>
      createUser(data, token),
    onSuccess: (response) => {
      const { id } = response;
      Cookies.set("user_id", id?.toString() || "");
      Cookies.set("token", data.token);
      queryClient.invalidateQueries({ queryKey: ["users"] });
      message.success("User created successfully");

      router.push("/");
    },
    onError: (error: unknown) => {
      const errorMessage =
        error instanceof Error ? error.message : "Something went wrong";
      message.error(errorMessage);
    },
  });

  return {
    createUserMutation,
    isPending,
    userDetail,
    isFetchingUserDetail,
  };
};
