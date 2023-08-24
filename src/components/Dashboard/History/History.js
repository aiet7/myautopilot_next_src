"use client";

import {
  AiFillDelete,
  AiFillEdit,
  AiOutlineCheck,
  AiOutlineClose,
} from "react-icons/ai";
import { IoChatboxOutline } from "react-icons/io5";

import { useEffect } from "react";
import useConversationStore from "@/utils/store/interaction/conversations/conversationsStore";
import useAgentsStore from "@/utils/store/agents/agentsStore";
import useUiStore from "@/utils/store/ui/uiStore";

const History = ({}) => {
  const {
    editing,
    deleting,
    tempTitle,
    tempPrompt,
    conversationHistories,
    currentConversationIndices,
    setEditing,
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
  } = useConversationStore();

  const { displayedAgent } = useAgentsStore();

  const { hoverTab, openHistory } = useUiStore();

  useEffect(() => {
    setEditing(false);
  }, [currentConversationIndices]);

  return (
    <div
      className={`${hoverTab === "general" && "bubble-chat h-full  shadow-lg shadow-blue-500"} ${
        openHistory ? "translate-x-0 w-[300px]" : "-translate-x-full w-[300px] "
      }  dark:bg-[#111111] bg-[#f6f8fc] absolute z-10 top-0 bottom-0 left-0 p-4 flex flex-col transition-all duration-300 ease-in-out transform xl:relative xl:min-w-[300px] xl:translate-x-0`}
    >
      <button
        onClick={() =>
          handleNewConversation(
            conversationHistories[displayedAgent]
              ? conversationHistories[displayedAgent].length
              : 0
          )
        }
        className={`w-full p-4 bg-blue-800 text-white`}
      >
        + New Chat
      </button>
      <div
        className={`h-[200px] overflow-y-auto h-full scrollbar-thin lg:h-full`}
      >
        {conversationHistories[displayedAgent]?.map((conversation, index) => {
          const { id, userID, conversationName, customPrompt, agentID } =
            conversation;
          return (
            <div key={index} className="flex flex-col items-start my-2">
              <div
                className={`${`${
                  currentConversationIndices[displayedAgent] === index &&
                  "dark:bg-white/40 bg-black/20"
                }`} dark:text-white dark:hover:bg-white/40 hover:bg-black/20 text-black w-full flex items-center justify-between px-2 h-[50px] cursor-pointer`}
              >
                <div className="flex items-center">
                  <div
                    className="w-8"
                    onClick={
                      !editing && !deleting
                        ? () => handleConversationSelected(index, agentID)
                        : null
                    }
                  >
                    <IoChatboxOutline size={20} />
                  </div>
                  <div
                    onClick={
                      !editing && !deleting
                        ? () => handleConversationSelected(index, agentID)
                        : null
                    }
                    className="w-40 truncate flex"
                  >
                    {currentConversationIndices[displayedAgent] === index &&
                    editing ? (
                      <input
                        value={tempTitle}
                        className="bg-white text-black truncate flex px-1 "
                        onChange={(e) => setTempTitle(e.target.value)}
                      />
                    ) : (
                      <span className="px-1">{conversationName}</span>
                    )}
                  </div>
                </div>

                {
                  <div className="w-12">
                    {currentConversationIndices[displayedAgent] === index &&
                      editing && (
                        <div className="flex items-center gap-2">
                          <AiOutlineCheck
                            size={20}
                            onClick={() =>
                              handleSaveConversationTitle(
                                id,
                                userID,
                                displayedAgent
                              )
                            }
                          />
                          <AiOutlineClose
                            size={20}
                            onClick={handleCancelEditConversationTitle}
                          />
                        </div>
                      )}
                    {currentConversationIndices[displayedAgent] === index &&
                      deleting && (
                        <div className="flex items-center gap-2">
                          <AiOutlineCheck
                            size={20}
                            onClick={() => {
                              handleDeleteConversation(id);
                              setDeleting(false);
                            }}
                          />
                          <AiOutlineClose
                            size={20}
                            onClick={() => setDeleting(false)}
                          />
                        </div>
                      )}
                    {currentConversationIndices[displayedAgent] === index &&
                      !editing &&
                      !deleting && (
                        <div className="flex items-center gap-2">
                          <AiFillEdit
                            size={20}
                            onClick={() => {
                              handleEditConversationTitle(displayedAgent);
                              handleEditConversationPrompt(displayedAgent);
                            }}
                          />
                          <AiFillDelete
                            size={20}
                            onClick={() => setDeleting(true)}
                          />
                        </div>
                      )}
                  </div>
                }
              </div>
              {currentConversationIndices[displayedAgent] === index &&
                editing && (
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
