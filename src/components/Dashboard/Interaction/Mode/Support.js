"use client";
import useTicketsStore from "@/utils/store/interaction/tickets/ticketsStore";
import { BsStars } from "react-icons/bs";

const Support = () => {
  const { showTicket, handleTicketMode } = useTicketsStore();

  return (
    <div className="flex flex-col items-center p-4 text-md h-full max-w-[900px] mx-auto justify-between">
      <button
        onClick={() => handleTicketMode("Default", null)}
        className="dark:border-white hover:bg-blue-800 hover:text-white flex items-center justify-center border border-black px-12 py-2 rounded-lg font-bold mb-4"
      >
        <BsStars size={15} />
        <span>Create Ticket</span>
      </button>
      <div className="flex  justify-center items-center flex-grow gap-2 w-[600px] shadow-xl rounded-lg">
        {showTicket && (
          <div className="flex flex-col items-center justify-center items-center w-full">
            <div className="flex justify-between items-center w-full">
              <h2 className="text-xl font-semibold">{showTicket.title}</h2>
              <span className="font-semibold">
                {showTicket.closed ? "Closed" : "New"}
              </span>
            </div>

            <div className="w-full">
              <p>
                <strong>Ticket ID:</strong> {showTicket.ticketId}
              </p>
              
              <p>
                <strong>Category:</strong> {showTicket.category}
              </p>
              <p>
                <strong>Subcategory:</strong> {showTicket.subcategory}
              </p>
              <p>
                <strong>Summary:</strong> {showTicket.summary}
              </p>
              <p>
                <strong>Description:</strong> {showTicket.description}
              </p>
              <p>
                <strong>Timestamp:</strong>{" "}
                {new Date(showTicket.timeStamp).toLocaleString()}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Support;
