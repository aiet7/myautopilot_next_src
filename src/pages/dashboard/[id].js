"use client";

import { ThemeProvider } from "next-themes";

import TabNavRail from "../../components/TabNavRail.js";
import ChatSettingsRail from "../../components/ChatSettingsRail.js";
import Intro from "../../components/Intro.js";
import Chat from "../../components/Chat/Chat.js";
import Account from "../../components/Account.js";

import { useState, useEffect } from "react";

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
  const [openSettings, setOpenSettings] = useState(false);

  const [currentConversationIndex, setCurrentConversationIndex] = useState(0);
  const [conversationHistory, setConversationHistory] = useState([]);

  const handlePromptAssistantInput = (prompt) => {
    setPromptAssistantInput(prompt);
    setOpenChatAssistant(false);
  };

  const handleNewConversation = async (index) => {
    const newConversation = {
      userID: initialUser.id,
      conversationName: `Chat ${index + 1}`,
    };

    try {
      const response = await fetch(
        /*`http://localhost:9019/addConversation`,*/
        `https://etech7-wf-etech7-db-service.azuremicroservices.io/addConversation`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newConversation),
        }
      );

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
          /*`http://localhost:9019/deleteConversation?conversationId=${conversationToDelete.id}`*/
          `https://etech7-wf-etech7-db-service.azuremicroservices.io/deleteConversation?conversationId=${conversationToDelete.id}`
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
    setOpenChatHistory(false);
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

  const handleOpenSettings = () => {
    setOpenSettings(!openSettings);
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

  useEffect(() => {
    const lastTab = localStorage.getItem("lastTab");
    const lastConversationIndex = localStorage.getItem("lastConversationIndex");
    if (lastTab) {
      setActiveTab(lastTab);
    }

    if (lastConversationIndex) {
      setCurrentConversationIndex(parseInt(lastConversationIndex, 10));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("lastTab", activeTab);
    localStorage.setItem(
      "lastConversationIndex",
      currentConversationIndex.toString()
    );
  }, [activeTab, currentConversationIndex]);

  return (
    <ThemeProvider attribute="class">
      {height && (
        <div
          onClick={() => openSettings && handleOpenSettings(false)}
          className="flex flex-col h-full w-full"
          style={{ height: `${height}px` }}
        >
          <div className="flex flex-col h-full w-full lg:flex-row-reverse">
            <div
              className={
                activeTab === "intro"
                  ? "overflow-auto h-full w-full no-scrollbar"
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
                activeTab={activeTab}
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
                handleOpenChatHistory={handleOpenChatHistory}
                handleOpenChatAssistant={handleOpenChatAssistant}
              />
            </div>

            <div
              className={
                activeTab === "settings"
                  ? "overflow-auto h-full w-full no-scrollbar"
                  : "hidden"
              }
            >
              <Account initialUser={initialUser} />
            </div>

            <TabNavRail
              openSettings={openSettings}
              activeTab={activeTab}
              handleTabChange={handleTabChange}
              handleOpenSettings={handleOpenSettings}
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

  const userApi = `https://etech7-wf-etech7-db-service.azuremicroservices.io/getUserById?userId=${userId}`;
  /*`http://localhost:9019/getUserById?userId=${userId}`;*/

  const conversationApi = `https://etech7-wf-etech7-db-service.azuremicroservices.io/getConversations?userId=${userId}`;
  /*`http://localhost:9019/getConversations?userId=${userId}`;*/

  const [userResponse, conversationResponse] = await Promise.all([
    fetch(userApi),
    fetch(conversationApi),
  ]);

  const [initialUser, initialConversations] = await Promise.all([
    userResponse.json(),
    conversationResponse.json(),
  ]);

  const messagePromises = initialConversations.map(async (conversation) => {
    const messageApi = `https://etech7-wf-etech7-db-service.azuremicroservices.io/getMessages?conversationId=${conversation.id}`;
    /*`http://localhost:9019/getMessages?conversationId=${conversation.id}`;*/

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
