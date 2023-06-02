"use client";

import { AiFillDelete } from "react-icons/ai";
import { IoChatboxOutline } from "react-icons/io5";

const ChatHistory = ({
  openChatHistory,
  currentConversationIndex,
  conversationHistory,
  handleNewConversation,
  handleDeleteConversation,
  handleConversationSelected,
}) => {
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
          const { conversationName } = conversation;
          return (
            <div
              key={index}
              className={`${
                currentConversationIndex === index &&
                "dark:bg-white/20 bg-black/10"
              } dark:text-white dark:hover:bg-white/20 hover:bg-black/10 text-black w-full flex items-center justify-between h-[50px] px-4 rounded-md cursor-pointer`}
            >
              <div
                onClick={() => handleConversationSelected(index)}
                className="flex items-center gap-2 w-full h-full"
              >
                <IoChatboxOutline size={20} />
                <span>{conversationName}</span>
              </div>
              <AiFillDelete
                size={20}
                onClick={() => handleDeleteConversation(index)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChatHistory;
