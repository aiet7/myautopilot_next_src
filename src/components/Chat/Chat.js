"use client";

import ChatHistory from "./ChatHistory.js";
import ChatInteraction from "./ChatInteraction.js";
import ChatAssistant from "./ChatAssistant.js";

const Chat = ({
  activeTab,
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

  handleOpenChatHistory,
  handleOpenChatAssistant,
}) => {
  return (
    <div className="flex flex-1 relative overflow-hidden">
      <ChatHistory
        openChatHistory={openChatHistory}
        currentConversationIndex={currentConversationIndex}
        conversationHistory={conversationHistory}
        setConversationHistory={setConversationHistory}
        handleNewConversation={handleNewConversation}
        handleDeleteConversation={handleDeleteConversation}
        handleConversationSelected={handleConversationSelected}
      />
      <ChatInteraction
        activeTab={activeTab}
        initialUser={initialUser}
        promptAssistantInput={promptAssistantInput}
        openChatHistory={openChatHistory}
        openChatAssistant={openChatAssistant}
        currentConversationIndex={currentConversationIndex}
        conversationHistory={conversationHistory}
        setConversationHistory={setConversationHistory}
        handleNewConversation={handleNewConversation}
        handleOpenChatHistory={handleOpenChatHistory}
        handleOpenChatAssistant={handleOpenChatAssistant}
      />
      <ChatAssistant
        openChatAssistant={openChatAssistant}
        handlePromptAssistantInput={handlePromptAssistantInput}
      />
    </div>
  );
};

export default Chat;
