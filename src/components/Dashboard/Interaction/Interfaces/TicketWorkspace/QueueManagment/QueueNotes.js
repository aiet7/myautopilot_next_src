"use client";

import useQueueStore from "@/utils/store/interaction/queue/queueStore";

const QueueNotes = () => {
  const {
    myQueueNotes,
    activeNoteCategory,
    setActiveNoteCategory,
  } = useQueueStore();

  const filteredNotes = myQueueNotes?.filter((notes) => {
    if (activeNoteCategory === "Description" && notes.detailDescriptionFlag)
      return true;
    if (activeNoteCategory === "Internal" && notes.internalAnalysisFlag)
      return true;
    if (activeNoteCategory === "Resolution" && notes.resolutionFlag)
      return true;
    return false;
  });

  return (
    <div className="w-full ">
      <div className="flex gap-2 text-sm py-4">
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
      <div className="flex flex-col gap-2">
        {filteredNotes?.map((notes) => {
          const {
            id,
            dateCreated,

            text,
            ticketId,
          } = notes;
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

export default QueueNotes;
