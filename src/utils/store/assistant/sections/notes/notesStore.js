import { handleGetNotes } from "@/utils/api/serverProps";
import useAgentsStore from "@/utils/store/agents/agentsStore";
import useConversationStore from "@/utils/store/interaction/conversations/conversationsStore";
import { create } from "zustand";

const useNotesStore = create((set, get) => ({
  notes: [],
  showNoteIndex: null,

  noteHeading: "",
  noteContent: "",

  tempHeading: "",
  tempContent: "",

  editing: false,
  editingNoteId: null,

  setShowNoteIndex: (index) => set({ showNoteIndex: index }),

  setNoteHeading: (value) => set({ noteHeading: value }),
  setNoteContent: (value) => set({ noteContent: value }),

  setTempHeading: (value) => set({ tempHeading: value }),
  setTempContent: (value) => set({ tempContent: value }),

  setEditing: (value) => set({ editing: value }),

  addNote: (note) => set((state) => ({ notes: [...state.notes, note] })),

  initializeNotes: async () => {
    const agentsStore = useAgentsStore.getState();
    const currentAgent = agentsStore.selectedAgent;
    const { conversationHistories, currentConversationIndices } =
      useConversationStore.getState();
    const currentConversationIndex = currentConversationIndices[currentAgent];

    if (currentAgent) {
      const notes = await handleGetNotes(
        conversationHistories[currentAgent]?.[currentConversationIndex]?.id
      );
      set({ notes });
    }
  },

  handleEditNote: (id, note) => {
    set({
      editing: true,
      editingNoteId: id,
      tempHeading: note.noteHeading,
      tempContent: note.noteContent,
    });
  },

  handleSaveNote: async (noteId) => {
    const { notes, tempHeading, tempContent } = get();

    const updatedNotes = notes.map((note) =>
      note.id === noteId
        ? { ...note, noteHeading: tempHeading, noteContent: tempContent }
        : note
    );

    const currentNote = notes.find((note) => note.id === noteId);
    const requests = [];

    if (tempHeading !== currentNote.noteHeading) {
      requests.push(
        fetch(
          `https://etech7-wf-etech7-db-service.azuremicroservices.io/updateNoteHeading?noteId=${noteId}&noteHeading=${encodeURIComponent(
            tempHeading
          )}`
        )
      );
    }

    if (tempContent !== currentNote.noteContent) {
      requests.push(
        fetch(
          `https://etech7-wf-etech7-db-service.azuremicroservices.io/updateNoteContent?noteId=${noteId}&noteContent=${encodeURIComponent(
            tempContent
          )}`
        )
      );
    }

    try {
      const responses = await Promise.all(requests);

      if (responses.every((response) => response.status === 200)) {
        set({
          notes: updatedNotes,
          editing: false,
          tempHeading: "",
          tempContent: "",
        });
      } else {
        console.error("One or more requests failed!");
      }
    } catch (e) {
      console.error(e);
    }
  },

  handleDeleteNote: async (noteId) => {
    const { notes } = get();
    const noteToDelete = notes.find((note) => note.id === noteId);
    if (noteToDelete) {
      try {
        const response = await fetch(
          `https://etech7-wf-etech7-db-service.azuremicroservices.io/deleteNote?noteId=${noteToDelete.id}`
        );
        if (response.ok) {
          set((state) => ({
            notes: state.notes.filter((note) => note.id !== noteId),
            editing: false,
          }));
        }
      } catch (e) {
        console.log(e);
      }
    }
  },

  handleAddNote: async (noteContent) => {
    const agentsStore = useAgentsStore.getState();
    const currentAgent = agentsStore.selectedAgent;
    const { noteHeading, addNote } = get();
    const { conversationHistories, currentConversationIndices } =
      useConversationStore.getState();
    const currentConversationIndex = currentConversationIndices[currentAgent];

    if (noteContent.trim() !== "") {
      try {
        const noteResponse = await fetch(
          `https://etech7-wf-etech7-db-service.azuremicroservices.io/addNote`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              conversationID:
                conversationHistories[currentAgent]?.[currentConversationIndex]
                  ?.id,
              noteHeading: noteHeading,
              noteContent: noteContent,
            }),
          }
        );
        if (noteResponse.status === 200) {
          const newNote = await noteResponse.json();
          addNote(newNote);
        }
      } catch (e) {
        console.log(e);
      }
      set({ noteHeading: "", noteContent: "" });
    }
  },
}));

export default useNotesStore;
