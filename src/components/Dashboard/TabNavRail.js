"use client";

import {
  AiOutlineHome,
  AiOutlinePoweroff,
  AiOutlineMenu,
} from "react-icons/ai";
import {
  MdOutlineAccountCircle,
  MdOutlineDarkMode,
  MdOutlineLightMode,
} from "react-icons/md";

import { RiAdminLine } from "react-icons/ri";

import { useTheme } from "next-themes";

import useUiStore from "@/utils/store/ui/uiStore.js";
import useUserStore from "@/utils/store/user/userStore";

import useAssistantStore from "@/utils/store/assistant/assistantStore";
import Link from "next/link";

const TabNavRail = ({}) => {
  const { user, handleLogout } = useUserStore();

  const { activeUIAssistantTab } = useAssistantStore();

  const {
    openSettings,
    activeTab,
    handleTabChange,
    handleHistoryMenu,
    handleToggleSettings,
  } = useUiStore();

  const { theme, setTheme } = useTheme();

  const handleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="dark:lg:border-white/10 dark:bg-[#373737]  bg-[#eaf1fb] flex items-center justify-evenly p-3 gap-4 transition-all duration-300 ease lg:relative lg:flex-col lg:justify-start lg:border-r">
      {((activeTab === "iTAgent" &&
        (activeUIAssistantTab === "Engineer" ||
          activeUIAssistantTab === "Document" ||
          activeUIAssistantTab === "Tickets")) ||
        activeTab === "admin") && (
        <>
          <AiOutlineMenu
            data-tooltip-id="History Menu"
            onClick={handleHistoryMenu}
            size={20}
            className="hidden cursor-pointer outline-none lg:flex"
          />
          {/* <Tooltip
            place="right"
            content={
              openHistory || openDocs || openTickets ? "Hide Menu" : "Show Menu"
            }
            id="History Menu"
            className="z-[99]"
          /> */}
        </>
      )}
      <Link href={`/dashboard/${user?.id}`}>
        <div
          onClick={() => {
            handleTabChange("iTAgent");
          }}
          className="relative flex flex-col gap-2 items-center cursor-pointer"
        >
          <AiOutlineHome
            data-tooltip-id="Home"
            size={22}
            className={`${
              activeTab === "iTAgent" && "text-blue-600"
            } outline-none`}
          />
          {/* <Tooltip
            place="right"
            content="Home"
            id="Home"
            className="z-[99]"
          /> */}
        </div>
      </Link>
      {[
        "tim@etech7.com",
        "ariel@etech7.com",
        "eisanov@etech7.com",
        "mkandinov@etech7.com",
        "agogia@etech7.com",
      ].includes(user?.email) && (
        <Link href={`/dashboard/${user?.id}/admin/internal`}>
          <div
            onClick={() => {
              handleTabChange("admin");
            }}
            className="relative flex flex-col gap-2 items-center cursor-pointer"
          >
            <RiAdminLine
              data-tooltip-id="Admin"
              size={22}
              className={`${
                activeTab === "admin" && "text-blue-600"
              } outline-none`}
            />
            {/* <Tooltip
              place="right"
              content="Admin"
              id="Admin"
              className="z-[99]"
            /> */}
          </div>
        </Link>
      )}

      <div
        onClick={() => handleToggleSettings(true)}
        className="flex flex-col items-center cursor-pointer  lg:absolute lg:bottom-0 lg:py-3"
      >
        <div className="w-7 h-7 bg-blue-800 text-sm flex justify-center items-center text-white">
          {user?.firstName?.[0]}
        </div>
        {openSettings && (
          <div className="dark:bg-black dark:border-white/40 dark:border rounded-lg bg-white border border-black/10 absolute z-[99] bottom-[52px] right-0 w-full lg:bottom-0 lg:left-[37px] lg:w-[351px]">
            <div className="flex flex-col">
              <div
                onClick={() => handleTabChange("settings")}
                className="dark:hover:bg-white/20 hover:bg-black/10 rounded-tl-lg rounded-tr-lg w-full text-lg flex items-center gap-3 px-6 py-3"
              >
                <MdOutlineAccountCircle />
                <span>Account</span>
              </div>
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
              <Link href={`/auth/login`}>
                <div
                  onClick={handleLogout}
                  className="dark:hover:bg-white/20 hover:bg-black/10  w-full text-lg flex items-center gap-3 px-6 py-3"
                >
                  <AiOutlinePoweroff />
                  <span>Log out</span>
                </div>
              </Link>
              <div className="dark:border-white/40 font-bold border-t border-black/10 w-full text-lg flex flex-col items-start gap-3 px-6 py-3">
                <span>{user?.firstName + " " + user?.lastName}</span>
                <span>{user?.companyName}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TabNavRail;
