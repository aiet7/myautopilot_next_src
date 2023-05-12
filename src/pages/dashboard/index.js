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
  const [conversationHistory, setConversationHistory] = useState([]);

  const handleNewConversation = () => {
    setConversationHistory([...conversationHistory, []]);
  };

  const handleDeleteConversation = (index) => {
    const updatedConversations = conversationHistory.filter(
      (_, conversationIndex) => conversationIndex !== index
    );
    setConversationHistory(updatedConversations);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-col-reverse h-full sm:flex-row">
        <TabNavRail activeTab={activeTab} handleTabChange={handleTabChange} />
        <div className="flex bg-gray-100 h-full w-full">
          {activeTab === "intro" && <Intro />}
          {activeTab === "chat" && (
            <Chat
              conversationHistory={conversationHistory}
              handleNewConversation={handleNewConversation}
              handleDeleteConversation={handleDeleteConversation}
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
