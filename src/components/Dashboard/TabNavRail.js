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

import Nav from "./Nav";
import AdminNav from "./Admin/AdminNav";

const TabNavRail = ({}) => {
  const router = useRouter();

  const { user, handleLogout } = useUserStore();
  const { handleOptionSelected } = useAdminStore();
  const {
    currentNavOption,
    openSettings,
    hoverTab,
    activeTab,
    setHoverTab,
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
      {activeTab !== "iTAgent" ? (
        <>
          <Link href={`/${user?.mspCustomDomain}/dashboard/${user?.id}`}>
            <div
              onMouseEnter={() => {
                setHoverTab("iTAgent");
              }}
              onClick={() => {
                handleTabChange("iTAgent", user?.mspCustomDomain, user?.id);
              }}
              className="relative group flex flex-col gap-2 items-center cursor-pointer "
            >
              <AiOutlineHome
                data-tooltip-id="Home"
                size={22}
                className={`${
                  activeTab === "iTAgent" && "text-blue-600"
                } outline-none`}
              />
              <span className="shadow z-[100] font-semibold bg-white absolute left-3 top-full transform -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 pointer-events-none rounded p-2 text-xs text-black transition-opacity duration-200">
                Home
              </span>
            </div>
          </Link>

          {hoverTab === "iTAgent" && (
            <div className="absolute left-[2.91rem] top-0  bottom-0">
              <Nav />
            </div>
          )}
        </>
      ) : (
        <div className="relative group flex flex-col gap-2 items-center cursor-pointer">
          <AiOutlineHome
            data-tooltip-id="Home"
            size={22}
            className="text-blue-600 outline-none"
          />
          <span className="shadow z-[100] font-semibold bg-white absolute left-3 top-full transform -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 pointer-events-none rounded p-2 text-xs text-black transition-opacity duration-200">
            Home
          </span>
        </div>
      )}

      {user?.permissions?.adminPortal &&
        (activeTab !== "admin" ? (
          <>
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
                  handleTabChange("admin", user?.mspCustomDomain, user?.id);
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
                className="relative group flex flex-col gap-2 items-center cursor-pointer"
                onMouseEnter={() => setHoverTab("admin")}
              >
                <RiAdminLine
                  size={22}
                  className={`${
                    activeTab === "admin" && "text-blue-600"
                  } outline-none`}
                />
                <span className="shadow z-[100] font-semibold bg-white absolute left-3 top-full transform -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 pointer-events-none rounded p-2 text-xs text-black transition-opacity duration-200">
                  Admin
                </span>
              </div>
            </Link>
            {hoverTab === "admin" && (
              <div className="absolute left-[2.91rem] top-0  bottom-0">
                <AdminNav />
              </div>
            )}
          </>
        ) : (
          <div className="relative group flex flex-col gap-2 items-center cursor-pointer">
            <RiAdminLine size={22} className="text-blue-600 outline-none" />
            <span className="shadow z-[100] font-semibold bg-white absolute left-3 top-full transform -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 pointer-events-none rounded p-2 text-xs text-black transition-opacity duration-200">
              Admin
            </span>
          </div>
        ))}

      <div
        onClick={() => handleToggleSettings(true)}
        className="flex flex-col items-center cursor-pointer  lg:absolute lg:bottom-0 lg:py-3"
      >
        <div className="w-7 h-7 bg-blue-800 text-sm flex justify-center items-center text-white">
          {user?.firstName?.[0].toUpperCase()}
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
