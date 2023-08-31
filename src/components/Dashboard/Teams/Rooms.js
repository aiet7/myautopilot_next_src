"use client";

import {
  AiFillDelete,
  AiFillEdit,
  AiOutlineCheck,
  AiOutlineClose,
} from "react-icons/ai";
import { RiTeamLine } from "react-icons/ri";
import { useEffect } from "react";
import useTeamsStore from "@/utils/store/teams/teamsStore";
import useUiStore from "@/utils/store/ui/uiStore";

const Rooms = ({}) => {
  const { hoverTab, openRooms } = useUiStore();
  const {
    editing,
    deleting,
    setEditing,
    setDeleting,
    teamsHistories,
    currentTeamsIndex,
    handleCreateNewRoom,
    handleSaveRoom,
    handleDeleteTeamRoom,
    handleTeamRoomSelected,
    handleEditRoomTitle,
    handleCancelEditRoomTitle,
    handleSaveRoomTitle,
    handleRoomConfig,
  } = useTeamsStore();

  useEffect(() => {
    setEditing(false);
  }, [currentTeamsIndex]);

  return (
    <div
      className={`absolute z-10 top-0 bottom-0 left-0 ${
        hoverTab === "teams" &&
        "bubble-teams h-full shadow-lg shadow-blue-500 min-w-[350px]"
      } ${
        openRooms ? "translate-x-0 w-[350px]" : "-translate-x-full w-[350px]"
      }  dark:bg-[#111111] bg-[#f6f8fc] p-4 flex flex-col transition-all duration-300 ease-in-out transform `}
    >
      <button
        onClick={handleCreateNewRoom}
        className="w-full p-4 bg-blue-800 text-white"
      >
        + New Room
      </button>
      <div className="overflow-y-auto h-full scrollbar-thin">
        {teamsHistories?.map((team, index) => {
          const { id, userID, roomName, roomIndustry, roomUserInput } = team;

          return (
            <div key={index} className="flex flex-col items-start my-2">
              <div
                onClick={() => handleTeamRoomSelected(index)}
                className={`${
                  currentTeamsIndex === index && "dark:bg-white/40 bg-black/20"
                } dark:text-white dark:hover:bg-white/40 hover:bg-black/20 text-black w-full flex items-center justify-between px-2 h-[50px] cursor-pointer`}
              >
                <div className="flex items-center">
                  <div className="w-8">
                    <RiTeamLine size={20} />
                  </div>
                  <div className="w-40 truncate flex">
                    {currentTeamsIndex === index &&
                    ((!roomIndustry && !roomUserInput) || editing) ? (
                      <input
                        onClick={(e) => e.stopPropagation()}
                        value={teamsHistories[currentTeamsIndex]?.roomName}
                        className="bg-white text-black truncate flex px-1"
                        onChange={(e) =>
                          handleRoomConfig("roomName", e.target.value)
                        }
                      />
                    ) : (
                      <span className="px-1">{roomName}</span>
                    )}
                  </div>
                </div>
                {roomIndustry && roomUserInput && (
                  <div className="w-12">
                    {editing && currentTeamsIndex === index && (
                      <div className="flex items-center gap-2">
                        <AiOutlineCheck
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSaveRoomTitle(id, userID);
                          }}
                          size={20}
                        />
                        <AiOutlineClose
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCancelEditRoomTitle();
                          }}
                          size={20}
                        />
                      </div>
                    )}
                    {deleting && currentTeamsIndex === index && (
                      <div className="flex items-center gap-2">
                        <AiOutlineCheck
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteTeamRoom(id);
                            setDeleting(false);
                          }}
                          size={20}
                        />
                        <AiOutlineClose
                          size={20}
                          onClick={(e) => {
                            e.stopPropagation();
                            setDeleting(false);
                          }}
                        />
                      </div>
                    )}

                    {currentTeamsIndex === index && !editing && !deleting && (
                      <div className="flex items-center gap-2">
                        <AiFillEdit
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditRoomTitle(index);
                          }}
                          size={20}
                        />
                        <AiFillDelete
                          onClick={(e) => {
                            e.stopPropagation();
                            setDeleting(true);
                          }}
                          size={20}
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
              {currentTeamsIndex === index && (
                <div className="dark:bg-white/10 bg-black/10 w-full rounded-br-md rounded-bl-md">
                  {!roomIndustry && !roomUserInput ? (
                    <div>
                      <input
                        placeholder="What is your industry..."
                        className="bg-transparent w-full p-2"
                        value={
                          teamsHistories[currentTeamsIndex]?.industry || ""
                        }
                        onChange={(e) =>
                          handleRoomConfig("industry", e.target.value)
                        }
                      />
                      <textarea
                        placeholder="What is your goal..."
                        className="bg-transparent  w-full p-2 min-h-[50px] max-h-[150px] scrollbar-thin"
                        value={teamsHistories[currentTeamsIndex]?.goal || ""}
                        onChange={(e) =>
                          handleRoomConfig("goal", e.target.value)
                        }
                      />

                      <button
                        onClick={handleSaveRoom}
                        className="dark:bg-black text-center w-full border border-blue-800 bg-white font-bold p-2"
                      >
                        Submit
                      </button>
                    </div>
                  ) : (
                    <div>
                      <div className="flex flex-col items-start p-2 gap-2">
                        <span className="font-bold">Industry</span>
                        <p>{teamsHistories[currentTeamsIndex]?.roomIndustry}</p>
                      </div>
                      <div className="flex flex-col items-start p-2 gap-2">
                        <span className="font-bold">Goal</span>
                        <p>
                          {teamsHistories[currentTeamsIndex]?.roomUserInput}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Rooms;
