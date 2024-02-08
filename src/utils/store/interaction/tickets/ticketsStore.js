import { handleGetMSPTickets } from "@/utils/api/serverProps";
import { create } from "zustand";
import useTechStore from "../../user/techStore";

const useTicketsStore = create((set, get) => ({
  tickets: [],
  ticketStatus: null,
  ticketNotes: null,
  ticketStatusLoading: {},
  activeTicketButton: "Opened",
  showTicket: null,
  activeTicketMode: "Default",

  initializeMSPTickets: async () => {
    const techStore = useTechStore.getState();
    set({ tickets: []});
    if (techStore.tech) {
      const newTickets = await handleGetMSPTickets(
        techStore.tech.mspCustomDomain
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
    const techStore = useTechStore.getState();
    const encodedDomain = encodeURIComponent(techStore.tech.mspCustomDomain);
    try {
      set((state) => ({
        ...state,
        ticketStatusLoading: { ...state.ticketStatusLoading, [ticketId]: true },
      }));
      const ticketStatusResponse = await fetch(
        `http://localhost:9020/getTicketsById?mspCustomDomain=${encodedDomain}&ticketId=${ticketId}`
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
    const techStore = useTechStore.getState();
    const encodedDomain = encodeURIComponent(techStore.tech.mspCustomDomain);
    try {
      const ticketNotesResponse = await fetch(
        `http://localhost:9020/getConnectWiseTicketNotesById?mspCustomDomain=${encodedDomain}&ticketId=${ticketId}`
      );
      if (ticketNotesResponse.status === 200) {
        const ticketNotes = await ticketNotesResponse.json();

        set((state) => ({
          ...state,
          ticketNotes: {
            ...state.ticketNotes,
            [ticketId]: ticketNotes,
          },
        }));
      }
    } catch (e) {
      console.log(e);
    }
  },

  clearTickets: () => set({ tickets: [] }),
}));

export default useTicketsStore;
