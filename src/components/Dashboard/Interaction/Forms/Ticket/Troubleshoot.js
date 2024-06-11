import MarkedTroubleshoot from "@/components/Dashboard/Marked/MarkedTroubleshoot";

import useTicketConversationsStore from "@/utils/store/interaction/conversations/ticketConversationsStore";
import useQueueStore from "@/utils/store/interaction/queue/useQueueStore";
import { FaSpinner } from "react-icons/fa";

const Troubleshoot = () => {
  const { troubleshootMessages } = useQueueStore();

  return (
    <>
      <p className="text-lg font-bold px-2">Troubleshooting Guide</p>
      <div>
        {troubleshootMessages?.length !== 0 ? (
          <>
            {troubleshootMessages?.map((messages) => {
              const { id, content } = messages;
              return <MarkedTroubleshoot key={id} markdown={content} />;
            })}
          </>
        ) : (
          <div className="flex items-center gap-2 px-2">
            <p>Generating optimum troubleshooting steps...</p>
            <FaSpinner className="animate-spin" />
          </div>
        )}
      </div>
    
    </>
  );
};

export default Troubleshoot;
