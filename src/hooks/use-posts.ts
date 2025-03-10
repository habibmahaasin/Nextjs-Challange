import { showMessage } from "@/components/Elements/global-message";
import {
  createPostApi,
  getPostDetailApi,
  getPostsLists,
} from "@/services/posts-services";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter, useSearchParams } from "next/navigation";

export const usePosts = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const params = useParams();

  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;
  const title = searchParams.get("title") || "";

  const updateQueryParams = (
    newParams: Record<string, string | number | null>
  ) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(newParams).forEach(([key, value]) => {
      if (!value) {
        params.delete(key);
      } else {
        params.set(key, String(value));
      }
    });

    router.replace(`?${params.toString()}`);
  };

  const onSearch = (value: string) => {
    updateQueryParams({ title: value, page: 1 });
  };

  const { data: posts, isLoading } = useQuery({
    queryKey: ["posts", page, limit, title],
    queryFn: () => getPostsLists({ page, limit, title }),
  });

  const { mutate: createPostMutation, isPending: isCreating } = useMutation({
    mutationFn: createPostApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      showMessage("success", "Post created successfully");
    },
    onError: (error: unknown) => {
      const errorMessage =
        error instanceof Error ? error.message : "Something went wrong";
      showMessage("error", errorMessage);
    },
  });

  const { data: postDetail, isLoading: isPostDetailFetching } = useQuery({
    queryKey: ["postsDetail", params],
    queryFn: () => getPostDetailApi({ id: params?.id as string }),
    enabled: !!params?.id,
  });

  return {
    posts,
    isLoading,
    isCreating,
    createPostMutation,
    searchParams,
    updateQueryParams,
    page,
    limit,
    title,
    onSearch,
    postDetail,
    isPostDetailFetching,
  };
};
