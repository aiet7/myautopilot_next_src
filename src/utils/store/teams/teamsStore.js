import { create } from "zustand";
import { handleGetRooms, handleGetRoomMessages } from "../../api/serverProps";
import useUserStore from "../user/userStore";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import useUiStore from "../ui/uiStore";
import useRefStore from "./refStore";

const useTeamsStore = create((set, get) => ({
  userInput: "",
  textAreaHeight: "24px",
  isAtBottom: false,
  isOverflowed: false,
  connected: false,
  client: null,
  subscribed: false,
  wsIsPending: {
    "/topic/mainResponses": { role: "CEO", status: "pending" },
    "/topic/reasonResponses": { role: "Advisor", status: "pending" },
    "/topic/criticResponses": { role: "Critic", status: "pending" },
    "/topic/decisionResponses": { role: "Analytic", status: "pending" },
  },
  showSummarized: false,
  teamsHistories: [],
  currentTeamsIndex: 0,
  tempTitle: "",
  editing: false,
  deleting: false,

  setTempTitle: (title) => set({ tempTitle: title }),
  setEditing: (value) => set({ editing: value }),
  setDeleting: (value) => set({ deleting: value }),
  setConnected: (value) => set({ connected: value }),
  setClient: (value) => set({ client: value }),
  setSubscribed: (value) => set({ subscribed: value }),
  setWsIsPending: (value) => set({ wsIsPending: value }),
  setShowSummarized: (value) => set({ showSummarized: value }),

  initializeTeams: (initialRooms, initialRoomMessages) => {
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
    set({ teamsHistories: updatedTeamHistories });
  },

  initializeSummarization: async (userId) => {
    const rooms = await handleGetRooms(userId);
    const roomMessages = await Promise.all(
      rooms.map((room) => handleGetRoomMessages(room.id))
    );
    return { rooms, roomMessages };
  },

  handleTextAreaChange: (e) => {
    set({
      userInput: e.target.value,
      textAreaheight: `${e.target.scrollHeight}px`,
    });
  },

  handleScrollToBottom: (smooth) => {
    const { latestMessageRef } = useRefStore.getState();
    latestMessageRef.current?.scrollIntoView({
      behavior: smooth ? "smooth" : "auto",
      block: "end",
    });
  },

  handleCheckScroll: () => {
    const { chatContainerRef } = useRefStore.getState();
    const container = chatContainerRef.current;
    const atBottom =
      Math.abs(
        container.scrollHeight - container.scrollTop - container.clientHeight
      ) < 5;
    set({
      isAtBottom: atBottom,
      isOverflowed: container.scrollHeight > container.clientHeight,
    });
  },

  handleSendUserMessage: (message) => {
    const {
      teamsHistories,
      currentTeamsIndex,
      handleAddUserMessage,
      handleConnectToWebSocket,
    } = get();
    if (message.trim() !== "") {
      handleAddUserMessage(message);
      set({ userInput: "" });
      try {
        handleConnectToWebSocket(teamsHistories[currentTeamsIndex].id, message);
      } catch (e) {
        console.log(e);
      }
    }
  },

  handleShowSummarized: async () => {
    const userStore = useUserStore.getState();
    const {
      showSummarized,
      teamsHistories,
      currentTeamsIndex,
      initializeSummarization,
      initializeTeams,
    } = get();
    const currentRoomId = teamsHistories[currentTeamsIndex].id;
    const currentIndex = teamsHistories.findIndex(
      (room) => room.id === currentRoomId
    );
    set({ showSummarized: !showSummarized });

    const { rooms, roomMessages } = await initializeSummarization(
      userStore.user.id
    );
    initializeTeams(rooms, roomMessages);
    set({ currentTeamsIndex: currentIndex });
  },

  handleInitialWebSocketResponse: (role, roomId, content) => {
    set((state) => {
      const teamIndex = state.teamsHistories.findIndex(
        (team) => team.id === roomId
      );
      if (teamIndex === -1) return state.teamsHistories;

      const newHistories = [...state.teamsHistories];
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

      return { teamsHistories: newHistories };
    });
  },

  handleConnectToWebSocket: (roomId, goal) => {
    const { subscribed, handleInitialWebSocketResponse } = get();
    const socket = new SockJS(
      "https://etech7-wf-etech7-room-service.azuremicroservices.io/ws"
    );
    const stompClient = new Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        set({ showSummarized: false });
        set({
          wsIsPending: {
            "/topic/mainResponses": { role: "CEO", status: "pending" },
            "/topic/reasonResponses": { role: "Advisor", status: "pending" },
            "/topic/criticResponses": { role: "Critic", status: "pending" },
            "/topic/decisionResponses": { role: "Analytic", status: "pending" },
          },
        });
        set({ connected: true });

        if (!subscribed) {
          stompClient.subscribe(`/topic/mainResponses/${roomId}`, (message) => {
            handleInitialWebSocketResponse("CEO", roomId, message.body);
            set((prevState) => ({
              ...prevState,
              wsIsPending: {
                ...prevState.wsIsPending,
                "/topic/mainResponses": {
                  ...prevState.wsIsPending["/topic/mainResponses"],
                  status: "complete",
                },
              },
            }));
          });

          stompClient.subscribe(
            `/topic/reasonResponses/${roomId}`,
            (message) => {
              handleInitialWebSocketResponse("Advisor", roomId, message.body);
              set((prevState) => ({
                ...prevState,
                wsIsPending: {
                  ...prevState.wsIsPending,
                  "/topic/reasonResponses": {
                    ...prevState.wsIsPending["/topic/reasonResponses"],
                    status: "complete",
                  },
                },
              }));
            }
          );

          stompClient.subscribe(
            `/topic/criticResponses/${roomId}`,
            (message) => {
              handleInitialWebSocketResponse("Critic", roomId, message.body);
              set((prevState) => ({
                ...prevState,
                wsIsPending: {
                  ...prevState.wsIsPending,
                  "/topic/criticResponses": {
                    ...prevState.wsIsPending["/topic/criticResponses"],
                    status: "complete",
                  },
                },
              }));
            }
          );

          stompClient.subscribe(
            `/topic/decisionResponses/${roomId}`,
            (message) => {
              handleInitialWebSocketResponse("Analytic", roomId, message.body);
              set((prevState) => ({
                ...prevState,
                wsIsPending: {
                  ...prevState.wsIsPending,
                  "/topic/decisionResponses": {
                    ...prevState.wsIsPending["/topic/decisionResponses"],
                    status: "complete",
                  },
                },
              }));
            }
          );

          set({ subscribed: true });
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
        set({ connected: false, subscribed: false });
      },
    });

    stompClient.activate();
    set({ client: stompClient });
  },

  handleSaveRoomTitle: async (id, userID) => {
    const { teamsHistories, currentTeamsIndex } = useTeamsStore.getState();
    let updatedTeamRoom = { ...teamsHistories[currentTeamsIndex] };

    try {
      const response = await fetch(
        `https://etech7-wf-etech7-db-service.azuremicroservices.io/addRoom`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: id,
            userID: userID,
            roomIndustry: updatedTeamRoom.roomIndustry,
            roomUserInput: updatedTeamRoom.roomUserInput,
            roomName: updatedTeamRoom.roomName,
          }),
        }
      );

      if (response.status === 200) {
        let updatedTeamHistory = [...teamsHistories];
        updatedTeamHistory[currentTeamsIndex] = updatedTeamRoom;
        set({ teamsHistories: updatedTeamHistory, editing: false });
      } else {
        console.log("error occurred");
      }
    } catch (e) {
      console.log(e);
    }
  },
  handleEditRoomTitle: (index) => {
    const { teamsHistories } = useTeamsStore.getState();
    set({
      tempTitle: teamsHistories[index].roomName,
      editing: true,
    });
  },
  handleCancelEditRoomTitle: () => {
    const { tempTitle, currentTeamsIndex } = useTeamsStore.getState();
    set((state) => {
      const updatedRooms = [...state.teamsHistories];
      updatedRooms[currentTeamsIndex].roomName = tempTitle;
      return { teamsHistories: updatedRooms, editing: false };
    });
  },

  handleRoomConfig: (field, value) => {
    set((state) => {
      const newHistories = [...state.teamsHistories];
      newHistories[state.currentTeamsIndex][field] = value;
      return { teamsHistories: newHistories };
    });
  },

  handleCreateNewRoom: () => {
    const { teamsHistories, client } = get();

    if (client) {
      client.deactivate();
    }

    const newRoom = {
      roomName: `Room ${teamsHistories.length + 1}`,
      goal: "",
      industry: "",
    };

    set({
      teamsHistories: [...teamsHistories, newRoom],
      currentTeamsIndex: teamsHistories.length,
    });
  },
  handleSaveRoom: async () => {
    const userStore = useUserStore.getState();
    const { teamsHistories, currentTeamsIndex, handleConnectToWebSocket } =
      get();
    const currentRoom = teamsHistories[currentTeamsIndex];

    const roomToSave = {
      userID: userStore.user.id,
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

        set((state) => ({
          teamsHistories: state.teamsHistories.map((room, index) =>
            index === currentTeamsIndex ? savedRoom : room
          ),
        }));

        handleConnectToWebSocket(savedRoom.id, savedRoom.roomUserInput);
      }
    } catch (e) {
      console.log(e);
    }
  },
  handleDeleteTeamRoom: async (roomId) => {
    const { teamsHistories } = get();

    const teamRoomToDelete = teamsHistories.find((room) => room.id === roomId);

    if (teamRoomToDelete) {
      try {
        const response = await fetch(
          `https://etech7-wf-etech7-db-service.azuremicroservices.io/deleteRoom?roomId=${teamRoomToDelete.id}`
        );

        if (response.ok) {
          const updatedTeamHistories = teamsHistories.filter(
            (room) => room.id !== roomId
          );

          set((state) => {
            let newCurrentIndex = state.currentTeamsIndex;

            if (state.currentTeamsIndex > 0) {
              newCurrentIndex -= 1;
            } else if (updatedTeamHistories.length > 0) {
              newCurrentIndex = 0;
            }

            return {
              teamsHistories: updatedTeamHistories,
              currentTeamsIndex: newCurrentIndex,
            };
          });
        }
      } catch (e) {
        console.log(e);
      }
    }
  },
  handleTeamRoomSelected: (index) => {
    const { handleCloseAllMenus } = useUiStore.getState();
    set((state) => {
      if (state.client) {
        state.client.deactivate();
      }

      return {
        currentTeamsIndex: index,
      };
    });
    handleCloseAllMenus();
  },

  handleAddUserMessage: (message) => {
    set((state) => {
      const newHistories = [...state.teamsHistories];
      newHistories[state.currentTeamsIndex].messages.push({
        id: Date.now() + "-user",
        originalContent: message,
        summarizedContent: null,
        role: "user",
        timeStamp: new Date().toISOString(),
      });
      return { teamsHistories: newHistories };
    });
  },
}));

export default useTeamsStore;
