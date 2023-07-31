"use client";

import ChatHistory from "./ChatHistory.js";
import ChatInteraction from "./ChatInteraction.js";
import ChatAssistant from "./ChatAssistant.js";

const Chat = ({
  activeTab,
  initialUser,
  selectedAgent,
  promptAssistantInput,
  openChatHistoryHover,
  openChatHistory,
  openChatAssistant,
  currentConversationIndices,
  currentConversationIndex,
  conversationHistories,
  conversationHistory,
  setConversationHistories,
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
        selectedAgent={selectedAgent}
        openChatHistoryHover={openChatHistoryHover}
        openChatHistory={openChatHistory}
        currentConversationIndices={currentConversationIndices}
        currentConversationIndex={currentConversationIndex}
        conversationHistories={conversationHistories}
        conversationHistory={conversationHistory}
        setConversationHistories={setConversationHistories}
        setConversationHistory={setConversationHistory}
        handleNewConversation={handleNewConversation}
        handleDeleteConversation={handleDeleteConversation}
        handleConversationSelected={handleConversationSelected}
      />
      <ChatInteraction
        selectedAgent={selectedAgent}
        activeTab={activeTab}
        initialUser={initialUser}
        promptAssistantInput={promptAssistantInput}
        openChatHistory={openChatHistory}
        openChatAssistant={openChatAssistant}
        currentConversationIndices={currentConversationIndices}
        currentConversationIndex={currentConversationIndex}
        conversationHistories={conversationHistories}
        conversationHistory={conversationHistory}
        setConversationHistories={setConversationHistories}
        setConversationHistory={setConversationHistory}
        handleNewConversation={handleNewConversation}
        handleOpenChatHistory={handleOpenChatHistory}
        handleOpenChatAssistant={handleOpenChatAssistant}
      />
      <ChatAssistant
        initialUser={initialUser}
        openChatAssistant={openChatAssistant}
        handlePromptAssistantInput={handlePromptAssistantInput}
      />
    </div>
  );
};

export default Chat;
