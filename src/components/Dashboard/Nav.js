"use client";

import useMspStore from "@/utils/store/auth/msp/mspStore";
import useUiStore from "@/utils/store/ui/uiStore";
import useUserStore from "@/utils/store/user/userStore";
import { IoTicketSharp } from "react-icons/io5";
import { MdAddToQueue, MdEngineering, MdOutlineSettings } from "react-icons/md";

const Nav = () => {
  const { user } = useUserStore();
  const { userType } = useMspStore();
  const { openNav, currentNavOption, options, handleOptionSelected } =
    useUiStore();

  const renderIcon = (option) => {
    switch (option) {
      case "Tickets":
        return <IoTicketSharp size={20} />;
      case "Queue":
        return <MdAddToQueue size={20} />;
      case "Assistant":
        return <MdEngineering size={20} />;
      case "Settings":
        return <MdOutlineSettings size={20} />;
      default:
        return null;
    }
  };

  const filteredOptions =
    userType === "tech"
      ? options
      : options.filter((option) => option !== "Queue");

  return (
    <div
      className={`absolute z-10 top-0 bottom-0 left-0 text-sm ${
        openNav
          ? "translate-x-0 w-full md:w-[250px]"
          : "-translate-x-full w-full md:w-[250px]"
      } dark:bg-[#111111] dark:border-white/10 bg-[#f6f8fc] p-4 flex flex-col transition-all duration-300 ease md:border-r md:border-black/10`}
    >
      <div className="overflow-y-auto h-full scrollbar-thin">
        {filteredOptions.map((option) => (
          <div key={option} className="flex flex-col items-start my-2">
            <div
              onClick={() =>
                handleOptionSelected(option, user?.mspCustomDomain)
              }
              className={`${
                currentNavOption === option
                  ? "dark:bg-white/40 bg-black/20"
                  : ""
              } dark:text-white dark:hover:bg-white/40 hover:bg-black/20 text-black w-full flex items-center justify-between px-4 py-5 cursor-pointer rounded-lg`}
            >
              <div className="flex items-center">
                <div className="w-6">{renderIcon(option)}</div>
                <div className="w-44 truncate flex">
                  <span className="px-1">{option}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Nav;
