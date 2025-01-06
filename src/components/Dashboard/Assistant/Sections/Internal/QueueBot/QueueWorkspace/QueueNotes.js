// "use client";

// import useMspStore from "@/utils/store/auth/msp/mspStore";
// import useQueueStore from "@/utils/store/interaction/queue/queueStore";

// const QueueNotes = () => {
//   const { userType } = useMspStore();
//   const {
//     ticketNote,
//     myQueueNotes,
//     myQueueTicket,
//     activeNoteCategory,
//     setTicketNote,
//     setActiveNoteCategory,
//     handleAddQueueTicketNote,
//   } = useQueueStore();

//   const filteredNotes = myQueueNotes?.filter((notes) => {
//     if (userType === "tech") {
//       if (activeNoteCategory === "Description" && notes.detailDescriptionFlag)
//         return true;
//       if (activeNoteCategory === "Internal" && notes.internalAnalysisFlag)
//         return true;
//       if (activeNoteCategory === "Resolution" && notes.resolutionFlag)
//         return true;
//     } else {
//       if (activeNoteCategory === "Description" && notes.detailDescriptionFlag)
//         return true;
//     }
//   });

//   return (
//     <div className="flex flex-col gap-2 ">
//       {userType === "tech" && (
//         <div className="flex gap-2 text-sm ">
//           <button
//             className={` ${
//               activeNoteCategory === "Description"
//                 ? "bg-blue-500"
//                 : "bg-[#465E89]"
//             } border transition ease-in hover:bg-[#FFFFFF] hover:text-[#465E89] rounded-md  bg-[#465E89] text-white border-white/30  px-6 py-2  w-full `}
//             onClick={() => setActiveNoteCategory("Description")}
//           >
//             Description
//           </button>
//           <button
//             className={`${
//               activeNoteCategory === "Internal" ? "bg-blue-500" : "bg-[#465E89]"
//             } border transition ease-in hover:bg-[#FFFFFF] hover:text-[#465E89] rounded-md  bg-[#465E89] text-white border-white/30  px-6 py-2  w-full`}
//             onClick={() => setActiveNoteCategory("Internal")}
//           >
//             Internal
//           </button>
//           <button
//             className={` ${
//               activeNoteCategory === "Resolution"
//                 ? "bg-blue-500"
//                 : "bg-[#465E89]"
//             } border transition ease-in hover:bg-[#FFFFFF] hover:text-[#465E89] rounded-md  bg-[#465E89] text-white border-white/30  px-6 py-2  w-full `}
//             onClick={() => setActiveNoteCategory("Resolution")}
//           >
//             Resolution
//           </button>
//         </div>
//       )}
//       <div className="flex flex-col gap-2">
//         <textarea
//           value={ticketNote || ""}
//           className="w-full p-2 scrollbar-thin min-h-[100px] max-h-[200px] rounded"
//           placeholder="Add Note..."
//           onChange={(e) => setTicketNote(e.target.value)}
//         />
//         <button
//           onClick={() => handleAddQueueTicketNote(myQueueTicket?.ticketId)}
//           className="border transition ease-in hover:bg-[#FFFFFF] hover:text-[#465E89] rounded-md  bg-[#465E89] text-white border-white/30  px-6 py-2  "
//         >
//           Submit
//         </button>
//       </div>
//       <div className="max-h-[500px] overflow-auto scrollbar-thin">
//         {filteredNotes?.map((notes) => {
//           const { id, dateCreated, text, ticketId } = notes;
//           return (
//             <div key={id}>
//               <p>{text}</p>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default QueueNotes;

"use client";

import useMspStore from "@/utils/store/auth/msp/mspStore";
import useQueueStore from "@/utils/store/interaction/queue/queueStore";

const QueueNotes = () => {
  const { userType } = useMspStore();
  const {
    ticketNote,
    myQueueNotes,
    myQueueTicket,
    activeNoteCategory,
    setTicketNote,
    setActiveNoteCategory,
    handleAddQueueTicketNote,
  } = useQueueStore();

  const filteredNotes = myQueueNotes?.filter((notes) => {
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
  });

  return (
    <div className="flex flex-col gap-2 border-2 p-10 shadow-md dark:bg-black bg-white">
      {userType === "tech" && (
        <div className="flex gap-2 text-sm w-full">
          <div className="w-[33%]">
            <button
              className={` ${
                activeNoteCategory === "Description"
                  ? "bg-blue-500"
                  : "bg-[#465E89]"
              } border transition ease-in hover:bg-[#FFFFFF] hover:text-[#465E89] rounded-md  bg-[#465E89] text-white border-white/30  p-3 w-full `}
              onClick={() => setActiveNoteCategory("Description")}
            >
              Description
            </button>
          </div>
          <div className="w-[33%]">
            <button
              className={`${
                activeNoteCategory === "Internal"
                  ? "bg-blue-500"
                  : "bg-[#465E89]"
              } border transition ease-in hover:bg-[#FFFFFF] hover:text-[#465E89] rounded-md  bg-[#465E89] text-white border-white/30  p-3  w-full`}
              onClick={() => setActiveNoteCategory("Internal")}
            >
              Internal
            </button>
          </div>
          <div className="w-[33%]">
            <button
              className={` ${
                activeNoteCategory === "Resolution"
                  ? "bg-blue-500"
                  : "bg-[#465E89]"
              } border transition ease-in hover:bg-[#FFFFFF] hover:text-[#465E89] rounded-md  bg-[#465E89] text-white border-white/30  p-3  w-full `}
              onClick={() => setActiveNoteCategory("Resolution")}
            >
              Resolution
            </button>
          </div>
        </div>
      )}
      <div className="flex flex-col gap-2">
        <textarea
          value={ticketNote || ""}
          className="w-full border-2 p-2 scrollbar-thin min-h-[100px] max-h-[200px] rounded"
          placeholder="Add Note..."
          onChange={(e) => setTicketNote(e.target.value)}
        />
        <button
          onClick={() => handleAddQueueTicketNote(myQueueTicket?.ticketId)}
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

export default QueueNotes;
