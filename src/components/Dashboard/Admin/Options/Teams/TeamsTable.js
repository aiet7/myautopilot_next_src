"use client";
import useTeamsStore from "@/utils/store/admin/control/teams/teamsStore";
import Confirmation from "./Confirmation";

const TeamsTable = () => {
  const {
    deleteMenu,
    teams,
    searchValue,
    selectedTeam,
    setEditing,
    setCurrentMember,
    setTeamId,
    setCurrentEditingTeam,
    setAdding,
    setDeleteMenu,
  } = useTeamsStore();

  const filteredTeams = (selectedTeam || teams)
    ?.map((team) => ({
      ...team,
      members: team.members?.filter((member) => {
        const query = searchValue.toLowerCase();
        return (
          member.firstName?.toLowerCase().includes(query) ||
          member.lastName?.toLowerCase().includes(query) ||
          member.email?.toLowerCase().includes(query) ||
          member.tierLevel?.toString().toLowerCase().includes(query)
        );
      }),
    }))
    .filter((team) => team.members.length > 0);

  const highlightText = (text, query) => {
    if (!query) return text;

    const parts = text.split(new RegExp(`(${query})`, "gi"));
    return parts.map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span key={index} className="bg-yellow-300">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div>
      {deleteMenu && <Confirmation />}
      {filteredTeams?.length > 0 ? (
        filteredTeams?.map((team) => (
          <div key={team.id}>
            <div className="flex flex-col  pt-[40px] pb-2">
              <h1 className="font-bold">
                Board Name:{" "}
                <span className="font-normal">{team.boardName}</span>
              </h1>
              <h1 className="font-bold">
                Team Name: <span className="font-normal">{team.teamName}</span>
              </h1>
              <button
                onClick={() => {
                  setAdding(true);
                  setTeamId(team.id);
                  setCurrentEditingTeam(team);
                }}
                className="hover:text-white hover:bg-blue-800 font-bold text-blue-800 w-40 border border-solid rounded border-blue-600"
              >
                Add Member
              </button>
            </div>
            <table className="min-w-full table-fixed border-separate border-spacing-0 text-left">
              <thead className="dark:text-white dark:bg-gray-700 text-black/60 bg-[#F5F8FA]">
                <tr>
                  <th className="p-2 border-t border-b  border-l"></th>
                  <th className="p-2 border-t border-b  border-l">
                    First Name
                  </th>
                  <th className="p-2 border-t border-b  border-l">Last Name</th>
                  <th className="p-2 border-t border-b  border-l">Email</th>
                  <th className="p-2 border-t border-b border-r border-l">
                    Tier Level
                  </th>
                </tr>
              </thead>
              <tbody>
                {team.members.map((member) => (
                  <tr key={member.connectWiseTechnicanId}>
                    <td className="p-2 border-l border-b">
                      <div className="flex gap-3 w-44 xl:w-8">
                        <span
                          onClick={() => {
                            setEditing(true);
                            setTeamId(team.id);
                            setCurrentEditingTeam(team);
                            setCurrentMember(member);
                          }}
                          className="hover:underline hover:cursor-pointer text-blue-500"
                        >
                          Edit
                        </span>
                        <span
                          className="hover:underline hover:cursor-pointer text-red-500"
                          onClick={() => {
                            setTeamId(team.id);
                            setCurrentEditingTeam(team);
                            setCurrentMember(member);
                            setDeleteMenu(true);
                          }}
                        >
                          Delete
                        </span>
                      </div>
                    </td>
                    <td className="p-2 border-l border-b">
                      {highlightText(member.firstName, searchValue)}
                    </td>
                    <td className="p-2 border-l border-b">
                      {highlightText(member.lastName, searchValue)}
                    </td>
                    <td className="p-2 border-l border-b">
                      {highlightText(member.email, searchValue)}
                    </td>
                    <td className="p-2 border-l border-b border-r">
                      {highlightText(member.tierLevel ?? "N/A", searchValue)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))
      ) : (
        <div className="text-center p-4 text-gray-500">Member not found.</div>
      )}
    </div>
  );
};

export default TeamsTable;
