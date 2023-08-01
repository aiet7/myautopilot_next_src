"use client";

import { RiTeamLine } from "react-icons/ri";
import { useState } from "react";

const TeamMeetingHistory = ({
  teamsHistories,
  currentTeamsIndex,
  openTeamsHistory,
  setTeamsHistories,
  handleTeamRoomSelected,
  handleCreateNewRoom,
  handleSaveRoom,
}) => {
  const handleRoomConfig = (field, value) => {
    setTeamsHistories((prevState) => {
      const newHistories = [...prevState];
      newHistories[currentTeamsIndex][field] = value;
      return newHistories;
    });
  };
  
  return (
    <div
      className={`px-4 py-6 bg-[#f6f8fc] absolute z-10 top-0 bottom-0 transition-all duration-300 ease-in-out transform flex flex-col ${
        openTeamsHistory
          ? "translate-x-0 w-[300px] dark:shadow-white shadow-lg shadow-black/50"
          : "-translate-x-full w-[300px]"
      } dark:bg-[#111111] dark:xl:border-white/20 xl:relative xl:translate-x-0 xl:min-w-[300px] xl:static xl:border-r`}
    >
      <button
        onClick={handleCreateNewRoom}
        className="w-full p-4 bg-blue-800 text-white"
      >
        + New Room
      </button>
      <div className="h-[200px] overflow-y-auto h-full scrollbar-thin lg:h-full">
        {teamsHistories?.map((team, index) => {
         
          const { roomName, roomIndustry, roomUserInput } = team;
          return (
            <div
              onClick={() => handleTeamRoomSelected(index)}
              key={index}
              className="flex flex-col items-start my-2"
            >
              <div
                className={`${
                  currentTeamsIndex === index && "dark:bg-white/40 bg-black/20"
                } dark:text-white dark:hover:bg-white/40 hover:bg-black/20 text-black w-full flex items-center justify-between px-2 h-[50px] cursor-pointer`}
              >
                <div className="flex items-center">
                  <div className="w-8">
                    <RiTeamLine size={20} />
                  </div>
                  <div className="w-40 truncate flex">
                    <span className="px-1">{roomName}</span>
                  </div>
                </div>
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

export default TeamMeetingHistory;
