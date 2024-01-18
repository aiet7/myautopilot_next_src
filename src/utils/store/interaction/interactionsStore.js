import { create } from "zustand";
import useFormsStore from "./forms/formsStore";
import useUserStore from "../user/userStore";
import useConversationStore from "./conversations/conversationsStore";
import useRefStore from "./ref/refStore";
import useDocConversationsStore from "./conversations/docConversationsStore";
import useTicketConversationsStore from "./conversations/ticketConversationsStore";
import useTechStore from "../user/techStore";

const useInteractionStore = create((set, get) => ({
  userInput: "",
  isWaiting: false,
  isListening: false,
  isServerError: false,
  isFeedbackSubmitted: false,
  isAtBottom: false,
  isOverflowed: false,
  feedback: {},
  textAreaheight: "24px",

  handleTextAreaChange: (e) => {
    set({
      userInput: e.target.value,
      textAreaheight: `${e.target.scrollHeight}px`,
    });
  },

  handleScrollToBottom: (smooth) => {
    const { latestMessageRef } = useRefStore.getState();
    latestMessageRef.current?.scrollIntoView({
      behavior: smooth ? "smooth" : "auto",
      block: "end",
    });
  },

  handleCheckScroll: () => {
    const { chatContainerRef } = useRefStore.getState();
    const container = chatContainerRef.current;
    const atBottom =
      Math.abs(
        container.scrollHeight - container.scrollTop - container.clientHeight
      ) < 5;
    set({
      isAtBottom: atBottom,
      isOverflowed: container.scrollHeight > container.clientHeight,
    });
  },

  handleSubmitFeedback: async (messageId, feedback) => {
    try {
      const cleanedMessageId = messageId.replace(
        /-ai(-emailForm|-contactForm|-ticketForm|-eventForm|-taskForm)?$/,
        ""
      );
      const response = await fetch(
        `https://etech7-wf-etech7-db-service.azuremicroservices.io/updateFeedback?messageId=${cleanedMessageId}&feedback=${feedback}`
      );
      if (response.status === 200) {
        set((state) => ({
          ...state,
          isFeedbackSubmitted: true,
          feedback: {
            ...state.feedback,
            [messageId]: feedback,
          },
        }));

        setTimeout(() => {
          set({ isFeedbackSubmitted: false });
        }, 2000);
      } else {
        console.log("feedback failed");
      }
    } catch (e) {
      console.log(e);
    }
  },

  handleSendDocumentMessage: async (message) => {
    const { inputRef } = useRefStore.getState();
    const {
      handleAddUserMessage,
      handleAddAssistantMessage,
      documentConversationHistories,
      currentDocumentConversationIndex,
    } = useDocConversationsStore.getState();

    const currentDocument =
      documentConversationHistories[currentDocumentConversationIndex];

    if (message.trim() !== "") {
      inputRef.current.focus();

      handleAddUserMessage(message);
      set({
        isWaiting: true,
        isServerError: false,
        userInput: "",
      });

      try {
        const response = await fetch(
          `https://etech7-wf-etech7-document-service.azuremicroservices.io/chat`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: currentDocument.id,
              documentMessage: message,
            }),
          }
        );

        if (response.status === 200) {
          const responseBody = await response.json();
          handleAddAssistantMessage(responseBody.documentMessage);
        }
      } catch (e) {
        console.log(e);
      } finally {
        set({
          isWaiting: false,
        });
      }
    }
  },

  handleCreateTicketMessage: async (message) => {
    const techStore = useTechStore.getState();
    const { inputRef, messageIdRef } = useRefStore.getState();
    const { handleAddUserMessage } = useTicketConversationsStore.getState();
    const { handleCreateTicketProcess } = useFormsStore.getState();
    if (message.trim() !== "") {
      inputRef.current.focus();

      handleAddUserMessage(message);
      set({
        isWaiting: true,
        isServerError: false,
        userInput: "",
      });

      try {
        const response = await fetch(
          "http://localhost:9020/getTicketCategorization",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userMessage: message,
              userId: techStore.tech.id,
              mspCustomDomain: techStore.tech.mspCustomDomain
            }),
          }
        );

        if (response.status === 200) {
          const responseBody = await response.json();
          messageIdRef.current = Date.now();
          handleCreateTicketProcess(
            JSON.parse(responseBody.msg),
            responseBody.emailID,
            responseBody.personName,
            responseBody.phoneNumber
          );
        } else if (response.status === 500) {
          set({
            isServerError: true,
          });
        }
      } catch (e) {
        console.log(e);
      } finally {
        set({
          isWaiting: false,
        });
      }
    }
  },

  handleSendMessage: async (message) => {
    const { inputRef, messageIdRef } = useRefStore.getState();
    const userStore = useUserStore.getState();
    const {
      handleIfConversationExists,
      handleAddJarvisUserMessage,
      handleAddJarvisAssistantMessage,
    } = useConversationStore.getState();

    let currentConversation = await handleIfConversationExists();
    if (message.trim() !== "" && currentConversation) {
      inputRef.current.focus();
      handleAddJarvisUserMessage(message);
      set({
        isWaiting: true,
        isServerError: false,
        userInput: "",
      });
      try {
        const response = await fetch(
          `https://etech7-wf-etech7-clu-service.azuremicroservices.io/jarvisITAgentFacade`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              text: message,
              conversationId: currentConversation.id,
              userId: userStore.user.id,
            }),
          }
        );

        if (response.status === 200) {
          const responseBody = await response.json();
          messageIdRef.current = responseBody.id;
          handleAddJarvisAssistantMessage(responseBody.message, null);
        }
      } catch (e) {
        console.log(e);
      } finally {
        set({
          isWaiting: false,
        });
      }
    }
  },
}));

export default useInteractionStore;
