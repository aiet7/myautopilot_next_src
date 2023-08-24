import { create } from "zustand";
import Cookie from "js-cookie";

const useCookiesStore = create((set, get) => ({
  clearCookies: () => {
    Cookie.remove("Secure-next.session-token-g");
    Cookie.remove("microsoft_session_token");
    Cookie.remove("session_token");
    Cookie.remove("user_id");
  },
}));

export default useCookiesStore;
