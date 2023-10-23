import useRefStore from "@/utils/store/assistant/ref/refStore";
import useDocGuideStore from "@/utils/store/assistant/sections/docGuide/docGuideStore";
import useDocConversationsStore from "@/utils/store/interaction/conversations/docConversationsStore";
import { Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

const DocGuide = ({}) => {
  const { currentDocumentConversationIndex } = useDocConversationsStore();

  const {
    pageCount,
    wordCount,
    pdfUrl,
    currentPage,
    handleNextPage,
    handlePreviousPage,
    handleToggleFullScreen,
  } = useDocGuideStore();

  const { docRef } = useRefStore();

  return (
    <div className="flex-grow flex flex-col gap-4 overflow-hidden">
      <h3 className="text-left text-lg">Document Guide</h3>
      <div className="flex flex-col">
        <div className="flex gap-2 ">
          <p className="font-bold">Word Count: </p>
          <p>{currentDocumentConversationIndex !== null ? wordCount : 0}</p>
        </div>
        <div className="flex gap-2">
          <p className="font-bold">Page Count: </p>
          <p>{currentDocumentConversationIndex !== null ? pageCount : 0}</p>
        </div>
        <div className="flex gap-2">
          <p className="font-bold">Current Page: </p>
          <p>
            {currentDocumentConversationIndex !== null && pdfUrl
              ? currentPage
              : 0}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button
          className={`${
            (currentPage === 1 ||
              pdfUrl === "" ||
              currentDocumentConversationIndex === null) &&
            "opacity-20"
          } w-full bg-blue-800 text-white p-2`}
          onClick={handlePreviousPage}
          disabled={
            currentPage === 1 ||
            pdfUrl === "" ||
            currentDocumentConversationIndex === null
          }
        >
          Previous
        </button>
        <button
          className={`${
            (currentPage === pageCount ||
              pdfUrl === "" ||
              currentDocumentConversationIndex === null) &&
            "opacity-20"
          } w-full bg-blue-800 text-white p-2`}
          onClick={handleNextPage}
          disabled={
            currentPage === pageCount ||
            pdfUrl === "" ||
            currentDocumentConversationIndex === null
          }
        >
          Next
        </button>
      </div>
      <div className="flex-grow overflow-y-auto scrollbar-thin">
        <div
          ref={docRef}
          onClick={() => handleToggleFullScreen(docRef.current)}
          className="cursor-pointer"
        >
          {pdfUrl && currentDocumentConversationIndex !== null ? (
            <Document file={pdfUrl}>
              <Page pageNumber={currentPage} />
            </Document>
          ) : (
            <p>No PDF uploaded yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocGuide;
