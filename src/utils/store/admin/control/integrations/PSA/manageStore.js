import { create } from "zustand";

const useManageStore = create((set, get) => ({
  connectwiseBoards: null,
  loadingBoards: false,

  connectwiseMerge: null,
  loadingMerge: false,

  activeBoard: null,

  integrationInputs: {
    connectWiseManageIntegrator: false,
    microsoftGraphIntegrator: false,
    emailIntegrator: false,
    clientId: "",
    companyId: "",
    publicKey: "",
    privateKey: "",
  },

  successMessage: false,
  errorMessage: false,

  setConnectwiseBoard: (board) => set({ connectwiseBoards: board }),

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

  handleIntegrateManage: async (mspCustomDomain) => {
    const { integrationInputs } = get();

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
            connectWiseManageIntegration: connectWiseManageIntegration,
          }),
        }
      );

      if (response.status === 200) {
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

  handleGetBoard: async (mspCustomDomain) => {
    set({ connectwiseBoards: null });
    try {
      const response = await fetch(
        `http://localhost:9020/board?mspCustomDomain=${mspCustomDomain}`
      );

      if (response.status === 200) {
        const boards = await response.json();
        set({ connectwiseBoards: boards });
      }
    } catch (e) {
      console.log(e);
    }
  },

  handleGetBoardDetails: async (id, mspCustomDomain) => {
    set({ connectwiseMerge: null, loadingMerge: true, activeBoard: id });
    try {
      const response = await fetch(
        `http://localhost:9020/merge?mspCustomDomain=${mspCustomDomain}&boardId=${id}`
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
}));

export default useManageStore;
