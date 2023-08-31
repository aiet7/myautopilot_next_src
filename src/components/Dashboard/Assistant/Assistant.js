"use client";

import Skills from "./Sections/Skills.js";
import Updates from "./Sections/Updates/Updates.js";
import Engineer from "./Sections/Engineer.js";
import Tasks from "./Sections/Tasks.js";
import Notes from "./Sections/Notes.js";
import Workflows from "./Sections/Workflow.js";
import Favorites from "./Sections/Favorites.js";
import useUiStore from "@/utils/store/ui/uiStore.js";
import useAssistantStore from "@/utils/store/assistant/assistantStore.js";

import { AiOutlineClose } from "react-icons/ai";
import AssistantRail from "./AssistantRail.js";

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
