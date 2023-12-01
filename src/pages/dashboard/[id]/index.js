"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import Layout from "@/components/Layouts/Layout.js";

import { handleDashServerPropsData } from "@/utils/api/serverProps.js";

import useUserStore from "@/utils/store/user/userStore.js";
import useUiStore from "@/utils/store/ui/uiStore.js";
import useLocalStorageStore from "@/utils/store/localstorage/localStorageStore.js";
import useInitializeAppStore from "@/utils/store/init/initializeAppStore.js";
import useAssistantStore from "@/utils/store/assistant/assistantStore.js";
import useConversationStore from "@/utils/store/interaction/conversations/conversationsStore.js";
import useDocConversationsStore from "@/utils/store/interaction/conversations/docConversationsStore.js";

const Interaction = dynamic(() =>
  import("@/components/Dashboard/Interaction/Interaction.js")
);
const Assistant = dynamic(() =>
  import("@/components/Dashboard/Assistant/Assistant.js")
);

const AssistantRail = dynamic(() =>
  import("@/components/Dashboard/Assistant/AssistantRail.js")
);

const DashboardPage = ({
  initialUser,
  initialConversations,
  initialDocumentConversations,
  initialAgents,
}) => {
  const { initializeApp } = useInitializeAppStore();
  const { initializeUser } = useUserStore();
  const {
    initializeConversations,
    initializeMessages,
    currentConversationIndex,
  } = useConversationStore();
  const {
    initializeDocumentConversations,
    initializeDocumentMessages,
    currentDocumentConversationIndex,
  } = useDocConversationsStore();
  const { activeAssistantTab, activeUIAssistantTab } = useAssistantStore();

  const { saveStorage, getStorage } = useLocalStorageStore();
  const { activeTab } = useUiStore();

  useEffect(() => {
    initializeApp(initialAgents);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, initialAgents]);

  useEffect(() => {
    initializeUser(initialUser);
    initializeConversations(initialConversations);
    initializeDocumentConversations(initialDocumentConversations);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialUser, initialConversations, initialDocumentConversations]);

  useEffect(() => {
    getStorage();
    initializeMessages();
    initializeDocumentMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    saveStorage();
    window.addEventListener("beforeunload", saveStorage);
    return () => {
      window.removeEventListener("beforeunload", saveStorage);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
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

export const getServerSideProps = async (context) => {
  const {
    params,
    req: { cookies },
  } = context;

  const regularSessionToken = cookies["session_token"];

  if (!regularSessionToken) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }

  const clientId = params.id;

  const response = await handleDashServerPropsData(clientId);

  return {
    props: { ...response },
  };
};

DashboardPage.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

export default DashboardPage;
