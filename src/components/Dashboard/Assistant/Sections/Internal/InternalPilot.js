"use client";

import useUiStore from "@/utils/store/ui/uiStore";
import TicketBot from "./TicketBot/TicketBot";
import ChatBot from "./ChatBot/ChatBot";
import Activities from "./QueueBot/Activities";
import AllQueueTickets from "./QueueBot/AllQueueTickets";
import QueueWorkspace from "./QueueBot/QueueWorkspace/QueueWorkspace";
import useAssistantStore from "@/utils/store/assistant/assistantStore";

const InternalPilot = () => {
  const { currentNavOption, currentQueueNavOption } = useUiStore();
  const { activeAssistantTab } = useAssistantStore();

  return (
    <div
      className={`flex-grow ${
        activeAssistantTab ? "h-1/2" : "h-full"
      } flex flex-col text-xs`}
    >
      {currentNavOption === "Tickets" && <TicketBot />}
      {currentNavOption === "Engineer" && <ChatBot />}
      {currentNavOption === "Queue" &&
        currentQueueNavOption === "Activities" && <Activities />}
      {currentNavOption === "Queue" &&
        currentQueueNavOption === "Queue Tickets" && <AllQueueTickets />}
      {currentNavOption === "Queue" &&
        currentQueueNavOption === "Workspace" && <QueueWorkspace />}
    </div>
  );
};

export default InternalPilot;
