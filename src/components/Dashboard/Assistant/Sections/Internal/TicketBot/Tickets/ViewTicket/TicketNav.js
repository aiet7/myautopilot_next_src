"use client";

import useTicketsStore from "@/utils/store/interaction/tickets/ticketsStore";

const TicketNav = () => {
  const { activeTicketButton, setActiveTicketButton } =
    useTicketsStore();

  return (
    <div className="flex  gap-4 text-base font-semibold">
      <div
        className={`${
            activeTicketButton === "Ticket"
            ? ""
            : "dark:text-white/30 text-gray-300 "
        } flex items-center gap-1 cursor-pointer`}
        onClick={() => setActiveTicketButton("Ticket")}
      >
        <span
          className={`${
            activeTicketButton === "Ticket"
              ? "opacity-100"
              : "opacity-0"
          } p-1 bg-blue-500 rounded-full flex`}
        ></span>
        <span>Ticket</span>
      </div>
      <div
        className={`${
            activeTicketButton === "Notes"
            ? ""
            : "dark:text-white/30 text-gray-300 "
        } flex items-center gap-1 cursor-pointer`}
        onClick={() => setActiveTicketButton("Notes")}
      >
        <span
          className={`${
            activeTicketButton === "Notes"
              ? "opacity-100"
              : "opacity-0"
          } p-1 bg-blue-500 rounded-full flex`}
        ></span>
        <span>Notes</span>
      </div>
    </div>
  );
};

export default TicketNav;
