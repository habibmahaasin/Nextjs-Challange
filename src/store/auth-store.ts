import { create } from "zustand";
import Cookies from "js-cookie";

interface IAuthState {
  token: string | null;
  isAuthenticated: boolean;
  setToken: (_token: string) => void;
  logout: () => void;
}

export const authStore = create<IAuthState>((set) => ({
  token: Cookies.get("token") || null,
  isAuthenticated: !!Cookies.get("token"),

  setToken: (token) => {
    Cookies.set("token", token, { expires: 7 });
    set({ token, isAuthenticated: true });
  },

  logout: () => {
    Cookies.remove("token");
    Cookies.remove("user_id");
    set({ token: null, isAuthenticated: false });
  },
}));
