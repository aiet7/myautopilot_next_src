// "use client";

// import useTicketsStore from "@/utils/store/interaction/tickets/ticketsStore";
// import { FiRefreshCcw } from "react-icons/fi";
// import ViewTicket from "./ViewTicket/ViewTicket";
// import { useEffect } from "react";

// const Tickets = () => {
//   const {
//     viewTicket,
//     currentTicketPage,
//     ticketsPerPage,
//     filterTicketMode,
//     searchValue,
//     tickets,
//     ticketStatus,
//     ticketStatusLoading,
//     setTotalTicketPages,
//     setFilteredTicketCount,
//     handleGetTicketStatus,
//     handleViewTicket,
//   } = useTicketsStore();

//   const filteredAndSortedTickets = tickets
//     ?.filter((ticket) => {
//       if (!searchValue) return true;
//       if (
//         ticket.category?.includes(searchValue) ||
//         ticket.category?.toLowerCase().includes(searchValue) ||
//         ticket.type?.includes(searchValue) ||
//         ticket.type?.toLowerCase().includes(searchValue) ||
//         ticket.subcategory?.includes(searchValue) ||
//         ticket.subcategory?.toLowerCase().includes(searchValue) ||
//         ticket.subType?.includes(searchValue) ||
//         ticket.subType?.toLowerCase().includes(searchValue) ||
//         ticket.ticketId?.includes(searchValue) ||
//         ticket.title?.includes(searchValue) ||
//         ticket.title?.toLowerCase().includes(searchValue) ||
//         ticket.description?.includes(searchValue) ||
//         ticket.description?.toLowerCase().includes(searchValue)
//       )
//         return true;
//       return false;
//     })
//     ?.filter((ticket) => {
//       const typeOrCategory = ticket.type || ticket.category;
//       const subTypeOrSubcategory = ticket.subType || ticket.subcategory;
//       switch (filterTicketMode) {
//         case "Closed":
//           return ticket?.closed;
//         case "Newest":
//         case "Oldest":
//           return true;
//         default:
//           return (
//             typeOrCategory === filterTicketMode ||
//             subTypeOrSubcategory === filterTicketMode ||
//             ticket.priority === filterTicketMode
//           );
//       }
//     })
//     ?.sort((a, b) => {
//       if (filterTicketMode === "Newest") {
//         return new Date(b.timeStamp) - new Date(a.timeStamp);
//       } else if (filterTicketMode === "Oldest") {
//         return new Date(a.timeStamp) - new Date(b.timeStamp);
//       }
//       return 0;
//     });

//   const indexOfLastTicket = currentTicketPage * ticketsPerPage;
//   const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
//   const paginatedTickets = filteredAndSortedTickets?.slice(
//     indexOfFirstTicket,
//     indexOfLastTicket
//   );
//   useEffect(() => {
//     const total = Math.ceil(
//       (filteredAndSortedTickets?.length || 0) / ticketsPerPage
//     );
//     setTotalTicketPages(total);
//     setFilteredTicketCount(filteredAndSortedTickets?.length || 0);
//   }, [tickets, ticketsPerPage, searchValue, filterTicketMode]);

//   return (
//     <div className="flex flex-col h-full p-4 ">
//       {viewTicket ? (
//         <ViewTicket />
//       ) : (
//         <div className="flex-grow overflow-y-auto scrollbar-thin">
//           {paginatedTickets?.map((ticket, index) => {
//             const {
//               id,
//               type,
//               subType,
//               category,
//               subcategory,
//               ticketId,
//               timeStamp,
//               title,
//             } = ticket;
//             return (
//               <div
//                 onClick={() => handleViewTicket(ticket, ticketId)}
//                 key={ticketId}
//                 className="dark:bg-black dark:text-white dark:hover:bg-white/40 hover:bg-black/20 bg-white cursor-pointer text-black flex flex-col justify-between gap-1 border rounded-md text-black  px-2 py-3 mb-2"
//               >
//                 <div className="flex justify-between items-center">
//                   <p className="break-words whitespace-pre-wrap">
//                     <span className="font-bold">STATUS: </span>
//                     {ticketStatus && ticketStatus?.[ticketId]?.status.name}
//                   </p>
//                   <FiRefreshCcw
//                     size={15}
//                     className={`${
//                       ticketStatusLoading?.[ticketId] && "animate-spin"
//                     } cursor-pointer`}
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       handleGetTicketStatus(ticketId);
//                     }}
//                   />
//                 </div>

