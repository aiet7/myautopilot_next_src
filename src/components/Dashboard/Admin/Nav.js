"use client";
import useUiStore from "@/utils/store/ui/uiStore";
import { BsGearWideConnected } from "react-icons/bs";
import { GiOrganigram } from "react-icons/gi";
import { FaUserCog } from "react-icons/fa";
import { MdOutlineBrandingWatermark, MdBusinessCenter } from "react-icons/md";
import useAdminStore from "@/utils/store/admin/adminStore";

import Link from "next/link";
import useTechStore from "@/utils/store/user/techStore";

const Nav = ({}) => {
  const { tech } = useTechStore();
  const { openAdmin } = useUiStore();
  const { options, currentOption, handleOptionSelected } = useAdminStore();

  const renderIcon = (option) => {
    switch (option) {
      case "internal":
        return <GiOrganigram size={20} />;
      case "roles":
        return <FaUserCog size={20} />;
      case "integrations":
        return <BsGearWideConnected size={20} />;
      case "branding":
        return <MdOutlineBrandingWatermark size={20} />;
      case "companies":
        return <MdBusinessCenter size={20} />;

      default:
        return null;
    }
  };

  return (
    <div
      className={`absolute z-10 top-0 bottom-0 left-0  
      ${
        openAdmin
          ? "translate-x-0 w-full md:w-[350px]"
          : "-translate-x-full w-full md:w-[350px]"
      } dark:bg-[#111111] dark:border-white/10  bg-[#f6f8fc] p-4 flex flex-col transition-all duration-300 ease md:border-r md:border-black/10`}
    >
      <div className="overflow-y-auto h-full scrollbar-thin">
        {options.map((option, index) => {
          return (
            <Link
              key={option}
              href={`/${tech?.mspCustomDomain}/dashboard/${tech?.id}/admin/${option}`}
            >
              <div
                onClick={() => handleOptionSelected(option)}
                className="flex flex-col items-start my-2"
              >
                <div
                  className={`${`${
                    currentOption === option && "dark:bg-white/40 bg-black/20"
                  }`} dark:text-white dark:hover:bg-white/40 hover:bg-black/20  text-black w-full flex items-center justify-between px-4 py-5 cursor-pointer rounded-lg`}
                >
                  <div className="flex items-center">
                    <div className="w-8">{renderIcon(option)}</div>
                    <div className="w-64 truncate flex">
                      <span className="px-1">
                        {option.charAt(0).toUpperCase() + option.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Nav;
