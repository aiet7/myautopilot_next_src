"use client";

import useTicketsStore from "@/utils/store/interaction/tickets/ticketsStore";

const Ticket = () => {
  const { currentTicket, ticketStatus } = useTicketsStore();
  
  return (
    <div className="flex flex-col gap-2 ">
      <div>
        <span className="font-bold">Ticket ID</span>
        <input
          disabled
          className="dark:bg-black h-[30px] border outline-blue-500 w-full px-4 bg-white"
          value={currentTicket?.ticketId || ""}
        />
      </div>
      <div>
        <span className="font-bold">Company</span>
        <input
          disabled
          className="dark:bg-black h-[30px] border outline-blue-500 w-full px-4 bg-white"
          value={currentTicket?.company || ""}
        />
      </div>
      <div>
        <span className="font-bold">Board</span>
        <input
          disabled
          className="dark:bg-black h-[30px] border outline-blue-500 w-full px-4 bg-white"
          value={currentTicket?.boardName || ""}
        />
      </div>
      <div>
        <span className="font-bold">Ticket Name</span>
        <input
          disabled
          className="dark:bg-black h-[30px] border outline-blue-500 w-full px-4 bg-white"
          value={currentTicket?.title || ""}
        />
      </div>
      <div>
        <span className="font-bold">Description</span>
        <textarea
          disabled
          value={currentTicket?.description || ""}
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
            value={currentTicket?.type || currentTicket?.category || ""}
          />
        </div>
        <div className="w-full">
          <span className="font-bold">Subtype</span>
          <input
            disabled
            className="dark:bg-black h-[30px] border outline-blue-500 w-full px-4 bg-white"
            value={currentTicket?.subType || currentTicket?.subcategory || ""}
          />
        </div>
      </div>
      <div className="flex gap-4">
        <div className="w-full">
          <span className="font-bold">Priority</span>

          <input
            disabled
            className="dark:bg-black h-[30px] border outline-blue-500 w-full px-4 bg-white"
            value={currentTicket?.priority || ""}
          />
        </div>
      </div>

      <div>
        <span className="font-bold">Status</span>

        <input
          disabled
          className="dark:bg-black h-[30px] border outline-blue-500 w-full px-4 bg-white"
          value={ticketStatus?.[currentTicket.ticketId]?.status.name || ""}
        />
      </div>

      <div className="w-full">
        <span className="font-bold">Name</span>
        <input
          disabled
          className="dark:bg-black h-[30px] border outline-blue-500 w-full px-4 bg-white"
          value={currentTicket?.name || ""}
        />
      </div>
      <div className="w-full">
        <span className="font-bold">Email</span>
        <input
          disabled
          className="dark:bg-black h-[30px] border outline-blue-500 w-full px-4 bg-white"
          value={currentTicket?.emailId || ""}
        />
      </div>
      <div className="w-full">
        <span className="font-bold">Phone Number</span>
        <input
          disabled
          className="dark:bg-black h-[30px] border outline-blue-500 w-full px-4 bg-white"
          value={currentTicket?.phoneNumber || ""}
        />
      </div>

      <div>
        <span className="font-bold">Date Created</span>
        <p>
          {new Date(currentTicket?.creationTime).toLocaleDateString() +
            " " +
            new Date(currentTicket?.creationTime).toLocaleTimeString() || ""}
        </p>
      </div>
    </div>
  );
};

export default Ticket;
