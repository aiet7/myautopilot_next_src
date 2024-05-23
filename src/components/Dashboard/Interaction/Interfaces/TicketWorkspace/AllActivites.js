"use client";

import useQueueStore from "@/utils/store/interaction/queue/useQueueStore";

const AllActivities = () => {
  const { allActivities } = useQueueStore();
  console.log(allActivities)
  return (
    <div className="">
      {allActivities?.length !== 0 ? (
        <div></div>
      ) : (
        <p className="text-xl font-bold text-black/20 w-full">
          No Recent Activities
        </p>
      )}
    </div>
  );
};

export default AllActivities;

{
  /* <div
                className={`${
                  isMobile ? "flex-col" : "flex-row"
                } flex gap-6 items-start`}
              >
                {isMobile ? (
                  <>
                    <div className="dark:border-white/20 flex items-center border rounded w-full">
                      <button
                        onClick={() => setActiveSectionButton("Form")}
                        className={`${
                          activeSectionButton === "Form" &&
                          "bg-blue-800 text-white"
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
                        <h1>Queue form here</h1>
                      )}
                      {activeSectionButton === "Troubleshoot" && (
                        <Troubleshoot />
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex-1">
                      <div className="flex  flex-col gap-2">
                        <div>
                          <div>
                            <span className="font-bold">Ticket ID</span>
                            <input
                              className="h-[50px] border outline-blue-500 w-full px-4"
                              value={currentTicket.ticketId || ""}
                              readOnly
                            />
                          </div>
                          <div>
                            <span className="font-bold">Description</span>
                            <input
                              maxLength={100}
                              className="h-[50px] border outline-blue-500 w-full px-4"
                              value={currentTicket.ticketInformation || ""}
                              readOnly
                            />
                          </div>

                          <div>
                            <span className="font-bold">Tier</span>
                            <input
                              disabled
                              className="h-[50px] border outline-blue-500 w-full px-4"
                              value={currentTicket.tier || ""}
                            />
                          </div>
                          <div>
                            <span className="font-bold">
                              Assigned Technician
                            </span>
                            <input
                              className="h-[50px] border outline-blue-500 w-full px-4"
                              value={currentTicket.assignedTech || ""}
                              readOnly
                            />
                          </div>
                         
                          
                        </div>
                      </div>

                      <div className="flex w-full justify-between my-4">
                        <button
                          onClick={handlePreviousTicketInQueue}
                          className="hover:bg-blue-500 border border-white/30 bg-blue-800 w-[150px] py-1 text-white"
                        >
                          Previous
                        </button>
                        <button
                          onClick={handleNextTicketInQueue}
                          className="hover:bg-blue-500 border border-white/30 bg-blue-800 w-[150px] py-1 text-white"
                        >
                          Next
                        </button>
                      </div>
                    </div>
                    <div className="flex-1">
                      <Troubleshoot />
                    </div>
                  </>
                )}
              </div> */
}
