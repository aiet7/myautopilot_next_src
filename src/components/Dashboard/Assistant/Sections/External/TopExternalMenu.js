"use client";

import { BsFilterLeft, BsSearch, BsThreeDotsVertical } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import useAssistantStore from "@/utils/store/assistant/assistantStore";

const TopExternalMenu = () => {
  const { activeAssistantTab, setCloseExternalApps } = useAssistantStore();
  return (
    <div className="dark:border-white/10 flex justify-end items-center border-t border-b border-black/10 bg-gray-100  py-2 px-4 gap-4 items-center">
      <p className="dark:text-white text-lg text-black w-32 whitespace-nowrap">{activeAssistantTab}</p>

      <input
        placeholder={`Search ${activeAssistantTab}`}
        className="w-full p-1 rounded-md border"
      />
      <div className="flex items-center">
        <BsThreeDotsVertical size={20} />
        <BsFilterLeft size={27} />
      </div>

      <AiOutlineClose
        onClick={setCloseExternalApps}
        size={30}
        className="cursor-pointer"
      />
    </div>
  );
};

export default TopExternalMenu;
