"use client";

import useQueueStore from "@/utils/store/interaction/queue/useQueueStore";
import { useEffect } from "react";
import useUserStore from "@/utils/store/user/userStore";
import MyActivities from "./MyActivities";
import AllActivities from "./AllActivites";
import AllQueueTickets from "./AllQueueTickets";
import QueueManagment from "./QueueManagment";

const TicketWorkspace = () => {
  const { user } = useUserStore();
  const {
    noTicketsInQueue,
    option,
    setIsMobile,
    handleShowMyActivities,
    handleShowAllActivities,
    handleShowAllQueueTickets,
    handleNextQueueTicket,
  } = useQueueStore();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 1023);
      };
      handleResize();

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);
  
  const renderComponent = () => {
    switch (option) {
      case "MyActivities":
        return <MyActivities />;
      case "AllActivities":
        return <AllActivities />;
      case "AllQueueTickets":
        return <AllQueueTickets />;
      case "MyQueueTicket":
        return <QueueManagment />;
      default:
        return;
    }
  };

  return (
    <div className="flex-grow overflow-auto scrollbar-thin">
      <div className="px-4 py-4 text-md w-full ">
        <div className="max-w-[1250px] flex items-start gap-4 mx-auto">
          <div className="flex-grow min-w-[0]">
            <div className="flex flex-col gap-6">
              <div className="flex items-center flex-wrap gap-2 text-sm">
                <button
                  onClick={() =>
                    handleShowMyActivities(user?.mspCustomDomain, user?.id)
                  }
                  className={`${
                    option === "MyActivities" && "bg-red-700"
                  } hover:bg-blue-500 border border-white/30 bg-blue-800 w-[125px] py-1 text-white`}
                >
                  My Activites
                </button>
                <button
                  onClick={() => handleShowAllActivities(user?.mspCustomDomain)}
                  className={`${
                    option === "AllActivities" && "bg-red-700"
                  } hover:bg-blue-500 border border-white/30 bg-blue-800 w-[125px] py-1 text-white`}
                >
                  All Activities
                </button>
                <button
                  onClick={() =>
                    handleShowAllQueueTickets(user?.mspCustomDomain)
                  }
                  className={`${
                    option === "AllQueueTickets" && "bg-red-700"
                  } hover:bg-blue-500 border border-white/30 bg-blue-800 w-[125px] py-1 text-white`}
                >
                  All Tickets
                </button>
                <button
                  onClick={() =>
                    handleNextQueueTicket(
                      user?.mspCustomDomain,
                      user?.tierLevel,
                      user?.id
                    )
                  }
                  className={`${
                    option === "MyQueueTicket" && "bg-red-700"
                  } hover:bg-blue-500 border border-white/30 bg-blue-800 w-[125px] py-1 text-white`}
                >
                  Work On Ticket
                </button>
                {noTicketsInQueue && <p className="font-semibold">No Tickets In Queue</p>}
              </div>
              {renderComponent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketWorkspace;
