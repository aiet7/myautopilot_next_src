"use client";

import useUiStore from "@/utils/store/ui/uiStore.js";
import AssistantRail from "./AssistantRail.js";
import AssistantControl from "./AssistantControl.js";
import InternalPilot from "./Sections/Internal/InternalPilot.js";

import useAssistantStore from "@/utils/store/assistant/assistantStore.js";
import ExternalPilot from "./Sections/External/ExternalPilot.js";

const Assistant = ({}) => {
  const { openAssistant } = useUiStore();
  const { assistantWidth, activeAssistantTabOpen } = useAssistantStore();

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
      className={`dark:bg-[#111111] absolute z-10 top-0 bottom-0 right-0 lg:right-10 text-sm bg-gray-200 ${
        openAssistant
          ? "translate-x-0 w-full " + renderWidth()
          : "translate-x-full w-full md:w-[400px]"
      } flex transition-all duration-300 ease dark:border-white/10 lg:border-l lg:border-black/10`}
    >
      {window.innerWidth < 1023 && <AssistantRail />}

      <div className="flex flex-col w-full h-full">
        <AssistantControl />

        <div className="relative flex flex-col overflow-hidden h-full ">
          <InternalPilot />
          {activeAssistantTabOpen && <ExternalPilot />}
        </div>
      </div>
    </div>
  );
};

export default Assistant;
