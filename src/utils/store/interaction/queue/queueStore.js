import { create } from "zustand";
import useRefStore from "../ref/refStore";
import useConversationStore from "../conversations/conversationsStore";
import useUserStore from "../../user/userStore";

const isBrowser = typeof window !== "undefined";
const initialWidth = isBrowser ? window.innerWidth : 1023;
const dbServiceUrl = process.env.NEXT_PUBLIC_DB_SERVICE_URL;
const connectWiseServiceUrl = process.env.NEXT_PUBLIC_CONNECTWISE_SERVICE_URL;
const gptServiceUrl = process.env.NEXT_PUBLIC_GPT_SERVICE_URL;

const useQueueStore = create((set, get) => ({
  searchValue: "",
  ticketNote: "",
  ticketQueueMode: "Troubleshoot",
  troubleshootMessages: [],
  myQueueTicket: null,
  myQueueNotes: null,
  editingMyQueueTicket: null,
  allQueueTickets: null,
  myActivities: null,
  allActivities: null,
  isMobile: initialWidth < 1600,
  activeSectionButton: "Form",
  activeNoteCategory: "Description",
  activeQueueTicketButton: "QueueTicket",
  currentQueueIndex: 0,
  options: ["activities", "allQueueTickets", "myQueueTickets"],
  currentActivitiesOption: "myActivities",
  currentOption: "activities",
  noTicketsInQueue: false,
  ticketRequeued: false,
  ticketClosed: false,
  ticketSaved: false,
  editTicket: false,
  ticketCategories: null,
  ticketPriorities: null,
  ticketStatuses: null,
  severityOptions: ["Low", "Medium", "High"],
  impactOptions: ["Low", "Medium", "High"],
  tierOptions: ["Tier1", "Tier2", "Tier3", "No Dispatching"],

  setTicketNote: (value) => set({ ticketNote: value }),

  setIsMobile: (value) => {
    set({ isMobile: value });
  },
  setActiveSectionButton: (button) => set({ activeSectionButton: button }),

  setActiveQueueTicketButton: (button) =>
    set({ activeQueueTicketButton: button }),

  setActiveTicketQueueMode: (mode) => set({ ticketQueueMode: mode }),

  setEditTicket: (updates) => {
    set((prevState) => ({
      editingMyQueueTicket: {
        ...prevState.editingMyQueueTicket,
        ...updates,
      },
    }));
  },

  setCancelEdit: () => {
    set({
      editTicket: false,
      editingMyQueueTicket: null,
    });
  },

  setActiveNoteCategory: (category) =>
    set({
      activeNoteCategory: category,
    }),

  setSearchValue: (value) =>
    set((state) => ({
      ...state,
      searchValue: value,
    })),

  handleShowMyActivities: async (mspCustomDomain, techId) => {
    try {
      const response = await fetch(
        `${dbServiceUrl}/api/ticketQueue/activities/tech?mspCustomDomain=${mspCustomDomain}&techId=${techId}&date=${
          new Date().toISOString().split("T")[0]
        }`
      );

      if (response.status === 200) {
        const myActivities = await response.json();
        set({
          myActivities: myActivities,
          noTicketsInQueue: false,
          currentActivitiesOption: "myActivities",
        });
        console.log("SUCCESS GETTING MY ACTIVITES");
      } else {
        console.log("GETTING MY ACTIVITIES FAILED");
      }
    } catch (e) {
      console.log(e);
    }
  },

  handleShowAllActivities: async (mspCustomDomain) => {
    try {
      const response = await fetch(
        `${dbServiceUrl}/api/ticketQueue/activities/?mspCustomDomain=${mspCustomDomain}&date=${
          new Date().toISOString().split("T")[0]
        }`
      );

      if (response.status === 200) {
        const allActivities = await response.json();
        set({
          allActivities: allActivities,
          noTicketsInQueue: false,
          currentActivitiesOption: "allActivities",
        });
        console.log("SUCCESS GETTING ALL ACTIVITIES");
      } else {
        console.log("GETTING ALL ACTIVITIES FAILED");
      }
    } catch (e) {
      console.log(e);
    }
  },

  handleShowAllQueueTickets: async (mspCustomDomain) => {
    try {
      const response = await fetch(
        `${dbServiceUrl}/api/ticketQueue/getAll/?mspCustomDomain=${mspCustomDomain}`
      );

      if (response.status === 200) {
        const allQueueTickets = await response.json();
        set({
          allQueueTickets: allQueueTickets,
          noTicketsInQueue: false,
        });
        console.log("SUCCESS GETTING ALL QUEUE TICKETS");
      } else {
        console.log("GETTING ALL QUEUE TICKETS FAILED");
      }
    } catch (e) {
      console.log(e);
    }
  },

  handleRequeueTicket: async (mspCustomDomain, ticket, techId) => {
    try {
      const response = await fetch(
        `${dbServiceUrl}/api/ticketQueue/requeue?mspCustomDomain=${mspCustomDomain}&holdTimeInHours=${""}&assignedFlag=${""}&techId=${techId}&newTier=${""}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(ticket),
        }
      );

      if (response.status === 200) {
        console.log("TICKET ADDED BACK INTO THE QUEUE");
        set({ ticketRequeued: true });
      } else {
        console.log("ERROR ADDING TICKET BACK INTO THE QUEUE");
        set({ ticketRequeued: false });
      }
    } catch (e) {
      console.log(e);
    }
  },

  handleCloseTicket: async (mspCustomDomain, ticketId, techId) => {
    try {
      const response = await fetch(
        `${dbServiceUrl}/api/ticketQueue/complete?ticketId=${ticketId}&mspCustomDomain=${mspCustomDomain}&techId=${techId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        console.log("TICKET CLOSED");
        set({ ticketClosed: true });
      } else {
        console.log("ERROR CLOSING TICKET");
        set({ ticketClosed: false });
      }
    } catch (e) {
      console.log(e);
    }
  },

  handleNextQueueTicket: async (mspCustomDomain, tier, techId) => {
    set({
      troubleshootMessages: [],
    });
    const { handleAddTroubleShootMessage, handleNextQueueTicketNotes } = get();
    try {
      const response = await fetch(
        `${dbServiceUrl}/api/ticketQueue/next?tier=${tier}&mspCustomDomain=${mspCustomDomain}&techId=${techId}`
      );

      if (response.status === 200) {
        const myQueueTicket = await response.json();
        if (!myQueueTicket.id) {
          set({ noTicketsInQueue: true });
        } else {
          set({
            myQueueTicket: myQueueTicket,
            ticketClosed: false,
            ticketRequeued: false,
            ticketSaved: false,
            noTicketsInQueue: false,
          });
          console.log("SUCCESS GETTING MY QUEUE TICKET");

          try {
            await Promise.all([
              handleNextQueueTicketNotes(
                mspCustomDomain,
                myQueueTicket.ticketId
              ),
              handleAddTroubleShootMessage(
                myQueueTicket.ticketInformation,
                myQueueTicket.ticketId
              ),
              handleNextQueueTicketNotes(
                mspCustomDomain,
                myQueueTicket.ticketId
              ),
            ]);
          } catch (e) {
            console.log(e);
          }
        }
      } else {
        console.log("GETTING MY QUEUE TICKET FAILED");
      }
    } catch (e) {
      console.log(e);
    }
  },

  handleNextQueueTicketNotes: async (mspCustomDomain, ticketId) => {
    try {
      const response = await fetch(
        `${connectWiseServiceUrl}/getAllConnectWiseTicketNotesById?mspCustomDomain=${mspCustomDomain}&ticketId=${ticketId}`
      );

      if (response.status === 200) {
        const myQueueNotes = await response.json(0);
        console.log("GOT TICKET NOTES");
        set({
          myQueueNotes: myQueueNotes,
        });
      } else {
        console.log("FAILED TO GET TICKET NOTES");
      }
    } catch (e) {
      console.log(e);
    }
  },

  handleEditTicket: async (mspCustomDomain) => {
    const {
      handleEditTicketCategories,
      handleEditTicketPriorites,
      handleEditTicketStatuses,
      myQueueTicket,
    } = get();

    set({
      editTicket: true,
    });

    const ticketCategories = await handleEditTicketCategories(mspCustomDomain);

    if (ticketCategories) {
      try {
        const [priorities, statuses] = await Promise.all([
          handleEditTicketPriorites(mspCustomDomain),
          handleEditTicketStatuses(ticketCategories.boardId, mspCustomDomain),
        ]);

        const category =
          ticketCategories.mspConnectWiseManageCategorizations.find(
            (cat) => cat.categoryId === myQueueTicket.categoryId
          );

        set({
          editingMyQueueTicket: {
            ...myQueueTicket,
            subCategories:
              category.mspConnectWiseManageSubCategorizations || [],
            categories:
              ticketCategories.mspConnectWiseManageCategorizations || [],
            priorities: priorities || [],
            statuses: statuses || [],
          },
        });
      } catch (e) {
        console.log(e);
      }
    } else {
      console.log("No BoardID");
      set({
        editTicket: false,
      });
    }
  },

  handleEditTicketCategories: async (mspCustomDomain) => {
    try {
      const response = await fetch(
        `${dbServiceUrl}/${mspCustomDomain}/connectWiseManageDetails`
      );
      if (response.status === 200) {
        const ticketCategories = await response.json();
        set({
          ticketCategories: ticketCategories,
        });
        console.log("GOT CATEGORIES");
        return ticketCategories;
      } else {
        console.log("failed fetching details");
      }
    } catch (e) {
      console.log(e);
    }
  },

  handleEditTicketPriorites: async (mspCustomDomain) => {
    try {
      const response = await fetch(
        `${connectWiseServiceUrl}/getConnectWisePriorities?mspCustomDomain=${mspCustomDomain}`
      );
      if (response.status === 200) {
        const ticketPriorities = await response.json();
        console.log("GOT PRIORITIES");
        return ticketPriorities;
      } else {
        console.log("failed fetching details");
      }
    } catch (e) {
      console.log(e);
    }
  },

  handleEditTicketStatuses: async (boardId, mspCustomDomain) => {
    try {
      const response = await fetch(
        `${connectWiseServiceUrl}/getConnectWiseStatuses?boardId=${boardId}&mspCustomDomain=${mspCustomDomain}`
      );
      if (response.status === 200) {
        const ticketStatuses = await response.json();
        console.log("GOT STATUSES");
        return ticketStatuses;
      } else {
        console.log("failed fetching details");
      }
    } catch (e) {
      console.log(e);
    }
  },

  handleSaveTicket: async (mspCustomDomain, ticketId) => {
    const { myQueueTicket, editingMyQueueTicket } = get();

    try {
      const response = await fetch(
        `${connectWiseServiceUrl}/updateTicket/${ticketId}?mspCustomDomain=${mspCustomDomain}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: myQueueTicket.title,
            description: editingMyQueueTicket.description,
            categoryName: editingMyQueueTicket.categoryName,
            categoryId: editingMyQueueTicket.categoryId,
            subCategoryName: editingMyQueueTicket.subCategoryName,
            subCategoryId: editingMyQueueTicket.subCategoryId,
            priority: editingMyQueueTicket.priotity,
            priorityId: editingMyQueueTicket.priorityId,
            impact: editingMyQueueTicket.impact,
            severity: editingMyQueueTicket.severity,
            tier: editingMyQueueTicket.tier,
            status: editingMyQueueTicket.status,
            statusId: editingMyQueueTicket.statusId,
          }),
        }
      );

      if (response.status === 200) {
        const newQueueTicket = await response.json();

        set({
          myQueueTicket: newQueueTicket,
          ticketSaved: true,
          editTicket: false,
        });
      } else {
        console.log("Ticket Saving Failed");
        set({
          ticketSaved: false,
        });
      }
    } catch (e) {
      console.log(e);
    }
  },

  handleAddQueueTicketNote: async (ticketId) => {
    const userStore = useUserStore.getState();
    const { ticketNote, handleAddTechnicianNoteMessage } =
      useQueueStore.getState();

    let formattedPrepend;
    formattedPrepend = `Technician: (${userStore.user.id}): `;
    if (ticketNote.trim() !== "") {
      set({
        ticketNote: "",
      });
      try {
        const response = await fetch(
          `${connectWiseServiceUrl}/addNoteToTicketObject?mspCustomDomain=${userStore.user.mspCustomDomain}&ticketId=${ticketId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              info: formattedPrepend,
              text: ticketNote,
            }),
          }
        );

        if (response.status === 200) {
          const responseBody = await response.json();
          handleAddTechnicianNoteMessage(responseBody);
          console.log("Note Added");
        } else {
          console.log("Failed to Add Note");
        }
      } catch (e) {
        console.log(e);
      }
    }
  },

  handleAddTroubleShootMessage: async (message, ticketId) => {
    const { inputRef, messageIdRef } = useRefStore.getState();

    const { handleIfConversationExists } = useConversationStore.getState();
    const userStore = useUserStore.getState();
    let currentConversation = await handleIfConversationExists(ticketId, true);
    if (message.trim() !== "" && currentConversation) {
      inputRef.current.focus();
      try {
        const response = await fetch(`${gptServiceUrl}/jarvis`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: message,
            conversationId: currentConversation.id,
            technicianId: userStore.user.id,
          }),
        });

        if (response.status === 200) {
          const responseBody = await response.json();
          messageIdRef.current = responseBody.id;

          set((prevState) => {
            const newMessage = {
              id: responseBody.id + "-assistant",
              content: responseBody.aiContent,
              role: "assistant",
              timeStamp: new Date().toISOString(),
            };
            return {
              ...prevState,
              troubleshootMessages: [
                ...prevState.troubleshootMessages,
                newMessage,
              ],
            };
          });
        }
      } catch (e) {
        console.log(e);
      }
    }
  },

  handleAddTechnicianNoteMessage: async (note) => {
    set((prevState) => ({
      myQueueNotes: [...prevState.myQueueNotes, note],
    }));
  },

  handleAddUserTroubleshootMessage: async (message) => {
    set((prevState) => {
      const newUserMessage = {
        id: Date.now() + "-user",
        content: message,
        role: "user",
        timeStamp: new Date().toISOString(),
      };

      return {
        ...prevState,
        troubleshootMessages: [
          ...prevState.troubleshootMessages,
          newUserMessage,
        ],
      };
    });
  },
  handleAddAssistantTroubleshootMessage: (message) => {
    const { messageIdRef } = useRefStore.getState();
    set((prevState) => {
      const newAssistantMessage = {
        id: messageIdRef.current + "-assistant",
        content: message,
        role: "assistant",
        timeStamp: new Date().toISOString(),
      };
      return {
        ...prevState,
        troubleshootMessages: [
          ...prevState.troubleshootMessages,
          newAssistantMessage,
        ],
      };
    });
  },

  clearQueue: () => {
    set({
      ticketQueueMode: "Troubleshoot",
      troubleshootMessages: [],
      myQueueTicket: null,
      myQueueNotes: null,
      editingMyQueueTicket: null,
      allQueueTickets: null,
      myActivities: null,
      allActivities: null,
      isMobile: initialWidth < 1600,
      activeSectionButton: "Form",
      activeNoteCategory: "Description",
      activeQueueTicketButton: "QueueTicket",
      currentQueueIndex: 0,
      options: ["activities", "allQueueTickets", "myQueueTickets"],
      currentActivitiesOption: "myActivities",
      currentOption: "activities",
      noTicketsInQueue: false,
      ticketRequeued: false,
      ticketClosed: false,
      ticketSaved: false,
      editTicket: false,
      ticketCategories: null,
      ticketPriorities: null,
      ticketStatuses: null,
      severityOptions: ["Low", "Medium", "High"],
      impactOptions: ["Low", "Medium", "High"],
      tierOptions: ["Tier1", "Tier2", "Tier3", "No Dispatching"],
    });
  },
}));

export default useQueueStore;
