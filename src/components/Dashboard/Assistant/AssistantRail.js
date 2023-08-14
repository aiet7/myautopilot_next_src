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

const AssistantRail = ({
  activeTab,
  activeAssistantButton,
  handleAssistantTabChange,
}) => {
  return (
    <div className="dark:lg:border-white/10 dark:bg-[#373737] bg-[#eaf1fb] px-2 py-7 flex flex-col gap-7 items-center">
      <MdOutlineEngineering
        className={`${
          activeAssistantButton === "Engineer" && "text-blue-800"
        } cursor-pointer`}
        size={20}
        onClick={() => handleAssistantTabChange("Engineer")}
      />
      <GiSkills
        className={`${
          activeAssistantButton === "Skills" && "text-blue-800"
        } cursor-pointer`}
        size={20}
        onClick={() => handleAssistantTabChange("Skills")}
      />
      <MdOutlineTipsAndUpdates
        className={`${
          activeAssistantButton === "Updates" && "text-blue-800"
        } cursor-pointer`}
        size={20}
        onClick={() => handleAssistantTabChange("Updates")}
      />

      <BsListTask
        className={`${
          activeAssistantButton === "Tasks" && "text-blue-800"
        } cursor-pointer`}
        size={20}
        onClick={() => handleAssistantTabChange("Tasks")}
      />
      <BiNotepad
        className={`${
          activeAssistantButton === "Notes" && "text-blue-800"
        } cursor-pointer `}
        size={20}
        onClick={() => handleAssistantTabChange("Notes")}
      />

      {activeTab === "general" ? (
        <MdOutlineFavoriteBorder
          className={`${
            activeAssistantButton === "Favorites" && "text-blue-800"
          } cursor-pointer`}
          size={20}
          onClick={() => handleAssistantTabChange("Favorites")}
        />
      ) : (
        <FcWorkflow
          size={20}
          className="cursor-pointer"
          onClick={() => handleAssistantTabChange("Workflows")}
        />
      )}
    </div>
  );
};

export default AssistantRail;
