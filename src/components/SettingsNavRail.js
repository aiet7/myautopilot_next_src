"use client";

import { MdOutlineDashboard } from "react-icons/md";
import { IoMdNotificationsOutline } from "react-icons/io";
import { AiOutlineSetting } from "react-icons/ai";
import { MdOutlineDarkMode } from "react-icons/md";


import { useTheme } from "next-themes";

const SettingsNavRail = () => {
  const { theme, setTheme } = useTheme();

  const handleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="dark:bg-black dark:rounded-lg h-[10vh] flex  items-center justify-between p-2 gap-3 sm:flex-col sm:justify-start sm:dark:bg-[#424242]">
      <MdOutlineDashboard size={25} className="cursor-pointer" />
      <IoMdNotificationsOutline size={25} className="cursor-pointer" />
      <AiOutlineSetting size={25} className="cursor-pointer" />
     
      <MdOutlineDarkMode
        size={25}
        onClick={handleTheme}
        className="cursor-pointer"
      />
    </div>
  );
};

export default SettingsNavRail;
