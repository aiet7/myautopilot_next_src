import {
  handleGetClientTickets,
  handleGetMSPTickets,
} from "@/utils/api/serverProps";
import { create } from "zustand";
import useUserStore from "../../user/userStore";
import useUiStore from "../../ui/uiStore";

const dbServiceUrl = process.env.NEXT_PUBLIC_DB_SERVICE_URL;
const connectWiseServiceUrl = process.env.NEXT_PUBLIC_CONNECTWISE_SERVICE_URL;

const useTicketsStore = create((set, get) => ({
  searchValue: "",
  tickets: null,
  ticketStatus: null,
  ticketNote: "",
  ticketStatusLoading: {},
  activeTicketBotMode: "History",
  viewTicket: false,
  activeTicketMode: "Default",
  filterTicketMode: "Most Recent",
  activeTicketBotModeOpen: false,
  filterTicketModeOpen: false,
  activeTicketButton: "Ticket",
  activeNoteCategory: "Description",

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
  maxPagesToShow: 10,

  currentTicket: null,
  currentNotes: null,

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

  setActiveNoteCategory: (category) =>
    set({
      activeNoteCategory: category,
    }),
  setTicketNote: (value) => set({ ticketNote: value }),

  setViewTicket: (view) => set({ viewTicket: view, currentTicket: null }),

  setCurrentPage: (page) => set({ currentPage: page }),

  setSearchValue: (value) =>
    set((state) => ({
      ...state,
      searchValue: value,
      currentPage: 1,
    })),

  setActiveTicketButton: (button) => set({ activeTicketButton: button }),

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

  handleViewTicket: async (ticket, ticketId) => {
    const { handleGetTicketStatus, handleGetTicketNotes } = get();

    try {
      await Promise.all([
        handleGetTicketStatus(ticketId),
        handleGetTicketNotes(ticketId),
      ]);

      set({ currentTicket: ticket, viewTicket: true });
    } catch (e) {
      console.log(e);
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
        `${connectWiseServiceUrl}/getAllConnectWiseTicketNotesById?mspCustomDomain=${encodedDomain}&ticketId=${ticketId}`
      );
      if (ticketNotesResponse.status === 200) {
        const ticketNotes = await ticketNotesResponse.json();
        set({
          currentNotes: ticketNotes,
        });
      }
    } catch (e) {
      console.log(e);
    }
  },

  handleAddTicketNote: async (ticketId) => {
    const userStore = useUserStore.getState();
    const { ticketNote, handleAddTechnicianNoteMessage } = get();

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

  handleAddTechnicianNoteMessage: async (note) => {
    set((prevState) => ({
      currentNotes: [...prevState.currentNotes, note],
    }));
  },

  clearTickets: async () => {
    set({
      searchValue: "",
      tickets: null,
      ticketStatus: null,
      ticketNote: "",
      ticketStatusLoading: {},
      activeTicketBotMode: "History",
      viewTicket: false,
      activeTicketMode: "Default",
      filterTicketMode: "Most Recent",
      activeTicketBotModeOpen: false,
      filterTicketModeOpen: false,
      activeTicketButton: "Ticket",
      activeNoteCategory: "Description",

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
      maxPagesToShow: 10,

      currentTicket: null,
      currentNotes: null,
    });
  },
}));

export default useTicketsStore;
