"use client";

import useUiStore from "@/utils/store/ui/uiStore";
import useUserStore from "@/utils/store/user/userStore";
import { useTheme } from "next-themes";

import { AiOutlineMenu, AiOutlinePoweroff } from "react-icons/ai";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";

const AppNav = () => {
  const { user, handleLogout } = useUserStore();
  const {
    activeTab,
    openSettings,
    currentNavOption,
    hoverTab,
    setHoverTab,
    handleNavMenu,
    handleToggleSettings,
  } = useUiStore();
  const { theme, setTheme } = useTheme();
  const handleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  return (
    <div className="bg-[#eaf1fb] border-b h-12 border-black/10 flex items-center justify-between px-[1.4rem] ">
      {(activeTab === "iTAgent" ||
        (hoverTab === "iTAgent" &&
          (currentNavOption === "Assistant" ||
            currentNavOption === "Document" ||
            currentNavOption === "Tickets" ||
            currentNavOption === "Dispatch")) ||
        currentNavOption === "Settings" ||
        activeTab === "admin" ||
        hoverTab === "admin") && (
        <>
          <AiOutlineMenu
            onMouseEnter={() => setHoverTab(null)}
            data-tooltip-id="History Menu"
            onClick={handleNavMenu}
            size={20}
            className="hidden cursor-pointer outline-none lg:flex"
          />
        </>
      )}

      <div
        onClick={() => handleToggleSettings(true)}
        className="flex flex-col items-center cursor-pointer  "
      >
        <div className="w-8 h-8 rounded-full bg-blue-800 text-sm flex justify-center items-center text-white">
          {user?.firstName?.[0].toUpperCase()}
        </div>
        {openSettings && (
          <div className="dark:bg-black dark:border-white/40 dark:border rounded-lg bg-white border border-black/10 absolute z-[9999] bottom-[52px] right-0 w-full lg:top-11 lg:h-[205px] lg:right-0 lg:w-[251px]">
            <div className="flex flex-col">
              <div
                onClick={handleTheme}
                className="dark:hover:bg-white/20 hover:bg-black/10  w-full text-lg flex items-center gap-3 px-6 py-3"
              >
                {theme === "light" ? (
                  <MdOutlineDarkMode />
                ) : (
                  <MdOutlineLightMode />
                )}
                <span>{theme === "light" ? "Dark" : "Light"}</span>
              </div>
              <div
                onClick={() => handleLogout(router.push)}
                className="dark:hover:bg-white/20 hover:bg-black/10  w-full text-lg flex items-center gap-3 px-6 py-3"
              >
                <AiOutlinePoweroff />
                <span>Log out</span>
              </div>
              <div className="dark:border-white/40 font-bold border-t border-black/10 w-full text-lg flex flex-col items-start gap-3 px-6 py-3">
                <span>{user?.firstName + " " + user?.lastName}</span>
                <span>{user?.mspCustomDomain}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppNav;
