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
import useAssistantStore from "@/utils/store/assistant/assistantStore";
import useUserStore from "@/utils/store/user/userStore";
import useTicketConversationsStore from "@/utils/store/interaction/conversations/ticketConversationsStore";
import useUiStore from "@/utils/store/ui/uiStore";

const History = ({}) => {
  const { user } = useUserStore();

  const { troubleshootContinue } = useTicketConversationsStore();
  const {
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
    handleSaveConversationTitle,
    handleNewConversation,
    handleConversationSelected,
    handleDeleteConversation,
    handleCancelEditConversationTitle,
    handleEditConversationPrompt,
    handleEditConversationTitle,
    initializeConversations,
  } = useConversationStore();

  const { currentNavOption } = useUiStore();

  useEffect(() => {
    if (currentNavOption === "Engineer" && !troubleshootContinue) {
      initializeConversations();
    }
  }, [user, currentNavOption]);

  const filteredConversationHistories = conversationHistories
    ?.filter((conversation) => {
      if (!searchValue) return true;
      if (
        conversation.conversationName.includes(searchValue) ||
        conversation.conversationName.toLowerCase().includes(searchValue)
      )
        return true;
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

  return (
    <div className="flex flex-col h-full">
      <button
        onClick={() =>
          handleNewConversation(
            conversationHistories ? conversationHistories.length : 0
          )
        }
        className="dark:shadow-white/40 hover:bg-blue-500 flex items-center gap-1 self-start font-semibold px-4 py-3 mb-3 bg-blue-800 text-white rounded-lg shadow-lg"
      >
        <AiOutlinePlus size={15} />
        <span>New Chat</span>
      </button>

      <div className="flex-grow overflow-y-auto scrollbar-thin ">
        {filteredConversationHistories.map((conversation, index) => {
          const { id, userId, conversationName, customPrompt, timeStamp } =
            conversation;
          return (
            <div
              onClick={() => handleConversationSelected(index, id)}
              key={index}
              className={`${`${
                currentConversationIndex === index &&
                "dark:bg-white/50 bg-black/15"
              }`} dark:bg-white/30 dark:text-white dark:border-white/20 dark:hover:bg-white/40 hover:bg-black/15  bg-white flex items-start justify-between my-2 border min-h-[75px]  px-4 py-3 cursor-pointer rounded-md`}
            >
              <div className="flex items-center">
                <div className="w-6 ">
                  <IoChatboxOutline size={15} />
                </div>
                <div
                  className={`${
                    currentConversationIndex === index ? "w-28" : "w-44"
                  } truncate flex`}
                >
                  {currentConversationIndex === index && editing ? (
                    <input
                      onClick={(e) => e.stopPropagation()}
                      value={tempTitle}
                      className="bg-white text-black truncate flex px-1 "
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
                {currentConversationIndex === index && editing && (
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
                {currentConversationIndex === index && deleting && (
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
                {currentConversationIndex === index &&
                  !editing &&
                  !deleting && (
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
              {currentConversationIndex === index && editing && (
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
