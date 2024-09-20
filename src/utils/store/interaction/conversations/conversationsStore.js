import { create } from "zustand";
import useFormsStore from "../forms/formsStore";
import useRefStore from "../ref/refStore";
import useInitializeAppStore from "../../init/initializeAppStore";
import {
  handleGetAgents,
  handleGetConversations,
  handleGetMessages,
} from "@/utils/api/serverProps";
import useUserStore from "../../user/userStore";
import useInteractionStore from "../interactionsStore";

const dbServiceUrl = process.env.NEXT_PUBLIC_DB_SERVICE_URL;
const connectWiseServiceUrl = process.env.NEXT_PUBLIC_CONNECTWISE_SERVICE_URL;

const useConversationStore = create((set, get) => ({
  agents: [],
  selectedAgent: null,
  conversationHistories: [],
  currentConversationIndex: null,

  troubleshootingConversationId: null,
  activeChatBotMode: "History",
  filterChatMode: "Newest",
  searchValue: "",
  editing: false,
  deleting: false,
  tempTitle: "",
  tempPrompt: "",

  filterChatModeOpen: "",

  activeChatOptions: ["History", "Engineer"],

  currentChatPage: 1,
  chatsPerPage: 30,
  totalChatPages: 1,
  filteredChatCount: 0,

  setTempTitle: (title) => set((state) => ({ ...state, tempTitle: title })),
  setTempPrompt: (prompt) => set((state) => ({ ...state, tempPrompt: prompt })),
  setEditing: (isEditing) => set((state) => ({ ...state, editing: isEditing })),
  setDeleting: (isDeleting) =>
    set((state) => ({ ...state, deleting: isDeleting })),

  setSearchValue: (value) =>
    set((state) => ({
      ...state,
      searchValue: value,
      currentChatPage: 1,
    })),

  setCurrentChatPage: (page) => set({ currentChatPage: page }),

  setTotalChatPages: (pages) => set({ totalChatPages: pages }),
  setFilteredChatCount: (count) => set({ filteredChatCount: count }),

  setActiveChatBotMode: (mode) => set({ activeChatBotMode: mode }),

  setActiveFilterMode: (mode) =>
    set({ filterChatMode: mode, currentPage: 1, filterChatModeOpen: "" }),

  setActiveChatFilterModeOpen: (open) => set({ filterChatModeOpen: open }),

  setCurrentConversationIndex: (id) => set({ currentConversationIndex: id }),

  initializeAgents: async () => {
    const userStore = useUserStore.getState();
    const { initializeConversations } = get();
    set({ agents: [] });

    if (userStore.user) {
      const initializeAgents = await handleGetAgents();

      set({ agents: initializeAgents });

      if (initializeAgents.length > 0) {
        set({
          activeChatBotMode: initializeAgents[0].agentName,
          selectedAgent: initializeAgents[0].id,
        });
        await initializeConversations(initializeAgents[0].id);
      }
    }
  },

  initializeConversations: async (agentId) => {
    const userStore = useUserStore.getState();
    set({ conversationHistories: [] });

    if (userStore.user) {
      const initialConversations = await handleGetConversations(
        agentId,
        userStore.user.id
      );
      set({
        conversationHistories: initialConversations,
      });
    }
  },

  initializeMessages: async (convoId) => {
    if (!convoId) {
      return;
    }

    const messages = await handleGetMessages(convoId);

    if (messages) {
      set((state) => {
        const updatedHistories = state.conversationHistories.map((convo) =>
          convo.id === convoId
            ? {
                ...convo,
                messages: messages
                  .flatMap((message) => [
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
                  .sort(
                    (a, b) => new Date(a.timeStamp) - new Date(b.timeStamp)
                  ),
              }
            : convo
        );
        return { conversationHistories: updatedHistories };
      });
    }
  },

  handleNextChatPage: () => {
    set((state) => {
      const totalPages = Math.ceil(
        state.filteredChatCount / state.chatsPerPage
      );
      return {
        currentChatPage:
          state.currentChatPage < totalPages
            ? state.currentChatPage + 1
            : state.currentChatPage,
      };
    });
  },

  handlePreviousChatPage: () =>
    set((state) => ({
      currentChatPage:
        state.currentChatPage > 1 ? state.currentChatPage - 1 : 1,
    })),

  handleToggleChatMenus: (toggle) => {
    set({
      activeChatBotModeOpen: toggle,
      filterChatModeOpen: toggle,
    });
  },

  handleSaveConversationTitle: async (convoId, userId) => {
    const { selectedAgent, conversationHistories, tempTitle, tempPrompt } =
      get();

    const currentConversation = conversationHistories.find(
      (convo) => convo.id === convoId
    );

    currentConversation.conversationName = tempTitle;
    currentConversation.customPrompt = tempPrompt;

    try {
      const response = await fetch(
        `${dbServiceUrl}/conversations/addConversation`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: convoId,
            userId: userId,
            agentID: selectedAgent,
            conversationName: currentConversation.conversationName,
            customPrompt: currentConversation.customPrompt,
            timeStamp: Date.now(),
            deleted: false,
          }),
        }
      );

      if (response.status === 200) {
        set((state) => {
          const updatedHistories = state.conversationHistories.map((convo) =>
            convo.id === convoId ? currentConversation : convo
          );
          return {
            ...state,
            conversationHistories: updatedHistories,
            editing: false,
          };
        });
      } else {
        console.log("Error occurred.");
      }
    } catch (e) {
      console.log(e);
    }
  },

  handleEditConversationTitle: () => {
    const { conversationHistories, currentConversationIndex } = get();
    const currentConversation = conversationHistories.find(
      (convo) => convo.id === currentConversationIndex
    );
    set({ tempTitle: currentConversation.conversationName, editing: true });
  },

  handleEditConversationPrompt: () => {
    const { conversationHistories, currentConversationIndex } = get();
    const currentConversation = conversationHistories.find(
      (convo) => convo.id === currentConversationIndex
    );
    set({ tempPrompt: currentConversation.customPrompt, editing: true });
  },

  handleCancelEditConversationTitle: () => {
    set({ tempTitle: "", tempPrompt: "", editing: false });
  },

  handleIfConversationExists: async (forceNew = false, highlight = true) => {
    const {
      conversationHistories,
      currentConversationIndex,
      handleNewConversation,
    } = get();

    let currentConversation;

    if (!forceNew) {
      currentConversation = conversationHistories.find(
        (conv) => conv.id === currentConversationIndex
      );
    }

    if (currentConversation) {
      return currentConversation;
    } else {
      const newConversation = await handleNewConversation(highlight);
      return newConversation;
    }
  },

  handleNewConversation: async (highlight = true) => {
    const userStore = useUserStore.getState();

    const { selectedAgent } = get();

    const timestamp = new Date().toISOString().replace(/[-:.]/g, "");

    const newConversation = {
      userId: userStore.user.id,
      conversationName: `Chat - ${timestamp}`,
      agentID: selectedAgent,
    };

    try {
      const response = await fetch(
        `${dbServiceUrl}/conversations/addConversation`,
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

        set((state) => ({
          conversationHistories: [
            ...state.conversationHistories,
            addedConversation,
          ],
          currentConversationIndex: highlight
            ? addedConversation.id
            : state.currentConversationIndex,
        }));

        return addedConversation;
      }
    } catch (e) {
      console.log(e);
    }
  },

  handleDeleteConversation: async (convoId) => {
    const { conversationHistories } = get();

    try {
      const response = await fetch(
        `${dbServiceUrl}/conversations/deleteConversation?conversationId=${convoId}`
      );

      if (response.ok) {
        const updatedHistories = conversationHistories.filter(
          (conversation) => conversation.id !== convoId
        );

        set({
          conversationHistories: updatedHistories,
          currentConversationIndex: null,
        });
      }
    } catch (e) {
      console.log(e);
    }
  },

  handleAgentSelected: async (agentId) => {
    const { initializeConversations } = get();

    await initializeConversations(agentId);
    set({
      currentConversationIndex: null,
      selectedAgent: agentId,
    });
  },

  handleConversationSelected: async (convoId) => {
    const { initializeMessages } = get();
    await initializeMessages(convoId);
    set({ currentConversationIndex: convoId });
  },

  handleAddJarvisUserMessage: async (message) => {
    set((state) => {
      const newConversations = state.conversationHistories.map((convo) => {
        if (convo.id === state.currentConversationIndex) {
          const updatedMessages = convo.messages || [];
          updatedMessages.push({
            id: Date.now() + "-user",
            content: message,
            role: "user",
            timeStamp: new Date().toISOString(),
          });
          return { ...convo, messages: updatedMessages };
        }
        return convo;
      });

      return { conversationHistories: newConversations };
    });
  },

  handleAddJarvisAssistantMessage: (message, elements) => {
    const { messageIdRef } = useRefStore.getState();

    set((state) => {
      const newConversations = state.conversationHistories.map((convo) => {
        if (convo.id === state.currentConversationIndex) {
          const updatedMessages = convo.messages || [];

          updatedMessages.push({
            id: `${messageIdRef.current}-ai`,
            content: message,
            role: "assistant",
            timeStamp: new Date().toISOString(),
            elements: elements,
          });
          return { ...convo, messages: updatedMessages };
        }
        return convo;
      });

      return { conversationHistories: newConversations };
    });
  },

  clearConversation: () => {
    set({
      agents: [],
      selectedAgent: null,
      conversationHistories: [],
      currentConversationIndex: null,

      troubleshootingConversationId: null,
      activeChatBotMode: "History",
      filterChatMode: "Newest",
      searchValue: "",
      editing: false,
      deleting: false,
      tempTitle: "",
      tempPrompt: "",

      filterChatModeOpen: "",

      activeChatOptions: ["History", "Engineer"],

      currentChatPage: 1,
      chatsPerPage: 30,
      totalChatPages: 1,
      filteredChatCount: 0,
    });
  },
}));

export default useConversationStore;
