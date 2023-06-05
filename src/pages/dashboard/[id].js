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

const DashboardPage = ({
  initialUser,
  initialConversations,
  initialMessages,
}) => {
  const [height, setHeight] = useState(null);

  const [activeTab, setActiveTab] = useState("intro");

  const [promptAssistantInput, setPromptAssistantInput] = useState("");

  const [openChatHistory, setOpenChatHistory] = useState(false);
  const [openChatAssistant, setOpenChatAssistant] = useState(false);

  const [currentConversationIndex, setCurrentConversationIndex] = useState(0);
  const [conversationHistory, setConversationHistory] = useState([]);

  const handlePromptAssistantInput = (prompt) => {
    setPromptAssistantInput(prompt);
  };

  const handleNewConversation = async (index) => {
    const newConversation = {
      userID: initialUser.id,
      conversationName: `Chat ${index + 1}`,
    };

    try {
      const response = await fetch(`http://localhost:9019/addConversation`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newConversation),
      });

      if (response.ok) {
        const addedConversation = await response.json();
        setConversationHistory([...conversationHistory, addedConversation]);
        setCurrentConversationIndex(conversationHistory.length);
        return addedConversation;
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleDeleteConversation = async (index) => {
    if (index < conversationHistory.length) {
      const conversationToDelete = conversationHistory[index];
      
      try {
        const response = await fetch(
          `http://localhost:9019/deleteConversation?conversationId=${conversationToDelete.id}`
        );
        if (response.ok) {
          const updatedConversationHistory = conversationHistory.filter(
            (_, currentConversationIndex) => currentConversationIndex !== index
          );
          setConversationHistory(updatedConversationHistory);
          if (currentConversationIndex > 0) {
            setCurrentConversationIndex((prevState) => prevState - 1);
          } else if (updatedConversationHistory.length > 0) {
            setCurrentConversationIndex(0);
          }
        }
      } catch (e) {
        console.log(e);
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

  useEffect(() => {
    const updatedConversationHistory = initialConversations.map(
      (conversation, index) => {
        return {
          ...conversation,
          messages:
            initialMessages[index]
              ?.flatMap((message) => [
                {
                  id: message.id + "-user",
                  content: message.userContent,
                  role: "user",
                  timeStamp: message.timeStamp,
                },
                {
                  id: message.id + "-ai",
                  content: message.aiContent,
                  role: "assistant",
                  timeStamp: message.timeStamp,
                },
              ])
              .sort((a, b) => new Date(a.timeStamp) - new Date(b.timeStamp)) ||
            [],
        };
      }
    );
    setConversationHistory(updatedConversationHistory);
  }, [initialConversations, initialMessages]);


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
                initialUser={initialUser}
                
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

  const userApi = `http://localhost:9019/getUserById?userId=${userId}`;
  const conversationApi = `http://localhost:9019/getConversations?userId=${userId}`;

  const [userResponse, conversationResponse] = await Promise.all([
    fetch(userApi),
    fetch(conversationApi),
  ]);

  const [initialUser, initialConversations] = await Promise.all([
    userResponse.json(),
    conversationResponse.json(),
  ]);

  const messagePromises = initialConversations.map(async (conversation) => {
    const messageApi = `http://localhost:9019/getMessages?conversationId=${conversation.id}`;
    const response = await fetch(messageApi);
    return await response.json();
  });

  const initialMessages = await Promise.all(messagePromises);

  return {
    props: {
      initialUser,
      initialConversations,
      initialMessages,
    },
  };
};

export default DashboardPage;
