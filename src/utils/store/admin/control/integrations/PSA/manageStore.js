import { create } from "zustand";
import useIntegrationsStore from "../integrationsStore";
import useUserStore from "@/utils/store/user/userStore";
import {
  handleGetManageTechnicians,
  handleGetManageInactiveDBTechnicians,
  handleGetManageClients,
  handleGetManageDBClients,
  handleGetManageContacts,
  handleGetManageDBContacts,
  handleGetRoles,
  handleGetManageClientAndContactTypes,
} from "@/utils/api/serverProps";

const dbServiceUrl = process.env.NEXT_PUBLIC_DB_SERVICE_URL;
const connectWiseServiceUrl = process.env.NEXT_PUBLIC_CONNECTWISE_SERVICE_URL;
const emailConnectorUrl = process.env.NEXT_PUBLIC_EMAILCONNECTOR_URL;

const useManageStore = create((set, get) => ({
  technicians: null,
  techniciansTierOptions: ["Tier1", "Tier2", "Tier3", "NoTier"],
  techniciansRoleOptions: null,
  techniciansSelected: {},
  loadingTechnicians: false,

  clients: null,

  clientsSelected: {},
  clientsFilterType: "",
  loadingClients: false,

  contacts: null,
  contactsSelected: {},
  loadingContacts: false,

  clientAndContactTypes: null,
  selectedAutoSyncType: null,
  autoSyncLoading: false,
  autoSyncingShow: false,
  autoSyncingCompleted: false,

  connectwiseBoards: null,
  connectwiseOpenStatuses: null,
  connectwiseClosedStatuses: null,

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
    clientId: "",
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

  successMessageStatus: false,
  errorMessageStatus: false,

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
            handleGetManageInactiveDBTechnicians(
              userStore.user.mspCustomDomain
            ),
            handleGetManageTechnicians(userStore.user.mspCustomDomain),
            handleGetRoles(userStore.user.mspCustomDomain),
          ]);

        const markedTechnicians = connectWiseTechnicians.map((cwTech) => ({
          ...cwTech,
          isInDB: dbTechnicians.some(
            (dbTech) =>
              dbTech.connectWiseMembersId === cwTech.connectWiseMembersId
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

  initializeManageClients: async () => {
    const { activePerPage } = get();
    const userStore = useUserStore.getState();
    set({ clients: null, loadingClients: true });

    if (userStore.user) {
      try {
        const [dbClients, connectWiseClients, connectWiseTypes] =
          await Promise.all([
            handleGetManageDBClients(userStore.user.mspCustomDomain),
            handleGetManageClients(userStore.user.mspCustomDomain),
            handleGetManageClientAndContactTypes(
              userStore.user.mspCustomDomain
            ),
          ]);

     

        const markedClients = connectWiseClients.map((cwClient) => ({
          ...cwClient,
          isInDB: dbClients.some(
            (dbClient) =>
              dbClient.connectWiseCompanyId === cwClient.connectWiseCompanyId
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
          handleGetManageDBContacts(userStore.user.mspCustomDomain),
          handleGetManageContacts(userStore.user.mspCustomDomain),
        ]);

        const markedContacts = connectWiseContacts.map((cwContact) => ({
          ...cwContact,
          isInDB: dbContacts.some(
            (dbContact) =>
              dbContact.connectWiseContactId === cwContact.connectWiseContactId
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

  setConnectwiseBoard: (board) =>
    set({
      connectwiseBoards: board,
      errorMessage: false,
      successMessage: false,
    }),

  setActiveConfigStep: (step) => {
    set({
      technicians: null,
      clients: null,
      contacts: null,
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

      successMessageStatus: false,
      errorMessageStatus: false,
      activePage: 1,
      activePageNumbers: [],
    });
  },

  setActiveConfigPreviousStep: () => {
    const { activeConfigSteps } = get();
    if (activeConfigSteps > 1) {
      set({
        technicians: null,
        clients: null,
        contacts: null,
        customMerge: null,
        connectwiseMerge: null,
        connectwiseOpenStatuses: null,
        connectwiseClosedStatuses: null,
        customBoardMetadata: false,
        customBoard: false,
        successMessage: false,
        errorMessage: false,
        successMessageCategory: false,
        errorMessageCategory: false,

        successMessageSubCategory: false,
        errorMessageSubCategory: false,

        successMessageStatus: false,
        errorMessageStatus: false,
        activeConfigSteps: activeConfigSteps - 1,
        activePage: 1,
        activePageNumbers: [],
      });
    }
  },

  setActiveConfigNextStep: () => {
    const { activeConfigSteps } = get();
    if (activeConfigSteps < 4) {
      set({
        technicians: null,
        clients: null,
        contacts: null,
        customMerge: null,
        connectwiseMerge: null,
        connectwiseOpenStatuses: null,
        connectwiseClosedStatuses: null,
        customBoardMetadata: false,
        customBoard: false,
        successMessage: false,
        errorMessage: false,
        successMessageCategory: false,
        errorMessageCategory: false,

        successMessageSubCategory: false,
        errorMessageSubCategory: false,

        successMessageStatus: false,
        errorMessageStatus: false,
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
    set({
      technicians: null,
      techniciansSelected: {},

      clients: null,
      clientsSelected: {},

      contacts: null,
      contactsSelected: {},

      clientAndContactSync: false,
      clientAndContactTypes: null,

      connectwiseOpenStatuses: null,
      connectwiseClosedStatuses: null,
      connectwiseMerge: null,
      customBoard: false,
      customBoardMerge: null,
      customBoardMetadata: false,

      successManageIntegration: false,
      errorManageIntegration: false,

      successManageDisconnect: false,
      errorManageDisconnect: false,

      errorMessage: false,
      successMessage: false,
      successMessageCategory: false,
      errorMessageCategory: false,

      successMessageSubCategory: false,
      errorMessageSubCategory: false,

      successMessageStatus: false,
      errorMessageStatus: false,
      activeBoard: null,
      activeConfig: false,
      activeConfigSteps: 1,
      activePage: 1,
      activePageNumbers: [],
    });
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

  setBoardInputs: (categoryId, subCategoryId, field, value, id, name) => {
    set((prevState) => {
      const updatedConnectwiseMerge = { ...prevState.connectwiseMerge };

      if (
        categoryId === null &&
        subCategoryId === null &&
        (field === "openStatus" || field === "closedStatus")
      ) {
        updatedConnectwiseMerge[field] = { id: parseInt(id), name };
      } else {
        const updatedCategories =
          updatedConnectwiseMerge.mspConnectWiseManageCategorizations.map(
            (category) => {
              if (category.categoryId === categoryId) {
                if (field === "categoryName" && subCategoryId == null) {
                  return { ...category, categoryName: value };
                } else {
                  const updatedSubCategories =
                    category.mspConnectWiseManageSubCategorizations.map(
                      (subCategory) => {
                        if (subCategory.subCategoryId === subCategoryId) {
                          if (field === "subCategoryName") {
                            return { ...subCategory, subCategoryName: value };
                          } else if (field === "priority") {
                            subCategory["priorityId"] = parseInt(id);
                            subCategory["priority"] = name;
                          } else {
                            subCategory[field] = id;
                          }
                        }
                        return subCategory;
                      }
                    );

                  return {
                    ...category,
                    mspConnectWiseManageSubCategorizations:
                      updatedSubCategories,
                  };
                }
              }
              return category;
            }
          );

        updatedConnectwiseMerge.mspConnectWiseManageCategorizations =
          updatedCategories;
      }

      return { ...prevState, connectwiseMerge: updatedConnectwiseMerge };
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

      const newTempIndex =
        prevState[mergeKey].mspConnectWiseManageCategorizations.length + 1;

      const newCategory = {
        categoryId: Date.now(),
        categoryName: "",
        mspConnectWiseManageSubCategorizations: [],
        isNew: true,
        tempIndex: newTempIndex,
      };

      return {
        ...prevState,
        [mergeKey]: {
          ...prevState[mergeKey],
          mspConnectWiseManageCategorizations: [
            ...prevState[mergeKey].mspConnectWiseManageCategorizations,
            newCategory,
          ],
        },
      };
    }),

  setNewCustomSubcategory: (categoryId, isCustomBoard) =>
    set((prevState) => {
      const mergeKey = isCustomBoard ? "customBoardMerge" : "connectwiseMerge";
      const categoryIndex = prevState[
        mergeKey
      ].mspConnectWiseManageCategorizations.findIndex(
        (category) => category.categoryId === categoryId
      );
      const subcategories =
        prevState[mergeKey].mspConnectWiseManageCategorizations[categoryIndex]
          .mspConnectWiseManageSubCategorizations;
      const newTempIndex =
        subcategories.length > 0
          ? Math.max(...subcategories.map((sc) => sc.tempIndex || 0)) + 1
          : 0;
      if (categoryIndex === -1) return prevState;

      const newSubcategory = {
        subCategoryId: Date.now(),
        subCategoryName: "",
        isNew: true,
        tempIndex: newTempIndex,
      };

      const updatedCategories = [
        ...prevState[mergeKey].mspConnectWiseManageCategorizations,
      ];
      updatedCategories[categoryIndex].mspConnectWiseManageSubCategorizations =
        [
          ...updatedCategories[categoryIndex]
            .mspConnectWiseManageSubCategorizations,
          newSubcategory,
        ];

      return {
        ...prevState,
        [mergeKey]: {
          ...prevState[mergeKey],
          mspConnectWiseManageCategorizations: updatedCategories,
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
        if (!techniciansSelected[technician.connectWiseMembersId]) {
          techniciansSelected[technician.connectWiseMembersId] = {
            selected: false,
            tier: "",
            roleId: "",
          };
        }
        techniciansSelected[technician.connectWiseMembersId].selected =
          selectAll;
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
      const clientsSelected = { ...prevState.clientsSelected };

      clients.forEach((client) => {
        if (!clientsSelected[client.connectWiseCompanyId]) {
          clientsSelected[client.connectWiseCompanyId] = { selected: false };
        }
        clientsSelected[client.connectWiseCompanyId].selected = selectAll;
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
        if (!contactsSelected[contact.connectWiseContactId]) {
          contactsSelected[contact.connectWiseContactId] = { selected: false };
        }
        contactsSelected[contact.connectWiseContactId].selected = selectAll;
      });

      return { contactsSelected };
    });
  },

  setAutoSyncToast: (toast, completed) => {
    set({ autoSyncingShow: toast, autoSyncingCompleted: completed });
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
              clientId: "",
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
        `${connectWiseServiceUrl}/getConnectWiseBoards?mspCustomDomain=${mspCustomDomain}`
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
              clientId: "",
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
        `${connectWiseServiceUrl}/getConnectWiseBoards?mspCustomDomain=${mspCustomDomain}`
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
      }
    } catch (e) {
      console.log(e);
    }
  },

  handleGetBoardDetails: async (id, mspCustomDomain) => {
    const { handleCustomBoardMetadata, handleGetBoardStatuses } = get();
    if (id === "custom") {
      set({
        connectwiseMerge: null,
        loadingMerge: false,
        activeBoard: null,
        customBoard: false,
        customBoardMetadata: true,
        connectwiseOpenStatuses: null,
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
        connectwiseClosedStatuses: null,
      });
      try {
        const response = await fetch(
          `${connectWiseServiceUrl}/getMergedConnectWiseCategorizationWithoutGpt?mspCustomDomain=${mspCustomDomain}&boardId=${id}`
        );

        if (response.status === 200) {
          await handleGetBoardStatuses(id, mspCustomDomain);
          const merge = await response.json();
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
        `${connectWiseServiceUrl}/getConnectWiseStatuses?boardId=${id}&mspCustomDomain=${mspCustomDomain}`
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

  handleCreateOpenStatus: async (mspCustomDomain) => {
    try {
      const { connectwiseMerge, connectwiseBoards, activeBoard } = get();
      const activeBoardDetails = connectwiseBoards.find(
        (board) => board.id === parseInt(activeBoard)
      );
      const response = await fetch(
        `${connectWiseServiceUrl}/createStatus?mspCustomDomain=${mspCustomDomain}&boardId=${activeBoardDetails.id}&statusName=${connectwiseMerge.openStatus.name}`,
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
          successMessageStatus: true,
          errorMessageStatus: false,
        });
      } else {
        console.log("Open status failed");
        set({
          successMessageStatus: false,
          errorMessageStatus: true,
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
      const response = await fetch(
        `${connectWiseServiceUrl}/createStatus?mspCustomDomain=${mspCustomDomain}&boardId=${activeBoardDetails.id}&statusName=${connectwiseMerge.closedStatus.name}`,
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
          successMessageStatus: true,
          errorMessageStatus: false,
        });
      } else {
        console.log("Closed status failed");
        set({
          successMessageStatus: false,
          errorMessageStatus: true,
        });
      }
    } catch (e) {
      console.log(e);
    }
  },

  handleCustomBoardMetadata: async () => {
    const userStore = useUserStore.getState();
    const departmentsURL = `${connectWiseServiceUrl}/getConnectWiseDepartments?mspCustomDomain=${userStore.user.mspCustomDomain}`;
    const locationsURL = `${connectWiseServiceUrl}/getConnectWiseLocations?mspCustomDomain=${userStore.user.mspCustomDomain}`;

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
    const prioritiesURL = `${connectWiseServiceUrl}/getConnectWisePriorities?mspCustomDomain=${userStore.user.mspCustomDomain}`;

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

    const categoryToSave =
      connectwiseMerge.mspConnectWiseManageCategorizations.find(
        (category) => category.tempIndex === tempIndex
      );

    try {
      const response = await fetch(
        `${connectWiseServiceUrl}/createCategory?mspCustomDomain=${mspCustomDomain}&boardId=${activeBoardDetails.id}&categoryName=${categoryToSave.categoryName}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
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
    const category = connectwiseMerge.mspConnectWiseManageCategorizations.find(
      (category) => category.categoryId === categoryId
    );

    const subCategoryToSave =
      category.mspConnectWiseManageSubCategorizations.find(
        (subCategory) => subCategory.tempIndex === tempIndex
      );

    try {
      const response = await fetch(
        `${connectWiseServiceUrl}/createSubCategory?mspCustomDomain=${mspCustomDomain}&boardId=${activeBoardDetails.id}&subCategoryName=${subCategoryToSave.subCategoryName}&categoryId=${categoryId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        console.log("created new subcategory");
        set({
          successMessageSubCategory: true,
          errorMessageSubCategory: false,
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
    const { connectwiseMerge, connectwiseBoards, activeBoard } = get();

    const activeBoardDetails = connectwiseBoards.find(
      (board) => board.id === parseInt(activeBoard)
    );

    console.log(connectwiseMerge);

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
            boardId: activeBoardDetails.id,
            boardName: activeBoardDetails.name,
            mspConnectWiseManageCategorizations:
              connectwiseMerge.mspConnectWiseManageCategorizations,
            newCreatingTicketStatusId: connectwiseMerge.openStatus.id,
            newCreatingTicketStatus: connectwiseMerge.openStatus.name,
            closingTicketStatusId: connectwiseMerge.closedStatus.id,
            closingTicketStatus: connectwiseMerge.closedStatus.name,
          }),
        }
      );

      if (response.status === 200) {
        set({
          activeConfigSteps: 2,
          errorMessage: false,
          successMessage: true,
        });
      } else {
        set({ errorMessage: true, successMessage: false });
      }
    } catch (error) {
      console.error(error);
      set({ errorMessage: true, successMessage: false });
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
          `${connectWiseServiceUrl}/createConnectWiseBoard?mspCustomDomain=${mspCustomDomain}`,
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
        (technician) =>
          techniciansSelected[technician.connectWiseMembersId]?.selected
      )
      .map((technician) => {
        const additionalData =
          techniciansSelected[technician.connectWiseMembersId];
        return {
          ...technician,
          tier: additionalData?.tier,
          roleId: additionalData?.roleId,
          mspCustomDomain,
        };
      });

    try {
      const response = await fetch(
        `${dbServiceUrl}/${encodeURIComponent(
          mspCustomDomain
        )}/addConnectWiseMembers`,
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

  handleAddManageClients: async (mspCustomDomain) => {
    const { clientsSelected, clients } = get();

    const selectedClientsPayload = clients.filter(
      (client) => clientsSelected[client.connectWiseCompanyId]?.selected
    );

    try {
      const response = await fetch(
        `${dbServiceUrl}/${encodeURIComponent(
          mspCustomDomain
        )}/addConnectWiseClients`,
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
          activeConfigSteps: 4,
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
      (contact) => contactsSelected[contact.connectWiseContactId]?.selected
    );

    try {
      const response = await fetch(
        `${dbServiceUrl}/${encodeURIComponent(
          mspCustomDomain
        )}/addConnectWiseContacts`,
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
          successMessage: true,
          contactsSelected: {},
          errorMessage: false,
        });

        console.log("MANAGE CONTACT ADDED");
      } else {
        set({ successMessage: false, errorMessage: true });
        console.log("ERROR ADDING MANAGE CONTACT");
      }
    } catch (e) {
      console.log(e);
    }
  },

  handleSetDefaultCompany: async (mspCustomDomain, companyName, companyId) => {
    console.log(companyId);
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
          activeConfigSteps: 1,
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

      clients: null,

      clientsSelected: {},
      clientsFilterType: "",
      loadingClients: false,

      contacts: null,
      contactsSelected: {},
      loadingContacts: false,

      clientAndContactTypes: null,
      selectedAutoSyncType: null,
      autoSyncLoading: false,
      autoSyncingShow: false,
      autoSyncingCompleted: false,

      connectwiseBoards: null,
      connectwiseOpenStatuses: null,
      connectwiseClosedStatuses: null,

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
        clientId: "",
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

      successMessageStatus: false,
      errorMessageStatus: false,

      successMessage: false,
      errorMessage: false,
    });
  },
}));

export default useManageStore;
