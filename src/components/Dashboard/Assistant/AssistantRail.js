"use client";

import { SiOpenai } from "react-icons/si";
import { HiDocumentReport } from "react-icons/hi";
import { BsFiletypeDoc } from "react-icons/bs";
import { FaMoneyBillAlt } from "react-icons/fa";
import { AiFillProject } from "react-icons/ai";
import {
  MdScreenShare,
  MdPassword,
  MdOutlineRequestQuote,
} from "react-icons/md";
import useUiStore from "@/utils/store/ui/uiStore";
import useAssistantStore from "@/utils/store/assistant/assistantStore";
import { Tooltip as ReactTooltip } from "react-tooltip";

import { IoTicketSharp } from "react-icons/io5";

const AssistantRail = ({}) => {
  const {  openAssistant } = useUiStore();
  const {
    activeAssistantButton,
    handleUIAssistantTabChange,
    handleAssistantTabChange,
  } = useAssistantStore();



  return (
    <div
      className={` ${
        openAssistant && window.innerWidth > 1024 ? "translate-x-[-350px]" : ""
      } dark:lg:border-white/10 dark:bg-[#373737]  bg-[#eaf1fb] px-3 py-7 flex flex-col gap-7 items-center transition-all duration-300 ease-in-out transform`}
    >
      <IoTicketSharp
        data-tooltip-id="Tickets"
        className={`${
          activeAssistantButton === "Tickets" && "text-blue-800"
        } cursor-pointer outline-none`}
        size={20}
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
        data-tooltip-id="Document"
        className={`${
          activeAssistantButton === "Document" && "text-blue-800"
        } cursor-pointer outline-none`}
        size={20}
        onClick={() => {
          handleAssistantTabChange("Document");
          handleUIAssistantTabChange("Document");
        }}
      />
      <ReactTooltip
        place="left"
        content="Document"
        id="Document"
        className="z-[99]"
      />
      <SiOpenai
        data-tooltip-id="Engineer"
        className={`${
          activeAssistantButton === "Engineer" && "text-blue-800"
        } cursor-pointer outline-none`}
        size={20}
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
        data-tooltip-id="Screen Share"
        className={`${
          activeAssistantButton === "Screen Share" && "text-blue-800"
        } cursor-pointer outline-none`}
        size={20}
        onClick={() => handleAssistantTabChange("Screen Share")}
      />
      <ReactTooltip
        place="left"
        content="Screen Share"
        id="Screen Share"
        className="z-[99]"
      />
      <MdPassword
        data-tooltip-id="Passwords"
        className={`${
          activeAssistantButton === "Passwords" && "text-blue-800"
        } cursor-pointer outline-none`}
        size={20}
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
          activeAssistantButton === "Billing" && "text-blue-800"
        } cursor-pointer outline-none`}
        size={20}
        onClick={() => handleAssistantTabChange("Billing")}
      />
      <ReactTooltip
        place="left"
        content="Billing"
        id="Billing"
        className="z-[99]"
      />
      <MdOutlineRequestQuote
        data-tooltip-id="Quotes"
        className={`${
          activeAssistantButton === "Quotes" && "text-blue-800"
        } cursor-pointer outline-none`}
        size={20}
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
          activeAssistantButton === "Reports" && "text-blue-800"
        } cursor-pointer outline-none`}
        size={20}
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
          activeAssistantButton === "Projects" && "text-blue-800"
        } cursor-pointer outline-none`}
        size={20}
        onClick={() => handleAssistantTabChange("Projects")}
      />
      <ReactTooltip
        place="left"
        content="Projects"
        id="Projects"
        className="z-[99]"
      />
    </div>
  );
};

export default AssistantRail;
