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
import useTooltipStore from "@/utils/store/tooltip/tooltipStore";
import JoyRide from "react-joyride";

const Openai = dynamic(() =>
  import("@/components/Dashboard/Admin/Options/Integrations/AI/Openai")
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
  const {
    initialSteps,
    authenticatedSteps,
    run,
    steps,
    stepIndex,
    handleJoyrideCallback,
    initializeSteps,
  } = useTooltipStore();
  const { initializeUser } = useUserStore();
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
        initializeUser(msp, id);
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

  useEffect(() => {
    if (integrations?.connectWiseManageIntegrator) {
      initializeSteps(authenticatedSteps);
    } else {
      initializeSteps(initialSteps);
    }
  }, [integrations?.connectWiseManageIntegrator]);

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

  return (
    <>
      {renderComponent()}
      <JoyRide
        continuous
        run={run}
        scrollToFirstStep
        showProgress
        showSkipButton
        steps={steps}
        stepIndex={stepIndex}
        styles={{
          tooltipTitle: {
            textAlign: "left",
            fontWeight: "bold",
          },
          tooltipContent: {
            textAlign: "left",
            paddingTop: "10px",
            paddingBottom: "10px",
            paddingLeft: "0",
            paddingRight: "0",
          },
          options: {
            zIndex: 1000,
          },
        }}
        callback={handleJoyrideCallback}
      />
    </>
  );
};

SoftwareIntegratePages.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

export default SoftwareIntegratePages;
