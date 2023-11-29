"use client";
import { AiOutlineClose } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import useUiStore from "@/utils/store/ui/uiStore.js";
import useAssistantStore from "@/utils/store/assistant/assistantStore.js";

const AssistantControl = () => {
  const { handleAssistantMenu } = useUiStore();
  const { activeAssistantTab } = useAssistantStore();
  return (
    <div className="dark:border-white/20 relative border-b  py-4 px-4 flex justify-between items-center transition-all duration-300 ease">
      <p className="dark:text-white text-xl text-black">
        {activeAssistantTab} Support
      </p>
      <div className="dark:text-white flex items-center text-black gap-2">
        <BsThreeDotsVertical size={20} className="cursor-pointer" />
        {window.innerWidth > 1023 && (
          <AiOutlineClose
            onClick={handleAssistantMenu}
            size={20}
            className="cursor-pointer"
          />
        )}
      </div>
    </div>
  );
};

export default AssistantControl;
