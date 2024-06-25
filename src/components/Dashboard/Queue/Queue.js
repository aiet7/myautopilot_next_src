"use client";

import useQueueStore from "@/utils/store/interaction/queue/queueStore";
import useUiStore from "@/utils/store/ui/uiStore";
import useUserStore from "@/utils/store/user/userStore";
import { GrAnalytics } from "react-icons/gr";
import { MdOutlineQueuePlayNext } from "react-icons/md";
import { BsPersonWorkspace } from "react-icons/bs";
const Queue = ({}) => {
  const { user } = useUserStore();
  const { openQueue } = useUiStore();
  const { options, currentOption, handleWorkspaceOptionSelected } =
    useQueueStore();

  const renderIcon = (option) => {
    switch (option) {
      case "activities":
        return <GrAnalytics size={18} />;
      case "allQueueTickets":
        return <MdOutlineQueuePlayNext size={18} />;
      case "myQueueTickets":
        return <BsPersonWorkspace size={18} />;
    }
  };

  return (
    <div
      className={`absolute z-10 top-0 bottom-0 left-0 text-sm 
      ${
        openQueue
          ? "translate-x-0 w-full md:w-[250px]"
          : "-translate-x-full w-full md:w-[250px]"
      } dark:bg-[#111111] dark:border-white/10 bg-[#f6f8fc] p-4 flex flex-col transition-all duration-300 ease md:border-r md:border-black/10`}
    >
      <div className="overflow-y-auto h-full scrollbar-thin">
        {options.map((option) => {
          return (
            <div
              key={option}
              onClick={() =>
                handleWorkspaceOptionSelected(
                  option,
                  user?.mspCustomDomain,
                  user?.tierLevel,
                  user?.id
                )
              }
              className="flex flex-col items-start my-2"
            >
              <div
                className={`${`${
                  currentOption === option && "dark:bg-white/40 bg-black/20"
                }`} dark:text-white dark:hover:bg-white/40 hover:bg-black/20  text-black w-full flex items-center justify-between px-4 py-5 cursor-pointer rounded-lg`}
              >
                <div className="flex items-center">
                  <div className="w-6">{renderIcon(option)}</div>
                  <div className="flex">
                    <span className="px-1">
                      {option
                        .replace(/([a-z])([A-Z])/g, "$1 $2")
                        .split(" ")
                        .map(
                          (word) => word.charAt(0).toUpperCase() + word.slice(1)
                        )
                        .join(" ")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Queue;
