"use client";

import useUiStore from "@/utils/store/ui/uiStore";

const Teams = () => {
  const { openAdmin, handleHistoryMenu } = useUiStore();

  return (
    <div
      onClick={() => {
        if (window.innerWidth < 1023) {
          openAdmin && handleHistoryMenu(false);
        }
      }}
      className={`relative flex flex-col h-full w-full text-sm ${
        openAdmin && "lg:opacity-100 opacity-5 xl:ml-[250px]"
      }  dark:bg-black transition-all duration-300 ease bg-white`}
    >
      <div className="dark:border-b-white/20 border-b p-4">
        <h1 className="text-2xl">Teams</h1>
      </div>
      <div className="flex flex-col h-full overflow-hidden pb-4">Team Canvas</div>
    </div>
  );
};

export default Teams;
