import { create } from "zustand";
import useRefStore from "../ref/refStore";

const isBrowser = typeof window !== "undefined";
const initialWidth = isBrowser ? window.innerWidth : 1023;

const dbServiceUrl = process.env.NEXT_PUBLIC_DB_SERVICE_URL;
const connectWiseServiceUrl = process.env.NEXT_PUBLIC_CONNECTWISE_SERVICE_URL;
const gptServiceUrl = process.env.NEXT_PUBLIC_GPT_SERVICE_URL;

const useTicketConversationsStore = create((set, get) => ({
  messages: [],
  troubleshootMessage: "",
  troubleshootContinue: false,
  prependTroubleshootText:
    "Please provide the best IT support for this ticket description: ",
  isMobile: initialWidth < 1023,
  activeSectionButton: "Form",

  setIsMobile: (value) => {
    set({ isMobile: value });
  },
  setActiveSectionButton: (button) => set({ activeSectionButton: button }),

  handleAddUserMessage: async (message) => {
    set((state) => {
      const newUserMessage = {
        id: Date.now() + "-user",
        content: message,
        role: "user",
        timeStamp: new Date().toISOString(),
      };

      return { ...state, messages: [...state.messages, newUserMessage] };
    });
  },

  handleAddAssistantMessage: (message, buttons) => {
    set((state) => {
      const newMessage = {
        id: Date.now() + "-assistant",
        content: message,
        role: "assistant",
        timeStamp: new Date().toISOString(),
        type: buttons ? "buttons" : "markdown",
      };
      return { ...state, messages: [...state.messages, newMessage] };
    });
  },

  handleRemoveButtons: () => {
    set((state) => {
      return {
        ...state,
        messages: state.messages.filter((msg) => msg.type !== "buttons"),
      };
    });
  },

  clearTicketConversation: () => {
    set({
      messages: [],
      troubleshootMessage: "",
      troubleshootContinue: false,
      prependTroubleshootText:
        "Please provide the best IT support for this ticket description: ",
      isMobile: initialWidth < 1023,
      activeSectionButton: "Form",
    });
  },
}));

export default useTicketConversationsStore;
