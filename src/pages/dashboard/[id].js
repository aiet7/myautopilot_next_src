"use client";

import { ThemeProvider } from "next-themes";

import { useEffect } from "react";

import { handleServerPropsData } from "@/utils/api/serverProps.js";

import TabNavRail from "@/components/Dashboard/TabNavRail.js";
import SettingsRail from "@/components/Dashboard/SettingsRail.js";
import AssistantRail from "@/components/Dashboard/Assistant/AssistantRail.js";
import Interaction from "@/components/Dashboard/Interaction/Interaction.js";
import History from "@/components/Dashboard/History/History.js";
import Assistant from "@/components/Dashboard/Assistant/Assistant.js";
import Documents from "@/components/Dashboard/Document/Documents.js";

import Nav from "@/components/Dashboard/Admin/Nav.js";
import Control from "@/components/Dashboard/Admin/Control/Control.js";

import Account from "@/components/Dashboard/Account.js";

import useUserStore from "@/utils/store/user/userStore.js";
import useUiStore from "@/utils/store/ui/uiStore.js";
import useLocalStorageStore from "@/utils/store/localstorage/localStorageStore.js";
import useInitializeAppStore from "@/utils/store/init/initializeAppStore.js";
import useAssistantStore from "@/utils/store/assistant/assistantStore.js";
import useConversationStore from "@/utils/store/interaction/conversations/conversationsStore.js";
import useDocConversationsStore from "@/utils/store/interaction/conversations/docConversationsStore.js";

const DashboardPage = ({
  initialUser,
  initialConversations,
  initialDocumentConversations,
  initialAgents,
}) => {
  const { initializeApp } = useInitializeAppStore();
  const { initializeUser, user } = useUserStore();
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
  const { height, activeTab, openSettings, setHeight, handleToggleSettings } =
    useUiStore();

  useEffect(() => {
    initializeApp(initialAgents);
  }, [activeTab, initialAgents]);

  useEffect(() => {
    initializeUser(initialUser);
    initializeConversations(initialConversations);
    initializeDocumentConversations(initialDocumentConversations);
  }, [initialUser, initialConversations, initialDocumentConversations]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHeight(window.innerHeight);

      const handleResize = () => setHeight(window.innerHeight);
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

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
    <ThemeProvider attribute="class">
      {height && (
        <div
          onClick={() => openSettings && handleToggleSettings(false)}
          className="flex flex-col h-full w-full "
          style={{ height: `calc(${height}px - 1px)` }}
        >
          <div className="flex flex-col h-full w-full lg:flex-row-reverse">
            <div className="flex flex-col h-full w-full overflow-hidden">
              {activeTab !== "settings" && <SettingsRail />}

              {activeTab === "iTAgent" && (
                <div className="flex flex-1 relative overflow-hidden">
                  {activeUIAssistantTab === "Engineer" && <History />}
                  {activeUIAssistantTab === "DocGuide" && <Documents />}

                  <Interaction />
                  {window.innerWidth > 1023 && <AssistantRail />}
                  <Assistant />
                </div>
              )}

              {[
                "tim@etech7.com",
                "ariel@etech7.com",
                "eisanov@etech7.com",
                "mkandinov@etech7.com",
                "agogia@etech7.com",
              ].includes(user?.email) &&
                activeTab === "admin" && (
                  <div className="flex flex-1 relative overflow-hidden">
                    <Nav />
                    <Control />
                  </div>
                )}

              {activeTab === "settings" && (
                <div className="overflow-auto h-full w-full no-scrollbar">
                  <Account />
                </div>
              )}
            </div>

            <TabNavRail />
          </div>
        </div>
      )}
    </ThemeProvider>
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

export default DashboardPage;
