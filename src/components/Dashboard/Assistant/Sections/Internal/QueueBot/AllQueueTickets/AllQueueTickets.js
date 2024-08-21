"use client";

import useQueueStore from "@/utils/store/interaction/queue/queueStore";

import { LuRectangleHorizontal } from "react-icons/lu";
import { CiViewTable } from "react-icons/ci";
import AllQueueTicketsTable from "./AllQueueTicketsTable";
import AllQueueTicketsCards from "./AllQueueTicketsCards";
import ViewTicket from "./ViewTicket/ViewTicket";

const AllQueueTickets = () => {
  const {
    maxPagesToShow,
    searchValue,
    filterQueueTicketMode,
    cardView,
    viewQueueTicket,
    currentPage,
    ticketsPerPage,
    allQueueTickets,
    setCurrentPage,
    setCardView,
    handleNextPage,
    handlePreviousPage,
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

  const totalPages = Math.ceil(
    filteredAndSortedQueueTickets?.length / ticketsPerPage
  );

  const startPage = Math.max(
    Math.min(
      currentPage - Math.floor(maxPagesToShow / 2),
      totalPages - maxPagesToShow + 1
    ),
    1
  );
  const endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);

  const pagesToShow = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index
  );

  const renderComponent = () => {
    switch (cardView) {
      case true:
        return <AllQueueTicketsCards />;

      case false:
        return <AllQueueTicketsTable />;

      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-full overflow-hidden p-4">
      {viewQueueTicket ? (
        <ViewTicket />
      ) : (
        <>
          <div className="flex justify-between items-center mb-4">
            <div className="w-full flex items-center gap-1 ">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className="disabled:opacity-50"
              >
                Previous
              </button>
              {pagesToShow.map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-6 text-center  ${
                    currentPage === page ? "bg-blue-500 text-white" : ""
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="disabled:opacity-50"
              >
                Next
              </button>
            </div>
            <div className="">
              {cardView ? (
                <CiViewTable
                  className="cursor-pointer"
                  size={20}
                  onClick={() => setCardView(false)}
                />
              ) : (
                <LuRectangleHorizontal
                  className="cursor-pointer"
                  size={20}
                  onClick={() => setCardView(true)}
                />
              )}
            </div>
          </div>
          <div className="flex-1 overflow-auto scrollbar-thin">
            {renderComponent()}
          </div>
        </>
      )}
    </div>
  );
};

export default AllQueueTickets;
