"use client";

import {
  AiOutlineHome,
  AiOutlinePoweroff,
  AiOutlineMenu,
} from "react-icons/ai";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";

import { RiAdminLine } from "react-icons/ri";

import { useTheme } from "next-themes";

import useUiStore from "@/utils/store/ui/uiStore.js";

import Link from "next/link";
import useUserStore from "@/utils/store/user/userStore";
import useAdminStore from "@/utils/store/admin/adminStore";
import { useRouter } from "next/router";

const TabNavRail = ({}) => {
  const router = useRouter();

  const { user, handleLogout } = useUserStore();
  const { handleOptionSelected } = useAdminStore();
  const {
    currentNavOption,
    openSettings,
    activeTab,
    handleTabChange,
    handleNavMenu,
    handleToggleSettings,
  } = useUiStore();
  const { theme, setTheme } = useTheme();
  const handleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  return (
    <div className="dark:bg-[#373737] dark:border-white/10 bg-[#eaf1fb] flex items-center justify-evenly p-3 gap-4 transition-all duration-300 ease lg:relative lg:flex-col lg:justify-start lg:border-r lg:border-black/10">
      {((activeTab === "iTAgent" &&
        (currentNavOption === "Engineer" ||
          currentNavOption === "Document" ||
          currentNavOption === "Tickets" ||
          currentNavOption === "Queue")) ||
        currentNavOption === "Settings" ||
        activeTab === "admin") && (
        <>
          <AiOutlineMenu
            data-tooltip-id="History Menu"
            onClick={handleNavMenu}
            size={20}
            className="hidden cursor-pointer outline-none lg:flex"
          />
        </>
      )}
      <Link href={`/${user?.mspCustomDomain}/dashboard/${user?.id}`}>
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
        </div>
      </Link>

      {user?.permissions?.adminPortal && (
        <Link
          href={`/${user?.mspCustomDomain}/dashboard/${user?.id}/admin/${
            user?.permissions?.technicianUserManagement
              ? "employees"
              : user?.permissions?.roleManagement
              ? "roles"
              : user?.permissions?.mspIntegrations
              ? "msp-integrations"
              : user?.permissions?.clientIntegrations
              ? "client-integrations"
              : user?.permissions?.boardView
              ? "board"
              : user?.permissions?.mspBranding
              ? "branding"
              : user?.permissions?.clientUserManagement
              ? "companies"
              : !user?.permissions?.technicianUserManagement
              ? "contacts"
              : "default"
          }`}
        >
          <div
            onClick={() => {
              handleTabChange("admin");
              handleOptionSelected(
                user?.permissions?.technicianUserManagement
                  ? "employees"
                  : user?.permissions?.roleManagement
                  ? "roles"
                  : user?.permissions?.mspIntegrations
                  ? "msp-integrations"
                  : user?.permissions?.clientIntegrations
                  ? "client-integrations"
                  : user?.permissions?.boardView
                  ? "board"
                  : user?.permissions?.mspBranding
                  ? "branding"
                  : user?.permissions?.clientUserManagement
                  ? "companies"
                  : !user?.permissions?.technicianUserManagement
                  ? "contacts"
                  : "default"
              );
            }}
            className="relative flex flex-col gap-2 items-center cursor-pointer"
          >
            <RiAdminLine
              size={22}
              className={`${
                activeTab === "admin" && "text-blue-600"
              } outline-none`}
            />
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
          <div className="dark:bg-black dark:border-white/40 dark:border rounded-lg bg-white border border-black/10 absolute z-[99] bottom-[52px] right-0 w-full lg:bottom-0 lg:left-[37px] lg:w-[251px]">
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

export default TabNavRail;
