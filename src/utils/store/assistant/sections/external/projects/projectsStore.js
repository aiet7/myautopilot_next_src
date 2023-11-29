import { handleGetProjects } from "@/utils/api/serverProps";
import useUserStore from "@/utils/store/user/userStore";
import { create } from "zustand";

const useProjectsStore = create((set, get) => ({
  projects: [],
  showProjectIndex: null,

  initializeProjects: async () => {
    const userStore = useUserStore.getState();
    if (userStore.user) {
      const projects = await handleGetProjects();
      set({ projects });
    }
  },

  setShowProjectIndex: (index) => set({ showProjectIndex: index }),
}));

export default useProjectsStore;
