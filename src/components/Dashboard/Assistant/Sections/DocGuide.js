import useRefStore from "@/utils/store/assistant/ref/refStore";
import useDocGuideStore from "@/utils/store/assistant/sections/docGuide/docGuideStore";
import useDocConversationsStore from "@/utils/store/interaction/conversations/docConversationsStore";
import dynamic from "next/dynamic";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

import { MdConstruction } from "react-icons/md";

const DynamicDocument = dynamic(() =>
  import("react-pdf").then((mod) => mod.Document)
);
const DynamicPage = dynamic(() => import("react-pdf").then((mod) => mod.Page));

const DocGuide = ({}) => {
  const { currentDocumentConversationIndex } = useDocConversationsStore();

  const {
    pageCount,
    wordCount,
    pdfUrl,
    currentPage,
    handlePageChange,
    handlePageBlur,
    handleNextPage,
    handlePreviousPage,
    handleToggleFullScreen,
  } = useDocGuideStore();

  const { docRef } = useRefStore();

  return (
    <div className="flex-grow flex flex-col gap-8 overflow-hidden">
      <h3 className="dark:border-white/40 text-lg border-b">Document Guide</h3>
      <div className="dark:text-white/20 flex flex-col items-center text-black/20">
        <MdConstruction size={50} />
        <p className="text-2xl text-center">Currently Under Maintenance</p>
      </div>

      {/* <div className="flex flex-col">
        <div className="flex gap-2">
          <p className="font-bold">Word Count: </p>
          <p>{currentDocumentConversationIndex !== null ? wordCount : 0}</p>
        </div>

        <div className="flex gap-2">
          <p className="font-bold">Current Page: </p>

          <>
            {currentDocumentConversationIndex !== null && pdfUrl ? (
              <>
                <input
                  min="1"
                  max={pageCount}
                  value={currentPage}
                  type="number"
                  className="w-10 text-center no-scrollbar"
                  onChange={(e) => handlePageChange(e.target.value)}
                  onBlur={handlePageBlur}
                />
                <p>/{pageCount}</p>
              </>
            ) : (
              <p>0</p>
            )}
          </>
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
            <DynamicDocument file={pdfUrl}>
              <DynamicPage pageNumber={currentPage} />
            </DynamicDocument>
          ) : (
            <p>No PDF uploaded yet.</p>
          )}
        </div>
      </div> */}
    </div>
  );
};

export default DocGuide;
