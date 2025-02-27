// "use client";

// import useTicketsStore from "@/utils/store/interaction/tickets/ticketsStore";

// const Ticket = () => {
//   const { currentTicket, ticketStatus } = useTicketsStore();

//   return (
//     <div className="flex flex-col gap-2 ">
//       <div>
//         <span className="font-bold">Ticket ID</span>
//         <input
//           disabled
//           className="dark:bg-black h-[30px] border outline-blue-500 w-full px-4 bg-white"
//           value={currentTicket?.ticketId || ""}
//         />
//       </div>
//       <div>
//         <span className="font-bold">Company</span>
//         <input
//           disabled
//           className="dark:bg-black h-[30px] border outline-blue-500 w-full px-4 bg-white"
//           value={currentTicket?.company || ""}
//         />
//       </div>
//       <div>
//         <span className="font-bold">Board</span>
//         <input
//           disabled
//           className="dark:bg-black h-[30px] border outline-blue-500 w-full px-4 bg-white"
//           value={currentTicket?.boardName || ""}
//         />
//       </div>
//       <div>
//         <span className="font-bold">Ticket Name</span>
//         <input
//           disabled
//           className="dark:bg-black h-[30px] border outline-blue-500 w-full px-4 bg-white"
//           value={currentTicket?.title || ""}
//         />
//       </div>
//       <div>
//         <span className="font-bold">Description</span>
//         <textarea
//           disabled
//           value={currentTicket?.description || ""}
//           maxLength={100}
//           className="dark:bg-black max-h-[130px] min-h-[70px] border outline-blue-500 w-full px-4 bg-white"
//         />
//       </div>
//       <div className="flex gap-4">
//         <div className="w-full">
//           <span className="font-bold">Type</span>

//           <input
//             disabled
//             className="dark:bg-black h-[30px] border outline-blue-500 w-full px-4 bg-white"
//             value={currentTicket?.type || currentTicket?.category || ""}
//           />
//         </div>
//         <div className="w-full">
//           <span className="font-bold">Subtype</span>
//           <input
//             disabled
//             className="dark:bg-black h-[30px] border outline-blue-500 w-full px-4 bg-white"
//             value={currentTicket?.subType || currentTicket?.subcategory || ""}
//           />
//         </div>
//       </div>
//       <div className="flex gap-4">
//         <div className="w-full">
//           <span className="font-bold">Priority</span>

//           <input
//             disabled
//             className="dark:bg-black h-[30px] border outline-blue-500 w-full px-4 bg-white"
//             value={currentTicket?.priority || ""}
//           />
//         </div>
//       </div>

//       <div>
//         <span className="font-bold">Status</span>

//         <input
//           disabled
//           className="dark:bg-black h-[30px] border outline-blue-500 w-full px-4 bg-white"
//           value={ticketStatus?.[currentTicket.ticketId]?.status.name || ""}
//         />
//       </div>

//       <div className="w-full">
//         <span className="font-bold">Name</span>
//         <input
//           disabled
//           className="dark:bg-black h-[30px] border outline-blue-500 w-full px-4 bg-white"
//           value={currentTicket?.name || ""}
//         />
//       </div>
//       <div className="w-full">
//         <span className="font-bold">Email</span>
//         <input
//           disabled
//           className="dark:bg-black h-[30px] border outline-blue-500 w-full px-4 bg-white"
//           value={currentTicket?.emailId || ""}
//         />
//       </div>
//       <div className="w-full">
//         <span className="font-bold">Phone Number</span>
//         <input
//           disabled
//           className="dark:bg-black h-[30px] border outline-blue-500 w-full px-4 bg-white"
//           value={currentTicket?.phoneNumber || ""}
//         />
//       </div>

//       <div>
//         <span className="font-bold">Date Created</span>
//         <p>
//           {new Date(currentTicket?.creationTime).toLocaleDateString() +
//             " " +
//             new Date(currentTicket?.creationTime).toLocaleTimeString() || ""}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Ticket;

"use client";

import useTicketsStore from "@/utils/store/interaction/tickets/ticketsStore";
import useUiStore from "@/utils/store/ui/uiStore";
import useAssistantStore from "@/utils/store/assistant/assistantStore";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { useEffect } from "react";

