import { create } from "zustand";
import useUserStore from "../../user/userStore";
import { handleGetDocumentMessages } from "@/utils/api/serverProps";
import {
  handleSaveDocument,
  handleGetDocument,
  handleDeleteDocument,
} from "@/utils/idb/db";
import useDocGuideStore from "../../assistant/sections/docGuide/docGuideStore";

const useDocConversationsStore = create((set, get) => ({
  documentConversationHistories: [],
  currentDocumentConversationIndex: 0,
  editing: false,
  deleting: false,
  tempTitle: "",
  tempPrompt: "",
  isDocUploading: false,
  setTempTitle: (title) => set((state) => ({ ...state, tempTitle: title })),
  setTempPrompt: (prompt) => set((state) => ({ ...state, tempPrompt: prompt })),
  setEditing: (isEditing) => set((state) => ({ ...state, editing: isEditing })),
  setDeleting: (isDeleting) =>
    set((state) => ({ ...state, deleting: isDeleting })),

  initializeDocumentConversations: (initialDocumentConversations) => {
    set({
      documentConversationHistories: initialDocumentConversations,
    });
  },

  initializeDocumentMessages: async (passedConvoId = null) => {
    const savedDocumentConversationIndex =
      localStorage.getItem("lastDocumentIndex");
    const parsedSavedDocumentConversationIndex = savedDocumentConversationIndex
      ? parseInt(savedDocumentConversationIndex, 10)
      : null;
    const { documentConversationHistories } = get();

    const convoId =
      passedConvoId ||
      (parsedSavedDocumentConversationIndex !== null
        ? documentConversationHistories[parsedSavedDocumentConversationIndex]
            ?.id
        : null);

    if (!convoId) return;

    const documentMessages = await handleGetDocumentMessages(convoId);

    set((state) => {
      const updatedHistories = [...state.documentConversationHistories];
      const conversationToUpdateIndex = updatedHistories.findIndex(
        (convo) => convo.id === convoId
      );

      if (conversationToUpdateIndex > -1) {
        const updatedMessages = documentMessages
          .flatMap((message) => [
            {
              id: message.id + "-user",
              content: message.userContent,
              role: "user",
              timeStamp: message.timeStamp,
            },
            {
              id: message.id + "-ai",
              content: message.aiContent,
              role: "assistant",
              timeStamp: message.timeStamp,
            },
          ])
          .sort((a, b) => new Date(a.timeStamp) - new Date(b.timeStamp));

        updatedHistories[conversationToUpdateIndex] = {
          ...updatedHistories[conversationToUpdateIndex],
          messages: updatedMessages,
        };
      }
      return { documentConversationHistories: updatedHistories };
    });
  },

  handleSaveDocumentTitle: async (id, userID) => {
    const {
      documentConversationHistories,
      currentDocumentConversationIndex,
      tempTitle,
      tempPrompt,
    } = get();

    const currentDocument = {
      ...documentConversationHistories[currentDocumentConversationIndex],
    };

    currentDocument.conversationName = tempTitle;
    currentDocument.customPrompt = tempPrompt;

    try {
      const response = await fetch(
        `https://etech7-wf-etech7-db-service.azuremicroservices.io/addDocumentConversation`, // Assuming endpoint
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: id,
            userID: userID,
            conversationName: currentDocument.conversationName,
            customPrompt: currentDocument.customPrompt,
            timeStamp: Date.now(),
            deleted: false,
          }),
        }
      );

      if (response.status === 200) {
        documentConversationHistories[currentDocumentConversationIndex] =
          currentDocument;
        set({ documentConversationHistories, editing: false });
      }
    } catch (e) {
      console.log(e);
    }
  },

  handleEditDocumentTitle: () => {
    const { documentConversationHistories, currentDocumentConversationIndex } =
      get();
    const title =
      documentConversationHistories[currentDocumentConversationIndex]
        .conversationName;
    set({ tempTitle: title, editing: true });
  },

  handleEditDocumentPrompt: () => {
    const { documentConversationHistories, currentDocumentConversationIndex } =
      get();
    const prompt =
      documentConversationHistories[currentDocumentConversationIndex]
        .customPrompt;
    set({ tempPrompt: prompt, editing: true });
  },

  handleCancelEditDocumentTitle: () => {
    set({ tempTitle: "", tempPrompt: "", editing: false });
  },

  

  handleUploadDocument: async (file) => {
    if (file.type !== "application/pdf") {
      alert("File Not Supported");
      return;
    }

    const userStore = useUserStore.getState();
    const { handleAddAssistantMessage } = get();
    const { handleGetPdfDetails } = useDocGuideStore.getState();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("userId", userStore.user.id);
    formData.append("fileName", file.name);

    try {
      set({
        isDocUploading: true,
      });
      const response = await fetch(
        "https://etech7-wf-etech7-document-service.azuremicroservices.io/upload1",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const addedDocumentConversation = await response.json();
        await handleSaveDocument(addedDocumentConversation.id, file);

        set((state) => ({
          documentConversationHistories: [
            ...state.documentConversationHistories,
            addedDocumentConversation,
          ],
          currentDocumentConversationIndex:
            state.documentConversationHistories.length,
        }));
        handleAddAssistantMessage(
          `Document <strong>${file.name}</strong> uploaded!  How can I assist you with this document?`
        );
        await handleGetPdfDetails(file);

        return addedDocumentConversation;
      } else {
        alert("File Did Not Upload Because File Is Damaged.");
      }
    } catch (e) {
      console.log(e);
    } finally {
      set({
        isDocUploading: false,
      });
    }
  },

  handleDeleteDocumentConversation: async (documentId) => {
    const { documentConversationHistories } = get();
    const { handleDeletePdfForConvo } = useDocGuideStore.getState();

    const documentConversationToDelete = documentConversationHistories.find(
      (doc) => doc.id === documentId
    );

    if (documentConversationToDelete) {
      try {
        const response = await fetch(
          `https://etech7-wf-etech7-db-service.azuremicroservices.io/deleteDocumentConversation?documentConversationId=${documentConversationToDelete.id}`
        );

        if (response.ok) {
          const updatedDocumentHistories = documentConversationHistories.filter(
            (doc) => doc.id !== documentId
          );
          await handleDeleteDocument(documentId);

          set({
            documentConversationHistories: updatedDocumentHistories,
            currentDocumentConversationIndex: null,
          });
        }
      } catch (e) {
        console.log(e);
      } finally {
        handleDeletePdfForConvo();
      }
    }
  },

  handleDocumentSelected: async (index, convoId) => {
    const { initializeDocumentMessages } = get();
    const { handleGetPdfDetails } = useDocGuideStore.getState();
    const file = await handleGetDocument(convoId);

    await initializeDocumentMessages(convoId);
    await handleGetPdfDetails(file);

    set({ currentDocumentConversationIndex: index });
  },

  handleAddUserMessage: (message) => {
    set((state) => {
      const newHistories = [...state.documentConversationHistories];

      if (!newHistories[state.currentDocumentConversationIndex].messages) {
        newHistories[state.currentDocumentConversationIndex].messages = [];
      }

      newHistories[state.currentDocumentConversationIndex].messages.push({
        id: Date.now() + "-user",
        content: message,
        role: "user",
        timeStamp: new Date().toISOString(),
      });

      return { documentConversationHistories: newHistories };
    });
  },

  handleAddAssistantMessage: (message) => {
    set((state) => {
      const newHistories = [...state.documentConversationHistories];

      if (!newHistories[state.currentDocumentConversationIndex].messages) {
        newHistories[state.currentDocumentConversationIndex].messages = [];
      }

      newHistories[state.currentDocumentConversationIndex].messages.push({
        id: Date.now() + "-ai",
        content: message,
        role: "assistant",
        timeStamp: new Date().toISOString(),
      });
      return { documentConversationHistories: newHistories };
    });
  },
}));

export default useDocConversationsStore;
