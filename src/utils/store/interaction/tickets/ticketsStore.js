import { handleGetTickets } from "@/utils/api/serverProps";
import useUserStore from "@/utils/store/user/userStore";
import { create } from "zustand";

const useTicketsStore = create((set, get) => ({
  tickets: [],
  ticketStatus: {},
  ticketStatusLoading: {},
  activeTicketButton: "Opened",
  showTicket: null,
  activeTicketMode: "Default",

  initializeTickets: async () => {
    const userStore = useUserStore.getState();
    set({ tickets: [] });
    if (userStore.user) {
      const newTickets = await handleGetTickets(userStore.user.id);
      set({ tickets: newTickets });
    }
  },

  setActiveTicketButton: (button) => set({ activeTicketButton: button }),

  addTicket: (ticket) =>
    set((state) => ({ tickets: [...state.tickets, ticket] })),

  handleTicketMode: async (mode, ticketId) => {
    const { tickets, handleGetTicketStatus } = get();
    await handleGetTicketStatus(ticketId);
    const ticket = ticketId
      ? tickets.find((t) => t.ticketId === ticketId)
      : null;
    set({ activeTicketMode: mode, showTicket: ticket });
  },

  handleUpdateTicketClosed: (ticketId) => {
    set((state) => ({
      tickets: state.tickets.map((ticket) =>
        ticket.ticketId === ticketId ? { ...ticket, closed: true } : ticket
      ),
    }));
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
