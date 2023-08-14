"use client";

import { PROCESS_NAMES } from "../../../../utils/tickets/ticketProcess";
import { AiOutlineCheck, AiOutlineClockCircle } from "react-icons/ai";
import { FaSpinner } from "react-icons/fa";

const Workflows = ({ ticketIsPending }) => {
  return (
    <>
      <h3 className="text-left text-lg">Workflows</h3>
      <div className="flex-grow overflow-y-auto scrollbar-thin">
        {ticketIsPending.ticketCreated && (
          <div className="flex flex-grow flex-col gap-4">
            {PROCESS_NAMES.filter(
              (process) => ticketIsPending[process.name] !== undefined
            ).map((process) => {
              return (
                <div
                  key={process.name}
                  className="flex items-center justify-between border shadow p-2"
                >
                  <span>{process.displayName}</span>
                  {ticketIsPending[process.name] === "done" && (
                    <AiOutlineCheck size={20} />
                  )}
                  {ticketIsPending[process.name] === "waiting" && (
                    <AiOutlineClockCircle size={20} />
                  )}
                  {ticketIsPending[process.name] === "pending" && (
                    <FaSpinner size={20} className="animate-spin" />
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default Workflows;
