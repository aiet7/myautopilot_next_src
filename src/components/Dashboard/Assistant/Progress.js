import useFormsStore from "@/utils/store/interaction/forms/formsStore";
import { PROCESS_NAMES } from "@/utils/tickets/ticketProcess";
import { AiOutlineCheck, AiOutlineClockCircle } from "react-icons/ai";
import { FaSpinner } from "react-icons/fa";

const Progress = () => {
  const { ticketStatus } = useFormsStore();
  return (
    <div className={`${ticketStatus.ticketCreated && "border"} py-4 px-2 rounded `}>
      {ticketStatus.ticketCreated && (
        <div className="flex flex-grow flex-col gap-4">
          {PROCESS_NAMES.filter(
            (process) => ticketStatus[process.name] !== undefined
          ).map((process) => {
            return (
              <div
                key={process.name}
                className="flex items-center justify-between border shadow p-2"
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
      )}
    </div>
  );
};

export default Progress;
