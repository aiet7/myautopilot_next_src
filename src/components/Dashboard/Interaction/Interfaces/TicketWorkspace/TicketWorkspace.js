"use client";

import useQueueStore from "@/utils/store/interaction/queue/useQueueStore";
import { useEffect } from "react";
import MyActivities from "./MyActivities";
import AllActivities from "./AllActivites";
import AllQueueTickets from "./AllQueueTickets";
import QueueManagment from "./QueueManagment";
import useUserStore from "@/utils/store/user/userStore";

const TicketWorkspace = () => {
  const { user } = useUserStore();
  const { currentOption, handleShowMyActivities, setIsMobile } =
    useQueueStore();
  
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

  useEffect(() => {
    if (currentOption === "myActivities") {
      handleShowMyActivities(user?.mspCustomDomain, user?.id);
    }
  }, [currentOption]);

  const renderComponent = () => {
    if (currentOption) {
      switch (currentOption) {
        case "myActivities":
          return <MyActivities />;
        case "allActivities":
          return <AllActivities />;
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
    <div className="flex-grow overflow-auto scrollbar-thin">
      <div className="px-4 py-4 text-md w-full ">
        <div className="max-w-[1250px] flex items-start gap-4 mx-auto">
          <div className="flex-grow min-w-[0]">
            <div className="flex flex-col gap-6">{renderComponent()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketWorkspace;
