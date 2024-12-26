"use client";

import useQueueStore from "@/utils/store/interaction/queue/queueStore";
import QueueNav from "./QueueNav";
import QueueNotes from "./QueueNotes";
import QueueTicket from "./QueueTicket";
import TicketNav from "./TicketNav";
import QueueCompany from "./QueueCompany";

const QueueWorkspace = () => {
  const { activeQueueTicketButton } = useQueueStore();

  return (
    <div className="relative flex flex-col h-full dark:bg-black ">
      <QueueNav />

      <div className="relative flex flex-col gap-4 p-4 overflow-auto scrollbar-thin">
        <QueueCompany />
        <QueueTicket />
        <QueueNotes />
      </div>
    </div>
  );
};

export default QueueWorkspace;

/*
const { activeQueueTicketButton } = useQueueStore();

  const renderComponent = () => {
    switch (activeQueueTicketButton) {
      case "QueueTicket":
        return <QueueTicket />;
      case "QueueNotes":
        return <QueueNotes />;
      default:
        return null;
    }
  };

  return (
    <div className="relative flex flex-col h-full dark:bg-black bg-white border-t-2">
      <QueueNav />

      <div className="relative flex flex-col gap-2 p-4 overflow-auto scrollbar-thin">
        <TicketNav />
        {renderComponent()}
      </div>
    </div>
  );



*/
