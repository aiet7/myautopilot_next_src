"use client";

import useTicketsStore from "@/utils/store/assistant/sections/tickets/ticketsStore";
import { useEffect } from "react";

const Tickets = () => {
  const {
    tickets,
    initializeTickets,
    activeTicketButton,
    setActiveTicketButton,
  } = useTicketsStore();

  useEffect(() => {
    initializeTickets();
  }, []);
  console.log(tickets);

  return (
    <div className="flex-grow flex flex-col gap-4 overflow-hidden">
      <h3 className="text-left text-lg">Tickets</h3>
      <div className="dark:border-white/20 flex  items-center border rounded">
        <button
          onClick={() => setActiveTicketButton("In Progress")}
          className={`${
            activeTicketButton === "In Progress" && "bg-blue-800 text-white"
          } w-full rounded p-2`}
        >
          In Progress
        </button>
        <button
          onClick={() => setActiveTicketButton("Complete")}
          className={`${
            activeTicketButton === "Complete" && "bg-blue-800 text-white"
          } w-full rounded p-2`}
        >
          Completed
        </button>
      </div>
      <div className="flex-grow overflow-y-auto scrollbar-thin"></div>
      <div className="flex flex-grow flex-col gap-4"></div>
    </div>
  );
};

export default Tickets;
