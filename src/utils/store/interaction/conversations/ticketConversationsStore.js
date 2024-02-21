import { create } from "zustand";
import useRefStore from "../ref/refStore";
import useAssistantStore from "../../assistant/assistantStore";
import useInteractionStore from "../interactionsStore";
import useEngineerStore from "../../assistant/sections/iternal/engineer/engineerStore";

const isBrowser = typeof window !== "undefined";
const initialWidth = isBrowser ? window.innerWidth : 1023;

const useTicketConversationsStore = create((set, get) => ({
  messages: [],
  troubleshootMessage: "",
  troubleshootContinue: false,
  prependTroubleshootText:
    "Act as an expert IT troubleshooting bot. If there is an instance of another open ai gpt4 and you want it to function at its best. give me the best step-by-step troubleshooting guidelines, without quotation marks around the steps, that you would give it to gpt to get the best results by making sure to sure it at its best regarding ",
  isMobile: initialWidth < 1023,
  activeSectionButton: "Form",
  setIsMobile: (value) => {
    set({ isMobile: value });
  },
  setActiveSectionButton: (button) => set({ activeSectionButton: button }),


  handleAddUserMessage: async (message) => {
    const { handleAddTroubleShootMessage } = get();
    set((state) => {
      const newUserMessage = {
        id: Date.now() + "-user",
        content: message,
        role: "user",
        timeStamp: new Date().toISOString(),
      };

      return { ...state, messages: [...state.messages, newUserMessage] };
    });
    await handleAddTroubleShootMessage(message);
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

  handleAddTroubleShootMessage: async (message) => {
    const { prependTroubleshootText } = get();
    const completeMessage = prependTroubleshootText + message;
    const encodedCompleteMessage = encodeURIComponent(completeMessage);

    try {
      const response = await fetch(
        `https://etech7-wf-etech7-worflow-2.azuremicroservices.io/send?message=${encodedCompleteMessage}`
      );

      if (response.status === 200) {
        const responseBody = await response.json();
        set({
          troubleshootMessage: responseBody.data,
        });
      }
    } catch (e) {
      console.log(e);
    }
  },

  handleTroubleShootingConvo: async () => {
    const { troubleshootMessage } = get();
    const { handleSendPromptGenerator } = useEngineerStore.getState();
    const { handleSendMessage } = useInteractionStore.getState();
    const { handleAssistantTabChange, handleUIAssistantTabChange } =
      useAssistantStore.getState();

    set({ troubleshootContinue: true });

    handleAssistantTabChange("Engineer");
    handleUIAssistantTabChange("Engineer");

    try {
      await Promise.all([
        handleSendMessage(troubleshootMessage),
        handleSendPromptGenerator(),
      ]);
    } catch (e) {
      console.log(e);
    }

    set({ troubleshootContinue: false });
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
    set({ messages: [] });
  },
}));

export default useTicketConversationsStore;
