"use client";

import useDocConversationsStore from "@/utils/store/interaction/conversations/docConversationsStore";
import useUiStore from "@/utils/store/ui/uiStore";
import {
  AiFillDelete,
  AiFillEdit,
  AiOutlineCheck,
  AiOutlineClose,
} from "react-icons/ai";
import { IoChatboxOutline } from "react-icons/io5";
import { FaSpinner } from "react-icons/fa";

const Documents = ({}) => {
  const { openDocs } = useUiStore();

  const {
    editing,
    deleting,
    tempTitle,
    tempPrompt,
    isDocUploading,
    documentConversationHistories,
    currentDocumentConversationIndex,
    setDeleting,
    setTempTitle,
    setTempPrompt,
    handleUploadDocument,
    handleSaveDocumentTitle,
    handleDeleteDocumentConversation,
    handleEditDocumentTitle,
    handleEditDocumentPrompt,
    handleCancelEditDocumentTitle,
    handleDocumentSelected,
  } = useDocConversationsStore();
  
  return (
    <div
      className={`absolute z-10 top-0 bottom-0 left-0 
      ${
        openDocs ? "translate-x-0 w-[350px]" : "-translate-x-full w-[350px]"
      } dark:lg:border-white/10 dark:bg-[#111111] bg-[#f6f8fc] p-4 flex flex-col transition-all duration-300 ease lg:border-r`}
    >
      <label className="dark:shadow-white/40 hover:bg-blue-500 cursor-pointer w-full px-4 py-5 bg-blue-800 text-white text-center rounded-lg shadow-lg">
        <input
          className="hidden"
          key={Date.now()}
          type="file"
          onChange={async (e) => {
            const file = e.target.files[0];
            if (file) {
              await handleUploadDocument(file);
            }
          }}
        />
        {isDocUploading ? (
          <div className="flex items-center justify-center gap-2">
            <FaSpinner className="animate-spin" />
            Uploading
          </div>
        ) : (
          "+ Add Document (.pdf)"
        )}
      </label>
      <div className="overflow-y-auto h-full scrollbar-thin mt-4">
        {documentConversationHistories.map((conversation, index) => {
          const { id, userID, conversationName, customPrompt } = conversation;
          return (
            <div key={index} className="flex flex-col items-start my-1">
              <div
                onClick={() => handleDocumentSelected(index, id)}
                className={`${`${
                  currentDocumentConversationIndex === index &&
                  "dark:bg-white/40 bg-black/20"
                }`} dark:text-white dark:hover:bg-white/40 hover:bg-black/20 text-black w-full flex items-center justify-between px-4 py-3 cursor-pointer rounded-lg`}
              >
                <div className="flex items-center">
                  <div className="w-8">
                    <IoChatboxOutline size={20} />
                  </div>
                  <div
                    className={`${
                      currentDocumentConversationIndex === index
                        ? "w-48"
                        : "w-64"
                    }  truncate flex`}
                  >
                    {currentDocumentConversationIndex === index && editing ? (
                      <input
                        onClick={(e) => e.stopPropagation()}
                        value={tempTitle}
                        className="bg-white text-black truncate flex px-1 "
                        onChange={(e) => setTempTitle(e.target.value)}
                      />
                    ) : (
                      <span className="px-1">{conversationName}</span>
                    )}
                  </div>
                </div>
                <div className="w-18">
                  {currentDocumentConversationIndex === index && editing && (
                    <div className="flex items-center gap-2">
                      <AiOutlineCheck
                        size={20}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSaveDocumentTitle(id, userID);
                        }}
                      />
                      <AiOutlineClose
                        size={20}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCancelEditDocumentTitle();
                        }}
                      />
                    </div>
                  )}
                  {currentDocumentConversationIndex === index && deleting && (
                    <div className="flex items-center gap-2">
                      <AiOutlineCheck
                        size={20}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteDocumentConversation(id);
                          setDeleting(false);
                        }}
                      />
                      <AiOutlineClose
                        size={20}
                        onClick={(e) => {
                          e.stopPropagation();
                          setDeleting(false);
                        }}
                      />
                    </div>
                  )}
                  {currentDocumentConversationIndex === index &&
                    !editing &&
                    !deleting && (
                      <div className="flex items-center gap-2">
                        <AiFillEdit
                          size={20}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditDocumentTitle();
                            handleEditDocumentPrompt();
                          }}
                        />
                        <AiFillDelete
                          size={20}
                          onClick={(e) => {
                            e.stopPropagation();
                            setDeleting(true);
                          }}
                        />
                      </div>
                    )}
                </div>
              </div>
              {currentDocumentConversationIndex === index && editing && (
                <div className="w-full">
                  <textarea
                    placeholder={`Fine-tune your conversation.\nEx. Act as a Front End expert or speak like Albert Einstein would.`}
                    value={tempPrompt || customPrompt || ""}
                    className="dark:bg-white/10 w-full bg-black/5 p-2 rounded-bl-md rounded-br-md scrollbar-thin min-h-[100px] max-h-[200px]"
                    onChange={(e) => setTempPrompt(e.target.value)}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Documents;
