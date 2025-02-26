"use client";

import useManageStore from "@/utils/store/admin/control/integrations/PSA/manageStore";
import { AiOutlineClose } from "react-icons/ai";

const AddMembers = () => {
  const {
    selectedMembersForAdd,
    selectedTeam,
    techniciansForBoards,
    setShowMemberSelect,
    setSelectedMembersForAdd,
    setSelectedMemberForAddTier,
    handleAddTeamMembers,
  } = useManageStore();

  const availableTechnicians =
    selectedTeam && techniciansForBoards
      ? techniciansForBoards.filter(
          (tech) =>
            !selectedTeam.members.some(
              (member) =>
                String(member.psaMemberId) === String(tech.psaMemberId)
            )
        )
      : [];
  
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded shadow-lg flex flex-col p-6 w-full max-w-md h-[600px]">
        <div className="flex justify-end">
          <AiOutlineClose
            className="cursor-pointer"
            size={20}
            onClick={() => setShowMemberSelect(false)}
          />
        </div>
        <h3 className="text-xl font-bold mb-4">
          Add Members to {selectedTeam.teamName}
        </h3>
        <div className="flex-1 overflow-auto scrollbar-thin">
          {availableTechnicians.length > 0 ? (
            availableTechnicians.map((tech) => {
              const isSelected = selectedMembersForAdd.some(
                (t) => t.id === tech.id
              );
              const currentTier = isSelected
                ? selectedMembersForAdd.find((t) => t.id === tech.id)
                    ?.tierLevel || "Tier3"
                : "Tier3";
              return (
                <div
                  key={tech.id}
                  className="flex items-center justify-between py-2 border-b"
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => setSelectedMembersForAdd(tech)}
                    />
                    <span>
                      {tech.firstName} {tech.lastName}
                    </span>
                  </div>
                  {isSelected && (
                    <select
                      value={currentTier}
                      onChange={(e) =>
                        setSelectedMemberForAddTier(tech.id, e.target.value)
                      }
                      className="border p-1"
                    >
                      <option value="Tier1">Tier1</option>
                      <option value="Tier2">Tier2</option>
                      <option value="Tier3">Tier3</option>
                    </select>
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
          onClick={handleAddTeamMembers}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default AddMembers;
