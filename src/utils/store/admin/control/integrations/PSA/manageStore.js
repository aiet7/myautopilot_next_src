import { create } from "zustand";
import useIntegrationsStore from "../integrationsStore";
import useTechStore from "@/utils/store/user/techStore";
import { handleGetManageTechnicians } from "@/utils/api/serverProps";

const isBrowser = typeof window !== "undefined";
const initialWidth = isBrowser ? window.innerWidth : 1023;

const useManageStore = create((set, get) => ({
  technicians: null,
  clients: null,
  contact: null,

  connectwiseBoards: null,
  loadingBoards: false,

  connectwiseMerge: null,
  loadingMerge: false,

  activeBoard: null,

  activeConfig: false,

  activeConfigSteps: 1,

  showTechnicians: false,

  isMobile: initialWidth < 1023,

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
  technicianInputs: {
    identifier: "",
    firstName: "",
    lastName: "",
    primaryEmail: "",
    officeEmail: "",
    mobileNumber: "",
    officeNumber: "",
  },

  severityOptions: ["Low", "Medium", "High"],
  impactOptions: ["Low", "Medium", "High"],
  tierOptions: ["Tier1", "Tier2", "Tier3"],
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
    set({ technicians: null });
    if (techStore.tech) {
      const newTechnicians = await handleGetManageTechnicians(
        techStore.tech.mspCustomDomain
      );
      set({ technicians: newTechnicians });
    }
  },

  setShowTechnicians: (option) => {
    set({ showTechnicians: option, showTechniciansForm: false });
  },



  setIsMobile: (value) => {
    set({ isMobile: value });
  },

  setConnectwiseBoard: (board) => set({ connectwiseBoards: board }),

  setActiveConfig: (config) => set({ activeConfig: config }),

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

  setTechnicianInputs: (field, value) =>
    set((prevState) => ({
      technicianInputs: {
        ...prevState.technicianInputs,
        [field]: value,
      },
    })),

  setBoardInputs: (categoryId, subCategoryId, field, id, name) =>
    set((prevState) => {
      console.log(id);
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
        set({ activeConfig: true, errorMessage: false });
      } else {
        set({ activeConfig: false, errorMessage: true });
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
    const { technicianInputs } = get();

    const techniciansPayload = [
      {
        ...technicianInputs,
        mspCustomDomain: mspCustomDomain,
      },
    ];

    try {
      const response = await fetch(
        `http://localhost:9019/${mspCustomDomain}/addConnectWiseMembers`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(techniciansPayload),
        }
      );

      if (response.status === 200) {
        const newTechnician = await response.json();
        set((prevState) => ({
          technicians: prevState.technicians
            ? [...prevState.technicians, ...newTechnician]
            : [...newTechnician],
          technicianInputs: {
            identifier: "",
            firstName: "",
            lastName: "",
            primaryEmail: "",
            officeEmail: "",
            mobileNumber: "",
            officeNumber: "",
          },
          errorMessage: false,
        }));

        console.log("MANAGE TECH ADDED");
      } else {
        set({ errorMessage: true });
        console.log("ERROR ADDING MANAGE TECH");
      }
    } catch (e) {
      console.log(e);
    }
  },
}));

export default useManageStore;
