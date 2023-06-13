"use client";

import {
  AiFillDelete,
  AiFillEdit,
  AiOutlineCheck,
  AiOutlineClose,
} from "react-icons/ai";
import { IoChatboxOutline } from "react-icons/io5";

import { useEffect, useState } from "react";

const ChatHistory = ({
  openChatHistory,
  currentConversationIndex,
  conversationHistory,
  setConversationHistory,
  handleNewConversation,
  handleDeleteConversation,
  handleConversationSelected,
}) => {
  const [tempTitle, setTempTitle] = useState("");
  const [editing, setEditing] = useState(false);

  const handleSaveConversationTitle = async (id, userID) => {
    let updatedConversation = {
      ...conversationHistory[currentConversationIndex],
    };
    updatedConversation.conversationName = tempTitle;

    const response = await fetch(
      /*`http://localhost:9019/addConversation`,*/
      `https://etech7-wf-etech7-db-service.azuremicroservices.io/addConversation`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          userID: userID,
          conversationName: updatedConversation.conversationName,
          timeStamp: Date.now(),
          deleted: false,
        }),
      }
    );

    if (response.status === 200) {
      let updatedConversationHistory = [...conversationHistory];
      updatedConversationHistory[currentConversationIndex] =
        updatedConversation;
      setConversationHistory(updatedConversationHistory);
      setEditing(false);
    } else {
      console.log("Error occurred.");
    }
  };

  const handleEditConversationTitle = () => {
    setTempTitle(
      conversationHistory[currentConversationIndex].conversationName
    );
    setEditing(true);
  };

  const handleCancelEditConversationTitle = () => {
    setTempTitle("");
    setEditing(false);
  };

  useEffect(() => {
    setEditing(false);
  }, [currentConversationIndex]);

  return (
    <div
      className={`px-2 py-10 bg-gray-100 dark:bg-black absolute z-10 top-0 bottom-0 transition-all duration-300 ease-in-out transform ${
        openChatHistory
          ? "translate-x-0 w-[300px] dark:shadow-white shadow-lg shadow-black/50"
          : "-translate-x-full w-[300px]"
      } md:relative md:translate-x-0 md:min-w-[300px] md:static md:dark:shadow-white md:shadow-lg md:shadow-black/50`}
    >
      <button
        onClick={() => handleNewConversation(conversationHistory.length)}
        className="w-full rounded-md p-4 bg-blue-500 text-white"
      >
        + New Chat
      </button>
      <div className="flex flex-col gap-2 my-4 overflow-y-auto max-h-[50vh] no-scrollbar md:max-h-[75vh]">
        {conversationHistory.map((conversation, index) => {
          const { id, userID, conversationName } = conversation;
          return (
            <div
              key={index}
              className={`${
                currentConversationIndex === index &&
                "dark:bg-white/20 bg-black/10"
              } dark:text-white dark:hover:bg-white/20 hover:bg-black/10 text-black w-full flex items-center justify-between h-[50px] px-4 rounded-md cursor-pointer`}
            >
              <div
                className="w-8"
                onClick={
                  !editing ? () => handleConversationSelected(index) : null
                }
              >
                <IoChatboxOutline size={20} />
              </div>
              <div
                onClick={
                  !editing ? () => handleConversationSelected(index) : null
                }
                className="w-40 truncate flex"
              >
                {currentConversationIndex === index && editing ? (
                  <input
                    value={tempTitle}
                    className="bg-white text-black truncate flex px-1 "
                    onChange={(e) => setTempTitle(e.target.value)}
                  />
                ) : (
                  <span className="px-1">{conversationName}</span>
                )}
              </div>
              <div className="w-12">
                {currentConversationIndex === index && editing && (
                  <div className="flex items-center gap-2">
                    <AiOutlineCheck
                      size={20}
                      onClick={() => handleSaveConversationTitle(id, userID)}
                    />
                    <AiOutlineClose
                      size={20}
                      onClick={handleCancelEditConversationTitle}
                    />
                  </div>
                )}
                {currentConversationIndex === index && !editing && (
                  <div className="flex items-center gap-2">
                    <AiFillEdit
                      size={20}
                      onClick={() => handleEditConversationTitle(index)}
                    />
                    <AiFillDelete
                      size={20}
                      onClick={() => handleDeleteConversation(index)}
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

export default ChatHistory;
