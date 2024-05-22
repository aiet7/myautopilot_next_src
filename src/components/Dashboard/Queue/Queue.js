"use client";

import useUiStore from "@/utils/store/ui/uiStore";

const Queue = ({}) => {
  const { openQueue } = useUiStore();

  return (
    <div
      className={`absolute z-10 top-0 bottom-0 left-0  
      ${
        openQueue
          ? "translate-x-0 w-full md:w-[350px]"
          : "-translate-x-full w-full md:w-[350px]"
      } dark:bg-[#111111] dark:border-white/10 bg-[#f6f8fc] p-4 flex flex-col transition-all duration-300 ease md:border-r md:border-black/10`}
    >
      QUEUE
    </div>
  );
};

export default Queue;
