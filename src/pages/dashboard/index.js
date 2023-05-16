"use client";

import { ThemeProvider } from "next-themes";

import Navbar from "../../components/Navbar.js";
import TabNavRail from "../../components/TabNavRail.js";
import SettingsNavRail from "../../components/SettingsNavRail.js";
import Intro from "../../components/Intro.js";
import Chat from "../../components/Chat/Chat.js";
import Account from "../../components/Account.js";
import { useState } from "react";

import { AiOutlineMenu } from "react-icons/ai";
import { BiBrain } from "react-icons/bi";

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState("intro");

  const [openChatHistory, setOpenChatHistory] = useState(false);
  const [openChatAssistant, setOpenChatAssistant] = useState(false);

  const [currentConversationIndex, setCurrentConversationIndex] = useState(0);
  const [conversationHistory, setConversationHistory] = useState([]);

  const handleNewConversation = () => {
    setConversationHistory([...conversationHistory, []]);
    setCurrentConversationIndex(conversationHistory.length);
  };

  const handleDeleteConversation = (index) => {
    const updatedConversations = conversationHistory.filter(
      (_, conversationIndex) => conversationIndex !== index
    );
    setConversationHistory(updatedConversations);
    if (currentConversationIndex >= index)
      setCurrentConversationIndex((prevState) => prevState - 1);
  };

  const handleConversationSelected = (index) => {
    setCurrentConversationIndex(index);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleOpenChatHistory = () => {
    setOpenChatHistory(!openChatHistory);
  };

  const handleOpenChatAssistant = () => {
    setOpenChatAssistant(!openChatAssistant);
  };

  return (
    <ThemeProvider attribute="class">
      <div className="flex flex-col h-screen">
        <Navbar />
        <div className="flex flex-col-reverse h-full w-full sm:flex-row">
          <TabNavRail activeTab={activeTab} handleTabChange={handleTabChange} />

          <div className="dark:bg-black flex h-full w-full relative lg:static">
            {activeTab === "intro" && <Intro />}
            {activeTab === "chat" && (
              <div className="flex flex-col-reverse w-full h-full">
                <Chat
                  openChatHistory={openChatHistory}
                  openChatAssistant={openChatAssistant}
                  currentConversationIndex={currentConversationIndex}
                  conversationHistory={conversationHistory}
                  setConversationHistory={setConversationHistory}
                  handleNewConversation={handleNewConversation}
                  handleDeleteConversation={handleDeleteConversation}
                  handleConversationSelected={handleConversationSelected}
                  handleOpenChatHistory={handleOpenChatHistory}
                  handleOpenChatAssistant={handleOpenChatAssistant}
                />
                {activeTab === "chat" && (
                  <div className="w-full flex justify-between px-2 pb-2 sm:pt-2 lg:hidden">
                    <AiOutlineMenu
                      size={25}
                      className="cursor-pointer"
                      onClick={handleOpenChatHistory}
                    />
                    <BiBrain
                      size={25}
                      className="cursor-pointer"
                      onClick={handleOpenChatAssistant}
                    />
                  </div>
                )}
              </div>
            )}
            {activeTab === "account" && <Account />}
          </div>

          <SettingsNavRail />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default DashboardPage;
