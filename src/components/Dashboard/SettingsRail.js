import useAgentsStore from "@/utils/store/agents/agentsStore";
import useUiStore from "@/utils/store/ui/uiStore";
import { AiOutlineMenu } from "react-icons/ai";
import { BiBrain } from "react-icons/bi";

const SettingsRail = ({}) => {
  const { selectedAgent } = useAgentsStore();
  const {
    activeTab,
    handleToggleHistory,
    handleToggleAssistant,
    handleToggleRooms,
  } = useUiStore();

  const handleHistoryMenu = () => {
    if (activeTab === "general" || activeTab === "agents")
      handleToggleHistory();
    if (activeTab === "teams") handleToggleRooms();
  };

  const handleAssistantMenu = () => {
    if (handleToggleAssistant) handleToggleAssistant();
  };

  return (
    <div className="dark:bg-black bg-white flex items-center justify-between px-4 py-2 xl:hidden">
      <AiOutlineMenu
        size={20}
        onClick={handleHistoryMenu}
        className="cursor-pointer"
      />
      {selectedAgent && activeTab !== "teams" ? (
        <BiBrain
          size={20}
          onClick={handleAssistantMenu}
          className="cursor-pointer"
        />
      ) : null}
    </div>
  );
};

export default SettingsRail;
