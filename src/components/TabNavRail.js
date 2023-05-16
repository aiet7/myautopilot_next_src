"use client";

import { AiOutlineRobot } from "react-icons/ai";
import { BsChatDots } from "react-icons/bs";
import { MdOutlineAccountCircle } from "react-icons/md";

const TabNavRail = ({ activeTab, handleTabChange }) => {
  return (
    <div className="dark:bg-[#424242] dark:rounded-lg bg-black/5 flex items-center justify-evenly py-4 px-3 gap-6 sm:flex-col sm:justify-start sm:bg-white ">
      <div
        onClick={() => handleTabChange("intro")}
        className="flex flex-col items-center cursor-pointer"
      >
        <AiOutlineRobot
          size={30}
          className={`${activeTab === "intro" && ""}`}
        />
        <span className="text-sm">Intro</span>
      </div>
      <div
        onClick={() => handleTabChange("chat")}
        className="flex flex-col items-center cursor-pointer"
      >
        <BsChatDots size={30} className={`${activeTab === "chat" && ""}`} />
        <span className="text-sm">Chat</span>
      </div>
      <div
        onClick={() => handleTabChange("account")}
        className="flex flex-col items-center cursor-pointer"
      >
        <MdOutlineAccountCircle
          size={30}
          className={`${activeTab === "account" && ""}`}
        />
        <span className="text-sm">Account</span>
      </div>
    </div>
  );
};

export default TabNavRail;
