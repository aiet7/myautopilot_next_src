"use client";

import { ThemeProvider } from "next-themes";

import Navbar from "../../components/Navbar.js";
import TabNavRail from "../../components/TabNavRail.js";
import ChatSettingsRail from "../../components/ChatSettingsRail.js";
import Intro from "../../components/Intro.js";
import Chat from "../../components/Chat/Chat.js";
import Account from "../../components/Account.js";

import { useState, useEffect } from "react";

const DashboardPage = () => {
  const [height, setHeight] = useState(null);

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

  return (
    <ThemeProvider attribute="class">
      {height && (
        <div className="flex flex-col h-full w-full" style={{ height: `${height}px` }}>
          <Navbar />
          <div
            className="flex flex-col h-full w-full md:flex-row-reverse"
            style={{ height: `calc(${height}px - 60px)` }}
          >
            {activeTab === "intro" && <Intro />}
            {activeTab === "chat" && (
              <div className="flex flex-col h-full w-full overflow-hidden" >
                <ChatSettingsRail
                  handleOpenChatHistory={handleOpenChatHistory}
                  handleOpenChatAssistant={handleOpenChatAssistant}
                />

                <Chat
                  openChatHistory={openChatHistory}
                  openChatAssistant={openChatAssistant}
                  currentConversationIndex={currentConversationIndex}
                  conversationHistory={conversationHistory}
                  setConversationHistory={setConversationHistory}
                  handleNewConversation={handleNewConversation}
                  handleDeleteConversation={handleDeleteConversation}
                  handleConversationSelected={handleConversationSelected}
                />
              </div>
            )}
            {activeTab === "account" && <Account />}

            <TabNavRail
              activeTab={activeTab}
              handleTabChange={handleTabChange}
            />
          </div>
        </div>
      )}
    </ThemeProvider>
  );
};

export default DashboardPage;
