import { create } from "zustand";
import useLocalStorageStore from "../localstorage/localStorageStore";
import useCookiesStore from "../cookies/cookiesStore";
import { googleLogout } from "@react-oauth/google";
import { useRouter } from "next/navigation";

const useUserStore = create((set) => ({
  user: null,

  initializeUser: (initialUser) => {
    set({ user: initialUser });
  },

  handleLogout: () => {
    const { clearStorage } = useLocalStorageStore.getState();
    const { clearCookies } = useCookiesStore.getState();
    clearStorage();
    clearCookies();
    googleLogout();
  },
}));

export default useUserStore;
