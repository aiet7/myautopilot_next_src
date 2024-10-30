"use client";

import useQueueStore from "@/utils/store/interaction/queue/queueStore";
import useUserStore from "@/utils/store/user/userStore";
import { BsStars, BsRobot } from "react-icons/bs";

const QueueGuide = () => {
  const { user } = useUserStore();
  const { handleNextQueueTicket } = useQueueStore();

  return (
    <div className="flex flex-col items-center justify-between p-4 text-xs h-full  max-w-[700px] mx-auto">
      <div className="dark:border-white flex items-center justify-center border border-black px-12 py-2 rounded-lg font-bold mb-4">
        <BsStars size={15} />
        <span className="text-lg">AI Autopilot</span>
      </div>
      <div className="flex flex-col gap-6 items-center">
        <BsRobot size={70} />
        <p className="text-lg font-semibold">Hi, I Am Data</p>
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-bold">Your Queue Workspace Engineer</h2>
          <p className="text-lg font-semibold">
            I Can Help You Troubleshoot Your Queue Tickets
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-2 ">
        <div
          onClick={() =>
            handleNextQueueTicket(
              user?.mspCustomDomain,
              user?.connectWiseTechnicanId,
              user?.id
            )
          }
          className="dark:hover:bg-white/20 hover:bg-black/20 flex flex-col   border p-4 rounded-xl w-full cursor-pointer"
        >
          <p className="text-center font-semibold text-xl">
            Start Working On The Next Available Ticket.
          </p>
        </div>
      </div>
    </div>
  );
};

export default QueueGuide;
