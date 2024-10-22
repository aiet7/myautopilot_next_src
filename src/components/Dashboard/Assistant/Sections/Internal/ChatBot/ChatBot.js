"use client";

import useConversationStore from "@/utils/store/interaction/conversations/conversationsStore";
import History from "./History";
import CreateAssistant from "./CreateAssistant";
import EditAssistant from "./EditAssistant";

const ChatBot = () => {
  const { assistantMode } = useConversationStore();

  const renderComponent = () => {
    switch (assistantMode) {
      case "Edit":
        return <EditAssistant />;
      case "Create":
        return <CreateAssistant />;
      case "History":
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
