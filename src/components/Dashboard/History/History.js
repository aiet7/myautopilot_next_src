"use client";
import { useEffect } from "react";
import {
  AiFillDelete,
  AiFillEdit,
  AiOutlineCheck,
  AiOutlineClose,
} from "react-icons/ai";
import { IoChatboxOutline } from "react-icons/io5";

import useConversationStore from "@/utils/store/interaction/conversations/conversationsStore";
import useUiStore from "@/utils/store/ui/uiStore";
import useAssistantStore from "@/utils/store/assistant/assistantStore";
import useUserStore from "@/utils/store/user/userStore";
import useTicketConversationsStore from "@/utils/store/interaction/conversations/ticketConversationsStore";

const History = ({}) => {
  const { user } = useUserStore();

  const { troubleshootContinue } = useTicketConversationsStore();
  const {
    searchValue,
    editing,
    deleting,
    tempTitle,
    tempPrompt,
    conversationHistories,
    currentConversationIndex,
    setSearchValue,
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

  const { openHistory } = useUiStore();
  const { activeUIAssistantTab } = useAssistantStore();

  useEffect(() => {
    if (activeUIAssistantTab === "Engineer" && !troubleshootContinue) {
      initializeConversations();
    }
  }, [user, activeUIAssistantTab]);

  const filteredConversationHistories = conversationHistories.filter(
    (conversation) => {
      if (!searchValue) return true;
      if (
        conversation.conversationName.includes(searchValue) ||
        conversation.conversationName.toLowerCase().includes(searchValue)
      )
        return true;
    }
  );


  return (
    <div
      className={`absolute z-10 top-0 bottom-0 left-0 text-sm
      ${
        openHistory
          ? "translate-x-0 w-full md:w-[250px]"
          : "-translate-x-full w-full md:w-[250px]"
      } dark:bg-[#111111] dark:border-white/10  bg-[#f6f8fc] p-4 flex flex-col transition-all duration-300 ease md:border-r md:border-black/10`}
    >
      <button
        onClick={() =>
          handleNewConversation(
            conversationHistories ? conversationHistories.length : 0
          )
        }
        className="dark:shadow-white/40 hover:bg-blue-500 w-full px-4 py-3 bg-blue-800 text-white rounded-lg shadow-lg"
      >
        + New Chat
      </button>
      <input
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        className="my-3 p-2 rounded-md border"
        placeholder="Search Conversation"
      />
      <div className="overflow-y-auto h-full scrollbar-thin ">
        {filteredConversationHistories.map((conversation, index) => {
          const { id, userId, conversationName, customPrompt } = conversation;
          return (
            <div key={index} className="flex flex-col items-start my-1">
              <div
                onClick={() => handleConversationSelected(index, id)}
                className={`${`${
                  currentConversationIndex === index &&
                  "dark:bg-white/40 bg-black/20"
                }`} dark:text-white dark:hover:bg-white/40 hover:bg-black/20 text-black w-full flex items-center justify-between px-4 py-3 cursor-pointer rounded-lg`}
              >
                <div className="flex items-center">
                  <div className="w-6">
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
                      <span className="px-1">{conversationName}</span>
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
              </div>
              {currentConversationIndex === index && editing && (
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

export default History;
