"use client";

import useUiStore from "@/utils/store/ui/uiStore";
import { AiOutlineMenu } from "react-icons/ai";

import { BiBrain } from "react-icons/bi";

const SettingsRail = ({}) => {
  const { currentNavOption, activeTab, handleNavMenu, handleAssistantMenu } =
    useUiStore();

  return (
    <div
      className={`dark:bg-[#111111] bg-[#f6f8fc] flex items-center ${
        activeTab === "admin" ||
        currentNavOption === "Assistant" ||
        currentNavOption === "Document" ||
        currentNavOption === "Tickets" ||
        currentNavOption === "Queue" ||
        currentNavOption === "Settings"
          ? "justify-between"
          : "justify-end"
      } px-4 py-2 lg:hidden`}
    >
      {(activeTab === "admin" ||
        currentNavOption === "Assistant" ||
        currentNavOption === "Document" ||
        currentNavOption === "Tickets" ||
        currentNavOption === "Queue" ||
        currentNavOption === "Settings") && (
        <>
          <AiOutlineMenu
            data-tooltip-id="Mobile History Menu"
            size={20}
            onClick={handleNavMenu}
            className="cursor-pointer outline-none"
          />
        </>
      )}

      {activeTab === "iTAgent" && currentNavOption !== "Settings" ? (
        <>
          <BiBrain
            data-tooltip-id="Mobile Assistant Menu"
            size={20}
            onClick={handleAssistantMenu}
            className="cursor-pointer outline-none"
          />
        </>
      ) : null}
    </div>
  );
};

export default SettingsRail;
