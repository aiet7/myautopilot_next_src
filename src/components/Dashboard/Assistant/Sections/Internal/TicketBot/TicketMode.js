"use client";

import useAssistantStore from "@/utils/store/assistant/assistantStore";
import useTicketsStore from "@/utils/store/interaction/tickets/ticketsStore";

const TicketMode = () => {
  const {
    activeTicketBotMode,
    activeTicketOptions,
    setActiveTicketBotMode,
  } = useTicketsStore();
  const { setAssistantWidthOpen } = useAssistantStore();

  return (
    <div className="relative flex items-center ">
      <select
        value={activeTicketBotMode}
        className="px-4 py-1 border w-[150px]"
        onChange={(e) => {
          setAssistantWidthOpen(false);
          setActiveTicketBotMode(e.target.value);
        }}
      >
        {activeTicketOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TicketMode;