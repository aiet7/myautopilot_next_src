"use client";

import useQueueStore from "@/utils/store/interaction/queue/queueStore";

const ViewQueueNotes = () => {
  const {
    ticketNote,
    currentQueueTicket,
    currentQueueNotes,
    activeNoteCategory,
    setActiveNoteCategory,
    setTicketNote,
    handleAddQueueTicketNote,
  } = useQueueStore();


  const filteredNotes = currentQueueNotes?.filter((notes) => {
    if (activeNoteCategory === "Description" && notes.detailDescriptionFlag)
      return true;
    if (activeNoteCategory === "Internal" && notes.internalAnalysisFlag)
      return true;
    if (activeNoteCategory === "Resolution" && notes.resolutionFlag)
      return true;
    return false;
  });
  return (
    <>
      <div className="flex gap-2 text-sm ">
        <button
          className={`hover:bg-blue-500 ${
            activeNoteCategory === "Description" ? "bg-blue-500" : "bg-blue-800"
          } text-white py-1 px-3 rounded `}
          onClick={() => setActiveNoteCategory("Description")}
        >
          Description
        </button>
        <button
          className={`hover:bg-blue-500 ${
            activeNoteCategory === "Internal" ? "bg-blue-500" : "bg-blue-800"
          } text-white py-1 px-3 rounded `}
          onClick={() => setActiveNoteCategory("Internal")}
        >
          Internal
        </button>
        <button
          className={`hover:bg-blue-500 ${
            activeNoteCategory === "Resolution" ? "bg-blue-500" : "bg-blue-800"
          } text-white py-1 px-3 rounded `}
          onClick={() => setActiveNoteCategory("Resolution")}
        >
          Resolution
        </button>
      </div>
      <div>
        <textarea
          value={ticketNote || ""}
          className="w-full p-2 scrollbar-thin min-h-[100px] max-h-[200px] rounded"
          placeholder="Add Note..."
          onChange={(e) => setTicketNote(e.target.value)}
        />
        <button
          onClick={() => handleAddQueueTicketNote(currentQueueTicket?.ticketId)}
          className="text-white py-1 px-3 rounded bg-blue-800"
        >
          Submit
        </button>
      </div>
      <div className="flex flex-col gap-2 ">
        {filteredNotes?.map((notes) => {
          const { id, dateCreated, text, ticketId } = notes;
          return (
            <div key={id}>
              <p>{text}</p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ViewQueueNotes;
