import { getPostsLists } from "@/services/posts-services";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";

export const usePosts = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
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

  return {
    posts,
    isLoading,
    searchParams,
    updateQueryParams,
    page,
    limit,
    title,
    onSearch,
  };
};
