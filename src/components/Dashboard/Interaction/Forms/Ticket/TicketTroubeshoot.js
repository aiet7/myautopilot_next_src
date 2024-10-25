"use client";

import useInteractionStore from "@/utils/store/interaction/interactionsStore";

const TicketTroubleshoot = () => {
  const { diagnosticTicketMessage, handleCreateTicketTroubleShootMessage } =
    useInteractionStore();

  return (
    <div className="flex flex-col gap-4">
      <p className="font-bold ">
        Ticket Details Are Displayed On The Right Panel. Would You Like To See
        TroubleShooting Steps To Resolve Your Issue?
      </p>
      <button
        onClick={() =>
          handleCreateTicketTroubleShootMessage(diagnosticTicketMessage)
        }
        className={`dark:text-white dark:hover:bg-white/40 hover:bg-black/20 text-black w-[160px] rounded-md border py-5 `}
      >
        Yes
      </button>
    </div>
  );
};

export default TicketTroubleshoot;
