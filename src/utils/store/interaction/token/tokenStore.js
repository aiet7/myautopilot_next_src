import { create } from "zustand";
import Cookies from "js-cookie";

const useTokenStore = create((set, get) => ({
  token: Cookies.get("microsoft_session_token") || Cookies.get("session_token"),
}));

export default useTokenStore;
