"use client";
import { useEffect } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import Layout from "@/components/Layouts/Layout";
import useUiStore from "@/utils/store/ui/uiStore";
import useUserStore from "@/utils/store/user/userStore";
import Cookies from "js-cookie";
import useLocalStorageStore from "@/utils/store/localstorage/localStorageStore";

const Branding = dynamic(() =>
  import("@/components/Dashboard/Admin/Options/Branding")
);
const Companies = dynamic(() =>
  import("@/components/Dashboard/Admin/Options/Companies")
);
const Cards = dynamic(() =>
  import("@/components/Dashboard/Admin/Options/Integrations/Cards/Cards")
);
const Internal = dynamic(() =>
  import("@/components/Dashboard/Admin/Options/Internal")
);
const Roles = dynamic(() =>
  import("@/components/Dashboard/Admin/Options/Roles")
);
const Workflows = dynamic(() =>
  import("@/components/Dashboard/Admin/Options/Workflows")
);

const OptionPages = () => {
  const session = Cookies.get("session_token");
  const router = useRouter();

  const { initializeUser } = useUserStore();
  const { getStorage, setStorage } = useLocalStorageStore();
  const { activeTab } = useUiStore();

  const { options } = router.query;

  useEffect(() => {
    if (router.isReady) {
      const currentPath = router.asPath;
      const { id } = router.query;
      getStorage(currentPath);
      if (id && session) {
        initializeUser(id);
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
  }, [activeTab]);

  const renderComponent = () => {
    if (options && options.length > 0) {
      const componentKey = options[0].toLowerCase();
      switch (componentKey) {
        case "branding":
          return <Branding />;
        case "companies":
          return <Companies />;
        case "integrations":
          return <Cards />;
        case "internal":
          return <Internal />;
        case "roles":
          return <Roles />;
        case "workflows":
          return <Workflows />;
        default:
          return <p>Option not found</p>;
      }
    }
    return <p>Select an option</p>;
  };
  return <>{renderComponent()}</>;
};

OptionPages.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

export default OptionPages;