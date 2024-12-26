"use client";

import { IoMdArrowRoundBack } from "react-icons/io";
import Ticket from "./Ticket";
import Notes from "./Notes";
import Company from "./Company";
import TicketNav from "./TicketNav";
import useTicketsStore from "@/utils/store/interaction/tickets/ticketsStore";

const ViewTicket = () => {
  const { activeTicketButton, setViewTicket } = useTicketsStore();

  return (
    <div className="flex flex-col gap-4 pb-4">
      <IoMdArrowRoundBack
        className="cursor-pointer self-end"
        onClick={() => {
          setViewTicket(false);
        }}
        size={20}
      />
      <Company />
      <Ticket />
      <Notes />
    </div>
  );
};

export default ViewTicket;
