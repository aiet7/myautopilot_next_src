"use client";

import useQueueStore from "@/utils/store/interaction/queue/queueStore";

const ViewQueueTicket = () => {
  const { currentQueueTicket } = useQueueStore();

  return (
    <div className="flex flex-col gap-2 ">
      <div>
        <span className="font-bold">Ticket ID</span>
        <input
          disabled
          className="dark:bg-black h-[30px] border outline-blue-500 w-full px-4 bg-white"
          value={currentQueueTicket?.ticketId || ""}
        />
      </div>
      <div>
        <span className="font-bold">Company</span>
        <input
          disabled
          className="dark:bg-black h-[30px] border outline-blue-500 w-full px-4 bg-white"
          value={currentQueueTicket?.company || ""}
        />
      </div>
      <div>
        <span className="font-bold">Board</span>
        <input
          disabled
          className="dark:bg-black h-[30px] border outline-blue-500 w-full px-4 bg-white"
          value={currentQueueTicket?.boardName || ""}
        />
      </div>
      <div>
        <span className="font-bold">Ticket Name</span>
        <input
          disabled
          className="dark:bg-black h-[30px] border outline-blue-500 w-full px-4 bg-white"
          value={currentQueueTicket?.title || ""}
        />
      </div>
      <div>
        <span className="font-bold">Description</span>
        <textarea
          disabled
          value={
            currentQueueTicket?.description ||
            currentQueueTicket?.ticketInformation ||
            ""
          }
          maxLength={100}
          className="dark:bg-black max-h-[130px] min-h-[70px] border outline-blue-500 w-full px-4 bg-white"
        />
      </div>
      <div className="flex gap-4">
        <div className="w-full">
          <span className="font-bold">Type</span>

          <input
            disabled
            className="dark:bg-black h-[30px] border outline-blue-500 w-full px-4 bg-white"
            value={currentQueueTicket?.categoryName || ""}
          />
        </div>
        <div className="w-full">
          <span className="font-bold">Subtype</span>
          <input
            disabled
            className="dark:bg-black h-[30px] border outline-blue-500 w-full px-4 bg-white"
            value={currentQueueTicket?.subCategoryName || ""}
          />
        </div>
      </div>
      <div className="flex gap-4">
        <div className="w-full">
          <span className="font-bold">Priority</span>

          <input
            disabled
            className="dark:bg-black h-[30px] border outline-blue-500 w-full px-4 bg-white"
            value={currentQueueTicket?.priority || ""}
          />
        </div>
        <div className="w-full">
          <span className="font-bold">Impact</span>

          <input
            disabled
            className="dark:bg-black h-[30px] border outline-blue-500 w-full px-4 bg-white"
            value={currentQueueTicket?.impact || ""}
          />
        </div>
        <div className="w-full">
          <span className="font-bold">Severity</span>

          <input
            disabled
            className="dark:bg-black h-[30px] border outline-blue-500 w-full px-4 bg-white"
            value={currentQueueTicket?.severity || ""}
          />
        </div>
        <div className="w-full">
          <span className="font-bold">Tier</span>

          <input
            disabled
            className="dark:bg-black h-[30px] border outline-blue-500 w-full px-4 bg-white"
            value={currentQueueTicket?.tier || ""}
          />
        </div>
      </div>

      <div className="flex gap-4">
        <div className="w-full">
          <span className="font-bold">Impact Score</span>

          <input
            disabled
            className="dark:bg-black h-[30px] border outline-blue-500 w-full px-4 bg-white"
            value={currentQueueTicket?.impactScore || ""}
          />
        </div>
        <div className="w-full">
          <span className="font-bold">Severity Score</span>
          <input
            disabled
            className="dark:bg-black h-[30px] border outline-blue-500 w-full px-4 bg-white"
            value={currentQueueTicket?.severityScore || ""}
          />
        </div>
      </div>
      <div>
        <span className="font-bold">Status</span>

        <input
          disabled
          className="dark:bg-black h-[30px] border outline-blue-500 w-full px-4 bg-white"
          value={currentQueueTicket?.status || ""}
        />
      </div>

      <div>
        <span className="font-bold">Name</span>
        <input
          disabled
          className="dark:bg-black h-[30px] border outline-blue-500 w-full px-4 bg-white"
          value={currentQueueTicket?.name || ""}
        />
      </div>
      <div>
        <span className="font-bold">Email</span>
        <input
          disabled
          className="dark:bg-black h-[30px] border outline-blue-500 w-full px-4 bg-white"
          value={currentQueueTicket?.emailId || ""}
        />
      </div>
      <div>
        <span className="font-bold">Phone Number</span>
        <input
          disabled
          className="dark:bg-black h-[30px] border outline-blue-500 w-full px-4 bg-white"
          value={currentQueueTicket?.phoneNumber || ""}
        />
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
};

export default ViewQueueTicket;
