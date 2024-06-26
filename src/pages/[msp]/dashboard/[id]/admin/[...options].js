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

const Contacts = dynamic(() =>
  import("@/components/Dashboard/Admin/Options/Contacts/Contacts")
);

const OptionPages = () => {
  const session = Cookies.get("session_token");
  const router = useRouter();

  const { user, initializeUser } = useUserStore();
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
  }, [router.isReady, router.asPath]);

  useEffect(() => {
    setStorage();

    window.addEventListener("beforeunload", setStorage);

    return () => {
      window.removeEventListener("beforeunload", setStorage);
    };
  }, [activeTab, currentOption]);

  const renderComponent = () => {
    if (options && options.length > 0) {
      const componentKey = options[0].toLowerCase();
      const permissionMap = {
        branding: user?.permissions?.mspBranding,
        "msp-integrations": user?.permissions?.mspIntegrations,
        "client-integrations": user?.permissions?.clientIntegrations,
        employees: user?.permissions?.technicianUserManagement,
        roles: user?.permissions?.roleManagement,
        board: user?.permissions?.boardView,
        companies: user?.permissions?.technicianUserManagement,
        contacts: !user?.permissions?.technicianUserManagement,
      };

      if (!permissionMap[componentKey]) {
        return (
          <p className="p-4 text-2xl font-bold">
            You do not have permission to view this page.
          </p>
        );
      }

      switch (componentKey) {
        case "branding":
          return <Branding />;
        case "companies":
          return <Companies />;
        case "contacts":
          if (!user?.permissions?.technicianUserManagement) {
            return <Contacts />;
          }
          break;
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
