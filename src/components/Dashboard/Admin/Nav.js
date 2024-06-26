"use client";
import useUiStore from "@/utils/store/ui/uiStore";
import { BsGearWideConnected, BsPeopleFill } from "react-icons/bs";
import { GiOrganigram } from "react-icons/gi";
import { FaUserCog, FaChalkboard } from "react-icons/fa";
import { MdOutlineBrandingWatermark, MdBusinessCenter } from "react-icons/md";
import { IoMdContacts } from "react-icons/io";
import useAdminStore from "@/utils/store/admin/adminStore";
import Link from "next/link";
import useUserStore from "@/utils/store/user/userStore";

const Nav = ({}) => {
  const { user } = useUserStore();
  const { openAdmin } = useUiStore();
  const { options, currentOption, handleOptionSelected } = useAdminStore();

  const renderIcon = (option) => {
    switch (option) {
      case "employees":
        return <GiOrganigram size={20} />;
      case "roles":
        return <FaUserCog size={20} />;
      case "msp-integrations":
        return <BsGearWideConnected size={20} />;
      case "client-integrations":
        return <BsPeopleFill size={20} />;
      case "branding":
        return <MdOutlineBrandingWatermark size={20} />;
      case "companies":
        return <MdBusinessCenter size={20} />;
      case "contacts":
        return <IoMdContacts size={20} />;
      case "board":
        return <FaChalkboard size={20} />;
      default:
        return null;
    }
  };

  return (
    <div
      className={`absolute z-10 top-0 bottom-0 left-0 text-sm
      ${
        openAdmin
          ? "translate-x-0 w-full md:w-[250px]"
          : "-translate-x-full w-full md:w-[250px]"
      } dark:bg-[#111111] dark:border-white/10  bg-[#f6f8fc] p-4 flex flex-col transition-all duration-300 ease md:border-r md:border-black/10`}
    >
      <div className="overflow-y-auto h-full scrollbar-thin">
        {options
          .filter((option) => {
            const permissionMap = {
              employees: "technicianUserManagement",
              roles: "roleManagement",
              "msp-integrations": "mspIntegrations",
              "client-integrations": "clientIntegrations",
              branding: "mspBranding",
              companies: "technicianUserManagement",
              contacts: "technicianUserManagement",
              board: "boardView",
            };

            if (option === "contacts") {
              return !user?.permissions?.[permissionMap[option]];
            }

            return user?.permissions?.[permissionMap[option]];
          })
          .map((option, index) => {
            return (
              <Link
                key={option}
                href={`/${user?.mspCustomDomain}/dashboard/${
                  user?.id
                }/admin/${option.replace("Integrations", "-integrations")}`}
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
                      <div className="w-6">{renderIcon(option)}</div>
                      <div className="w-44 truncate flex">
                        <span className="px-1">
                          {{
                            "msp-integrations": "MSP Integrations",
                            "client-integrations": "Client Integrations",
                          }[option] ||
                            option
                              .split("-")
                              .map(
                                (word) =>
                                  word.charAt(0).toUpperCase() + word.slice(1)
                              )
                              .join(" ")}
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
