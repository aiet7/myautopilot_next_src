"use client";
import { FaMoneyBillAlt, FaPlus, FaAlignLeft } from "react-icons/fa";
import { AiFillTool } from "react-icons/ai";
import { MdScreenShare, MdPassword, MdPolicy } from "react-icons/md";
import useUiStore from "@/utils/store/ui/uiStore";
import useAssistantStore from "@/utils/store/assistant/assistantStore";

const AssistantRail = ({}) => {
  const { openAssistant, handleAssistantMenu } = useUiStore();
  const { activeAssistantTab, handleAssistantTabChange } = useAssistantStore();

  return (
    <div
      className={` ${
        openAssistant && window.innerWidth > 1023 ? "translate-x-[0px]" : ""
      }  dark:bg-[#373737] dark:border-white/10 relative z-[100] flex flex-col  bg-[#eaf1fb] px-1 pt-2  transition-all duration-300 ease border-r  lg:border-l lg:border-black/10`}
    >
      <FaAlignLeft
        onClick={() => !openAssistant && handleAssistantMenu()}
        className={`${
          openAssistant
            ? "opacity-0"
            : "rounded-full px-2 cursor-pointer outline-none"
        } `}
        size={35}
      />
      <div className="flex flex-col-reverse gap-4 pt-8">
        {/* <FaPlus
          className="dark:hover:bg-white/20 hover:bg-black/20 rounded-full px-2 cursor-pointer outline-none"
          size={35}
        />
        <div className="dark:border-white/20 border-black/10 border w-full" />
        <MdScreenShare
          className={`${
            activeAssistantTab === "Remote Access" && "text-blue-800"
          } dark:hover:bg-white/20 hover:bg-black/20 rounded-full px-2 cursor-pointer outline-none`}
          size={35}
          onClick={() => handleAssistantTabChange("Remote Access")}
        />
        <MdPassword
          className={`${
            activeAssistantTab === "Passwords" && "text-blue-800"
          } dark:hover:bg-white/20 hover:bg-black/20 rounded-full px-2 cursor-pointer outline-none`}
          size={35}
          onClick={() => handleAssistantTabChange("Passwords")}
        />
        <FaMoneyBillAlt
          className={`${
            activeAssistantTab === "Billing" && "text-blue-800"
          } dark:hover:bg-white/20 hover:bg-black/20 rounded-full px-2 cursor-pointer outline-none`}
          size={35}
          onClick={() => handleAssistantTabChange("Billing")}
        />
        <AiFillTool
          className={`${
            activeAssistantTab === "Downloads" && "text-blue-800"
          } dark:hover:bg-white/20 hover:bg-black/20 rounded-full px-2 cursor-pointer outline-none`}
          size={35}
          onClick={() => handleAssistantTabChange("Downloads")}
        />
        <MdPolicy
          className={`${
            activeAssistantTab === "Policies" && "text-blue-800"
          } dark:hover:bg-white/20 hover:bg-black/20 rounded-full px-2 cursor-pointer outline-none`}
          size={35}
          onClick={() => handleAssistantTabChange("Policies")}
        /> */}

        <div className="group relative flex items-center">
          <FaPlus
            className="dark:hover:bg-white/20 hover:bg-black/20 rounded-full px-2 cursor-pointer outline-none"
            size={35}
          />
          <span className="shadow font-semibold bg-white absolute left-[-350%] top-1/2 transform -translate-y-1/2 scale-0 rounded  p-2 text-xs text-black group-hover:scale-100 group-hover:shadow-md transition-shadow duration-200">
            Add External App
          </span>
        </div>
        <div className="dark:border-white/20 border-black/10 border w-full" />
        <div className="group relative flex items-center">
          <MdScreenShare
            className={`${
              activeAssistantTab === "Remote Access" && "text-blue-800"
            } dark:hover:bg-white/20 hover:bg-black/20 rounded-full px-2 cursor-pointer outline-none`}
            size={35}
            onClick={() => handleAssistantTabChange("Remote Access")}
          />
          <span className="shadow font-semibold bg-white absolute left-[-310%] top-1/2 transform -translate-y-1/2 scale-0 rounded bg-gray-200 p-2 text-xs text-black group-hover:scale-100">
            Remote Access
          </span>
        </div>
        <div className="group relative flex items-center">
          <MdPassword
            className={`${
              activeAssistantTab === "Passwords" && "text-blue-800"
            } dark:hover:bg-white/20 hover:bg-black/20 rounded-full px-2 cursor-pointer outline-none`}
            size={35}
            onClick={() => handleAssistantTabChange("Passwords")}
          />
          <span className="shadow font-semibold bg-white absolute left-[-240%] top-1/2 transform -translate-y-1/2 scale-0 rounded bg-gray-200 p-2 text-xs text-black group-hover:scale-100">
            Passwords
          </span>
        </div>
        <div className="group relative flex items-center">
          <FaMoneyBillAlt
            className={`${
              activeAssistantTab === "Billing" && "text-blue-800"
            } dark:hover:bg-white/20 hover:bg-black/20 rounded-full px-2 cursor-pointer outline-none`}
            size={35}
            onClick={() => handleAssistantTabChange("Billing")}
          />
          <span className="shadow font-semibold bg-white absolute left-[-170%] top-1/2 transform -translate-y-1/2 scale-0 rounded bg-gray-200 p-2 text-xs text-black group-hover:scale-100">
            Billing
          </span>
        </div>
        <div className="group relative flex items-center">
          <AiFillTool
            className={`${
              activeAssistantTab === "Downloads" && "text-blue-800"
            } dark:hover:bg-white/20 hover:bg-black/20 rounded-full px-2 cursor-pointer outline-none`}
            size={35}
            onClick={() => handleAssistantTabChange("Downloads")}
          />
          <span className="shadow font-semibold bg-white absolute left-[-250%] top-1/2 transform -translate-y-1/2 scale-0 rounded bg-gray-200 p-2 text-xs text-black group-hover:scale-100">
            Downloads
          </span>
        </div>
        <div className="group relative flex items-center">
          <MdPolicy
            className={`${
              activeAssistantTab === "Policies" && "text-blue-800"
            } dark:hover:bg-white/20 hover:bg-black/20 rounded-full px-2 cursor-pointer outline-none`}
            size={35}
            onClick={() => handleAssistantTabChange("Policies")}
          />
          <span className="shadow font-semibold bg-white absolute left-[-190%] top-1/2 transform -translate-y-1/2 scale-0 rounded  p-2 text-xs text-black group-hover:scale-100">
            Policies
          </span>
        </div>
      </div>
    </div>
  );
};

export default AssistantRail;
