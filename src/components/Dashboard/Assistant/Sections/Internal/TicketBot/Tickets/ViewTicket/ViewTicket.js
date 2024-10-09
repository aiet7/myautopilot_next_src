"use client";

import { IoMdArrowRoundBack } from "react-icons/io";
import Ticket from "./Ticket";
import Notes from "./Notes";
import TicketNav from "./TicketNav";
import useTicketsStore from "@/utils/store/interaction/tickets/ticketsStore";

const ViewTicket = () => {
  const { activeTicketButton, setViewTicket } = useTicketsStore();

  const renderComponent = () => {
    switch (activeTicketButton) {
      case "Ticket":
        return <Ticket />;
      case "Notes":
        return <Notes />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col gap-2 ">
      <IoMdArrowRoundBack
        className="cursor-pointer self-end"
        onClick={() => setViewTicket(false)}
        size={30}
      />
      <TicketNav />
      {renderComponent()}
    </div>
  );
};

export default ViewTicket;
