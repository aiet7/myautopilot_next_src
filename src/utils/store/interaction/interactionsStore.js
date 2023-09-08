import { create } from "zustand";
import useFormsStore from "./forms/formsStore";
import useUserStore from "../user/userStore";
import { trimQuotes } from "@/utils/stringManipulation";
import useConversationStore from "./conversations/conversationsStore";
import useTokenStore from "./token/tokenStore";
import useRefStore from "./ref/refStore";

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
      console.log(cleanedMessageId);
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

  handleAbortRequest: () => {
    const { controllerRef } = useRefStore.getState();
    const { handleAddAssistantMessage } = useConversationStore.getState();
    if (controllerRef.current) {
      controllerRef.current.abort();
      handleAddAssistantMessage(
        "Stopped generating.  Request may still be fullfilled."
      );
    }
  },

  handleImageGenerator: async (message) => {
    const { controllerRef, inputRef, messageIdRef } = useRefStore.getState();
    const userStore = useUserStore.getState();

    const { handleProcessResponse } = get();
    const { handleIfConversationExists, handleAddUserMessage } =
      useConversationStore.getState();
    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    controllerRef.current = new AbortController();

    let currentConversation = await handleIfConversationExists();

    if (message.trim() !== "") {
      inputRef.current.focus();
      handleAddUserMessage(message);
      set({
        userInput: "",
        isWaiting: true,
        isServerError: false,
      });

      try {
        const encodedMessage = encodeURIComponent(trimQuotes(message));
        const response = await fetch(
          `https://etech7-wf-etech7-worflow-2.azuremicroservices.io/image?message=${encodedMessage}&conversationId=${currentConversation.id}&userId=${userStore.user.id}`,
          {
            signal: controllerRef.current.signal,
          }
        );

        if (response.status === 200) {
          const responseBody = await response.json();
          messageIdRef.current = responseBody.id;
          handleProcessResponse(
            null,
            responseBody.intent,
            null,
            JSON.parse(responseBody.message),
            {
              ...responseBody,
              conversationId: currentConversation.id,
              userContent: message,
            }
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

  handleCreateTicketMessage: async (message) => {
    const { inputRef, messageIdRef } = useRefStore.getState();
    const userStore = useUserStore.getState();
    const { handleAddUserMessage } = useConversationStore.getState();
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
        const encodedMessage = encodeURIComponent(trimQuotes(message));
        const response = await fetch(
          `https://etech7-wf-etech7-support-service.azuremicroservices.io/ticketCategorize?text=${encodedMessage}&userId=${userStore.user.id}`
        );

        if (response.status === 200) {
          const responseBody = await response.json();
          messageIdRef.current = Date.now();
          handleCreateTicketProcess(
            responseBody.emailID,
            JSON.parse(responseBody.msg),
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

  handleSendUserMessage: async (message) => {
    const { controllerRef, inputRef, messageIdRef } = useRefStore.getState();

    const userStore = useUserStore.getState();
    const { handleProcessResponse } = get();
    const { handleIfConversationExists, handleAddUserMessage } =
      useConversationStore.getState();
    const { token } = useTokenStore.getState();
    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    controllerRef.current = new AbortController();

    let currentConversation = await handleIfConversationExists();
    if (message.trim() !== "") {
      inputRef.current.focus();

      handleAddUserMessage(message);
      set({
        isWaiting: true,
        isServerError: false,
        userInput: "",
      });

      try {
        const encodedMessage = encodeURIComponent(trimQuotes(message));
        const response = await fetch(
          `https://etech7-wf-etech7-clu-service.azuremicroservices.io/jarvis4?text=${encodedMessage}&conversationId=${
            currentConversation.id
          }&userId=${userStore.user.id}${token ? `&mToken=${token}` : ""}`,
          {
            signal: controllerRef.current.signal,
          }
        );

        if (response.status === 200) {
          const responseBody = await response.json();
          console.log(responseBody);
          messageIdRef.current = responseBody.id;
          useFormsStore.setState((prevState) => ({
            ...prevState,
            previousResponseBodyForForms: {
              ...prevState.previousResponseBodyForForms,
              [currentConversation.id]: {
                ...responseBody,
                conversationId: currentConversation.id,
                userContent: message,
              },
            },
          }));

          handleProcessResponse(
            responseBody.entities,
            responseBody.intent,
            responseBody.mailEntities,
            responseBody.message,
            {
              ...responseBody,
              conversationId: currentConversation.id,
              userContent: message,
            }
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

  handleAddMessageToDB: async (aiContent, body) => {
    try {
      const response = await fetch(
        `https://etech7-wf-etech7-db-service.azuremicroservices.io/addMessage`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: body.id,
            conversationID: body.conversationId,
            userContent: body.userContent,
            aiContent: aiContent,
            timeStamp: Date.now(),
            deleted: false,
            intents: body.intents,
            entities: body.entities,
          }),
        }
      );
      if (response.status === 200) {
        return response;
      }
    } catch (e) {
      console.log(e);
    }
  },

  // handleProcessResponse: (
  //   entities,
  //   intent,
  //   mailEntities,
  //   message,
  //   responseBody
  // ) => {
  //   const {
  //     handleEmailProcess,
  //     handleScheduleProcess,
  //     handleCreateTicketProcess,
  //     handleAddContactProcess,
  //     handleCreateTasksProcess,
  //   } = useFormsStore.getState();
  //   const {
  //     handleGetEventsProcess,
  //     handleGetTasksProcess,
  //     handleGetNewsProcess,
  //     handleGetStocksProcess,
  //     handleGetWeatherProcess,
  //     handleDefaultActionProcess,
  //   } = useMessagesStore.getState();
  //   switch (intent) {
  //     case "sendMail":
  //       handleEmailProcess(mailEntities);
  //       break;
  //     case "scheduleEvent":
  //       handleScheduleProcess(JSON.parse(message));
  //       break;
  //     case "createTicket":
  //       handleCreateTicketProcess(entities, JSON.parse(message));
  //       break;
  //     case "addContact":
  //       handleAddContactProcess(JSON.parse(message));
  //       break;
  //     case "createTask":
  //       handleCreateTasksProcess(JSON.parse(message));
  //       break;
  //     case "getTasks":
  //       handleGetTasksProcess(responseBody);
  //       break;
  //     case "getEvents":
  //       handleGetEventsProcess(responseBody);
  //       break;
  //     case "getNews":
  //       handleGetNewsProcess(JSON.parse(message), responseBody);
  //       break;
  //     case "getStocks":
  //       handleGetStocksProcess(JSON.parse(message), responseBody);
  //       break;
  //     case "getWeather":
  //       handleGetWeatherProcess(JSON.parse(message), responseBody);
  //       break;
  //     default:
  //       handleDefaultActionProcess(message, responseBody);
  //       break;
  //   }
  // },
}));

export default useInteractionStore;
