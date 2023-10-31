"use client";

import useUiStore from "@/utils/store/ui/uiStore.js";
import useAssistantStore from "@/utils/store/assistant/assistantStore.js";

import { AiOutlineClose } from "react-icons/ai";
import AssistantRail from "./AssistantRail.js";
import Tickets from "./Sections/Tickets.js";
import DocGuide from "./Sections/DocGuide.js";
import Passwords from "./Sections/Passwords.js";
import Billing from "./Sections/Billing.js";
import Policies from "./Sections/Policies.js";

import Progress from "./Progress.js";
import Engineer from "./Sections/Engineer.js";
import RemoteAccess from "./Sections/RemoteAccess.js";
import Tools from "./Sections/Tools.js";
import useFormsStore from "@/utils/store/interaction/forms/formsStore.js";

const Assistant = ({}) => {
  const { ticketStatus } = useFormsStore();
  const { openAssistant, handleAssistantMenu } = useUiStore();
  const { activeAssistantTab } = useAssistantStore();

  return (
    <div
      className={`absolute z-10 top-0 bottom-0 right-0 ${
        openAssistant ? "translate-x-0 w-[350px]" : "translate-x-full w-[350px]"
      }  dark:bg-[#111111] bg-[#f6f8fc] flex transition-all duration-300 ease`}
    >
      {window.innerWidth < 1023 && <AssistantRail />}
      <div className="flex flex-col px-4 py-6 w-full overflow-hidden">
        {window.innerWidth > 1023 && (
          <AiOutlineClose
            onClick={handleAssistantMenu}
            size={20}
            className="absolute cursor-pointer top-[27px] self-end"
          />
        )}

        {activeAssistantTab === "Tickets" && <Tickets />}
        {activeAssistantTab === "Engineer" && <Engineer />}
        {activeAssistantTab === "DocGuide" && <DocGuide />}
        {activeAssistantTab === "Remote Access" && <RemoteAccess />}
        {activeAssistantTab === "Passwords" && <Passwords />}
        {activeAssistantTab === "Billing" && <Billing />}

        {activeAssistantTab === "Tools" && <Tools />}
        {activeAssistantTab === "Policies" && <Policies />}

        {ticketStatus.ticketCreated && <Progress />}
      </div>
    </div>
  );
};

export default Assistant;
