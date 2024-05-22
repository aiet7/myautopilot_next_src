"use client";

import useQueueStore from "@/utils/store/interaction/queue/useQueueStore";

const AllQueueTickets = () => {
  const { allQueueTickets } = useQueueStore();

  const sortedTickets = allQueueTickets
    ? [...allQueueTickets].sort((a, b) => b.compositeScore - a.compositeScore)
    : [];
  
  return (
    <div className="flex flex-wrap gap-8">
      {allQueueTickets?.length !== 0 ? (
        <>
          {sortedTickets?.map((tickets) => {
            const {
              id,
              ticketId,
              holdUntil,
              ticketInformation,
              creationTime,
              compositeScore,
            } = tickets;
            return (
              <div
                key={id}
                className="flex-col gap-4 w-[250px]  shadow-md p-4 rounded-md"
              >
                <div className="flex flex-col items-start gap-4 h-full">
                  <p>Score: {compositeScore.toFixed(2)}</p>
                  <p className="font-bold text-lg">Ticket ID: {ticketId}</p>
                  <p>{ticketInformation}</p>
                  {holdUntil && (
                    <p>Hold until {new Date(holdUntil).toLocaleDateString()}</p>
                  )}
                  <div className="mt-auto">
                    <p>
                      {new Date(creationTime).toLocaleDateString() +
                        " " +
                        new Date(creationTime).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </>
      ) : (
        <p className="text-xl font-bold text-black/20 w-full">
          No Tickets Available
        </p>
      )}
    </div>
  );
};

export default AllQueueTickets;
