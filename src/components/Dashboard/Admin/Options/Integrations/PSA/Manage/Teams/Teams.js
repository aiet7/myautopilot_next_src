"use client";

import useManageStore from "@/utils/store/admin/control/integrations/PSA/manageStore";
import useUserStore from "@/utils/store/user/userStore";
import { useEffect } from "react";
import AddMembers from "./AddMembers";
import CreateTeam from "./CreateTeam";
import { AiFillDelete } from "react-icons/ai";
import { FaSpinner } from "react-icons/fa";

const Teams = () => {
  const { user } = useUserStore();

  const {
    loadingTechniciansAndBoards,
    teams,
    teamBoards,
    selectedBoard,
    showMemberSelect,
    showCreateTeam,
    setSelectedBoard,
    setSelectedTeam,
    setShowCreateTeam,
    setActiveConfigStep,
    handleDeleteTeamMember,
    initializeManageTeams,
  } = useManageStore();

  useEffect(() => {
    initializeManageTeams();
  }, [user]);

  const filteredTeams = selectedBoard
    ? teams.filter((team) => team.boardId === selectedBoard.boardId)
    : [];

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex flex-col overflow-hidden">
        {loadingTechniciansAndBoards ? (
          <div className="flex items-center gap-2 ">
            <p className="font-bold">Loading your Teams</p>
            <FaSpinner className="animate-spin" size={20} />
          </div>
        ) : (
          <div className="flex flex-col text-lg">
            <p className="font-bold ">Your Current Teams</p>
            <p className="text-xs">
              Select the teams you want to integrate and press next.
            </p>
          </div>
        )}
        <div className="flex h-full py-2 ">
          <div className="w-1/2 border-r overflow-auto scrollbar-thin">
            {teamBoards &&
            teamBoards.connectWiseConfig &&
            teamBoards.connectWiseConfig.boardDetails ? (
              teamBoards.connectWiseConfig.boardDetails.map((board) => {
                const { boardId, boardName } = board;
                return (
                  <div
                    key={boardId}
                    className={`${
                      selectedBoard?.boardId === boardId
                        ? "bg-gray-200"
                        : "hover:bg-gray-100"
                    } p-2 cursor-pointer`}
                    onClick={() => setSelectedBoard(board)}
                  >
                    {boardName}
                  </div>
                );
              })
            ) : (
              <p>No boards found</p>
            )}
          </div>
          <div className="w-1/2 overflow-auto scrollbar-thin px-4 pb-10">
            {selectedBoard ? (
              <div>
                <h2 className="font-bold text-2xl pb-4">
                  Teams For {selectedBoard.boardName}
                </h2>
                {filteredTeams.length > 0 ? (
                  filteredTeams.map((team) => {
                    const { id, teamName } = team;
                    return (
                      <div key={id}>
                        <div className="flex items-center justify-between">
                          <h3 className="font-bold">{teamName}</h3>
                          <button
                            onClick={() => setSelectedTeam(team)}
                            className="px-2 py-1 bg-blue-800 text-white rounded"
                          >
                            Add Member
                          </button>
                        </div>
                        <div className="flex flex-col gap-4 py-3">
                          {team.members && team.members.length > 0 ? (
                            team.members.map((member) => {
                              const {
                                psaMemberId,
                                firstName,
                                lastName,
                                tierLevel,
                                email,
                              } = member;
                              return (
                                <div
                                  key={psaMemberId}
                                  className="flex justify-between  p-2 shadow-md"
                                >
                                  <div>
                                    <p className="text-lg">
                                      {firstName + " " + lastName}
                                    </p>
                                    <p>{email}</p>{" "}
                                    <p className="text-lg">{tierLevel}</p>
                                  </div>

                                  <AiFillDelete
                                    className="cursor-pointer"
                                    size={18}
                                    onClick={() =>
                                      handleDeleteTeamMember(id, member)
                                    }
                                  />
                                </div>
                              );
                            })
                          ) : (
                            <p>No members</p>
                          )}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="flex justify-between items-center">
                    <p>No teams for this board</p>
                    <button
                      className="px-2 py-1 bg-blue-500 text-white rounded"
                      onClick={() => setShowCreateTeam(true)}
                    >
                      Create Team
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <p>Please select a board from the left</p>
            )}
          </div>
          {showMemberSelect && selectedBoard && <AddMembers />}
          {showCreateTeam && selectedBoard && <CreateTeam />}
        </div>
      </div>

      <button
        onClick={() => setActiveConfigStep(4)}
        className="self-end bg-blue-800 text-white font-bold px-5 rounded py-2"
      >
        Save Teams
      </button>
    </div>
  );
};

export default Teams;
