"use client";

import ChatHistory from "./ChatHistory.js";
import ChatInteraction from "./ChatInteraction.js";
import ChatAssistant from "./ChatAssistant.js";

const Chat = ({
  initialUser,

  promptAssistantInput,
  openChatHistory,
  openChatAssistant,

  currentConversationIndex,
  conversationHistory,
  setConversationHistory,

  handleNewConversation,
  handleDeleteConversation,
  handleConversationSelected,
  handlePromptAssistantInput,
}) => {
  return (
    <div className="flex flex-1 relative overflow-hidden">
      <ChatHistory
        openChatHistory={openChatHistory}
        currentConversationIndex={currentConversationIndex}
        conversationHistory={conversationHistory}
        handleNewConversation={handleNewConversation}
        handleDeleteConversation={handleDeleteConversation}
        handleConversationSelected={handleConversationSelected}
      />
      <ChatInteraction
        initialUser={initialUser}
        promptAssistantInput={promptAssistantInput}
        openChatHistory={openChatHistory}
        openChatAssistant={openChatAssistant}
        currentConversationIndex={currentConversationIndex}
        conversationHistory={conversationHistory}
        setConversationHistory={setConversationHistory}

        handleNewConversation={handleNewConversation}
      />
      <ChatAssistant
        openChatAssistant={openChatAssistant}
        handlePromptAssistantInput={handlePromptAssistantInput}
      />
    </div>
  );
};

export default Chat;
