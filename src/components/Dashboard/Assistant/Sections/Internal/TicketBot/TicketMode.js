"use client";

import useTicketsStore from "@/utils/store/interaction/tickets/ticketsStore";

const TicketMode = () => {
  const { activeTicketBotMode, activeTicketOptions, setActiveTicketBotMode } =
    useTicketsStore();

  return (
    <div className="relative flex items-center ">
      <select
        value={activeTicketBotMode}
        className=" px-4 py-1 border w-[150px]"
        onChange={(e) => {
          setActiveTicketBotMode(e.target.value);
        }}
      >
        {activeTicketOptions.map((option) => (
          <option
            className={`${option === "Create Ticket" ? "font-bold" : ""} `}
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TicketMode;
