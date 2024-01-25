import { create } from "zustand";
import useUserStore from "../../user/userStore";

import useTicketsStore from "../../interaction/tickets/ticketsStore";
import { validateTicketForm } from "@/utils/formValidations";
import useTicketConversationsStore from "../conversations/ticketConversationsStore";
import useTechStore from "../../user/techStore";

const useFormsStore = create((set, get) => ({
  isFormOpen: {},
  isServerError: false,
  previousResponseBodyForForms: {},
  formError: "",
  loading: {
    ticketForm: false,
  },

  ticket: {
    currentTicketTitle: "",
    currentTicketDescription: "",
    currentTicketCategory: "",
    currentTicketSubCategory: "",
    currentTicketPriority: "",
    currentTicketSeverity: "",
    currentTicketImpact: "",
    currentTicketTier: "",
    currentTicketName: "",
    currentTicketEmailId: "",
    currentTicketPhoneNumber: "",
    onBoarding: {
      currentTicketNewFirstName: "",
      currentTicketNewLastName: "",
      currentTicketNewEmailId: "",
      currentTicketEmailOwner: "",
      currentTicketNewPhoneNumber: "",
      currentTicketLicenseId: "E3",
    },
  },
  ticketStatus: {
    ticketId: undefined,
    ticketCreated: undefined,
    ticketAssigned: undefined,
    ticketClosed: undefined,
    userCreatedInActiveDirectory: undefined,
    userEmailCreated: undefined,
  },







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



  handleClearTicketProgress: () => {
    set((state) => ({
      ...state,
      ticketStatus: {
        id: undefined,
        ticketCreated: undefined,
        ticketAssigned: undefined,
        ticketClosed: undefined,
        userCreatedInActiveDirectory: undefined,
        userEmailCreated: undefined,
      },
    }));
  },



  handleCreateTicketProcess: (responseBody) => {
    const techStore = useTechStore.getState();
    const { handleAddForm } = useTicketConversationsStore.getState();
    const {
      title,
      description,
      priority,
      impact,
      severity,
      tier,
      categoryName,
      subCategoryName,
      emailId,
      name,
      phoneNumber
    } = responseBody;

    let newEmployeeFirstName = "";
    let newEmployeeLastName = "";

    if (name) {
      const names = name.split(" ");
      newEmployeeFirstName = names[0];
      newEmployeeLastName = names.length > 1 ? names[1] : "";
    }

    set((state) => ({
      ticket: {
        ...state.ticket,
        currentTicketTitle: title || "",
        currentTicketDescription: description || "",
        currentTicketCategory: categoryName || "",
        currentTicketSubCategory: subCategoryName || "",
        currentTicketPriority: priority || "",
        currentTicketImpact: impact || "",
        currentTicketSeverity: severity || "",
        currentTicketTier: tier || "",
        currentTicketName: techStore.tech.firstName + " " + techStore.tech.lastName || "",
        currentTicketEmailId: techStore.tech.email || "",
        currentTicketPhoneNumber: techStore.tech.phoneNumber || "",

        onBoarding: {
          ...state.ticket.onBoarding,
          currentTicketNewFirstName: newEmployeeFirstName,
          currentTicketNewLastName: newEmployeeLastName,
          currentTicketEmailOwner: techStore.tech.email || "",
          currentTicketNewPhoneNumber: phoneNumber || "",
          currentTicketNewEmailId: emailId || "",
        },
      },
      ticketStatus: {
        ...state.ticketStatus,
        ticketCreated: "pending",
        ticketAssigned: "pending",
        ticketClosed: "pending",
        userCreatedInActiveDirectory: categoryName === "TRAINING_OR_ONBOARDING" && subCategoryName === "NEW_EMPLOYEE_ONBOARDING" ? "pending" : undefined,
        userEmailCreated: categoryName === "TRAINING_OR_ONBOARDING" && subCategoryName === "NEW_EMPLOYEE_ONBOARDING" ? "pending" : undefined,
      },
    }));

    handleAddForm("ticketForm");
  },


  handleTicketConfirmation: async (isConfirmed, formId) => {
    const { ticket } = get();
    const techStore = useTechStore.getState();
    const { addTicket } = useTicketsStore.getState();
    const {
      currentTicketTitle,
      currentTicketDescription,
      currentTicketCategory,
      currentTicketSubCategory,
      currentTicketPriority,
      currentTicketImpact,
      currentTicketSeverity,
      currentTicketTier,
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
    const { handleRemoveForm, handleAddAssistantMessage } =
      useTicketConversationsStore.getState();

    if (isConfirmed) {
      if (!validateTicketForm(ticket)) {
        set({ formError: "Form inputs can not be empty." });
        return;
      }
      set((state) => ({
        loading: {
          ...state.loading,
          ticketForm: true,
        },
      }));
      try {
        const encodedDomain = encodeURIComponent(techStore.tech.mspCustomDomain)
        const encodedId = encodeURIComponent(techStore.tech.id)
        const ticketResponse = await fetch(
          `http://localhost:9020/createTicket?mspCustomDomain=${encodedDomain}&userId=${encodedId}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              title: currentTicketTitle,
              description: currentTicketDescription,
              categoryName: currentTicketCategory,
              subCategoryName: currentTicketSubCategory,
              priority: currentTicketPriority,
              impact: currentTicketImpact,
              severity: currentTicketSeverity,
              tier: currentTicketTier,
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

          } = ticket;
          set((state) => ({
            ...state,
            ticketStatus: {
              ...state.ticketStatus,

              ticketCreated: ticketCreated && "done",
              ticketAssigned: ticketAssigned ? "done" : "pending",
              ticketClosed: ticketClosed ? "done" : "waiting",
            },
          }));
          // if (
          //   currentTicketCategory === "TRAINING_OR_ONBOARDING" &&
          //   currentTicketSubCategory === "NEW_EMPLOYEE_ONBOARDING"
          // ) {
          //   const ticketOnboardingResponse = await fetch(
          //     `https://etech7-wf-etech7-support-service.azuremicroservices.io/onboardUser`,
          //     {
          //       method: "POST",
          //       headers: { "Content-Type": "application/json" },
          //       body: JSON.stringify({
          //         ticketId: id,
          //         firstName: currentTicketNewFirstName,
          //         lastName: currentTicketNewLastName,
          //         emailId: currentTicketNewEmailId,
          //         emailTicketOwner: currentTicketEmailOwner,
          //         phoneNumber: currentTicketNewPhoneNumber,
          //         licenseId: currentTicketLicenseId,
          //       }),
          //     }
          //   );
          //   if (ticketOnboardingResponse.status === 200) {
          //     const ticketOnBoarding = await ticketOnboardingResponse.json();
          //     const {
          //       userCreatedInActiveDirectory,
          //       userEmailCreated,
          //       ticketClosed,
          //     } = ticketOnBoarding;
          //     set((state) => ({
          //       ...state,
          //       ticketStatus: {
          //         ...state.ticketStatus,
          //         userCreatedInActiveDirectory: userCreatedInActiveDirectory
          //           ? "done"
          //           : "pending",
          //         userEmailCreated: userEmailCreated ? "done" : "pending",
          //         ticketClosed: ticketClosed ? "done" : "pending",
          //       },
          //     }));
          //   }
          // }
          const aiContent = `Ticket Created!\n\nTitle: ${currentTicketTitle}\n\nDescription: ${currentTicketDescription}\n\nCategory: ${currentTicketCategory}\n\nSubcategory: ${currentTicketSubCategory}\n\nPriority: ${currentTicketPriority}\n\nName: ${currentTicketName}\n\nEmail: ${currentTicketEmailId}\n\nPhone: ${currentTicketPhoneNumber}.`;
          handleAddAssistantMessage(aiContent, "ticketForm");
          addTicket({
            description: currentTicketDescription,
            category: currentTicketCategory,
            subcategory: currentTicketSubCategory,
            closed: false,
            timeStamp: Date.now(),
          });
        }
      } catch (e) {
        console.log(e);
      } finally {
        set((state) => ({
          loading: {
            ...state.loading,
            ticketForm: false,
          },
          formError: "",
        }));
        handleRemoveForm(formId);
      }
    } else {
      const aiContent = "Ticket Creation Cancelled.";
      handleAddAssistantMessage(aiContent, "ticketForm");
      handleRemoveForm(formId);
      set((state) => ({
        ...state,
        ticketStatus: {
          id: undefined,
          ticketCreated: undefined,
          ticketAssigned: undefined,
          ticketClosed: undefined,
          userCreatedInActiveDirectory: undefined,
          userEmailCreated: undefined,
        },
        formError: "",
      }));
    }
  },


}));

export default useFormsStore;
