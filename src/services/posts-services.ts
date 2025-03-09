import { IPostsField, IPostsResponseWithMeta } from "@/types/posts-type";
import API from "./api";

export const getPostsLists = async ({
  page,
  limit,
  title,
}: {
  page: number;
  limit: number;
  title: string;
}): Promise<IPostsResponseWithMeta> => {
  try {
    const response = await API.get<IPostsField[]>("/public/v2/posts", {
      params: { page, per_page: limit, title },
    });

    // ✅ Ensure headers exist and convert them to numbers
    const totalItems = Number(response.headers?.["x-pagination-total"] || 0);
    const totalPages = Number(response.headers?.["x-pagination-pages"] || 1);
    const currentPage = Number(response.headers?.["x-pagination-page"] || page);
    const perPage = Number(response.headers?.["x-pagination-limit"] || 10);

    const meta = {
      totalItems: totalItems.toString(),
      totalPages: totalPages.toString(),
      currentPage: currentPage.toString(),
      perPage: perPage.toString(),
    };

    return { meta, data: response.data };
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Service error");
  }
};
