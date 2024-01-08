"use client";

import { SiOpenai } from "react-icons/si";
import { BsFiletypeDoc } from "react-icons/bs";
import { FaMoneyBillAlt } from "react-icons/fa";
import { AiFillTool } from "react-icons/ai";
import { MdScreenShare, MdPassword, MdPolicy } from "react-icons/md";
import useUiStore from "@/utils/store/ui/uiStore";
import useAssistantStore from "@/utils/store/assistant/assistantStore";

import { IoTicketSharp } from "react-icons/io5";

const AssistantRail = ({}) => {
  const { openAssistant } = useUiStore();
  const {
    activeAssistantTab,
    handleUIAssistantTabChange,
    handleAssistantTabChange,
  } = useAssistantStore();


  return (
    <div
      className={`${
        openAssistant && window.innerWidth > 1023 ? "translate-x-[-350px]" : ""
      }  dark:bg-[#373737] dark:border-white/10 relative  bg-[#eaf1fb] px-1 py-7 flex flex-col gap-4 items-center  transition-all duration-300 ease border-r border-l border-black/10`}
    >
      <IoTicketSharp
        data-tooltip-id="Tickets"
        className={`${
          activeAssistantTab === "Tickets" && "text-blue-800"
        } dark:hover:bg-white/20 hover:bg-black/20 rounded-full px-2 cursor-pointer outline-none`}
        size={35}
        onClick={() => {
          handleAssistantTabChange("Tickets");
          handleUIAssistantTabChange("Tickets");
        }}
      />

      <BsFiletypeDoc
        data-tooltip-id="Document"
        className={`${
          activeAssistantTab === "Document" && "text-blue-800"
        } dark:hover:bg-white/20 hover:bg-black/20 rounded-full px-2 cursor-pointer outline-none`}
        size={35}
        onClick={() => {
          handleAssistantTabChange("Document");
          handleUIAssistantTabChange("Document");
        }}
      />

      <SiOpenai
        data-tooltip-id="Engineer"
        className={`${
          activeAssistantTab === "Engineer" && "text-blue-800"
        } dark:hover:bg-white/20 hover:bg-black/20 rounded-full px-2 cursor-pointer outline-none`}
        size={35}
        onClick={() => {
          handleAssistantTabChange("Engineer");
          handleUIAssistantTabChange("Engineer");
        }}
      />

      <div className="dark:border-white/20 border-black/10 border w-full" />

      <MdScreenShare
        data-tooltip-id="Remote Access"
        className={`${
          activeAssistantTab === "Remote Access" && "text-blue-800"
        } dark:hover:bg-white/20 hover:bg-black/20 rounded-full px-2 cursor-pointer outline-none`}
        size={35}
        onClick={() => handleAssistantTabChange("Remote Access")}
      />

      <MdPassword
        data-tooltip-id="Passwords"
        className={`${
          activeAssistantTab === "Passwords" && "text-blue-800"
        } dark:hover:bg-white/20 hover:bg-black/20 rounded-full px-2 cursor-pointer outline-none`}
        size={35}
        onClick={() => handleAssistantTabChange("Passwords")}
      />

      <FaMoneyBillAlt
        data-tooltip-id="Billing"
        className={`${
          activeAssistantTab === "Billing" && "text-blue-800"
        } dark:hover:bg-white/20 hover:bg-black/20 rounded-full px-2 cursor-pointer outline-none`}
        size={35}
        onClick={() => handleAssistantTabChange("Billing")}
      />

      <AiFillTool
        data-tooltip-id="Tools"
        className={`${
          activeAssistantTab === "Tools" && "text-blue-800"
        } dark:hover:bg-white/20 hover:bg-black/20 rounded-full px-2 cursor-pointer outline-none`}
        size={35}
        onClick={() => handleAssistantTabChange("Tools")}
      />

      <MdPolicy
        data-tooltip-id="Policies"
        className={`${
          activeAssistantTab === "Policies" && "text-blue-800"
        } dark:hover:bg-white/20 hover:bg-black/20 rounded-full px-2 cursor-pointer outline-none`}
        size={35}
        onClick={() => handleAssistantTabChange("Policies")}
      />
    </div>
  );
};

export default AssistantRail;
