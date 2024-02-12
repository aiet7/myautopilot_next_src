import { create } from "zustand";
import useUserStore from "../../user/userStore";
import useFormsStore from "../forms/formsStore";
import useRefStore from "../ref/refStore";
import useInitializeAppStore from "../../init/initializeAppStore";
import {
  handleGetConversations,
  handleGetMessages,
} from "@/utils/api/serverProps";
import useTicketConversationsStore from "./ticketConversationsStore";
import useTechStore from "../../user/techStore";

const dbServiceUrl = process.env.NEXT_PUBLIC_DB_SERVICE_URL;
const connectWiseServiceUrl = process.env.NEXT_PUBLIC_CONNECTWISE_SERVICE_URL;

const useConversationStore = create((set, get) => ({
  conversationHistories: [],
  currentConversationIndex: 0,

  editing: false,
  deleting: false,
  tempTitle: "",
  tempPrompt: "",
  setTempTitle: (title) => set((state) => ({ ...state, tempTitle: title })),
  setTempPrompt: (prompt) => set((state) => ({ ...state, tempPrompt: prompt })),
  setEditing: (isEditing) => set((state) => ({ ...state, editing: isEditing })),
  setDeleting: (isDeleting) =>
    set((state) => ({ ...state, deleting: isDeleting })),

  initializeConversations: async () => {
    const techStore = useTechStore.getState();
    set({ conversationHistories: [] });

    if (techStore.tech) {
      const initialConversations = await handleGetConversations(
        techStore.tech.id
      );
      set({ conversationHistories: initialConversations });
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
    if (!convoId) return;
    const messages = await handleGetMessages(convoId);

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
  },

  handleSaveConversationTitle: async (id, userID) => {
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
        `https://etech7-wf-etech7-db-service.azuremicroservices.io/addConversation`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: id,
            userID: userID,
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

  handleIfConversationExists: async () => {
    const {
      conversationHistories,
      currentConversationIndex,
      handleNewConversation,
    } = get();

    const { troubleshootContinue } = useTicketConversationsStore.getState();

    let currentConversation = conversationHistories[currentConversationIndex];

    if (!currentConversation || troubleshootContinue) {
      const newConversation = await handleNewConversation(
        conversationHistories.length
      );
      return newConversation;
    }

    return currentConversation;
  },

  handleNewConversation: async (index) => {
    const techStore = useTechStore.getState();

    const { selectedAgent } = useInitializeAppStore.getState();
    const newConversation = {
      userId: techStore.tech.id,
      conversationName: `Chat ${index + 1}`,
      agentID: selectedAgent,
    };

    try {
      const response = await fetch(
        // `https://etech7-wf-etech7-db-service.azuremicroservices.io/addConversation`//
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
          currentConversationIndex: state.conversationHistories.length,
        }));
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
          // `https://etech7-wf-etech7-db-service.azuremicroservices.io/deleteConversation?conversationId=${conversationToDelete.id}`
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
}));

export default useConversationStore;
