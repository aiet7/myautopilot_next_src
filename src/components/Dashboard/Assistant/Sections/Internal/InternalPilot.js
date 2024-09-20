"use client";

import useUiStore from "@/utils/store/ui/uiStore";
import TicketBot from "./TicketBot/TicketBot";
import ChatBot from "./ChatBot/ChatBot";
import useAssistantStore from "@/utils/store/assistant/assistantStore";
import QueueBot from "./QueueBot/QueueBot";
import AssistantMenus from "../../AssistantMenus";

const InternalPilot = () => {
  const { currentNavOption } = useUiStore();
  const { activeAssistantTab } = useAssistantStore();

  return (
    <div
      className={`flex-grow ${
        activeAssistantTab ? "h-1/2" : "h-full"
      } flex flex-col  text-xs`}
    >
      <AssistantMenus />
      {currentNavOption === "Tickets" && <TicketBot />}
      {currentNavOption === "Assistant" && <ChatBot />}
      {currentNavOption === "Queue" && <QueueBot />}
    </div>
  );
};

export default InternalPilot;
