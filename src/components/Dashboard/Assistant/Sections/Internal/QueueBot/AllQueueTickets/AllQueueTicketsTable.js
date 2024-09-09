"use client";

import useQueueStore from "@/utils/store/interaction/queue/queueStore";
import useUserStore from "@/utils/store/user/userStore";
import { useEffect } from "react";

const AllQueueTicketsTable = () => {
  const { user } = useUserStore();
  const {
    cardView,
    queueTicketsPerPage,
    currentQueueTicketsPage,
    searchValue,
    filterQueueTicketMode,
    allQueueTickets,
    setTotalQueueTicketPages,
    setFilteredQueueTicketCount,
    handleViewQueueTicket,
  } = useQueueStore();

  const filteredAndSortedQueueTickets = allQueueTickets
    ?.filter((ticket) => {
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
    })
    ?.filter((ticket) => {
      switch (filterQueueTicketMode) {
        case "Closed":
          return ticket?.closed;
        case "Newest":
        case "Oldest":
          return true;
        default:
          return (
            ticket.categoryName === filterQueueTicketMode ||
            ticket.subCategoryName === filterQueueTicketMode ||
            ticket.priority === filterQueueTicketMode
          );
      }
    })
    ?.sort((a, b) => {
      if (filterQueueTicketMode === "Newest") {
        return new Date(b.timeStamp) - new Date(a.timeStamp);
      } else if (filterQueueTicketMode === "Oldest") {
        return new Date(a.timeStamp) - new Date(b.timeStamp);
      }
      return 0;
    });

  const indexOfLastTicket = currentQueueTicketsPage * queueTicketsPerPage;
  const indexOfFirstTicket = indexOfLastTicket - queueTicketsPerPage;
  const paginatedTickets = filteredAndSortedQueueTickets?.slice(
    indexOfFirstTicket,
    indexOfLastTicket
  );

  useEffect(() => {
    const total = Math.ceil(
      (filteredAndSortedQueueTickets?.length || 0) / queueTicketsPerPage
    );
    setTotalQueueTicketPages(total);
    setFilteredQueueTicketCount(filteredAndSortedQueueTickets?.length || 0);
  }, [
    allQueueTickets,
    queueTicketsPerPage,
    searchValue,
    cardView,
    filterQueueTicketMode,
  ]);

  return (
    <>
      {paginatedTickets?.length !== 0 ? (
        <div className="block text-sm overflow-auto scrollbar-thin max-h-full min-w-[900px]">
          {allQueueTickets && (
            <table className=" overflow-auto w-full table-fixed border-separate   text-left">
              <thead className="dark:text-white dark:bg-gray-700  sticky top-0  text-black/60 bg-[#F5F8FA]">
                <tr className="">
                  <th className="dark:border-black p-2 border-l border-t border-b border-r ">
                    Score
                  </th>
                  <th className="dark:border-black p-2 border-t border-b border-r ">
                    Ticket ID
                  </th>
                  <th className="dark:border-black p-2 border-t border-b border-r ">
                    Description
                  </th>
                  <th className="dark:border-black p-2 border-t border-b border-r ">
                    Date Created
                  </th>
                  <th className="dark:border-black p-2 border-t border-b border-r ">
                    Hold Until Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedTickets?.map((tickets) => {
                  const {
                    id,
                    ticketId,
                    holdUntil,
                    ticketInformation,
                    creationTime,
                    compositeScore,
                  } = tickets;
                  return (
                    <tr
                      onClick={() =>
                        handleViewQueueTicket(
                          user?.mspCustomDomain,
                          ticketId,
                          tickets
                        )
                      }
                      key={id}
                      className="dark:hover:bg-white/40 dark:bg-white/10 hover:bg-black/20 bg-white cursor-pointer"
                    >
                      <td className="dark:border-black p-2 truncate border-l  border-r border-b">
                        {compositeScore.toFixed(2)}
                      </td>
                      <td className="dark:border-black p-2 truncate border-r border-b">
                        {ticketId}
                      </td>
                      <td className="dark:border-black p-2 truncate border-r border-b">
                        {ticketInformation}
                      </td>
                      <td className="dark:border-black p-2 truncate border-r border-b">
                        {new Date(creationTime).toLocaleTimeString() +
                          " " +
                          new Date(creationTime).toLocaleDateString()}
                      </td>
                      <td className="dark:border-black p-2 truncate border-r border-b">
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
    </>
  );
};

export default AllQueueTicketsTable;