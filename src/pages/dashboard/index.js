"use client";

import Navbar from "../../components/Navbar.js";
import TabNavRail from "../../components/TabNavRail.js";
import SettingsNavRail from "../../components/SettingsNavRail.js";
import Intro from "../../components/Intro.js";
import Chat from "../../components/Chat/Chat.js";
import Account from "../../components/Account.js";
import { useState } from "react";

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
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-col-reverse h-full w-full sm:flex-row ">
        <TabNavRail activeTab={activeTab} handleTabChange={handleTabChange} />

        <div className="flex bg-gray-100 h-full w-full relative lg:static">
          {activeTab === "intro" && <Intro />}
          {activeTab === "chat" && (
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
          )}
          {activeTab === "account" && <Account />}
        </div>
        <SettingsNavRail />
      </div>
    </div>
  );
};

export default DashboardPage;
