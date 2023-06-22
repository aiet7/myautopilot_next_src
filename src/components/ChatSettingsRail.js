import { AiOutlineMenu } from "react-icons/ai";
import { BiBrain } from "react-icons/bi";

const ChatSettingsRail = ({
  handleOpenChatHistory,
  handleOpenChatAssistant,
}) => {
  return (
    <div className="dark:bg-black bg-white flex items-center justify-between px-4 py-2 xl:hidden">
      <AiOutlineMenu
        size={20}
        onClick={handleOpenChatHistory}
        className="cursor-pointer"
      />
      <BiBrain
        size={20}
        onClick={handleOpenChatAssistant}
        className="cursor-pointer"
      />
    </div>
  );
};

export default ChatSettingsRail;
