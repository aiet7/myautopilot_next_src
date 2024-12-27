"use client";

import useQueueStore from "@/utils/store/interaction/queue/queueStore";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { useEffect } from "react";
import useUiStore from "@/utils/store/ui/uiStore";
import useAssistantStore from "@/utils/store/assistant/assistantStore";

const ViewQueueTicket = () => {
  const { currentQueueTicket } = useQueueStore();

  const { toggleTicketView, setToggleTicketView } = useUiStore();
  const { assistantWidth } = useAssistantStore();

  useEffect(() => {
    return () => {
      setToggleTicketView(true);
    };
  }, [setToggleTicketView]);

  return (
    <div className="relative border-2 shadow-md bg-white dark:bg-black">
      <div className="flex justify-between items-center px-10 py-3">
        <h1 className="font-bold text-[#465E89]">
          Ticket # {currentQueueTicket?.ticketId}
        </h1>
        {toggleTicketView ? (
          <IoIosArrowUp size="20" onClick={() => setToggleTicketView(false)} />
        ) : (
          <IoIosArrowDown size="20" onClick={() => setToggleTicketView(true)} />
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
              value={currentQueueTicket?.boardName || ""}
            />
          </div>
          <div className="flex justify-center items-center w-full ">
            <span className="font-bold w-[35%]">SLA:</span>
            <input
              disabled
              className="dark:bg-transparent dark:border-white border-black border-b w-[65%] px-4  bg-white"
              value={currentQueueTicket.ticketId?.sla?.name || ""}
            />
          </div>
          <div className="flex justify-center items-center w-full">
            <span className="font-bold w-[35%]">Status:</span>

            <input
              disabled
              className="dark:bg-transparent dark:border-white border-black w-[65%] border-b flex-grow px-4 bg-white"
              value={currentQueueTicket.ticketId?.status?.name || ""}
            />
          </div>
          <div className="flex justify-center items-center w-full ">
            <span className="font-bold w-[35%]  ">Agreement:</span>
            <input
              disabled
              className="dark:bg-transparent dark:border-white border-black border-b w-[65%] px-4  bg-white"
              value={currentQueueTicket.ticketId?.agreement?.name || ""}
            />
          </div>
          <div className="flex justify-center items-center w-full">
            <span className="font-bold w-[35%]">Type:</span>

            <input
              disabled
              className="dark:bg-transparent dark:border-white border-black w-[65%] border-b flex-grow px-4  bg-white"
              value={currentQueueTicket?.type || ""}
            />
          </div>
          <div className="flex justify-center items-center w-full ">
            <span className="font-bold w-[35%]">Predecessor:</span>
            <input
              disabled
              className="dark:bg-transparent dark:border-white border-black border-b w-[65%] px-4  bg-white"
              value={currentQueueTicket.ticketId?.predecessorType || ""}
            />
          </div>
          <div className="flex justify-center items-center w-full ">
            <span className="font-bold w-[35%]">Subtype:</span>

            <input
              disabled
              className="dark:bg-transparent dark:border-white w-[65% border-black border-b flex-grow px-4  bg-white"
              value={currentQueueTicket?.subType || ""}
            />
          </div>
          <div className="flex justify-center items-center w-full ">
            <span className="font-bold w-[35%]">Estimated Start Date:</span>
            <input
              disabled
              className="dark:bg-transparent dark:border-white border-black border-b w-[65%] px-4  bg-white"
              value={currentQueueTicket.ticketId?.estimatedStartDate || ""}
            />
          </div>

          <div className="flex justify-center items-center w-ful ">
            <span className="font-bold w-[35%]">Item:</span>
            <input
              disabled
              className="dark:bg-transparent dark:border-white border-black border-b w-[65%] px-4  bg-white"
              value={currentQueueTicket.ticketId?.item || ""}
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
              value={currentQueueTicket.ticketId?.duration || ""}
            />
          </div>
          <div></div>
          <div className="flex justify-center items-center w-full ">
            <span className="font-bold w-[35%]">Impact/Urgency:</span>
            <input
              disabled
              className="dark:bg-transparent dark:border-white border-black border-b w-[65%] px-4  bg-white"
              value={currentQueueTicket.ticketId?.impact || ""}
            />
          </div>
          <div></div>
          <div className="flex justify-center items-center w-full ">
            <span className="font-bold w-[35%]">Priority:</span>
            <input
              disabled
              className="dark:bg-transparent dark:border-white border-black border-b w-[65%] px-4  bg-white"
              value={currentQueueTicket?.priority || ""}
            />
          </div>
          <div></div>
          <div className="flex justify-center items-center w-full ">
            <span className="font-bold w-[35%]">SLA Status:</span>
            <input
              disabled
              className="dark:bg-transparent dark:border-white border-black border-b w-[65%] px-4  bg-white"
              value={currentQueueTicket?.ticketId?.slaStatus || ""}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default ViewQueueTicket;

/*
return (
    <div className="flex flex-col sm:gap-2 border-2 shadow-md p-10">
      <div className="sm:flex sm:w-full">
        <div className="w-full sm:w-[50%] flex mr-3">
          <span className="font-bold w-[25%] sm:pb-0 py-2">Ticket ID:</span>
          <input
            disabled
            className="dark:bg-transparent dark:border-white border-black border-b w-[75%] px-4 bg-white "
            value={currentQueueTicket?.ticketId || ""}
          />
        </div>
        <div className="flex sm:w-[50%]">
          <span className="font-bold w-[25%] sm:pb-0 py-2">Company:</span>
          <input
            disabled
            className="dark:bg-transparent dark:border-white border-black border-b w-[75%] px-4 bg-white"
            value={currentQueueTicket?.company || ""}
          />
        </div>
      </div>
      <div className="sm:w-full sm:flex">
        <div className="w-full sm:w-[50%] flex mr-3">
          <span className="font-bold w-[25%] sm:pb-0 py-2">Board:</span>
          <input
            disabled
            className="dark:bg-transparent dark:border-white border-black border-b w-[75%] px-4  bg-white"
            value={currentQueueTicket?.boardName || ""}
          />
        </div>
        <div className="sm:w-[50%] flex">
          <span className="font-bold w-[25%] sm:pb-0 py-2">Ticket Name:</span>
          <input
            disabled
            className="dark:bg-transparent dark:border-white border-black border-b w-[75%] px-4  bg-white"
            value={currentQueueTicket?.title || ""}
          />
        </div>
      </div>

      <span className="font-bold sm:pb-0 py-2">Description:</span>
      <textarea
        disabled
        value={
          currentQueueTicket?.description ||
          currentQueueTicket?.ticketInformation ||
          ""
        }
        maxLength={100}
        className="dark:text-black bg-white max-h-[150px] min-h-[100px] px-3  border-2 focus:outline-none focus:ring-0"
      />

      <div className="sm:flex sm:w-full">
        <div className="sm:w-[50%] mr-3 flex w-full">
          <span className="font-bold w-[25%] sm:pb-0 py-2">Type:</span>

          <input
            disabled
            className="dark:bg-transparent dark:border-white border-black border-b w-[75%] px-4 bg-white"
            value={currentQueueTicket?.categoryName || ""}
          />
        </div>
        <div className="sm:w-[50%] flex ">
          <span className="font-bold w-[25%] sm:pb-0 py-2">Subtype:</span>
          <input
            disabled
            className="dark:bg-transparent dark:border-white border-black border-b w-[75%] px-4 bg-white"
            value={currentQueueTicket?.subCategoryName || ""}
          />
        </div>
      </div>

      <div className="sm:flex sm:w-full">
        <div className="w-full sm:w-[50%] flex mr-3">
          <span className="font-bold w-[25%] sm:pb-0 py-2">Priority:</span>

          <input
            disabled
            className="dark:bg-transparent dark:border-white border-black border-b w-[75%] px-4 bg-white"
            value={currentQueueTicket?.priority || ""}
          />
        </div>
        <div className="sm:w-[50%] flex">
          <span className="font-bold w-[25%] sm:pb-0 py-2">Impact:</span>

          <input
            disabled
            className="dark:bg-transparent dark:border-white border-black border-b w-[75%] px-4 bg-white"
            value={currentQueueTicket?.impact || ""}
          />
        </div>
      </div>
      <div className="sm:flex sm:w-full">
        <div className="w-full sm:w-[50%] flex mr-3">
          <span className="font-bold w-[25%] sm:pb-0 py-2">Severity:</span>

          <input
            disabled
            className="dark:bg-transparent dark:border-white border-black border-b w-[75%] px-4 bg-white"
            value={currentQueueTicket?.severity || ""}
          />
        </div>
        <div className="sm:w-[50%] flex">
          <span className="font-bold w-[25%] sm:pb-0 py-2">Tier:</span>

          <input
            disabled
            className="dark:bg-transparent dark:border-white border-black border-b w-[75%] px-4 bg-white"
            value={currentQueueTicket?.tier || ""}
          />
        </div>
      </div>

      <div className="sm:flex sm:w-full">
        <div className=" w-full sm:w-[50%] flex mr-3">
          <span className="font-bold w-[25%] sm:pb-0 py-2">Impact Score: </span>

          <input
            disabled
            className="dark:bg-transparent dark:border-white border-black border-b w-[75%] px-4 bg-white"
            value={currentQueueTicket?.impactScore || ""}
          />
        </div>
        <div className="sm:w-[50%] flex">
          <span className="font-bold w-[25%] sm:pb-0 py-2">
            Severity Score:
          </span>
          <input
            disabled
            className="dark:bg-transparent dark:border-white border-black border-b w-[75%] px-4 bg-white"
            value={currentQueueTicket?.severityScore || ""}
          />
        </div>
      </div>
      <div className="w-full sm:flex">
        <div className="w-full sm:w-[50%] flex mr-3">
          <span className="font-bold w-[25%] sm:pb-0 py-2">Status:</span>

          <input
            disabled
            className="dark:bg-transparent dark:border-white border-black border-b w-[75%] px-4 bg-white"
            value={currentQueueTicket?.status || ""}
          />
        </div>
        <div className="w-[50%]"></div>
      </div>

      <div className="w-full sm:flex">
        <div className="w-full sm:w-[50%] flex mr-3">
          <span className="font-bold w-[25%] sm:pb-0 py-2">Name:</span>
          <input
            disabled
            className="dark:bg-transparent dark:border-white border-black border-b w-[75%] px-4 bg-white"
            value={currentQueueTicket?.name || ""}
          />
        </div>

        <div className="sm:w-[50%] flex">
          <span className="font-bold w-[25%] sm:pb-0 py-2">Email:</span>
          <input
            disabled
            className="dark:bg-transparent dark:border-white border-black border-b w-[75%] px-4 bg-white"
            value={currentQueueTicket?.emailId || ""}
          />
        </div>
      </div>
      <div className="sm:flex w-full">
        <div className="w-full flex sm:w-[50%] mr-3">
          <span className="font-bold w-[25%] sm:pb-0 py-2">Phone Number:</span>
          <input
            disabled
            className="dark:bg-transparent dark:border-white border-black border-b w-[75%] px-4 bg-white"
            value={currentQueueTicket?.phoneNumber || ""}
          />
        </div>
        <div className="w-[50%]"></div>
      </div>

      <div>
        <span className="font-bold">Date Created</span>
        <p>
          {new Date(currentQueueTicket?.creationTime).toLocaleDateString() +
            " " +
            new Date(currentQueueTicket?.creationTime).toLocaleTimeString() ||
            ""}
        </p>
      </div>
    </div>
  );

*/
