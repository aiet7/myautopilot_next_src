import useAgentsStore from "@/utils/store/agents/agentsStore";
import useUiStore from "@/utils/store/ui/uiStore";
import { BiBrain } from "react-icons/bi";

import { Tooltip as ReactTooltip } from "react-tooltip";

const SettingsRail = ({}) => {
  const { selectedAgent } = useAgentsStore();
  const {
    activeTab,
    openAssistant,
    handleAssistantMenu,
  } = useUiStore();

  return (
    <div className="dark:bg-[#111111] bg-[#f6f8fc] flex items-center justify-end px-4 py-2 lg:hidden">
      

      {selectedAgent && activeTab === "iTAgent" ? (
        <>
          <BiBrain
            data-tooltip-id="Mobile Assistant Menu"
            size={20}
            onClick={handleAssistantMenu}
            className="cursor-pointer outline-none"
          />
          <ReactTooltip
            place="left"
            content={
              openAssistant ? "Hide Assistant Menu" : "Open Assistant Menu"
            }
            id="Mobile Assistant Menu"
            className="z-[99]"
          />
        </>
      ) : null}
    </div>
  );
};

export default SettingsRail;
