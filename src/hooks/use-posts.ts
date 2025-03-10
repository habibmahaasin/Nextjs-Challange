import {
  createPostApi,
  getPostDetailApi,
  getPostsLists,
  updatePostApi,
  deletePostApi,
} from "@/services/posts-services";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export const usePosts = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const params = useParams();

  // handle query params
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;
  const title = searchParams.get("title") || "";
  const user_id = searchParams.get("user_id") || "";
  const body = searchParams.get("body") || "";

  const initialQuery = title || user_id || body || "";
  const initialFilter =
    (title && "title") || (user_id && "user_id") || (body && "body") || "title";

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedFilter, setSelectedFilter] = useState(initialFilter);

  useEffect(() => {
    setSearchQuery(initialQuery);
    setSelectedFilter(initialFilter);
  }, [title, user_id, body, initialFilter, initialQuery]);

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

    const queryString = params.toString();
    router.replace(queryString ? `?${queryString}` : "/posts");
  };

  const handleSearch = (
    searchValue: string,
    selectedFilter: string,
    updateQueryParams: (params: {
      [key: string]: string | number | null;
    }) => void
  ) => {
    const queryParams: { [key: string]: string | null } = {
      title: null,
      user_id: null,
      body: null,
    };

    if (searchValue) {
      queryParams[selectedFilter] = searchValue;
    }

    updateQueryParams({ ...queryParams, page: 1 });
  };

  // handle data fetching
  const { data: posts, isLoading } = useQuery({
    queryKey: ["posts", page, limit, title, user_id, body],
    queryFn: () => getPostsLists({ page, limit, title, user_id, body }),
  });

  const { mutate: createPostMutation, isPending: isCreating } = useMutation({
    mutationFn: createPostApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      message.success("Post created successfully");
    },
    onError: (error: unknown) => {
      const errorMessage =
        error instanceof Error ? error.message : "Something went wrong";
      message.error(errorMessage);
    },
  });

  const { mutate: updatePostMutation, isPending: isUpdating } = useMutation({
    mutationFn: updatePostApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      message.success("Post updated successfully");
    },
    onError: (error: unknown) => {
      const errorMessage =
        error instanceof Error ? error.message : "Something went wrong";
      message.error(errorMessage);
    },
  });

  const { mutate: deletePostMutation, isPending: isDeleting } = useMutation({
    mutationFn: deletePostApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      message.success("Post deleted successfully");
    },
    onError: (error: unknown) => {
      const errorMessage =
        error instanceof Error ? error.message : "Something went wrong";
      message.error(errorMessage);
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
    postDetail,
    isPostDetailFetching,
    updatePostMutation,
    isUpdating,
    deletePostMutation,
    isDeleting,
    handleSearch,
    searchQuery,
    setSearchQuery,
    selectedFilter,
    setSelectedFilter,
  };
};
