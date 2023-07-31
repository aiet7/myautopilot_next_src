"use client";

import { useRouter } from "next/navigation";
import { googleLogout } from "@react-oauth/google";

import { AiOutlinePoweroff, AiOutlineTeam } from "react-icons/ai";
import { BsChatDots } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import {
  MdOutlineAccountCircle,
  MdOutlineDarkMode,
  MdOutlineLightMode,
} from "react-icons/md";
import { DiMagento } from "react-icons/di";

import { useTheme } from "next-themes";

import Cookie from "js-cookie";
import AgentSelection from "./Agents/AgentSelection";
import ChatHistory from "./Chat/ChatHistory";

const TabNavRail = ({
  initialAgents,
  activeTab,
  hoverPreview,
  selectedAgent,
  openChatHistoryHover,
  openChatHistory,
  openAgentSelectionHover,
  openAgentHistory,
  openSettings,

  currentConversationIndices,

  conversationHistories,

  setConversationHistories,

  handleNewConversation,
  handleDeleteConversation,
  handleConversationSelected,
  handleAgentSelected,
  handleTabChange,
  handleOpenSettings,
  handleOpenChatHistoryVisible,
  handleOpenChatHistoryHide,
  handleOpenAgentSelectionVisible,
  handleOpenAgentSelectionHide,
}) => {
  const { theme, setTheme } = useTheme();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("lastTab");
    localStorage.removeItem("lastConversationIndex");

    Cookie.remove("Secure-next.session-token-g");
    Cookie.remove("microsoft_session_token");
    Cookie.remove("session_token");
    Cookie.remove("user_id");

    googleLogout();
    router.push("/auth/login");
  };

  const handleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="dark:lg:border-white/10 dark:bg-[#373737] bg-[#eaf1fb] flex items-center justify-evenly py-3 px-2 gap-4 lg:relative lg:flex-col lg:justify-start lg:border-r">
      <div
        onMouseEnter={
          activeTab === "general"
            ? handleOpenChatHistoryHide
            : handleOpenChatHistoryVisible
        }
        onClick={() => handleTabChange("general")}
        className="relative flex flex-col items-center cursor-pointer"
      >
        <BsChatDots
          size={30}
          className={`${activeTab === "general" && "text-blue-600"}`}
        />
        <span className="text-sm">General</span>
      </div>
      {openChatHistoryHover && (
        <ChatHistory
          selectedAgent={activeTab === "general" ? selectedAgent : hoverPreview}
          openChatHistory={openChatHistory}
          openChatHistoryHover={openChatHistoryHover}
          currentConversationIndices={currentConversationIndices}
          conversationHistories={conversationHistories}
          setConversationHistories={setConversationHistories}
          handleNewConversation={handleNewConversation}
          handleDeleteConversation={handleDeleteConversation}
          handleConversationSelected={handleConversationSelected}
          handleOpenChatHistoryHide={handleOpenChatHistoryHide}
        />
      )}
      <div
        onMouseEnter={
          activeTab === "agents"
            ? handleOpenAgentSelectionHide
            : handleOpenAgentSelectionVisible
        }
        className="relative flex flex-col items-center cursor-pointer"
        onClick={() => handleTabChange("agents")}
      >
        <DiMagento
          size={30}
          className={`${activeTab === "agents" && "text-blue-600"}`}
        />
        <span className="text-sm">Agents</span>
      </div>
      {openAgentSelectionHover && (
        <AgentSelection
          activeTab={activeTab}
          selectedAgent={selectedAgent}
          initialAgents={initialAgents}
          openAgentHistory={openAgentHistory}
          openAgentSelectionHover={openAgentSelectionHover}
          handleAgentSelected={handleAgentSelected}
          handleOpenAgentSelectionHide={handleOpenAgentSelectionHide}
        />
      )}

      <div
        onClick={() => {
          handleTabChange("teams");
        }}
        className="relative flex flex-col items-center cursor-pointer"
      >
        <AiOutlineTeam
          size={30}
          className={`${activeTab === "teams" && "text-blue-600"} `}
        />
        <span className="text-sm">Teams</span>
      </div>

      <div
        onClick={handleOpenSettings}
        className="flex flex-col items-center cursor-pointer lg:absolute lg:bottom-0 lg:py-3"
      >
        <FiSettings
          size={30}
          className={`${activeTab === "settings" && "text-blue-600"}`}
        />
        <span className="text-sm">Settings</span>
        {openSettings && (
          <div className="dark:bg-black dark:border-white/40 dark:border bg-white border border-black/10 absolute z-[99] bottom-[74px] right-0 w-[150px] lg:bottom-0 lg:left-[59px] lg:w-[250px]">
            <div className="flex flex-col">
              <div
                onClick={handleLogout}
                className="dark:border-white/40 dark:hover:bg-white/20 hover:bg-black/10 border-b border-black/10 w-full text-lg flex items-center gap-3 px-6 py-3"
              >
                <AiOutlinePoweroff />
                <span>Log out</span>
              </div>
              <div
                onClick={() => handleTabChange("settings")}
                className="dark:border-white/40 dark:hover:bg-white/20 hover:bg-black/10 border-b border-black/10 w-full text-lg flex items-center gap-3 px-6 py-3"
              >
                <MdOutlineAccountCircle />
                <span>Account</span>
              </div>
              <div
                onClick={handleTheme}
                className="dark:hover:bg-white/20 hover:bg-black/10 w-full text-lg flex items-center gap-3 px-6 py-3"
              >
                {theme === "light" ? (
                  <MdOutlineDarkMode />
                ) : (
                  <MdOutlineLightMode />
                )}
                <span>{theme === "light" ? "Dark" : "Light"}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TabNavRail;
