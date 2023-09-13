"use client";

import {
  AiFillDelete,
  AiFillEdit,
  AiOutlineCheck,
  AiOutlineClose,
} from "react-icons/ai";
import { IoChatboxOutline } from "react-icons/io5";

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

  const { selectedAgent } = useAgentsStore();

  const { openHistory } = useUiStore();

  return (
    <div
      className={`absolute z-10 top-0 bottom-0 left-0  
      ${
        openHistory ? "translate-x-0 w-[350px]" : "-translate-x-full w-[350px] "
      }  dark:bg-[#111111] bg-[#f6f8fc] p-4 flex flex-col transition-transform duration-300 ease-in-out transform `}
    >
      <button
        onClick={() =>
          handleNewConversation(
            conversationHistories[selectedAgent]
              ? conversationHistories[selectedAgent].length
              : 0
          )
        }
        className="w-full p-4 bg-blue-800 text-white"
      >
        + New Chat
      </button>
      <div className="overflow-y-auto h-full scrollbar-thin">
        {conversationHistories[selectedAgent]?.map((conversation, index) => {
          const { id, userID, conversationName, customPrompt, agentID } =
            conversation;
          return (
            <div key={index} className="flex flex-col items-start my-2">
              <div
                onClick={() => handleConversationSelected(index, agentID)}
                className={`${`${
                  currentConversationIndices[selectedAgent] === index &&
                  "dark:bg-white/40 bg-black/20"
                }`} dark:text-white dark:hover:bg-white/40 hover:bg-black/20 text-black w-full flex items-center justify-between px-2 h-[50px] cursor-pointer`}
              >
                <div className="flex items-center">
                  <div className="w-8">
                    <IoChatboxOutline size={20} />
                  </div>
                  <div className="w-40 truncate flex">
                    {currentConversationIndices[selectedAgent] === index &&
                    editing ? (
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
                  {currentConversationIndices[selectedAgent] === index &&
                    editing && (
                      <div className="flex items-center gap-2">
                        <AiOutlineCheck
                          size={20}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSaveConversationTitle(
                              id,
                              userID,
                              selectedAgent
                            );
                          }}
                        />
                        <AiOutlineClose
                          size={20}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCancelEditConversationTitle();
                          }}
                        />
                      </div>
                    )}
                  {currentConversationIndices[selectedAgent] === index &&
                    deleting && (
                      <div className="flex items-center gap-2">
                        <AiOutlineCheck
                          size={20}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteConversation(id);
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
                  {currentConversationIndices[selectedAgent] === index &&
                    !editing &&
                    !deleting && (
                      <div className="flex items-center gap-2">
                        <AiFillEdit
                          size={20}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditConversationTitle(selectedAgent);
                            handleEditConversationPrompt(selectedAgent);
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
              {currentConversationIndices[selectedAgent] === index &&
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
