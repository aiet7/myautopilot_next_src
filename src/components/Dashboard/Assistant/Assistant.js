"use client";

import AssistantRail from "./AssistantRail.js";
import Skills from "./Sections/Skills.js";
import Updates from "./Sections/Updates/Updates.js";
import Engineer from "./Sections/Engineer.js";
import Tasks from "./Sections/Tasks.js";
import Notes from "./Sections/Notes.js";
import Workflows from "./Sections/Workflow.js";
import Favorites from "./Sections/Favorites.js";
import useUiStore from "@/utils/store/ui/uiStore.js";
import useAssistantStore from "@/utils/store/assistant/assistantStore.js";

const Assistant = ({}) => {
  const { openAssistant } = useUiStore();
  const { activeAssistantButton } = useAssistantStore();

  return (
    <div
      className={`absolute z-10 top-0 bottom-0 right-0 ${
        openAssistant ? "translate-x-0 w-[350px]" : "translate-x-full w-[300px]"
      }  dark:bg-[#111111] bg-[#f6f8fc] flex  transition-all duration-300 ease-in-out transform xl:relative xl:min-w-[300px]  xl:translate-x-0`}
    >
      <AssistantRail />
      <div className="flex flex-col px-4 py-6 w-full overflow-hidden ">
        {activeAssistantButton === "Engineer" && <Engineer />}
        {activeAssistantButton === "Skills" && <Skills />}
        {activeAssistantButton === "Updates" && <Updates />}
        {activeAssistantButton === "Tasks" && <Tasks />}
        {activeAssistantButton === "Notes" && <Notes />}
        {activeAssistantButton === "Favorites" && <Favorites />}
        {activeAssistantButton === "Workflows" && <Workflows />}
      </div>
    </div>
  );
};

export default Assistant;
