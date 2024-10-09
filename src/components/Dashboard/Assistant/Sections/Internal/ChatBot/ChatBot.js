"use client";

import useConversationStore from "@/utils/store/interaction/conversations/conversationsStore";
import History from "./History";
import CreateAssistant from "./CreateAssistant";

const ChatBot = () => {
  const { createAssistantMode } = useConversationStore();

  const renderComponent = () => {
    switch (createAssistantMode) {
      case true:
        return <CreateAssistant />;
      case false:
        return <History />;

      default:
        return null;
    }
  };

  return (
    <div className="flex-grow overflow-y-auto flex flex-col">
      {renderComponent()}
    </div>
  );
};

export default ChatBot;
