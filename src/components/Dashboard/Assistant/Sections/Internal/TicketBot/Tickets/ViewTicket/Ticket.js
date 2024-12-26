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
          <h1 className="font-bold text-blue-600">
            Ticket # {currentTicket?.ticketId}
          </h1>
          {toggleTicketView ? (
            <IoIosArrowUp
              size="20"
              onClick={() => setToggleTicketView(false)}
            />
          ) : (
            <IoIosArrowDown
              size="20"
              onClick={() => setToggleTicketView(true)}
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
            <div className="flex justify-center items-center w-full ">
              <span className="font-bold w-[35%]">Priority:</span>
              <input
                disabled
                className="dark:bg-transparent dark:border-white border-black border-b w-[65%] px-4  bg-white"
                value={currentTicket?.priority || ""}
              />
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
