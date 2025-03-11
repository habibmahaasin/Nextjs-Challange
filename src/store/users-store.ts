import { IUserFields } from "@/types/users-type";
import { create } from "zustand";

export interface IuserStore {
  data: IUserFields;
  setUserField: (_fields: Partial<IUserFields>) => void;
}

export const userStore = create<IuserStore>((set) => ({
  data: {
    name: "",
    email: "",
    gender: "",
    status: "",
    token: "",
  },

  setUserField: (fields: Partial<IUserFields>) =>
    set((state) => ({ data: { ...state.data, ...fields } })),
}));
