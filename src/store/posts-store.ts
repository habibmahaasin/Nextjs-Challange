import { IPostsField } from "@/types/posts-type";
import { create } from "zustand";

export interface IPostsStore {
  data: IPostsField;
  setPostsField: (fields: Partial<IPostsField>) => void;
}

export const userStore = create<IPostsStore>((set) => ({
  data: {
    id: null,
    user_id: null,
    title: "",
    body: "",
  },

  setPostsField: (fields: Partial<IPostsField>) =>
    set((state) => ({ data: { ...state.data, ...fields } })),
}));
