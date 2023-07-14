"use client";

import {
  AiFillDelete,
  AiFillEdit,
  AiOutlineCheck,
  AiOutlineClose,
} from "react-icons/ai";

import { IoChatboxOutline } from "react-icons/io5";

import { useEffect, useState } from "react";

const AgentChatHistory = ({
  initialAgents,
  selectedAgent,
  conversationHistories,
  currentConversationIndices,
  openAgentHistory,
  setConversationHistories,
  handleConversationSelected,
  handleNewConversation,
  handleDeleteConversation,
}) => {
  const [tempTitle, setTempTitle] = useState("");
  const [tempPrompt, setTempPrompt] = useState("");

  const [editing, setEditing] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleSaveConversationTitle = async (id, userID, selectedAgent) => {
    let updatedConversation = {
      ...conversationHistories[selectedAgent][
        currentConversationIndices[selectedAgent]
      ],
    };
    updatedConversation.conversationName = tempTitle;
    updatedConversation.customPrompt = tempPrompt;

    const response = await fetch(
      // `http://localhost:9019/addConversation`,
      `https://etech7-wf-etech7-db-service.azuremicroservices.io/addConversation`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          userID: userID,
          agentID: selectedAgent,
          conversationName: updatedConversation.conversationName,
          customPrompt: updatedConversation.customPrompt,
          timeStamp: Date.now(),
          deleted: false,
        }),
      }
    );

    if (response.status === 200) {
      let updatedConversationHistory = [
        ...conversationHistories[selectedAgent],
      ];
      updatedConversationHistory[currentConversationIndices[selectedAgent]] =
        updatedConversation;
      let newConversationHistories = { ...conversationHistories };
      newConversationHistories[selectedAgent] = updatedConversationHistory;
      setConversationHistories(newConversationHistories);
      setEditing(false);
    } else {
      console.log("Error occurred.");
    }
  };

  const handleEditConversationTitle = (selectedAgent) => {
    setTempTitle(
      conversationHistories[selectedAgent][
        currentConversationIndices[selectedAgent]
      ].conversationName
    );
    setEditing(true);
  };

  const handleEditConversationPrompt = (selectedAgent) => {
    setTempPrompt(
      conversationHistories[selectedAgent][
        currentConversationIndices[selectedAgent]
      ].customPrompt
    );
    setEditing(true);
  };

  const handleCancelEditConversationTitle = () => {
    setTempTitle("");
    setTempPrompt("");
    setEditing(false);
  };

  useEffect(() => {
    setEditing(false);
  }, [currentConversationIndices]);

  return (
    <div
      className={`px-4 py-6 bg-[#f6f8fc] absolute z-10 top-0 bottom-0 transition-all duration-300 ease-in-out transform flex flex-col ${
        openAgentHistory
          ? "translate-x-0 w-[300px] dark:shadow-white shadow-lg shadow-black/50"
          : "-translate-x-full w-[300px]"
      } dark:bg-[#111111] dark:xl:border-white/20 xl:relative xl:translate-x-0 xl:min-w-[300px] xl:static xl:border-r`}
    >
      <h2 className="text-center font-bold text-xl pb-2">
        {initialAgents.find((agent) => agent.id === selectedAgent).agentName}
      </h2>
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

      <div className="h-[200px] overflow-auto h-full scollbar-thin lg:h-full">
        {conversationHistories[selectedAgent]?.map((conversation, index) => {
          const { id, userID, conversationName, customPrompt, agentID } =
            conversation;
          return (
            <div key={index} className="flex flex-col items-start my-2">
              <div
                className={`${
                  currentConversationIndices[selectedAgent] === index &&
                  "dark:bg-white/40 bg-black/20"
                } dark:text-white dark:hover:bg-white/40 hover:bg-black/20 text-black w-full flex items-center justify-between px-2 h-[50px] cursor-pointer`}
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
                    {currentConversationIndices[selectedAgent] === index &&
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

                <div className="w-12">
                  {currentConversationIndices[selectedAgent] === index &&
                    editing && (
                      <div className="flex items-center gap-2">
                        <AiOutlineCheck
                          size={20}
                          onClick={() =>
                            handleSaveConversationTitle(
                              id,
                              userID,
                              selectedAgent
                            )
                          }
                        />
                        <AiOutlineClose
                          size={20}
                          onClick={handleCancelEditConversationTitle}
                        />
                      </div>
                    )}
                  {currentConversationIndices[selectedAgent] === index &&
                    deleting && (
                      <div className="flex items-center gap-2">
                        <AiOutlineCheck
                          size={20}
                          onClick={() => {
                            handleDeleteConversation(index);
                            setDeleting(false);
                          }}
                        />
                        <AiOutlineClose
                          size={20}
                          onClick={() => setDeleting(false)}
                        />
                      </div>
                    )}
                  {currentConversationIndices[selectedAgent] === index &&
                    !editing &&
                    !deleting && (
                      <div className="flex items-center gap-2">
                        <AiFillEdit
                          size={20}
                          onClick={() => {
                            handleEditConversationTitle(selectedAgent);
                            handleEditConversationPrompt(selectedAgent);
                          }}
                        />
                        <AiFillDelete
                          size={20}
                          onClick={() => setDeleting(true)}
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

export default AgentChatHistory;
