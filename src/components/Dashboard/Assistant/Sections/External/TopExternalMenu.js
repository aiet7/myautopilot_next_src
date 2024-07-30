"use client";

import { BsFilterLeft, BsSearch, BsThreeDotsVertical } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import useAssistantStore from "@/utils/store/assistant/assistantStore";

const TopExternalMenu = () => {
  const { setCloseExternalApps } = useAssistantStore();
  return (
    <div className="flex justify-between items-center bg-white p-2">
      <div className="flex items-center gap-2">
        <BsFilterLeft size={25} />
        <BsSearch size={15} />
        <BsThreeDotsVertical size={20}/>
      </div>
      <AiOutlineClose
        onClick={setCloseExternalApps}
        size={20}
        className="cursor-pointer"
      />
    </div>
  );
};

export default TopExternalMenu;