const Ticket = () => {
  const { currentTicket, ticketStatus } = useTicketsStore();
  const { toggleTicketView, setToggleTicketView } = useUiStore();
  const { assistantWidth } = useAssistantStore();

  useEffect(() => {
    return () => {
      setToggleTicketView(true);
    };
  }, [setToggleTicketView]);
  return (
    <>
      <div className="relative border-2 shadow-md dark:bg-black bg-white">
        <div className="flex justify-between items-center px-10 py-3">
          <h1 className="font-bold text-[#465E89]">
            Ticket # {currentTicket?.ticketId}
          </h1>
          {toggleTicketView ? (
            <IoIosArrowUp
              size="20"
              onClick={() => setToggleTicketView(false)}
              className="hover:cursor-pointer"
            />
          ) : (
            <IoIosArrowDown
              size="20"
              onClick={() => setToggleTicketView(true)}
              className="hover:cursor-pointer"
            />
          )}
        </div>

        <div
          className={`overflow-hidden transition-all duration-200 ease-in-out ${
            toggleTicketView ? "max-h-[1000px]" : "max-h-0"
          }`}
        >
          <div
            className={`${
              assistantWidth < 750 ? "grid-cols-1" : "grid-cols-2"
            } grid gap-3 p-10`}
          >
            <div className="flex justify-center items-center w-full ">
              <span className="font-bold w-[35%]">Board: </span>
              <input
                disabled
                className="dark:bg-transparent dark:border-white border-black border-b w-[65%] px-4 bg-white "
                value={currentTicket?.boardName || ""}
              />
            </div>
            <div className="flex justify-center items-center w-full ">
              <span className="font-bold w-[35%]">SLA:</span>
              <input
                disabled
                className="dark:bg-transparent dark:border-white border-black border-b w-[65%] px-4  bg-white"
                value={ticketStatus?.[currentTicket.ticketId]?.sla?.name || ""}
              />
            </div>
            <div className="flex justify-center items-center w-full">
              <span className="font-bold w-[35%]">Status:</span>

              <input
                disabled
                className="dark:bg-transparent dark:border-white border-black w-[65%] border-b flex-grow px-4 bg-white"
                value={
                  ticketStatus?.[currentTicket.ticketId]?.status?.name || ""
                }
              />
            </div>
            <div className="flex justify-center items-center w-full ">
              <span className="font-bold w-[35%]  ">Agreement:</span>
              <input
                disabled
                className="dark:bg-transparent dark:border-white border-black border-b w-[65%] px-4  bg-white"
                value={
                  ticketStatus?.[currentTicket.ticketId]?.agreement?.name || ""
                }
              />
            </div>
            <div className="flex justify-center items-center w-full">
              <span className="font-bold w-[35%]">Type:</span>

              <input
                disabled
                className="dark:bg-transparent dark:border-white border-black w-[65%] border-b flex-grow px-4  bg-white"
                value={currentTicket?.type || ""}
              />
            </div>
            <div className="flex justify-center items-center w-full ">
              <span className="font-bold w-[35%]">Predecessor:</span>
              <input
                disabled
                className="dark:bg-transparent dark:border-white border-black border-b w-[65%] px-4  bg-white"
                value={
                  ticketStatus?.[currentTicket.ticketId]?.predecessorType || ""
                }
              />
            </div>
            <div className="flex justify-center items-center w-full ">
              <span className="font-bold w-[35%]">Subtype:</span>

              <input
                disabled
                className="dark:bg-transparent dark:border-white w-[65% border-black border-b flex-grow px-4  bg-white"
                value={currentTicket?.subType || ""}
              />
            </div>
            <div className="flex justify-center items-center w-full ">
              <span className="font-bold w-[35%]">Estimated Start Date:</span>
              <input
                disabled
                className="dark:bg-transparent dark:border-white border-black border-b w-[65%] px-4  bg-white"
                value={
                  ticketStatus?.[currentTicket.ticketId]?.estimatedStartDate ||
                  ""
                }
              />
            </div>

            <div className="flex justify-center items-center w-ful ">
              <span className="font-bold w-[35%]">Item:</span>
              <input
                disabled
                className="dark:bg-transparent dark:border-white border-black border-b w-[65%] px-4  bg-white"
                value={ticketStatus?.[currentTicket.ticketId]?.item || ""}
              />
            </div>
            <div className="flex justify-center items-center w-full ">
              <span className="font-bold w-[35%]">Due Date:</span>
              <input
                disabled
                className="dark:bg-transparent dark:border-white border-black border-b w-[65%] px-4  bg-white"
                value={null || ""}
              />
            </div>

            <div className="flex justify-center items-center w-full ">
              <span className="font-bold w-[35%]">Ticket Owner:</span>
              <input
                disabled
                className="dark:bg-transparent dark:border-white border-black border-b w-[65%] px-4  bg-white"
                value={null || ""}
              />
            </div>
            <div className="flex justify-center items-center w-full ">
              <span className="font-bold w-[35%]">Duration:</span>
              <input
                disabled
                className="dark:bg-transparent dark:border-white border-black border-b w-[65%] px-4  bg-white"
                value={ticketStatus?.[currentTicket.ticketId]?.duration || ""}
              />
            </div>
            <div></div>
            <div className="flex justify-center items-center w-full ">
              <span className="font-bold w-[35%]">Impact/Urgency:</span>
              <input
                disabled
                className="dark:bg-transparent dark:border-white border-black border-b w-[65%] px-4  bg-white"
                value={ticketStatus?.[currentTicket.ticketId]?.impact || ""}
              />
            </div>
            <div></div>
            <div className="flex justify-center items-center w-full">
              <span className="font-bold w-[35%]">Priority:</span>

              <div className="relative w-[65%]">
                <div
                  className={`absolute top-1/2 transform -translate-y-1/2 left-0 w-5 h-3 rounded ${
                    currentTicket?.priority === "Priority 1 - Critical"
                      ? "bg-red-500 border border-black"
                      : currentTicket?.priority === "Priority 2 - High"
                      ? "bg-orange-500 border border-black"
                      : currentTicket?.priority === "Priority 3 - Medium"
                      ? "bg-yellow-500 border border-black"
                      : currentTicket?.priority === "Priority 4 - Low"
                      ? "bg-green-500 border border-black"
                      : "bg-white border border-black"
                  }`}
                ></div>

                <input
                  disabled
                  className="dark:bg-transparent dark:border-white border-black border-b w-full px-4 pl-6"
                  value={`${currentTicket?.priority} ` || ""}
                />
              </div>
            </div>

            <div></div>
            <div className="flex justify-center items-center w-full ">
              <span className="font-bold w-[35%]">SLA Status:</span>
              <input
                disabled
                className="dark:bg-transparent dark:border-white border-black border-b w-[65%] px-4  bg-white"
                value={ticketStatus?.[currentTicket.ticketId]?.slaStatus || ""}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Ticket;
