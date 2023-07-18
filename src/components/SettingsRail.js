import { AiOutlineMenu } from "react-icons/ai";
import { BiBrain } from "react-icons/bi";

const SettingsRail = ({
  activeTab,

  selectedAgent,
  handleOpenChatHistory,
  handleOpenChatAssistant,
  handleOpenAgentHistory,
  handleOpenAgentAssistant,
  handleOpenTeamsHistory,
  handleOpenTeamsAssistant,
}) => {
  const handleHistoryMenu = () => {
    if (handleOpenChatHistory) handleOpenChatHistory();
    if (handleOpenAgentHistory) handleOpenAgentHistory();
    if (handleOpenTeamsHistory) handleOpenTeamsHistory();
  };

  const handleAssistantMenu = () => {
    if (handleOpenChatAssistant) handleOpenChatAssistant();
    if (handleOpenAgentAssistant) handleOpenAgentAssistant();
    if (handleOpenTeamsAssistant) handleOpenTeamsAssistant();
  };

  return (
    <div className="dark:bg-black bg-white flex items-center justify-between px-4 py-2 xl:hidden">
      <AiOutlineMenu
        size={20}
        onClick={handleHistoryMenu}
        className="cursor-pointer"
      />
      {selectedAgent || activeTab === "teams" ? (
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
