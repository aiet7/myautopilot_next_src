import { create } from "zustand";
import useTicketConversationsStore from "../conversations/ticketConversationsStore";

const isBrowser = typeof window !== "undefined";
const initialWidth = isBrowser ? window.innerWidth : 1023;
const dbServiceUrl = process.env.NEXT_PUBLIC_DB_SERVICE_URL;
const connectWiseServiceUrl = process.env.NEXT_PUBLIC_CONNECTWISE_SERVICE_URL;

const useQueueStore = create((set, get) => ({
  myQueueTicket: null,
  editingMyQueueTicket: null,
  allQueueTickets: null,
  myActivities: null,
  allActivities: null,
  isMobile: initialWidth < 1350,
  activeSectionButton: "Form",
  currentQueueIndex: 0,
  options: ["activities", "allQueueTickets", "myQueueTickets"],
  currentActivitiesOption: "myActivities",
  currentOption: "activities",
  noTicketsInQueue: false,
  ticketRequeued: false,
  ticketClosed: false,
  editTicket: false,
  ticketCategories: null,
  ticketPriorities: null,
  ticketStatuses: null,
  severityOptions: ["Low", "Medium", "High"],
  impactOptions: ["Low", "Medium", "High"],
  tierOptions: ["Tier1", "Tier2", "Tier3", "No Dispatching"],

  setIsMobile: (value) => {
    set({ isMobile: value });
  },
  setActiveSectionButton: (button) => set({ activeSectionButton: button }),

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

  handleWorkspaceOptionSelected: async (
    option,
    mspCustomDomain,
    tier,
    techId
  ) => {
    const {
      handleShowMyActivities,
      handleShowAllQueueTickets,
      handleNextQueueTicket,
    } = get();
    set({ currentOption: option });

    if (option === "activities") {
      await handleShowMyActivities(mspCustomDomain, techId);
    }

    if (option === "allQueueTickets") {
      await handleShowAllQueueTickets(mspCustomDomain);
    }

    if (option === "myQueueTickets") {
      await handleNextQueueTicket(mspCustomDomain, tier, techId);
    }
  },

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
    const { handleAddTroubleShootMessage } =
      useTicketConversationsStore.getState();
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
            noTicketsInQueue: false,
          });
          console.log("SUCCESS GETTING MY QUEUE TICKET");
          await handleAddTroubleShootMessage(myQueueTicket.ticketInformation);
        }
      } else {
        console.log("GETTING MY QUEUE TICKET FAILED");
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
        console.log("Ticket Saved!");
      } else {
        console.log("Ticket Saving Failed");
      }
    } catch (e) {
      console.log(e);
    }
  },

  clearQueue: () => {
    set({
      myQueueTicket: null,
      editingMyQueueTicket: null,
      allQueueTickets: null,
      myActivities: null,
      allActivities: null,
      isMobile: initialWidth < 1023,
      activeSectionButton: "Form",
      currentQueueIndex: 0,
      options: ["activities", "allQueueTickets", "myQueueTickets"],
      currentActivitiesOption: "myActivities",
      currentOption: "activities",
      noTicketsInQueue: false,
      ticketRequeued: false,
      ticketClosed: false,
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
