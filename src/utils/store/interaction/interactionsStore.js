import { create } from "zustand";
import useFormsStore from "./forms/formsStore";
import useConversationStore from "./conversations/conversationsStore";
import useRefStore from "./ref/refStore";
import useDocConversationsStore from "./conversations/docConversationsStore";
import useTicketConversationsStore from "./conversations/ticketConversationsStore";
import useUserStore from "../user/userStore";
import useMspStore from "../auth/msp/mspStore";
import useTicketsStore from "./tickets/ticketsStore";
import useQueueStore from "./queue/queueStore";

const dbServiceUrl = process.env.NEXT_PUBLIC_DB_SERVICE_URL;
const connectWiseServiceUrl = process.env.NEXT_PUBLIC_CONNECTWISE_SERVICE_URL;
const gptServiceUrl = process.env.NEXT_PUBLIC_GPT_SERVICE_URL;

const useInteractionStore = create((set, get) => ({
  diagnosticTicketMessage: "",
  diagnosticChatMessage: "",
  isDiagnosticTicketStep: true,

  userTicketButtonsSelected: {},
  userChatButtonsSelected: {},
  diagnosticTicketQuestions: [],
  diagnosticChatQuestions: [],
  userInput: "",
  isWaiting: false,
  isListening: false,
  isServerError: false,
  isFeedbackSubmitted: false,
  isAtBottom: false,
  isOverflowed: false,
  feedback: {},
  textAreaheight: "24px",
  interactionMenuOpen: false,

  previousButtonsId: null,

  setInteractionMenuOpen: (open) => set({ interactionMenuOpen: open }),

  setUserTicketButtonsSelected: (question, option) =>
    set((state) => {
      const questionExists = state.diagnosticTicketMessage.includes(
        `${question}: ${option}`
      );
      const newUserInput = questionExists
        ? state.userInput
        : `${state.userInput}\n${question}: ${option}`;

      const newDiagnosticTicketMessage = questionExists
        ? state.diagnosticTicketMessage
        : `${state.diagnosticTicketMessage}\n${question}: ${option}`;

      return {
        userTicketButtonsSelected: {
          ...state.userTicketButtonsSelected,
          [question]: option,
        },
        userInput: newUserInput,
        diagnosticTicketMessage: newDiagnosticTicketMessage,
      };
    }),

  setUserChatButtonsSelected: (question, option) =>
    set((state) => {
      const questionExists = state.diagnosticChatMessage.includes(
        `${question}: ${option}`
      );

      const newDiagnosticChatMessage = questionExists
        ? state.diagnosticChatMessage
        : `${state.diagnosticChatMessage}\n${question}: ${option}`;

      const newUserInput = questionExists
        ? state.userInput
        : `${state.userInput}\n${question}: ${option}`;

      return {
        userChatButtonsSelected: {
          ...state.userChatButtonsSelected,
          [question]: option,
        },
        diagnosticChatMessage: newDiagnosticChatMessage.trim(),
        userInput: newUserInput.trim(),
      };
    }),

  setResetTicketFlow: () =>
    set({
      isDiagnosticTicketStep: true,
      diagnosticTicketMessage: "",
      userTicketButtonsSelected: {},
    }),

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
    const userStore = useUserStore.getState();
    const { isDiagnosticTicketStep, diagnosticTicketMessage } =
      useInteractionStore.getState();

    const { inputRef } = useRefStore.getState();
    const { handleAddUserMessage, handleAddAssistantMessage } =
      useTicketConversationsStore.getState();
    const { setActiveTicketBotMode } = useTicketsStore.getState();
    const { handleCreateTicketProcess } = useFormsStore.getState();

    if (message.trim() !== "") {
      inputRef.current.focus();
      handleAddUserMessage(message);
      set({ isWaiting: true, isServerError: false, userInput: "" });

      try {
        let endpointUrl = `${connectWiseServiceUrl}/getTicketBoardCategorizationDiagnosticQandA`;
        let userMessage = message;

        if (!isDiagnosticTicketStep) {
          endpointUrl = `${connectWiseServiceUrl}/getTicketBoardCategorization`;
          userMessage = `${diagnosticTicketMessage}\n${message}`;
        }

        const response = await fetch(endpointUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userMessage: userMessage,
            userId: userStore.user.id,
            mspCustomDomain: userStore.user.mspCustomDomain,
          }),
        });
        if (response.status === 200) {
          const responseBody = await response.json();
          handleCreateTicketProcess(responseBody);
          setActiveTicketBotMode("Ticket");
          if (isDiagnosticTicketStep) {
            handleAddAssistantMessage(null, true);
            set((state) => ({
              diagnosticTicketQuestions: responseBody.diagnostic,
              isDiagnosticTicketStep: false,
              diagnosticTicketMessage: `${state.diagnosticTicketMessage}\n${message}`,
            }));
          } else {
            handleAddAssistantMessage(
              "Ticket Details Are Displayed On The Right Panel.",
              false
            );
            set({
              isDiagnosticTicketStep: true,
            });
          }
        } else if (response.status === 500) {
          set({ isServerError: true });
        }
      } catch (e) {
        console.error(e);
      } finally {
        set({ isWaiting: false });
      }
    }
  },

  handleCreateTicketNote: async (ticketId, message) => {
    const userStore = useUserStore.getState();
    const { userType } = useMspStore.getState();
    const { handleGetTicketNotes } = useTicketsStore.getState();

    if (message.trim() !== "") {
      set({ isWaiting: true, isServerError: false, userInput: "" });
      const encodedDomain = encodeURIComponent(userStore.user.mspCustomDomain);
      const encodedTicketId = encodeURIComponent(ticketId);

      let formattedPrepend;
      if (userType === "client") {
        formattedPrepend = `User: (${
          userStore.user.firstName + " " + userStore.user.lastName
        } + ${userStore.user.email}): ${message}`;
      } else if (userType === "tech") {
        formattedPrepend = `Technician: (${userStore.user.id}): ${message}`;
      }

      try {
        const response = await fetch(
          `${connectWiseServiceUrl}/addNoteToTicket?mspCustomDomain=${encodedDomain}&ticketId=${encodedTicketId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              info: formattedPrepend,
              text: message,
            }),
          }
        );

        if (response.status === 200) {
          await handleGetTicketNotes(ticketId);
        }
      } catch (e) {
        console.log(e);
      } finally {
        set({ isWaiting: false });
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

    const { userChatButtonsSelected, userInput } = get();

    let currentConversation = await handleIfConversationExists();
    if (
      (message.trim() !== "" ||
        Object.keys(userChatButtonsSelected).length > 0) &&
      currentConversation
    ) {
      inputRef.current.focus();

      const messageToSend = message.trim() !== "" ? message : userInput;
      console.log(messageToSend);
      handleAddJarvisUserMessage(messageToSend);

      set({
        isWaiting: true,
        isServerError: false,
        userInput: "", 
      });

      try {
        const userMessage = messageToSend.trim();

        const response = await fetch(`${gptServiceUrl}/jarvisQandA`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: userMessage,
            conversationId: currentConversation.id,
            technicianId: userStore.user.id,
          }),
        });

        if (response.status === 200) {
          const responseBody = await response.json();
          let parsedAiContent = JSON.parse(responseBody.content);

          messageIdRef.current = responseBody.messages.id;

          if (parsedAiContent && parsedAiContent.interactiveElements) {
            handleAddJarvisAssistantMessage(
              parsedAiContent.explanation,
              parsedAiContent.interactiveElements
            );

            set({
              previousButtonsId: `${messageIdRef.current}-ai`,
            });
          } else {
            handleAddJarvisAssistantMessage(responseBody.aiContent, null);
          }
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

  // handleSendMessage: async (message) => {
  //   const { inputRef, messageIdRef } = useRefStore.getState();
  //   const userStore = useUserStore.getState();
  //   const {
  //     handleIfConversationExists,
  //     handleAddJarvisUserMessage,
  //     handleAddJarvisAssistantMessage,
  //   } = useConversationStore.getState();

  //   let currentConversation = await handleIfConversationExists();
  //   if (message.trim() !== "" && currentConversation) {
  //     inputRef.current.focus();
  //     handleAddJarvisUserMessage(message);
  //     set({
  //       isWaiting: true,
  //       isServerError: false,
  //       userInput: "",
  //     });
  //     try {
  //       const response = await fetch(`${gptServiceUrl}/jarvis`, {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           text: message,
  //           conversationId: currentConversation.id,
  //           technicianId: userStore.user.id,
  //         }),
  //       });

  //       if (response.status === 200) {
  //         const responseBody = await response.json();

  //         messageIdRef.current = responseBody.id;
  //         handleAddJarvisAssistantMessage(responseBody.aiContent, false);
  //       }
  //     } catch (e) {
  //       console.log(e);
  //     } finally {
  //       set({
  //         isWaiting: false,
  //       });
  //     }
  //   }
  // },

  handleSendTroubleshootMessage: async (message) => {
    const { inputRef, messageIdRef } = useRefStore.getState();
    const userStore = useUserStore.getState();
    const { handleIfConversationExists } = useConversationStore.getState();

    let currentConversation = await handleIfConversationExists(false, false);
    const {
      handleAddUserTroubleshootMessage,
      handleAddAssistantTroubleshootMessage,
    } = useQueueStore.getState();

    if (message.trim() !== "" && currentConversation) {
      inputRef.current.focus();
      handleAddUserTroubleshootMessage(message);

      set({
        isWaiting: true,
        isServerError: false,
        userInput: "",
      });

      try {
        const response = await fetch(`${gptServiceUrl}/jarvis`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: message,
            conversationId: currentConversation.id,
            technicianId: userStore.user.id,
          }),
        });

        if (response.status === 200) {
          const responseBody = await response.json();
          messageIdRef.current = responseBody.id;

          handleAddAssistantTroubleshootMessage(responseBody.aiContent);
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

  clearInteraction: () => {
    set({
      diagnosticTicketMessage: "",
      diagnosticChatMessage: "",
      isDiagnosticTicketStep: true,

      userTicketButtonsSelected: {},
      userChatButtonsSelected: {},
      diagnosticTicketQuestions: [],
      diagnosticChatQuestions: [],
      userInput: "",
      isWaiting: false,
      isListening: false,
      isServerError: false,
      isFeedbackSubmitted: false,
      isAtBottom: false,
      isOverflowed: false,
      feedback: {},
      textAreaheight: "24px",
      interactionMenuOpen: false,

      previousButtonsId: null,
    });
  },
}));

export default useInteractionStore;
