"use client";

import { BsFilterLeft, BsThreeDotsVertical } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import useAssistantStore from "@/utils/store/assistant/assistantStore";
import useUiStore from "@/utils/store/ui/uiStore";

const TopExternalMenu = () => {
  const { activeAssistantTab, setCloseExternalApps } = useAssistantStore();
  const { openAssistant } = useUiStore;

  return (
    <>
      <div className="dark:border-white/10 flex flex-col justify-center  border-t border-b border-black/10 bg-gray-100 py-2 px-4 gap-4 items-center">
        <div className="flex justify-center items-center">
          <p className="dark:text-white text-lg text-black w-32 whitespace-nowrap overflow-hidden text-ellipsis">
            {activeAssistantTab}
          </p>
          <div className="flex space-x-1">
            <AiOutlineClose
              onClick={setCloseExternalApps}
              size={20}
              className="cursor-pointer flex-none"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default TopExternalMenu;
