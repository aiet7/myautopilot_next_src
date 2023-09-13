"use client";

import useUiStore from "@/utils/store/ui/uiStore.js";
import useAssistantStore from "@/utils/store/assistant/assistantStore.js";

import { AiOutlineClose } from "react-icons/ai";
import AssistantRail from "./AssistantRail.js";
import Tickets from "./Sections/Tickets.js";
import ScreenShare from "./Sections/ScreenShare.js";
import Passwords from "./Sections/Passwords.js";
import Billing from "./Sections/Billing.js";
import Reports from "./Sections/Reports.js";
import Documents from "./Sections/Documents.js";
import Quotes from "./Sections/Quotes.js";
import Projects from "./Sections/Projects.js";
import Progress from "./Progress.js";
import Engineer from "./Sections/Engineer.js";

const Assistant = ({}) => {
  const { openAssistant, handleAssistantMenu } = useUiStore();
  const { activeAssistantButton } = useAssistantStore();

  return (
    <div
      className={`absolute z-10 top-0 bottom-0 right-0 ${
        openAssistant ? "translate-x-0 w-[350px]" : "translate-x-full w-[350px]"
      }  dark:bg-[#111111] bg-[#f6f8fc] flex transition-all duration-300 ease-in-out transform `}
    >
      {window.innerWidth < 1024 && <AssistantRail />}
      <div className="flex flex-col px-4 py-6 w-full overflow-hidden">
        {window.innerWidth > 1024 && (
          <AiOutlineClose
            onClick={handleAssistantMenu}
            size={20}
            className="absolute cursor-pointer top-[27px] self-end"
          />
        )}

        {activeAssistantButton === "Tickets" && <Tickets />}
        {activeAssistantButton === "Document" && <Documents />}
        {activeAssistantButton === "Engineer" && <Engineer />}
        {activeAssistantButton === "Screen Share" && <ScreenShare />}
        {activeAssistantButton === "Passwords" && <Passwords />}
        {activeAssistantButton === "Billing" && <Billing />}
        {activeAssistantButton === "Quotes" && <Quotes />}
        {activeAssistantButton === "Reports" && <Reports />}
        {activeAssistantButton === "Projects" && <Projects />}

        <Progress />
      </div>
    </div>
  );
};

export default Assistant;
