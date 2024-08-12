import {
  handleGetClientTickets,
  handleGetMSPTickets,
} from "@/utils/api/serverProps";
import { create } from "zustand";
import useUserStore from "../../user/userStore";

const dbServiceUrl = process.env.NEXT_PUBLIC_DB_SERVICE_URL;
const connectWiseServiceUrl = process.env.NEXT_PUBLIC_CONNECTWISE_SERVICE_URL;

const useTicketsStore = create((set, get) => ({
  searchValue: "",
  tickets: null,
  ticketStatus: null,
  ticketNotes: null,
  ticketStatusLoading: {},
  activeTicketBotMode: "History",
  showTicket: null,
  activeTicketMode: "Default",
  filterTicketMode: "Most Recent",
  activeTicketBotModeOpen: false,
  filterTicketModeOpen: false,

  activeTicketOptions: ["History", "Ticket"],
  filterTicketOptions: [
    "Most Recent",
    "Oldest",
    "A-Z",
    "Z-A",
    "Open",
    "Closed",
  ],

  currentPage: 1,
  ticketsPerPage: 30,

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

  initializeClientTickets: async () => {
    const userStore = useUserStore.getState();

    if (userStore.user) {
      set({ tickets: null });
      const newTickets = await handleGetClientTickets(userStore.user.id);
      set({ tickets: newTickets });
    }
  },

  setCurrentPage: (page) => set({ currentPage: page }),

  setSearchValue: (value) =>
    set((state) => ({
      ...state,
      searchValue: value,
      currentPage: 1,
    })),

  setActiveTicketBotMode: (mode) => set({ activeTicketBotMode: mode }),

  setActiveFilterMode: (mode) =>
    set({ filterTicketMode: mode, currentPage: 1 }),

  setActiveTicketBotModeOpen: (open) => set({ activeTicketBotModeOpen: open }),

  setActiveTicketFilterModeOpen: (open) => set({ filterTicketModeOpen: open }),

  addTicket: (ticket) =>
    set((state) => ({ tickets: [...state.tickets, ticket] })),

  handleNextPage: () =>
    set((state) => ({
      currentPage: state.currentPage + 1,
    })),

  handlePreviousPage: () =>
    set((state) => ({
      currentPage: state.currentPage > 1 ? state.currentPage - 1 : 1,
    })),

  handleToggleTicketMenus: (toggle) => {
    set({
      activeTicketBotModeOpen: toggle,
      filterTicketModeOpen: toggle,
    });
  },

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
      searchValue: "",
      tickets: null,
      ticketStatus: null,
      ticketNotes: null,
      ticketStatusLoading: {},
      activeTicketBotMode: "History",
      showTicket: null,
      activeTicketMode: "Default",
      filterTicketMode: "Most Recent",
      activeTicketBotModeOpen: false,
      filterTicketModeOpen: false,

      activeTicketOptions: ["History", "Ticket"],
      filterTicketOptions: [
        "Most Recent",
        "Oldest",
        "A-Z",
        "Z-A",
        "Open",
        "Closed",
      ],

      currentPage: 1,
      ticketsPerPage: 30,
    });
  },
}));

export default useTicketsStore;
