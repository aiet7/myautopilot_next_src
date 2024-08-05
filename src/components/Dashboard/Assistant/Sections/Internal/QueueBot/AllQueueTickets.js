"use client";

import useQueueStore from "@/utils/store/interaction/queue/queueStore";

const AllQueueTickets = () => {
  const { searchValue, allQueueTickets } = useQueueStore();

  const filteredAndSortedQueueTickets = allQueueTickets?.filter((ticket) => {
    if (!searchValue) return true;
    if (
      ticket.compositeScore?.toString().includes(searchValue) ||
      ticket.category?.includes(searchValue) ||
      ticket.category?.toLowerCase().includes(searchValue) ||
      ticket.subcategory?.includes(searchValue) ||
      ticket.subcategory?.toLowerCase().includes(searchValue) ||
      ticket.ticketId?.includes(searchValue) ||
      ticket.title?.includes(searchValue) ||
      ticket.title?.toLowerCase().includes(searchValue) ||
      ticket.description?.includes(searchValue) ||
      ticket.description?.toLowerCase().includes(searchValue) ||
      new Date(ticket.creationTime)
        .toLocaleTimeString()
        .includes(searchValue) ||
      new Date(ticket.creationTime)
        .toLocaleDateString()
        .includes(searchValue) ||
      new Date(ticket.holdUntil).toLocaleTimeString().includes(searchValue) ||
      new Date(ticket.holdUntil).toLocaleDateString().includes(searchValue)
    )
      return true;
  });
  return (
    <div className="flex flex-col h-full   overflow-hidden p-4">
      <div className="flex-1 overflow-auto">
        {filteredAndSortedQueueTickets?.length !== 0 ? (
          <div className="block text-sm overflow-auto scrollbar-thin max-h-full min-w-[900px]">
            {allQueueTickets && (
              <table className="overflow-auto w-full table-fixed border-separate   text-left">
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
                  {filteredAndSortedQueueTickets?.map((tickets) => {
                    const {
                      id,
                      ticketId,
                      holdUntil,
                      ticketInformation,
                      creationTime,
                      compositeScore,
                    } = tickets;
                    return (
                      <tr key={id} className="bg-white ">
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
  );
};

export default AllQueueTickets;
