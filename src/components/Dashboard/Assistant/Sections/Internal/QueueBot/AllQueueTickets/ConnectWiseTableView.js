"use client";

import useQueueStore from "@/utils/store/interaction/queue/queueStore";
import useUserStore from "@/utils/store/user/userStore";
import useUiStore from "@/utils/store/ui/uiStore.js";
import { useEffect } from "react";

const ConnectWiseTableView = () => {
  const { user } = useUserStore();

  const { toggleFullScreen } = useUiStore();

  const {
    cardView,
    eligibleView,
    queueTicketsPerPage,
    currentQueueTicketsPage,
    searchValue,
    filterQueueTicketMode,
    allQueueTickets,
    allEligibleQueueTickets,
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

  console.log(paginatedTickets);

  return (
    <>
      {paginatedTickets?.length !== 0 ? (
        <div
          className={`${
            toggleFullScreen
              ? `flex justify-center items-center w-full`
              : `block text-sm max-h-full w-full`
          }`}
        >
          {allQueueTickets && (
            <div className="h-full w-auto">
              <table
                className={`${
                  toggleFullScreen
                    ? `w-full table-fixed border-separate text-left overflow-auto scrollbar-thin`
                    : `table-fixed border-separate text-left overflow-auto scrollbar-thin`
                }`}
              >
                <thead className=" dark:text-white dark:bg-gray-700  sticky top-0 z-10 text-black/60 bg-[#F5F8FA] ">
                  <tr>
                    <th className="truncate p-2 border-l border-t border-b border-r">
                      Score
                    </th>
                    <th className="truncate p-2 text-center border-t border-b border-r">
                      Ticket #
                    </th>
                    <th className="truncate p-2 text-center border-t border-b border-r">
                      Priority
                    </th>
                    <th className="truncate p-2 border-t border-b border-r">
                      Age
                    </th>
                    <th className="truncate p-2 border-t border-b border-r">
                      Status
                    </th>
                    <th className="truncate p-2 border-t border-b border-r">
                      Company
                    </th>
                    <th className="truncate p-2 border-t border-b border-r">
                      Summary Description
                    </th>
                    <th className="truncate p-2 border-t border-b border-r">
                      Resource
                    </th>
                    <th className="truncate p-2 border-t border-b border-r">
                      Total Hours
                    </th>
                    <th className="truncate p-2 border-t border-b border-r">
                      SLA Status
                    </th>
                    <th className="truncate p-2 border-t border-b border-r">
                      Contact
                    </th>
                    <th className="truncate p-2 border-t border-b border-r">
                      Item
                    </th>
                    <th className="truncate p-2 border-t border-b border-r">
                      Last Update
                    </th>
                    <th className="truncate p-2 border-t border-b border-r">
                      Due Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedTickets?.map((tickets, index) => {
                    const {
                      id,
                      ticketId,
                      priority,
                      holdUntil,
                      ticketInformation,
                      creationTime,
                      status,
                      compositeScore,
                      company,
                      name,
                      slaDeadlineInHours,
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
                        className={`dark:hover:bg-white/40 dark:bg-white/10 hover:bg-black/20 cursor-pointer ${
                          index % 2 === 0 ? "bg-[#F5F8FA]" : "bg-white"
                        }`}
                      >
                        <td className=" p-2 truncate border-l border-r border-b">
                          {compositeScore.toFixed(2)}
                        </td>
                        <td className=" p-2 truncate border-r border-b">
                          {ticketId}
                        </td>
                        <td className="p-2 truncate text-center border-r border-b">
                          {priority === "Priority 1 - Critical" ? (
                            <div className="bg-red-500 text-white px-2 py-1 rounded">
                              {priority}
                            </div>
                          ) : priority === "Priority 2 - High" ? (
                            <div className="bg-orange-500 text-white px-2 py-1 rounded">
                              {priority}
                            </div>
                          ) : priority === "Priority 3 - Medium" ? (
                            <div className="bg-yellow-500 text-white px-2 py-1 rounded">
                              {priority}
                            </div>
                          ) : priority === "Priority 4 - Low" ? (
                            <div className="bg-green-500 text-white px-2 py-1 rounded">
                              {priority}
                            </div>
                          ) : (
                            priority
                          )}
                        </td>

                        <td className=" p-2 truncate border-r border-b">--</td>
                        <td className=" p-2 truncate border-r border-b">
                          {status}
                        </td>
                        <td className=" p-2 truncate max-w-[50px] border-r border-b">
                          {company}
                        </td>
                        <td className="p-2 truncate max-w-[250px] border-r border-b">
                          {ticketInformation}
                        </td>

                        <td className=" p-2 truncate border-r border-b">--</td>
                        <td className=" p-2 truncate border-r border-b">--</td>
                        <td className=" p-2 truncate border-r border-b">
                          {slaDeadlineInHours}hrs
                        </td>
                        <td className=" p-2 truncate border-r border-b">
                          {name}
                        </td>
                        <td className=" p-2 truncate border-r border-b">--</td>

                        <td className=" p-2 truncate border-r border-b">--</td>
                        <td className=" p-2 truncate border-r border-b">--</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
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

export default ConnectWiseTableView;
