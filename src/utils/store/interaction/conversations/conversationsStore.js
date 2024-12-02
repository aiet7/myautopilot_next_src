import { create } from "zustand";
import useRefStore from "../ref/refStore";
import {
  handleGetAgents,
  handleGetConversations,
  handleGetMessages,
} from "@/utils/api/serverProps";
import useUserStore from "../../user/userStore";
import { validateAssistantForm } from "@/utils/formValidations";
import useInteractionStore from "../interactionsStore";

const dbServiceUrl = process.env.NEXT_PUBLIC_DB_SERVICE_URL;
const connectWiseServiceUrl = process.env.NEXT_PUBLIC_CONNECTWISE_SERVICE_URL;
const gptServiceUrl = process.env.NEXT_PUBLIC_GPT_SERVICE_URL;

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

  assistantMode: "History",

  filterChatModeOpen: "",

  currentChatPage: 1,
  chatsPerPage: 30,
  totalChatPages: 1,
  filteredChatCount: 0,

  loadingAssistant: false,

  assistantInputs: {
    agentName: "",
    role: "",
    description: "",
    objectives: [""],
  },

  formError: "",

  podDetails: {
    msp: null,
    cw_id: null,
  },

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

  setAssistantMode: (mode) => {
    const { selectedAgent } = get();
    set({ assistantMode: mode });

    if (mode === "Edit") {
      if (selectedAgent) {
        set({
          assistantInputs: {
            agentName: selectedAgent.agentName || "",
            role: selectedAgent.role || "",
            description: selectedAgent.description || "",
            objectives: selectedAgent.objectives || [""],
          },
        });
      }
    } else if (mode === "Create") {
      set({
        assistantInputs: {
          agentName: "",
          role: "",
          description: "",
          objectives: [""],
        },
      });
    }
  },
  setCurrentChatPage: (page) => set({ currentChatPage: page }),

  setTotalChatPages: (pages) => set({ totalChatPages: pages }),
  setFilteredChatCount: (count) => set({ filteredChatCount: count }),

  setActiveChatBotMode: (mode) => set({ activeChatBotMode: mode }),

  setActiveFilterMode: (mode) =>
    set({ filterChatMode: mode, currentPage: 1, filterChatModeOpen: "" }),

  setActiveChatFilterModeOpen: (open) => set({ filterChatModeOpen: open }),

  setCurrentConversationIndex: (id) => set({ currentConversationIndex: id }),

  setAssistantInputs: (field, value) =>
    set((state) => ({
      assistantInputs: {
        ...state.assistantInputs,
        [field]: value,
      },
    })),

  setAssistantObjectives: () =>
    set((state) => ({
      assistantInputs: {
        ...state.assistantInputs,
        objectives: [...state.assistantInputs.objectives, ""],
      },
    })),

  setAssistantObjectiveInputs: (index, value) =>
    set((state) => {
      const updatedObjectives = [...state.assistantInputs.objectives];
      updatedObjectives[index] = value;
      return {
        assistantInputs: {
          ...state.assistantInputs,
          objectives: updatedObjectives,
        },
      };
    }),

  setAssistantRemoveObjectives: (index) =>
    set((state) => {
      const updatedObjectives = [...state.assistantInputs.objectives];
      updatedObjectives.splice(index, 1);
      return {
        assistantInputs: {
          ...state.assistantInputs,
          objectives: updatedObjectives,
        },
      };
    }),

  initializePod: async (msp, cw_id) => {
    const { handleSendMessage } = useInteractionStore.getState();

    set({
      selectedAgent: {
        agentName: "Jarvis Diagnostic Troubleshooting Agent",
        custom: false,
        defaultPrompt:
          "As an AI assistant named Jarvis, your role is to assist technicians by guiding them through diagnostic and troubleshooting steps to resolve issues quickly and efficiently. Your interaction should be professional, helpful, and use clear, user-friendly language.\n\nObjectives:\n\n1. Identify Relevant Diagnostic Questions:\n   - Review the issue described in the ticket.\n   - Ask the most pertinent questions to narrow down the problem.\n   - Each question should aim to identify the root cause efficiently.\n\n2. Provide Step-by-Step Troubleshooting Instructions:\n   - Based on the technician's responses, offer clear, easy-to-follow steps.\n   - Ensure instructions are detailed yet concise.\n\n3. Confirm Resolution After Each Step:\n   - Ask if the issue has been resolved.\n   - If not, proceed with further troubleshooting steps.\n\n4. Maintain Professional and Supportive Tone:\n   - Be patient and encouraging.\n   - Let the technician know that additional support is available if needed.\n\nGuidelines:\n\n- Communication Style:\n  - Use clear and simple language.\n  - Avoid technical jargon unless necessary, and explain terms when used.\n\n- Efficiency:\n  - Aim to resolve the issue in as few steps as possible.\n  - Prioritize the most common and effective solutions first.\n\n- Feedback Loop:\n  - Encourage the technician to provide detailed responses.\n  - Adapt your troubleshooting based on their feedback.\n\nRemember: Your primary tasks are to offer diagnostic assistance based on the issue described and to guide the technician through the troubleshooting process until the issue is resolved or all options are exhausted.",
        deleted: false,
        description: null,
        examplePrompts: null,
        id: "66e1fa8144a820f65619a4b4",
        mspCustomDomain: null,
        objectives: null,
        role: null,
        techId: null,
        userId: null,
      },

      podDetails: {
        msp: msp,
        cw_id: cw_id,
      },
    });


    const ticketResponse = await fetch(
      `${connectWiseServiceUrl}/getTicketsById?mspCustomDomain=${msp}&ticketId=${cw_id}`
    );

    if (ticketResponse.status === 200) {
      const ticket = await ticketResponse.json();
      let ticketInformation = `Category: ${
        ticket.type.name || "N/A"
      }, Subcategory: ${ticket.subType.name || "N/A"}, Title: ${
        ticket.summary
      } `;

      const notesReponse = await fetch(
        `${connectWiseServiceUrl}/getTicketNotesById?mspCustomDomain=${msp}&ticketId=${cw_id}`
      );

      if (notesReponse.status === 200) {
        const notes = await notesReponse.text();
        ticketInformation += `\nNotes: ${notes || "N/A"}`;
      }

      await handleSendMessage(ticketInformation);
    }
  },

  initializeAgents: async () => {
    const userStore = useUserStore.getState();
    const { initializeConversations } = get();
    set({ agents: [], conversationHistories: [], selectedAgent: null });

    if (userStore.user) {
      const initializeAgents = await handleGetAgents();

      set({ agents: initializeAgents });

      if (initializeAgents.length > 0) {
        set({
          activeChatBotMode: initializeAgents[0].agentName,
          selectedAgent: initializeAgents[0],
          assistantInputs: {
            agentName: initializeAgents[0].agentName,
            role: initializeAgents[0].role,
            description: initializeAgents[0].description,
            objectives: initializeAgents[0].objectives,
          },
        });
        await initializeConversations(initializeAgents[0]);
      }
    }
  },

  initializeConversations: async (agent) => {
    const userStore = useUserStore.getState();
    set({ conversationHistories: [] });

    if (userStore.user) {
      const initialConversations = await handleGetConversations(
        agent.id,
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

  handleCreateAssistant: async (mspCustomDomain) => {
    const { assistantInputs } = get();

    const errors = validateAssistantForm(assistantInputs);
    if (errors !== true) {
      set({ formError: errors });
      return;
    }

    set({ loadingAssistant: true });

    try {
      const response = await fetch(
        `${gptServiceUrl}/assistant/createNewAgent?mspCustomDomain=${mspCustomDomain}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(assistantInputs),
        }
      );

      if (response.status === 200 || response.status === 201) {
        const newAssistant = await response.json();
        set((state) => ({
          agents: [...state.agents, newAssistant],
          assistantInputs: {
            agentName: "",
            role: "",
            description: "",
            objectives: [""],
          },
          loadingAssistant: false,
          formError: "",
        }));
        console.log("ASSISTANT SAVED!");
      } else {
        console.log("ERROR SAVING ASSISTANT");
        set({
          loadingAssistant: false,
          formError: "",
        });
      }
    } catch (e) {
      console.log(e);
    }
  },

  handleSaveAssistant: async (mspCustomDomain, agentId) => {
    const { assistantInputs } = get();

    const errors = validateAssistantForm(assistantInputs);
    if (errors !== true) {
      set({ formError: errors });
      return;
    }

    set({ loadingAssistant: true });

    try {
      const response = await fetch(
        `${gptServiceUrl}/assistant/editAndCreateNewAgent?mspCustomDomain=${mspCustomDomain}&agentId=${agentId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(assistantInputs),
        }
      );

      if (response.status === 200 || response.status === 201) {
        set({ loadingAssistant: false, formError: "" });
        console.log("ASSISTANT UPDATED");
      } else {
        console.log("ERROR UPDATING ASSISTANT");
      }
    } catch (e) {
      console.log(e);
    }
  },

  handleDeleteAgent: async (agentId) => {
    try {
      const response = await fetch(
        `${dbServiceUrl}/softDeleteAgent?agentId=${agentId}`
      );

      if (response.status === 200) {
        set((state) => ({
          agents: state.agents.filter((agent) => agent.id !== agentId),
        }));

        console.log("AGENT DELETED");
      } else {
        console.log("FAILED AGENT DELETION");
      }
    } catch (e) {
      console.log(e);
    }
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

    let currentConversation =
      !forceNew && currentConversationIndex
        ? conversationHistories.find(
            (conv) => conv.id === currentConversationIndex
          )
        : null;

    if (currentConversation) {
      return currentConversation;
    } else {
      const newConversation = await handleNewConversation(highlight);
      if (newConversation) {
        set({
          currentConversationIndex: newConversation.id,
        });
      }
      return newConversation;
    }
  },

  handleNewConversation: async (highlight = true) => {
    const userStore = useUserStore.getState();
    const timestamp = new Date().toISOString().replace(/[-:.]/g, "");
    const { podDetails } = get();

    const { selectedAgent } = get();
    const newConversation = {
      userId: userStore.user
        ? userStore.user.id
        : `Pod-${podDetails.cw_id}-${podDetails.msp}`,
      conversationName: `Chat - ${timestamp}`,
      agentID:
        selectedAgent && selectedAgent.id
          ? selectedAgent.id
          : "66e1fa8144a820f65619a4b4",
    };

    try {
      const response = await fetch(
        `${dbServiceUrl}/conversations/addConversation`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
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
          currentConversationIndex: addedConversation.id, // Ensure current index is set
        }));

        return addedConversation;
      }
    } catch (e) {
      console.log(e);
    }
    return null;
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

  handleAgentSelected: async (agent) => {
    const { initializeConversations } = get();
    await initializeConversations(agent);
    set({
      currentConversationIndex: null,
      selectedAgent: agent,
      assistantInputs: {
        agentName: agent.agentName,
        role: agent.role,
        description: agent.description,
        objectives: agent.objectives,
      },
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

      createAssistantMode: false,

      filterChatModeOpen: "",

      activeChatOptions: ["History", "Engineer"],

      currentChatPage: 1,
      chatsPerPage: 30,
      totalChatPages: 1,
      filteredChatCount: 0,

      loadingAssistant: false,

      assistantInputs: {
        agentName: "",
        role: "",
        description: "",
        objectives: [""],
      },

      formError: "",
    });
  },
}));

export default useConversationStore;
