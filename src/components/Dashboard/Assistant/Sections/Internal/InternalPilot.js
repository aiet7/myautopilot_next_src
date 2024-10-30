"use client";

import useUiStore from "@/utils/store/ui/uiStore";
import TicketBot from "./TicketBot/TicketBot";
import ChatBot from "./ChatBot/ChatBot";
import QueueBot from "./QueueBot/QueueBot";
import AssistantMenus from "../../AssistantMenus";

const InternalPilot = () => {
  const { currentNavOption } = useUiStore();

  return (
    <div className={`flex-grow flex flex-col text-xs`}>
      <AssistantMenus />

      {currentNavOption === "Tickets" && <TicketBot />}
      {currentNavOption === "Assistant" && <ChatBot />}
      {currentNavOption === "Queue" && <QueueBot />}
    </div>
  );
};

export default InternalPilot;
