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

const Office = dynamic(() =>
  import(
    "@/components/Dashboard/Admin/Options/Integrations/SUITE/Office/Office"
  )
);
const Workspace = dynamic(() =>
  import("@/components/Dashboard/Admin/Options/Integrations/SUITE/Workspace")
);

const ClientSoftwareIntegratePages = () => {
  const session = Cookies.get("session_token");

  const router = useRouter();
  const { software } = router.query;

  const { initializeUserType } = useMspStore();
  const { initializeUser } = useUserStore();
  const { selectedCompany, initializeClientIntegrations } =
    useIntegrationsStore();
  const { getStorage, setStorage } = useLocalStorageStore();
  const { activeTab } = useUiStore();
  const { currentOption } = useAdminStore();

  useEffect(() => {
    if (!selectedCompany) {
      router.back();
    }
  }, [selectedCompany]);

  useEffect(() => {
    if (router.isReady) {
      const currentPath = router.asPath;
      const { msp, id } = router.query;
      getStorage(currentPath, "client-integrations");
      if (msp && id && session) {
        initializeUser(msp, id);
        initializeUserType();

        if (selectedCompany) {
          initializeClientIntegrations(msp, selectedCompany);
        }
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
    if (software && software.length > 0) {
      const componentKey = software[0].toLowerCase();
      switch (componentKey) {
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

ClientSoftwareIntegratePages.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

export default ClientSoftwareIntegratePages;
