import { handleGetMSPTickets } from "@/utils/api/serverProps";
import { create } from "zustand";
import useUserStore from "../../user/userStore";

const dbServiceUrl = process.env.NEXT_PUBLIC_DB_SERVICE_URL;
const connectWiseServiceUrl = process.env.NEXT_PUBLIC_CONNECTWISE_SERVICE_URL;

const useTicketsStore = create((set, get) => ({
  tickets: null,
  ticketStatus: null,
  ticketNotes: null,
  ticketStatusLoading: {},
  activeTicketButton: "Opened",
  showTicket: null,
  activeTicketMode: "Default",

  initializeMSPTickets: async () => {
    const userStore = useUserStore.getState();

    if (userStore.user) {
      set({ tickets: null });
      const newTickets = await handleGetMSPTickets(
        userStore.user.mspCustomDomain
      );
      set({ tickets: newTickets });
    }
  },

  setActiveTicketButton: (button) => set({ activeTicketButton: button }),

  addTicket: (ticket) =>
    set((state) => ({ tickets: [...state.tickets, ticket] })),

  handleTicketMode: async (mode, ticketId) => {
    if (mode === "Support") {
      const { tickets, handleGetTicketStatus, handleGetTicketNotes } = get();

      try {
        await Promise.all([
          handleGetTicketStatus(ticketId),
          handleGetTicketNotes(ticketId),
        ]);

        const ticket = ticketId
          ? tickets.find((t) => t.ticketId === ticketId)
          : null;
        set({ activeTicketMode: mode, showTicket: ticket });
      } catch (e) {
        console.log(e);
      }
    } else {
      set({ activeTicketMode: mode, showTicket: null });
    }
  },

  handleUpdateTicketClosed: (ticketId) => {
    set((state) => ({
      tickets: state.tickets.map((ticket) =>
        ticket.ticketId === ticketId ? { ...ticket, closed: true } : ticket
      ),
    }));
  },

  handleGetTicketStatus: async (ticketId) => {
    const userStore = useUserStore.getState();
    const encodedDomain = encodeURIComponent(userStore.user.mspCustomDomain);
    try {
      set((state) => ({
        ...state,
        ticketStatusLoading: { ...state.ticketStatusLoading, [ticketId]: true },
      }));
      const ticketStatusResponse = await fetch(
        `${connectWiseServiceUrl}/getTicketsById?mspCustomDomain=${encodedDomain}&ticketId=${ticketId}`
      );
      if (ticketStatusResponse.status === 200) {
        const ticketStatus = await ticketStatusResponse.json();
        set((state) => ({
          ...state,
          ticketStatus: {
            ...state.ticketStatus,
            [ticketId]: ticketStatus,
          },
          ticketStatusLoading: {
            ...state.ticketStatusLoading,
            [ticketId]: false,
          },
        }));
      }
    } catch (e) {
      console.log(e);
    }
  },

  handleGetTicketNotes: async (ticketId) => {
    const userStore = useUserStore.getState();
    const encodedDomain = encodeURIComponent(userStore.user.mspCustomDomain);
   
    try {
      const ticketNotesResponse = await fetch(
        `${connectWiseServiceUrl}/getConnectWiseTicketNotesById?mspCustomDomain=${encodedDomain}&ticketId=${ticketId}`
      );
      if (ticketNotesResponse.status === 200) {
        const ticketNotes = await ticketNotesResponse.json();
        set({
          ticketNotes: ticketNotes,
        });
      }
    } catch (e) {
      console.log(e);
    }
  },

  clearTickets: async () => {
    set({
      tickets: null,
      ticketStatus: null,
      ticketNotes: null,
      ticketStatusLoading: {},
      activeTicketButton: "Opened",
      showTicket: null,
      activeTicketMode: "Default",
    });
  },
}));

export default useTicketsStore;
