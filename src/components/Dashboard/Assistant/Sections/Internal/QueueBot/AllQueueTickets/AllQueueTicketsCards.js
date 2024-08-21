"use client";

import useQueueStore from "@/utils/store/interaction/queue/queueStore";
import useUserStore from "@/utils/store/user/userStore";

const AllQueueTicketsCards = () => {
  const { user } = useUserStore();

  const {
    currentPage,
    ticketsPerPage,
    searchValue,
    filterQueueTicketMode,
    allQueueTickets,
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
    ?.sort((a, b) => {
      switch (filterQueueTicketMode) {
        case "High Priority":
          return b.compositeScore - a.compositeScore;
        case "Low Priority":
          return a.compositeScore - b.compositeScore;
        case "Most Recent":
          return new Date(b.creationTime) - new Date(a.creationTime);
        case "Oldest":
          return new Date(a.creationTime) - new Date(b.creationTime);
        case "A-Z":
          return a.title.localeCompare(b.title);
        case "Z-A":
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });

  const indexOfLastTicket = currentPage * ticketsPerPage;
  const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
  const paginatedTickets = filteredAndSortedQueueTickets?.slice(
    indexOfFirstTicket,
    indexOfLastTicket
  );
  
  return (
    <>
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
          <div
            onClick={() =>
              handleViewQueueTicket(user?.mspCustomDomain, ticketId, tickets)
            }
            key={id}
            className="dark:bg-white/30 dark:text-white dark:border-white/20 cursor-pointer  flex flex-col justify-between gap-1 border rounded-md text-black bg-white px-2 py-3 mb-2"
          >
            <p className="break-words whitespace-pre-wrap">
              <span className="font-bold">Score: </span>
              {compositeScore.toFixed(2)}
            </p>
            <p className="break-words whitespace-pre-wrap">
              <span className="font-bold">Ticket ID:</span> #{ticketId}
            </p>
            <p className="break-words whitespace-pre-wrap">
              <span className="font-bold">Description: </span>
              {ticketInformation}
            </p>
            <p className="break-words whitespace-pre-wrap">
              <span className="font-bold">Date Created: </span>
              {new Date(creationTime).toLocaleTimeString() +
                " " +
                new Date(creationTime).toLocaleDateString()}
            </p>
            <p className="break-words whitespace-pre-wrap">
              <span className="font-bold">Hold Until Date: </span>
              {new Date(holdUntil).toLocaleTimeString() +
                " " +
                new Date(holdUntil).toLocaleDateString()}
            </p>
          </div>
        );
      })}
    </>
  );
};

export default AllQueueTicketsCards;
