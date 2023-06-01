"use client";

import { ThemeProvider } from "next-themes";

import Navbar from "../../components/Navbar.js";
import TabNavRail from "../../components/TabNavRail.js";
import ChatSettingsRail from "../../components/ChatSettingsRail.js";
import Intro from "../../components/Intro.js";
import Chat from "../../components/Chat/Chat.js";
import Account from "../../components/Account.js";

import { useState, useEffect } from "react";
import { generateTitle } from "../../utils/titleGenerator.js";

const DashboardPage = ({ initialUser }) => {
  const [height, setHeight] = useState(null);

  const [activeTab, setActiveTab] = useState("intro");

  const [promptAssistantInput, setPromptAssistantInput] = useState("");

  const [openChatHistory, setOpenChatHistory] = useState(false);
  const [openChatAssistant, setOpenChatAssistant] = useState(false);

  const [currentConversationIndex, setCurrentConversationIndex] = useState(0);
  const [conversationHistory, setConversationHistory] = useState([]);
  const [conversationTitles, setConversationTitles] = useState([]);

  /*const handleCheckAndGenerateTitle = async (message) => {
    if (
      conversationHistory.length === 0 ||
      conversationHistory[currentConversationIndex].length === 0
    ) {
      const title = await generateTitle(message);
      setConversationTitles((prevTitles) => {
        const newTitles = [...prevTitles];
        newTitles[currentConversationIndex] = title;
        return newTitles;
      });
    }
  };*/

  const handlePromptAssistantInput = (prompt) => {
    setPromptAssistantInput(prompt);
  };

  const handleNewConversation = () => {
    setConversationHistory([...conversationHistory, []]);
    /*setConversationTitles([...conversationTitles, ""]);*/
    setCurrentConversationIndex(conversationHistory.length);
  };

  const handleDeleteConversation = (index) => {
    if (index < conversationHistory.length) {
      const updatedConversationHistory = conversationHistory.filter(
        (_, conversationIndex) => conversationIndex !== index
      );
      /*const updatedConversationTitles = conversationTitles.filter(
        (_, conversationIndex) => conversationIndex !== index
      );*/

      setConversationHistory(updatedConversationHistory);
      /*setConversationTitles(updatedConversationTitles);*/

      if (currentConversationIndex > 0) {
        setCurrentConversationIndex((prevState) => prevState - 1);
      } else if (updatedConversationHistory.length > 0) {
        setCurrentConversationIndex(0);
      }
    }
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
        <div
          className="flex flex-col h-full w-full"
          style={{ height: `${height}px` }}
        >
          <Navbar />
          <div
            className="flex flex-col h-full w-full md:flex-row-reverse"
            style={{ height: `calc(${height}px - 60px)` }}
          >
            <div
              className={
                activeTab === "intro"
                  ? "overflow-auto w-full no-scrollbar"
                  : "hidden"
              }
            >
              <Intro />
            </div>

            <div
              className={
                activeTab === "chat"
                  ? `flex flex-col h-full w-full overflow-hidden`
                  : "hidden"
              }
            >
              <ChatSettingsRail
                handleOpenChatHistory={handleOpenChatHistory}
                handleOpenChatAssistant={handleOpenChatAssistant}
              />

              <Chat
                promptAssistantInput={promptAssistantInput}
                openChatHistory={openChatHistory}
                openChatAssistant={openChatAssistant}
                currentConversationIndex={currentConversationIndex}
                conversationHistory={conversationHistory}
                setConversationHistory={setConversationHistory}
                handlePromptAssistantInput={handlePromptAssistantInput}
                handleNewConversation={handleNewConversation}
                handleDeleteConversation={handleDeleteConversation}
                handleConversationSelected={handleConversationSelected}
              />
            </div>

            <div
              className={
                activeTab === "account"
                  ? "overflow-auto w-full no-scrollbar"
                  : "hidden"
              }
            >
              <Account initialUser={initialUser} />
            </div>

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

export const getServerSideProps = async (context) => {
  const { params } = context;
  const userId = params.id;

  const userApi = await fetch(
    `http://localhost:9019/getUserById?userId=${userId}`
  );

  const userResponse = await userApi.json();

  return {
    props: {
      initialUser: userResponse,
    },
  };
};

export default DashboardPage;
