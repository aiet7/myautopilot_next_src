"use client";
import { useEffect } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import Layout from "@/components/Layouts/Layout";
import useUiStore from "@/utils/store/ui/uiStore";
import Cookies from "js-cookie";
import useLocalStorageStore from "@/utils/store/localstorage/localStorageStore";
import useUserStore from "@/utils/store/user/userStore";
import useAdminStore from "@/utils/store/admin/adminStore";

const Branding = dynamic(() =>
  import("@/components/Dashboard/Admin/Options/Branding")
);
const Companies = dynamic(() =>
  import("@/components/Dashboard/Admin/Options/Companies/Companies")
);
const Cards = dynamic(() =>
  import("@/components/Dashboard/Admin/Options/Integrations/Cards/Cards")
);
const Employees = dynamic(() =>
  import("@/components/Dashboard/Admin/Options/Employees/Employees")
);
const Roles = dynamic(() =>
  import("@/components/Dashboard/Admin/Options/Roles/Roles")
);

const Board = dynamic(() =>
  import("@/components/Dashboard/Admin/Options/Board/Board")
);

const OptionPages = () => {
  const session = Cookies.get("session_token");
  const router = useRouter();

  const { initializeUser } = useUserStore();
  const { getStorage, setStorage } = useLocalStorageStore();
  const { activeTab } = useUiStore();
  const { currentOption } = useAdminStore();

  const { options } = router.query;

  useEffect(() => {
    if (router.isReady) {
      const currentPath = router.asPath;
      const { msp, id, options } = router.query;
      getStorage(currentPath, options[0]);
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

  const renderComponent = () => {
    if (options && options.length > 0) {
      const componentKey = options[0].toLowerCase();
      switch (componentKey) {
        case "branding":
          return <Branding />;
        case "companies":
          return <Companies />;
        case "msp-integrations":
          return <Cards />;
        case "client-integrations":
          return <Cards />;
        case "employees":
          return <Employees />;
        case "roles":
          return <Roles />;
        case "board":
          return <Board />;
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
