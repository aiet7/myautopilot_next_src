import MarkedTroubleshoot from "@/components/Dashboard/Marked/MarkedTroubleshoot";

import useTicketConversationsStore from "@/utils/store/interaction/conversations/ticketConversationsStore";
import { FaSpinner } from "react-icons/fa";

const Troubleshoot = () => {
  const { isMobile, troubleshootMessage, handleTroubleShootingConvo } =
    useTicketConversationsStore();

  return (
    <>
      <p className="text-lg font-bold px-2">Troubleshooting Guide</p>
      <div
        className={`${
          !isMobile && "overflow-y-auto max-h-[700px] scrollbar-thin"
        }`}
      >
        {troubleshootMessage ? (
          <MarkedTroubleshoot markdown={troubleshootMessage} />
        ) : (
          <div className="flex items-center gap-2 px-2">
            <p>Generating optimum troubleshooting steps...</p>
            <FaSpinner className="animate-spin" />
          </div>
        )}
      </div>
      {troubleshootMessage && (
        <div className="flex items-center gap-4 py-2">
          <button
            onClick={handleTroubleShootingConvo}
            className="hover:bg-blue-500 border border-white/30 bg-blue-800 px-3 py-1 text-white"
          >
            Continue Troubleshooting
          </button>
        </div>
      )}
    </>
  );
};

export default Troubleshoot;
