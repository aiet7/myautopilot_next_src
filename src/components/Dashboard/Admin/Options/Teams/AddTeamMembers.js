"use client";

import { useEffect } from "react";
import useTeamsStore from "@/utils/store/admin/control/teams/teamsStore";
import useUserStore from "@/utils/store/user/userStore";
import { AiOutlineClose } from "react-icons/ai";

const AddTeamMembers = () => {
  const { user } = useUserStore();
  const {
    selectedTechnicians,

    activeTechnicians,
    currentEditingTeam,
    setAdding,
    setTechnicianSelection,
    setCurrentEditingTeam,
    handleAddMembers,
    handleGetAllMember,
  } = useTeamsStore();

  useEffect(() => {
    handleGetAllMember(user.mspCustomDomain);
  }, [user]);

  const teamMembers = currentEditingTeam?.members || [];

  const filteredTechnicians = activeTechnicians.filter(
    (technician) =>
      !teamMembers.some((member) => member.email === technician.email)
  );

  console.log(selectedTechnicians);
  return (
    <div className="dark:bg-black/80 absolute bg-black/60 z-[99] top-0 bottom-0 right-0 left-0 p-2 lg:p-10">
      <div className="flex flex-col  items-end bg-white max-w-[700px] h-full p-4 rounded-lg text-black mx-auto">
        <AiOutlineClose
          onClick={() => {
            setAdding(false);
            setCurrentEditingTeam(null);
          }}
          size={20}
          className="cursor-pointer"
        />
        <div className="flex flex-col gap-4 w-full h-full overflow-hidden">
          <div className="flex flex-col items-center justify-center font-semibold">
            <div className="flex flex-col items-center gap-8 w-full ">
              <div className="flex flex-col items-center gap-1">
                <h2 className="text-4xl font-bold">Add Team Members</h2>
              </div>
              <div className="overflow-y-auto max-h-[650px] scrollbar-thin w-full">
                <table className="min-w-full  table-fixed border-separate border-spacing-0 text-left">
                  <thead className="dark:text-white dark:bg-gray-700 sticky top-0  text-black/60 bg-[#F5F8FA]">
                    <tr>
                      <th className="p-2 border-l border-t border-b"></th>

                      <th className="p-2 border-l border-t border-b border-r">
                        First Name
                      </th>
                      <th className="p-2 border-t border-b border-r">
                        Last Name
                      </th>
                      <th className="p-2 border-t border-b border-r">Email</th>
                      <th className="p-2 border-t border-b border-r">Tier</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTechnicians.length > 0 ? (
                      filteredTechnicians.map((member, index) => {
                        const {
                          connectWiseTechnicanId,
                          firstName,
                          lastName,
                          email,
                          tierLevel,
                        } = member;
                        return (
                          <tr key={connectWiseTechnicanId}>
                            <td className="px-2 text-center border-l  border-b">
                              <input
                                type="checkbox"
                                checked={selectedTechnicians.some(
                                  (t) => t.email === member.email
                                )}
                                onChange={() => setTechnicianSelection(member)}
                              />
                            </td>
                            <td className="p-2 truncate border-l  border-r border-b">
                              {firstName}
                            </td>
                            <td className="p-2 truncate border-r border-b">
                              {lastName}
                            </td>
                            <td className="p-2 truncate border-r border-b">
                              {email}
                            </td>
                            <td className="p-2 truncate border-r border-b">
                              {tierLevel}
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center py-4">
                          No available technicians to add.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="flex items-end gap-4 justify-end h-full w-full ">
            <button
              onClick={() => {
                handleAddMembers();
              }}
              className="border transition ease-in hover:bg-[#FFFFFF] hover:text-[#465E89]   bg-[#465E89] text-white rounded-lg py-2 px-20 font-bold"
            >
              Add Selected Members
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTeamMembers;
