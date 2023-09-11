import { create } from "zustand";
import Cookie from "js-cookie";

const useCookiesStore = create((set, get) => ({
  clearCookies: () => {
    Cookie.remove("session_token");
    Cookie.remove("client_id");
  },
}));

export default useCookiesStore;
