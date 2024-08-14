import { create } from "zustand";
import useRefStore from "../ref/refStore";
import useAssistantStore from "../../assistant/assistantStore";
import useInteractionStore from "../interactionsStore";
import useEngineerStore from "../../assistant/sections/iternal/engineer/engineerStore";

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

  handleAddAssistantMessage: (message, formType) => {
    const { messageIdRef } = useRefStore.getState();
    const messageId = `${messageIdRef.current}-ai${
      formType ? `-${formType}` : ""
    }`;

    set((state) => {
      const newMessage = {
        id: messageId,
        content: message,
        role: "assistant",
        timeStamp: new Date().toISOString(),
      };
      return { ...state, messages: [...state.messages, newMessage] };
    });
  },

  handleAddForm: (formType) => {
    const formId = Date.now();

    set((state) => {
      const newForm = {
        id: formId,
        type: "form",
        formType,
      };
      return { ...state, messages: [...state.messages, newForm] };
    });

    return formId;
  },

  handleRemoveForm: (formId) => {
    set((state) => {
      return {
        ...state,
        messages: state.messages.filter((msg) => msg.id !== formId),
        troubleshootMessage: "",
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
