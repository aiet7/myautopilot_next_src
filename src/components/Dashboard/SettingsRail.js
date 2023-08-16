import { AiOutlineMenu } from "react-icons/ai";
import { BiBrain } from "react-icons/bi";

const SettingsRail = ({
  activeTab,
  selectedAgent,
  handleOpenHistory,
  handleOpenAssistant,
  handleOpenRooms,
}) => {

  
  const handleHistoryMenu = () => {
    if (handleOpenHistory) handleOpenHistory();
    if (handleOpenRooms) handleOpenRooms();
  };

  const handleAssistantMenu = () => {
    if (handleOpenAssistant) handleOpenAssistant();
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
