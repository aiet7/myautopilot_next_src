import { create } from "zustand";
import useTicketsStore from "../../interaction/tickets/ticketsStore";
import { validateTicketForm } from "@/utils/formValidations";
import useTicketConversationsStore from "../conversations/ticketConversationsStore";
import useUserStore from "../../user/userStore";
import useMspStore from "../../auth/msp/mspStore";

import { handleGetManageDBClients } from "@/utils/api/serverProps";
import useInteractionStore from "../interactionsStore";

const dbServiceUrl = process.env.NEXT_PUBLIC_DB_SERVICE_URL;
const connectWiseServiceUrl = process.env.NEXT_PUBLIC_CONNECTWISE_SERVICE_URL;

const useFormsStore = create((set, get) => ({
  isFormOpen: {},
  isServerError: false,
  previousResponseBodyForForms: {},
  formError: "",
  loading: {
    ticketForm: false,
  },

  ticket: {
    currentCompanies: null,
    currentTicketTitle: "",
    currentTicketCWCompanyId: "",
    currentTicketDescription: "",

    currentTicketBoard: "",
    currentTicketBoardId: null,
    currentTicketCategory: "",
    currentTicketCategoryId: null,
    categories: null,

    currentTicketSubCategory: "",
    currentTicketSubCategoryId: null,

    currentTicketPriority: "",
    currentTicketPriorityId: null,
    currentTicketPriorityScore: null,

    currentTicketDurationToResolve: null,
    currentTicketSeverity: "",
    currentTicketSeverityScore: null,
    currentTicketImpact: "",
    currentTicketImpactScore: null,
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

  setTicket: (
    field,
    value,
    boardId,
    categoryId,
    subCategoryId,
    priority,
    priorityId,
    priorityScore,
    impact,
    impactScore,
    severity,
    severityScore,
    tier,
    durationToResolve
  ) => {
    set((state) => {
      const updatedTicket = { ...state.ticket };

      if (field.startsWith("onBoarding.")) {
        const nestedFieldName = field.split(".")[1];
        updatedTicket.onBoarding[nestedFieldName] = value;
      } else {
        updatedTicket[field] = value;
      }

      if (boardId !== null) {
        updatedTicket.currentTicketBoardId = boardId;
        updatedTicket.currentTicketBoardName =
          state.ticket.categories.boardDetails.find(
            (board) => board.boardId === boardId
          )?.boardName || "";

        updatedTicket.currentTicketCategoryId = null;
        updatedTicket.currentTicketCategory = "";
        updatedTicket.currentTicketSubCategoryId = null;
        updatedTicket.currentTicketSubCategory = "";
        updatedTicket.currentTicketPriority = "";
        updatedTicket.currentTicketPriorityId = null;
        updatedTicket.currentTicketPriorityScore = null;
        updatedTicket.currentTicketTier = "";
        updatedTicket.currentTicketDurationToResolve = null;
      }

      if (categoryId !== null) {
        updatedTicket.currentTicketCategoryId = categoryId;
        updatedTicket.currentTicketCategory =
          state.ticket.categories.boardDetails
            .find((board) => board.boardId === boardId)
            ?.mspConnectWiseBoardTypes.find(
              (type) => type.typeId === categoryId
            )?.typeName || "";

        updatedTicket.currentTicketSubCategoryId = null;
        updatedTicket.currentTicketSubCategory = "";
        updatedTicket.currentTicketPriority = "";
        updatedTicket.currentTicketPriorityId = null;
        updatedTicket.currentTicketPriorityScore = null;
        updatedTicket.currentTicketTier = "";
        updatedTicket.currentTicketDurationToResolve = null;
      }

      if (subCategoryId !== null) {
        const selectedType = state.ticket.categories.boardDetails
          .find((board) => board.boardId === boardId)
          ?.mspConnectWiseBoardTypes.find((type) => type.typeId === categoryId);
        if (selectedType) {
          const selectedSubType = selectedType.mspConnectWiseBoardSubTypes.find(
            (sub) => sub.subTypeId === subCategoryId
          );

          updatedTicket.currentTicketSubCategoryId = subCategoryId;
          updatedTicket.currentTicketSubCategory =
            selectedSubType.subTypeName || "";
          updatedTicket.currentTicketPriority = selectedSubType.priority || "";
          updatedTicket.currentTicketPriorityId =
            selectedSubType.priorityId || null;
          updatedTicket.currentTicketPriorityScore =
            selectedSubType.priorityScore || null;
          updatedTicket.currentTicketTier = selectedSubType.tier || "";
          updatedTicket.currentTicketDurationToResolve =
            selectedSubType.slaDeadLineInHours || null;
        }
      }

      if (priority !== null) updatedTicket.currentTicketPriority = priority;
      if (priorityId !== null)
        updatedTicket.currentTicketPriorityId = priorityId;
      if (priorityScore !== null)
        updatedTicket.currentTicketPriorityScore = priorityScore;
      if (impactScore !== null)
        updatedTicket.currentTicketImpactScore = impactScore;
      if (severityScore !== null)
        updatedTicket.currentTicketSeverityScore = severityScore;
      if (tier !== null) updatedTicket.currentTicketTier = tier;
      if (durationToResolve !== null)
        updatedTicket.currentTicketDurationToResolve = durationToResolve;

      return { ...state, ticket: updatedTicket };
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

  handleCreateTicketCategories: async () => {
    const userStore = useUserStore.getState();

    try {
      const response = await fetch(
        `${dbServiceUrl}/${userStore.user.mspCustomDomain}/connectWiseBoardDetails`
      );
      if (response.status === 200) {
        const ticketMerge = await response.json();
        set((state) => ({
          ticket: { ...state.ticket, categories: ticketMerge },
        }));
      } else {
        console.log("failed fetching details");
      }
    } catch (e) {
      console.log(e);
    }
  },

  handleCreateTicketProcess: async (responseBody) => {
    const userStore = useUserStore.getState();
    const {
      title,
      description,
      priority,
      priorityId,
      impact,
      impactScore,
      severity,
      severityScore,
      tier,
      typeName,
      typeId,
      subTypeName,
      subTypeId,
      durationToResolve,
      emailId,
      name,
      phoneNumber,
      boardId,
      boardName,
    } = responseBody;
    const companies = await handleGetManageDBClients(
      userStore.user.mspCustomDomain
    );

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
        currentCompanies: companies || null,
        currentTicketBoardId: boardId || null,
        currentTicketBoardName: boardName || "",
        currentTicketCategoryId: typeId || null,
        currentTicketSubCategoryId: subTypeId || null,
        currentTicketPriorityId: priorityId || null,
        currentTicketImpactScore: impactScore || null,
        currentTicketSeverityScore: severityScore || null,
        currentTicketDurationToResolve: durationToResolve || null,
        currentTicketTitle: title || "",
        currentTicketDescription: description || "",
        currentTicketCategory: typeName || "",
        currentTicketSubCategory: subTypeName || "",
        currentTicketPriority: priority || "",
        currentTicketImpact: impact || "",
        currentTicketSeverity: severity || "",
        currentTicketTier: tier || "",
        currentTicketName:
          userStore.user.firstName + " " + userStore.user.lastName || "",
        currentTicketEmailId: userStore.user.email || "",
        currentTicketPhoneNumber: userStore.user.phoneNumber || "",

        onBoarding: {
          ...state.ticket.onBoarding,
          currentTicketNewFirstName: newEmployeeFirstName,
          currentTicketNewLastName: newEmployeeLastName,
          currentTicketEmailOwner: userStore.user.email || "",
          currentTicketNewPhoneNumber: phoneNumber || "",
          currentTicketNewEmailId: emailId || "",
        },
      },
    }));

    if (
      typeName === "TRAINING_OR_ONBOARDING" &&
      subTypeName === "NEW_EMPLOYEE_ONBOARDING"
    ) {
      set({
        ticketStatus: {
          ticketCreated: "pending",
          ticketAssigned: "pending",
          ticketClosed: "pending",
          userCreatedInActiveDirectory: "pending",
          userEmailCreated: "pending",
        },
      });
    } else {
      set({
        ticketStatus: {
          ticketCreated: "pending",
          ticketAssigned: "pending",
          ticketClosed: "pending",
        },
      });
    }
  },

  handleTicketConfirmation: async (isConfirmed, formId) => {
    const { ticket } = get();
    const userStore = useUserStore.getState();

    const { addTicket } = useTicketsStore.getState();
    const { userType } = useMspStore.getState();
    const { setResetTicketFlow } = useInteractionStore.getState();
    const {
      currentTicketImpactScore,
      currentTicketSeverityScore,
      currentTicketBoardId,
      currentTicketBoardName,
      currentTicketTitle,
      currentTicketCWCompanyId,
      currentTicketDescription,
      currentTicketCategory,
      currentTicketCategoryId,
      currentTicketSubCategory,
      currentTicketSubCategoryId,
      currentTicketDurationToResolve,
      currentTicketPriority,
      currentTicketPriorityId,
      currentTicketImpact,
      currentTicketSeverity,
      currentTicketTier,
      currentTicketName,
      currentTicketEmailId,
      currentTicketPhoneNumber,
    } = ticket;
    const {
      currentTicketNewFirstName,
      currentTicketNewLastName,
      currentTicketNewEmailId,
      currentTicketEmailOwner,
      currentTicketNewPhoneNumber,
      currentTicketLicenseId,
    } = ticket.onBoarding;
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
        const encodedDomain = encodeURIComponent(
          userStore.user.mspCustomDomain
        );

        let url = `${connectWiseServiceUrl}/createBoardTicket?mspCustomDomain=${encodedDomain}`;
        let body = {
          boardId: currentTicketBoardId,
          boardName: currentTicketBoardName,
          title: currentTicketTitle,
          description: currentTicketDescription,
          typeName: currentTicketCategory,
          typeId: currentTicketCategoryId,
          subTypeName: currentTicketSubCategory,
          subTypeId: currentTicketSubCategoryId,
          durationToResolve: currentTicketDurationToResolve,
          priority: currentTicketPriority,
          priorityId: currentTicketPriorityId,
          impact: currentTicketImpact,
          severity: currentTicketSeverity,
          tier: currentTicketTier,
          name: currentTicketName,
          emailId: currentTicketEmailId,
          phoneNumber: currentTicketPhoneNumber,
          connectWiseCompanyId: currentTicketCWCompanyId,
          impactScore: currentTicketImpactScore,
          severityScore: currentTicketSeverityScore,
        };

        if (userType === "tech") {
          body.technicianId = userStore.user.id;
          body.connectWiseCompanyId = currentTicketCWCompanyId;
        } else if (userType === "client") {
          url += `&userId=${userStore.user.id}`;
        }

        const ticketResponse = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });

        if (ticketResponse.status === 200) {
          const ticket = await ticketResponse.json();
          const {
            ticketCreated,
            ticketAssigned,
            ticketClosed,
            ticketDetails: { id },
          } = ticket;
          set((state) => ({
            ...state,
            ticketStatus: {
              ...state.ticketStatus,
              ticketId: id,
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
              set((state) => ({
                ...state,
                ticketStatus: {
                  ...state.ticketStatus,
                  userCreatedInActiveDirectory: userCreatedInActiveDirectory
                    ? "done"
                    : "pending",
                  userEmailCreated: userEmailCreated ? "done" : "pending",
                  ticketClosed: ticketClosed ? "done" : "pending",
                },
              }));
            }
          }
          const aiContent = `Ticket Created!\n\nID: ${id}\n\nTitle: ${currentTicketTitle}\n\nDescription: ${currentTicketDescription}\n\nCategory: ${currentTicketCategory}\n\nSubcategory: ${currentTicketSubCategory}\n\nPriority: ${currentTicketPriority}\n\nSeverity: ${currentTicketSeverity}\n\nImpact: ${currentTicketImpact}\n\nTier: ${currentTicketTier}\n\n${
            currentTicketCWCompanyId &&
            `ConnectWise Company ID: ${currentTicketCWCompanyId}`
          } \n\nName: ${currentTicketName}\n\nEmail: ${currentTicketEmailId}\n\nPhone: ${currentTicketPhoneNumber}.`;
          handleAddAssistantMessage(aiContent, "ticketForm");
          addTicket({
            ticketId: id,
            description: currentTicketDescription,
            category: currentTicketCategory,
            subcategory: currentTicketSubCategory,
            closed: false,
            title: currentTicketTitle,
            timeStamp: Date.now(),
          });
          setResetTicketFlow();
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
          ticket: {
            currentCompanies: null,
            currentTicketTitle: "",
            currentTicketCWCompanyId: "",
            currentTicketDescription: "",

            currentTicketBoard: "",
            currentTicketBoardId: null,
            currentTicketCategory: "",
            currentTicketCategoryId: null,
            categories: state.ticket.categories,

            currentTicketSubCategory: "",
            currentTicketSubCategoryId: null,

            currentTicketPriority: "",
            currentTicketPriorityId: null,
            currentTicketPriorityScore: null,

            currentTicketDurationToResolve: null,
            currentTicketSeverity: "",
            currentTicketSeverityScore: null,
            currentTicketImpact: "",
            currentTicketImpactScore: null,
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
        }));
        handleRemoveForm(formId);
      }
    } else {
      const aiContent = "Ticket Creation Cancelled.";
      handleAddAssistantMessage(aiContent, "ticketForm");
      handleRemoveForm(formId);
      setResetTicketFlow();
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

        ticket: {
          currentCompanies: null,
          currentTicketTitle: "",
          currentTicketCWCompanyId: "",
          currentTicketDescription: "",

          currentTicketBoard: "",
          currentTicketBoardId: null,
          currentTicketCategory: "",
          currentTicketCategoryId: null,
          categories: state.ticket.categories,

          currentTicketSubCategory: "",
          currentTicketSubCategoryId: null,

          currentTicketPriority: "",
          currentTicketPriorityId: null,
          currentTicketPriorityScore: null,

          currentTicketDurationToResolve: null,
          currentTicketSeverity: "",
          currentTicketSeverityScore: null,
          currentTicketImpact: "",
          currentTicketImpactScore: null,
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
      }));
    }
  },

  clearTicketForms: () => {
    set({
      isFormOpen: {},
      isServerError: false,
      previousResponseBodyForForms: {},
      formError: "",
      loading: {
        ticketForm: false,
      },

      ticket: {
        currentCompanies: null,
        currentTicketTitle: "",
        currentTicketCWCompanyId: "",
        currentTicketDescription: "",

        currentTicketBoard: "",
        currentTicketBoardId: null,
        currentTicketCategory: "",
        currentTicketCategoryId: null,
        categories: null,

        currentTicketSubCategory: "",
        currentTicketSubCategoryId: null,

        currentTicketPriority: "",
        currentTicketPriorityId: null,
        currentTicketPriorityScore: null,

        currentTicketDurationToResolve: null,
        currentTicketSeverity: "",
        currentTicketSeverityScore: null,
        currentTicketImpact: "",
        currentTicketImpactScore: null,
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
    });
  },
}));

export default useFormsStore;
