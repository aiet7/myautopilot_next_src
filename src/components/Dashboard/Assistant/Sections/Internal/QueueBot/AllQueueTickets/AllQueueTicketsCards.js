"use client";

import useQueueStore from "@/utils/store/interaction/queue/queueStore";
import useUserStore from "@/utils/store/user/userStore";
import { useEffect } from "react";

const AllQueueTicketsCards = () => {
  const { user } = useUserStore();

  const {
    queueTicketsPerPage,
    cardView,
    eligibleView,
    currentQueueTicketsPage,
    searchValue,
    filterQueueTicketMode,
    allEligibleQueueTickets,
    allQueueTickets,
    setTotalQueueTicketPages,
    setFilteredQueueTicketCount,
    handleViewQueueTicket,
  } = useQueueStore();

  const selectedQueueTickets = eligibleView
    ? allEligibleQueueTickets
    : allQueueTickets;

  const filteredAndSortedQueueTickets = selectedQueueTickets
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
        return new Date(b.creationTime) - new Date(a.creationTime);
      } else if (filterQueueTicketMode === "Oldest") {
        return new Date(a.creationTime) - new Date(b.creationTime);
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
    allEligibleQueueTickets,
    queueTicketsPerPage,
    searchValue,
    cardView,
    eligibleView,
    filterQueueTicketMode,
  ]);

  return (
    <>
      {paginatedTickets?.length !== 0 ? (
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
                  handleViewQueueTicket(
                    user?.mspCustomDomain,
                    ticketId,
                    tickets
                  )
                }
                key={id}
                className="dark:bg-black dark:text-white dark:hover:bg-white/40 hover:bg-black/20 bg-white cursor-pointer  flex flex-col justify-between gap-1 border rounded-md text-black bg-white px-2 py-3 mb-2"
              >
                <p className="break-words whitespace-pre-wrap">
                  <span className="font-bold">Score: </span>
                  {compositeScore.toFixed(2)}
                </p>
                <p className="break-words whitespace-pre-wrap">
                  <span className="font-bold">Ticket ID:</span> #{ticketId}
                </p>
                <p className="break-words whitespace-wrap truncate w-[300px]">
                  <span className="font-bold ">Description: </span>
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
      ) : (
        <p className="text-xl font-bold text-black/20 w-full">
          No Tickets Available
        </p>
      )}
    </>
  );
};

export default AllQueueTicketsCards;
