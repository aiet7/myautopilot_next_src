import { create } from "zustand";
import useIntegrationsStore from "../integrationsStore";
import useUserStore from "@/utils/store/user/userStore";
import {
  handleGetPsaTechnicians,
  handleGetPsaInactiveDBTechnicians,
  handleGetPsaClients,
  handleGetPsaDBClients,
  handleGetPsaContacts,
  handleGetPsaDBContacts,
  handleGetRoles,
  handleGetPsaClientAndContactTypes,
  handleGetDBBoard,
  handleGetDBTeams,
  handleGetConnectWiseBoards,
} from "@/utils/api/serverProps";

const dbServiceUrl = process.env.NEXT_PUBLIC_DB_SERVICE_URL;
const connectWiseServiceUrl = process.env.NEXT_PUBLIC_CONNECTWISE_SERVICE_URL;
const emailConnectorUrl = process.env.NEXT_PUBLIC_EMAILCONNECTOR_URL;
const psaServiceUrl = process.env.NEXT_PUBLIC_PSA_SERVICE_URL;

const useManageStore = create((set, get) => ({
  technicians: null,
  techniciansTierOptions: ["Tier1", "Tier2", "Tier3", "NoTier"],
  techniciansRoleOptions: null,
  techniciansSelected: {},
  loadingTechnicians: false,

  teams: null,
  teamBoards: null,
  techniciansForBoards: null,
  loadingTechniciansAndBoards: false,
  selectedBoard: null,
  selectedTeam: null,
  showMemberSelect: false,
  showCreateTeam: false,
  teamName: "",
  selectedMembersForAdd: [],
  selectedMembersForCreation: [],

  clients: null,

  clientsSelected: {},
  clientsFilterType: "",
  loadingClients: false,

  contacts: null,
  contactsSelected: {},
  loadingContacts: false,
  finishedIntagrationShow: false,

  clientAndContactTypes: null,
  selectedAutoSyncType: null,
  autoSyncLoading: false,
  autoSyncingShow: false,
  autoSyncingCompleted: false,

  connectwiseBoardsForSync: null,
  loadingBoardsForSync: false,
  loadingSyncMerge: false,
  connectwiseSyncMerge: null,
  activeBoardToSync: null,

  connectwiseBoards: null,
  connectwiseOpenStatuses: null,
  connectwiseClosedStatuses: null,
  connectwiseDefaultPriorites: null,

  loadingBoards: false,

  connectwiseMerge: null,
  loadingMerge: false,
  loadingAiMerge: false,

  customBoardMetadata: false,
  customBoard: false,
  customBoardTitle: "",
  customBoardDepartment: null,
  customBoardLocation: null,
  customBoardMerge: null,

  activeBoard: null,

  activeConfig: false,

  activeConfigSteps: 1,

  activePage: 1,
  activePerPage: 30,
  activePageNumbers: [],

  integrationInputs: {
    connectWiseManageIntegrator: false,
    microsoftGraphIntegrator: false,
    emailIntegrator: false,
    companyId: "",
    publicKey: "",
    privateKey: "",
    emailConnectorGmail: "",
    emailConnectorAppPassword: "",
  },

  severityOptions: ["Low", "Medium", "High"],
  impactOptions: ["Low", "Medium", "High"],
  tierOptions: ["Tier1", "Tier2", "Tier3", "No Dispatching"],
  technicianTierOptions: ["Tier1", "Tier2", "Tier3"],
  durationOptions: {
    "15 Minutes": 15,
    "30 Minutes": 30,
    "45 Minutes": 45,
    "1 Hour": 60,
    "1 Hour 30 Minutes": 90,
    "2 Hours 30 Minutes": 150,
    "3 Hours 30 Minutes": 210,
    "4 Hours": 240,
  },

  successManageIntegration: false,
  successManageDisconnect: false,

  errorManageIntegration: false,
  errorManageDisconnect: false,

  successMessageCategory: false,
  errorMessageCategory: false,

  successMessageSubCategory: false,
  errorMessageSubCategory: false,

  successMessageOpenStatus: false,
  errorMessageOpenStatus: false,

  successMessageClosedStatus: false,
  errorMessageClosedStatus: false,

  successMessage: false,
  errorMessage: false,

  initializeManageTechnicians: async () => {
    const { activePerPage } = get();
    const userStore = useUserStore.getState();
    set({
      technicians: null,
      techniciansRoleOptions: null,
      loadingTechnicians: true,
    });

    if (userStore.user) {
      try {
        const [dbTechnicians, connectWiseTechnicians, newRoles] =
          await Promise.all([
            handleGetPsaInactiveDBTechnicians(userStore.user.mspCustomDomain),
            handleGetPsaTechnicians(userStore.user.mspCustomDomain),
            handleGetRoles(userStore.user.mspCustomDomain),
          ]);

        const markedTechnicians = connectWiseTechnicians.map((cwTech) => ({
          ...cwTech,
          isInDB: dbTechnicians.some(
            (dbTech) => dbTech.psaMemberId === cwTech.psaMemberId
          ),
        }));

        const totalTechs = markedTechnicians.length;
        const totalPages = Math.ceil(totalTechs / activePerPage);

        set({
          activePageNumbers: Array.from(
            { length: totalPages },
            (_, i) => i + 1
          ),
          technicians: markedTechnicians,
          techniciansRoleOptions: newRoles,
          loadingTechnicians: false,
        });
      } catch (e) {
        console.log(e);
      }
    }
  },

  initializeManageTeams: async () => {
    const userStore = useUserStore.getState();
    set({
      techniciansForBoards: null,
      teamBoards: null,
      loadingTechniciansAndBoards: true,
    });

    if (userStore.user) {
      try {
        const [dbTechnicians, dbBoards, dbTeams] = await Promise.all([
          handleGetPsaInactiveDBTechnicians(userStore.user.mspCustomDomain),
          handleGetDBBoard(userStore.user.mspCustomDomain),
          handleGetDBTeams(userStore.user.mspCustomDomain),
        ]);

        set({
          techniciansForBoards: dbTechnicians,
          teamBoards: dbBoards,
          teams: dbTeams,
          loadingTechniciansAndBoards: false,
        });
      } catch (e) {
        console.log(e);
      }
    }
  },

  initializeManageClients: async () => {
    const { activePerPage } = get();
    const userStore = useUserStore.getState();
    set({ clients: null, loadingClients: true });

    if (userStore.user) {
      try {
        const [dbClients, connectWiseClients, connectWiseTypes] =
          await Promise.all([
            handleGetPsaDBClients(userStore.user.mspCustomDomain),
            handleGetPsaClients(userStore.user.mspCustomDomain),
            handleGetPsaClientAndContactTypes(userStore.user.mspCustomDomain),
          ]);

        const markedClients = connectWiseClients.map((cwClient) => ({
          ...cwClient,
          isInDB: dbClients.some(
            (dbClient) => dbClient.psaCompanyId === cwClient.psaCompanyId
          ),
        }));

        const totalClients = markedClients.length;
        const totalPages = Math.ceil(totalClients / activePerPage);

        set({
          activePageNumbers: Array.from(
            { length: totalPages },
            (_, i) => i + 1
          ),
          clients: markedClients,
          clientAndContactTypes: connectWiseTypes,
          loadingClients: false,
        });
      } catch (e) {
        console.log(e);
      }
    }
  },

  initializeManageContacts: async () => {
    const { activePerPage } = get();
    const userStore = useUserStore.getState();
    set({ contacts: null, loadingContacts: true });

    if (userStore.user) {
      try {
        const [dbContacts, connectWiseContacts] = await Promise.all([
          handleGetPsaDBContacts(userStore.user.mspCustomDomain),
          handleGetPsaContacts(userStore.user.mspCustomDomain),
        ]);

        const markedContacts = connectWiseContacts.map((cwContact) => ({
          ...cwContact,
          isInDB: dbContacts.some(
            (dbContact) => dbContact.psaContactId === cwContact.psaContactId
          ),
        }));

        const totalContacts = markedContacts.length;
        const totalPages = Math.ceil(totalContacts / activePerPage);

        set({
          activePageNumbers: Array.from(
            { length: totalPages },
            (_, i) => i + 1
          ),
          contacts: markedContacts,
          loadingContacts: false,
        });
      } catch (e) {
        console.log(e);
      }
    }
  },

  initializeManageTickets: async () => {
    const userStore = useUserStore.getState();

    set({
      connectwiseBoardsForSync: null,
      loadingBoardsForSync: true,
    });

    if (userStore.user) {
      try {
        const boardsForSync = await handleGetConnectWiseBoards(
          userStore.user.mspCustomDomain
        );

        set({
          connectwiseBoardsForSync: boardsForSync,
          loadingBoardsForSync: false,
        });
      } catch (e) {
        console.log(e);
      }
    }
  },

  setSelectedBoard: (board) => set({ selectedBoard: board, team: null }),

  setSelectedTeam: (team) =>
    set({ selectedTeam: team, showMemberSelect: true }),

  setShowMemberSelect: (bool) =>
    set({
      showMemberSelect: bool,
      selectedMembersForAdd: [],
      selectedMembersForCreation: [],
    }),

  setShowCreateTeam: (bool) => set({ showCreateTeam: bool }),

  setTeamName: (value) => set({ teamName: value }),

  setSelectedMembersForAdd: (tech) => {
    const { selectedMembersForAdd } = get();
    if (selectedMembersForAdd.some((t) => t.id === tech.id)) {
      set({
        selectedMembersForAdd: selectedMembersForAdd.filter(
          (t) => t.id !== tech.id
        ),
      });
    } else {
      set({
        selectedMembersForAdd: [
          ...selectedMembersForAdd,
          { ...tech, tierLevel: "Tier3" },
        ],
      });
    }
  },

  setSelectedMemberForAddTier: (techId, newTier) => {
    const { selectedMembersForAdd } = get();
    const updated = selectedMembersForAdd.map((member) =>
      member.id === techId ? { ...member, tierLevel: newTier } : member
    );
    set({ selectedMembersForAdd: updated });
  },

  setSelectedMembersForCreation: (tech) => {
    const { selectedMembersForCreation } = get();
    if (selectedMembersForCreation.some((t) => t.id === tech.id)) {
      set({
        selectedMembersForCreation: selectedMembersForCreation.filter(
          (t) => t.id !== tech.id
        ),
      });
    } else {
      set({
        selectedMembersForCreation: [
          ...selectedMembersForCreation,
          { ...tech, tierLevel: "Tier3" },
        ],
      });
    }
  },

  setSelectedMembersForCreationTier: (techId, newTier) => {
    const { selectedMembersForCreation } = get();
    const updated = selectedMembersForCreation.map((member) =>
      member.id === techId ? { ...member, tierLevel: newTier } : member
    );
    set({ selectedMembersForCreation: updated });
  },

  setConnectwiseBoard: (board) =>
    set({
      connectwiseBoards: board,
      errorMessage: false,
      successMessage: false,
    }),

  setActiveConfigStep: (step) => {
    set({
      technicians: null,
      teams: null,
      teamBoards: null,
      techniciansForBoards: null,
      loadingTechniciansAndBoards: false,
      selectedBoard: null,
      selectedTeam: null,
      showMemberSelect: false,
      showCreateTeam: false,
      teamName: "",
      selectedMembersForAdd: [],
      selectedMembersForCreation: [],

      clients: null,
      contacts: null,

      connectwiseBoardsForSync: null,
      loadingBoardsForSync: false,
      loadingSyncMerge: false,
      connectwiseSyncMerge: null,
      activeBoardToSync: null,

      customMerge: null,
      connectwiseMerge: null,
      connectwiseOpenStatuses: null,
      connectwiseClosedStatuses: null,
      customBoardMetadata: false,
      customBoard: false,
      activeConfigSteps: step,
      successMessage: false,
      errorMessage: false,
      successMessageCategory: false,
      errorMessageCategory: false,

      successMessageSubCategory: false,
      errorMessageSubCategory: false,

      successMessageOpenStatus: false,
      errorMessageOpenStatus: false,

      successMessageClosedStatus: false,
      errorMessageClosedStatus: false,
      activePage: 1,
      activePageNumbers: [],
    });
  },

  setActiveConfigPreviousStep: () => {
    const { activeConfigSteps } = get();
    if (activeConfigSteps > 1) {
      set({
        technicians: null,
        teams: null,
        teamBoards: null,
        techniciansForBoards: null,
        loadingTechniciansAndBoards: false,
        selectedBoard: null,
        selectedTeam: null,
        showMemberSelect: false,
        showCreateTeam: false,
        teamName: "",
        selectedMembersForAdd: [],
        selectedMembersForCreation: [],

        clients: null,

        connectwiseBoardsForSync: null,
        loadingBoardsForSync: false,
        loadingSyncMerge: false,
        connectwiseSyncMerge: null,
        activeBoardToSync: null,

        contacts: null,
        customMerge: null,
        connectwiseMerge: null,
        connectwiseOpenStatuses: null,
        connectwiseDefaultPriorites: null,
        connectwiseClosedStatuses: null,
        customBoardMetadata: false,
        customBoard: false,
        successMessage: false,
        errorMessage: false,
        successMessageCategory: false,
        errorMessageCategory: false,

        successMessageSubCategory: false,
        errorMessageSubCategory: false,

        successMessageOpenStatus: false,
        errorMessageOpenStatus: false,

        successMessageClosedStatus: false,
        errorMessageClosedStatus: false,
        activeConfigSteps: activeConfigSteps - 1,
        activePage: 1,
        activePageNumbers: [],
      });
    }
  },

  setActiveConfigNextStep: () => {
    const { activeConfigSteps } = get();
    if (activeConfigSteps < 6) {
      set({
        technicians: null,
        teams: null,
        teamBoards: null,
        techniciansForBoards: null,
        loadingTechniciansAndBoards: false,
        selectedBoard: null,
        selectedTeam: null,
        showMemberSelect: false,
        showCreateTeam: false,
        teamName: "",
        selectedMembersForAdd: [],
        selectedMembersForCreation: [],

        clients: null,

        connectwiseBoardsForSync: null,
        loadingBoardsForSync: false,
        loadingSyncMerge: false,
        connectwiseSyncMerge: null,
        activeBoardToSync: null,

        contacts: null,
        customMerge: null,
        connectwiseMerge: null,
        connectwiseOpenStatuses: null,
        connectwiseDefaultPriorites: null,
        connectwiseClosedStatuses: null,
        customBoardMetadata: false,
        customBoard: false,
        successMessage: false,
        errorMessage: false,
        successMessageCategory: false,
        errorMessageCategory: false,

        successMessageSubCategory: false,
        errorMessageSubCategory: false,

        successMessageOpenStatus: false,
        errorMessageOpenStatus: false,

        successMessageClosedStatus: false,
        errorMessageClosedStatus: false,
        activeConfigSteps: activeConfigSteps + 1,
        activePage: 1,
        activePageNumbers: [],
      });
    }
  },

  setActivePage: (page) => {
    set({ activePage: page });
  },

  setCloseConfiguration: () => {
    const { clearManage } = get();
    clearManage();
  },

  setActiveConfig: async (config, mspCustomDomain) => {
    const { handleGetBoards } = get();
    await handleGetBoards(mspCustomDomain);
    set({
      activeConfig: config,
    });
  },

  setIntegrationInputs: (type, field, value) =>
    set((prevState) =>
      type === "checkbox"
        ? {
            integrationInputs: {
              ...prevState.integrationInputs,
              [field]: !prevState.integrationInputs[field],
            },
          }
        : {
            integrationInputs: {
              ...prevState.integrationInputs,
              [field]: value,
            },
          }
    ),

  setBoardInputs: (typeId, subTypeId, field, value, id, name) => {
    set((prevState) => {
      const updatedConnectWiseConfig = {
        ...prevState.connectwiseMerge.connectWiseConfig,
        boardDetails:
          prevState.connectwiseMerge.connectWiseConfig.boardDetails.map(
            (board, index) => {
              if (index === 0) {
                let updatedBoard = { ...board };

                if (typeId === null && subTypeId === null) {
                  if (field === "newCreatingTicketStatus") {
                    updatedBoard.newCreatingTicketStatus = name;
                    updatedBoard.newCreatingTicketStatusId = parseInt(id);
                  } else if (field === "closingTicketStatus") {
                    updatedBoard.closingTicketStatus = name;
                    updatedBoard.closingTicketStatusId = parseInt(id);
                  }
                } else {
                  const updatedCategories =
                    updatedBoard.mspConnectWiseBoardTypes.map((type) => {
                      if (type.typeId === typeId) {
                        if (field === "typeName" && subTypeId == null) {
                          return { ...type, typeName: value };
                        } else {
                          const updatedSubCategories =
                            type.mspConnectWiseBoardSubTypes.map((subType) => {
                              if (subType.subTypeId === subTypeId) {
                                if (field === "subTypeName") {
                                  return { ...subType, subTypeName: value };
                                } else if (field === "priority") {
                                  return {
                                    ...subType,
                                    priorityId: parseInt(id),
                                    priority: name,
                                  };
                                } else if (field === "priorityScore") {
                                  return {
                                    ...subType,
                                    priorityScore: parseInt(value) || value,
                                  };
                                } else if (field === "subTypeScore") {
                                  return {
                                    ...subType,
                                    subTypeScore: parseInt(value) || value,
                                  };
                                } else {
                                  return { ...subType, [field]: id };
                                }
                              }
                              return subType;
                            });

                          return {
                            ...type,
                            mspConnectWiseBoardSubTypes: updatedSubCategories,
                          };
                        }
                      }
                      return type;
                    });

                  updatedBoard.mspConnectWiseBoardTypes = updatedCategories;
                }

                return updatedBoard;
              }
              return board;
            }
          ),
      };

      return {
        ...prevState,
        connectwiseMerge: {
          ...prevState.connectwiseMerge,
          connectWiseConfig: updatedConnectWiseConfig,
        },
      };
    });
  },

  setCustomBoardInputs: (categoryId, subCategoryId, field, value, id, name) => {
    set((prevState) => {
      if (categoryId === null && subCategoryId === null) {
        if (field === "boardTitle") {
          return { ...prevState, customBoardTitle: value };
        } else if (field === "department") {
          const departmentId = parseInt(id);
          return {
            ...prevState,
            customBoardDepartment: { id: departmentId, name },
          };
        } else if (field === "location") {
          const locationId = parseInt(id);
          return {
            ...prevState,
            customBoardLocation: { id: locationId, name },
          };
        }
      }

      const updatedCategorizations =
        prevState.customBoardMerge.mspConnectWiseManageCategorizations.map(
          (category) => {
            if (category.categoryId === categoryId) {
              if (subCategoryId === null) {
                return { ...category, [field]: value };
              } else {
                const updatedSubCats =
                  category.mspConnectWiseManageSubCategorizations.map(
                    (subCat) => {
                      if (subCat.subCategoryId === subCategoryId) {
                        return { ...subCat, [field]: value };
                      }
                      return subCat;
                    }
                  );
                return {
                  ...category,
                  mspConnectWiseManageSubCategorizations: updatedSubCats,
                };
              }
            }
            return category;
          }
        );

      return {
        ...prevState,
        customBoardMerge: {
          ...prevState.customBoardMerge,
          mspConnectWiseManageCategorizations: updatedCategorizations,
        },
      };
    });
  },

  setNewCustomCategory: (isCustomBoard) =>
    set((prevState) => {
      const mergeKey = isCustomBoard ? "customBoardMerge" : "connectwiseMerge";

      const updatedBoardDetails = prevState[
        mergeKey
      ].connectWiseConfig.boardDetails.map((board) => {
        const newTempIndex = board.mspConnectWiseBoardTypes.length + 1;

        const newCategory = {
          typeId: Date.now(),
          typeName: "",
          mspConnectWiseBoardSubTypes: [],
          isNew: true,
          tempIndex: newTempIndex,
        };

        return {
          ...board,
          mspConnectWiseBoardTypes: [
            ...board.mspConnectWiseBoardTypes,
            newCategory,
          ],
        };
      });

      return {
        ...prevState,
        [mergeKey]: {
          ...prevState[mergeKey],
          connectWiseConfig: {
            ...prevState[mergeKey].connectWiseConfig,
            boardDetails: updatedBoardDetails,
          },
        },
      };
    }),

  setNewCustomSubcategory: (typeId, isCustomBoard) =>
    set((prevState) => {
      const mergeKey = isCustomBoard ? "customBoardMerge" : "connectwiseMerge";

      const defaultPriority = prevState.connectwiseDefaultPriorites[0] 

      const updatedBoardDetails = prevState[
        mergeKey
      ].connectWiseConfig.boardDetails.map((board) => {
        const categoryIndex = board.mspConnectWiseBoardTypes.findIndex(
          (category) => category.typeId === typeId
        );

        if (categoryIndex === -1) return board; 

        const subcategories =
          board.mspConnectWiseBoardTypes[categoryIndex]
            .mspConnectWiseBoardSubTypes || [];
        const newTempIndex =
          subcategories.length > 0
            ? Math.max(...subcategories.map((sc) => sc.tempIndex || 0)) + 1
            : 0;

        const newSubcategory = {
          subTypeId: Date.now(),
          subTypeName: "",
          isNew: true,
          tempIndex: newTempIndex,
          priorityId: defaultPriority ? defaultPriority.id : null, 
          priority: defaultPriority ? defaultPriority.name : "", 
          tier: "Tier1", 
        };

        const updatedBoardTypes = [...board.mspConnectWiseBoardTypes];
        updatedBoardTypes[categoryIndex].mspConnectWiseBoardSubTypes = [
          ...subcategories,
          newSubcategory,
        ];

        return {
          ...board,
          mspConnectWiseBoardTypes: updatedBoardTypes,
        };
      });

      return {
        ...prevState,
        [mergeKey]: {
          ...prevState[mergeKey],
          connectWiseConfig: {
            ...prevState[mergeKey].connectWiseConfig,
            boardDetails: updatedBoardDetails,
          },
        },
      };
    }),

  setSelectedTechnicians: (technicianId, field, value) =>
    set((prevState) => {
      const techniciansSelected = { ...prevState.techniciansSelected };
      if (!techniciansSelected[technicianId]) {
        techniciansSelected[technicianId] = {
          selected: false,
          tier: "",
          roleId: "",
        };
      }
      techniciansSelected[technicianId][field] = value;
      return { techniciansSelected };
    }),

  setSelectAllTechnicians: (selectAll) => {
    set((prevState) => {
      const technicians = prevState.technicians || [];
      const techniciansSelected = { ...prevState.techniciansSelected };

      technicians.forEach((technician) => {
        if (!techniciansSelected[technician.psaMemberId]) {
          techniciansSelected[technician.psaMemberId] = {
            selected: false,
            tier: "",
            roleId: "",
          };
        }
        techniciansSelected[technician.psaMemberId].selected = selectAll;
      });

      return { techniciansSelected };
    });
  },

  setSelectedClients: (clientId, value) =>
    set((prevState) => {
      const clientsSelected = { ...prevState.clientsSelected };
      if (!clientsSelected[clientId]) {
        clientsSelected[clientId] = {
          selected: false,
        };
      }

      clientsSelected[clientId].selected = value;
      return { clientsSelected };
    }),

  setSelectAllClients: (selectAll) => {
    set((prevState) => {
      const clients = prevState.clients || [];
      const clientsSelected = { ...prevState.psaCompanyId };

      clients.forEach((client) => {
        if (!clientsSelected[client.psaCompanyId]) {
          clientsSelected[client.psaCompanyId] = { selected: false };
        }
        clientsSelected[client.psaCompanyId].selected = selectAll;
      });

      return { clientsSelected };
    });
  },

  setClientsFilterType: (filter) => {
    set({ clientsFilterType: filter });
  },

  setSelectedAutoSyncType: (id, name) => {
    set({ selectedAutoSyncType: { id, name } });
  },

  setSelectedContacts: (clientId, value) =>
    set((prevState) => {
      const contactsSelected = { ...prevState.contactsSelected };
      if (!contactsSelected[clientId]) {
        contactsSelected[clientId] = {
          selected: false,
        };
      }

      contactsSelected[clientId].selected = value;
      return { contactsSelected };
    }),

  setSelectAllContacts: (selectAll) => {
    set((prevState) => {
      const contacts = prevState.contacts || [];
      const contactsSelected = { ...prevState.contactsSelected };

      contacts.forEach((contact) => {
        if (!contactsSelected[contact.psaContactId]) {
          contactsSelected[contact.psaContactId] = { selected: false };
        }
        contactsSelected[contact.psaContactId].selected = selectAll;
      });

      return { contactsSelected };
    });
  },

  setAutoSyncToast: (toast, completed) => {
    set({ autoSyncingShow: toast, autoSyncingCompleted: completed });
  },

  setFinishedIntegratingToast: (toast) => {
    set({ finishedIntagrationShow: toast });
  },

  handleSaveManageKeys: async (mspCustomDomain) => {
    const { integrationInputs } = get();
    const { handleUpdateMSPIntegrations } = useIntegrationsStore.getState();

    const {
      connectWiseManageIntegrator,
      microsoftGraphIntegrator,
      emailIntegrator,
      ...connectWiseManageIntegration
    } = integrationInputs;

    try {
      const response = await fetch(
        `${dbServiceUrl}/${mspCustomDomain}/integrations/update`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            mspCustomDomain: mspCustomDomain,
            connectWiseManageIntegration: connectWiseManageIntegration,
          }),
        }
      );

      if (response.status === 200) {
        const updatedIntegrations = await response.json();
        handleUpdateMSPIntegrations(updatedIntegrations);
        set({
          successManageIntegration: false,
          successManageDisconnect: false,

          errorManageIntegration: false,
          errorManageDisconnect: false,
        });
        console.log("MANAGE KEYS SAVED");
      } else {
        set({
          successManageDisconnect: false,
          successManageIntegration: false,

          errorManageIntegration: false,
          errorManageDisconnect: false,
        });
        console.log("MANAGE KEYS FAILED TO SAVE");
      }
    } catch (e) {
      console.log(e);
    }
  },

  handleRemoveManageKeys: async (mspCustomDomain) => {
    const { handleUpdateMSPIntegrations } = useIntegrationsStore.getState();

    try {
      const response = await fetch(
        `${dbServiceUrl}/${mspCustomDomain}/integrations/update`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            mspCustomDomain: mspCustomDomain,
            connectWiseManageIntegration: {
              companyId: "",
              publicKey: "",
              privateKey: "",
            },
          }),
        }
      );

      if (response.status === 200) {
        const updatedIntegrations = await response.json();
        handleUpdateMSPIntegrations(updatedIntegrations);
        set({
          successManageDisconnect: false,
          successManageIntegration: false,

          errorManageIntegration: false,
          errorManageDisconnect: false,
        });

        console.log("MANAGE KEYS REMOVED");
      } else {
        set({
          successManageDisconnect: false,
          successManageIntegration: false,

          errorManageIntegration: false,
          errorManageDisconnect: false,
        });
        console.log("MANAGE KEYS FAILED TO REMOVE");
      }
    } catch (e) {
      console.log(e);
    }
  },

  handleIntegrateManage: async (mspCustomDomain) => {
    const { handleUpdateMSPIntegrations } = useIntegrationsStore.getState();
    try {
      const response = await fetch(
        `${psaServiceUrl}/getConnectWiseBoards?mspCustomDomain=${mspCustomDomain}`
      );

      if (response.status === 200) {
        const boards = await response.json();
        set({
          connectwiseBoards: boards,
        });
        const updatedResponse = await fetch(
          `${dbServiceUrl}/${mspCustomDomain}/integrations/updateConnectWiseManageIntegrator?status=${true}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (updatedResponse.status === 200) {
          const updatedIntegrations = await updatedResponse.json();
          handleUpdateMSPIntegrations(updatedIntegrations);

          set({
            successManageIntegration: true,
            successManageDisconnect: false,

            errorManageIntegration: false,
            errorManageDisconnect: false,
          });
        } else {
          set({
            connectwiseBoards: null,
            successManageIntegration: false,
            successManageDisconnect: false,

            errorManageIntegration: true,
            errorManageDisconnect: false,
          });
        }
      } else {
        set({
          connectwiseBoards: null,

          successManageIntegration: false,
          successManageDisconnect: false,

          errorManageIntegration: true,
          errorManageDisconnect: false,
        });
      }
    } catch (e) {
      console.log(e);
    }
  },

  // handleIntegrateEmailConnector: async (mspCustomDomain) => {
  //   const { integrationInputs } = get();
  //   const { handleUpdateMSPIntegrations } = useIntegrationsStore.getState();

  //   if (integrationInputs.emailConnectorGmail.trim() !== "") {
  //     try {
  //       const response = await fetch(`${emailConnectorUrl}/testCredentials`, {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           email: integrationInputs.emailConnectorGmail,
  //           password: integrationInputs.emailConnectorAppPassword,
  //           mspCustomDomain: mspCustomDomain,
  //         }),
  //       });
  //       if (response.status === 200) {
  //         const updatedIntegrations = await response.json();
  //         handleUpdateMSPIntegrations(updatedIntegrations);
  //         console.log("EMAIL CONNECTOR INTEGRATED");
  //       } else {
  //         console.log("EMAIL CONNECTOR FAILED");
  //       }
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   }
  // },

  handleDisconnectManage: async (mspCustomDomain) => {
    const { handleUpdateMSPIntegrations } = useIntegrationsStore.getState();

    try {
      const response = await fetch(
        `${dbServiceUrl}/${mspCustomDomain}/integrations/update`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            mspCustomDomain: mspCustomDomain,
            connectWiseManageIntegration: {
              companyId: "",
              publicKey: "",
              privateKey: "",
            },
          }),
        }
      );

      if (response.status === 200) {
        const updatedResponse = await fetch(
          `${dbServiceUrl}/${mspCustomDomain}/integrations/updateConnectWiseManageIntegrator?status=${false}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const updatedIntegrations = await updatedResponse.json();

        handleUpdateMSPIntegrations(updatedIntegrations);
        set({
          technicians: null,
          clients: null,
          contacts: null,
          connectwiseBoards: null,
          connectwiseMerge: null,
          connectwiseOpenStatuses: null,
          connectwiseDefaultPriorites: null,
          connectwiseClosedStatuses: null,
          customBoard: false,
          customBoardMerge: null,
          customBoardMetadata: false,

          successManageDisconnect: true,
          successManageIntegration: false,

          errorManageIntegration: false,
          errorManageDisconnect: false,

          activeConfig: false,
          activeConfigSteps: 1,
          activePage: 1,
        });
        console.log("MANAGE DISCONNECTED");
      } else {
        set({
          successManageDisconnect: false,
          successManageIntegration: false,

          errorManageIntegration: false,
          errorManageDisconnect: true,
        });
        console.log("FAILED DISCONNECTION");
      }
    } catch (e) {
      console.log(e);
    }
  },

  // handleDisconnectEmailIntegrator: async (mspCustomDomain) => {
  //   const { handleUpdateMSPIntegrations } = useIntegrationsStore.getState();
  //   try {
  //     const response = await fetch(
  //       `${dbServiceUrl}/${mspCustomDomain}/integrations/update`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           mspCustomDomain: mspCustomDomain,
  //           connectWiseManageIntegration: {
  //             emailIntegrator: false,
  //             emailId: "",
  //             password: "",
  //           },
  //         }),
  //       }
  //     );

  //     if (response.status === 200) {
  //       const updatedIntegrations = await response.json();
  //       handleUpdateMSPIntegrations(updatedIntegrations);
  //       set({ errorMessage: false, successMessage: true });
  //       console.log("EMAILCONNECTOR DISCONNECTED");
  //     } else {
  //       set({ errorMessage: true, successMessage: false });
  //       console.log("FAILED EMAILCONNECTOR DISCONNECTION");
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   }
  // },

  handleGetBoards: async (mspCustomDomain) => {
    try {
      const response = await fetch(
        `${psaServiceUrl}/getConnectWiseBoards?mspCustomDomain=${mspCustomDomain}`
      );

      if (response.status === 200) {
        const boards = await response.json();
        set({
          connectwiseBoards: boards,
        });
      }
    } catch (e) {
      console.log(e);
    }
  },

  handleGenerateAIBoard: async () => {
    const { connectwiseMerge } = get();
    const { openStatus, closedStatus } = connectwiseMerge;
    set({
      loadingAiMerge: true,
    });
    try {
      const response = await fetch(
        `${connectWiseServiceUrl}/getMergedConnectWiseCategorizationWithGpt`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(connectwiseMerge),
        }
      );

      if (response.status === 200) {
        const generatedAiBoard = await response.json();
        console.log("Generated AI Board Complete!");

        const updatedAiBoard = {
          ...generatedAiBoard,
          openStatus: openStatus,
          closedStatus: closedStatus,
        };
        set({
          connectwiseMerge: updatedAiBoard,
          loadingAiMerge: false,
        });
      } else {
        console.log("Failed To Generate AI Board");
        set({ loadingAiMerge: false });
      }
    } catch (e) {
      console.log(e);
    }
  },

  handleGetDBBoardDetails: async (mspCustomDomain, board) => {
    try {
      const response = await fetch(
        `${dbServiceUrl}/${mspCustomDomain}/getPSATicketingConfiguration`
      );

      if (response.status === 200) {
        const boardDBmerge = await response.json();
        set({
          activeBoardToSync: board,
          connectwiseSyncMerge: boardDBmerge,
        });
        console.log("DB Boards Fetched!");
      } else {
        console.log("DB Boards Error");
      }
    } catch (e) {
      console.log(e);
    }
  },

  handleGetBoardDetails: async (id, boardName, mspCustomDomain) => {
    const {
      handleCustomBoardMetadata,
      handleGetBoardStatuses,
      handleGetBoardDefaultPriorities,
    } = get();
    if (id === "custom") {
      set({
        connectwiseMerge: null,
        loadingMerge: false,
        activeBoard: null,
        customBoard: false,
        customBoardMetadata: true,
        connectwiseOpenStatuses: null,
        connectwiseDefaultPriorites: null,
        connectwiseClosedStatuses: null,
      });
      await handleCustomBoardMetadata();
    } else {
      set({
        loadingMerge: true,
        activeBoard: id,
        customBoard: false,
        customBoardMetadata: false,
        connectwiseOpenStatuses: null,
        connectwiseDefaultPriorites: null,
        connectwiseClosedStatuses: null,
      });

      try {
        const response = await fetch(
          `${psaServiceUrl}/getMergedConnectWiseCategorizationWithoutImpactSeverity?mspCustomDomain=${mspCustomDomain}&boardId=${id}&boardName=${boardName}`
        );

        if (response.status === 200) {
          const merge = await response.json();
          await Promise.all([
            handleGetBoardStatuses(id, mspCustomDomain),
            handleGetBoardDefaultPriorities(mspCustomDomain),
          ]);
          set({ connectwiseMerge: merge, loadingMerge: false });
        } else {
          console.log("Error");
        }
      } catch (e) {
        console.log(e);
      }
    }
  },

  handleGetBoardStatuses: async (id, mspCustomDomain) => {
    try {
      const response = await fetch(
        `${psaServiceUrl}/getConnectWiseStatuses?boardId=${id}&mspCustomDomain=${mspCustomDomain}`
      );

      if (response.status === 200) {
        const statuses = await response.json();
        set({
          connectwiseOpenStatuses: statuses,
          connectwiseClosedStatuses: statuses,
        });
      } else {
        console.log("Failed loading statuses");
      }
    } catch (e) {
      console.log(e);
    }
  },

  handleGetBoardDefaultPriorities: async (mspCustomDomain) => {
    try {
      const response = await fetch(
        `${psaServiceUrl}/getConnectWisePriorities?mspCustomDomain=${mspCustomDomain}`
      );

      if (response.status === 200) {
        const defaultPriorites = await response.json();

        set({
          connectwiseDefaultPriorites: defaultPriorites,
        });
      } else {
        console.log("Failed loading default priorites");
      }
    } catch (e) {}
  },

  handleCreateOpenStatus: async (mspCustomDomain) => {
    try {
      const { connectwiseMerge, connectwiseBoards, activeBoard } = get();
      const activeBoardDetails = connectwiseBoards.find(
        (board) => board.id === parseInt(activeBoard)
      );

      const openStatus =
        connectwiseMerge.connectWiseConfig.boardDetails[0]
          .newCreatingTicketStatus;

      if (!openStatus) {
        console.error("Open status not found.");
        return;
      }

      const response = await fetch(
        `${psaServiceUrl}/createStatus?mspCustomDomain=${mspCustomDomain}&boardId=${activeBoardDetails.id}&statusName=${openStatus}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        console.log("Open status created!");
        set({
          successMessageOpenStatus: true,
          errorMessageOpenStatus: false,

          successMessageClosedStatus: false,
          errorMessageClosedStatus: false,
        });
      } else {
        console.log("Open status failed");
        set({
          successMessageOpenStatus: false,
          errorMessageOpenStatus: true,

          successMessageClosedStatus: false,
          errorMessageClosedStatus: false,
        });
      }
    } catch (e) {
      console.log(e);
    }
  },

  handleCreateClosedStatus: async (mspCustomDomain) => {
    const { connectwiseMerge, connectwiseBoards, activeBoard } = get();
    const activeBoardDetails = connectwiseBoards.find(
      (board) => board.id === parseInt(activeBoard)
    );

    try {
      const closedStatus =
        connectwiseMerge.connectWiseConfig.boardDetails[0].closingTicketStatus;

      if (!closedStatus) {
        console.error("Closed status not found.");
        return;
      }

      const response = await fetch(
        `${psaServiceUrl}/createStatus?mspCustomDomain=${mspCustomDomain}&boardId=${activeBoardDetails.id}&statusName=${closedStatus}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        console.log("Closed status created!");
        set({
          successMessageClosedStatus: true,
          errorMessageClosedStatus: false,

          successMessageOpenStatus: false,
          errorMessageOpenStatus: false,
        });
      } else {
        console.log("Closed status failed");
        set({
          successMessageClosedStatus: false,
          errorMessageClosedStatus: true,

          successMessageOpenStatus: false,
          errorMessageOpenStatus: false,
        });
      }
    } catch (e) {
      console.log(e);
    }
  },

  handleCustomBoardMetadata: async () => {
    const userStore = useUserStore.getState();
    const departmentsURL = `${psaServiceUrl}/getConnectWiseDepartments?mspCustomDomain=${userStore.user.mspCustomDomain}`;
    const locationsURL = `${psaServiceUrl}/getConnectWiseLocations?mspCustomDomain=${userStore.user.mspCustomDomain}`;

    try {
      const [departmentsResponse, locationsResponse] = await Promise.all([
        fetch(departmentsURL),
        fetch(locationsURL),
      ]);

      if (
        departmentsResponse.status === 200 &&
        locationsResponse.status === 200
      ) {
        const departmentsList = await departmentsResponse.json();
        const locationsList = await locationsResponse.json();

        set({
          customBoardMerge: {
            departmentsList: departmentsList,
            locationsList: locationsList,
          },
          connectwiseMerge: null,
          customBoardMetadata: true,
          customBoardTitle: "",
          customBoardDepartment: null,
          customBoardLocation: null,
          activeBoard: null,
          errorMessage: false,
          successMessage: false,
        });
      } else {
        console.log("Failed to fetch metadata.");
      }
    } catch (e) {
      console.log(e);
    }
  },

  handleCustomBoard: async () => {
    const userStore = useUserStore.getState();
    const templateURL = `${dbServiceUrl}/default-et7-board-template/connectWiseManageDetails`;
    const prioritiesURL = `${psaServiceUrl}/getConnectWisePriorities?mspCustomDomain=${userStore.user.mspCustomDomain}`;

    try {
      const [templateResponse, prioritiesResponse] = await Promise.all([
        fetch(templateURL),
        fetch(prioritiesURL),
      ]);

      if (
        templateResponse.status === 200 &&
        prioritiesResponse.status === 200
      ) {
        const customMerge = await templateResponse.json();
        const prioritiesList = await prioritiesResponse.json();

        set((prevState) => ({
          ...prevState,
          customBoardMerge: {
            ...prevState.customBoardMerge,
            mspConnectWiseManageCategorizations:
              customMerge.mspConnectWiseManageCategorizations,
            prioritiesList: prioritiesList,
          },
          customBoard: true,
          activeBoard: null,
          errorMessage: false,
          successMessage: false,
        }));
      } else {
        console.log("Failed to fetch custom");
      }
    } catch (e) {
      console.log(e);
    }
  },

  handleCreateCategory: async (mspCustomDomain, tempIndex) => {
    const { connectwiseMerge, connectwiseBoards, activeBoard } = get();

    const activeBoardDetails = connectwiseBoards.find(
      (board) => board.id === parseInt(activeBoard)
    );
    const categoryToSave = connectwiseMerge.connectWiseConfig.boardDetails
      .flatMap((board) => board.mspConnectWiseBoardTypes)
      .find((type) => type.tempIndex === tempIndex);

    try {
      const response = await fetch(
        `${psaServiceUrl}/createCategory?mspCustomDomain=${mspCustomDomain}&boardId=${activeBoardDetails.id}&categoryName=${categoryToSave.typeName}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        const newCategoryDetails = await response.json();
        set((prevState) => {
          const updatedMerge = { ...prevState.connectwiseMerge };

          updatedMerge.connectWiseConfig.boardDetails =
            updatedMerge.connectWiseConfig.boardDetails.map((board) => {
              if (board.boardId === activeBoardDetails.id) {
                return {
                  ...board,
                  mspConnectWiseBoardTypes: board.mspConnectWiseBoardTypes.map(
                    (type) => {
                      if (type.tempIndex === tempIndex) {
                        return {
                          ...type,
                          typeId: newCategoryDetails.id,
                          typeName: newCategoryDetails.name,
                          isNew: false,
                        };
                      }
                      return type;
                    }
                  ),
                };
              }
              return board;
            });

          return {
            ...prevState,
            connectwiseMerge: updatedMerge,
            successMessageCategory: true,
            errorMessageCategory: false,
          };
        });
        console.log("created new category");
        set({
          successMessageCategory: true,
          errorMessageCategory: false,
        });
      } else {
        console.log("Failed to create category!");
        set({
          successMessageCategory: false,
          errorMessageCategory: true,
        });
      }
    } catch (e) {
      console.log(e);
    }
  },

  handleCreateSubCategory: async (mspCustomDomain, tempIndex, categoryId) => {
    const { connectwiseMerge, connectwiseBoards, activeBoard } = get();
    const activeBoardDetails = connectwiseBoards.find(
      (board) => board.id === parseInt(activeBoard)
    );

    const type = connectwiseMerge.connectWiseConfig.boardDetails
      .flatMap((board) => board.mspConnectWiseBoardTypes)
      .find((type) => type.typeId === categoryId);

    const subCategoryToSave = type.mspConnectWiseBoardSubTypes.find(
      (subType) => subType.tempIndex === tempIndex
    );

    try {
      const response = await fetch(
        `${psaServiceUrl}/createSubCategory?mspCustomDomain=${mspCustomDomain}&boardId=${activeBoardDetails.id}&subCategoryName=${subCategoryToSave.subTypeName}&categoryId=${categoryId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        const newSubCategoryDetails = await response.json();

        set((prevState) => {
          const updatedMerge = { ...prevState.connectwiseMerge };

          updatedMerge.connectWiseConfig.boardDetails =
            updatedMerge.connectWiseConfig.boardDetails.map((board) => {
              if (board.boardId === activeBoardDetails.id) {
                return {
                  ...board,
                  mspConnectWiseBoardTypes: board.mspConnectWiseBoardTypes.map(
                    (type) => {
                      if (type.typeId === categoryId) {
                        return {
                          ...type,
                          mspConnectWiseBoardSubTypes:
                            type.mspConnectWiseBoardSubTypes.map((subType) => {
                              if (subType.tempIndex === tempIndex) {
                                return {
                                  ...subType,
                                  subTypeId: newSubCategoryDetails.id,
                                  subTypeName: newSubCategoryDetails.name,
                                  isNew: false,
                                  typeAssociationIds:
                                    newSubCategoryDetails.typeAssociationIds,
                                };
                              }
                              return subType;
                            }),
                        };
                      }
                      return type;
                    }
                  ),
                };
              }
              return board;
            });

          return {
            ...prevState,
            connectwiseMerge: updatedMerge,
            successMessageSubCategory: true,
            errorMessageSubCategory: false,
          };
        });
      } else {
        console.log("Failed to create subcategory");
        set({
          successMessageSubCategory: false,
          errorMessageSubCategory: true,
        });
      }
    } catch (e) {
      console.log(e);
    }
  },

  handleSaveBoard: async (mspCustomDomain) => {
    const { connectwiseMerge } = get();
    try {
      const response = await fetch(
        `${dbServiceUrl}/${mspCustomDomain}/addUpdatePSATicketingConfiguration`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            mspCustomDomain: mspCustomDomain,
            psaType: connectwiseMerge.psaType,
            ...connectwiseMerge,
          }),
        }
      );

      if (response.status === 201) {
        set({
          activeConfigSteps: 2,
          errorMessage: false,
          successMessage: true,
        });
      } else {
        set({
          errorMessage: true,
          successMessage: false,
          connectwiseAddTeams: false,
        });
      }
    } catch (error) {
      set({
        errorMessage: true,
        successMessage: false,
        connectwiseAddTeams: false,
      });
    }
  },

  handleSaveCustomBoardMetadata: async (mspCustomDomain) => {
    const {
      customBoardTitle,
      customBoardLocation,
      customBoardDepartment,
      handleCustomBoard,
    } = get();
    if (customBoardTitle.trim() !== "") {
      try {
        const response = await fetch(
          `${psaServiceUrl}/createConnectWiseBoard?mspCustomDomain=${mspCustomDomain}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: customBoardTitle,
              location: customBoardLocation,
              department: customBoardDepartment,
            }),
          }
        );

        if (response.status === 200) {
          const newBoard = await response.json();
          set((prevState) => ({
            ...prevState,
            connectwiseBoards: [...prevState.connectwiseBoards, newBoard],
            customBoardMerge: {
              ...prevState.customBoardMerge,
              boardId: newBoard.id,
            },
          }));
          await handleCustomBoard();
        } else {
          console.log("Error Saving Custom Metadata");
        }
      } catch (e) {
        console.log(e);
      }
    }
  },

  handleSaveCustomBoard: async (mspCustomDomain) => {
    const { customBoardMerge } = get();

    const boardSetupRequest = {
      mspConnectWiseManageCategorizations:
        customBoardMerge.mspConnectWiseManageCategorizations
          .map((category) => ({
            ...category,
            mspConnectWiseManageSubCategorizations:
              category.mspConnectWiseManageSubCategorizations.map(
                (subCategory) => {
                  const { subCategoryId, ...cleanedSubcategory } = subCategory;
                  return cleanedSubcategory;
                }
              ),
          }))
          .map(({ categoryId, ...cleanedCategory }) => cleanedCategory),
    };

    try {
      const response = await fetch(
        `${connectWiseServiceUrl}/createDefaultBoardSetup?boardId=${customBoardMerge.boardId}&mspCustomDomain=${mspCustomDomain}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(boardSetupRequest),
        }
      );

      if (response.status === 200) {
        console.log("CUSTOM BOARD SAVED!");
        set({ errorMessage: false, successMessage: true });
      } else {
        console.log("ERROR SAVING CUSTOM BOARD");
        set({ errorMessage: true, successMessage: false });
      }
    } catch (e) {
      console.log(e);
    }
  },

  handleAddManageTechnician: async (mspCustomDomain) => {
    const { techniciansSelected, technicians } = get();

    const selectedTechniciansPayload = technicians
      .filter(
        (technician) => techniciansSelected[technician.psaMemberId]?.selected
      )
      .map((technician) => {
        const additionalData = techniciansSelected[technician.psaMemberId];
        return {
          ...technician,
          tier: additionalData?.tier || "Tier1",
          roleId: additionalData?.roleId || "653ff1ff6a55f75b62a1b557",
          mspCustomDomain,
        };
      });

    try {
      const response = await fetch(
        `${dbServiceUrl}/${encodeURIComponent(mspCustomDomain)}/addPSAMembers`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(selectedTechniciansPayload),
        }
      );

      if (response.status === 200) {
        set({
          activeConfigSteps: 3,
          successMessage: true,
          techniciansSelected: {},
          errorMessage: false,
        });

        console.log("MANAGE TECH ADDED");
      } else {
        set({ successMessage: false, errorMessage: true });
        console.log("ERROR ADDING MANAGE TECH");
      }
    } catch (e) {
      console.log(e);
    }
  },

  handleAddTeamMembers: async () => {
    const { selectedTeam, selectedMembersForAdd } = get();
    if (
      !selectedTeam ||
      !selectedTeam.id ||
      selectedMembersForAdd.length === 0
    ) {
      console.error("No team selected or no selected members.");
      return;
    }
    const teamId = selectedTeam.id;
    try {
      const response = await fetch(
        `${dbServiceUrl}/api/teams/addMembers/${teamId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(selectedMembersForAdd),
        }
      );

      if (response.status === 200) {
        console.log("Added members successfully.");
        set((state) => {
          const updatedTeams = state.teams
            ? state.teams.map((team) =>
                team.id === teamId
                  ? {
                      ...team,
                      members: [
                        ...team.members,
                        ...state.selectedMembersForAdd,
                      ],
                    }
                  : team
              )
            : null;
          const updatedSelectedTeam =
            state.selectedTeam && state.selectedTeam.id === teamId
              ? {
                  ...state.selectedTeam,
                  members: [
                    ...state.selectedTeam.members,
                    ...state.selectedMembersForAdd,
                  ],
                }
              : state.selectedTeam;
          return {
            teams: updatedTeams,
            selectedTeam: updatedSelectedTeam,
            selectedMembersForAdd: [],
          };
        });
      } else {
        console.error("FAILED TO ADD MEMBERS");
      }
    } catch (error) {
      console.error("Error while adding members:", error);
    }
  },

  handleDeleteTeamMember: async (teamId, member) => {
    const { teams, selectedTeam } = get();
    try {
      const response = await fetch(
        `${dbServiceUrl}/api/teams/removeMember/${teamId}?emailId=${encodeURIComponent(
          member.email
        )}`,
        { method: "DELETE", headers: { "Content-Type": "application/json" } }
      );

      if (response.status === 200) {
        const updatedTeams = teams.map((team) => {
          if (team.id === teamId) {
            return {
              ...team,
              members: team.members.filter(
                (teamMember) => teamMember.email !== member.email
              ),
            };
          }
          return team;
        });

        const updatedSelectedTeam =
          selectedTeam && selectedTeam.id === teamId
            ? {
                ...selectedTeam,
                members: selectedTeam.members.filter(
                  (teamMember) => teamMember.email !== member.email
                ),
              }
            : selectedTeam;

        set({
          teams: updatedTeams,
          selectedTeam: updatedSelectedTeam,
        });
        console.log("Member removed successfully.");
      } else {
        console.log("ERROR REMOVING MEMBER");
      }
    } catch (error) {
      console.log(error);
    }
  },

  handleCreateTeam: async (mspCustomDomain) => {
    const { teamName, selectedBoard, selectedMembersForCreation, teams } =
      get();

    if (!selectedBoard || !teamName) {
      console.error("Selected board or team name is missing.");
      return;
    }

    const team = {
      mspCustomDomain: mspCustomDomain,
      teamName: teamName,
      boardName: selectedBoard.boardName,
      boardId: selectedBoard.boardId,
      members: selectedMembersForCreation,
    };
    try {
      const response = await fetch(
        `${psaServiceUrl}/addTeamInConnectWiseAndAutopilot?mspCustomDomain=${mspCustomDomain}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(team),
        }
      );

      if (response.status === 200) {
        const createdTeam = await response.json();
        console.log("Team created successfully:");
        set({
          teams: teams ? [...teams, createdTeam] : [createdTeam],
          teamName: "",
          selectedMembersForCreation: [],
          showCreateTeam: false,
        });
      } else {
        console.error("Failed to create team");
      }
    } catch (error) {
      console.error("Error creating team:", error);
    }
  },

  handleAddManageClients: async (mspCustomDomain) => {
    const { clientsSelected, clients } = get();

    const selectedClientsPayload = clients.filter(
      (client) => clientsSelected[client.psaCompanyId]?.selected
    );
    try {
      const response = await fetch(
        `${dbServiceUrl}/${encodeURIComponent(mspCustomDomain)}/addPSAClients`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(selectedClientsPayload),
        }
      );

      if (response.status === 200) {
        set({
          activeConfigSteps: 5,
          successMessage: true,
          clientsSelected: {},
          errorMessage: false,
        });

        console.log("MANAGE CLIENT ADDED");
      } else {
        set({ successMessage: false, errorMessage: true });
        console.log("ERROR ADDING MANAGE CLIENT");
      }
    } catch (e) {
      console.log(e);
    }
  },

  handleAddManageContacts: async (mspCustomDomain) => {
    const { contactsSelected, contacts } = get();
    const selectedContactsPayload = contacts.filter(
      (contact) => contactsSelected[contact.psaContactId]?.selected
    );

    try {
      const response = await fetch(
        `${dbServiceUrl}/${encodeURIComponent(mspCustomDomain)}/addPSAContacts`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(selectedContactsPayload),
        }
      );

      if (response.status === 200) {
        set({
          activeConfigSteps: 6,
          successMessage: true,
          contactsSelected: {},
          errorMessage: false,
        });

        console.log("MANAGE CONTACT ADDED");
      } else {
        set({
          successMessage: false,
          errorMessage: true,
        });
        console.log("ERROR ADDING MANAGE CONTACT");
      }
    } catch (e) {
      console.log(e);
    }
  },

  handleEnableBoardSync: async (mspCustomDomain) => {
    const { connectwiseSyncMerge, activeBoardToSync } = get();

    const currentConfig = connectwiseSyncMerge?.connectWiseConfig;

    const updatedBoardTicketSync = currentConfig?.boardTicketSync
      ? [
          ...currentConfig.boardTicketSync,
          { boardId: activeBoardToSync.id, boardName: activeBoardToSync.name },
        ]
      : [{ boardId: activeBoardToSync.id, boardName: activeBoardToSync.name }];

    const bodyData = {
      connectWiseConfig: {
        ...currentConfig,
        boardTicketSync: updatedBoardTicketSync,
      },
    };

    try {
      const response = await fetch(
        `${dbServiceUrl}/${mspCustomDomain}/addUpdatePSATicketingConfiguration`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bodyData),
        }
      );

      if (response.status === 201) {
        const boardSyncedMerge = await response.json();
        set({
          successMessage: true,
          errorMessage: false,
          connectwiseSyncMerge: boardSyncedMerge,
          finishedIntagrationShow: true,
        });
        console.log("Syncing Done");
      } else {
        set({
          successMessage: false,
          errorMessage: true,
        });
        console.log("Error with Syncing Board");
      }
    } catch (e) {
      console.log(e);
    }
  },

  handleSetDefaultCompany: async (mspCustomDomain, companyName, companyId) => {
    try {
      const response = await fetch(
        `${dbServiceUrl}/${mspCustomDomain}/connectWiseManageDetails/update`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            mspCustomDomain: mspCustomDomain,
            defaultCompanyId: companyId,
            defaultCompanyName: companyName,
          }),
        }
      );

      if (response.status === 200) {
        console.log("Successfuly Set Default Company");
      } else {
        console.log("Failed To Successfuly Set Default Company");
      }
    } catch (e) {
      console.log(e);
    }
  },

  handleAutoSync: async (mspCustomDomain, clientTypeId, clientTypeName) => {
    set({
      autoSyncLoading: true,
      autoSyncingShow: true,
      autoSyncingCompleted: false,
    });
    try {
      const updateTypes = await fetch(
        `${dbServiceUrl}/${mspCustomDomain}/updateClientSync?clientTypeId=${clientTypeId}&clientTypeName=${clientTypeName}`
      );

      if (updateTypes.status === 200) {
        console.log("UPDATED CLIENTTYPEID TO DB");
        const clientsContactsSync = await fetch(
          `${connectWiseServiceUrl}/syncClientsContacts?mspCustomDomain=${mspCustomDomain}`
        );
        set({
          autoSyncLoading: false,
          autoSyncingShow: true,
          autoSyncingCompleted: true,
        });

        if (clientsContactsSync.status === 200) {
          console.log("UPDATED WITH CONNECTWISE");
        }
      }
    } catch (e) {
      console.log(e);
    }
  },

  clearManage: () => {
    set({
      technicians: null,
      techniciansTierOptions: ["Tier1", "Tier2", "Tier3", "NoTier"],
      techniciansRoleOptions: null,
      techniciansSelected: {},
      loadingTechnicians: false,

      teams: null,
      teamBoards: null,
      techniciansForBoards: null,
      loadingTechniciansAndBoards: false,
      selectedBoard: null,
      selectedTeam: null,
      showMemberSelect: false,
      showCreateTeam: false,
      teamName: "",
      selectedMembersForAdd: [],
      selectedMembersForCreation: [],

      clients: null,

      clientsSelected: {},
      clientsFilterType: "",
      loadingClients: false,

      contacts: null,
      contactsSelected: {},
      loadingContacts: false,
      finishedIntagrationShow: false,

      clientAndContactTypes: null,
      selectedAutoSyncType: null,
      autoSyncLoading: false,
      autoSyncingShow: false,
      autoSyncingCompleted: false,

      connectwiseBoardsForSync: null,
      loadingBoardsForSync: false,
      loadingSyncMerge: false,
      connectwiseSyncMerge: null,
      activeBoardToSync: null,

      connectwiseBoards: null,
      connectwiseOpenStatuses: null,
      connectwiseClosedStatuses: null,
      connectwiseDefaultPriorites: null,

      loadingBoards: false,

      connectwiseMerge: null,
      loadingMerge: false,
      loadingAiMerge: false,

      customBoardMetadata: false,
      customBoard: false,
      customBoardTitle: "",
      customBoardDepartment: null,
      customBoardLocation: null,
      customBoardMerge: null,

      activeBoard: null,

      activeConfig: false,

      activeConfigSteps: 1,

      activePage: 1,
      activePerPage: 30,
      activePageNumbers: [],

      integrationInputs: {
        connectWiseManageIntegrator: false,
        microsoftGraphIntegrator: false,
        emailIntegrator: false,
        companyId: "",
        publicKey: "",
        privateKey: "",
        emailConnectorGmail: "",
        emailConnectorAppPassword: "",
      },

      severityOptions: ["Low", "Medium", "High"],
      impactOptions: ["Low", "Medium", "High"],
      tierOptions: ["Tier1", "Tier2", "Tier3", "No Dispatching"],
      technicianTierOptions: ["Tier1", "Tier2", "Tier3"],
      durationOptions: {
        "15 Minutes": 15,
        "30 Minutes": 30,
        "45 Minutes": 45,
        "1 Hour": 60,
        "1 Hour 30 Minutes": 90,
        "2 Hours 30 Minutes": 150,
        "3 Hours 30 Minutes": 210,
        "4 Hours": 240,
      },

      successManageIntegration: false,
      successManageDisconnect: false,

      errorManageIntegration: false,
      errorManageDisconnect: false,

      successMessageCategory: false,
      errorMessageCategory: false,

      successMessageSubCategory: false,
      errorMessageSubCategory: false,

      successMessageOpenStatus: false,
      errorMessageOpenStatus: false,

      successMessageClosedStatus: false,
      errorMessageClosedStatus: false,

      successMessage: false,
      errorMessage: false,
    });
  },
}));

export default useManageStore;
