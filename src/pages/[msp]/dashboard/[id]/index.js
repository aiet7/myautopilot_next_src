"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import Layout from "@/components/Layouts/Layout.js";
import { useRouter } from "next/router";

import useUiStore from "@/utils/store/ui/uiStore.js";
import useLocalStorageStore from "@/utils/store/localstorage/localStorageStore.js";
import useInitializeAppStore from "@/utils/store/init/initializeAppStore.js";
import useAssistantStore from "@/utils/store/assistant/assistantStore.js";
import useConversationStore from "@/utils/store/interaction/conversations/conversationsStore.js";
import useDocConversationsStore from "@/utils/store/interaction/conversations/docConversationsStore.js";
import Cookies from "js-cookie";
import useUserStore from "@/utils/store/user/userStore";
import useMspStore from "@/utils/store/auth/msp/mspStore";
import Account from "@/components/Dashboard/Account";

const Interaction = dynamic(() =>
  import("@/components/Dashboard/Interaction/Interaction.js")
);

const Assistant = dynamic(() =>
  import("@/components/Dashboard/Assistant/Assistant.js")
);

const AssistantRail = dynamic(() =>
  import("@/components/Dashboard/Assistant/AssistantRail.js")
);

const DashboardPage = ({}) => {
  const session = Cookies.get("session_token");
  const router = useRouter();

  const { initializeUser } = useUserStore();
  const { initializeUserType } = useMspStore();
  const { initializeAssistant } = useAssistantStore();

  const { getStorage, setStorage } = useLocalStorageStore();

  const { currentConversationIndex } = useConversationStore();
  const { activeTab, currentNavOption, setCurrentNavOption } = useUiStore();

  useEffect(() => {
    const handlePopState = (event) => {
      const { option } = event.state || {};
      if (option) {
        setCurrentNavOption(option);
      } else {
        setCurrentNavOption("Tickets");
        window.history.replaceState({ option: "Tickets" }, "", "#tickets");
      }
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  useEffect(() => {
    if (router.isReady) {
      const currentPath = router.asPath;
      const { msp, id } = router.query;

      setCurrentNavOption("Tickets");
      window.history.replaceState({ option: "Tickets" }, "", "#tickets");

      getStorage(currentPath, null);
      if (msp && id && session) {
        initializeUser(msp, id);
        initializeUserType();
        initializeAssistant(msp);
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
  }, [
    currentNavOption,
    activeTab,
    currentConversationIndex,
    ,
  ]);

  return (
    <>
      {currentNavOption === "Tickets" ||
      currentNavOption === "Engineer" ||
      currentNavOption === "Queue" ? (
        <>
          <Interaction />
          {window.innerWidth > 1023 && <AssistantRail />}

          <Assistant />
        </>
      ) : (
        <Account />
      )}
    </>
  );
};

DashboardPage.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

export default DashboardPage;
