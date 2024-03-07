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

  const { initializeApp } = useInitializeAppStore();
  const { initializeUser } = useUserStore();
  const { initializeUserType } = useMspStore();
  const { initializeAssistant } = useAssistantStore();

  const { getStorage, setStorage } = useLocalStorageStore();

  const { currentConversationIndex } = useConversationStore();
  const { currentDocumentConversationIndex } = useDocConversationsStore();
  const { activeTab } = useUiStore();
  const { activeAssistantTab, activeUIAssistantTab } = useAssistantStore();

  useEffect(() => {
    if (router.isReady) {
      const currentPath = router.asPath;
      const { msp, id } = router.query;
      getStorage(currentPath, null);
      if (msp && id && session) {
        initializeApp();
        initializeUser(msp, id);
        initializeAssistant(msp);
        initializeUserType();
      }
    }
  }, [router.isReady, router.asPath]);

  useEffect(() => {
    setStorage();

    window.addEventListener("beforeunload", setStorage);

    return () => {
      window.removeEventListener("beforeunload", setStorage);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    activeTab,
    activeAssistantTab,
    activeUIAssistantTab,
    currentConversationIndex,
    currentDocumentConversationIndex,
  ]);

  return (
    <>
      <Interaction />
      {window.innerWidth > 1023 && <AssistantRail />}
      <Assistant />
    </>
  );
};

DashboardPage.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

export default DashboardPage;
