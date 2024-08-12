"use client";

import useQueueStore from "@/utils/store/interaction/queue/queueStore";
import { BsFilterLeft, BsCheck } from "react-icons/bs";

const QueueMenus = () => {
  const {
    filterQueueTicketMode,
    filterQueueTicketModeOpen,
    filterQueueTicketOptions,
    setActiveFilterMode,
    setActiveQueueFilterModeOpen,
  } = useQueueStore();

  return (
    <div className="relative flex items-center ">
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
