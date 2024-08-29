"use client";
import { useEffect } from "react";
import {
  AiFillDelete,
  AiFillEdit,
  AiOutlineCheck,
  AiOutlineClose,
  AiOutlinePlus,
} from "react-icons/ai";
import { IoChatboxOutline } from "react-icons/io5";

import useConversationStore from "@/utils/store/interaction/conversations/conversationsStore";

const History = () => {
  const {
    maxPagesToShow,
    currentPage,
    chatsPerPage,
    filterChatMode,
    searchValue,
    editing,
    deleting,
    tempTitle,
    tempPrompt,
    conversationHistories,
    currentConversationIndex,
    setCurrentPage,
    setDeleting,
    setTempTitle,
    setTempPrompt,
    handleSaveConversationTitle,
    handleNewConversation,
    handleConversationSelected,
    handleDeleteConversation,
    handleCancelEditConversationTitle,
    handleEditConversationPrompt,
    handleEditConversationTitle,
    handleNextPage,
    handlePreviousPage,
    initializeConversations,
  } = useConversationStore();

  useEffect(() => {
    initializeConversations();
  }, []);

  const filteredConversationHistories = conversationHistories
    ?.filter((conversation) => {
      if (!searchValue) return true;
      if (
        conversation.conversationName.includes(searchValue) ||
        conversation.conversationName.toLowerCase().includes(searchValue)
      )
        return true;
      return false;
    })
    ?.sort((a, b) => {
      switch (filterChatMode) {
        case "Most Recent":
          return new Date(b.timeStamp) - new Date(a.timeStamp);
        case "Oldest":
          return new Date(a.timeStamp) - new Date(b.timeStamp);
        case "A-Z":
          return a.conversationName.localeCompare(b.conversationName);
        case "Z-A":
          return b.conversationName.localeCompare(a.conversationName);
        default:
          return 0;
      }
    });
  
  const indexOfLastChat = currentPage * chatsPerPage;
  const indexOfFirstChat = indexOfLastChat - chatsPerPage;
  const paginatedChats = filteredConversationHistories?.slice(
    indexOfFirstChat,
    indexOfLastChat
  );

  const totalPages = Math.ceil(
    filteredConversationHistories?.length / chatsPerPage
  );

  const startPage = Math.max(
    Math.min(
      currentPage - Math.floor(maxPagesToShow / 2),
      totalPages - maxPagesToShow + 1
    ),
    1
  );
  const endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);

  const pagesToShow = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index
  );

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center w-full mb-2">
        <div className="w-full flex items-center gap-1 ">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="disabled:opacity-50"
          >
            Previous
          </button>
          {pagesToShow.map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-6 text-center ${
                currentPage === page ? "bg-blue-500 text-white" : ""
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="disabled:opacity-50"
          >
            Next
          </button>
        </div>
        <button
          onClick={handleNewConversation}
          className="dark:shadow-white/40 hover:bg-blue-500 flex items-center gap-1 w-[125px] font-semibold px-4 py-3 bg-blue-800 text-white rounded-lg shadow-lg"
        >
          <AiOutlinePlus size={15} />
          <span>New Chat</span>
        </button>
      </div>
      <div className="flex-grow overflow-y-auto scrollbar-thin">
        {paginatedChats?.map((conversation) => {
          const { id, userId, conversationName, customPrompt, timeStamp } =
            conversation;
          return (
            <div
              onClick={() => handleConversationSelected(id)}
              key={id}
              className={`${
                currentConversationIndex === id
                  ? "dark:bg-white/40 bg-black/20"
                  : "dark:bg-black bg-white"
              } dark:text-white dark:hover:bg-white/40 hover:bg-black/20  flex items-start justify-between my-2 border min-h-[75px] px-4 py-3 text-black cursor-pointer rounded-md`}
            >
              <div className="flex items-center">
                <div className="w-6">
                  <IoChatboxOutline size={15} />
                </div>
                <div
                  className={`${
                    currentConversationIndex === id ? "w-28" : "w-44"
                  } truncate flex`}
                >
                  {currentConversationIndex === id && editing ? (
                    <input
                      onClick={(e) => e.stopPropagation()}
                      value={tempTitle}
                      className="bg-white text-black truncate flex px-1"
                      onChange={(e) => setTempTitle(e.target.value)}
                    />
                  ) : (
                    <div className="flex">
                      <div className="flex flex-col">
                        <span className="px-1">{conversationName}</span>
                        <span className="px-1">
                          {new Date(timeStamp).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="w-12">
                {currentConversationIndex === id && editing && (
                  <div className="flex items-center gap-2">
                    <AiOutlineCheck
                      size={18}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSaveConversationTitle(id, userId);
                      }}
                    />
                    <AiOutlineClose
                      size={18}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCancelEditConversationTitle();
                      }}
                    />
                  </div>
                )}
                {currentConversationIndex === id && deleting && (
                  <div className="flex items-center gap-2">
                    <AiOutlineCheck
                      size={18}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteConversation(id);
                        setDeleting(false);
                      }}
                    />
                    <AiOutlineClose
                      size={18}
                      onClick={(e) => {
                        e.stopPropagation();
                        setDeleting(false);
                      }}
                    />
                  </div>
                )}
                {currentConversationIndex === id && !editing && !deleting && (
                  <div className="flex items-center gap-2">
                    <AiFillEdit
                      size={18}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditConversationTitle();
                        handleEditConversationPrompt();
                      }}
                    />
                    <AiFillDelete
                      size={18}
                      onClick={(e) => {
                        e.stopPropagation();
                        setDeleting(true);
                      }}
                    />
                  </div>
                )}
              </div>
              {currentConversationIndex === id && editing && (
                <div className="w-full">
                  <textarea
                    placeholder={`Fine-tune your conversation.\nEx. Act as a Front End expert or speak like Albert Einstein would.`}
                    value={tempPrompt || customPrompt || ""}
                    className="dark:bg-white/10 w-full bg-white p-2 rounded-bl-md rounded-br-md scrollbar-thin min-h-[100px] max-h-[200px]"
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

export default History;
