"use client";
import useTicketsStore from "@/utils/store/interaction/tickets/ticketsStore";
import { BsStars } from "react-icons/bs";
import { convertTicketText, convertDate } from "@/utils/conversions";

const Support = () => {
  const { showTicket, ticketNotes, handleTicketMode } = useTicketsStore();

  return (
    <div className="flex flex-col w-full flex-grow p-4 overflow-hidden">
      <div className="flex flex-col gap-6 overflow-hidden">
        <button
          onClick={() => handleTicketMode("Default", null)}
          className="dark:border-white hover:bg-blue-800 hover:text-white  flex items-center justify-center border border-black px-12 py-2 rounded-lg font-bold "
        >
          <BsStars size={15} />
          <span>Create Ticket</span>
        </button>
        {showTicket && (
          <div className="text-lg lg:text-2xl">
            <h2>
              <strong>Status:</strong> {showTicket?.closed ? "Closed" : "New"}
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
        <div className="border-b" />
        <div className="flex flex-col  overflow-hidden">
          <h2 className="font-bold text-xl">Ticket Notes</h2>
          {ticketNotes.length !== 0 ? (
            <div className="flex flex-col gap-4 py-4 overflow-y-auto scrollbar-thin">
              {ticketNotes?.map((note) => {
                const { id, text, dateCreated } = note;
                return (
                  <div
                    key={id}
                    className={`${
                      text.startsWith("Technician: ")
                        ? "dark:bg-white/20 bg-blue-50"
                        : "dark:bg-white/50 bg-red-50"
                    } rounded-lg shadow-md p-3`}
                  >
                    <p className="font-bold text-lg">
                      {text.startsWith("Technician: ")
                        ? "Technician"
                        : "Client"}
                    </p>
                    <p>{convertTicketText(text)}</p>
                    <p className="text-xs">{convertDate(dateCreated)}</p>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="dark:text-white/30 text-black/20 py-1 italic">
              No Ticket Notes Available
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Support;
