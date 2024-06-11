import { handleGetMspTools } from "@/utils/api/serverProps";
import useUserStore from "@/utils/store/user/userStore";
import { create } from "zustand";
const dbServiceUrl = process.env.NEXT_PUBLIC_DB_SERVICE_URL;

const useDownloadsStore = create((set, get) => ({
  tools: null,
  toolToUpload: {
    file: null,
    description: "",
  },
  selectedTool: null,
  isDocUploading: false,
  successMessage: false,

  setSelectedTool: (tool) => set({ selectedTool: tool }),

  setToolToUpload: (field, value) => {
    set((state) => ({
      toolToUpload: { ...state.toolToUpload, [field]: value },
    }));
  },

  initializeMSPTools: async () => {
    const userStore = useUserStore.getState();
    set({ tools: null });
    if (userStore.user) {
      const tools = await handleGetMspTools(userStore.user.mspCustomDomain);

      set({ tools: tools });
    }
  },

  handleUploadTools: async (mspCustomDomain) => {
    const { toolToUpload } = get();
    set({ isDocUploading: true });
    try {
      const formData = new FormData();
      formData.append("file", toolToUpload.file);
      formData.append("mspCustomDomain", mspCustomDomain);
      formData.append("description", toolToUpload.description);

      const response = await fetch(`${dbServiceUrl}/applications/upload`, {
        method: "POST",
        body: formData,
      });

      if (response.status === 200) {
        const newTool = await response.json();
        set((prevState) => ({
          tools: [...prevState.tools, newTool],
          isDocUploading: false,
          successMessage: true,
          toolToUpload: {
            file: null,
            description: "",
          },
        }));
        console.log("TOOL SUCCESSFULLY UPLOADED");
      } else {
        console.error("TOOL UPLOAD FAILED");
        set({ isDocUploading: false, successMessage: false });
      }
    } catch (error) {
      set({ isDocUploading: false, successMessage: false });
    }
  },
  clearTools: () => {
    set({
      tools: null,
      toolToUpload: {
        file: null,
        description: "",
      },
      selectedTool: null,
      isDocUploading: false,
      successMessage: false,
    });
  },
}));

export default useDownloadsStore;
