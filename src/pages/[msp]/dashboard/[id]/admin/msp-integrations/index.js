"use client";

import dynamic from "next/dynamic";
import Layout from "@/components/Layouts/Layout";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import useLocalStorageStore from "@/utils/store/localstorage/localStorageStore";
import useUserStore from "@/utils/store/user/userStore";
import useUiStore from "@/utils/store/ui/uiStore";
import useAdminStore from "@/utils/store/admin/adminStore";

const Cards = dynamic(() =>
  import("@/components/Dashboard/Admin/Options/Integrations/Cards/Cards")
);

const MSPIntegrationsPage = () => {
  const session = Cookies.get("session_token");
  const router = useRouter();

  const { initializeUser } = useUserStore();
  const { getStorage, setStorage } = useLocalStorageStore();
  const { activeTab } = useUiStore();
  const { currentOption } = useAdminStore();
  
  useEffect(() => {
    if (router.isReady) {
      const currentPath = router.asPath;
      const { msp, id } = router.query;
      getStorage(currentPath, "msp-integrations");

      if (msp && id && session) {
        initializeUser(msp, id);
      } else {
        router.push("/auth/login");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady, router.asPath]);

  useEffect(() => {
    setStorage();

    window.addEventListener("beforeunload", setStorage);

    return () => {
      window.removeEventListener("beforeunload", setStorage);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, currentOption]);

  return (
    <>
      <Cards />
    </>
  );
};

MSPIntegrationsPage.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

export default MSPIntegrationsPage;
