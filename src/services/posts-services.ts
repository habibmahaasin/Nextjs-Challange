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

export const createPostApi = async (
  data: IPostsField
): Promise<IPostsField> => {
  try {
    const response = await API.post<IPostsField>("/public/v2/posts", data);
    return response.data;
  } catch (error: unknown) {
    const errorResponse = (error as { response?: { data?: any } }).response
      ?.data;

    let errorMessage = "service error";

    if (Array.isArray(errorResponse)) {
      errorMessage = errorResponse[0]?.message || errorMessage;
    } else if (typeof errorResponse === "object" && errorResponse?.message) {
      errorMessage = errorResponse.message;
    }

    throw new Error(errorMessage);
  }
};

export const getPostDetailApi = async ({
  id,
}: {
  id: string;
}): Promise<IPostsField> => {
  try {
    const response = await API.get<IPostsField>(`/public/v2/posts/${id}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Service error");
  }
};
