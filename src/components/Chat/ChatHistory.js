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
      className={`px-4 py-10 bg-gray-100 dark:bg-black dark:shadow-white shadow-lg shadow-black/50 absolute z-10 top-0 bottom-0 transition-all duration-300 ease-in-out transform ${
        openChatHistory
          ? "translate-x-0 w-[300px]"
          : "-translate-x-[600px] w-[300px]"
      } md:relative md:translate-x-0 md:min-w-[300px] md:static`}
    >
      <button
        onClick={handleNewConversation}
        className="w-full rounded-md p-4 bg-blue-500 text-white"
      >
        + New Chat
      </button>
      <div className="flex flex-col gap-2 my-4  overflow-y-auto max-h-[60vh] no-scrollbar md:max-h-[75vh]">
        {conversationHistory.map((conversation, index) => {
          return (
            <div
              key={index}
              className="bg-gray-500 text-white w-full flex items-center justify-between p-4 w-full rounded-md"
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
