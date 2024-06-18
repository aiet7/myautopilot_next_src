import MarkedTroubleshoot from "@/components/Dashboard/Marked/MarkedTroubleshoot";

import useTicketConversationsStore from "@/utils/store/interaction/conversations/ticketConversationsStore";
import useQueueStore from "@/utils/store/interaction/queue/useQueueStore";
import useUserStore from "@/utils/store/user/userStore";
import { FaSpinner } from "react-icons/fa";
import { SiOpenai } from "react-icons/si";

const Troubleshoot = () => {
  const { user } = useUserStore();
  const { troubleshootMessages } = useQueueStore();

  return (
    <>
      <p className="text-lg font-bold ">Troubleshooting Guide</p>
      <div className="flex flex-col gap-8">
        {troubleshootMessages?.length !== 0 ? (
          <>
            {troubleshootMessages?.map((messages) => {
              const { id, content, role } = messages;
              return (
                <div key={id} className="flex items-start gap-2">
                  <span>
                    {role === "user" ? (
                      <div className="w-7 h-7 text-sm bg-blue-800 flex justify-center items-center text-white">
                        {user?.firstName[0]}
                      </div>
                    ) : (
                      <div className="w-7 h-7 text-sm bg-[#ab68ff]  flex justify-center items-center text-white">
                        <SiOpenai />
                      </div>
                    )}
                  </span>
                  <MarkedTroubleshoot markdown={content} />
                </div>
              );
            })}
          </>
        ) : (
          <div className="flex items-center gap-2">
            <p>Generating optimum troubleshooting steps...</p>
            <FaSpinner className="animate-spin" />
          </div>
        )}
      </div>
    </>
  );
};

export default Troubleshoot;
