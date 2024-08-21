"use client";

import useQueueStore from "@/utils/store/interaction/queue/queueStore";
import useAssistantStore from "@/utils/store/assistant/assistantStore";
import { BsFilterLeft, BsCheck, BsThreeDotsVertical } from "react-icons/bs";
import useUserStore from "@/utils/store/user/userStore";

const QueueMenus = () => {
  const { user } = useUserStore();
  const {
    activeQueueBotMode,
    activeQueueBotModeOpen,
    activeQueueOptions,
    filterQueueTicketMode,
    filterQueueTicketModeOpen,
    filterQueueTicketOptions,
    setActiveQueueBotModeOpen,
    setActiveFilterMode,
    setActiveQueueFilterModeOpen,
    handleActiveQueueBotMode,
  } = useQueueStore();
  const { setAssistantWidthOpen } = useAssistantStore();

  return (
    <div className="relative flex items-center ">
      <BsThreeDotsVertical
        onClick={() => {
          setActiveQueueBotModeOpen(!activeQueueBotModeOpen);
          setActiveQueueFilterModeOpen(false);
          setAssistantWidthOpen(false);
        }}
        size={20}
        className="cursor-pointer "
      />
      {activeQueueBotModeOpen && (
        <div className="absolute flex flex-col  font-semibold top-6 right-8  bg-white border rounded-lg shadow-lg w-[170px] p-1 z-[100] ">
          {activeQueueOptions.map((option) => (
            <div
              key={option}
              className=" hover:bg-black/20 p-1 rounded flex justify-between items-center border-b text-black"
            >
              <button
                onClick={() => {
                  handleActiveQueueBotMode(
                    option,
                    user?.mspCustomDomain,
                    user?.tierLevel,
                    user?.id
                  );
                  setActiveQueueBotModeOpen(false);
                }}
                className=" w-full text-left "
              >
                {option}
              </button>
              {activeQueueBotMode === option && <BsCheck size={20} />}
            </div>
          ))}
        </div>
      )}
      <BsFilterLeft
        onClick={() => {
          setActiveQueueFilterModeOpen(!filterQueueTicketModeOpen);
        }}
        size={27}
        className="cursor-pointer"
      />
      {filterQueueTicketModeOpen && (
        <div className="absolute flex flex-col  font-semibold top-6 right-2 bg-white border rounded-lg shadow-lg w-[150px] p-1 z-[100] ">
          {filterQueueTicketOptions.map((option) => (
            <div
              key={option}
              className="hover:bg-black/20 p-1 rounded flex justify-between items-center border-b text-black"
            >
              <button
                onClick={() => {
                  setActiveFilterMode(option);
                  setActiveQueueFilterModeOpen(false);
                }}
                className="w-full text-left "
              >
                {option}
              </button>
              {filterQueueTicketMode === option && <BsCheck size={20} />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default QueueMenus;
