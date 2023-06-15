"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { googleLogout } from "@react-oauth/google";

import { AiOutlineRobot, AiOutlinePoweroff } from "react-icons/ai";
import { BsChatDots } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import {
  MdOutlineAccountCircle,
  MdOutlineDarkMode,
  MdOutlineLightMode,
} from "react-icons/md";
import { DiMagento } from "react-icons/di";

import { useTheme } from "next-themes";

import Cookie from "js-cookie";

const TabNavRail = ({ activeTab, handleTabChange }) => {
  const [showAccountModal, setShowAccountModal] = useState(false);

  const { theme, setTheme } = useTheme();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("lastTab");
    localStorage.removeItem("lastConversationIndex");
    Cookie.remove("session_token");
    Cookie.remove("user_id");
    googleLogout();
    router.push("/auth/login");
  };

  const handleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  return (
    <div className="dark:bg-[#424242] bg-black/5 flex items-center justify-evenly p-3 gap-4 lg:relative lg:flex-col lg:justify-start lg:bg-white">
      <div
        onClick={() => handleTabChange("intro")}
        className="flex flex-col items-center cursor-pointer "
      >
        <AiOutlineRobot
          size={30}
          className={`${activeTab === "intro" && "text-blue-600"}`}
        />
        <span className="text-sm">Intro</span>
      </div>
      <div
        onClick={() => handleTabChange("chat")}
        className="flex flex-col items-center cursor-pointer"
      >
        <BsChatDots
          size={30}
          className={`${activeTab === "chat" && "text-blue-600"}`}
        />
        <span className="text-sm">Chat</span>
      </div>

      <div
        onClick={() => {}}
        className="dark:text-white/20 flex flex-col items-center cursor-pointer text-black/20"
      >
        <DiMagento
          size={30}
          className={`${activeTab === "agents" && "text-blue-600"} `}
        />
        <span className="text-sm">Agents</span>
      </div>
      <div
        onClick={handleTheme}
        className="flex flex-col items-center cursor-pointer"
      >
        {theme === "light" ? (
          <MdOutlineDarkMode size={30} className="cursor-pointer" />
        ) : (
          <MdOutlineLightMode size={30} className="cursor-pointer" />
        )}
        <span className="text-sm">{theme === "light" ? "Dark" : "Light"}</span>
      </div>
      <div
        onClick={() => setShowAccountModal(!showAccountModal)}
        className="flex flex-col items-center cursor-pointer lg:absolute lg:bottom-0 lg:py-3"
      >
        <MdOutlineAccountCircle
          size={30}
          className={`${activeTab === "account" && "text-blue-600"}`}
        />
        <span className="text-sm">Account</span>
        {showAccountModal && (
          <div className="dark:bg-black dark:border-white/40 dark:border bg-white border border-black/10 absolute z-[99] bottom-[74px] right-0 w-[150px] lg:bottom-0 lg:left-[59px] lg:w-[250px]">
            <div className="flex flex-col">
              <div
                onClick={handleLogout}
                className="dark:border-white/40 dark:hover:bg-white/20 hover:bg-black/10 border-b border-black/10 w-full text-lg flex items-center gap-3 px-6 py-3"
              >
                <AiOutlinePoweroff />
                <span>Log out</span>
              </div>
              <div
                onClick={() => handleTabChange("account")}
                className="dark:hover:bg-white/20 hover:bg-black/10 w-full text-lg flex items-center gap-3 px-6 py-3"
              >
                <FiSettings />
                <span>Settings</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TabNavRail;
