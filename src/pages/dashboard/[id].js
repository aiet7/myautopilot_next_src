"use client";

import { ThemeProvider } from "next-themes";

import TabNavRail from "../../components/Dashboard/TabNavRail.js";
import SettingsRail from "../../components/Dashboard/SettingsRail.js";
import AssistantRail from "@/components/Dashboard/Assistant/AssistantRail.js";
import Interaction from "../../components/Dashboard/Interaction/Interaction.js";
import History from "@/components/Dashboard/History/History.js";
import Assistant from "../../components/Dashboard/Assistant/Assistant.js";

import Account from "../../components/Dashboard/Account.js";

import { useEffect } from "react";

import { handleServerPropsData } from "../../utils/api/serverProps.js";

import useUserStore from "@/utils/store/user/userStore.js";
import useAgentsStore from "@/utils/store/agents/agentsStore.js";
import useUiStore from "@/utils/store/ui/uiStore.js";
import useLocalStorageStore from "@/utils/store/localstorage/localStorageStore.js";
import useInitializeAppStore from "@/utils/store/init/initializeAppStore.js";
import useAssistantStore from "@/utils/store/assistant/assistantStore.js";
import useTicketsStore from "@/utils/store/assistant/sections/tickets/ticketsStore.js";
import DocumentForm from "@/components/Dashboard/Document/DocumentForm.js";
import useConversationStore from "@/utils/store/interaction/conversations/conversationsStore.js";

const DashboardPage = ({
  initialUser,
  initialTickets,
  initialAgents,
  initialConversations,
  initialMessages,
}) => {
  const { initializeApp } = useInitializeAppStore();
  const { initializeUser } = useUserStore();
  const { initializeTickets } = useTicketsStore();
  const { initializeAgents } = useAgentsStore();
  const { initializeConversations, currentConversationIndices } =
    useConversationStore();
  const { activeAssistantButton, activeUIAssistantTab } = useAssistantStore();

  const { saveStorage, getStorage } = useLocalStorageStore();
  const { height, activeTab, openSettings, setHeight, handleToggleSettings } =
    useUiStore();

  useEffect(() => {
    initializeApp();
  }, [activeTab, initialAgents]);

  useEffect(() => {
    initializeUser(initialUser);
    initializeTickets(initialTickets);
    initializeAgents(initialAgents);
    initializeConversations(initialConversations, initialMessages);
  }, [
    initialUser,
    initialAgents,
    initialConversations,
    initialMessages,
    initialTickets,
  ]);

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
  }, [getStorage]);

  useEffect(() => {
    saveStorage();

    window.addEventListener("beforeunload", saveStorage);

    return () => {
      window.removeEventListener("beforeunload", saveStorage);
    };
  }, [
    saveStorage,
    activeAssistantButton,
    activeUIAssistantTab,
    currentConversationIndices,
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

                  {activeUIAssistantTab === "Documents" ? (
                    <DocumentForm />
                  ) : (
                    <Interaction />
                  )}

                  {window.innerWidth > 1024 && <AssistantRail />}
                  <Assistant />
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
