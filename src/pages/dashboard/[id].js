"use client";

import { ThemeProvider } from "next-themes";

import TabNavRail from "../../components/TabNavRail.js";
import SettingsRail from "../../components/SettingsRail.js";
import Chat from "../../components/Chat/Chat.js";
import Agent from "../..//components/Agents/Agent.js";
import Account from "../../components/Account.js";

import { useState, useEffect } from "react";

const DashboardPage = ({
  initialUser,
  initialConversations,
  initialAgents,
  initialMessages,
}) => {
  const [height, setHeight] = useState(null);

  const [activeTab, setActiveTab] = useState(null);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [hoverPreview, setHoverPreview] = useState(null);

  const [promptAssistantInput, setPromptAssistantInput] = useState("");

  const [openChatHistory, setOpenChatHistory] = useState(false);
  const [openChatAssistant, setOpenChatAssistant] = useState(false);
  const [openChatHistoryHover, setOpenChatHistoryHover] = useState(false);

  const [openAgentHistory, setOpenAgentHistory] = useState(false);
  const [openAgentAssistant, setOpenAgentAssistant] = useState(false);
  const [openAgentSelectionHover, setOpenAgentSelectionHover] = useState(false);

  const [openSettings, setOpenSettings] = useState(false);

  const [conversationHistories, setConversationHistories] = useState({});

  const [currentConversationIndices, setCurrentConversationIndices] = useState(
    {}
  );

  const handlePromptAssistantInput = (prompt) => {
    setPromptAssistantInput("");
    setTimeout(() => {
      setPromptAssistantInput(prompt);
      setOpenChatAssistant(false);
    }, 0);
  };

  const handleNewConversation = async (index) => {
    const currentAgent = selectedAgent || hoverPreview;
    const newConversation = {
      userID: initialUser.id,
      conversationName: `Chat ${index + 1}`,
      agentID: currentAgent,
    };

    try {
      const response = await fetch(
        // `http://localhost:9019/addConversation`,
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

        setConversationHistories((prevState) => ({
          ...prevState,
          [currentAgent]: [
            ...(prevState[currentAgent] || []),
            addedConversation,
          ],
        }));
        setCurrentConversationIndices((prevState) => ({
          ...prevState,
          [currentAgent]: index,
        }));

        return addedConversation;
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleDeleteConversation = async (index) => {
    if (index < conversationHistories[selectedAgent].length) {
      const conversationToDelete = conversationHistories[selectedAgent][index];

      try {
        const response = await fetch(
          // `http://localhost:9019/deleteConversation?conversationId=${conversationToDelete.id}`
          `https://etech7-wf-etech7-db-service.azuremicroservices.io/deleteConversation?conversationId=${conversationToDelete.id}`
        );
        if (response.ok) {
          const updatedHistories = conversationHistories[selectedAgent].filter(
            (_, currentIndex) => currentIndex !== index
          );
          setConversationHistories((prevState) => ({
            ...prevState,
            [selectedAgent]: updatedHistories,
          }));

          if (currentConversationIndices[selectedAgent] > 0) {
            setCurrentConversationIndices((prevState) => ({
              ...prevState,
              [selectedAgent]: prevState[selectedAgent] - 1,
            }));
          } else if (updatedHistories.length > 0) {
            setCurrentConversationIndices((prevState) => ({
              ...prevState,
              [selectedAgent]: 0,
            }));
          }
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  const handleConversationSelected = (index, agentID) => {
    setCurrentConversationIndices((prevState) => ({
      ...prevState,
      [agentID]: index,
    }));
    setOpenChatHistory(false);

    if (openChatHistoryHover) {
      setActiveTab("general");
    }

    handleOpenChatHistoryHide();
  };

  const handleAgentSelected = (id) => {
    setSelectedAgent(id);
    if (!conversationHistories[id]) {
      setConversationHistories((prevState) => ({
        ...prevState,
        [id]: [],
      }));
    }
    setActiveTab("agents");
    handleOpenAgentSelectionHide();
  };

  const handleTabChange = (tab) => {
    if (tab === "agents") {
      setActiveTab("agents");
    }

    if (tab === "general" && activeTab === "general") {
      return;
    }

    setActiveTab(tab);
    setOpenAgentSelectionHover(false);
    setOpenChatHistoryHover(false);
    setSelectedAgent(null);
  };

  const handleOpenChatHistory = () => {
    setOpenChatHistory(!openChatHistory);
  };

  const handleOpenChatAssistant = () => {
    setOpenChatAssistant(!openChatAssistant);
  };

  const handleOpenAgentHistory = () => {
    setOpenAgentHistory(!openAgentHistory);
  };

  const handleOpenAgentAssistant = () => {
    setOpenAgentAssistant(!openAgentAssistant);
  };

  const handleOpenSettings = () => {
    setOpenSettings(!openSettings);
  };

  const handleOpenChatHistoryVisible = () => {
    setOpenChatHistoryHover(true);
    const generalAgent = initialAgents.find(
      (agent) => agent.agentName === "General Agent"
    );
    if (generalAgent) {
      setHoverPreview(generalAgent.id);
    } else {
      console.log("Not found");
    }
  };

  const handleOpenChatHistoryHide = () => {
    setOpenChatHistoryHover(false);
    if (activeTab !== "general") {
      setHoverPreview(null);
    }
  };

  const handleOpenAgentSelectionVisible = () => {
    setOpenAgentSelectionHover(true);
  };

  const handleOpenAgentSelectionHide = () => {
    setOpenAgentSelectionHover(false);
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
    const updatedConversationHistories = initialConversations.reduce(
      (acc, conversation, index) => {
        const agentID = conversation.agentID;
        if (!acc[agentID]) acc[agentID] = [];
        acc[agentID].push({
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
        });
        return acc;
      },
      {}
    );
    setConversationHistories(updatedConversationHistories);
  }, [initialConversations, initialMessages]);

  useEffect(() => {
    const lastTab = localStorage.getItem("lastTab");
    const lastConversationIndicesString = localStorage.getItem(
      "lastConversationIndices"
    );

    if (lastTab) {
      setActiveTab(lastTab);
    }

    if (lastConversationIndicesString) {
      const lastConversationIndices = JSON.parse(lastConversationIndicesString);
      setCurrentConversationIndices(lastConversationIndices);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("lastTab", activeTab);
    localStorage.setItem(
      "lastConversationIndices",
      JSON.stringify(currentConversationIndices)
    );
  }, [activeTab, currentConversationIndices, selectedAgent]);

  useEffect(() => {
    if (activeTab === "general") {
      const generalAgent = initialAgents.find(
        (agent) => agent.agentName === "General Agent"
      );
      if (generalAgent) {
        setSelectedAgent(generalAgent.id);
      } else {
        console.log("Not found");
      }
    }
  }, [activeTab, initialAgents]);

  useEffect(() => {
    setActiveTab("general");
  }, []);

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
                activeTab === "general"
                  ? `flex flex-col h-full w-full overflow-hidden`
                  : "hidden"
              }
            >
              <SettingsRail
                handleOpenChatHistory={
                  activeTab === "general" ? handleOpenChatHistory : undefined
                }
                handleOpenChatAssistant={
                  activeTab === "general" ? handleOpenChatAssistant : undefined
                }
              />

              <Chat
                initialUser={initialUser}
                activeTab={activeTab}
                selectedAgent={selectedAgent}
                promptAssistantInput={promptAssistantInput}
                openChatHistory={openChatHistory}
                openChatAssistant={openChatAssistant}
                openChatHistoryHover={openChatHistoryHover}
                currentConversationIndices={currentConversationIndices}
                conversationHistories={conversationHistories}
                setConversationHistories={setConversationHistories}
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
                activeTab === "agents"
                  ? `flex flex-col h-full w-full overflow-hidden`
                  : "hidden"
              }
            >
              <SettingsRail
                handleOpenAgentHistory={
                  activeTab === "agents" ? handleOpenAgentHistory : undefined
                }
                handleOpenAgentAssistant={
                  activeTab === "agents" ? handleOpenAgentAssistant : undefined
                }
              />
              <Agent
                initialUser={initialUser}
                initialAgents={initialAgents}
                selectedAgent={selectedAgent}
                promptAssistantInput={promptAssistantInput}
                conversationHistories={conversationHistories}
                currentConversationIndices={currentConversationIndices}
                openAgentHistory={openAgentHistory}
                openAgentAssistant={openAgentAssistant}
                openAgentHistoryHover={openAgentSelectionHover}
                setConversationHistories={setConversationHistories}
                handlePromptAssistantInput={handlePromptAssistantInput}
                handleConversationSelected={handleConversationSelected}
                handleNewConversation={handleNewConversation}
                handleDeleteConversation={handleDeleteConversation}
                handleOpenAgentHistory={handleOpenAgentHistory}
                handleOpenAgentAssistant={handleOpenAgentAssistant}
                handleOpenAgentSelectionHide={handleOpenAgentSelectionHide}
                handleAgentSelected={handleAgentSelected}
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
              initialAgents={initialAgents}
              selectedAgent={selectedAgent}
              hoverPreview={hoverPreview}
              activeTab={activeTab}
              openChatHistory={openChatHistory}
              openAgentHistory={openAgentHistory}
              openChatHistoryHover={openChatHistoryHover}
              openAgentSelectionHover={openAgentSelectionHover}
              openSettings={openSettings}
              currentConversationIndices={currentConversationIndices}
              conversationHistories={conversationHistories}
              setConversationHistories={setConversationHistories}
              handleNewConversation={handleNewConversation}
              handleDeleteConversation={handleDeleteConversation}
              handleConversationSelected={handleConversationSelected}
              handleAgentSelected={handleAgentSelected}
              handleTabChange={handleTabChange}
              handleOpenSettings={handleOpenSettings}
              handleOpenChatHistoryVisible={handleOpenChatHistoryVisible}
              handleOpenChatHistoryHide={handleOpenChatHistoryHide}
              handleOpenAgentSelectionVisible={handleOpenAgentSelectionVisible}
              handleOpenAgentSelectionHide={handleOpenAgentSelectionHide}
            />
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

  const userApi = `https://etech7-wf-etech7-db-service.azuremicroservices.io/getUserById?userId=${userId}`;
  // `http://localhost:9019/getUserById?userId=${userId}`;

  const conversationApi = `https://etech7-wf-etech7-db-service.azuremicroservices.io/getConversations?userId=${userId}`;
  // `http://localhost:9019/getConversations?userId=${userId}`;

  const agentApi =
    "https://etech7-wf-etech7-db-service.azuremicroservices.io/getAgents";
  // `http://localhost:9019/getAgents`;

  const [userResponse, conversationResponse, agentResponse] = await Promise.all(
    [fetch(userApi), fetch(conversationApi), fetch(agentApi)]
  );

  const [initialUser, initialConversations, initialAgents] = await Promise.all([
    userResponse.json(),
    conversationResponse.json(),
    agentResponse.json(),
  ]);

  const messagePromises = initialConversations.map(async (conversation) => {
    const messageApi = `https://etech7-wf-etech7-db-service.azuremicroservices.io/getMessages?conversationId=${conversation.id}`; //
    // `http://localhost:9019/getMessages?conversationId=${conversation.id}`;

    const response = await fetch(messageApi);
    return await response.json();
  });

  const initialMessages = await Promise.all(messagePromises);

  return {
    props: {
      initialUser,
      initialConversations,
      initialAgents,
      initialMessages,
    },
  };
};

export default DashboardPage;
