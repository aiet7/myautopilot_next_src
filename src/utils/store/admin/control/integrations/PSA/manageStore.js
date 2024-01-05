import { create } from "zustand";
import useIntegrationsStore from "../integrationsStore";
import useTechStore from "@/utils/store/user/techStore";
import {
  handleGetManageTechnicians,
  handleGetManageClients,
  handleGetRoles,
} from "@/utils/api/serverProps";

const useManageStore = create((set, get) => ({
  technicians: null,
  techniciansTierOptions: ["Tier1", "Tier2", "Tier3", "NoTier"],
  techniciansRoleOptions: null,
  techniciansSelected: {},

  clients: null,
  clientTypeOptions: [],
  contact: null,

  connectwiseBoards: null,
  loadingBoards: false,

  connectwiseMerge: null,
  loadingMerge: false,

  activeBoard: null,

  activeConfig: false,

  activeConfigSteps: 1,

  activeClientPage: 1,
  activeClientsPerPage: 30,
  activeClientsPageNumbers: [],

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
    const techStore = useTechStore.getState();
    set({ technicians: null, techniciansRoleOptions: null });
    if (techStore.tech) {
      try {
        const [newTechnicians, newRoles] = await Promise.all([
          handleGetManageTechnicians(techStore.tech.mspCustomDomain),
          handleGetRoles(techStore.tech.mspCustomDomain),
        ]);

        set({ technicians: newTechnicians, techniciansRoleOptions: newRoles });
      } catch (e) {
        console.log(e);
      }
    }
  },

  initializeManageClients: async () => {
    const { activeClientsPerPage } = get();
    const techStore = useTechStore.getState();
    set({ clients: null });

    if (techStore.tech) {
      const newClients = await handleGetManageClients(
        techStore.tech.mspCustomDomain
      );
      const totalClients = newClients.length;
      const totalPages = Math.ceil(totalClients / activeClientsPerPage);
      set({
        activeClientsPageNumbers: Array.from(
          { length: totalPages },
          (_, i) => i + 1
        ),
        clients: newClients,
      });
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
    });
  },

  setActiveConfigPreviousStep: () => {
    const { activeConfigSteps } = get();
    if (activeConfigSteps > 1) {
      set({ activeConfigSteps: activeConfigSteps - 1 });
    }
  },

  setActiveConfigNextStep: () => {
    const { activeConfigSteps } = get();
    if (activeConfigSteps < 4) {
      set({ activeConfigSteps: activeConfigSteps + 1 });
    }
  },

  setActiveClientsPage: (page) => {
    set({ activeClientPage: page });
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

  setSelectedTechnicians: (technicianId, field, value) =>
    set((prevState) => {
      const techniciansSelected = { ...prevState.techniciansSelected };
      if (!techniciansSelected[technicianId]) {
        techniciansSelected[technicianId] = {
          selected: false,
          tier: "",
          role: "",
        };
      }
      techniciansSelected[technicianId][field] = value;
      return { techniciansSelected };
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
    set({ connectwiseMerge: null, loadingMerge: true, activeBoard: id });
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

    const selectedTechniciansPayload = Object.entries(techniciansSelected)
      .filter(([_, techData]) => techData.selected)
      .map(([id, { tier, role }]) => ({
        ...technicians.find((t) => t.id === id),
        tier,
        role,
        mspCustomDomain,
      }));

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
}));

export default useManageStore;
