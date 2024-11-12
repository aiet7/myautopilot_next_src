"use client";

import useMspStore from "@/utils/store/auth/msp/mspStore";
import useTicketsStore from "@/utils/store/interaction/tickets/ticketsStore";

const Notes = () => {
  const { userType } = useMspStore();
  const {
    ticketNote,
    currentNotes,
    currentTicket,
    activeNoteCategory,
    setActiveNoteCategory,
    setTicketNote,
    handleAddTicketNote,
  } = useTicketsStore();

  const filteredNotes = currentNotes?.filter((notes) => {
    if (userType === "tech") {
      if (activeNoteCategory === "Description" && notes.detailDescriptionFlag)
        return true;
      if (activeNoteCategory === "Internal" && notes.internalAnalysisFlag)
        return true;
      if (activeNoteCategory === "Resolution" && notes.resolutionFlag)
        return true;
    } else {
      if (activeNoteCategory === "Description" && notes.detailDescriptionFlag)
        return true;
    }
    return false;
  });

  return (
    <div className="flex flex-col gap-2">
      {userType === "tech" && (
        <div className="flex gap-2 text-sm ">
          <button
            className={` ${
              activeNoteCategory === "Description"
                ? "bg-blue-500"
                : "bg-[#465E89]"
            } border transition ease-in hover:bg-[#FFFFFF] hover:text-[#465E89] rounded-md  bg-[#465E89] text-white border-white/30  px-6 py-2  w-full `}
            onClick={() => setActiveNoteCategory("Description")}
          >
            Description
          </button>

          <button
            className={`${
              activeNoteCategory === "Internal" ? "bg-blue-500" : "bg-[#465E89]"
            } border transition ease-in hover:bg-[#FFFFFF] hover:text-[#465E89] rounded-md  bg-[#465E89] text-white border-white/30  px-6 py-2  w-full`}
            onClick={() => setActiveNoteCategory("Internal")}
          >
            Internal
          </button>
          <button
            className={` ${
              activeNoteCategory === "Resolution"
                ? "bg-blue-500"
                : "bg-[#465E89]"
            } border transition ease-in hover:bg-[#FFFFFF] hover:text-[#465E89] rounded-md  bg-[#465E89] text-white border-white/30  px-6 py-2  w-full `}
            onClick={() => setActiveNoteCategory("Resolution")}
          >
            Resolution
          </button>
        </div>
      )}
      <div className="flex flex-col gap-2">
        <textarea
          value={ticketNote || ""}
          className="w-full p-2 scrollbar-thin min-h-[100px] max-h-[200px] rounded"
          placeholder="Add Note..."
          onChange={(e) => setTicketNote(e.target.value)}
        />
        <button
          onClick={() => handleAddTicketNote(currentTicket?.ticketId)}
          className="border transition ease-in hover:bg-[#FFFFFF] hover:text-[#465E89] rounded-md  bg-[#465E89] text-white border-white/30  px-6 py-2  "
        >
          Submit
        </button>
      </div>
      <div className="max-h-[500px] overflow-auto scrollbar-thin">
        {filteredNotes?.map((notes) => {
          const { id, dateCreated, text, ticketId } = notes;
          return (
            <div key={id}>
              <p>{text}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Notes;
