import {
  handleGetClientTickets,
  handleGetMSPTickets,
} from "@/utils/api/serverProps";
import { create } from "zustand";
import useUserStore from "../../user/userStore";

const dbServiceUrl = process.env.NEXT_PUBLIC_DB_SERVICE_URL;
const connectWiseServiceUrl = process.env.NEXT_PUBLIC_CONNECTWISE_SERVICE_URL; 
const psaServiceUrl = process.env.NEXT_PUBLIC_PSA_SERVICE_URL

const useTicketsStore = create((set, get) => ({
  searchValue: "",
  tickets: null,
  ticketStatus: null,
  ticketNote: "",
  ticketStatusLoading: {},
  activeTicketBotMode: "History",
  viewTicket: false,
  activeTicketMode: "Default",
  filterTicketMode: "Newest",
  filterTicketModeOpen: "",
  activeTicketButton: "Ticket",
  activeNoteCategory: "Description",

  activeTicketOptions: ["Create Ticket", "History", "Ticket"],

  currentTicketPage: 1,
  ticketsPerPage: 30,
  totalTicketPages: 1,
  filteredTicketCount: 0,

  currentTicket: null,
  currentNotes: null,

  initializeMSPTickets: async () => {
    const userStore = useUserStore.getState();
    set({
      tickets: null,
    });

    if (userStore.user) {
      try {
        const newTickets = await handleGetMSPTickets(
          userStore.user.mspCustomDomain
        );

        set({
          tickets: newTickets,
        });
      } catch (e) {
        console.log(e);
      }
    }
  },

  initializeClientTickets: async () => {
    const userStore = useUserStore.getState();
    set({
      tickets: null,
    });

    if (userStore.user) {
      try {
        const newTickets = await handleGetClientTickets(userStore.user.id);

        set({
          tickets: newTickets,
        });
      } catch (e) {
        console.log(e);
      }
    }
  },

  setTotalTicketPages: (pages) => set({ totalTicketPages: pages }),
  setFilteredTicketCount: (count) => set({ filteredTicketCount: count }),

  setActiveNoteCategory: (category) =>
    set({
      activeNoteCategory: category,
    }),
  setTicketNote: (value) => set({ ticketNote: value }),

  setViewTicket: (view) => set({ viewTicket: view, currentTicket: null }),

  setCurrentTicketPage: (page) => set({ currentTicketPage: page }),

  setSearchValue: (value) =>
    set((state) => ({
      ...state,
      searchValue: value,
      currentTicketPage: 1,
    })),

  setActiveTicketButton: (button) => set({ activeTicketButton: button }),

  setActiveTicketBotMode: (mode) => set({ activeTicketBotMode: mode }),

  setActiveFilterMode: (mode) =>
    set({
      filterTicketMode: mode,
      currentTicketPage: 1,
      filterTicketModeOpen: "",
    }),

  setActiveTicketFilterModeOpen: (open) => set({ filterTicketModeOpen: open }),

  addTicket: (ticket) =>
    set((state) => ({ tickets: [...state.tickets, ticket] })),

  handleNextTicketPage: () => {
    set((state) => {
      const totalPages = Math.ceil(
        state.filteredTicketCount / state.ticketsPerPage
      );
      return {
        currentTicketPage:
          state.currentTicketPage < totalPages
            ? state.currentTicketPage + 1
            : state.currentTicketPage,
      };
    });
  },
  handlePreviousTicketPage: () =>
    set((state) => ({
      currentTicketPage:
        state.currentTicketPage > 1 ? state.currentTicketPage - 1 : 1,
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
        `${psaServiceUrl}/getTicketsById?mspCustomDomain=${encodedDomain}&ticketId=${ticketId}`
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
        `${psaServiceUrl}/getAllConnectWiseTicketNotesById?mspCustomDomain=${encodedDomain}&ticketId=${ticketId}`
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
          `${psaServiceUrl}/addNoteToTicketObject?mspCustomDomain=${userStore.user.mspCustomDomain}&ticketId=${ticketId}`,
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
      filterTicketMode: "Newest",
      filterTicketModeOpen: "",
      activeTicketButton: "Ticket",
      activeNoteCategory: "Description",

      activeTicketOptions: ["History", "Ticket"],

      currentTicketPage: 1,
      ticketsPerPage: 30,
      totalTicketPages: 1,
      filteredTicketCount: 0,

      currentTicket: null,
      currentNotes: null,
    });
  },
}));

export default useTicketsStore;
