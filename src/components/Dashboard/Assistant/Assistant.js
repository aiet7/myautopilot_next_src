"use client";

import useUiStore from "@/utils/store/ui/uiStore.js";
import AssistantRail from "./AssistantRail.js";
import Progress from "./Progress.js";
import useFormsStore from "@/utils/store/interaction/forms/formsStore.js";
import AssistantControl from "./AssistantControl.js";
import InternalPilot from "./Sections/Internal/InternalPilot.js";

import { useTheme } from "next-themes";
import useAssistantStore from "@/utils/store/assistant/assistantStore.js";
import ExternalPilot from "./Sections/External/ExternalPilot.js";

const Assistant = ({}) => {
  const { activeAssistantTab } = useAssistantStore();
  const { ticketStatus } = useFormsStore();
  const { openAssistant } = useUiStore();
  const { theme } = useTheme();

  return (
    <div
      className={` absolute z-10 top-0 bottom-0 right-0 ${
        openAssistant
          ? "translate-x-0 w-full md:w-[350px]"
          : "translate-x-full w-full md:w-[350px]"
      } flex transition-all duration-300 ease`}
    >
      <div
        className={`absolute top-0 bottom-0 right-0 left-0 transition-opacity duration-300 ease ${
          theme === "light" ? "opacity-100" : "opacity-0"
        } bg-gradient-to-r from-[#eaf1fb] to-blue-200`}
      />
      <div
        className={`absolute top-0 bottom-0 right-0 left-0  transition-opacity duration-300 ease ${
          theme === "dark" ? "opacity-100" : "opacity-0"
        } bg-gradient-to-r from-[#373737] to-[#111111]`}
      />
      {window.innerWidth < 1023 && <AssistantRail />}

      <div className="flex flex-col w-full">
        <AssistantControl />
        <div className="relative flex flex-col overflow-hidden h-full ">
          {activeAssistantTab === "Tickets" ||
          activeAssistantTab === "Engineer" ||
          activeAssistantTab === "Queue" ? (
            <>
              <InternalPilot />
              {ticketStatus.ticketCreated && <Progress />}
            </>
          ) : (
            <ExternalPilot />
          )}
        </div>
      </div>
    </div>
  );
};

export default Assistant;
