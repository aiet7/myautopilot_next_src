"use client";

import ChatHistory from "./ChatHistory.js";
import ChatInteraction from "./ChatInteraction.js";
import ChatAssistant from "./ChatAssistant.js";

const Chat = ({
  openChatHistory,
  openChatAssistant,

  currentConversationIndex,
  conversationHistory,
  setConversationHistory,

  handleNewConversation,
  handleDeleteConversation,
  handleConversationSelected,
}) => {
  return (
    <div className="relative flex w-full h-full overflow-hidden">
      <ChatHistory
        openChatHistory={openChatHistory}
        conversationHistory={conversationHistory}
        handleNewConversation={handleNewConversation}
        handleDeleteConversation={handleDeleteConversation}
        handleConversationSelected={handleConversationSelected}
      />
      <ChatInteraction
        openChatHistory={openChatHistory}
        openChatAssistant={openChatAssistant}
        currentConversationIndex={currentConversationIndex}
        conversationHistory={conversationHistory}
        setConversationHistory={setConversationHistory}
      />
      <ChatAssistant openChatAssistant={openChatAssistant} />
    </div>
  );
};

export default Chat;
