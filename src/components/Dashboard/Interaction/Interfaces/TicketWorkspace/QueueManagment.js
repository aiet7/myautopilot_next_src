"use client";
import useQueueStore from "@/utils/store/interaction/queue/useQueueStore";
import Troubleshoot from "../../Forms/Ticket/Troubleshoot";
import useUserStore from "@/utils/store/user/userStore";

const QueueManagment = () => {
  const { user } = useUserStore();
  const {
    ticketRequeued,
    ticketClosed,
    myQueueTicket,
    isMobile,
    activeSectionButton,
    setActiveSectionButton,
    handleNextQueueTicket,
    handleRequeueTicket,
    handleCloseTicket,
  } = useQueueStore();

  return (
    <div
      className={`${isMobile ? "flex-col" : "flex-row"} flex gap-6 items-start`}
    >
      {isMobile ? (
        <>
          <div className="dark:border-white/20 flex items-center border rounded w-full">
            <button
              onClick={() => setActiveSectionButton("Form")}
              className={`${
                activeSectionButton === "Form" && "bg-blue-800 text-white"
              } w-full rounded p-2`}
            >
              Form
            </button>
            <button
              onClick={() => setActiveSectionButton("Troubleshoot")}
              className={`${
                activeSectionButton === "Troubleshoot" &&
                "bg-blue-800 text-white"
              } w-full rounded p-2`}
            >
              Troubleshoot
            </button>
          </div>
          <div className="w-full">
            {activeSectionButton === "Form" && (
              <div className="flex-1">
                <div className="flex  flex-col gap-2">
                  <div>
                    <div>
                      <span className="font-bold">Score</span>
                      <input
                        value={myQueueTicket?.compositeScore.toFixed(2) || ""}
                        className="h-[50px] border outline-blue-500 w-full px-4"
                        readOnly
                      />
                    </div>
                    <div>
                      <span className="font-bold">Ticket ID</span>
                      <input
                        value={myQueueTicket?.ticketId || ""}
                        className="h-[50px] border outline-blue-500 w-full px-4"
                        readOnly
                      />
                    </div>
                    <div>
                      <span className="font-bold">Description</span>
                      <textarea
                        value={myQueueTicket?.ticketInformation || ""}
                        maxLength={100}
                        className="h-[50px] border outline-blue-500 w-full px-4"
                        readOnly
                      />
                    </div>
                    <div>
                      <span className="font-bold">Tier</span>
                      <input
                        value={myQueueTicket?.tier || ""}
                        disabled
                        className="h-[50px] border outline-blue-500 w-full px-4"
                      />
                    </div>
                    <div>
                      <span className="font-bold">Assigned Technician</span>
                      <input
                        value={myQueueTicket?.assignedTech || ""}
                        className="h-[50px] border outline-blue-500 w-full px-4"
                        readOnly
                      />
                    </div>
                    {myQueueTicket?.holdUntil && (
                      <div>
                        <span className="font-bold">
                          Hold Until {myQueueTicket?.holdUntil}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex w-full justify-between my-4">
                  <button
                    onClick={() =>
                      handleNextQueueTicket(
                        user?.mspCustomDomain,
                        user?.tierLevel,
                        user?.id
                      )
                    }
                    className="hover:bg-blue-500 border border-white/30 bg-blue-800 w-[150px] py-1 text-white"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
            {activeSectionButton === "Troubleshoot" && <Troubleshoot />}
          </div>
        </>
      ) : (
        <>
          <div className="flex-1">
            <div className="flex  flex-col gap-2">
              <div>
                <div>
                  <span className="font-bold">Score</span>
                  <input
                    value={myQueueTicket?.compositeScore.toFixed(2) || ""}
                    className="h-[50px] border outline-blue-500 w-full px-4"
                    readOnly
                  />
                </div>
                <div>
                  <span className="font-bold">Ticket ID</span>
                  <input
                    value={myQueueTicket?.ticketId || ""}
                    className="h-[50px] border outline-blue-500 w-full px-4"
                    readOnly
                  />
                </div>
                <div>
                  <span className="font-bold">Description</span>
                  <textarea
                    value={myQueueTicket?.ticketInformation || ""}
                    maxLength={100}
                    className="max-h-[200px] min-h-[100px] border outline-blue-500 w-full px-4"
                    readOnly
                  />
                </div>

                <div>
                  <span className="font-bold">Tier</span>
                  <input
                    value={myQueueTicket?.tier || ""}
                    disabled
                    className="h-[50px] border outline-blue-500 w-full px-4"
                  />
                </div>

                <div>
                  <span className="font-bold">Assigned Technician</span>
                  <input
                    value={myQueueTicket?.assignedTech || ""}
                    className="h-[50px] border outline-blue-500 w-full px-4"
                    readOnly
                  />
                </div>
                <div>
                  <span className="font-bold">Date Created</span>
                  <p>
                    {new Date(
                      myQueueTicket?.creationTime
                    ).toLocaleDateString() +
                      " " +
                      new Date(
                        myQueueTicket?.creationTime
                      ).toLocaleTimeString()}
                  </p>
                </div>
                {myQueueTicket?.holdUntil && (
                  <div>
                    <span className="font-bold">
                      Hold Until {myQueueTicket?.holdUntil}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex w-full gap-4 my-4">
              {!(ticketRequeued || ticketClosed) ? (
                <>
                  <button
                    onClick={() =>
                      handleRequeueTicket(user?.mspCustomDomain, myQueueTicket)
                    }
                    className="hover:bg-blue-500 border border-white/30 bg-blue-800 w-[150px] py-1 text-white"
                  >
                    Requeue
                  </button>
                  <button
                    onClick={() =>
                      handleCloseTicket(
                        user?.mspCustomDomain,
                        myQueueTicket?.ticketId,
                        user?.id
                      )
                    }
                    className="hover:bg-blue-500 border border-white/30 bg-blue-800 w-[150px] py-1 text-white"
                  >
                    Close Ticket
                  </button>
                </>
              ) : (
                <button
                  onClick={() =>
                    handleNextQueueTicket(
                      user?.mspCustomDomain,
                      user?.tierLevel,
                      user?.id
                    )
                  }
                  className="hover:bg-blue-500 border border-white/30 bg-blue-800 w-[150px] py-1 text-white"
                >
                  Next
                </button>
              )}
            </div>
            {ticketRequeued && (
              <p className="font-semibold">Ticket Added Back Into The Queue!</p>
            )}
            {ticketClosed && (
              <p className="font-semibold">Ticket Has Been Closed!</p>
            )}
          </div>
          <div className="flex-1">
            <Troubleshoot />
          </div>
        </>
      )}
    </div>
  );
};

export default QueueManagment;
