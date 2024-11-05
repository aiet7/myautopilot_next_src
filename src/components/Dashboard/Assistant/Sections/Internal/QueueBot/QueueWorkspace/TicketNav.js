"use client";

import useQueueStore from "@/utils/store/interaction/queue/queueStore";
import useUserStore from "@/utils/store/user/userStore";

const TicketNav = () => {
  const { user } = useUserStore();
  const {
    currentQueueTicket,
    activeQueueBotMode,
    activeQueueTicketButton,
    handleWorkOnTicket,
    setActiveQueueTicketButton,
  } = useQueueStore();
  console.log(activeQueueBotMode);
  return (
    <div className="flex justify-between items-center  text-base font-semibold">
      <div className="flex gap-4">
        <div
          className={`${
            activeQueueTicketButton === "QueueTicket"
              ? ""
              : "dark:text-white/30 text-gray-300 "
          } flex items-center gap-1 cursor-pointer`}
          onClick={() => setActiveQueueTicketButton("QueueTicket")}
        >
          <span
            className={`${
              activeQueueTicketButton === "QueueTicket"
                ? "opacity-100"
                : "opacity-0"
            } p-1 bg-blue-500 rounded-full flex`}
          ></span>
          <span>Ticket</span>
        </div>
        <div
          className={`${
            activeQueueTicketButton === "QueueNotes"
              ? ""
              : "dark:text-white/30 text-gray-300 "
          } flex items-center gap-1 cursor-pointer`}
          onClick={() => setActiveQueueTicketButton("QueueNotes")}
        >
          <span
            className={`${
              activeQueueTicketButton === "QueueNotes"
                ? "opacity-100"
                : "opacity-0"
            } p-1 bg-blue-500 rounded-full flex`}
          ></span>
          <span>Notes</span>
        </div>
      </div>
      {activeQueueBotMode === "All Queue Tickets" && (
        <button
          onClick={() =>
            handleWorkOnTicket(
              user?.mspCustomDomain,
              user?.id,
              currentQueueTicket?.id
            )
          }
          className="underline"
        >
          Work on ticket
        </button>
      )}
    </div>
  );
};

export default TicketNav;
