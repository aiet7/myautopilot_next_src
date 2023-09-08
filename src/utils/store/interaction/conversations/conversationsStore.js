import { create } from "zustand";
import useAgentsStore from "../../agents/agentsStore";
import useUserStore from "../../user/userStore";
import useUiStore from "../../ui/uiStore";
import useFormsStore from "../forms/formsStore";
import useRefStore from "../ref/refStore";

const useConversationStore = create((set, get) => ({
  messages: [],

  conversationHistories: {},
  currentConversationIndices: {},
  editing: false,
  deleting: false,
  tempTitle: "",
  tempPrompt: "",
  setTempTitle: (title) => set((state) => ({ ...state, tempTitle: title })),
  setTempPrompt: (prompt) => set((state) => ({ ...state, tempPrompt: prompt })),
  setEditing: (isEditing) => set((state) => ({ ...state, editing: isEditing })),
  setDeleting: (isDeleting) =>
    set((state) => ({ ...state, deleting: isDeleting })),

  initializeConversations: (initialConversations, initialMessages) => {
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
    set({ conversationHistories: updatedConversationHistories });
  },

  handleUpdateEditedResponse: async (messageId, content) => {
    const agentsStore = useAgentsStore.getState();
    const currentAgent = agentsStore.selectedAgent;
    const { currentConversationIndices } = get();
    const cleanedMessageId = messageId.slice(0, -3);
    try {
      const response = await fetch(
        `https://etech7-wf-etech7-db-service.azuremicroservices.io/updateAIMessage`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: cleanedMessageId,
            aiText: content,
          }),
        }
      );
      if (response.status === 200) {
        const editedMessageResponse = await response.json();
        set((state) => {
          const updatedHistories = { ...state.conversationHistories };
          const currentConversation =
            updatedHistories[currentAgent][
              currentConversationIndices[currentAgent]
            ];
          const messageIndex = currentConversation.messages.findIndex(
            (message) => message.id === messageId
          );

          if (messageIndex !== 1) {
            currentConversation.messages[messageIndex].content =
              editedMessageResponse.aiContent;
          }

          return {
            conversationHistories: updatedHistories,
          };
        });
      }
    } catch (e) {
      console.log(e);
    }
  },
  handleSaveConversationTitle: async (id, userID) => {
    const agentsStore = useAgentsStore.getState();
    const currentAgent = agentsStore.selectedAgent;

    const {
      conversationHistories,
      currentConversationIndices,
      tempTitle,
      tempPrompt,
    } = get();

    const currentConversation = {
      ...conversationHistories[currentAgent][
        currentConversationIndices[currentAgent]
      ],
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
            agentID: currentAgent,
            conversationName: currentConversation.conversationName,
            customPrompt: currentConversation.customPrompt,
            timeStamp: Date.now(),
            deleted: false,
          }),
        }
      );

      if (response.status === 200) {
        set((state) => {
          const newConversationHistories = { ...state.conversationHistories };
          const updatedConversationHistory = [
            ...newConversationHistories[currentAgent],
          ];

          updatedConversationHistory[currentConversationIndices[currentAgent]] =
            currentConversation;

          newConversationHistories[currentAgent] = updatedConversationHistory;

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
    const agentsStore = useAgentsStore.getState();
    const currentAgent = agentsStore.selectedAgent;
    const { conversationHistories, currentConversationIndices } = get();

    const title =
      conversationHistories[currentAgent][
        currentConversationIndices[currentAgent]
      ].conversationName;
    set({ tempTitle: title, editing: true });
  },

  handleEditConversationPrompt: () => {
    const agentsStore = useAgentsStore.getState();
    const currentAgent = agentsStore.selectedAgent;
    const { conversationHistories, currentConversationIndices } = get();

    const prompt =
      conversationHistories[currentAgent][
        currentConversationIndices[currentAgent]
      ].customPrompt;
    set({ tempPrompt: prompt, editing: true });
  },

  handleCancelEditConversationTitle: () => {
    set({ tempTitle: "", tempPrompt: "", editing: false });
  },

  handleGetConversationId: () => {
    const agentsStore = useAgentsStore.getState();
    const currentAgent = agentsStore.selectedAgent;
    const { conversationHistories, currentConversationIndices } = get();
    const { previousResponseBodyForForms } = useFormsStore.getState();

    const conversationId =
      conversationHistories[currentAgent]?.[
        currentConversationIndices[currentAgent]
      ]?.id;

    return previousResponseBodyForForms[conversationId];
  },

  handleIfConversationExists: async () => {
    const agentsStore = useAgentsStore.getState();
    const currentAgent = agentsStore.selectedAgent;

    const {
      conversationHistories,
      currentConversationIndices,
      handleNewConversation,
    } = get();

    let currentConversation;
    if (!(currentAgent in conversationHistories)) {
      set((state) => ({
        ...state,
        conversationHistories: {
          ...state.conversationHistories,
          [currentAgent]: [],
        },
      }));
      currentConversation = null;
    } else {
      currentConversation =
        conversationHistories[currentAgent][
          currentConversationIndices[currentAgent]
        ];
    }

    if (!currentConversation) {
      const conversationCount = (conversationHistories[currentAgent] || [])
        .length;
      const newConversation = await handleNewConversation(conversationCount);
      set((state) => {
        const newConversations = { ...state.conversationHistories };
        if (!newConversations[currentAgent])
          newConversations[currentAgent] = [];
        newConversations[currentAgent][
          currentConversationIndices[currentAgent]
        ] = newConversation;
        return { ...state, conversationHistories: newConversations };
      });
      return newConversation;
    }

    return currentConversation;
  },

  handleNewConversation: async (index) => {
    const userStore = useUserStore.getState();
    const agentsStore = useAgentsStore.getState();
    const currentAgent = agentsStore.selectedAgent;

    const newConversation = {
      userID: userStore.user.id,
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

        set((state) => ({
          ...state,
          conversationHistories: {
            ...state.conversationHistories,
            [currentAgent]: [
              ...(state.conversationHistories[currentAgent] || []),
              addedConversation,
            ],
          },
          currentConversationIndices: {
            ...state.currentConversationIndices,
            [currentAgent]: index,
          },
        }));
        return addedConversation;
      }
    } catch (e) {
      console.log(e);
    }
  },

  handleDeleteConversation: async (conversationId) => {
    const agentsStore = useAgentsStore.getState();
    const currentAgent = agentsStore.selectedAgent;
    const { conversationHistories } = get();

    const conversationToDelete = conversationHistories[
      agentsStore.selectedAgent
    ].find((conversation) => conversation.id === conversationId);

    if (conversationToDelete) {
      try {
        const response = await fetch(
          `https://etech7-wf-etech7-db-service.azuremicroservices.io/deleteConversation?conversationId=${conversationToDelete.id}`
        );
        if (response.ok) {
          const updatedHistories = conversationHistories[currentAgent].filter(
            (conversation) => conversation.id !== conversationId
          );

          set((state) => ({
            ...state,
            conversationHistories: {
              ...state.conversationHistories,
              [currentAgent]: updatedHistories,
            },
            currentConversationIndices:
              updatedHistories.length > 0
                ? {
                    ...state.currentConversationIndices,
                    [currentAgent]:
                      state.currentConversationIndices[currentAgent] > 0
                        ? state.currentConversationIndices[currentAgent] - 1
                        : 0,
                  }
                : state.currentConversationIndices,
          }));
        }
      } catch (e) {
        console.log(e);
      }
    }
  },

  handleConversationSelected: (index, agentID) => {
    const { hoverTab, setActiveTab, setHoverTab } = useUiStore.getState();
    set((state) => {
      const updatedConversationIndices = {
        ...state.currentConversationIndices,
        [agentID]: index,
      };
      return {
        ...state,
        currentConversationIndices: updatedConversationIndices,
      };
    });
    if (hoverTab === "general") {
      setActiveTab("general");
    }
    setHoverTab(null);
  },

  handleAddUserMessage: async (message) => {
    set((state) => {
      const newUserMessage = {
        id: Date.now() + "-user",
        content: message,
        role: "user",
        timeStamp: new Date().toISOString(),
      };

      return { ...state, messages: [...state.messages, newUserMessage] };
    });
  },
  handleAddAssistantMessage: (message, formType) => {
    const { messageIdRef } = useRefStore.getState();
    const messageId = `${messageIdRef.current}-ai${
      formType ? `-${formType}` : ""
    }`;


    set((state) => {
      const newMessage = {
        id: messageId,
        content: message,
        role: "assistant",
        timeStamp: new Date().toISOString(),
      };
      return { ...state, messages: [...state.messages, newMessage] };
    });
  },
  handleAddForm: (formType) => {
    const formId = Date.now();

    set((state) => {
      const newForm = {
        id: formId,
        type: "form",
        formType,
      };
      return { ...state, messages: [...state.messages, newForm] };
    });

    return formId;
  },

  handleRemoveForm: (formId) => {
    set((state) => {
      return {
        ...state,
        messages: state.messages.filter((msg) => msg.id !== formId),
      };
    });
  },

  // handleAddUserMessage: async (message) => {
  //   const agentsStore = useAgentsStore.getState();
  //   const currentAgent = agentsStore.selectedAgent;
  //   const { currentConversationIndices } = get();

  //   set((state) => {
  //     const newConversations = { ...state.conversationHistories };
  //     const currentAgentConversations = newConversations[currentAgent];

  //     if (
  //       !currentAgentConversations[currentConversationIndices[currentAgent]]
  //         .messages
  //     ) {
  //       currentAgentConversations[
  //         currentConversationIndices[currentAgent]
  //       ].messages = [];
  //     }

  //     currentAgentConversations[
  //       currentConversationIndices[currentAgent]
  //     ].messages.push({
  //       id: Date.now() + "-user",
  //       content: message,
  //       role: "user",
  //       timeStamp: new Date().toISOString(),
  //     });
  //     return { ...state, conversationHistories: newConversations };
  //   });
  // },

  // handleAddAssistantMessage: (message, formType) => {
  //   const { messageIdRef } = useRefStore.getState();

  //   const agentsStore = useAgentsStore.getState();
  //   const currentAgent = agentsStore.selectedAgent;

  //   const { currentConversationIndices } = get();
  //   const currentConversationIndex = currentConversationIndices[currentAgent];

  //   set((state) => {
  //     const newConversations = { ...state.conversationHistories };
  //     const currentMessages =
  //       newConversations[currentAgent]?.[currentConversationIndex]?.messages ||
  //       [];

  //     const messageId = `${messageIdRef.current}-ai${
  //       formType ? `-${formType}` : ""
  //     }`;

  //     currentMessages.push({
  //       id: messageId,
  //       content: message,
  //       role: "assistant",
  //       timeStamp: new Date().toISOString(),
  //     });

  //     if (!newConversations[currentAgent]) {
  //       newConversations[currentAgent] = [];
  //     }
  //     if (!newConversations[currentAgent][currentConversationIndex]) {
  //       newConversations[currentAgent][currentConversationIndex] = {
  //         messages: [],
  //       };
  //     }
  //     newConversations[currentAgent][currentConversationIndex].messages =
  //       currentMessages;

  //     return { ...state, conversationHistories: newConversations };
  //   });
  // },

  // handleAddForm: (formType) => {
  //   const agentsStore = useAgentsStore.getState();
  //   const currentAgent = agentsStore.selectedAgent;
  //   const { conversationHistories, currentConversationIndices } = get();
  //   const currentConversationIndex = currentConversationIndices[currentAgent];

  //   const formId = Date.now();
  //   const currentAgentConversations = conversationHistories[currentAgent];
  //   const selectedConversation =
  //     currentAgentConversations?.[currentConversationIndex];

  //   const conversationId = selectedConversation?.id;

  //   set((state) => {
  //     const newConversations = {
  //       ...state.conversationHistories,
  //       [currentAgent]: [...(state.conversationHistories[currentAgent] || [])],
  //     };
  //     const currentMessages =
  //       newConversations[currentAgent][currentConversationIndex]?.messages ||
  //       [];

  //     currentMessages.push({
  //       id: formId,
  //       type: "form",
  //       formType,
  //       conversationId,
  //     });

  //     if (!newConversations[currentAgent][currentConversationIndex]) {
  //       newConversations[currentAgent][currentConversationIndex] = {
  //         messages: [],
  //       };
  //     }

  //     newConversations[currentAgent][currentConversationIndex].messages =
  //       currentMessages;

  //     return { ...state, conversationHistories: newConversations };
  //   });
  //   return conversationId;
  // },

  // handleRemoveForm: (formId) => {
  //   const agentsStore = useAgentsStore.getState();
  //   const currentAgent = agentsStore.selectedAgent;

  //   const { currentConversationIndices } = get();
  //   const currentConversationIndex = currentConversationIndices[currentAgent];

  //   set((state) => {
  //     const newConversations = { ...state.conversationHistories };

  //     if (
  //       newConversations[currentAgent] &&
  //       newConversations[currentAgent][currentConversationIndex]
  //     ) {
  //       const currentMessages =
  //         newConversations[currentAgent][currentConversationIndex].messages;
  //       newConversations[currentAgent][currentConversationIndex].messages =
  //         currentMessages.filter((msg) => msg.id !== formId);
  //     }

  //     return { ...state, conversationHistories: newConversations };
  //   });
  // },
}));

export default useConversationStore;
