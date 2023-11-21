import { create } from "zustand";

const useDocumentStore = create((set, get) => ({
  pageCount: 0,
  wordCount: 0,
  pdfUrl: "",
  currentPage: 1,

  handleGetPdfDetails: (file) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);

    return new Promise((resolve, reject) => {
      reader.onload = async () => {
        try {
          const pdfData = new Uint8Array(reader.result);

          const { pdfHandler } = await import("@/utils/pdfHandler");

          const { pageCount, wordCount } = await pdfHandler(pdfData);

          const pdfUrl = URL.createObjectURL(file);

          set({
            pageCount: pageCount,
            wordCount: wordCount,
            pdfUrl: pdfUrl,
            currentPage: 1,
          });
          resolve({ pageCount, wordCount });
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = reject;
    });
  },

  handleNextPage: () => {
    const { currentPage, pageCount } = get();
    if (currentPage < pageCount) {
      set({ currentPage: currentPage + 1 });
    }
  },

  handlePreviousPage: () => {
    const { currentPage } = get();
    if (currentPage > 1) {
      set({ currentPage: currentPage - 1 });
    }
  },

  handlePageChange: (value) => {
    set({ currentPage: parseInt(value, 10) || "" });
  },

  handlePageBlur: () => {
    const { currentPage, pageCount } = get();
    if (currentPage > pageCount) {
      set({ currentPage: pageCount });
    } else if (currentPage < 1 || isNaN(currentPage)) {
      set({ currentPage: 1 });
    }
  },

  handleToggleFullScreen: (element) => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        element.classList.remove("fullscreen-mode");
        document.removeEventListener(
          "fullscreenchange",
          handleFullscreenChange
        );
      } else {
        element.classList.add("fullscreen-mode");
      }
    };

    if (!document.fullscreenElement) {
      element.requestFullscreen().catch(console.error);
      document.addEventListener("fullscreenchange", handleFullscreenChange);
    } else {
      document.exitFullscreen().catch(console.error);
    }
  },

  handleDeletePdfForConvo: () => {
    set({
      pdfUrl: "",
      pageCount: 0,
      wordCount: 0,
    });
  },
}));

export default useDocumentStore;
