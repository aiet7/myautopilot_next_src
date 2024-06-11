"use client";

import { SiOpenai } from "react-icons/si";
import { FaMoneyBillAlt } from "react-icons/fa";
import { AiFillTool } from "react-icons/ai";
import { MdScreenShare, MdPassword, MdPolicy } from "react-icons/md";
import { BsPersonWorkspace } from "react-icons/bs";
import useUiStore from "@/utils/store/ui/uiStore";
import useAssistantStore from "@/utils/store/assistant/assistantStore";

import { IoTicketSharp } from "react-icons/io5";
import useIntegrationsStore from "@/utils/store/admin/control/integrations/integrationsStore";
import useMspStore from "@/utils/store/auth/msp/mspStore";
import useQueueStore from "@/utils/store/interaction/queue/useQueueStore";
import useUserStore from "@/utils/store/user/userStore";

const AssistantRail = ({}) => {
  const { user } = useUserStore();
  const { userType } = useMspStore();
  const { mspIntegrations } = useIntegrationsStore();
  const { openAssistant } = useUiStore();
  const {
    activeAssistantTab,
    handleUIAssistantTabChange,
    handleAssistantTabChange,
  } = useAssistantStore();
  const { handleWorkspaceOptionSelected } = useQueueStore();

  return (
    <div
      className={`${
        openAssistant && window.innerWidth > 1023 ? "translate-x-[-350px]" : ""
      }  dark:bg-[#373737] dark:border-white/10 relative  bg-[#eaf1fb] px-1 py-7 flex flex-col gap-4 items-center  transition-all duration-300 ease border-r border-l border-black/10`}
    >
      <IoTicketSharp
        className={`${
          mspIntegrations?.connectWiseManageIntegrator
            ? "dark:hover:bg-white/20 hover:bg-black/20 cursor-pointer"
            : "dark:text-white/10 text-black/20"
        } ${
          activeAssistantTab === "Tickets" && "text-blue-800"
        } rounded-full px-2 outline-none`}
        size={35}
        onClick={() => {
          if (mspIntegrations?.connectWiseManageIntegrator) {
            handleAssistantTabChange("Tickets");
            handleUIAssistantTabChange("Tickets");
          } else return;
        }}
      />
      {userType === "tech" && (
        <BsPersonWorkspace
          className={`${
            mspIntegrations?.connectWiseManageIntegrator
              ? "dark:hover:bg-white/20 hover:bg-black/20 cursor-pointer"
              : "dark:text-white/10 text-black/20"
          } ${
            activeAssistantTab === "Queue" && "text-blue-800"
          } rounded-full px-2 outline-none`}
          size={35}
          onClick={() => {
            if (mspIntegrations?.connectWiseManageIntegrator) {
              handleAssistantTabChange("Queue");
              handleUIAssistantTabChange("Queue");

              handleWorkspaceOptionSelected(
                "activities",
                user?.mspCustomDomain,
                null,
                user?.id
              );
            } else return;
          }}
        />
      )}

 

      <SiOpenai
        className={`${
          activeAssistantTab === "Engineer" && "text-blue-800"
        } dark:hover:bg-white/20 hover:bg-black/20 rounded-full px-2 cursor-pointer outline-none`}
        size={35}
        onClick={() => {
          handleAssistantTabChange("Engineer");
          handleUIAssistantTabChange("Engineer");
        }}
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
      />
    </div>
  );
};

export default AssistantRail;
