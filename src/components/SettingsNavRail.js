"use client";

import { MdOutlineDashboard } from "react-icons/md";
import { IoMdNotificationsOutline } from "react-icons/io";
import { AiOutlineSetting } from "react-icons/ai";
import { MdOutlineDarkMode } from "react-icons/md";

const SettingsNavRail = () => {
  return (
    <div className="flex items-center justify-between p-2 gap-3 sm:flex-col sm:justify-start">
      <MdOutlineDashboard size={25} className="cursor-pointer" />
      <IoMdNotificationsOutline size={25} className="cursor-pointer" />
      <AiOutlineSetting size={25} className="cursor-pointer" />
      <MdOutlineDarkMode size={25} className="cursor-pointer" />
    </div>
  );
};

export default SettingsNavRail;
