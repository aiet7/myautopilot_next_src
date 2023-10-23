"use client";

import useUiStore from "@/utils/store/ui/uiStore";
import Internal from "./Options/Internal";
import Roles from "./Options/Roles";
import useAdminStore from "@/utils/store/admin/adminStore";
import Integrations from "./Options/Integrations/Integrations";
import Branding from "./Options/Branding";

const Control = ({}) => {
  const { openAdmin, handleHistoryMenu } = useUiStore();
  const { currentOption } = useAdminStore();

  return (
    <div
      onClick={() => {
        if (window.innerWidth < 1023) {
          openAdmin && handleHistoryMenu(false);
        }
      }}
      className={`relative flex flex-col h-full w-full ${
        openAdmin && "lg:opacity-100 opacity-5 xl:ml-[350px]"
      }  dark:bg-black transition-all duration-300 ease bg-white`}
    >
      {currentOption === "Internal" && <Internal />}
      {currentOption === "Roles" && <Roles />}
      {currentOption === "Integrations" && <Integrations />}
      {currentOption === "Branding" && <Branding />}
    </div>
  );
};

export default Control;
