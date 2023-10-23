import useFormsStore from "@/utils/store/interaction/forms/formsStore";
import { PROCESS_NAMES } from "@/utils/tickets/ticketProcess";
import { AiOutlineCheck, AiOutlineClockCircle } from "react-icons/ai";
import { FaSpinner } from "react-icons/fa";
import { BiChevronUp, BiChevronDown } from "react-icons/bi";
import useAssistantStore from "@/utils/store/assistant/assistantStore";

const Progress = () => {
  const { showProgress, handleShowProgress } = useAssistantStore();
  const { ticketStatus } = useFormsStore();
  return (
    <div className="dark:border-white/40 dark:bg-black absolute bg-white bottom-0 left-0 right-0  rounded-tl-xl rounded-tr-xl shadow-xl border">
      {showProgress && (
        <div className="flex p-4">
          <div className="flex flex-grow flex-col gap-4">
            {PROCESS_NAMES.filter(
              (process) => ticketStatus[process.name] !== undefined
            ).map((process) => {
              return (
                <div
                  key={process.name}
                  className="dark:border-white/40 flex items-center justify-between border  p-2"
                >
                  <span>{process.displayName}</span>
                  {ticketStatus[process.name] === "done" && (
                    <AiOutlineCheck size={20} />
                  )}
                  {ticketStatus[process.name] === "waiting" && (
                    <AiOutlineClockCircle size={20} />
                  )}
                  {ticketStatus[process.name] === "pending" && (
                    <FaSpinner size={20} className="animate-spin" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
      <div
        onClick={handleShowProgress}
        className="w-full   flex justify-center p-1 cursor-pointer"
      >
        {showProgress ? <BiChevronDown /> : <BiChevronUp />}
      </div>
    </div>
  );
};

export default Progress;
