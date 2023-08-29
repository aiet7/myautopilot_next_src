"use client";
import useRefStore from "@/utils/store/assistant/ref/refStore";
import MarkedAssistant from "../../Marked/MarkedAssistant";

import useAgentsStore from "@/utils/store/agents/agentsStore";
import useNotesStore from "@/utils/store/assistant/sections/notes/notesStore";
import useConversationStore from "@/utils/store/interaction/conversations/conversationsStore";
import { useEffect } from "react";
import { AiOutlinePlus, AiOutlineDelete, AiOutlineClose } from "react-icons/ai";
import { MdOutlineArrowDropUp, MdOutlineArrowDropDown } from "react-icons/md";

const Notes = () => {
  const { selectedAgent } = useAgentsStore();
  const { initializeNotes } = useNotesStore();
  const { currentConversationIndices } = useConversationStore();
  const {
    notes,
    showNoteIndex,
    noteHeading,
    noteContent,
    tempHeading,
    tempContent,
    editing,
    editingNoteId,
    setShowNoteIndex,
    setEditing,
    setNoteHeading,
    setNoteContent,
    setTempHeading,
    setTempContent,
    handleEditNote,
    handleAddNote,
    handleDeleteNote,
    handleSaveNote,
  } = useNotesStore();
  const { textAreaRef } = useRefStore();

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  }, [editing]);

  useEffect(() => {
    initializeNotes();
  }, [selectedAgent, currentConversationIndices]);

  return (
    <div className="flex-grow flex flex-col gap-4 overflow-hidden">
      <h3 className="text-left text-lg">Notes</h3>

      <div className="flex flex-col gap-1 w-full">
        <input
          value={noteHeading}
          onChange={(e) => setNoteHeading(e.target.value)}
          className="px-2 py-1"
          placeholder="Title"
        />
        <textarea
          value={noteContent}
          onChange={(e) => setNoteContent(e.target.value)}
          className="px-2 py-1 scrollbar-thin min-h-[100px] max-h-[200px]"
          placeholder="Note"
        />
        <button
          onClick={() => handleAddNote(noteContent)}
          className="flex items-center justify-center gap-1 bg-blue-800 py-2 text-white font-bold"
        >
          <AiOutlinePlus size={25} />
          Add Note
        </button>
      </div>

      <div className="flex-grow overflow-y-auto scrollbar-thin">
        <div className="flex flex-grow flex-col gap-4">
          {notes.map((note, index) => {
            const { id, noteHeading, noteContent, timeStamp } = note;
            return (
              <div
                key={index}
                className="dark:bg-white/30 dark:text-white dark:border-white/20 flex flex-col justify-between gap-3 border rounded-md text-black bg-white p-2"
              >
                {editingNoteId === id && editing ? (
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between">
                      <input
                        value={tempHeading}
                        onChange={(e) => setTempHeading(e.target.value)}
                        className="p-2 w-44"
                        placeholder={noteHeading || tempHeading === "" && "Title"}
                      />
                      <AiOutlineClose
                        size={20}
                        className="cursor-pointer"
                        onClick={() => setEditing(false)}
                      />
                    </div>

                    <textarea
                      ref={textAreaRef}
                      value={tempContent}
                      onChange={(e) => setTempContent(e.target.value)}
                      className="p-2 block w-full scrollbar-thin "
                    />
                    <button
                      onClick={() => handleSaveNote(id)}
                      className="bg-blue-800 text-white"
                    >
                      Save Note
                    </button>
                  </div>
                ) : (
                  <div
                    onClick={() => handleEditNote(id, note)}
                    className="flex flex-col gap-2 cursor-pointer"
                  >
                    <div className="flex justify-between">
                      <p className="break-words whitespace-pre-wrap font-bold">
                        {noteHeading ? noteHeading : `Note ${index + 1}`}
                      </p>
                      <AiOutlineDelete
                        size={20}
                        className="cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteNote(id);
                        }}
                      />
                    </div>
                    {showNoteIndex === index && (
                      <MarkedAssistant markdown={noteContent} />
                    )}
                    <p>{new Date(timeStamp).toLocaleString()}</p>
                    {showNoteIndex === index ? (
                      <MdOutlineArrowDropUp
                        size={30}
                        className="self-center cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowNoteIndex(null);
                        }}
                      />
                    ) : (
                      <MdOutlineArrowDropDown
                        size={30}
                        className="self-center cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowNoteIndex(index);
                        }}
                      />
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Notes;
