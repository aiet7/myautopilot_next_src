"use client";

import { AiOutlineRobot } from "react-icons/ai";
import { BsChatDots } from "react-icons/bs";
import {
  MdOutlineAccountCircle,
  MdOutlineDarkMode,
  MdOutlineLightMode,
} from "react-icons/md";
import { DiMagento } from "react-icons/di";

import { useTheme } from "next-themes";

const TabNavRail = ({ activeTab, handleTabChange }) => {
  const { theme, setTheme } = useTheme();

  const handleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  return (
    <div className="dark:bg-[#424242] bg-black/5 flex items-center justify-evenly p-3 gap-4 md:flex-col md:justify-start md:bg-white">
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
        onClick={() => handleTabChange("account")}
        className="flex flex-col items-center cursor-pointer"
      >
        <MdOutlineAccountCircle
          size={30}
          className={`${activeTab === "account" && "text-blue-600"}`}
        />
        <span className="text-sm">Account</span>
      </div>
      <div
        onClick={() => handleTabChange("agents")}
        className="flex flex-col items-center cursor-pointer"
      >
        <DiMagento
          size={30}
          className={`${activeTab === "agents" && "text-blue-600"}`}
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
    </div>
  );
};

export default TabNavRail;
