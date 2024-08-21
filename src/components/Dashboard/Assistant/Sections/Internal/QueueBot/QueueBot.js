"use client";

import useQueueStore from "@/utils/store/interaction/queue/queueStore";
import AllQueueTickets from "./AllQueueTickets/AllQueueTickets";
import Activities from "./Activities/Activities";
import QueueWorkspace from "./QueueWorkspace/QueueWorkspace";

const QueueBot = () => {
  const { activeQueueBotMode } = useQueueStore();

  const renderComponent = () => {
    switch (activeQueueBotMode) {
      case "All Queue Tickets":
        return <AllQueueTickets />;
      case "Activities":
        return <Activities />;
      case "Queue Workspace":
        return <QueueWorkspace />;
      default:
        return null;
    }
  };

  return (
    <div className="flex-grow overflow-y-auto flex flex-col">
      {renderComponent()}
    </div>
  );
};

export default QueueBot;
