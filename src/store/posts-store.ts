import { IPostsField } from "@/types/posts-type";
import { create } from "zustand";
import Cookies from "js-cookie";

export interface IPostsStore {
  data: IPostsField;
  setPostsField: (_fields: Partial<IPostsField>) => void;
}

export const postsStore = create<IPostsStore>((set) => ({
  data: {
    id: null,
    user_id: Cookies.get("user_id") ? Number(Cookies.get("user_id")) : null,
    title: "",
    body: "",
  },

  setPostsField: (fields: Partial<IPostsField>) =>
    set((state) => ({ data: { ...state.data, ...fields } })),
}));
