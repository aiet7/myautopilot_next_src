import { create } from "zustand";
import useIntegrationsStore from "../integrationsStore";
import useTechStore from "@/utils/store/user/techStore";
import {
  handleGetManageTechnicians,
  handleGetManageDBTechnicians,
  handleGetManageClients,
  handleGetManageDBClients,
  handleGetManageContacts,
  handleGetManageDBContacts,
  handleGetRoles,
} from "@/utils/api/serverProps";

const useManageStore = create((set, get) => ({
  technicians: null,
  techniciansTierOptions: ["Tier1", "Tier2", "Tier3", "NoTier"],
  techniciansRoleOptions: null,
  techniciansSelected: {},

  clients: null,
  clientsSelected: {},
  clientsFilterType: "",

  contacts: null,
  contactsSelected: {},

  connectwiseBoards: null,
  loadingBoards: false,

  connectwiseMerge: null,
  loadingMerge: false,

  customBoard: false,
  customBoardTitle: "",
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
  },

  boardInputs: {},
  customBoardInputs: {},

  severityOptions: ["Low", "Medium", "High"],
  impactOptions: ["Low", "Medium", "High"],
  tierOptions: ["Tier1", "Tier2", "Tier3"],
  technicianTierOptions: ["Tier1", "Tier2", "Tier3"],
  durationOptions: [
    "15 Minutes",
    "30 Minutes",
    "45 Minutes",
    "1 Hour",
    "1 Hour 30 Minutes",
    "2 Hours 30 Minutes",
    "3 Hours 30 Minutes",
    "4 Hours",
  ],

  successMessage: false,
  errorMessage: false,

  initializeManageTechnicians: async () => {
    const { activePerPage } = get();
    const techStore = useTechStore.getState();
    set({ technicians: null, techniciansRoleOptions: null });

    if (techStore.tech) {
      try {
        const [dbTechnicians, connectWiseTechnicians, newRoles] =
          await Promise.all([
            handleGetManageDBTechnicians(techStore.tech.mspCustomDomain),
            handleGetManageTechnicians(techStore.tech.mspCustomDomain),
            handleGetRoles(techStore.tech.mspCustomDomain),
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
        });
      } catch (e) {
        console.log(e);
      }
    }
  },

  initializeManageClients: async () => {
    const { activePerPage } = get();
    const techStore = useTechStore.getState();
    set({ clients: null });

    if (techStore.tech) {
      try {
        const [dbClients, connectWiseClients] = await Promise.all([
          handleGetManageDBClients(techStore.tech.mspCustomDomain),
          handleGetManageClients(techStore.tech.mspCustomDomain),
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
        });
      } catch (e) {
        console.log(e);
      }
    }
  },

  initializeManageContacts: async () => {
    const { activePerPage } = get();
    const techStore = useTechStore.getState();
    set({ contacts: null });

    if (techStore.tech) {
      try {
        const [dbContacts, connectWiseContacts] = await Promise.all([
          handleGetManageDBContacts(techStore.tech.mspCustomDomain),
          handleGetManageContacts(techStore.tech.mspCustomDomain),
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
        });
      } catch (e) {
        console.log(e);
      }
    }
  },

  setConnectwiseBoard: (board) => set({ connectwiseBoards: board }),

  setActiveConfig: (config) =>
    set({
      activeConfig: config,
      activeConfigSteps: 1,
      successMessage: false,
      errorMessage: false,
    }),

  setActiveConfigStep: (step) => {
    set({
      activeConfigSteps: step,
      successMessage: false,
      errorMessage: false,
      activePage: 1,
    });
  },

  setActiveConfigPreviousStep: () => {
    const { activeConfigSteps } = get();
    if (activeConfigSteps > 1) {
      set({ activeConfigSteps: activeConfigSteps - 1, activePage: 1 });
    }
  },

  setActiveConfigNextStep: () => {
    const { activeConfigSteps } = get();
    if (activeConfigSteps < 4) {
      set({ activeConfigSteps: activeConfigSteps + 1, activePage: 1 });
    }
  },

  setActivePage: (page) => {
    set({ activePage: page });
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

  setBoardInputs: (categoryId, subCategoryId, field, id, name) =>
    set((prevState) => {
      const boardInputs = { ...prevState.boardInputs };
      if (!boardInputs[categoryId]) {
        boardInputs[categoryId] = {};
      }
      if (!boardInputs[categoryId][subCategoryId]) {
        boardInputs[categoryId][subCategoryId] = {};
      }

      if (field === "priority") {
        boardInputs[categoryId][subCategoryId]["priorityId"] = id;
        boardInputs[categoryId][subCategoryId]["priority"] = name;
      } else {
        boardInputs[categoryId][subCategoryId][field] = id;
      }

      return { boardInputs };
    }),

  setCustomBoardInputs: (categoryId, subCategoryId, field, value) => {
    set((prevState) => {
      if (field === "boardTitle") {
        return { ...prevState, customBoardTitle: value };
      }

      const customBoardInputs = { ...prevState.customBoardInputs };
      if (!customBoardInputs[categoryId]) {
        customBoardInputs[categoryId] = {};
      }
      if (!customBoardInputs[categoryId][subCategoryId]) {
        customBoardInputs[categoryId][subCategoryId] = {};
      }
      customBoardInputs[categoryId][subCategoryId][field] = value;
      return { customBoardInputs: customBoardInputs };
    });
  },

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

  setClientsFilterType: (filter) => {
    set({ clientsFilterType: filter });
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

  handleIntegrateManage: async (mspCustomDomain) => {
    const { integrationInputs } = get();
    const { handleUpdateIntegrations } = useIntegrationsStore.getState();

    const {
      connectWiseManageIntegrator,
      microsoftGraphIntegrator,
      emailIntegrator,
      ...connectWiseManageIntegration
    } = integrationInputs;

    try {
      const response = await fetch(
        `http://localhost:9019/${mspCustomDomain}/integrations/update`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            mspCustomDomain: mspCustomDomain,
            connectWiseManageIntegrator: true,
            connectWiseManageIntegration: connectWiseManageIntegration,
          }),
        }
      );

      if (response.status === 200) {
        const updatedIntegrations = await response.json();
        handleUpdateIntegrations(updatedIntegrations);
        set({
          errorMessage: false,
          successMessage: true,
        });
        console.log("MANAGE INTEGRATED");
      } else {
        set({ errorMessage: true, successMessage: false });
        console.log("FAILED INTEGRATION");
      }
    } catch (e) {
      console.log(e);
    }
  },

  handleDisconnectManage: async (mspCustomDomain) => {
    const { handleUpdateIntegrations } = useIntegrationsStore.getState();

    try {
      const response = await fetch(
        `http://localhost:9019/${mspCustomDomain}/integrations/update`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            mspCustomDomain: mspCustomDomain,
            connectWiseManageIntegration: {
              connectWiseManageIntegrator: false,
              microsoftGraphIntegrator: false,
              emailIntegrator: false,
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
        handleUpdateIntegrations(updatedIntegrations);
        set({ errorMessage: false, successMessage: true });
        console.log("MANAGE INTEGRATED");
      } else {
        set({ errorMessage: true, successMessage: false });
        console.log("FAILED INTEGRATION");
      }
    } catch (e) {
      console.log(e);
    }
  },

  handleCheckManageKeys: async (mspCustomDomain) => {
    try {
      const response = await fetch(
        `http://localhost:9020/getConnectWiseBoards?mspCustomDomain=${mspCustomDomain}`
      );

      if (response.status === 200) {
        const boards = await response.json();
        set({
          connectwiseBoards: boards,
          activeConfig: true,
          errorMessage: false,
        });
      } else {
        set({
          connectwiseBoards: null,
          activeConfig: false,
          errorMessage: true,
        });
      }
    } catch (e) {
      console.log(e);
    }
  },

  handleGetBoardDetails: async (id, mspCustomDomain) => {
    set({
      connectwiseMerge: null,
      loadingMerge: true,
      activeBoard: id,
      customBoard: false,
    });
    try {
      const response = await fetch(
        `http://localhost:9020/getMergedConnectWiseCategorizationWithoutGpt?mspCustomDomain=${mspCustomDomain}&boardId=${id}`
      );

      if (response.status === 200) {
        const merge = await response.json();
        set({ connectwiseMerge: merge, loadingMerge: false });
      } else {
        console.log("Error");
      }
    } catch (e) {
      console.log(e);
    }
  },

  handleCustomBoard: async () => {
    const techStore = useTechStore.getState();
    const templateURL = `http://localhost:9019/default-et7-board-template/connectWiseManageDetails`;
    const prioritiesURL = `http://localhost:9020/getConnectWisePriorities?mspCustomDomain=${techStore.tech.mspCustomDomain}`;

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
        set({
          customBoardMerge: {
            mspConnectWiseManageCategorizations:
              customMerge.mspConnectWiseManageCategorizations,
            prioritiesList: prioritiesList,
          },
          customBoard: true,
          customBoardTitle: "",
          activeBoard: null,
        });
      } else {
        console.log("Failed to fetch custom");
      }
    } catch (e) {
      console.log(e);
    }
  },

  handleSaveBoard: async (mspCustomDomain) => {
    const { boardInputs, connectwiseMerge, connectwiseBoards, activeBoard } =
      get();
    const activeBoardDetails = connectwiseBoards.find(
      (board) => board.id === activeBoard
    );
    const updatedCategorizations =
      connectwiseMerge.mspConnectWiseManageCategorizations.map((category) => {
        return {
          ...category,
          mspConnectWiseManageSubCategorizations:
            category.mspConnectWiseManageSubCategorizations.map((subCat) => {
              return {
                ...subCat,
                ...boardInputs[category.categoryId]?.[subCat.subCategoryId],
              };
            }),
        };
      });
    try {
      const response = await fetch(
        `http://localhost:9019/${mspCustomDomain}/connectWiseManageDetails/update`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            mspCustomDomain: mspCustomDomain,
            boardId: activeBoardDetails.id,
            boardName: activeBoardDetails.name,
            mspConnectWiseManageCategorizations: updatedCategorizations,
          }),
        }
      );

      if (response.status === 200) {
        set({ errorMessage: false, successMessage: true });
      } else {
        set({ errorMessage: true, successMessage: false });
      }
    } catch (error) {
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
        `http://localhost:9019/${encodeURIComponent(
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
        `http://localhost:9019/${encodeURIComponent(
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
        `http://localhost:9019/${encodeURIComponent(
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
}));

export default useManageStore;
