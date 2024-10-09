"use client";

import useTeamsStore from "@/utils/store/admin/control/teams/teamsStore";

const TeamsTable = () => {
  const { teams, currentTeam, searchValue } = useTeamsStore();

  const filteredTeams = (currentTeam || teams)
    ?.map((team) => ({
      ...team,
      members: team.members.filter((member) => {
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

  const highlightText = (text, searchValue) => {
    if (!searchValue) return text;

    const regex = new RegExp(`(${searchValue})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, index) =>
      regex.test(part) ? (
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
      {filteredTeams?.length > 0 ? (
        filteredTeams?.map((team) => (
          <div key={team.id}>
            <h1 className="font-bold pt-2">
              Board Name: <span className="font-normal">{team.boardName}</span>
            </h1>
            <h1 className="font-bold py-2">
              Team Name: <span className="font-normal">{team.teamName}</span>
            </h1>
            <table className="min-w-full table-fixed border-separate border-spacing-0 text-left">
              <thead className="dark:text-white dark:bg-gray-700  text-black/60 bg-[#F5F8FA]">
                <tr>
                  <th className="p-2 border-t border-b border-r border-l"></th>
                  <th className="p-2 border-t border-b border-r">First Name</th>
                  <th className="p-2 border-t border-b border-r">Last Name</th>
                  <th className="p-2 border-t border-b border-r">Email</th>
                  <th className="p-2 border-t border-b border-r">Tier Level</th>
                  <th className="p-2 border-t border-b border-r">
                    Associated Teams
                  </th>
                </tr>
              </thead>
              <tbody>
                {team.members.map((member) => (
                  <tr key={member.connectWiseTechnicanId}>
                    <td className="p-2 border-l border-b">
                      <div className="flex gap-3 w-44 xl:w-8">
                        <span className="hover:underline hover:cursor-pointer text-blue-500">
                          Edit
                        </span>
                        <span className="hover:underline hover:cursor-pointer text-red-500">
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
                    <td className="p-2 border-l border-b">
                      {highlightText(member.tierLevel.toString(), searchValue)}
                    </td>
                    <td className="p-2 border-l border-r border-b">
                      {highlightText(member.email, searchValue)}
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
