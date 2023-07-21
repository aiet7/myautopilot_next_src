"use client";

import AgentGuide from "./AgentGuide";
import AgentAssistant from "./AgentAssistant";
import AgentSelection from "./AgentSelection";
import AgentInteraction from "./AgentInteraction";
import AgentChatHistory from "./AgentChatHistory";

const Agent = ({
  activeTab,
  initialUser,
  initialAgents,
  selectedAgent,
  promptAssistantInput,
  conversationHistories,
  currentConversationIndices,
  openAgentHistory,
  openAgentAssistant,
  openAgentSelectionHover,
  setConversationHistories,
  handlePromptAssistantInput,
  handleConversationSelected,
  handleNewConversation,
  handleDeleteConversation,
  handleOpenAgentSelectionHide,
  handleOpenAgentHistory,
  handleOpenAgentAssistant,
  handleAgentSelected,
}) => {
  return (
    <div className="flex flex-1 relative overflow-hidden">
      {selectedAgent ? (
        <AgentChatHistory
          initialAgents={initialAgents}
          selectedAgent={selectedAgent}
          conversationHistories={conversationHistories}
          currentConversationIndices={currentConversationIndices}
          setConversationHistories={setConversationHistories}
          openAgentHistory={openAgentHistory}
          handleConversationSelected={handleConversationSelected}
          handleNewConversation={handleNewConversation}
          handleDeleteConversation={handleDeleteConversation}
        />
      ) : (
        <AgentSelection
          initialAgents={initialAgents}
          openAgentHistory={openAgentHistory}
          openAgentSelectionHover={openAgentSelectionHover}
          handleOpenAgentSelectionHide={handleOpenAgentSelectionHide}
          handleAgentSelected={handleAgentSelected}
        />
      )}
      {selectedAgent ? (
        <AgentInteraction
          activeTab={activeTab}
          initialUser={initialUser}
          selectedAgent={selectedAgent}
          promptAssistantInput={promptAssistantInput}
          conversationHistories={conversationHistories}
          currentConversationIndices={currentConversationIndices}
          setConversationHistories={setConversationHistories}
          openAgentHistory={openAgentHistory}
          openAgentAssistant={openAgentAssistant}
          handleNewConversation={handleNewConversation}
          handleOpenAgentHistory={handleOpenAgentHistory}
          handleOpenAgentAssistant={handleOpenAgentAssistant}
        />
      ) : (
        <AgentGuide
          openAgentHistory={openAgentHistory}
          handleOpenAgentHistory={handleOpenAgentHistory}
        />
      )}
      {selectedAgent ? (
        <AgentAssistant
          initialAgents={initialAgents}
          selectedAgent={selectedAgent}
          openAgentAssistant={openAgentAssistant}
          handlePromptAssistantInput={handlePromptAssistantInput}
        />
      ) : null}
    </div>
  );
};

export default Agent;
