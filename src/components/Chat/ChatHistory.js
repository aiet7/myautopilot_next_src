"use client";

import { AiFillDelete } from "react-icons/ai";

const ChatHistory = ({
  openChatHistory,
  conversationHistory,
  handleNewConversation,
  handleDeleteConversation,
  handleConversationSelected,
}) => {
  return (
    <div
      className={`px-4 py-10 bg-white absolute z-10 top-0 bottom-0 transition-all duration-300 ease-in-out transform ${
        openChatHistory ? "translate-x-0 w-[300px]" : "-translate-x-[600px] w-[300px]"
      } lg:relative lg:translate-x-0 lg:w-[300px] lg:bg-transparent lg:shadow-lg lg:static`}
    >
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
              <button onClick={() => handleConversationSelected(index)}>
                Chat {index + 1}
              </button>
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
