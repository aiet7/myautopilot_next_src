"use client";
import useTicketsStore from "@/utils/store/interaction/tickets/ticketsStore";
import { BsStars } from "react-icons/bs";

const Support = () => {
  const { showTicket, ticketNotes, handleTicketMode } = useTicketsStore();


  return (
    <div className="flex-grow mx-auto">
      <div className="flex flex-col py-4 gap-6">
        <button
          onClick={() => handleTicketMode("Default", null)}
          className="dark:border-white hover:bg-blue-800 hover:text-white flex items-center justify-center border border-black px-12 py-2 rounded-lg font-bold "
        >
          <BsStars size={15} />
          <span>Create Ticket</span>
        </button>
        {showTicket && (
          <div className="text-lg lg:text-2xl">
            <h2>
              <strong>{showTicket?.closed ? "Closed" : "New"}</strong>
            </h2>
            <p>
              <strong>Ticket ID: </strong>
              {showTicket?.ticketId}
            </p>
            <p>
              <strong>Title: </strong>
              {showTicket?.title}
            </p>
            <p>
              <strong>Category: </strong>
              {showTicket?.category}
            </p>
            <p>
              <strong>Subcategory: </strong>
              {showTicket?.subcategory}
            </p>
            <p>
              <strong>Description: </strong>
              {showTicket?.description}
            </p>
            <p>
              <strong>Date Created: </strong>
              {new Date(showTicket?.timeStamp).toLocaleString()}
            </p>
          </div>
        )}
      </div>
      <div className="flex flex-col py-4">
        <h2 className="font-bold">Ticket Notes</h2>
      </div>
    </div>
  );
};

export default Support;
