"use client";

import useQueueStore from "@/utils/store/interaction/queue/queueStore";

const ViewQueueTicket = () => {
  const { currentQueueTicket } = useQueueStore();
  return (
    <>
      <div>
        <span className="font-bold">Ticket ID</span>
        <input
          disabled
          className="dark:bg-black h-[50px] border outline-blue-500 w-full px-4 bg-white"
          value={currentQueueTicket?.ticketId || ""}
        />
      </div>
      <div>
        <span className="font-bold">Description</span>
        <textarea
          disabled
          value={currentQueueTicket?.description || ""}
          maxLength={100}
          className="dark:bg-black max-h-[200px] min-h-[100px] border outline-blue-500 w-full px-4 bg-white"
        />
      </div>
      <div className="flex gap-4">
        <div className="w-full">
          <span className="font-bold">Type</span>

          <input
            disabled
            className="dark:bg-black h-[50px] border outline-blue-500 w-full px-4 bg-white"
            value={currentQueueTicket?.categoryName || ""}
          />
        </div>
        <div className="w-full">
          <span className="font-bold">Subtype</span>
          <input
            disabled
            className="dark:bg-black h-[50px] border outline-blue-500 w-full px-4 bg-white"
            value={currentQueueTicket?.subCategoryName || ""}
          />
        </div>
      </div>
      <div className="flex gap-4">
        <div className="w-full">
          <span className="font-bold">Priority</span>

          <input
            disabled
            className="dark:bg-black h-[50px] border outline-blue-500 w-full px-4 bg-white"
            value={currentQueueTicket?.priority || ""}
          />
        </div>
        <div className="w-full">
          <span className="font-bold">Impact</span>

          <input
            disabled
            className="dark:bg-black h-[50px] border outline-blue-500 w-full px-4 bg-white"
            value={currentQueueTicket?.impact || ""}
          />
        </div>
        <div className="w-full">
          <span className="font-bold">Severity</span>

          <input
            disabled
            className="dark:bg-black h-[50px] border outline-blue-500 w-full px-4 bg-white"
            value={currentQueueTicket?.severity || ""}
          />
        </div>
      </div>
      <div>
        <span className="font-bold">Tier</span>

        <input
          disabled
          className="dark:bg-black h-[50px] border outline-blue-500 w-full px-4 bg-white"
          value={currentQueueTicket?.tier || ""}
        />
      </div>
      <div>
        <span className="font-bold">Status</span>

        <input
          disabled
          className="dark:bg-black h-[50px] border outline-blue-500 w-full px-4 bg-white"
          value={currentQueueTicket?.status || ""}
        />
      </div>
      <div className="flex gap-4">
        <div className="w-full">
          <span className="font-bold">Name</span>
          <input
            disabled
            className="dark:bg-black h-[50px] border outline-blue-500 w-full px-4 bg-white"
            value={currentQueueTicket?.name || ""}
          />
        </div>
        <div className="w-full">
          <span className="font-bold">Phone</span>
          <input
            disabled
            className="dark:bg-black h-[50px] border outline-blue-500 w-full px-4 bg-white"
            value={currentQueueTicket?.phoneNumber || ""}
          />
        </div>
      </div>
      <div className="flex gap-4">
        <div className="w-full">
          <span className="font-bold">Email</span>
          <input
            disabled
            className="dark:bg-black h-[50px] border outline-blue-500 w-full px-4 bg-white"
            value={currentQueueTicket?.email || ""}
          />
        </div>
        <div className="w-full">
          <span className="font-bold">Company</span>
          <input
            disabled
            className="dark:bg-black h-[50px] border outline-blue-500 w-full px-4 bg-white"
            value={currentQueueTicket?.company || ""}
          />
        </div>
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
    </>
  );
};

export default ViewQueueTicket;
