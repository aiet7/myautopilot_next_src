"use client";


import ChatHistory from "./ChatHistory.js";
import ChatInteraction from "./ChatInteraction.js";
import ChatAssistant from "./ChatAssistant.js";

import { AiOutlineHistory } from "react-icons/ai";
import { BiBrain } from "react-icons/bi";

const Chat = ({
  openChatHistory,
  openChatAssistant,

  currentConversationIndex,
  conversationHistory,
  setConversationHistory,

  handleNewConversation,
  handleDeleteConversation,
  handleConversationSelected,

  handleOpenChatHistory,
  handleOpenChatAssistant,
}) => {
  return (
    <div className="relative flex w-full h-full overflow-hidden">
      <div className="absolute bg-white z-[999] w-full flex justify-between p-2 lg:hidden">
        <AiOutlineHistory
          size={25}
          className="cursor-pointer"
          onClick={handleOpenChatHistory}
        />
        <BiBrain
          size={25}
          className="cursor-pointer"
          onClick={handleOpenChatAssistant}
        />
      </div>
      <ChatHistory
        openChatHistory={openChatHistory}
        conversationHistory={conversationHistory}
        handleNewConversation={handleNewConversation}
        handleDeleteConversation={handleDeleteConversation}
        handleConversationSelected={handleConversationSelected}
      />
      <ChatInteraction
        currentConversationIndex={currentConversationIndex}
        conversationHistory={conversationHistory}
        setConversationHistory={setConversationHistory}
      />
      <ChatAssistant openChatAssistant={openChatAssistant} />
    </div>
  );
};

export default Chat;
