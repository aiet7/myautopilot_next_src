"use client";

import { useRouter } from "next/router";
import { useEffect } from "react";
import dynamic from "next/dynamic";
import Layout from "@/components/Layouts/Layout";
import Cookies from "js-cookie";

import useLocalStorageStore from "@/utils/store/localstorage/localStorageStore";
import useUserStore from "@/utils/store/user/userStore";
import useUiStore from "@/utils/store/ui/uiStore";
import useIntegrationsStore from "@/utils/store/admin/control/integrations/integrationsStore";
import useAdminStore from "@/utils/store/admin/adminStore";

import useMspStore from "@/utils/store/auth/msp/mspStore";

const Openai = dynamic(() =>
  import("@/components/Dashboard/Admin/Options/Integrations/AI/Openai")
);
const DattoPSA = dynamic(() =>
  import("@/components/Dashboard/Admin/Options/Integrations/PSA/DattoPSA/DattoPSA")
);
const Manage = dynamic(() =>
  import("@/components/Dashboard/Admin/Options/Integrations/PSA/Manage/Manage")
);
const Automate = dynamic(() =>
  import("@/components/Dashboard/Admin/Options/Integrations/RMM/Automate")
);
const Continuum = dynamic(() =>
  import("@/components/Dashboard/Admin/Options/Integrations/RMM/Continuum")
);
const DattoRMM = dynamic(() =>
  import("@/components/Dashboard/Admin/Options/Integrations/RMM/DattoRMM")
);
const Nable = dynamic(() =>
  import("@/components/Dashboard/Admin/Options/Integrations/RMM/Nable")
);
const ScreenConnect = dynamic(() =>
  import("@/components/Dashboard/Admin/Options/Integrations/RMM/ScreenConnect")
);
const Office = dynamic(() =>
  import(
    "@/components/Dashboard/Admin/Options/Integrations/SUITE/Office/Office"
  )
);
const Workspace = dynamic(() =>
  import("@/components/Dashboard/Admin/Options/Integrations/SUITE/Workspace")
);

const MSPSoftwareIntegratePages = () => {
  const session = Cookies.get("session_token");

  const router = useRouter();
  const { user } = useUserStore();
  const { software } = router.query;

  const { initializeUserType } = useMspStore();

  const { initializeUser } = useUserStore();
  const { initializeMSPIntegrations } = useIntegrationsStore();
  const { getStorage, setStorage } = useLocalStorageStore();
  const { activeTab, setActiveTab } = useUiStore();
  const { currentOption } = useAdminStore();

  useEffect(() => {
    if (router.isReady) {
      const currentPath = router.asPath;
      const { msp, id } = router.query;
      getStorage(currentPath, "msp-integrations");
      if (msp && id && session) {
        initializeUser(msp, id);
        initializeMSPIntegrations(msp);
        initializeUserType();
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



  useEffect(() => {
    if (user?.permissions?.adminPortal) {
      setActiveTab("admin");
    }
  }, [user?.permissions?.adminPortal]);

  const renderComponent = () => {
    if (software && software.length > 0) {
      const componentKey = software[0].toLowerCase();
      switch (componentKey) {
        case "openai":
          return <Openai />;
        case "autotask":
          return <DattoPSA />;
        case "connectwise":
          return <Manage />;
        case "automate":
          return <Automate />;
        case "continuum":
          return <Continuum />;
        case "aem":
          return <DattoRMM />;
        case "ncentral":
          return <Nable />;
        case "nablermm":
          return <Nable />;
        case "screenconnect":
          return <ScreenConnect />;
        case "office365":
          return <Office />;
        case "googlews":
          return <Workspace />;
        default:
          return <p>Component not found</p>;
      }
    }
    return <p>No integration selected</p>;
  };

  return <>{renderComponent()}</>;
};

MSPSoftwareIntegratePages.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

export default MSPSoftwareIntegratePages;