//                 <p className="break-words whitespace-pre-wrap">
//                   <span className="font-bold">Ticket ID:</span> #{ticketId}
//                 </p>
//                 <p className="break-words whitespace-pre-wrap">
//                   <span className="font-bold">Title:</span> {title}
//                 </p>
//                 <p className="break-words whitespace-pre-wrap">
//                   <span className="font-bold">Category:</span>{" "}
//                   {category || type}
//                 </p>
//                 <p className="break-words whitespace-pre-wrap">
//                   <span className="font-bold">Subcategroy:</span>{" "}
//                   {subcategory || subType}
//                 </p>
//                 <p className="break-words whitespace-pre-wrap">
//                   <span className="font-bold">Date Created:</span>{" "}
//                   {new Date(timeStamp).toLocaleDateString()}
//                 </p>
//               </div>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Tickets;

"use client";

import useTicketsStore from "@/utils/store/interaction/tickets/ticketsStore";
import { FiRefreshCcw } from "react-icons/fi";
import ViewTicket from "./ViewTicket/ViewTicket";
import { useEffect } from "react";

const Tickets = () => {
  const {
    viewTicket,
    currentTicketPage,
    ticketsPerPage,
    filterTicketMode,
    searchValue,
    tickets,
    ticketStatus,
    ticketStatusLoading,
    setTotalTicketPages,
    setFilteredTicketCount,
    handleGetTicketStatus,
    handleViewTicket,
  } = useTicketsStore();

  const filteredAndSortedTickets = tickets
    ?.filter((ticket) => {
      if (!searchValue) return true;
      if (
        ticket.category?.includes(searchValue) ||
        ticket.category?.toLowerCase().includes(searchValue) ||
        ticket.type?.includes(searchValue) ||
        ticket.type?.toLowerCase().includes(searchValue) ||
        ticket.subcategory?.includes(searchValue) ||
        ticket.subcategory?.toLowerCase().includes(searchValue) ||
        ticket.subType?.includes(searchValue) ||
        ticket.subType?.toLowerCase().includes(searchValue) ||
        ticket.ticketId?.includes(searchValue) ||
        ticket.title?.includes(searchValue) ||
        ticket.title?.toLowerCase().includes(searchValue) ||
        ticket.description?.includes(searchValue) ||
        ticket.description?.toLowerCase().includes(searchValue)
      )
        return true;
      return false;
    })
    ?.filter((ticket) => {
      const typeOrCategory = ticket.type || ticket.category;
      const subTypeOrSubcategory = ticket.subType || ticket.subcategory;
      switch (filterTicketMode) {
        case "Closed":
          return ticket?.closed;
        case "Newest":
        case "Oldest":
          return true;
        default:
          return (
            typeOrCategory === filterTicketMode ||
            subTypeOrSubcategory === filterTicketMode ||
            ticket.priority === filterTicketMode
          );
      }
    })
    ?.sort((a, b) => {
      if (filterTicketMode === "Newest") {
        return new Date(b.timeStamp) - new Date(a.timeStamp);
      } else if (filterTicketMode === "Oldest") {
        return new Date(a.timeStamp) - new Date(b.timeStamp);
      }
      return 0;
    });

  const indexOfLastTicket = currentTicketPage * ticketsPerPage;
  const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
  const paginatedTickets = filteredAndSortedTickets?.slice(
    indexOfFirstTicket,
    indexOfLastTicket
  );
  useEffect(() => {
    const total = Math.ceil(
      (filteredAndSortedTickets?.length || 0) / ticketsPerPage
    );
    setTotalTicketPages(total);
    setFilteredTicketCount(filteredAndSortedTickets?.length || 0);
  }, [tickets, ticketsPerPage, searchValue, filterTicketMode]);

  return (
    <div className="flex flex-col h-full p-4 ">
      {viewTicket ? (
        <ViewTicket />
      ) : (
        <div className="flex-grow overflow-y-auto scrollbar-thin">
            {paginatedTickets?.map((ticket, index) => {
            console.log(ticket)
            const {
              id,
              type,
              subType,
              category,
              subcategory,
              ticketId,
              timeStamp,
              title,
              priority,
              name,
              emailId,
              phoneNumber,
              company,
              clientsName,
            } = ticket;
            return (
              <div
                onClick={() => handleViewTicket(ticket, ticketId)}
                key={ticketId}
                className="dark:bg-black dark:text-white dark:hover:bg-white/40 hover:bg-black/20 bg-white cursor-pointer text-black flex flex-col justify-between gap-1 border rounded-md text-black  px-2 py-3 mb-2"
              >
                <div className="flex justify-between items-center">
                  <p className="break-words whitespace-pre-wrap">
                    <span className="font-bold">STATUS: </span>
                    {ticketStatus && ticketStatus?.[ticketId]?.status.name}
                  </p>
                  <FiRefreshCcw
                    size={15}
                    className={`${
                      ticketStatusLoading?.[ticketId] && "animate-spin"
                    } cursor-pointer`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleGetTicketStatus(ticketId);
                    }}
                  />
                </div>
                <div className="flex justify-between items-center">
                  <p className="break-words whitespace-pre-wrap w-[50%]">
                    <span className="font-bold">Ticket ID:</span> #{ticketId}
                  </p>
                  <p className="break-words whitespace-pre-wrap w-[50%]">
                    <span className="font-bold">Company:</span> {clientsName}
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="truncate whitespace-nowrap overflow-hidden w-[50%]">
                    <span className="font-bold">Title:</span> {title}
                  </p>
                  <p className="break-words whitespace-pre-wrap w-[50%]">
                    <span className="font-bold">Name:</span> {name}
                  </p>
                </div>

                <div className="flex justify-between items-center">
                  <p className="break-words whitespace-pre-wrap w-[50%]">
                    <span className="font-bold">Type:</span> {category || type}
                  </p>
                  <p className="break-words whitespace-pre-wrap w-[50%]">
                    <span className="font-bold">Email: </span>
                    {emailId}
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="break-words whitespace-pre-wrap w-[50%]">
                    <span className="font-bold">Subtype:</span>{" "}
                    {subcategory || subType}
                  </p>
                  <p className="break-words whitespace-pre-wrap w-[50%]">
                    <span className="font-bold">Phone: </span>
                    {phoneNumber}
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="break-words whitespace-pre-wrap w-[50%]">
                    <span className="font-bold">Priority: </span>
                    <span
                      className={`inline-block relative top-0.5 w-5 h-3 mr-1 rounded ${
                        priority === "Priority 1 - Critical"
                          ? "bg-red-500 border border-black"
                          : priority === "Priority 2 - High"
                          ? "bg-orange-500 border border-black"
                          : priority === "Priority 3 - Medium"
                          ? "bg-yellow-500 border border-black"
                          : priority === "Priority 4 - Low"
                          ? "bg-green-500 border border-black"
                          : "bg-white border border-black"
                      }`}
                    ></span>
                    {priority}
                  </p>
                  <p className="break-words whitespace-pre-wrap w-[50%]">
                    <span className="font-bold">Date Created:</span>{" "}
                    {new Date(timeStamp).toLocaleDateString()}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Tickets;
