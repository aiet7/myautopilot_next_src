"use client";

import { useRouter } from "next/navigation";

import { AiOutlinePoweroff } from "react-icons/ai";
import { FiSettings } from "react-icons/fi";
import {
  MdOutlineAccountCircle,
  MdOutlineDarkMode,
  MdOutlineLightMode,
} from "react-icons/md";

import { TbWorldWww } from "react-icons/tb";

import { useTheme } from "next-themes";

import useUiStore from "@/utils/store/ui/uiStore.js";
import useUserStore from "@/utils/store/user/userStore";

const TabNavRail = ({}) => {
  const { handleLogout } = useUserStore();

  const {
    openSettings,
    activeTab,
    handleTabChange,

    handleToggleSettings,
  } = useUiStore();

  const { theme, setTheme } = useTheme();
  const router = useRouter();

  const handleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  return (
    <div className="dark:lg:border-white/10 dark:bg-[#373737] bg-[#eaf1fb] flex items-center justify-evenly py-3 px-2 gap-4 lg:relative lg:flex-col lg:justify-start lg:border-r">
      <div
        onClick={() => handleTabChange("iTAgent")}
        className="relative flex flex-col gap-2 items-center cursor-pointer"
      >
        <TbWorldWww
          size={20}
          className={`${activeTab === "iTAgent" && "text-blue-600"}`}
        />
        <span className="text-xs text-center">IT Agent</span>
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
