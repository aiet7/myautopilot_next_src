"use client";

import useQueueStore from "@/utils/store/interaction/queue/queueStore";
import { useEffect } from "react";

import AllQueueTickets from "./AllQueueTickets";
import QueueManagment from "./QueueManagment/QueueManagment";
import useUserStore from "@/utils/store/user/userStore";
import Activities from "./Activities";

const TicketWorkspace = () => {
  const { user } = useUserStore();
  const { currentOption, handleShowMyActivities } = useQueueStore();

  useEffect(() => {
    if (currentOption === "myActivities") {
      handleShowMyActivities(user?.mspCustomDomain, user?.id);
    }
  }, [currentOption]);

  const renderComponent = () => {
    if (currentOption) {
      switch (currentOption) {
        case "activities":
          return <Activities />;
        case "allQueueTickets":
          return <AllQueueTickets />;
        case "myQueueTickets":
          return <QueueManagment />;
        default:
          return <p>Option not found</p>;
      }
    }
    return <p>Select an option</p>;
  };

  return (
    <div className="flex-grow overflow-auto scrollbar-thin text-sm">
      <div className="px-4 py-4 w-full ">
        <div className="max-w-[1400px] flex items-start gap-4 mx-auto ">
          <div className="flex-grow min-w-[0] ">
            <div className="flex flex-col gap-6 ">{renderComponent()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketWorkspace;
