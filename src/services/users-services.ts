import { IUserFields } from "@/types/users-type";
import API from "./api";

export interface ILoginData {
  name: string;
  token: string;
}

export interface IUsersResponse {
  email: string;
  gender: string;
  id: number;
  name: string;
  status: string;
}

export const getUserLists = async (
  data: ILoginData
): Promise<IUsersResponse[]> => {
  try {
    const response = await API.get<IUsersResponse[]>("/public/v2/users", {
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
    });
    return response.data;
  } catch (error: unknown) {
    const errorMessage =
      (error as { response?: { data?: { message?: string } } }).response?.data
        ?.message || "service error";
    throw new Error(errorMessage);
  }
};

export const createUser = async (
  data: IUserFields,
  token: string
): Promise<IUserFields> => {
  try {
    const response = await API.post<IUserFields>("/public/v2/users", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: unknown) {
    const errorMessage =
      (error as { response?: { data?: { message?: string } } }).response?.data
        ?.message || "service error";
    throw new Error(errorMessage);
  }
};

export const getUserDetailApi = async ({
  id,
}: {
  id: string;
}): Promise<IUserFields> => {
  try {
    const response = await API.get<IUserFields>(`/public/v2/users/${id}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Service error");
  }
};
