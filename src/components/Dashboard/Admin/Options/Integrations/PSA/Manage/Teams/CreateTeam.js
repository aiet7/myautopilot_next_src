"use client";

import useManageStore from "@/utils/store/admin/control/integrations/PSA/manageStore";
import useUserStore from "@/utils/store/user/userStore";
import { AiOutlineClose } from "react-icons/ai";

const CreateTeam = () => {
  const { user } = useUserStore();
  const {
    selectedMembersForCreation,
    teamName,
    selectedBoard,
    techniciansForBoards,
    setShowCreateTeam,
    setSelectedMembersForCreation,
    setSelectedMembersForCreationTier,
    setTeamName,
    handleCreateTeam,
  } = useManageStore();

  const availableTechnicians = techniciansForBoards || [];
  
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded shadow-lg flex flex-col p-6 w-full max-w-md h-[600px]">
        <div className="flex justify-end">
          <AiOutlineClose
            className="cursor-pointer"
            size={20}
            onClick={() => setShowCreateTeam(false)}
          />
        </div>
        <div className="flex flex-col gap-4 flex-1 overflow-hidden">
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-bold">
              Create a Team for {selectedBoard.boardName}
            </h3>
            <div className="flex items-center gap-2 w-full">
              <p className="w-1/6 min-w-[80px]">Team Name:</p>
              <input
                type="text"
                className="flex-1 border p-1"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
              />
            </div>
          </div>
          <div className="flex-1 overflow-auto scrollbar-thin">
            {availableTechnicians.length > 0 ? (
              availableTechnicians.map((technician) => {
                const { id, firstName, lastName } = technician;
                const isSelected = selectedMembersForCreation.some(
                  (t) => t.id === id
                );
                const currentTier = isSelected
                  ? selectedMembersForCreation.find((t) => t.id === id)
                      ?.tierLevel || "Tier3"
                  : "Tier3";
                return (
                  <div
                    key={id}
                    className="flex items-center justify-between py-2 border-b"
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() =>
                          setSelectedMembersForCreation(technician)
                        }
                      />
                      <span>{`${firstName} ${lastName}`}</span>
                    </div>
                    {isSelected && (
                      <div className="flex flex-col items-end">
                        <select
                          value={currentTier}
                          onChange={(e) =>
                            setSelectedMembersForCreationTier(
                              id,
                              e.target.value
                            )
                          }
                          className="border p-1"
                        >
                          <option value="Tier1">Tier1</option>
                          <option value="Tier2">Tier2</option>
                          <option value="Tier3">Tier3</option>
                        </select>
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <p>No available technicians to add.</p>
            )}
          </div>
          <button
            className="mt-4 px-4 py-2 bg-blue-800 text-white rounded self-end"
            onClick={() => handleCreateTeam(user?.mspCustomDomain)}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTeam;
