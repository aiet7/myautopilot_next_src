"use client";

import ChatHistory from "./ChatHistory.js";
import ChatInteraction from "./ChatInteraction.js";
import ChatAssistant from "./ChatAssistant.js";

const Chat = ({ conversationHistory, handleNewConversation, handleDeleteConversation }) => {
  return (
    <div className="flex w-full h-full">
      <ChatHistory
        conversationHistory={conversationHistory}
        handleNewConversation={handleNewConversation}
        handleDeleteConversation={handleDeleteConversation}
      />
      <ChatInteraction conversationHistory={conversationHistory} />
      <ChatAssistant />
    </div>
  );
};

export default Chat;
