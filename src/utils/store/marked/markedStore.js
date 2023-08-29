import { create } from "zustand";

const useMarkedStore = create((set, get) => ({
  content: "",
  isEditing: false,
  editingMessageId: null,

  setContent: (markdown) => set({ content: markdown }),
  setIsEditing: (value) => set({ isEditing: value }),

  handleEdit: (id, markdown) => {
    set({
      isEditing: true,
      editingMessageId: id,
      content: markdown,
    });
  },
}));

export default useMarkedStore;
