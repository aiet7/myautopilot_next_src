"use client";

import { AiFillDelete } from "react-icons/ai";

const ChatHistory = ({
  conversationHistory,
  handleNewConversation,
  handleDeleteConversation,
}) => {
  
  return (
    <div className="hidden p-4 shadow-lg sm:w-[300px] sm:block">
      <button
        onClick={handleNewConversation}
        className="bg-blue-400 w-full rounded-md p-4 text-white"
      >
        + New Chat
      </button>
      <div className="flex flex-col gap-2 my-4  overflow-y-auto max-h-[75vh] no-scrollbar">
        {conversationHistory.map((conversation, index) => {
          return (
            <div
              key={index}
              className="w-full flex items-center justify-between p-4 bg-gray-200 w-full rounded-md"
            >
              <button>Chat {index + 1}</button>
              <AiFillDelete
                size={20}
                onClick={() => handleDeleteConversation(index)}
                className="cursor-pointer"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChatHistory;
