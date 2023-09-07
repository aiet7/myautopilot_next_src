"use client";

import { ThemeProvider } from "next-themes";

import TabNavRail from "../../components/Dashboard/TabNavRail.js";
import SettingsRail from "../../components/Dashboard/SettingsRail.js";
import AssistantRail from "@/components/Dashboard/Assistant/AssistantRail.js";

import Interaction from "../../components/Dashboard/Interaction/Interaction.js";
import Discussion from "../../components/Dashboard/Teams/Discussion.js";
import Assistant from "../../components/Dashboard/Assistant/Assistant.js";
import History from "../../components/Dashboard/History/History.js";
import Rooms from "../../components/Dashboard/Teams/Rooms.js";
import Documents from "@/components/Dashboard/Document/Documents.js";

import Guide from "../../components/Dashboard/Guide.js";
import Selection from "../../components/Dashboard/Selection.js";

import Hover from "../../components/Dashboard/Hover.js";

import Account from "../../components/Dashboard/Account.js";

import { useEffect } from "react";

import { handleServerPropsData } from "../../utils/api/serverProps.js";

import useUserStore from "@/utils/store/user/userStore.js";
import useAgentsStore from "@/utils/store/agents/agentsStore.js";
import useConversationStore from "@/utils/store/interaction/conversations/conversationsStore.js";
import useUiStore from "@/utils/store/ui/uiStore.js";
import useTeamsStore from "@/utils/store/teams/teamsStore.js";
import useLocalStorageStore from "@/utils/store/localstorage/localStorageStore.js";
import useInitializeAppStore from "@/utils/store/init/initializeAppStore.js";
import useAssistantStore from "@/utils/store/assistant/assistantStore.js";
import DocumentForm from "@/components/Dashboard/Document/DocumentForm.js";
import useDocStore from "@/utils/store/doc/docStore.js";

const DashboardPage = ({
  initialUser,
  initialConversations,
  initialAgents,
  initialMessages,
  initialRooms,
  initialRoomMessages,
}) => {
  const { initializeApp } = useInitializeAppStore();
  const { initializeUser } = useUserStore();
  const { initializeAgents, selectedAgent, hoverAgent, setDisplayedAgent } =
    useAgentsStore();
  const { initializeConversations, currentConversationIndices } =
    useConversationStore();
  const { activeAssistantButton } = useAssistantStore();
  const { initializeTeams, currentTeamsIndex } = useTeamsStore();
  const { currentDocIndex } = useDocStore();
  const { saveStorage, getStorage } = useLocalStorageStore();

  const {
    height,
    activeTab,
    hoverTab,
    openSettings,
    setHeight,
    handleToggleSettings,
  } = useUiStore();
  useEffect(() => {
    initializeApp();
  }, [activeTab, initialAgents]);

  useEffect(() => {
    initializeUser(initialUser);
    initializeAgents(initialAgents);
    initializeConversations(initialConversations, initialMessages);
    initializeTeams(initialRooms, initialRoomMessages);
  }, [
    initialUser,
    initialAgents,
    initialConversations,
    initialMessages,
    initialRooms,
    initialRoomMessages,
  ]);

  useEffect(() => {
    if (hoverAgent !== null) {
      setDisplayedAgent(hoverAgent);
    } else {
      setDisplayedAgent(selectedAgent);
    }
  }, [hoverAgent, selectedAgent]);

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
    activeTab,
    activeAssistantButton,
    currentConversationIndices,
    currentTeamsIndex,
    currentDocIndex,
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
            {hoverTab && activeTab !== hoverTab && <Hover />}
            <div className="flex flex-col h-full w-full overflow-hidden">
              {activeTab !== "settings" && <SettingsRail />}

              {activeTab === "general" && (
                <div className="flex flex-1 relative overflow-hidden">
                  <History />
                  <Interaction />
                  {window.innerWidth > 1024 && <AssistantRail />}
                  <Assistant />
                </div>
              )}
              {activeTab === "agents" && (
                <div className="flex flex-1 relative overflow-hidden">
                  {selectedAgent ? (
                    <>
                      <History />
                      <Interaction />
                      {window.innerWidth > 1024 && <AssistantRail />}
                      <Assistant />
                    </>
                  ) : (
                    <>
                      <Selection />
                      <Guide />
                    </>
                  )}
                </div>
              )}
              {activeTab === "teams" && (
                <div className="flex flex-1 relative overflow-hidden">
                  <Rooms />
                  <Discussion />
                </div>
              )}
              {activeTab === "docs" && (
                <div className="flex flex-1 relative overflow-hidden">
                  <Documents />
                  <DocumentForm />
                </div>
              )}
              {activeTab === "settings" && (
                <div className="overflow-auto h-full w-full no-scrollbar">
                  <Account initialUser={initialUser} />
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

  const googleSessionToken = cookies["Secure-next.session-token-g"];
  const microsoftSessionToken = cookies["microsoft_session_token"];
  const regularSessionToken = cookies["session_token"];

  if (!googleSessionToken && !microsoftSessionToken && !regularSessionToken) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }

  const userId = params.id;

  const response = await handleServerPropsData(userId);

  return {
    props: { ...response },
  };
};

export default DashboardPage;
