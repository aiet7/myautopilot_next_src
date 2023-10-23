import { create } from "zustand";
import { pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const useDocGuideStore = create((set, get) => ({
  pageCount: 0,
  wordCount: 0,
  pdfUrl: "",
  currentPage: 1,

  handleGetPdfDetails: (file) => {
    const pdfUrl = URL.createObjectURL(file);
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);

    return new Promise((resolve, reject) => {
      reader.onload = async () => {
        try {
          const pdfData = new Uint8Array(reader.result);
          const pdfDoc = await pdfjs.getDocument({ data: pdfData }).promise;

          const numPages = pdfDoc.numPages;
          let wordCount = 0;

          for (let i = 1; i <= numPages; i++) {
            const page = await pdfDoc.getPage(i);
            const content = await page.getTextContent();
            const text = content.items.map((item) => item.str).join(" ");
            wordCount += text.split(/\s+/).length;
          }

          set({
            pageCount: numPages,
            wordCount: wordCount,
            pdfUrl: pdfUrl,
            currentPage: 1,
          });
          resolve({ pageCount: numPages, wordCount: wordCount });
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

export default useDocGuideStore;
