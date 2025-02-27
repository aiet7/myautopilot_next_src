import { create } from "zustand";
import useTicketsStore from "../../interaction/tickets/ticketsStore";
import { validateTicketForm } from "@/utils/formValidations";
import useTicketConversationsStore from "../conversations/ticketConversationsStore";
import useUserStore from "../../user/userStore";
import useMspStore from "../../auth/msp/mspStore";

import { handleGetPsaDBClients } from "@/utils/api/serverProps";
import useInteractionStore from "../interactionsStore";

const dbServiceUrl = process.env.NEXT_PUBLIC_DB_SERVICE_URL;
const connectWiseServiceUrl = process.env.NEXT_PUBLIC_CONNECTWISE_SERVICE_URL;
const psaServiceUrl = process.env.NEXT_PUBLIC_PSA_SERVICE_URL;

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
    currentContacts: null,
    currentTicketTitle: "",
    currentTicketCWCompanyId: "",
    currentTicketContactId: "",
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
    currentPsaType: "",

    currentTicketTypeId: "",
    currentTicketTypeLabel: "",

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

  // setTicket: (
  //   field,
  //   value,
  //   boardId,
  //   categoryId,
  //   subCategoryId,
  //   priority,
  //   priorityId,
  //   priorityScore,
  //   impact,
  //   impactScore,
  //   severity,
  //   severityScore,
  //   tier,
  //   durationToResolve
  // ) => {
  //   set((state) => {
  //     const updatedTicket = { ...state.ticket };

  //     if (field.startsWith("onBoarding.")) {
  //       const nestedFieldName = field.split(".")[1];
  //       updatedTicket.onBoarding[nestedFieldName] = value;
  //     } else {
  //       updatedTicket[field] = value;
  //     }

  //     if (boardId !== null) {
  //       updatedTicket.currentTicketBoardId = boardId;
  //       updatedTicket.currentTicketBoardName =
  //         state.ticket.categories.boardDetails.find(
  //           (board) => board.boardId === boardId
  //         )?.boardName || "";

  //       updatedTicket.currentTicketCategoryId = null;
  //       updatedTicket.currentTicketCategory = "";
  //       updatedTicket.currentTicketSubCategoryId = null;
  //       updatedTicket.currentTicketSubCategory = "";
  //       updatedTicket.currentTicketPriority = "";
  //       updatedTicket.currentTicketPriorityId = null;
  //       updatedTicket.currentTicketPriorityScore = null;
  //       updatedTicket.currentTicketTier = "";
  //       updatedTicket.currentTicketDurationToResolve = null;
  //     }

  //     if (categoryId !== null) {
  //       updatedTicket.currentTicketCategoryId = categoryId;
  //       updatedTicket.currentTicketCategory =
  //         state.ticket.categories.boardDetails
  //           .find((board) => board.boardId === boardId)
  //           ?.mspConnectWiseBoardTypes.find(
  //             (type) => type.typeId === categoryId
  //           )?.typeName || "";

  //       updatedTicket.currentTicketSubCategoryId = null;
  //       updatedTicket.currentTicketSubCategory = "";
  //       updatedTicket.currentTicketPriority = "";
  //       updatedTicket.currentTicketPriorityId = null;
  //       updatedTicket.currentTicketPriorityScore = null;
  //       updatedTicket.currentTicketTier = "";
  //       updatedTicket.currentTicketDurationToResolve = null;
  //     }

  //     if (subCategoryId !== null) {
  //       const selectedType = state.ticket.categories.boardDetails
  //         .find((board) => board.boardId === boardId)
  //         ?.mspConnectWiseBoardTypes.find((type) => type.typeId === categoryId);
  //       if (selectedType) {
  //         const selectedSubType = selectedType.mspConnectWiseBoardSubTypes.find(
  //           (sub) => sub.subTypeId === subCategoryId
  //         );

  //         updatedTicket.currentTicketSubCategoryId = subCategoryId;
  //         updatedTicket.currentTicketSubCategory =
  //           selectedSubType.subTypeName || "";
  //         updatedTicket.currentTicketPriority = selectedSubType.priority || "";
  //         updatedTicket.currentTicketPriorityId =
  //           selectedSubType.priorityId || null;
  //         updatedTicket.currentTicketPriorityScore =
  //           selectedSubType.priorityScore || null;
  //         updatedTicket.currentTicketTier = selectedSubType.tier || "";
  //         updatedTicket.currentTicketDurationToResolve =
  //           selectedSubType.slaDeadLineInHours || null;
  //       }
  //     }

  //     if (priority !== null) updatedTicket.currentTicketPriority = priority;
  //     if (priorityId !== null)
  //       updatedTicket.currentTicketPriorityId = priorityId;
  //     if (priorityScore !== null)
  //       updatedTicket.currentTicketPriorityScore = priorityScore;
  //     if (impactScore !== null)
  //       updatedTicket.currentTicketImpactScore = impactScore;
  //     if (severityScore !== null)
  //       updatedTicket.currentTicketSeverityScore = severityScore;
  //     if (tier !== null) updatedTicket.currentTicketTier = tier;
  //     if (durationToResolve !== null)
  //       updatedTicket.currentTicketDurationToResolve = durationToResolve;

  //     return { ...state, ticket: updatedTicket };
  //   });
  // },

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
    durationToResolve,
    ticketTypeLabel,
    ticketTypeValue
  ) => {
    set((state) => {
      const updatedTicket = { ...state.ticket };
      const { currentPsaType, categories } = state.ticket;
      if (field.startsWith("onBoarding.")) {
        const nestedFieldName = field.split(".")[1];
        updatedTicket.onBoarding[nestedFieldName] = value;
      } else {
        updatedTicket[field] = value;
      }

      if (boardId !== null) {
        updatedTicket.currentTicketBoardId = boardId;

        if (currentPsaType === "ConnectWise") {
          const selectedBoard = categories?.boardDetails?.find(
            (board) => board.boardId === boardId
          );
          updatedTicket.currentTicketBoardName = selectedBoard?.boardName || "";
        } else if (currentPsaType === "Autotask") {
          const selectedQueue = categories?.ticketQueueDetails?.find(
            (queue) => queue.queueId === boardId
          );
          updatedTicket.currentTicketBoardName = selectedQueue?.queueName || "";
        }

        updatedTicket.currentTicketCategoryId = null;
        updatedTicket.currentTicketCategory = "";
        updatedTicket.currentTicketSubCategoryId = null;
        updatedTicket.currentTicketSubCategory = "";
        updatedTicket.currentTicketPriority = "";
        updatedTicket.currentTicketPriorityId = null;
        updatedTicket.currentTicketPriorityScore = null;
        updatedTicket.currentTicketTier = "";
        updatedTicket.currentTicketDurationToResolve = null;
        updatedTicket.currentTicketTypeLabel = "";
        updatedTicket.currentTicketTypeId = null;
      }

      if (categoryId !== null) {
        updatedTicket.currentTicketCategoryId = categoryId;

        if (currentPsaType === "ConnectWise") {
          const selectedBoard = categories?.boardDetails?.find(
            (board) => board.boardId === boardId
          );
          const selectedCategory =
            selectedBoard?.mspConnectWiseBoardTypes?.find(
              (type) => type.typeId === categoryId
            );

          updatedTicket.currentTicketCategory =
            selectedCategory?.typeName || "";
        } else if (currentPsaType === "Autotask") {
          const selectedQueue = categories?.ticketQueueDetails?.find(
            (queue) => queue.queueId === boardId
          );

          const selectedCategory = selectedQueue?.issueTypes?.find(
            (issue) => issue.value === categoryId
          );

          updatedTicket.currentTicketCategory = selectedCategory?.label || "";
        }

        updatedTicket.currentTicketSubCategoryId = null;
        updatedTicket.currentTicketSubCategory = "";
        updatedTicket.currentTicketPriority = "";
        updatedTicket.currentTicketPriorityId = null;
        updatedTicket.currentTicketPriorityScore = null;
        updatedTicket.currentTicketTier = "";
        updatedTicket.currentTicketDurationToResolve = null;
        updatedTicket.currentTicketTypeLabel = "";
        updatedTicket.currentTicketTypeId = null;
      }

      if (subCategoryId !== null) {
        if (currentPsaType === "ConnectWise") {
          const selectedBoard = categories?.boardDetails?.find(
            (board) => board.boardId === boardId
          );
          const selectedCategory =
            selectedBoard?.mspConnectWiseBoardTypes?.find(
              (type) => type.typeId === categoryId
            );
          const selectedSubType =
            selectedCategory?.mspConnectWiseBoardSubTypes?.find(
              (sub) => sub.subTypeId === subCategoryId
            );
          updatedTicket.currentTicketSubCategoryId = subCategoryId;
          updatedTicket.currentTicketSubCategory =
            selectedSubType?.subTypeName || "";
          updatedTicket.currentTicketPriority = selectedSubType?.priority || "";
          updatedTicket.currentTicketPriorityId =
            selectedSubType?.priorityId || null;
          updatedTicket.currentTicketPriorityScore =
            selectedSubType?.priorityScore || null;
          updatedTicket.currentTicketTier = selectedSubType?.tier || "";
          updatedTicket.currentTicketDurationToResolve =
            selectedSubType?.slaDeadLineInHours || null;
        } else if (currentPsaType === "Autotask") {
          const selectedQueue = categories?.ticketQueueDetails?.find(
            (queue) => queue.queueId === boardId
          );

          const selectedCategory = selectedQueue?.issueTypes?.find(
            (issue) => issue.value === categoryId
          );

          const selectedSubType = selectedCategory?.subIssueTypes?.find(
            (sub) => sub.value === subCategoryId
          );

          updatedTicket.currentTicketSubCategoryId = subCategoryId;
          updatedTicket.currentTicketSubCategory = selectedSubType?.label || "";
          updatedTicket.currentTicketPriority =
            selectedSubType?.priorityLabel || "";
          updatedTicket.currentTicketPriorityScore =
            selectedSubType?.priorityScore || null;
          updatedTicket.currentTicketDurationToResolve =
            selectedSubType?.slaDeadLineInHours || null;
          updatedTicket.currentTicketTypeLabel =
            selectedSubType?.ticketTypeLabel || "";
          updatedTicket.currentTicketTypeId =
            selectedSubType?.ticketTypeValue || null;
        }
      }

      if (ticketTypeLabel !== null)
        updatedTicket.currentTicketTypeLabel = ticketTypeLabel;

      if (ticketTypeValue !== null)
        updatedTicket.currentTicketTypeId = ticketTypeValue;

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

  // handleCreateTicketCategories: async () => {
  //   const userStore = useUserStore.getState();

  //   try {
  //     const response = await fetch(
  //       `${dbServiceUrl}/${userStore.user.mspCustomDomain}/connectWiseBoardDetails`
  //     );
  //     if (response.status === 200) {
  //       const ticketMerge = await response.json();
  //       console.log(
  //         "ticketMerge from handlecreateticketcategories",
  //         ticketMerge
  //       );
  //       set((state) => ({
  //         ticket: { ...state.ticket, categories: ticketMerge },
  //       }));
  //     } else {
  //       console.log("failed fetching details");
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   }
  // },

  handleCreateTicketCategories: async () => {
    const userStore = useUserStore.getState();

    try {
      const response = await fetch(
        `${dbServiceUrl}/${userStore.user.mspCustomDomain}/getPSATicketingConfiguration`
      );

      if (response.status === 200) {
        const ticketMerge = await response.json();

        let categories = null;
        if (
          ticketMerge.psaType === "ConnectWise" &&
          ticketMerge.connectWiseConfig
        ) {
          categories = {
            boardDetails: ticketMerge.connectWiseConfig.boardDetails || [],
            boardTicketSync:
              ticketMerge.connectWiseConfig.boardTicketSync || [],
            defaultCompanyId:
              ticketMerge.connectWiseConfig.defaultCompanyId || "",
            defaultCompanyName:
              ticketMerge.connectWiseConfig.defaultCompanyName || "",
            syncClientsTypeId:
              ticketMerge.connectWiseConfig.syncClientsTypeId || "",
          };
        } else if (
          ticketMerge.psaType === "Autotask" &&
          ticketMerge.autotaskConfig
        ) {
          categories = {
            ticketQueueDetails:
              ticketMerge.autotaskConfig.ticketQueueDetails || [],
            closingTicketStatus:
              ticketMerge.autotaskConfig.closingTicketStatus || "",
            closingTicketStatusId:
              ticketMerge.autotaskConfig.closingTicketStatusId || "",
            newCreatingTicketStatus:
              ticketMerge.autotaskConfig.newCreatingTicketStatus || "",
            newCreatingTicketStatusId:
              ticketMerge.autotaskConfig.newCreatingTicketStatusId || "",
            sourceLabel: ticketMerge.autotaskConfig.sourceLabel || "",
            sourceValue: ticketMerge.autotaskConfig.sourceValue || "",
            ticketCategoryLabel:
              ticketMerge.autotaskConfig.ticketCategoryLabel || "",
            ticketCategoryValue:
              ticketMerge.autotaskConfig.ticketCategoryValue || "",
          };
        }

        set((state) => ({
          ticket: { ...state.ticket, categories },
        }));
      } else {
        console.log("Failed fetching ticketing configuration");
      }
    } catch (e) {
      console.log("Error fetching ticket categories:", e);
    }
  },

  // handleCreateTicketProcess: async (responseBody) => {
  //   const userStore = useUserStore.getState();
  //   const {
  //     title,
  //     description,
  //     priority,
  //     priorityId,
  //     impact,
  //     impactScore,
  //     severity,
  //     severityScore,
  //     tier,
  //     typeName,
  //     typeId,
  //     subTypeName,
  //     subTypeId,
  //     durationToResolve,
  //     emailId,
  //     name,
  //     phoneNumber,
  //     boardId,
  //     boardName,
  //   } = responseBody;
  //   const companies = await handleGetPsaDBClients(
  //     userStore.user.mspCustomDomain
  //   );

  //   console.log("responsebody from handlecreateticketprocess", responseBody);

  //   let newEmployeeFirstName = "";
  //   let newEmployeeLastName = "";

  //   if (name) {
  //     const names = name.split(" ");
  //     newEmployeeFirstName = names[0];
  //     newEmployeeLastName = names.length > 1 ? names[1] : "";
  //   }

  //   set((state) => ({
  //     ticket: {
  //       ...state.ticket,
  //       currentCompanies: companies || null,
  //       currentTicketBoardId: boardId || null,
  //       currentTicketBoardName: boardName || "",
  //       currentTicketCategoryId: typeId || null,
  //       currentTicketSubCategoryId: subTypeId || null,
  //       currentTicketPriorityId: priorityId || null,
  //       currentTicketImpactScore: impactScore || null,
  //       currentTicketSeverityScore: severityScore || null,
  //       currentTicketDurationToResolve: durationToResolve || null,
  //       currentTicketTitle: title || "",
  //       currentTicketDescription: description || "",
  //       currentTicketCategory: typeName || "",
  //       currentTicketSubCategory: subTypeName || "",
  //       currentTicketPriority: priority || "",
  //       currentTicketImpact: impact || "",
  //       currentTicketSeverity: severity || "",
  //       currentTicketTier: tier || "",
  //       currentTicketName:
  //         userStore.user.firstName + " " + userStore.user.lastName || "",
  //       currentTicketEmailId: userStore.user.email || "",
  //       currentTicketPhoneNumber: userStore.user.phoneNumber || "",

  //       onBoarding: {
  //         ...state.ticket.onBoarding,
  //         currentTicketNewFirstName: newEmployeeFirstName,
  //         currentTicketNewLastName: newEmployeeLastName,
  //         currentTicketEmailOwner: userStore.user.email || "",
  //         currentTicketNewPhoneNumber: phoneNumber || "",
  //         currentTicketNewEmailId: emailId || "",
  //       },
  //     },
  //   }));

  //   if (
  //     typeName === "TRAINING_OR_ONBOARDING" &&
  //     subTypeName === "NEW_EMPLOYEE_ONBOARDING"
  //   ) {
  //     set({
  //       ticketStatus: {
  //         ticketCreated: "pending",
  //         ticketAssigned: "pending",
  //         ticketClosed: "pending",
  //         userCreatedInActiveDirectory: "pending",
  //         userEmailCreated: "pending",
  //       },
  //     });
  //   } else {
  //     set({
  //       ticketStatus: {
  //         ticketCreated: "pending",
  //         ticketAssigned: "pending",
  //         ticketClosed: "pending",
  //       },
  //     });
  //   }
  // },

  handleCreateTicketContact: async (mspCustomDomain, psaCompanyId) => {
    try {
      const response = await fetch(
        `${dbServiceUrl}/${mspCustomDomain}/psaContactsByClientId?psaCompanyId=${psaCompanyId}`
      );

      if (response.status === 200) {
        const contacts = await response.json();
        set((state) => ({
          ticket: {
            ...state.ticket,
            currentContacts: contacts,
          },
        }));
        console.log("Company Contacts Fetched");
      } else {
        console.log("Company Contacts Failed To Fetch");
      }
    } catch (e) {
      console.log(e);
    }
  },

  handleCreateTicketProcess: async (responseBody) => {
    const userStore = useUserStore.getState();
    const {
      psaType,
      title,
      description,
      emailId,
      name,
      phone,
      impact,
      impactScore,
      severity,
      severityScore,
      connectWiseDetails,
      autotaskDetails,
      durationToResolve,
    } = responseBody;

    const companies = await handleGetPsaDBClients(
      userStore.user.mspCustomDomain
    );

    let newEmployeeFirstName = "";
    let newEmployeeLastName = "";
    if (name) {
      const names = name.split(" ");
      newEmployeeFirstName = names[0];
      newEmployeeLastName = names.length > 1 ? names.slice(1).join(" ") : "";
    }

    let boardId = null,
      boardName = "",
      priority = "",
      priorityId = null,
      priorityScore = null;
    let typeName = "",
      typeId = null,
      subTypeName = "",
      subTypeId = null,
      subTypeScore = null;
    let tier = null,
      ticketTypeValue = null,
      ticketTypeLabel = null;

    if (psaType === "ConnectWise" && connectWiseDetails) {
      const {
        boardId: cwBoardId,
        boardName: cwBoardName,
        priority: cwPriority,
        priorityId: cwPriorityId,
        priorityScore: cwPriorityScore,
        typeName: cwTypeName,
        typeId: cwTypeId,
        subTypeName: cwSubTypeName,
        subTypeId: cwSubTypeId,
        subTypeScore: cwSubTypeScore,
        tier: cwTier,
      } = connectWiseDetails;

      boardId = cwBoardId;
      boardName = cwBoardName;
      priority = cwPriority;
      priorityId = cwPriorityId;
      priorityScore = cwPriorityScore;
      typeName = cwTypeName;
      typeId = cwTypeId;
      subTypeName = cwSubTypeName;
      subTypeId = cwSubTypeId;
      subTypeScore = cwSubTypeScore;
      tier = cwTier;
    } else if (psaType === "Autotask" && autotaskDetails) {
      const {
        queueId: atQueueId,
        queueName: atQueueName,
        priorityLabel: atPriority,
        priorityValue: atPriorityId,
        priorityScore: atPriorityScore,
        issueTypeLabel: atTypeName,
        issueTypeValue: atTypeId,
        subIssueTypeLabel: atSubTypeName,
        subIssueTypeValue: atSubTypeId,
        subTypeScore: atSubTypeScore,
        ticketTypeLabel: atTicketTypeLabel,
        ticketTypeValue: atTicketTypeValue,
        tier: atTier,
      } = autotaskDetails;

      boardId = atQueueId;
      boardName = atQueueName;
      priority = atPriority;
      priorityId = atPriorityId;
      priorityScore = atPriorityScore;
      typeName = atTypeName;
      typeId = atTypeId;
      subTypeName = atSubTypeName;
      subTypeId = atSubTypeId;
      subTypeScore = atSubTypeScore;
      tier = atTier || null;
      ticketTypeLabel = atTicketTypeLabel;
      ticketTypeValue = atTicketTypeValue;
    }

    set((state) => ({
      ticket: {
        ...state.ticket,
        currentPsaType: psaType,
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
          `${userStore.user.firstName} ${userStore.user.lastName}` || "",
        currentTicketEmailId: userStore.user.email || "",
        currentTicketPhoneNumber: userStore.user.phoneNumber || "",
        currentTicketTypeId: ticketTypeValue || null,
        currentTicketTypeLabel: ticketTypeLabel || "",
        onBoarding: {
          ...state.ticket.onBoarding,
          currentTicketNewFirstName: newEmployeeFirstName,
          currentTicketNewLastName: newEmployeeLastName,
          currentTicketEmailOwner: userStore.user.email || "",
          currentTicketNewPhoneNumber: phone || "",
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

  // handleTicketConfirmation: async (isConfirmed) => {
  //   const { ticket } = get();
  //   const userStore = useUserStore.getState();

  //   const { addTicket, setActiveTicketBotMode } = useTicketsStore.getState();
  //   const { userType } = useMspStore.getState();
  //   const { diagnosticTicketMessage, setResetTicketFlow } =
  //     useInteractionStore.getState();
  //   const {
  //     currentTicketImpactScore,
  //     currentTicketSeverityScore,
  //     currentTicketBoardId,
  //     currentTicketBoardName,
  //     currentTicketTitle,
  //     currentTicketCWCompanyId,
  //     currentTicketDescription,
  //     currentTicketCategory,
  //     currentTicketCategoryId,
  //     currentTicketSubCategory,
  //     currentTicketSubCategoryId,
  //     currentTicketDurationToResolve,
  //     currentTicketPriority,
  //     currentTicketPriorityId,
  //     currentTicketImpact,
  //     currentTicketSeverity,
  //     currentTicketTier,
  //     currentTicketName,
  //     currentTicketEmailId,
  //     currentTicketPhoneNumber,
  //   } = ticket;
  //   const {
  //     currentTicketNewFirstName,
  //     currentTicketNewLastName,
  //     currentTicketNewEmailId,
  //     currentTicketEmailOwner,
  //     currentTicketNewPhoneNumber,
  //     currentTicketLicenseId,
  //   } = ticket.onBoarding;
  //   const { handleRemoveButtons, handleAddAssistantMessage } =
  //     useTicketConversationsStore.getState();

  //   if (isConfirmed) {
  //     const errors = validateTicketForm(ticket, userType);
  //     if (errors !== true) {
  //       set({ formError: errors });
  //       return;
  //     }
  //     set((state) => ({
  //       loading: {
  //         ...state.loading,
  //         ticketForm: true,
  //       },
  //     }));
  //     try {
  //       const encodedDomain = encodeURIComponent(
  //         userStore.user.mspCustomDomain
  //       );

  //       // let url = `${connectWiseServiceUrl}/createBoardTicket?mspCustomDomain=${encodedDomain}`;
  //       let url = `${psaServiceUrl}/createTicket?mspCustomDomain=${encodedDomain}`;

  //       let body = {
  //         boardId: currentTicketBoardId,
  //         boardName: currentTicketBoardName,
  //         title: currentTicketTitle,
  //         description: currentTicketDescription,
  //         typeName: currentTicketCategory,
  //         typeId: currentTicketCategoryId,
  //         subTypeName: currentTicketSubCategory,
  //         subTypeId: currentTicketSubCategoryId,
  //         durationToResolve: currentTicketDurationToResolve,
  //         priority: currentTicketPriority,
  //         priorityId: currentTicketPriorityId,
  //         impact: currentTicketImpact,
  //         severity: currentTicketSeverity,
  //         tier: currentTicketTier,
  //         name: currentTicketName,
  //         emailId: currentTicketEmailId,
  //         phoneNumber: currentTicketPhoneNumber,
  //         connectWiseCompanyId: currentTicketCWCompanyId,
  //         impactScore: currentTicketImpactScore,
  //         severityScore: currentTicketSeverityScore,
  //         convsersation: diagnosticTicketMessage,
  //       };

  //       if (userType === "tech") {
  //         body.technicianId = userStore.user.id;
  //         body.connectWiseCompanyId = currentTicketCWCompanyId;
  //       } else if (userType === "client") {
  //         url += `&userId=${userStore.user.id}`;
  //       }

  //       const ticketResponse = await fetch(url, {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify(body),
  //       });

  //       if (ticketResponse.status === 200) {
  //         const ticket = await ticketResponse.json();
  //         const {
  //           ticketCreated,
  //           ticketAssigned,
  //           ticketClosed,
  //           ticketDetails: { id },
  //         } = ticket;
  //         set((state) => ({
  //           ...state,
  //           ticketStatus: {
  //             ...state.ticketStatus,
  //             ticketId: id,
  //             ticketCreated: ticketCreated && "done",
  //             ticketAssigned: ticketAssigned ? "done" : "pending",
  //             ticketClosed: ticketClosed ? "done" : "waiting",
  //           },
  //         }));
  //         if (
  //           currentTicketCategory === "TRAINING_OR_ONBOARDING" &&
  //           currentTicketSubCategory === "NEW_EMPLOYEE_ONBOARDING"
  //         ) {
  //           const ticketOnboardingResponse = await fetch(
  //             `https://etech7-wf-etech7-support-service.azuremicroservices.io/onboardUser`,
  //             {
  //               method: "POST",
  //               headers: { "Content-Type": "application/json" },
  //               body: JSON.stringify({
  //                 ticketId: id,
  //                 firstName: currentTicketNewFirstName,
  //                 lastName: currentTicketNewLastName,
  //                 emailId: currentTicketNewEmailId,
  //                 emailTicketOwner: currentTicketEmailOwner,
  //                 phoneNumber: currentTicketNewPhoneNumber,
  //                 licenseId: currentTicketLicenseId,
  //               }),
  //             }
  //           );
  //           if (ticketOnboardingResponse.status === 200) {
  //             const ticketOnBoarding = await ticketOnboardingResponse.json();
  //             const {
  //               userCreatedInActiveDirectory,
  //               userEmailCreated,
  //               ticketClosed,
  //             } = ticketOnBoarding;
  //             set((state) => ({
  //               ...state,
  //               ticketStatus: {
  //                 ...state.ticketStatus,
  //                 userCreatedInActiveDirectory: userCreatedInActiveDirectory
  //                   ? "done"
  //                   : "pending",
  //                 userEmailCreated: userEmailCreated ? "done" : "pending",
  //                 ticketClosed: ticketClosed ? "done" : "pending",
  //               },
  //             }));
  //           }
  //         }
  //         const aiContent = `Ticket Created!\n\nID: ${id}\n\nTitle: ${currentTicketTitle}\n\nDescription: ${currentTicketDescription}\n\nCategory: ${currentTicketCategory}\n\nSubcategory: ${currentTicketSubCategory}\n\nPriority: ${currentTicketPriority}\n\nSeverity: ${currentTicketSeverity}\n\nImpact: ${currentTicketImpact}\n\nTier: ${currentTicketTier}\n\n${
  //           currentTicketCWCompanyId &&
  //           `ConnectWise Company ID: ${currentTicketCWCompanyId}`
  //         } \n\nName: ${currentTicketName}\n\nEmail: ${currentTicketEmailId}\n\nPhone: ${currentTicketPhoneNumber}`;
  //         handleAddAssistantMessage(aiContent, false);
  //         addTicket({
  //           ticketId: id,
  //           description: currentTicketDescription,
  //           category: currentTicketCategory,
  //           subcategory: currentTicketSubCategory,
  //           closed: false,
  //           title: currentTicketTitle,
  //           timeStamp: Date.now(),
  //         });
  //         setResetTicketFlow();
  //         setActiveTicketBotMode("History");
  //       }
  //     } catch (e) {
  //       console.log(e);
  //     } finally {
  //       set((state) => ({
  //         loading: {
  //           ...state.loading,
  //           ticketForm: false,
  //         },
  //         formError: "",
  //         ticket: {
  //           currentCompanies: null,
  //           currentTicketTitle: "",
  //           currentTicketCWCompanyId: "",
  //           currentTicketDescription: "",

  //           currentTicketBoard: "",
  //           currentTicketBoardId: null,
  //           currentTicketCategory: "",
  //           currentTicketCategoryId: null,
  //           categories: state.ticket.categories,

  //           currentTicketSubCategory: "",
  //           currentTicketSubCategoryId: null,

  //           currentTicketPriority: "",
  //           currentTicketPriorityId: null,
  //           currentTicketPriorityScore: null,

  //           currentTicketDurationToResolve: null,
  //           currentTicketSeverity: "",
  //           currentTicketSeverityScore: null,
  //           currentTicketImpact: "",
  //           currentTicketImpactScore: null,
  //           currentTicketTier: "",
  //           currentTicketName: "",
  //           currentTicketEmailId: "",
  //           currentTicketPhoneNumber: "",

  //           onBoarding: {
  //             currentTicketNewFirstName: "",
  //             currentTicketNewLastName: "",
  //             currentTicketNewEmailId: "",
  //             currentTicketEmailOwner: "",
  //             currentTicketNewPhoneNumber: "",
  //             currentTicketLicenseId: "E3",
  //           },
  //         },
  //       }));
  //       handleRemoveButtons();
  //     }
  //   } else {
  //     const aiContent = "Ticket Creation Cancelled.";
  //     handleAddAssistantMessage(aiContent, false);
  //     handleRemoveButtons();
  //     setResetTicketFlow();
  //     setActiveTicketBotMode("History");

  //     set((state) => ({
  //       ...state,
  //       ticketStatus: {
  //         id: undefined,
  //         ticketCreated: undefined,
  //         ticketAssigned: undefined,
  //         ticketClosed: undefined,
  //         userCreatedInActiveDirectory: undefined,
  //         userEmailCreated: undefined,
  //       },
  //       formError: "",

  //       ticket: {
  //         currentCompanies: null,
  //         currentTicketTitle: "",
  //         currentTicketCWCompanyId: "",
  //         currentTicketDescription: "",

  //         currentTicketBoard: "",
  //         currentTicketBoardId: null,
  //         currentTicketCategory: "",
  //         currentTicketCategoryId: null,
  //         categories: state.ticket.categories,

  //         currentTicketSubCategory: "",
  //         currentTicketSubCategoryId: null,

  //         currentTicketPriority: "",
  //         currentTicketPriorityId: null,
  //         currentTicketPriorityScore: null,

  //         currentTicketDurationToResolve: null,
  //         currentTicketSeverity: "",
  //         currentTicketSeverityScore: null,
  //         currentTicketImpact: "",
  //         currentTicketImpactScore: null,
  //         currentTicketTier: "",
  //         currentTicketName: "",
  //         currentTicketEmailId: "",
  //         currentTicketPhoneNumber: "",

  //         onBoarding: {
  //           currentTicketNewFirstName: "",
  //           currentTicketNewLastName: "",
  //           currentTicketNewEmailId: "",
  //           currentTicketEmailOwner: "",
  //           currentTicketNewPhoneNumber: "",
  //           currentTicketLicenseId: "E3",
  //         },
  //       },
  //     }));
  //   }
  // },

  handleTicketConfirmation: async (isConfirmed) => {
    const { ticket } = get();
    const userStore = useUserStore.getState();
    const { addTicket, setActiveTicketBotMode } = useTicketsStore.getState();
    const { userType } = useMspStore.getState();
    const { diagnosticTicketMessage, setResetTicketFlow } =
      useInteractionStore.getState();
    const { handleRemoveButtons, handleAddAssistantMessage } =
      useTicketConversationsStore.getState();

    if (isConfirmed) {
      const errors = validateTicketForm(ticket, userType);
      if (errors !== true) {
        set({ formError: errors });
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
        let url = `${psaServiceUrl}/createTicket?mspCustomDomain=${encodedDomain}`;

        let body = {
          psaType: ticket.currentPsaType, // ✅ Added PSA Type (ConnectWise or Autotask)
          title: ticket.currentTicketTitle,
          description: ticket.currentTicketDescription,
          name: ticket.currentTicketName,
          emailId: ticket.currentTicketEmailId,
          phone: ticket.currentTicketPhoneNumber,
          impactScore: ticket.currentTicketImpactScore,
          severityScore: ticket.currentTicketSeverityScore,
          impact: ticket.currentTicketImpact,
          severity: ticket.currentTicketSeverity,
          convsersation: diagnosticTicketMessage, // ✅ Added Diagnostic Conversation
          userId: userType === "client" ? userStore.user.id : null,
          techId: userType === "tech" ? userStore.user.id : null,
          psaCompanyId: ticket.currentTicketCWCompanyId, // Assuming this comes from elsewhere
          psaContactId: ticket.currentTicketContactId, // Assuming this comes from elsewhere
        };

        if (ticket.currentPsaType === "ConnectWise") {
          body.connectWiseDetails = {
            boardId: ticket.currentTicketBoardId,
            boardName: ticket.currentTicketBoardName,
            typeId: ticket.currentTicketCategoryId,
            typeName: ticket.currentTicketCategory,
            subTypeId: ticket.currentTicketSubCategoryId,
            subTypeName: ticket.currentTicketSubCategory,
            priority: ticket.currentTicketPriority,
            priorityId: ticket.currentTicketPriorityId,
            priorityScore: ticket.currentTicketPriorityScore,
            tier: ticket.currentTicketTier,
            subTypeScore: ticket.currentTicketSubCategoryScore || null,
          };
        } else if (ticket.currentPsaType === "Autotask") {
          body.autotaskDetails = {
            queueId: ticket.currentTicketBoardId,
            queueName: ticket.currentTicketBoardName,
            issueTypeValue: ticket.currentTicketCategoryId,
            issueTypeLabel: ticket.currentTicketCategory,
            subIssueTypeValue: ticket.currentTicketSubCategoryId,
            subIssueTypeLabel: ticket.currentTicketSubCategory,
            priorityValue: ticket.currentTicketPriorityId,
            priorityLabel: ticket.currentTicketPriority,
            priorityScore: ticket.currentTicketPriorityScore,
            ticketTypeValue: ticket.currentTicketTypeId, // Autotask maps categories to TicketType
            ticketTypeLabel: ticket.currentTicketTypeLabel, // Autotask maps categories to TicketType
            tier: ticket.currentTicketTier,
            subTypeScore: ticket.currentTicketSubCategoryScore || null,
          };
        }

        const ticketResponse = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });

        if (ticketResponse.status === 200) {
          const newTicket = await ticketResponse.json();
          let ticketId = null;

          if (ticket.currentPsaType === "ConnectWise") {
            ticketId = newTicket.ticketId || null;
          } else if (ticket.currentPsaType === "Autotask") {
            ticketId = newTicket.ticketId || null;
          }

          set((state) => ({
            ...state,
            ticketStatus: {
              ...state.ticketStatus,
              ticketId: ticketId,
            },
          }));

          const aiContent = `Ticket Created!\n\nID: ${ticketId}\n\nTitle: ${
            ticket.currentTicketTitle
          }\n\nDescription: ${ticket.currentTicketDescription}\n\nCategory: ${
            ticket.currentTicketCategory
          }\n\nSubcategory: ${ticket.currentTicketSubCategory}\n\nPriority: ${
            ticket.currentTicketPriority
          }\n\nSeverity: ${ticket.currentTicketSeverity}\n\nImpact: ${
            ticket.currentTicketImpact
          }\n\nTier: ${ticket.currentTicketTier}\n\n${
            ticket.currentTicketCWCompanyId &&
            `Company ID: ${ticket.currentTicketCWCompanyId}`
          } \n\nName: ${ticket.currentTicketName}\n\nEmail: ${
            ticket.currentTicketEmailId
          }\n\nPhone: ${ticket.currentTicketPhoneNumber}`;
          handleAddAssistantMessage(aiContent, false);
          addTicket({
            ticketId: newTicket.ticketId,
            description: newTicket.description,
            type: newTicket.type,
            subType: newTicket.subType,
            closed: newTicket.closed,
            title: newTicket.title,
            priority: newTicket.priority,
            clientsName: newTicket.clientsName,
            company: newTicket.company,
            name: newTicket.name,
            emailId: newTicket.emailId,
            phoneNumber: newTicket.phoneNumber,
            boardName: newTicket.boardName,
            timeStamp: Date.now(newTicket.timeStamp),
          });

          setResetTicketFlow();
          setActiveTicketBotMode("History");
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
            currentContacts: null,
            currentTicketTitle: "",
            currentTicketCWCompanyId: "",
            currentTicketContactId: "",
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
            currentTicketTypeId: null,
            currentTicketTypeLabel: "",
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

        handleRemoveButtons();
      }
    } else {
      handleAddAssistantMessage("Ticket Creation Cancelled.", false);
      handleRemoveButtons();
      setResetTicketFlow();
      setActiveTicketBotMode("History");

      set((state) => ({
        ...state,
        ticketStatus: {
          ticketId: undefined,
        },
        formError: "",
        ticket: {
          currentCompanies: null,
          currentContacts: null,
          currentTicketTitle: "",
          currentTicketCWCompanyId: "",
          currentTicketContactId: "",
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
          currentTicketTypeId: null,
          currentTicketTypeLabel: "",
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
        currentContacts: null,
        currentTicketTitle: "",
        currentTicketCWCompanyId: "",
        currentTicketContactId: "",
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
        currentTicketTypeId: null,
        currentTicketTypeLabel: "",

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
      },
    });
  },
}));

export default useFormsStore;
