"use client";

import { SiOpenai } from "react-icons/si";
import { HiDocumentReport } from "react-icons/hi";
import { BsFiletypeDoc } from "react-icons/bs";
import { FaMoneyBillAlt } from "react-icons/fa";
import { AiFillProject, AiFillTool } from "react-icons/ai";
import {
  MdScreenShare,
  MdPassword,
  MdOutlineRequestQuote,
  MdPolicy,
} from "react-icons/md";
import useUiStore from "@/utils/store/ui/uiStore";
import useAssistantStore from "@/utils/store/assistant/assistantStore";
import { Tooltip as ReactTooltip } from "react-tooltip";

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
      }  dark:lg:border-white/10 dark:bg-[#373737] bg-[#eaf1fb] px-1 py-7 flex flex-col gap-4 items-center transition-all duration-300 ease`}
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
      <ReactTooltip
        place="left"
        content="Tickets"
        id="Tickets"
        className="z-[99]"
      />
      <BsFiletypeDoc
        data-tooltip-id="DocGuide"
        className={`${
          activeAssistantTab === "DocGuide" && "text-blue-800"
        } dark:hover:bg-white/20 hover:bg-black/20 rounded-full px-2 cursor-pointer outline-none`}
        size={35}
        onClick={() => {
          handleAssistantTabChange("DocGuide");
          handleUIAssistantTabChange("DocGuide");
        }}
      />
      <ReactTooltip
        place="left"
        content="Documents"
        id="Documents"
        className="z-[99]"
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
      <ReactTooltip
        place="left"
        content="Engineer"
        id="Engineer"
        className="z-[99]"
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
      <ReactTooltip
        place="left"
        content="Remote Access"
        id="Remote Access"
        className="z-[99]"
      />
      <MdPassword
        data-tooltip-id="Passwords"
        className={`${
          activeAssistantTab === "Passwords" && "text-blue-800"
        } dark:hover:bg-white/20 hover:bg-black/20 rounded-full px-2 cursor-pointer outline-none`}
        size={35}
        onClick={() => handleAssistantTabChange("Passwords")}
      />
      <ReactTooltip
        place="left"
        content="Passwords"
        id="Passwords"
        className="z-[99]"
      />
      <FaMoneyBillAlt
        data-tooltip-id="Billing"
        className={`${
          activeAssistantTab === "Billing" && "text-blue-800"
        } dark:hover:bg-white/20 hover:bg-black/20 rounded-full px-2 cursor-pointer outline-none`}
        size={35}
        onClick={() => handleAssistantTabChange("Billing")}
      />
      <ReactTooltip
        place="left"
        content="Billing"
        id="Billing"
        className="z-[99]"
      />
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
      <ReactTooltip
        place="left"
        content="Tools"
        id="Tools"
        className="z-[99]"
      />
      <MdPolicy
        data-tooltip-id="Policies"
        className={`${
          activeAssistantTab === "Policies" && "text-blue-800"
        } dark:hover:bg-white/20 hover:bg-black/20 rounded-full px-2 cursor-pointer outline-none`}
        size={35}
        onClick={() => handleAssistantTabChange("Policies")}
      />
      <ReactTooltip
        place="left"
        content="Policies"
        id="Policies"
        className="z-[99]"
      />
    </div>
  );
};

export default AssistantRail;
