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
  const { ticketStatus } = useFormsStore();
  const { openAssistant } = useUiStore();
  const { theme } = useTheme();
  const { assistantWidth, activeAssistantTab, activeAssistantTabOpen } =
    useAssistantStore();

  const renderWidth = () => {
    switch (assistantWidth) {
      case 400:
        return "md:w-[400px] lg:w-[600px]";
      case 700:
        return "md:w-[700px] lg:w-[900px]";
      case 900:
        return "md:w-[900px] lg:w-[1100px]";
      default:
        return "md:w-[400px] lg:w-[600px]";
    }
  };

  return (
    <div
      className={`absolute z-10 top-0 bottom-0 right-0 lg:right-10 text-sm ${
        openAssistant
          ? "translate-x-0 w-full " + renderWidth()
          : "translate-x-full w-full md:w-[400px]"
      } flex transition-all duration-300 ease dark:border-white/10 lg:border-l lg:border-black/10`}
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

      <div className="flex flex-col w-full h-full">
        <AssistantControl />

        <div className="relative flex flex-col  overflow-hidden h-full ">
          <InternalPilot />
          {activeAssistantTabOpen && <ExternalPilot />}
          {ticketStatus.ticketCreated && <Progress />}
        </div>
      </div>
    </div>
  );
};

export default Assistant;
