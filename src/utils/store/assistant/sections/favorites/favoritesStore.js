import useUserStore from "@/utils/store/user/userStore";
import { create } from "zustand";

const useFavoritesStore = create((set, get) => ({
  customPrompt: {
    promptName: "",
    prompt: "",
  },
  favoritePrompts: [],
  showPromptIndex: null,

  initializeFavorites: () => {
    const userStore = useUserStore.getState();
    set({ favoritePrompts: userStore.user.favorite || [] });
  },

  setCustomPrompt: (field, value) =>
    set((state) => ({
      customPrompt: {
        ...state.customPrompt,
        [field]: value,
      },
    })),

  setShowPromptIndex: (index) => set({ showPromptIndex: index }),

  handleAddPrompt: async () => {
    const userStore = useUserStore.getState();
    const { customPrompt, favoritePrompts } = get();
    if (
      customPrompt.promptName.trim() !== "" &&
      customPrompt.prompt.trim() !== ""
    ) {
      try {
        const response = await fetch(
          `https://etech7-wf-etech7-db-service.azuremicroservices.io/addFavorite?userId=${userStore.user.id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(customPrompt),
          }
        );

        if (response.status === 200) {
          const updatedFavoritePrompts = [...favoritePrompts, customPrompt];
          set({ favoritePrompts: updatedFavoritePrompts });
        } else {
          console.log("Failed to add");
        }
      } catch (e) {
        console.log(e);
      }

      set({ customPrompt: { promptName: "", prompt: "" } });
    }
  },
  handleDeletePrompt: async (index) => {
    const userStore = useUserStore.getState();

    const { favoritePrompts } = get();
    const promptToDelete = favoritePrompts[index];
    try {
      const response = await fetch(
        `https://etech7-wf-etech7-db-service.azuremicroservices.io/deleteFavorite?id=${userStore.user.id}&promptName=${promptToDelete.promptName}`
      );
      if (response.status === 200) {
        const updatedFavoritePrompts = favoritePrompts.filter(
          (prompt) => prompt.promptName !== promptToDelete.promptName
        );
        set({ favoritePrompts: updatedFavoritePrompts });
      } else {
        console.log("delete failed");
      }
    } catch (e) {
      console.log(e);
    }
  },
}));

export default useFavoritesStore;
