"use client";

import { BsListTask } from "react-icons/bs";
import { GiSkills } from "react-icons/gi";
import { BiNotepad } from "react-icons/bi";
import { FcWorkflow } from "react-icons/fc";
import {
  MdOutlineTipsAndUpdates,
  MdOutlineEngineering,
  MdOutlineFavoriteBorder,
} from "react-icons/md";
import useUiStore from "@/utils/store/ui/uiStore";
import useAssistantStore from "@/utils/store/assistant/assistantStore";
import { useEffect } from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";

const AssistantRail = ({}) => {
  const { activeTab, openAssistant, handleCloseAllMenus } = useUiStore();
  const { activeAssistantButton, handleAssistantTabChange } =
    useAssistantStore();

  useEffect(() => {
    if (activeTab === "general" && activeAssistantButton === "Workflows") {
      handleAssistantTabChange("Favorites");
    } else if (
      activeTab === "agents" &&
      activeAssistantButton === "Favorites"
    ) {
      handleAssistantTabChange("Workflows");
    }
    handleCloseAllMenus();
  }, [activeTab]);

  return (
    <div
      className={` ${
        openAssistant && window.innerWidth > 1024 ? "translate-x-[-350px]" : ""
      } dark:lg:border-white/10 dark:bg-[#373737]  bg-[#eaf1fb] px-3 py-7 flex flex-col gap-7 items-center transition-all duration-300 ease-in-out transform`}
    >
      <MdOutlineEngineering
        data-tooltip-id="Engineer"
        className={`${
          activeAssistantButton === "Engineer" && "text-blue-800"
        } cursor-pointer outline-none`}
        size={20}
        onClick={() => handleAssistantTabChange("Engineer")}
      />
      <ReactTooltip
        place="left"
        content="Engineer"
        id="Engineer"
        className="z-[99]"
      />
      <GiSkills
        data-tooltip-id="Skills"
        className={`${
          activeAssistantButton === "Skills" && "text-blue-800"
        } cursor-pointer outline-none`}
        size={20}
        onClick={() => handleAssistantTabChange("Skills")}
      />
      <ReactTooltip
        place="left"
        content="Skills"
        id="Skills"
        className="z-[99]"
      />
      <MdOutlineTipsAndUpdates
        data-tooltip-id="Updates"
        className={`${
          activeAssistantButton === "Updates" && "text-blue-800"
        } cursor-pointer outline-none`}
        size={20}
        onClick={() => handleAssistantTabChange("Updates")}
      />
      <ReactTooltip
        place="left"
        content="Updates"
        id="Updates"
        className="z-[99]"
      />

      <BsListTask
        data-tooltip-id="Tasks"
        className={`${
          activeAssistantButton === "Tasks" && "text-blue-800"
        } cursor-pointer outline-none`}
        size={20}
        onClick={() => handleAssistantTabChange("Tasks")}
      />
      <ReactTooltip
        place="left"
        content="Tasks"
        id="Tasks"
        className="z-[99]"
      />

      <BiNotepad
        data-tooltip-id="Notes"
        className={`${
          activeAssistantButton === "Notes" && "text-blue-800"
        } cursor-pointer  outline-none`}
        size={20}
        onClick={() => handleAssistantTabChange("Notes")}
      />
      <ReactTooltip
        place="left"
        content="Notes"
        id="Notes"
        className="z-[99]"
      />

      {activeTab === "general" ? (
        <>
          <MdOutlineFavoriteBorder
            data-tooltip-id="Favorites"
            className={`${
              activeAssistantButton === "Favorites" && "text-blue-800"
            } cursor-pointer outline-none`}
            size={20}
            onClick={() => handleAssistantTabChange("Favorites")}
          />
          <ReactTooltip
            place="left"
            content="Favorites"
            id="Favorites"
            className="z-[99]"
          />
        </>
      ) : (
        <>
          <FcWorkflow
            data-tooltip-id="Workflows"
            size={20}
            className="cursor-pointer outline-none"
            onClick={() => handleAssistantTabChange("Workflows")}
          />
          <ReactTooltip
            place="left"
            content="Workflows"
            id="Workflows"
            className="z-[99]"
          />
        </>
      )}
    </div>
  );
};

export default AssistantRail;
