import useAssistantStore from "@/utils/store/assistant/assistantStore";
import useUiStore from "@/utils/store/ui/uiStore";
import { AiOutlineMenu } from "react-icons/ai";

import { BiBrain } from "react-icons/bi";

import { Tooltip as ReactTooltip } from "react-tooltip";

const SettingsRail = ({}) => {
  const { activeUIAssistantTab } = useAssistantStore();
  const {
    activeTab,
    openHistory,
    openDocs,
    openAdmin,
    openAssistant,
    handleHistoryMenu,
    handleAssistantMenu,
  } = useUiStore();

  return (
    <div
      className={`dark:bg-[#111111] bg-[#f6f8fc] flex items-center ${
        activeTab === "admin" ||
        activeUIAssistantTab === "Engineer" ||
        activeUIAssistantTab === "DocGuide"
          ? "justify-between"
          : "justify-end"
      } px-4 py-2 lg:hidden`}
    >
      {(activeTab === "admin" ||
        activeUIAssistantTab === "Engineer" ||
        activeUIAssistantTab === "DocGuide") && (
        <>
          <AiOutlineMenu
            data-tooltip-id="Mobile History Menu"
            size={20}
            onClick={handleHistoryMenu}
            className="cursor-pointer outline-none"
          />
          <ReactTooltip
            place="left"
            content={
              openHistory || openDocs || openAdmin
                ? "Hide History Menu"
                : "Open History Menu"
            }
            id="Mobile History Menu"
            className="z-[99]"
          />
        </>
      )}

      {activeTab === "iTAgent" ? (
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
