import { AiOutlineMenu } from "react-icons/ai";
import { BiBrain } from "react-icons/bi";

const SettingsRail = ({
  handleOpenChatHistory,
  handleOpenChatAssistant,
  handleOpenAgentHistory,
  handleOpenAgentAssistant,
}) => {
  return (
    <div className="dark:bg-black bg-white flex items-center justify-between px-4 py-2 xl:hidden">
      <AiOutlineMenu
        size={20}
        onClick={handleOpenChatHistory || handleOpenAgentHistory}
        className="cursor-pointer"
      />
      <BiBrain
        size={20}
        onClick={handleOpenChatAssistant || handleOpenAgentAssistant}
        className="cursor-pointer"
      />
    </div>
  );
};

export default SettingsRail;
