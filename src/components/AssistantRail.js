"use client";

import { GiSkills } from "react-icons/gi";
import {
  MdOutlineTipsAndUpdates,
  MdOutlineEngineering,
  MdOutlineFavoriteBorder,
} from "react-icons/md";

const AssistantRail = ({
  selectedAgent,
  activeButton,
  handleAssistantTabChange,
}) => {
  return (
    <div className="dark:lg:border-white/10 dark:bg-[#373737] bg-[#eaf1fb] px-2 py-7 flex flex-col gap-7 items-center">
      <GiSkills
        className={`${
          activeButton === "Skills" && "text-blue-800"
        } cursor-pointer`}
        size={20}
        onClick={() => handleAssistantTabChange("Skills")}
      />
      <MdOutlineTipsAndUpdates
        className={`${
          activeButton === "Updates" && "text-blue-800"
        } cursor-pointer`}
        size={20}
        onClick={() => handleAssistantTabChange("Updates")}
      />
      <MdOutlineEngineering
        className={`${
          activeButton === "Engineer" && "text-blue-800"
        } cursor-pointer`}
        size={20}
        onClick={() => handleAssistantTabChange("Engineer")}
      />
      {!selectedAgent && (
        <MdOutlineFavoriteBorder
          className={`${
            activeButton === "Favorites" && "text-blue-800"
          } cursor-pointer`}
          size={20}
          onClick={() => handleAssistantTabChange("Favorites")}
        />
      )}
    </div>
  );
};

export default AssistantRail;
