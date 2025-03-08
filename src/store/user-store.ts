import { create } from "zustand";

export interface IuserStore {
  data: IuserFields;
  setUserField: (fields: Partial<IuserFields>) => void;
}

export interface IuserFields {
  name: string;
  email: string;
  gender: string;
  status: string;
  token: string;
}

export const userStore = create<IuserStore>((set) => ({
  data: {
    name: "",
    email: "",
    gender: "",
    status: "",
    token: "",
  },

  setUserField: (fields: Partial<IuserFields>) =>
    set((state) => ({ data: { ...state.data, ...fields } })),
}));
