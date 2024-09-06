"use client";

import useTicketsStore from "@/utils/store/interaction/tickets/ticketsStore";
import Tickets from "./Tickets/Tickets";
import TicketForm from "@/components/Dashboard/Interaction/Forms/Ticket/TicketForm";

const TicketBot = () => {
  const { activeTicketBotMode } = useTicketsStore();

  const renderComponent = () => {
    switch (activeTicketBotMode) {
      case "Ticket":
        return <TicketForm />;
      case "History":
        return <Tickets />;
      default:
        return null;
    }
  };

  return (
    <div className="flex-grow overflow-y-auto flex flex-col scrollbar-thin">
      {renderComponent()}
    </div>
  );
};

export default TicketBot;
