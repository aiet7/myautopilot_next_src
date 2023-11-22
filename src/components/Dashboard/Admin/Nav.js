"use client";
import useUiStore from "@/utils/store/ui/uiStore";
import { useRouter } from "next/router";
import { BsGearWideConnected } from "react-icons/bs";
import { GiOrganigram } from "react-icons/gi";
import { FaUserCog } from "react-icons/fa";
import { MdOutlineBrandingWatermark, MdBusinessCenter } from "react-icons/md";
import { TiFlowSwitch } from "react-icons/ti";
import useAdminStore from "@/utils/store/admin/adminStore";
import Link from "next/link";
import useUserStore from "@/utils/store/user/userStore";

const Nav = ({}) => {
  const router = useRouter();
  const { openAdmin } = useUiStore();
  const { options, currentOption, handleOptionSelected } = useAdminStore();
  const { user } = useUserStore();

  const renderIcon = (option) => {
    switch (option) {
      case "Internal":
        return <GiOrganigram size={20} />;
      case "Roles":
        return <FaUserCog size={20} />;
      case "Integrations":
        return <BsGearWideConnected size={20} />;
      case "Branding":
        return <MdOutlineBrandingWatermark size={20} />;
      case "Companies":
        return <MdBusinessCenter size={20} />;
      case "Workflows":
        return <TiFlowSwitch size={20} />;

      default:
        return null;
    }
  };
  return (
    <div
      className={`absolute z-10 top-0 bottom-0 left-0  
      ${
        openAdmin ? "translate-x-0 w-[350px]" : "-translate-x-full w-[350px] "
      }  dark:bg-[#111111] bg-[#f6f8fc] p-4 flex flex-col transition-all duration-300 ease`}
    >
      <div className="overflow-y-auto h-full scrollbar-thin">
        {options.map((option, index) => {
          return (
            <Link
              key={index}
              href={`/dashboard/${user.id}/admin/${option.toLowerCase()}`}
            >
              <div className="flex flex-col items-start my-2">
                <div
                  className={`${`${
                    currentOption === option && "dark:bg-white/40 bg-black/20"
                  }`} dark:text-white dark:hover:bg-white/40 hover:bg-black/20  text-black w-full flex items-center justify-between px-2 h-[50px] cursor-pointer`}
                >
                  <div className="flex items-center">
                    <div className="w-8">{renderIcon(option)}</div>
                    <div className="w-64 truncate flex">
                      <span className="px-1">{option}</span>
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
