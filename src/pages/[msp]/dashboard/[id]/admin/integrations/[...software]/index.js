"use client";

import { useRouter } from "next/router";
import { useEffect } from "react";

import dynamic from "next/dynamic";
import Layout from "@/components/Layouts/Layout";

import Cookies from "js-cookie";
import useLocalStorageStore from "@/utils/store/localstorage/localStorageStore";
import useTechStore from "@/utils/store/user/techStore";
import useUiStore from "@/utils/store/ui/uiStore";
import useIntegrationsStore from "@/utils/store/admin/control/integrations/integrationsStore";
import useAdminStore from "@/utils/store/admin/adminStore";

const Openai = dynamic(() =>
  import("@/components/Dashboard/Admin/Options/Integrations/AI/Openai")
);
const EmailConnecter = dynamic(() =>
  import(
    "@/components/Dashboard/Admin/Options/Integrations/Email/EmailConnecter"
  )
);
const DattoPSA = dynamic(() =>
  import("@/components/Dashboard/Admin/Options/Integrations/PSA/DattoPSA")
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
  import("@/components/Dashboard/Admin/Options/Integrations/SUITE/Office")
);
const Workspace = dynamic(() =>
  import("@/components/Dashboard/Admin/Options/Integrations/SUITE/Workspace")
);

const SoftwareIntegratePages = () => {
  const session = Cookies.get("session_token");

  const router = useRouter();
  const { initializeTech } = useTechStore();
  const { integrations, initializeIntegrations } = useIntegrationsStore();
  const { getStorage, setStorage } = useLocalStorageStore();
  const { activeTab } = useUiStore();
  const { currentOption } = useAdminStore();

  const { software } = router.query;
  useEffect(() => {
    if (router.isReady) {
      const currentPath = router.asPath;
      const { msp, id } = router.query;
      getStorage(currentPath, "integrations");
      if (msp && id && session) {
        initializeTech(msp, id);
        initializeIntegrations(msp);
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
    if (software && software.length > 0) {
      const componentKey = software[0].toLowerCase();

      switch (componentKey) {
        case "openai":
          return <Openai />;
        case "emailconnecter":
          return <EmailConnecter />;
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

SoftwareIntegratePages.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

export default SoftwareIntegratePages;
