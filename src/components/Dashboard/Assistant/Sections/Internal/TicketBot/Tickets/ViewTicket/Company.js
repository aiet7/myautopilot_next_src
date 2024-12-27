"use client";

import useTicketsStore from "@/utils/store/interaction/tickets/ticketsStore";
import { IoMdContact } from "react-icons/io";
import { BsFillTelephoneFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import useUiStore from "@/utils/store/ui/uiStore";
import useAssistantStore from "@/utils/store/assistant/assistantStore";
import { useEffect } from "react";

const Company = () => {
  const { currentTicket, ticketStatus } = useTicketsStore();
  const { toggleCompanyView, setToggleCompanyView } = useUiStore();
  const { assistantWidth } = useAssistantStore();

  useEffect(() => {
    return () => {
      setToggleCompanyView(true);
    };
  }, [setToggleCompanyView]);

  return (
    <>
      <div className="relative border-2 shadow-md bg-white dark:bg-black">
        <div className="flex justify-between items-center px-10 py-3">
          <h1 className="font-bold text-[#465E89]">
            Company: {currentTicket?.company}
          </h1>
          {toggleCompanyView ? (
            <IoIosArrowUp
              size="20"
              onClick={() => setToggleCompanyView(false)}
            />
          ) : (
            <IoIosArrowDown
              size="20"
              onClick={() => setToggleCompanyView(true)}
            />
          )}
        </div>

        <div
          className={`overflow-hidden transition-all duration-200 ease-in-out ${
            toggleCompanyView ? "max-h-[1000px]" : "max-h-0"
          }`}
        >
          <div
            className={`${
              assistantWidth < 750 ? "grid-cols-1" : "grid-cols-2"
            } grid gap-3 p-10 transition duration-300 ease-in-out`}
          >
            <div className="flex justify-center items-center w-full ">
              <span className="font-bold w-[35%]">Company: </span>
              <input
                disabled
                className="dark:bg-transparent dark:border-white border-black border-b w-[65%] px-4 bg-white "
                value={currentTicket?.company || ""}
              />
            </div>
            <div className="flex justify-center items-center w-full ">
              <span className="font-bold w-[35%] sm:pb-0 ">Site:</span>
              <input
                disabled
                className="dark:bg-transparent dark:border-white border-black border-b w-[65%] px-4 bg-white"
                value={ticketStatus?.[currentTicket.ticketId]?.site?.name || ""}
              />
            </div>
            <div className="flex justify-center items-center w-full">
              <span className="font-bold w-[35%]">Contact:</span>
              <div className="flex items-center w-[65%]">
                <input
                  disabled
                  className="dark:bg-transparent dark:border-white border-black border-b flex-grow px-4 bg-white"
                  value={currentTicket?.name || ""}
                />
                <div className=" flex justify-center items-center ml-3">
                  <IoMdContact size="20" />
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center w-full ">
              <span className="font-bold w-[35%]">Address 1:</span>
              <input
                disabled
                className="dark:bg-transparent dark:border-white border-black border-b w-[65%] px-4  bg-white"
                value={
                  ticketStatus?.[currentTicket.ticketId]?.addressLine1 || ""
                }
              />
            </div>
            <div className="flex justify-center items-center w-full">
              <span className="font-bold w-[35%]">Ticket:</span>
              <div className="flex items-center w-[65%]">
                <input
                  disabled
                  className="dark:bg-transparent dark:border-white border-black border-b flex-grow px-4 bg-white"
                  value={currentTicket?.phoneNumber || ""}
                />
                <div className=" flex justify-center items-center ml-3">
                  <BsFillTelephoneFill size="15" />
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center w-full ">
              <span className="font-bold w-[35%]">Address 2:</span>
              <input
                disabled
                className="dark:bg-transparent dark:border-white border-black border-b w-[65%] px-4  bg-white"
                value={
                  ticketStatus?.[currentTicket.ticketId]?.addressLine2 || ""
                }
              />
            </div>
            <div className="flex justify-center items-center w-full ">
              <span className="font-bold w-[35%]">Email:</span>
              <div className="flex items-center w-[65%]">
                <input
                  disabled
                  className="dark:bg-transparent dark:border-white border-black border-b flex-grow px-4  bg-white"
                  value={currentTicket?.emailId || ""}
                />
                <div className=" flex justify-center items-center ml-3">
                  <MdEmail size="20" />
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center w-full ">
              <span className="font-bold w-[35%]">City:</span>
              <input
                disabled
                className="dark:bg-transparent dark:border-white border-black border-b w-[65%] px-4  bg-white"
                value={ticketStatus?.[currentTicket.ticketId]?.city || ""}
              />
            </div>
            <div></div>
            <div className="flex justify-center items-center w-ful ">
              <span className="font-bold w-[35%]">State:</span>
              <input
                disabled
                className="dark:bg-transparent dark:border-white border-black border-b w-[65%] px-4  bg-white"
                value={
                  ticketStatus?.[currentTicket.ticketId]?.stateIdentifier || ""
                }
              />
            </div>
            <div></div>
            <div className="flex justify-center items-center w-full ">
              <span className="font-bold w-[35%]">Zip:</span>
              <input
                disabled
                className="dark:bg-transparent dark:border-white border-black border-b w-[65%] px-4  bg-white"
                value={ticketStatus?.[currentTicket.ticketId]?.zip || ""}
              />
            </div>
            <div></div>
            <div className="flex justify-center items-center w-full ">
              <span className="font-bold w-[35%]">Country:</span>
              <input
                disabled
                className="dark:bg-transparent dark:border-white border-black border-b w-[65%] px-4  bg-white"
                value={
                  ticketStatus?.[currentTicket.ticketId]?.country.name || ""
                }
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Company;
