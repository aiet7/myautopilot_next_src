"use client";

import { useRouter } from "next/navigation";

import {
  AiOutlinePoweroff,
  AiOutlineTeam,
  AiOutlineMenu,
} from "react-icons/ai";
import { BsChatDots } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import { FaDochub } from "react-icons/fa";
import {
  MdOutlineAccountCircle,
  MdOutlineDarkMode,
  MdOutlineLightMode,
} from "react-icons/md";
import { DiMagento } from "react-icons/di";

import { useTheme } from "next-themes";

import useUiStore from "@/utils/store/ui/uiStore.js";
import useUserStore from "@/utils/store/user/userStore";

import { Tooltip as ReactTooltip } from "react-tooltip";

const TabNavRail = ({}) => {
  const { handleLogout } = useUserStore();

  const {
    openHistory,
    openSettings,
    activeTab,
    setHoverTab,
    handleTabChange,
    handleUpdateGeneralPreview,
    handleUpdateAgentsPreview,
    handleUpdateRoomsPreview,
    handleUpdateDocsPreview,
    handleUpdateHoverMouseLeave,
    handleHistoryMenu,
    handleToggleSettings,
  } = useUiStore();

  const { theme, setTheme } = useTheme();
  const router = useRouter();

  const handleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  return (
    <div className="dark:lg:border-white/10 dark:bg-[#373737] bg-[#eaf1fb] flex items-center justify-evenly py-3 px-2 gap-4 lg:relative lg:flex-col lg:justify-start lg:border-r">
      <AiOutlineMenu
        data-tooltip-id="History Menu"
        onMouseEnter={() => {
          handleUpdateHoverMouseLeave();
        }}
        onClick={handleHistoryMenu}
        size={20}
        className="hidden cursor-pointer outline-none lg:flex"
      />
      <ReactTooltip
        place="right"
        content={openHistory ? "Hide History Menu" : "Show History Menu"}
        id="History Menu"
        className="z-[99]"
      />
      <div
        onMouseEnter={() => {
          if (window.innerWidth > 1024) {
            setHoverTab("general");
            handleUpdateGeneralPreview();
          }
        }}
        onClick={() => handleTabChange("general")}
        className="relative flex flex-col items-center cursor-pointer"
      >
        <BsChatDots
          size={20}
          className={`${activeTab === "general" && "text-blue-600"}`}
        />
        <span className="text-xs">General</span>
      </div>
      <div
        onMouseEnter={() => {
          if (window.innerWidth > 1024) {
            setHoverTab("agents");
            handleUpdateAgentsPreview();
          }
        }}
        className="relative flex flex-col items-center cursor-pointer"
        onClick={() => handleTabChange("agents")}
      >
        <DiMagento
          size={20}
          className={`${activeTab === "agents" && "text-blue-600"}`}
        />
        <span className="text-xs">Agents</span>
      </div>
      <div
        onMouseEnter={() => {
          if (window.innerWidth > 1024) {
            setHoverTab("teams");
            handleUpdateRoomsPreview();
          }
        }}
        onClick={() => {
          handleTabChange("teams");
        }}
        className="relative flex flex-col items-center cursor-pointer"
      >
        <AiOutlineTeam
          size={20}
          className={`${activeTab === "teams" && "text-blue-600"} `}
        />
        <span className="text-xs">Teams</span>
      </div>
      <div
        onMouseEnter={() => {
          if (window.innerWidth > 1024) {
            setHoverTab("docs");
            handleUpdateDocsPreview();
          }
        }}
        onClick={() => {
          handleTabChange("docs");
        }}
        className="relative flex flex-col items-center cursor-pointer"
      >
        <FaDochub
          size={20}
          className={`${activeTab === "docs" && "text-blue-600"} `}
        />
        <span className="text-xs">Docs</span>
      </div>

      <div
        onClick={() => handleToggleSettings(true)}
        className="flex flex-col items-center cursor-pointer lg:absolute lg:bottom-0 lg:py-3"
      >
        <FiSettings
          size={20}
          className={`${activeTab === "settings" && "text-blue-600"}`}
        />
        <span className="text-xs">Settings</span>
        {openSettings && (
          <div className="dark:bg-black dark:border-white/40 dark:border bg-white border border-black/10 absolute z-[99] bottom-[60px] right-0 w-[150px] lg:bottom-0 lg:left-[51px] lg:w-[351px]">
            <div className="flex flex-col">
              <div
                onClick={() => handleLogout(router.push)}
                className="dark:border-white/40 dark:hover:bg-white/20 hover:bg-black/10 border-b border-black/10 w-full text-lg flex items-center gap-3 px-6 py-3"
              >
                <AiOutlinePoweroff />
                <span>Log out</span>
              </div>
              <div
                onClick={() => handleTabChange("settings")}
                className="dark:border-white/40 dark:hover:bg-white/20 hover:bg-black/10 border-b border-black/10 w-full text-lg flex items-center gap-3 px-6 py-3"
              >
                <MdOutlineAccountCircle />
                <span>Account</span>
              </div>
              <div
                onClick={handleTheme}
                className="dark:hover:bg-white/20 hover:bg-black/10 w-full text-lg flex items-center gap-3 px-6 py-3"
              >
                {theme === "light" ? (
                  <MdOutlineDarkMode />
                ) : (
                  <MdOutlineLightMode />
                )}
                <span>{theme === "light" ? "Dark" : "Light"}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TabNavRail;
