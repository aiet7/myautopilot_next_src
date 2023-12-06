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
      }  dark:lg:border-white/10 dark:bg-[#373737] relative border-r border-l bg-[#eaf1fb] px-1 py-7 flex flex-col gap-4 items-center  transition-all duration-300 ease`}
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
      {/* <Tooltip
        place="left"
        content="Tickets"
        id="Tickets"
        className="z-[99]"
      /> */}
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
      {/* <Tooltip
        place="left"
        content="Document"
        id="Document"
        className="z-[99]"
      /> */}
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
      {/* <Tooltip
        place="left"
        content="Engineer"
        id="Engineer"
        className="z-[99]"
      /> */}

      <div className="dark:border-white/20 border-black/10 border w-full" />

      <MdScreenShare
        data-tooltip-id="Remote Access"
        className={`${
          activeAssistantTab === "Remote Access" && "text-blue-800"
        } dark:hover:bg-white/20 hover:bg-black/20 rounded-full px-2 cursor-pointer outline-none`}
        size={35}
        onClick={() => handleAssistantTabChange("Remote Access")}
      />
      {/* <Tooltip
        place="left"
        content="Remote Access"
        id="Remote Access"
        className="z-[99]"
      /> */}
      <MdPassword
        data-tooltip-id="Passwords"
        className={`${
          activeAssistantTab === "Passwords" && "text-blue-800"
        } dark:hover:bg-white/20 hover:bg-black/20 rounded-full px-2 cursor-pointer outline-none`}
        size={35}
        onClick={() => handleAssistantTabChange("Passwords")}
      />
      {/* <Tooltip
        place="left"
        content="Passwords"
        id="Passwords"
        className="z-[99]"
      /> */}
      <FaMoneyBillAlt
        data-tooltip-id="Billing"
        className={`${
          activeAssistantTab === "Billing" && "text-blue-800"
        } dark:hover:bg-white/20 hover:bg-black/20 rounded-full px-2 cursor-pointer outline-none`}
        size={35}
        onClick={() => handleAssistantTabChange("Billing")}
      />
      {/* <Tooltip
        place="left"
        content="Billing"
        id="Billing"
        className="z-[99]"
      /> */}
      {/* <MdOutlineRequestQuote
        data-tooltip-id="Quotes"
        className={`${
          activeAssistantTab === "Quotes" && "text-blue-800"
        } dark:hover:bg-white/20 hover:bg-black/20 rounded-full px-2 cursor-pointer outline-none`}
        size={35}
        onClick={() => handleAssistantTabChange("Quotes")}
      />
      <ReactTooltip
        place="left"
        content="Quotes"
        id="Quotes"
        className="z-[99]"
      />
      <HiDocumentReport
        data-tooltip-id="Reports"
        className={`${
          activeAssistantTab === "Reports" && "text-blue-800"
        } dark:hover:bg-white/20 hover:bg-black/20 rounded-full px-2 cursor-pointer outline-none`}
        size={35}
        onClick={() => handleAssistantTabChange("Reports")}
      />
      <ReactTooltip
        place="left"
        content="Reports"
        id="Reports"
        className="z-[99]"
      />
      <AiFillProject
        data-tooltip-id="Projects"
        className={`${
          activeAssistantTab === "Projects" && "text-blue-800"
        } dark:hover:bg-white/20 hover:bg-black/20 rounded-full px-2 cursor-pointer outline-none`}
        size={35}
        onClick={() => handleAssistantTabChange("Projects")}
      />
      <ReactTooltip
        place="left"
        content="Projects"
        id="Projects"
        className="z-[99]"
      /> */}
      <AiFillTool
        data-tooltip-id="Tools"
        className={`${
          activeAssistantTab === "Tools" && "text-blue-800"
        } dark:hover:bg-white/20 hover:bg-black/20 rounded-full px-2 cursor-pointer outline-none`}
        size={35}
        onClick={() => handleAssistantTabChange("Tools")}
      />
      {/* <Tooltip
        place="left"
        content="Tools"
        id="Tools"
        className="z-[99]"
      /> */}
      <MdPolicy
        data-tooltip-id="Policies"
        className={`${
          activeAssistantTab === "Policies" && "text-blue-800"
        } dark:hover:bg-white/20 hover:bg-black/20 rounded-full px-2 cursor-pointer outline-none`}
        size={35}
        onClick={() => handleAssistantTabChange("Policies")}
      />
      {/* <Tooltip
        place="left"
        content="Policies"
        id="Policies"
        className="z-[99]"
      /> */}
    </div>
  );
};

export default AssistantRail;
