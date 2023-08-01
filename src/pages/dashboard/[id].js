"use client";

import { ThemeProvider } from "next-themes";

import TabNavRail from "../../components/TabNavRail.js";
import SettingsRail from "../../components/SettingsRail.js";
import Chat from "../../components/Chat/Chat.js";
import Agent from "../..//components/Agents/Agent.js";
import Account from "../../components/Account.js";

import { useState, useEffect } from "react";
import Teams from "../../components/Teams/Teams.js";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

import {
  handleServerPropsData,
  handleGetRooms,
  handleGetRoomMessages,
} from "../../utils/api/serverProps.js";

const DashboardPage = ({
  initialUser,
  initialConversations,
  initialAgents,
  initialMessages,
  initialRooms,
  initialRoomMessages,
}) => {
  const [height, setHeight] = useState(null);
  const [connected, setConnected] = useState(false);
  const [client, setClient] = useState(null);
  const [subscribed, setSubscribed] = useState(false);
  const [wsIsPending, setWsIsPending] = useState({
    "/topic/mainResponses": { role: "CEO", status: "pending" },
    "/topic/reasonResponses": { role: "Advisor", status: "pending" },
    "/topic/criticResponses": { role: "Critic", status: "pending" },
    "/topic/decisionResponses": { role: "Analytic", status: "pending" },
  });
  const [activeTab, setActiveTab] = useState(null);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [hoverPreview, setHoverPreview] = useState(null);
  const [showSummarized, setShowSummarized] = useState(false);

  const [promptAssistantInput, setPromptAssistantInput] = useState("");

  const [openChatHistory, setOpenChatHistory] = useState(false);
  const [openChatAssistant, setOpenChatAssistant] = useState(false);
  const [openChatHistoryHover, setOpenChatHistoryHover] = useState(false);

  const [openAgentHistory, setOpenAgentHistory] = useState(false);
  const [openAgentAssistant, setOpenAgentAssistant] = useState(false);
  const [openAgentSelectionHover, setOpenAgentSelectionHover] = useState(false);

  const [openTeamsHistory, setOpenTeamsHistory] = useState(false);
  const [openTeamsAssistant, setOpenTeamsAssistant] = useState(false);

  const [openSettings, setOpenSettings] = useState(false);

  const [conversationHistories, setConversationHistories] = useState({});

  const [currentConversationIndices, setCurrentConversationIndices] = useState(
    {}
  );
  const [teamsHistories, setTeamsHistories] = useState([]);
  const [currentTeamsIndex, setCurrentTeamsIndex] = useState(0);

  const handleShowSummarized = async () => {
    setShowSummarized(!showSummarized);

    const rooms = await handleGetRooms(initialUser.id);

    const roomMessages = await Promise.all(
      rooms.map((room) => handleGetRoomMessages(room.id))
    );

    const updatedTeamHistories = rooms.map((room, index) => {
      const messagesForThisRoom = roomMessages.flatMap((messageGroup) => {
        return (
          messageGroup
            .filter((message) => message.roomID === room.id)
            .flatMap((message) => [
              {
                id: message.id + "-user",
                role: "user",
                originalContent: message.roomAgents.userPrompt,
                summarizedContent: null,
                timeStamp: message.timeStamp,
              },
              {
                id: message.id + "-CEO",
                role: "CEO",
                originalContent: message.roomAgents.mainPrompt,
                summarizedContent: message.summarizedRoomAgents.mainPrompt,
                timeStamp: message.timeStamp,
              },
              {
                id: message.id + "-Advisor",
                role: "Advisor",
                originalContent: message.roomAgents.reasonPrompt,
                summarizedContent: message.summarizedRoomAgents.reasonPrompt,
                timeStamp: message.timeStamp,
              },
              {
                id: message.id + "-Critic",
                role: "Critic",
                originalContent: message.roomAgents.criticPrompt,
                summarizedContent: message.summarizedRoomAgents.criticPrompt,
                timeStamp: message.timeStamp,
              },
              {
                id: message.id + "-Analytic",
                role: "Analytic",
                originalContent: message.roomAgents.decisionPrompt,
                summarizedContent: message.summarizedRoomAgents.decisionPrompt,
                timeStamp: message.timeStamp,
              },
            ])
            .sort((a, b) => new Date(a.timeStamp) - new Date(b.timeStamp)) || []
        );
      });

      return {
        ...room,
        messages: messagesForThisRoom.flat(),
      };
    });

    setTeamsHistories(updatedTeamHistories);
  };

  const handleInitialWebSocketResponse = (role, roomId, content) => {
    setTeamsHistories((prevState) => {
      const teamIndex = prevState.findIndex((team) => team.id === roomId);
      if (teamIndex === -1) return prevState;
      const newHistories = [...prevState];
      const messages = [...(newHistories[teamIndex].messages || [])];

      messages.push({
        id: Date.now() + `-${role}`,
        role,
        originalContent: content,
        summarizedContent: null,
      });
      newHistories[teamIndex] = {
        ...newHistories[teamIndex],
        messages,
      };
      return newHistories;
    });
  };

  const handleConnectToWebSocket = (roomId, goal) => {
    const socket = new SockJS(
      "https://etech7-wf-etech7-room-service.azuremicroservices.io/ws"
    );
    const stompClient = new Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        setShowSummarized(false);
        setWsIsPending({
          "/topic/mainResponses": { role: "CEO", status: "pending" },
          "/topic/reasonResponses": { role: "Advisor", status: "pending" },
          "/topic/criticResponses": { role: "Critic", status: "pending" },
          "/topic/decisionResponses": { role: "Analytic", status: "pending" },
        });
        setConnected(true);

        if (!subscribed) {
          stompClient.subscribe(`/topic/mainResponses/${roomId}`, (message) => {
            handleInitialWebSocketResponse("CEO", roomId, message.body);
            setWsIsPending((prevState) => ({
              ...prevState,
              "/topic/mainResponses": {
                ...prevState["/topic/mainResponses"],
                status: "complete",
              },
            }));
          });

          stompClient.subscribe(
            `/topic/reasonResponses/${roomId}`,
            (message) => {
              handleInitialWebSocketResponse("Advisor", roomId, message.body);
              setWsIsPending((prevState) => ({
                ...prevState,
                "/topic/reasonResponses": {
                  ...prevState["/topic/reasonResponses"],
                  status: "complete",
                },
              }));
            }
          );

          stompClient.subscribe(
            `/topic/criticResponses/${roomId}`,
            (message) => {
              handleInitialWebSocketResponse("Critic", roomId, message.body);
              setWsIsPending((prevState) => ({
                ...prevState,
                "/topic/criticResponses": {
                  ...prevState["/topic/criticResponses"],
                  status: "complete",
                },
              }));
            }
          );

          stompClient.subscribe(
            `/topic/decisionResponses/${roomId}`,
            (message) => {
              handleInitialWebSocketResponse("Analytic", roomId, message.body);
              setWsIsPending((prevState) => ({
                ...prevState,
                "/topic/decisionResponses": {
                  ...prevState["/topic/decisionResponses"],
                  status: "complete",
                },
              }));
            }
          );
          setSubscribed(true);
        }
        stompClient.publish({
          destination: "/app/userInput1",
          body: JSON.stringify({
            message: goal,
            roomId,
          }),
        });
      },
      onDisconnect: () => {
        setConnected(false);
        setSubscribed(false);
      },
    });
    stompClient.activate();
    setClient(stompClient);
  };

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

  const handleCreateNewRoom = () => {
    if (client) {
      client.deactivate();
    }

    const newRoom = {
      roomName: `Room ${teamsHistories.length + 1}`,
      goal: "",
      industry: "",
    };
    setTeamsHistories((prevState) => [...prevState, newRoom]);
    setCurrentTeamsIndex(teamsHistories.length);
  };

  const handleSaveRoom = async () => {
    const currentRoom = teamsHistories[currentTeamsIndex];
    const roomToSave = {
      userID: initialUser.id,
      roomName: currentRoom.roomName,
      roomIndustry: currentRoom.industry,
      roomUserInput: currentRoom.goal,
    };

    try {
      const response = await fetch(
        `https://etech7-wf-etech7-db-service.azuremicroservices.io/addRoom`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(roomToSave),
        }
      );

      if (response.ok) {
        const savedRoom = await response.json();
        savedRoom.messages = [
          {
            id: Date.now() + "-user",
            role: "user",
            originalContent: savedRoom.roomUserInput,
            summarizedContent: null,
          },
        ];
        setTeamsHistories((prevState) =>
          prevState.map((room, index) =>
            index === currentTeamsIndex ? savedRoom : room
          )
        );
        handleConnectToWebSocket(savedRoom.id, savedRoom.roomUserInput);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleDeleteTeamRoom = (index) => {};

  const handleTeamRoomSelected = (index) => {
    if (client) {
      client.deactivate();
    }

    setCurrentTeamsIndex(index);
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

  const handleOpenTeamsHistory = () => {
    setOpenTeamsHistory(!openTeamsHistory);
  };

  const handleOpenTeamsAssistant = () => {
    setOpenTeamsAssistant(!openTeamsAssistant);
  };

  const handleOpenSettings = () => {
    setOpenSettings(!openSettings);
  };

  const handleOpenChatHistoryVisible = () => {
    handleOpenAgentSelectionHide();
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
    handleOpenChatHistoryHide();
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
    const updatedTeamHistories = initialRooms.map((room) => {
      const messagesForThisRoom = initialRoomMessages.flatMap(
        (messageGroup) => {
          return (
            messageGroup
              .filter((message) => message.roomID === room.id)
              .flatMap((message) => [
                {
                  id: message.id + "-user",
                  role: "user",
                  originalContent: message.roomAgents.userPrompt,
                  summarizedContent: null,
                  timeStamp: message.timeStamp,
                },
                {
                  id: message.id + "-CEO",
                  role: "CEO",
                  originalContent: message.roomAgents.mainPrompt,
                  summarizedContent: message.summarizedRoomAgents.mainPrompt,
                  timeStamp: message.timeStamp,
                },
                {
                  id: message.id + "-Advisor",
                  role: "Advisor",
                  originalContent: message.roomAgents.reasonPrompt,
                  summarizedContent: message.summarizedRoomAgents.reasonPrompt,
                  timeStamp: message.timeStamp,
                },
                {
                  id: message.id + "-Critic",
                  role: "Critic",
                  originalContent: message.roomAgents.criticPrompt,
                  summarizedContent: message.summarizedRoomAgents.criticPrompt,
                  timeStamp: message.timeStamp,
                },
                {
                  id: message.id + "-Analytic",
                  role: "Analytic",
                  originalContent: message.roomAgents.decisionPrompt,
                  summarizedContent:
                    message.summarizedRoomAgents.decisionPrompt,
                  timeStamp: message.timeStamp,
                },
              ])
              .sort((a, b) => new Date(a.timeStamp) - new Date(b.timeStamp)) ||
            []
          );
        }
      );

      return {
        ...room,
        messages: messagesForThisRoom.flat(),
      };
    });
    setTeamsHistories(updatedTeamHistories);
  }, [initialRooms, initialRoomMessages]);

  useEffect(() => {
    localStorage.setItem(
      "wsIsPending",
      JSON.stringify({
        "/topic/mainResponses": { role: "CEO", status: "complete" },
        "/topic/reasonResponses": { role: "Advisor", status: "complete" },
        "/topic/criticResponses": { role: "Critic", status: "complete" },
        "/topic/decisionResponses": { role: "Analytic", status: "complete" },
      })
    );

    const lastTab = localStorage.getItem("lastTab");
    const lastConversationIndicesString = localStorage.getItem(
      "lastConversationIndices"
    );
    const lastRoomIndex = localStorage.getItem("lastRoomIndex");
    const lastWsPendingString = localStorage.getItem("wsIsPending");

    if (lastTab) {
      setActiveTab(lastTab);
    }

    if (lastConversationIndicesString) {
      const lastConversationIndices = JSON.parse(lastConversationIndicesString);
      setCurrentConversationIndices(lastConversationIndices);
    }

    if (lastWsPendingString) {
      const lastWsPending = JSON.parse(lastWsPendingString);
      setWsIsPending(lastWsPending);
    }

    if (lastRoomIndex) {
      setCurrentTeamsIndex(parseInt(lastRoomIndex, 10));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("lastTab", activeTab);
    localStorage.setItem(
      "lastConversationIndices",
      JSON.stringify(currentConversationIndices)
    );
    localStorage.setItem("lastRoomIndex", JSON.stringify(currentTeamsIndex));
  }, [activeTab, currentConversationIndices, selectedAgent, currentTeamsIndex]);

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
          style={{ height: `calc(${height}px - 1px)` }}
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
                activeTab={activeTab}
                selectedAgent={selectedAgent}
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
                activeTab={activeTab}
                selectedAgent={selectedAgent}
                handleOpenAgentHistory={
                  activeTab === "agents" ? handleOpenAgentHistory : undefined
                }
                handleOpenAgentAssistant={
                  activeTab === "agents" ? handleOpenAgentAssistant : undefined
                }
              />
              <Agent
                activeTab={activeTab}
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
                activeTab === "teams"
                  ? `flex flex-col h-full w-full overflow-hidden`
                  : "hidden"
              }
            >
              <SettingsRail
                activeTab={activeTab}
                selectedAgent={selectedAgent}
                handleOpenTeamsHistory={
                  activeTab === "teams" ? handleOpenTeamsHistory : undefined
                }
                handleOpenTeamsAssistant={
                  activeTab === "teams" ? handleOpenTeamsAssistant : undefined
                }
              />
              <Teams
                showSummarized={showSummarized}
                connected={connected}
                wsIsPending={wsIsPending}
                activeTab={activeTab}
                teamsHistories={teamsHistories}
                currentTeamsIndex={currentTeamsIndex}
                openTeamsHistory={openTeamsHistory}
                openTeamsAssistant={openTeamsAssistant}
                setTeamsHistories={setTeamsHistories}
                handleConnectToWebSocket={handleConnectToWebSocket}
                handleShowSummarized={handleShowSummarized}
                handleCreateNewRoom={handleCreateNewRoom}
                handleSaveRoom={handleSaveRoom}
                handleTeamRoomSelected={handleTeamRoomSelected}
                handleOpenTeamsHistory={handleOpenTeamsHistory}
                handleOpenTeamsAssistant={handleOpenTeamsAssistant}
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

  const response = await handleServerPropsData(userId);

  return {
    props: { ...response },
  };
};

export default DashboardPage;
