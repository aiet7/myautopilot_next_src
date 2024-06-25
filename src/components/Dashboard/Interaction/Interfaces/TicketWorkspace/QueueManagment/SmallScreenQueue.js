"use client";

import useQueueStore from "@/utils/store/interaction/queue/queueStore";
import Troubleshoot from "../../../Forms/Ticket/Troubleshoot";
import TicketNav from "./TicketNav";
import QueueTicket from "./QueueTicket";
import QueueNotes from "./QueueNotes";

const SmallScreenQueue = () => {
  const {
    activeSectionButton,
    activeQueueTicketButton,
    ticketRequeued,
    ticketClosed,
    ticketSaved,
    setActiveSectionButton,
  } = useQueueStore();

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
    <div className="pt-10">
      <div className="dark:border-white/20 flex items-center border rounded w-full">
        <button
          onClick={() => setActiveSectionButton("Form")}
          className={`${
            activeSectionButton === "Form" && "bg-blue-800 text-white"
          } w-full rounded p-2`}
        >
          Form
        </button>
        <button
          onClick={() => setActiveSectionButton("Troubleshoot")}
          className={`${
            activeSectionButton === "Troubleshoot" && "bg-blue-800 text-white"
          } w-full rounded p-2`}
        >
          Troubleshoot
        </button>
      </div>
      <div className="w-full py-4">
        {activeSectionButton === "Form" && (
          <div className="flex-1">
            <div className="flex  flex-col gap-2">
              <TicketNav />
              {renderComponent()}
            </div>

            {ticketRequeued && (
              <p className="font-semibold">Ticket Added Back Into The Queue!</p>
            )}
            {ticketClosed && (
              <p className="font-semibold">Ticket Has Been Closed!</p>
            )}
            {ticketSaved && (
              <p className="font-semibold">Ticket Has Been Saved!</p>
            )}
          </div>
        )}
        {activeSectionButton === "Troubleshoot" && <Troubleshoot />}
      </div>
    </div>
  );
};

export default SmallScreenQueue;
