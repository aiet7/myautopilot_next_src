"use client";

import useQueueStore from "@/utils/store/interaction/queue/queueStore";
import Troubleshoot from "../../../Forms/Ticket/Troubleshoot";
import QueueNotes from "./QueueNotes";
import TicketNav from "./TicketNav";
import QueueTicket from "./QueueTicket";

const LargeScreenQueue = () => {
  const { activeQueueTicketButton, ticketRequeued, ticketClosed, ticketSaved } =
    useQueueStore();

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
    <>
      <div className="flex flex-col w-full ">
        <div className="flex gap-12">
          <div className="flex-1 pt-9">
            <div className="flex flex-col gap-6">
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
          <div className="flex-1 max-h-[800px] overflow-auto scrollbar-thin pt-9 ">
            <Troubleshoot />
          </div>
        </div>
      </div>
    </>
  );
};

export default LargeScreenQueue;
