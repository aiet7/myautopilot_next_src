"use client";

import useConversationStore from "@/utils/store/interaction/conversations/conversationsStore";
import Engineer from "./Engineer";
import History from "./History";

const ChatBot = () => {
  const { activeChatBotMode } = useConversationStore();

  const renderComponent = () => {
    switch (activeChatBotMode) {
      case "Engineer":
        return <Engineer />;
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
