import MarkedTroubleshoot from "@/components/Dashboard/Marked/MarkedTroubleshoot";

import useQueueStore from "@/utils/store/interaction/queue/queueStore";
import useUserStore from "@/utils/store/user/userStore";
import { FaSpinner } from "react-icons/fa";
import { SiOpenai } from "react-icons/si";

const Troubleshoot = () => {
  const { user } = useUserStore();
  const { troubleshootMessages } = useQueueStore();

  return (
    <div className="flex-grow overflow-auto scrollbar-thin">
      {troubleshootMessages?.length !== 0 ? (
        <>
          {troubleshootMessages?.map((messages) => {
            const { id, content, role } = messages;
            return (
              <div
                key={id}
                className={`px-4 py-4 w-full ${
                  role === "user"
                    ? "dark:border-white/40 bg-black/5 border-b"
                    : "dark:bg-white/10 dark:border-white/40 border-b"
                } `}
              >
                <div className="max-w-[1250px] flex items-start gap-4 mx-auto">
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
                  <div className="flex-grow min-w-[0]">
                    <MarkedTroubleshoot markdown={content} />
                  </div>
                </div>
              </div>
            );
          })}
        </>
      ) : (
        <div className="flex items-center gap-2 p-4 font-bold">
          <p>Generating optimum troubleshooting steps...</p>
          <FaSpinner className="animate-spin" />
        </div>
      )}
    </div>
  );
};

export default Troubleshoot;
