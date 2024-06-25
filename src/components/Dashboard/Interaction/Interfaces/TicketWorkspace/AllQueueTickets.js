"use client";

import useQueueStore from "@/utils/store/interaction/queue/queueStore";

const AllQueueTickets = () => {
  const { allQueueTickets } = useQueueStore();

  const sortedTickets = allQueueTickets
    ? [...allQueueTickets].sort((a, b) => b.compositeScore - a.compositeScore)
    : [];

  return (
    <div className="flex flex-col  overflow-hidden">
      <div className="flex flex-col gap-7  overflow-hidden ">
        <div className="flex flex-col overflow-hidden">
          {allQueueTickets?.length !== 0 ? (
            <div className="block text-sm overflow-auto scrollbar-thin max-h-full max-w-full">
              {sortedTickets && (
                <table className="w-full table-fixed border-separate border-spacing-0 text-left">
                  <thead className="dark:text-white dark:bg-gray-700  sticky top-0  text-black/60 bg-[#F5F8FA]">
                    <tr className="">
                      <th className="p-2 border-l border-t border-b border-r ">
                        Score
                      </th>
                      <th className="p-2 border-t border-b border-r ">
                        Ticket ID
                      </th>
                      <th className="p-2 border-t border-b border-r ">
                        Description
                      </th>
                      <th className="p-2 border-t border-b border-r ">
                        Date Created
                      </th>
                      <th className="p-2 border-t border-b border-r ">
                        Hold Until Date
                      </th>
                    </tr>
                  </thead>
                  <tbody>
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
                        <tr key={id}>
                          <td className="p-2 truncate border-l  border-r border-b">
                            {compositeScore.toFixed(2)}
                          </td>
                          <td className="p-2 truncate border-r border-b">
                            {ticketId}
                          </td>
                          <td className="p-2 truncate border-r border-b">
                            {ticketInformation}
                          </td>
                          <td className="p-2 truncate border-r border-b">
                            {new Date(creationTime).toLocaleTimeString() +
                              " " +
                              new Date(creationTime).toLocaleDateString()}
                          </td>
                          <td className="p-2 truncate border-r border-b">
                            {" "}
                            {new Date(holdUntil).toLocaleTimeString() +
                              " " +
                              new Date(holdUntil).toLocaleDateString()}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          ) : (
            <p className="text-xl font-bold text-black/20 w-full">
              No Tickets Available
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllQueueTickets;
