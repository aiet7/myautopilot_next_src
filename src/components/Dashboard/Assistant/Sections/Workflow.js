"use client";

import { PROCESS_NAMES } from "../../../../utils/tickets/ticketProcess";

const Workflows = ({ ticketIsPending }) => {
  return (
    <div className="flex-grow flex flex-col gap-4 overflow-hidden">
      <h3 className="text-left text-lg">Workflows</h3>
      <div className="flex-grow overflow-y-auto scrollbar-thin">
        {ticketIsPending.ticketCreated !== undefined && (
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
                  {ticketIsPending[process.name] ? (
                    <AiOutlineCheck size={20} />
                  ) : (
                    process.waitingMessage &&
                    !ticketIsPending[process.name] && (
                      <span>{process.waitingMessage}</span>
                    )
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Workflows;
