"use client";

import useQueueStore from "@/utils/store/interaction/queue/queueStore";
import { IoMdArrowRoundBack } from "react-icons/io";
import TicketNav from "../../QueueWorkspace/TicketNav";
import ViewQueueNotes from "./ViewQueueNotes";
import ViewQueueTicket from "./ViewQueueTicket";

const ViewTicket = () => {
  const { activeQueueTicketButton, setViewQueueTicket } = useQueueStore();

  const renderComponent = () => {
    switch (activeQueueTicketButton) {
      case "QueueTicket":
        return <ViewQueueTicket />;
      case "QueueNotes":
        return <ViewQueueNotes />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <IoMdArrowRoundBack
        className="cursor-pointer self-end"
        onClick={() => setViewQueueTicket(false)}
        size={30}
      />
      <TicketNav />
      {renderComponent()}
    </div>
  );
};

export default ViewTicket;
