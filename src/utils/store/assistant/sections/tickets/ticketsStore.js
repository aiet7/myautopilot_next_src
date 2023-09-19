import { create } from "zustand";

const useTicketsStore = create((set, get) => ({
  tickets: [],
  ticketStatus: {},
  ticketStatusLoading: {},
  activeTicketButton: "Opened",
  showTicketIndex: null,

  initializeTickets: (initialTickets) => {
    set({ tickets: initialTickets });
  },

  setActiveTicketButton: (button) => set({ activeTicketButton: button }),
  setShowTicketIndex: (index) => set({ showTicketIndex: index }),

  addTicket: (ticket) =>
    set((state) => ({ tickets: [...state.tickets, ticket] })),

  handleUpdateTicketClosed: (ticketId) => {
    set((state) => ({
      tickets: state.tickets.map((ticket) =>
        ticket.ticketId === ticketId ? { ...ticket, closed: true } : ticket
      ),
    }));
  },

  handleCloseTicket: async (ticketId) => {
    const { handleUpdateTicketClosed } = get();
    try {
      const ticketResponse = await fetch(
        `https://etech7-wf-etech7-db-service.azuremicroservices.io/updateStatusToClosed?ticketId=${ticketId}`
      );
      if (ticketResponse.status === 200) {
        console.log("closed");
        const test = await ticketResponse.json();
        console.log(test);
        handleUpdateTicketClosed(ticketId);
      }
    } catch (e) {
      console.log(e);
    }
  },

  handleGetTicketStatus: async (ticketId) => {
    try {
      set((state) => ({
        ...state,
        ticketStatusLoading: { ...state.ticketStatusLoading, [ticketId]: true },
      }));
      const ticketStatusResponse = await fetch(
        `https://etech7-wf-etech7-support-service.azuremicroservices.io/getTicketsById?ticketId=${ticketId}`
      );
      if (ticketStatusResponse.status === 200) {
        const ticketStatus = await ticketStatusResponse.text();
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
}));

export default useTicketsStore;
