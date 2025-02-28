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
    currentChatPage,
    chatsPerPage,
    filterChatMode,
    searchValue,
    editing,
    deleting,
    tempTitle,
    tempPrompt,
    conversationHistories,
    currentConversationIndex,
    setDeleting,
    setTempTitle,
    setTempPrompt,
    setTotalChatPages,
    setFilteredChatCount,
    handleSaveConversationTitle,
    handleNewConversation,
    handleConversationSelected,
    handleDeleteConversation,
    handleCancelEditConversationTitle,
    handleEditConversationPrompt,
    handleEditConversationTitle,
    initializeAgents,
  } = useConversationStore();

  useEffect(() => {
    initializeAgents();
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
    ?.filter((conversation) => {
      switch (filterChatMode) {
        case "Newest":
        case "Oldest":
          return true;
        default:
          return true;
      }
    })
    ?.sort((a, b) => {
      if (filterChatMode === "Newest") {
        return new Date(b.timeStamp) - new Date(a.timeStamp);
      } else if (filterChatMode === "Oldest") {
        return new Date(a.timeStamp) - new Date(b.timeStamp);
      }
      return 0;
    });

  const indexOfLastChat = currentChatPage * chatsPerPage;
  const indexOfFirstChat = indexOfLastChat - chatsPerPage;
  const paginatedChats = filteredConversationHistories?.slice(
    indexOfFirstChat,
    indexOfLastChat
  );
  useEffect(() => {
    const total = Math.ceil(
      (filteredConversationHistories?.length || 0) / chatsPerPage
    );
    setTotalChatPages(total);
    setFilteredChatCount(filteredConversationHistories?.length || 0);
  }, [conversationHistories, chatsPerPage, searchValue, filterChatMode]);

  return (
    <div className="flex flex-col h-full p-4">
      <div className="flex items-center w-full pb-4">
        <button
          onClick={handleNewConversation}
          className="flex items-center gap-2 text-sm border transition ease-in hover:bg-[#FFFFFF] hover:text-[#465E89]   bg-[#465E89] text-white font-bold px-5 rounded py-2"
        >
          <AiOutlinePlus size={15} />
          <span>New Chat</span>
        </button>
      </div>
      <div className="flex flex-col gap-2 flex-grow overflow-y-auto scrollbar-thin">
        {paginatedChats?.map((conversation) => {
          const { id, userId, conversationName, customPrompt, timeStamp } =
            conversation;
          return (
            <div
              onClick={() => {
                handleConversationSelected(id);
              }}
              key={id}
              className={`${
                currentConversationIndex === id
                  ? "dark:bg-white/40 bg-black/20"
                  : "dark:bg-black bg-white"
              } dark:text-white dark:hover:bg-white/40 hover:bg-black/20  flex items-start justify-between gap-2 border min-h-[75px] px-4 py-3 text-black cursor-pointer rounded-md`}
            >
              <div className="flex items-center w-full">
                <div className="w-6">
                  <IoChatboxOutline size={15} />
                </div>
                <div className="w-full">
                  {currentConversationIndex === id && editing ? (
                    <textarea
                      placeholder={`Enter a title for your conversation.`}
                      onClick={(e) => e.stopPropagation()}
                      value={tempTitle}
                      className="dark:bg-white/10 w-full bg-white p-2 rounded-md scrollbar-thin  min-h-[100px] max-h-[200px]"
                      onChange={(e) => setTempTitle(e.target.value)}
                    />
                  ) : (
                    <div className="flex">
                      <div className="flex flex-col">
                        <span
                          className={`${
                            currentConversationIndex === id ? "w-44" : "w-28"
                          } truncate flex`}
                        >
                          {conversationName}
                        </span>
                        <span className="px-1">
                          {new Date(timeStamp).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="w-full flex flex-col items-end">
                {currentConversationIndex === id && editing && (
                  <div className="w-full">
                    <textarea
                      placeholder={`Fine-tune your conversation.\nEx. Act as a Front End expert or speak like Albert Einstein would.`}
                      value={tempPrompt || customPrompt || ""}
                      className="dark:bg-white/10 w-full bg-white p-2 rounded-md scrollbar-thin  min-h-[100px] max-h-[200px]"
                      onChange={(e) => setTempPrompt(e.target.value)}
                    />
                  </div>
                )}
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
                  <div className="flex items-center gap-2 ">
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
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default History;
