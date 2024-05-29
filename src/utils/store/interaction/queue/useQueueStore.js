import { create } from "zustand";
import useTicketConversationsStore from "../conversations/ticketConversationsStore";

const isBrowser = typeof window !== "undefined";
const initialWidth = isBrowser ? window.innerWidth : 1023;
const dbServiceUrl = process.env.NEXT_PUBLIC_DB_SERVICE_URL;
const connectWiseServiceUrl = process.env.NEXT_PUBLIC_CONNECTWISE_SERVICE_URL;

const useQueueStore = create((set, get) => ({
  myQueueTicket: null,
  allQueueTickets: null,
  myActivities: null,
  allActivities: null,
  isMobile: initialWidth < 1023,
  activeSectionButton: "Form",
  currentQueueIndex: 0,
  options: [
    "myActivities",
    "allActivities",
    "allQueueTickets",
    "myQueueTickets",
  ],
  currentOption: "myActivities",
  noTicketsInQueue: false,
  ticketRequeued: false,
  ticketClosed: false,

  setIsMobile: (value) => {
    set({ isMobile: value });
  },
  setActiveSectionButton: (button) => set({ activeSectionButton: button }),

  handleWorkspaceOptionSelected: async (option, mspCustomDomain, tier, techId) => {
    const {
      handleShowMyActivities,
      handleShowAllActivities,
      handleShowAllQueueTickets,
      handleNextQueueTicket,
    } = get();
    set({ currentOption: option });

    if (option === "myActivities") {
      await handleShowMyActivities(mspCustomDomain, techId);
    }
    if (option === "allActivities") {
      await handleShowAllActivities(mspCustomDomain);
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
        console.log(myActivities);
        set({
          myActivities: myActivities,
          noTicketsInQueue: false,
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

  handleRequeueTicket: async (mspCustomDomain, ticket) => {
    try {
      const response = await fetch(
        `${dbServiceUrl}/api/ticketQueue/requeue?mspCustomDomain=${mspCustomDomain}&holdTimeInHours=${""}&assignedFlag=${""}&techId=${""}&newTier=${""}`,
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
        `${dbServiceUrl}/api/ticketQueue/endActivity?ticketId=${ticketId}&mspCustomDomain=${mspCustomDomain}&techId=${techId}`,
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
        `${dbServiceUrl}/api/ticketQueue/next/?tier=${tier}&mspCustomDomain=${mspCustomDomain}&techId=${techId}`
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

  clearQueue: () => {
    set({
      myQueueTicket: null,
      allQueueTickets: null,
      myActivities: null,
      allActivities: null,
      isMobile: initialWidth < 1023,
      activeSectionButton: "Form",
      currentQueueIndex: 0,
      options: [
        "myActivities",
        "allActivities",
        "allQueueTickets",
        "myQueueTickets",
      ],
      currentOption: "myActivities",
      noTicketsInQueue: false,
      ticketRequeued: false,
      ticketClosed: false,
    });
  },
}));

export default useQueueStore;
