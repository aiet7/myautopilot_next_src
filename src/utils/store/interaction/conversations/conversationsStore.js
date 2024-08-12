import { create } from "zustand";
import useFormsStore from "../forms/formsStore";
import useRefStore from "../ref/refStore";
import useInitializeAppStore from "../../init/initializeAppStore";
import {
  handleGetConversations,
  handleGetMessages,
} from "@/utils/api/serverProps";
import useUserStore from "../../user/userStore";
import useAssistantStore from "../../assistant/assistantStore";

const dbServiceUrl = process.env.NEXT_PUBLIC_DB_SERVICE_URL;
const connectWiseServiceUrl = process.env.NEXT_PUBLIC_CONNECTWISE_SERVICE_URL;

const useConversationStore = create((set, get) => ({
  conversationHistories: [],
  currentConversationIndex: 0,
  troubleshootingConversationId: null,
  activeChatBotMode: "History",
  filterChatMode: "Most Recent",
  searchValue: "",
  editing: false,
  deleting: false,
  tempTitle: "",
  tempPrompt: "",

  activeChatBotModeOpen: false,
  filterChatModeOpen: false,

  activeChatOptions: ["History", "Engineer"],
  filterChatOptions: ["Most Recent", "Oldest", "A-Z", "Z-A"],

  currentPage: 1,
  chatsPerPage: 30,

  setTempTitle: (title) => set((state) => ({ ...state, tempTitle: title })),
  setTempPrompt: (prompt) => set((state) => ({ ...state, tempPrompt: prompt })),
  setEditing: (isEditing) => set((state) => ({ ...state, editing: isEditing })),
  setDeleting: (isDeleting) =>
    set((state) => ({ ...state, deleting: isDeleting })),

  setSearchValue: (value) =>
    set((state) => ({
      ...state,
      searchValue: value,
      currentPage: 1,
    })),

  setCurrentPage: (page) => set({ currentPage: page }),

  setActiveChatBotMode: (mode) => set({ activeChatBotMode: mode }),

  setActiveFilterMode: (mode) => set({ filterChatMode: mode, currentPage: 1 }),

  setActiveChatBotModeOpen: (open) => set({ activeChatBotModeOpen: open }),

  setActiveChatFilterModeOpen: (open) => set({ filterChatModeOpen: open }),

  initializeConversations: async () => {
    const { initializeMessages } = get();
    const userStore = useUserStore.getState();
    set({ conversationHistories: [] });

    if (userStore.user) {
      const initialConversations = await handleGetConversations(
        userStore.user.id
      );
      set({
        conversationHistories: initialConversations,
      });

      if (initialConversations.length > 0) {
        await initializeMessages(null, initialConversations);
      }
    }
  },

  initializeMessages: async (
    passedConvoId = null,
    passedConvoHistory = null
  ) => {
    const { conversationHistories } = get();

    const savedConvoOnInitialLoad = passedConvoHistory || conversationHistories;

    const savedConversationIndex = localStorage.getItem("lastConvoIndex");
    const parsedSavedConversationIndex = JSON.parse(savedConversationIndex);

    const convoId =
      passedConvoId ||
      (parsedSavedConversationIndex?.currentConversationIndex !== null
        ? savedConvoOnInitialLoad[
            parsedSavedConversationIndex?.currentConversationIndex
          ]?.id
        : null);
    if (!convoId) {
      return;
    }
    const messages = await handleGetMessages(convoId);

    if (messages) {
      set((state) => {
        const updatedHistories = [...state.conversationHistories];
        const conversationToUpdateIndex = updatedHistories.findIndex(
          (convo) => convo.id === convoId
        );

        if (conversationToUpdateIndex > -1) {
          const updatedMessages = messages
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
            .sort((a, b) => new Date(a.timeStamp) - new Date(b.timeStamp));

          updatedHistories[conversationToUpdateIndex] = {
            ...updatedHistories[conversationToUpdateIndex],
            messages: updatedMessages,
          };
        }
        return { conversationHistories: updatedHistories };
      });
    }
  },

  handleNextPage: () =>
    set((state) => ({
      currentPage: state.currentPage + 1,
    })),

  handlePreviousPage: () =>
    set((state) => ({
      currentPage: state.currentPage > 1 ? state.currentPage - 1 : 1,
    })),

  handleToggleChatMenus: (toggle) => {
    set({
      activeChatBotModeOpen: toggle,
      filterChatModeOpen: toggle,
    });
  },

  handleSaveConversationTitle: async (id, userId) => {
    const { selectedAgent } = useInitializeAppStore.getState();

    const {
      conversationHistories,
      currentConversationIndex,
      tempTitle,
      tempPrompt,
    } = get();

    const currentConversation = {
      ...conversationHistories[currentConversationIndex],
    };

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
            id: id,
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
          const newConversationHistories = [...state.conversationHistories];
          newConversationHistories[currentConversationIndex] =
            currentConversation;

          return {
            ...state,
            conversationHistories: newConversationHistories,
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
    const title =
      conversationHistories[currentConversationIndex].conversationName;
    set({ tempTitle: title, editing: true });
  },

  handleEditConversationPrompt: () => {
    const { conversationHistories, currentConversationIndex } = get();
    const prompt = conversationHistories[currentConversationIndex].customPrompt;
    set({ tempPrompt: prompt, editing: true });
  },

  handleCancelEditConversationTitle: () => {
    set({ tempTitle: "", tempPrompt: "", editing: false });
  },

  handleGetConversationId: () => {
    const { selectedAgent } = useInitializeAppStore.getState();
    const { conversationHistories, currentConversationIndices } = get();
    const { previousResponseBodyForForms } = useFormsStore.getState();

    const conversationId =
      conversationHistories[selectedAgent]?.[
        currentConversationIndices[selectedAgent]
      ]?.id;

    return previousResponseBodyForForms[conversationId];
  },

  handleIfConversationExists: async (ticketId, forceNew = false) => {
    const {
      conversationHistories,
      currentConversationIndex,
      handleNewConversation,
      troubleshootingConversationId,
    } = get();

    let currentConversation;

    if (ticketId) {
      if (!forceNew) {
        if (troubleshootingConversationId) {
          currentConversation = conversationHistories.find(
            (conv) => conv.id === troubleshootingConversationId
          );
        }

        if (!currentConversation) {
          currentConversation = conversationHistories.find(
            (conv) => conv.ticketId === ticketId
          );
        }
      }

      if (currentConversation) {
        return currentConversation;
      } else {
        const newConversation = await handleNewConversation(
          conversationHistories.length,
          ticketId
        );
        return newConversation;
      }
    } else {
      currentConversation = conversationHistories[currentConversationIndex];

      if (currentConversation) {
        return currentConversation;
      } else {
        const newConversation = await handleNewConversation(
          conversationHistories.length
        );
        return newConversation;
      }
    }
  },

  handleNewConversation: async (index, ticketId) => {
    const userStore = useUserStore.getState();
    const { activeUIAssistantTab } = useAssistantStore.getState();
    const { selectedAgent } = useInitializeAppStore.getState();

    const newConversation = {
      userId: userStore.user.id,
      conversationName:
        activeUIAssistantTab !== "Queue"
          ? `Chat ${index + 1}`
          : `${ticketId} Ticket Chat`,
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
        addedConversation.ticketId = ticketId || null;

        set((state) => {
          const updatedHistories = [
            ...state.conversationHistories,
            addedConversation,
          ];
          return {
            conversationHistories: updatedHistories,
            currentConversationIndex: updatedHistories.length - 1,
            troubleshootingConversationId: ticketId
              ? addedConversation.id
              : state.troubleshootingConversationId,
          };
        });

        return addedConversation;
      }
    } catch (e) {
      console.log(e);
    }
  },

  handleDeleteConversation: async (conversationId) => {
    const { conversationHistories } = get();

    const conversationToDelete = conversationHistories.find(
      (conversation) => conversation.id === conversationId
    );

    if (conversationToDelete) {
      try {
        const response = await fetch(
          `${dbServiceUrl}/conversations/deleteConversation?conversationId=${conversationToDelete.id}`
        );

        if (response.ok) {
          const updatedHistories = conversationHistories.filter(
            (conversation) => conversation.id !== conversationId
          );

          set({
            conversationHistories: updatedHistories,
            currentConversationIndex: null,
          });
        }
      } catch (e) {
        console.log(e);
      }
    }
  },

  handleConversationSelected: async (index, convoId) => {
    const { initializeMessages } = get();
    await initializeMessages(convoId, null);
    set({ currentConversationIndex: index });
  },

  handleAddJarvisUserMessage: async (message) => {
    set((state) => {
      const newConversations = [...state.conversationHistories];

      if (!newConversations[state.currentConversationIndex].messages) {
        newConversations[state.currentConversationIndex].messages = [];
      }

      newConversations[state.currentConversationIndex].messages.push({
        id: Date.now() + "-user",
        content: message,
        role: "user",
        timeStamp: new Date().toISOString(),
      });

      return { conversationHistories: newConversations };
    });
  },

  handleAddJarvisAssistantMessage: (message, formType) => {
    const { messageIdRef } = useRefStore.getState();

    set((state) => {
      const newConversations = [...state.conversationHistories];
      const messageId = `${messageIdRef.current}-ai${
        formType ? `-${formType}` : ""
      }`;

      newConversations[state.currentConversationIndex].messages.push({
        id: messageId,
        content: message,
        role: "assistant",
        timeStamp: new Date().toISOString(),
      });

      return { conversationHistories: newConversations };
    });
  },

  clearConversation: () => {
    set({
      conversationHistories: [],
      currentConversationIndex: 0,
      troubleshootingConversationId: null,
      activeChatBotMode: "History",
      filterChatMode: "Most Recent",
      searchValue: "",
      editing: false,
      deleting: false,
      tempTitle: "",
      tempPrompt: "",

      activeChatBotModeOpen: false,
      filterChatModeOpen: false,

      activeChatOptions: ["History", "Engineer"],
      filterChatOptions: ["Most Recent", "Oldest", "A-Z", "Z-A"],

      currentPage: 1,
      chatsPerPage: 30,
    });
  },
}));

export default useConversationStore;
