"use client";

import { useEffect } from "react";

import { handleServerPropsData } from "@/utils/api/serverProps.js";

import AssistantRail from "@/components/Dashboard/Assistant/AssistantRail.js";
import Interaction from "@/components/Dashboard/Interaction/Interaction.js";
import Assistant from "@/components/Dashboard/Assistant/Assistant.js";

import useUserStore from "@/utils/store/user/userStore.js";
import useUiStore from "@/utils/store/ui/uiStore.js";
import useLocalStorageStore from "@/utils/store/localstorage/localStorageStore.js";
import useInitializeAppStore from "@/utils/store/init/initializeAppStore.js";
import useAssistantStore from "@/utils/store/assistant/assistantStore.js";
import useConversationStore from "@/utils/store/interaction/conversations/conversationsStore.js";
import useDocConversationsStore from "@/utils/store/interaction/conversations/docConversationsStore.js";
import Layout from "@/components/Layouts/Layout";

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
  }, [activeTab, initialAgents]);

  useEffect(() => {
    initializeUser(initialUser);
    initializeConversations(initialConversations);
    initializeDocumentConversations(initialDocumentConversations);
  }, [initialUser, initialConversations, initialDocumentConversations]);

  useEffect(() => {
    getStorage();
    initializeMessages();
    initializeDocumentMessages();
  }, [getStorage]);

  useEffect(() => {
    saveStorage();

    window.addEventListener("beforeunload", saveStorage);

    return () => {
      window.removeEventListener("beforeunload", saveStorage);
    };
  }, [
    saveStorage,
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

  const response = await handleServerPropsData(clientId);

  return {
    props: { ...response },
  };
};

DashboardPage.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

export default DashboardPage;
