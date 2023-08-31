import { create } from "zustand";
import useUserStore from "../../user/userStore";
import useConversationStore from "../conversations/conversationsStore";
import useInteractionStore from "../interactionsStore";
import {
  handlegetTokenRemainingValidity,
  handleSendGmail,
} from "@/utils/api/google";
import { handleSendGraphMail } from "@/utils/api/microsoft";
import useTasksStore from "../../assistant/sections/tasks/taskStore";
import useTokenStore from "../token/tokenStore";
import Cookies from "js-cookie";

const useFormsStore = create((set, get) => ({
  isFormOpen: {},
  isServerError: false,
  previousResponseBodyForForms: {},
  loading: {
    contactForm: false,
    emailForm: false,
    eventForm: false,
    ticketForm: false,
    taskForm: false,
  },
  email: {
    selectedEmailIndex: null,
    currentEmailId: "",
    currentEmailSubject: "",
    currentEmailBody: "",
    availableEmailIds: [],
  },
  contact: {
    currentContactGivenName: "",
    currentContactFamilyName: "",
    currentContactEmailIds: [],
    currentContactMobileNumber: "",
    showCancelButton: false,
  },
  ticket: {
    currentTicketTitle: "",
    currentTicketDescription: "",
    currentTicketSummary: "",
    currentTicketCategory: "",
    currentTicketSubCategory: "",
    currentTicketPriority: "",
    currentTicketName: "",
    currentTicketEmailId: "",
    currentTicketPhoneNumber: "",
    onBoarding: {
      currentTicketNewFirstName: "",
      currentTicketNewLastName: "",
      currentTicketNewEmailId: "",
      currentTicketEmailOwner: "",
      currentTicketNewPhoneNumber: "",
      currentTicketLicenseId: "",
    },
  },
  ticketStatus: {
    ticketCreated: undefined,
    ticketAssigned: undefined,
    ticketClosed: undefined,
    userCreatedInActiveDirectory: undefined,
    userEmailCreated: undefined,
  },

  filteredSubCategories: [],

  event: {
    currentEventSummary: "",
    currentEventDescription: "",
    currentEventStartTime: "",
    currentEventEndTime: "",
  },
  task: {
    currentTaskName: "",
  },

  setEmail: (fieldName, value) =>
    set((state) => ({
      email: {
        ...state.email,
        [fieldName]: value,
      },
    })),
  setContact: (fieldName, value) =>
    set((state) => ({
      contact: {
        ...state.contact,
        [fieldName]: value,
      },
    })),
  setEvent: (fieldName, value) =>
    set((state) => ({
      event: {
        ...state.event,
        [fieldName]: value,
      },
    })),

  setTicket: (fieldName, value) => {
    set((state) => {
      if (fieldName.startsWith("onBoarding.")) {
        const nestedFieldName = fieldName.split(".")[1];
        return {
          ...state,
          ticket: {
            ...state.ticket,
            onBoarding: {
              ...state.ticket.onBoarding,
              [nestedFieldName]: value,
            },
          },
        };
      }
      return {
        ...state,
        ticket: {
          ...state.ticket,
          [fieldName]: value,
        },
      };
    });
  },

  setFilteredSubCategories: (filtered) =>
    set((state) => ({ ...state, filteredSubCategories: filtered })),

  setTask: (fieldName, value) =>
    set((state) => ({
      task: {
        ...state.task,
        [fieldName]: value,
      },
    })),

  handleEmailProcess: (mailEntities) => {
    const { handleAddForm } = useConversationStore.getState();
    let conversationId;
    const { mailID, subject, body, emailIDs } = mailEntities;
    const [contactGivenName, contactSurname] =
      mailEntities.personName.split(" ");
    if (emailIDs && emailIDs.length !== 0) {
      conversationId = handleAddForm("emailButtons + emailForm");
      set((state) => ({
        email: {
          ...state.email,
          currentEmailSubject: subject,
          currentEmailBody: body,
          availableEmailIds: emailIDs,
        },
      }));
    } else {
      conversationId = handleAddForm("contactForm + emailForm");
      set((state) => ({
        email: {
          ...state.email,
          currentEmailId: mailID,
          currentEmailSubject: subject,
          currentEmailBody: body,
        },
        contact: {
          ...state.contact,
          currentContactEmailIds: [mailID],
          currentContactGivenName: contactGivenName,
          currentContactFamilyName: contactSurname || "",
          showCancelButton: false,
        },
      }));
    }
    set((state) => ({
      isFormOpen: {
        ...state.isFormOpen,
        [conversationId]: true,
      },
    }));
  },

  handleScheduleProcess: (message) => {
    const { handleAddForm } = useConversationStore.getState();
    let conversationId;

    const { summary, description, start, end } = message;
    conversationId = handleAddForm("eventForm");

    set((state) => ({
      event: {
        ...state.event,
        currentEventSummary: summary,
        currentEventDescription: description,
        currentEventStartTime: start.slice(0, -3),
        currentEventEndTime: end.slice(0, -3),
      },
      isFormOpen: {
        ...state.isFormOpen,
        [conversationId]: true,
      },
    }));
  },
  handleCreateTicketProcess: (message) => {
    const { handleAddForm } = useConversationStore.getState();
    let conversationId;
    const {
      title,
      description,
      summary,
      category,
      subcategory,
      priorityLevel,
      name,
      emailID,
      phoneNumber,
    } = message;

    conversationId = handleAddForm("ticketForm");

    set((state) => ({
      ticket: {
        ...state.ticket,
        currentTicketTitle: title,
        currentTicketDescription: description,
        currentTicketSummary: summary,
        currentTicketCategory: category,
        currentTicketSubCategory: subcategory,
        currentTicketPriority: priorityLevel,
        currentTicketName: name,
        currentTicketEmailId: emailID,
        currentTicketPhoneNumber: phoneNumber,
      },
      isFormOpen: {
        ...state.isFormOpen,
        [conversationId]: true,
      },
    }));

    if (
      category === "TRAINING_OR_ONBOARDING" &&
      subcategory === "NEW_EMPLOYEE_ONBOARDING"
    ) {
      set((state) => ({
        ...state,
        ticketStatus: {
          ticketCreated: "pending",
          ticketAssigned: "pending",
          ticketClosed: "pending",
          userCreatedInActiveDirectory: "pending",
          userEmailCreated: "pending",
        },
      }));
    } else {
      set((state) => ({
        ...state,
        ticketStatus: {
          ticketCreated: "pending",
          ticketAssigned: "pending",
          ticketClosed: "pending",
        },
      }));
    }
  },

  handleAddContactProcess: (message) => {
    const { handleAddForm } = useConversationStore.getState();
    let conversationId;

    const { givenName, familyName, emailAddresses, mobileNumber } = message;
    conversationId = handleAddForm("contactForm");

    set((state) => ({
      contact: {
        ...state.contact,
        currentContactGivenName: givenName,
        currentContactFamilyName: familyName,
        currentContactEmailIds: emailAddresses,
        currentContactMobileNumber: mobileNumber,
        showCancelButton: true,
      },
      isFormOpen: {
        ...state.isFormOpen,
        [conversationId]: true,
      },
    }));
  },

  handleCreateTasksProcess: (message) => {
    const { handleAddForm } = useConversationStore.getState();
    let conversationId;
    conversationId = handleAddForm("taskForm");
    set((state) => ({
      task: {
        ...state.task,
        currentTaskName: message,
      },
      isFormOpen: {
        ...state.isFormOpen,
        [conversationId]: true,
      },
    }));
  },

  handleEmailSelection: (email, emailIndex) => {
    set((state) => ({
      email: {
        ...state.email,
        selectedEmailIndex: emailIndex,
        currentEmailId: email,
      },
    }));
  },
  handleEmailConfirmation: async (isConfirmed, formId) => {
    const { currentEmailId, currentEmailSubject, currentEmailBody } =
      get().email;
    const { token } = useTokenStore.getState();
    const userStore = useUserStore.getState();
    const {
      handleGetConversationId,
      handleRemoveForm,
      handleAddAssistantMessage,
    } = useConversationStore.getState();
    const { handleAddMessageToDB } = useInteractionStore.getState();

    const previousResponseBodyForConversation = handleGetConversationId();
    if (isConfirmed) {
      set((state) => ({
        loading: {
          ...state.loading,
          emailForm: true,
        },
      }));
      try {
        const remainingValidity = handlegetTokenRemainingValidity(
          userStore.user.expiryTime
        );
        const aiContent = `Email Sent!\n\nTo: ${currentEmailId}\n\nSubject: ${currentEmailSubject}\n\nBody: ${currentEmailBody}`;
        const formSummaryResponse = await handleAddMessageToDB(
          aiContent,
          previousResponseBodyForConversation
        );
        if (formSummaryResponse.status === 200) {
          let providerResponse;
          let tokenToSend = userStore.user.accessToken;
          if (Cookies.get("Secure-next.session-token-g")) {
            if (remainingValidity <= 60) {
              const newTokenResponse = await fetch(
                `https://etech7-wf-etech7-db-service.azuremicroservices.io/getGoogleRefreshToken?userId=${userStore.user.id}`
              );
              const newToken = await newTokenResponse.json();
              tokenToSend = newToken.access_token;
            }
            providerResponse = await handleSendGmail(
              tokenToSend,
              currentEmailId,
              currentEmailSubject,
              currentEmailBody
            );
          } else if (Cookies.get("microsoft_session_token")) {
            providerResponse = await handleSendGraphMail(
              token,
              currentEmailId,
              currentEmailSubject,
              currentEmailBody
            );
          } else {
            console.log("Activate provider in settings.");
          }
          if (
            providerResponse.status === 200 ||
            providerResponse.status === 202
          ) {
            handleAddAssistantMessage(aiContent, "emailForm");
          } else {
            set({ isServerError: true });
          }
        }
      } catch (e) {
        console.log(e);
      } finally {
        set((prevState) => ({
          loading: {
            ...prevState.loading,
            emailForm: false,
          },
          isFormOpen: {
            ...prevState.isFormOpen,
            [previousResponseBodyForConversation.conversationId]: false,
          },
        }));

        handleRemoveForm(formId);
      }
    } else {
      const aiContent = `Email Cancelled.`;
      await handleAddMessageToDB(
        aiContent,
        previousResponseBodyForConversation
      );
      set((prevState) => ({
        isFormOpen: {
          ...prevState.isFormOpen,
          [previousResponseBodyForConversation.conversationId]: false,
        },
      }));

      handleAddAssistantMessage(aiContent, "emailForm");
      handleRemoveForm(formId);
    }
  },

  handleContactConfirmation: async (isConfirmed, formId) => {
    const {
      currentContactGivenName,
      currentContactFamilyName,
      currentContactEmailIds,
      currentContactMobileNumber,
    } = get().contact;
    const { currentEmailId } = get().email;
    const userStore = useUserStore.getState();
    const { token } = useTokenStore.getState();
    const {
      handleGetConversationId,
      handleRemoveForm,
      handleAddAssistantMessage,
    } = useConversationStore.getState();
    const { handleAddMessageToDB } = useInteractionStore.getState();
    const previousResponseBodyForConversation = handleGetConversationId();

    if (isConfirmed) {
      set((state) => ({
        loading: {
          ...state.loading,
          contactForm: true,
        },
      }));
      try {
        const remainingValidity = handlegetTokenRemainingValidity(
          userStore.user.expiryTime
        );
        const aiContent = `Contact Added!\n\nName: ${currentContactGivenName} ${currentContactFamilyName}\n\nEmail: ${
          currentContactEmailIds[0] || currentEmailId
        }\n\nMobile Number: ${currentContactMobileNumber}`;
        const formSummaryResponse = await handleAddMessageToDB(
          aiContent,
          previousResponseBodyForConversation
        );

        if (formSummaryResponse.status === 200) {
          let providerResponse;
          let tokenToSend = userStore.user.accessToken;
          if (Cookies.get("Secure-next.session-token-g")) {
            if (remainingValidity <= 60) {
              const newTokenResponse = await fetch(
                `https://etech7-wf-etech7-db-service.azuremicroservices.io/getGoogleRefreshToken?userId=${userStore.user.id}`
              );
              const newToken = await newTokenResponse.json();
              tokenToSend = newToken.access_token;
            }
            providerResponse = await fetch(
              `https://etech7-wf-etech7-user-service.azuremicroservices.io/addGContacts?token=${tokenToSend}`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  givenName: currentContactGivenName,
                  familyName: currentContactFamilyName,
                  emailAddresses: currentContactEmailIds[0]
                    ? currentContactEmailIds
                    : [currentEmailId],
                  mobileNumber: currentContactMobileNumber,
                }),
              }
            );
          } else if (Cookies.get("microsoft_session_token")) {
            providerResponse = await fetch(
              `https://etech7-wf-etech7-user-service.azuremicroservices.io/addMContacts?token=${token}`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  givenName: currentContactGivenName,
                  familyName: currentContactFamilyName,
                  emailAddresses: currentContactEmailIds[0]
                    ? currentContactEmailIds
                    : [currentEmailId],
                  mobileNumber: currentContactMobileNumber,
                }),
              }
            );
          } else {
            console.log("Activate provider in settings.");
          }

          if (
            providerResponse.status === 200 ||
            providerResponse.status === 202
          ) {
            handleAddAssistantMessage(aiContent, "contactForm");
          } else {
            set({ isServerError: true });
          }
        }
      } catch (e) {
        console.log(e);
      } finally {
        set((prevState) => ({
          loading: {
            ...prevState.loading,
            contactForm: false,
          },
          isFormOpen: {
            ...prevState.isFormOpen,
            [previousResponseBodyForConversation.conversationId]: false,
          },
        }));
        handleRemoveForm(formId);
      }
    } else {
      const aiContent = "Contact Adding Cancelled";
      await handleAddMessageToDB(
        aiContent,
        previousResponseBodyForConversation
      );
      set((prevState) => ({
        isFormOpen: {
          ...prevState.isFormOpen,
          [previousResponseBodyForConversation.conversationId]: false,
        },
      }));

      handleAddAssistantMessage(aiContent, "contactForm");
      handleRemoveForm(formId);
    }
  },
  handleScheduleConfirmation: async (isConfirmed, formId) => {
    const userStore = useUserStore.getState();
    const {
      currentEventSummary,
      currentEventDescription,
      currentEventStartTime,
      currentEventEndTime,
    } = get().event;
    const {
      handleGetConversationId,
      handleRemoveForm,
      handleAddAssistantMessage,
    } = useConversationStore.getState();
    const { handleAddMessageToDB } = useInteractionStore.getState();
    const previousResponseBodyForConversation = handleGetConversationId();

    if (isConfirmed) {
      set((state) => ({
        loading: {
          ...state.loading,
          eventForm: true,
        },
      }));
      try {
        const remainingValidity = handlegetTokenRemainingValidity(
          userStore.user.expiryTime
        );
        const aiContent = `Event Scheduled!\n\nSummary: ${currentEventSummary}\n\nDescription: ${currentEventDescription}\n\nStart Time: ${new Date(
          currentEventStartTime
        ).toLocaleString()}\n\nEnd Time: ${new Date(
          currentEventEndTime
        ).toLocaleString()}`;
        const formSummaryResponse = await handleAddMessageToDB(
          aiContent,
          previousResponseBodyForConversation
        );
        if (formSummaryResponse.status === 200) {
          let providerResponse;
          let tokenToSend = userStore.user.accessToken;
          if (Cookies.get("Secure-next.session-token-g")) {
            if (remainingValidity <= 60) {
              const newTokenResponse = await fetch(
                `https://etech7-wf-etech7-db-service.azuremicroservices.io/getGoogleRefreshToken?userId=${userStore.user.id}`
              );
              const newToken = await newTokenResponse.json();
              tokenToSend = newToken.access_token;
            }
            providerResponse = await fetch(
              `https://etech7-wf-etech7-user-service.azuremicroservices.io/addGEvents?token=${tokenToSend}`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  summary: currentEventSummary,
                  description: currentEventDescription,
                  start: currentEventStartTime + ":00",
                  end: currentEventEndTime + ":00",
                }),
              }
            );
          } else if (Cookies.get("microsoft_session_token")) {
            providerResponse = await fetch(
              `https://etech7-wf-etech7-user-service.azuremicroservices.io/addMEvents?token=${token}`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  ummary: currentEventSummary,
                  description: currentEventDescription,
                  start: currentEventStartTime + ":00",
                  end: currentEventEndTime + ":00",
                }),
              }
            );
          } else {
            console.log("Activate provider in settings.");
          }

          if (
            providerResponse.status === 200 ||
            providerResponse.status === 202
          ) {
            handleAddAssistantMessage(aiContent, "eventForm");
          } else {
            set({ isServerError: true });
          }
        }
      } catch (e) {
        console.log(e);
      } finally {
        set((prevState) => ({
          loading: {
            ...prevState.loading,
            eventForm: false,
          },
          isFormOpen: {
            ...prevState.isFormOpen,
            [previousResponseBodyForConversation.conversationId]: false,
          },
        }));
        handleRemoveForm(formId);
      }
    } else {
      const aiContent = "Scheduling Cancelled.";
      await handleAddMessageToDB(
        aiContent,
        previousResponseBodyForConversation
      );
      set((prevState) => ({
        isFormOpen: {
          ...prevState.isFormOpen,
          [previousResponseBodyForConversation.conversationId]: false,
        },
      }));
      handleAddAssistantMessage(aiContent, "eventForm");
      handleRemoveForm(formId);
    }
  },
  handleTicketConfirmation: async (isConfirmed, formId) => {
    const {
      currentTicketTitle,
      currentTicketDescription,
      currentTicketSummary,
      currentTicketCategory,
      currentTicketSubCategory,
      currentTicketPriority,
      currentTicketName,
      currentTicketEmailId,
      currentTicketPhoneNumber,
    } = get().ticket;
    const {
      currentTicketNewFirstName,
      currentTicketNewLastName,
      currentTicketNewEmailId,
      currentTicketEmailOwner,
      currentTicketNewPhoneNumber,
      currentTicketLicenseId,
    } = get().ticket.onBoarding;
    const {
      handleGetConversationId,
      handleRemoveForm,
      handleAddAssistantMessage,
    } = useConversationStore.getState();
    const { handleAddMessageToDB } = useInteractionStore.getState();
    const previousResponseBodyForConversation = handleGetConversationId();

    if (isConfirmed) {
      set((state) => ({
        loading: {
          ...state.loading,
          ticketForm: true,
        },
      }));
      try {
        const ticketResponse = await fetch(
          `https://etech7-wf-etech7-support-service.azuremicroservices.io/createTicket`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              title: currentTicketTitle,
              description: currentTicketDescription,
              summary: currentTicketSummary,
              category: currentTicketCategory,
              subcategory: currentTicketSubCategory,
              priorityLevel: currentTicketPriority,
              name: currentTicketName,
              emailID: currentTicketEmailId,
              phoneNumber: currentTicketPhoneNumber,
            }),
          }
        );
        if (ticketResponse.status === 200) {
          const ticket = await ticketResponse.json();
          const {
            ticketCreated,
            ticketAssigned,
            ticketClosed,
            ticketDetails: { id },
          } = ticket;
          set((prevState) => ({
            ...prevState,
            ticketStatus: {
              ...prevState.ticketStatus,
              ticketCreated: ticketCreated && "done",
              ticketAssigned: ticketAssigned ? "done" : "pending",
              ticketClosed: ticketClosed ? "done" : "waiting",
            },
          }));

          if (
            currentTicketCategory === "TRAINING_OR_ONBOARDING" &&
            currentTicketSubCategory === "NEW_EMPLOYEE_ONBOARDING"
          ) {
            const ticketOnboardingResponse = await fetch(
              `https://etech7-wf-etech7-support-service.azuremicroservices.io/onboardUser`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  ticketId: id,
                  firstName: currentTicketNewFirstName,
                  lastName: currentTicketNewLastName,
                  emailId: currentTicketNewEmailId,
                  emailTicketOwner: currentTicketEmailOwner,
                  phoneNumber: currentTicketNewPhoneNumber,
                  licenseId: currentTicketLicenseId,
                }),
              }
            );

            if (ticketOnboardingResponse.status === 200) {
              const ticketOnBoarding = await ticketOnboardingResponse.json();
              const {
                userCreatedInActiveDirectory,
                userEmailCreated,
                ticketClosed,
              } = ticketOnBoarding;
              set((prevState) => ({
                ...prevState,
                ticketStatus: {
                  ...prevState.ticketStatus,
                  userCreatedInActiveDirectory: userCreatedInActiveDirectory
                    ? "done"
                    : "pending",
                  userEmailCreated: userEmailCreated ? "done" : "pending",
                  ticketClosed: ticketClosed ? "done" : "pending",
                },
              }));
            }
          }

          const aiContent = `Ticket Created!\n\nID: ${id}\n\nTitle: ${currentTicketTitle}\n\nDescription: ${currentTicketDescription}\n\nSummary: ${currentTicketSummary}\n\nCategory: ${currentTicketCategory}\n\nSubcategory: ${currentTicketSubCategory}\n\nPriority: ${currentTicketPriority}\n\nName: ${currentTicketName}\n\nEmail: ${currentTicketEmailId}\n\nPhone: ${currentTicketPhoneNumber}.`;
          const formSummaryResponse = await handleAddMessageToDB(
            aiContent,
            previousResponseBodyForConversation
          );
          if (formSummaryResponse.status === 200) {
            handleAddAssistantMessage(aiContent, "ticketForm");
          }
        }
      } catch (e) {
        console.log(e);
      } finally {
        set((prevState) => ({
          loading: {
            ...prevState.loading,
            ticketForm: false,
          },
          isFormOpen: {
            ...prevState.isFormOpen,
            [previousResponseBodyForConversation.conversationId]: false,
          },
        }));
        handleRemoveForm(formId);
      }
    } else {
      const aiContent = "Ticket Creation Cancelled.";
      await handleAddMessageToDB(
        aiContent,
        previousResponseBodyForConversation
      );
      set((prevState) => ({
        ...prevState,
        ticketStatus: {
          ticketCreated: undefined,
          ticketAssigned: undefined,
          ticketClosed: undefined,
          userCreatedInActiveDirectory: undefined,
          userEmailCreated: undefined,
        },
      }));
      set((prevState) => ({
        isFormOpen: {
          ...prevState.isFormOpen,
          [previousResponseBodyForConversation.conversationId]: false,
        },
      }));

      handleAddAssistantMessage(aiContent, "ticketForm");
      handleRemoveForm(formId);
    }
  },
  handleTaskConfirmation: async (isConfirmed, formId) => {
    const userStore = useUserStore.getState();
    const { currentTaskName } = get().task;
    const { addTask } = useTasksStore.getState();
    const {
      handleGetConversationId,
      handleRemoveForm,
      handleAddAssistantMessage,
    } = useConversationStore.getState();
    const { handleAddMessageToDB } = useInteractionStore.getState();
    const previousResponseBodyForConversation = handleGetConversationId();

    if (isConfirmed) {
      set((state) => ({
        loading: {
          ...state.loading,
          taskForm: true,
        },
      }));
      try {
        const taskResponse = await fetch(
          `https://etech7-wf-etech7-db-service.azuremicroservices.io/addTask`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userID: userStore.user.id,
              taskName: currentTaskName,
            }),
          }
        );
        if (taskResponse.status === 200) {
          const task = await taskResponse.json();
          const aiContent = `Task Created!\n\nTask Name: ${currentTaskName}`;
          const formSummaryResponse = await handleAddMessageToDB(
            aiContent,
            previousResponseBodyForConversation
          );
          if (formSummaryResponse.status === 200) {
            handleAddAssistantMessage(aiContent, "taskForm");
            addTask(task);
          }
        }
      } catch (e) {
        console.log(e);
      } finally {
        set((prevState) => ({
          loading: {
            ...prevState.loading,
            taskForm: false,
          },
          isFormOpen: {
            ...prevState.isFormOpen,
            [previousResponseBodyForConversation.conversationId]: false,
          },
        }));
        handleRemoveForm(formId);
      }
    } else {
      const aiContent = "Task Creation Cancelled";
      await handleAddMessageToDB(
        aiContent,
        previousResponseBodyForConversation
      );
      set((prevState) => ({
        isFormOpen: {
          ...prevState.isFormOpen,
          [previousResponseBodyForConversation.conversationId]: false,
        },
      }));

      handleAddAssistantMessage(aiContent, "taskForm");
      handleRemoveForm(formId);
    }
  },
}));

export default useFormsStore;
