"use client";

import useQueueStore from "@/utils/store/interaction/queue/queueStore";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import useAssistantStore from "@/utils/store/assistant/assistantStore";

import useUiStore from "@/utils/store/ui/uiStore";
import { useEffect } from "react";

const ViewQueueCompany = () => {
  const { currentQueueTicket } = useQueueStore();
  const { assistantWidth } = useAssistantStore();
  const { toggleCompanyView, setToggleCompanyView } = useUiStore();

  console.log(currentQueueTicket);
  useEffect(() => {
    return () => {
      setToggleCompanyView(true);
    };
  }, [setToggleCompanyView]);

  return (
    <div className="relative border-2 shadow-md bg-white dark:bg-black">
      <div className="flex justify-between items-center px-10 py-3">
        <h1 className="font-bold text-[#465E89]">
          Company: {currentQueueTicket?.company}
        </h1>
        {toggleCompanyView ? (
          <IoIosArrowUp
            size="20"
            onClick={() => setToggleCompanyView(false)}
            className="hover:cursor-pointer"
          />
        ) : (
          <IoIosArrowDown
            size="20"
            onClick={() => setToggleCompanyView(true)}
            className="hover:cursor-pointer"
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
              value={currentQueueTicket?.company || ""}
            />
          </div>
          <div className="flex justify-center items-center w-full ">
            <span className="font-bold w-[35%] sm:pb-0 ">Site:</span>
            <input
              disabled
              className="dark:bg-transparent dark:border-white border-black border-b w-[65%] px-4 bg-white"
              value={currentQueueTicket?.site?.name || ""}
            />
          </div>
          <div className="flex justify-center items-center w-full">
            <span className="font-bold w-[35%]">Contact:</span>
            <div className="flex items-center w-[65%]">
              <input
                disabled
                className="dark:bg-transparent dark:border-white border-black border-b flex-grow px-4 bg-white"
                value={currentQueueTicket?.name || ""}
              />
            </div>
          </div>
          <div className="flex justify-center items-center w-full ">
            <span className="font-bold w-[35%]">Address 1:</span>
            <input
              disabled
              className="dark:bg-transparent dark:border-white border-black border-b w-[65%] px-4  bg-white"
              value={currentQueueTicket?.addressLine1 || ""}
            />
          </div>
          <div className="flex justify-center items-center w-full">
            <span className="font-bold w-[35%]">Phone:</span>
            <div className="flex items-center w-[65%]">
              <input
                disabled
                className="dark:bg-transparent dark:border-white border-black border-b flex-grow px-4 bg-white"
                value={currentQueueTicket?.phoneNumber || ""}
              />
            </div>
          </div>
          <div className="flex justify-center items-center w-full ">
            <span className="font-bold w-[35%]">Address 2:</span>
            <input
              disabled
              className="dark:bg-transparent dark:border-white border-black border-b w-[65%] px-4  bg-white"
              value={currentQueueTicket?.addressLine2 || ""}
            />
          </div>
          <div className="flex justify-center items-center w-full ">
            <span className="font-bold w-[35%]">Email:</span>
            <div className="flex items-center w-[65%]">
              <input
                disabled
                className="dark:bg-transparent dark:border-white border-black border-b flex-grow px-4  bg-white"
                value={currentQueueTicket?.emailId || ""}
              />
            </div>
          </div>
          <div className="flex justify-center items-center w-full ">
            <span className="font-bold w-[35%]">City:</span>
            <input
              disabled
              className="dark:bg-transparent dark:border-white border-black border-b w-[65%] px-4  bg-white"
              value={currentQueueTicket?.city || ""}
            />
          </div>
          <div></div>
          <div className="flex justify-center items-center w-ful ">
            <span className="font-bold w-[35%]">State:</span>
            <input
              disabled
              className="dark:bg-transparent dark:border-white border-black border-b w-[65%] px-4  bg-white"
              value={currentQueueTicket?.stateIdentifier || ""}
            />
          </div>
          <div></div>
          <div className="flex justify-center items-center w-full ">
            <span className="font-bold w-[35%]">Zip:</span>
            <input
              disabled
              className="dark:bg-transparent dark:border-white border-black border-b w-[65%] px-4  bg-white"
              value={currentQueueTicket?.zip || ""}
            />
          </div>
          <div></div>
          <div className="flex justify-center items-center w-full ">
            <span className="font-bold w-[35%]">Country:</span>
            <input
              disabled
              className="dark:bg-transparent dark:border-white border-black border-b w-[65%] px-4  bg-white"
              value={currentQueueTicket?.country?.name || ""}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default ViewQueueCompany;