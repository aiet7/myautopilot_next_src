import { useEffect } from "react";
import useUiStore from "@/utils/store/ui/uiStore";
import useTeamsStore from "@/utils/store/admin/control/teams/teamsStore";
import useUserStore from "@/utils/store/user/userStore";
import TeamsTable from "./TeamsTable";
import AddTeamMembers from "./AddTeamMembers";
import EditTeamMembers from "./EditTeamMembers";

const Teams = () => {
  const { openAdmin, handleHistoryMenu } = useUiStore();
  const { user } = useUserStore();
  const {
    adding,
    searchValue,
    editing,
    teams,
    initializeTeams,
    setSelectedTeam,
    setSearchValue,
  } = useTeamsStore();

  useEffect(() => {
    console.log("firing off")
    initializeTeams();
  }, [user]);

console.log(teams)
  return (
    <div
      onClick={() => {
        if (window.innerWidth < 1023) {
          openAdmin && handleHistoryMenu(false);
        }
      }}
      className={`relative flex flex-col h-full w-full text-sm ${
        openAdmin ? "lg:opacity-100 opacity-5 xl:ml-[250px]" : ""
      } dark:bg-black transition-all duration-300 ease bg-white`}
    >
      {adding && <AddTeamMembers />}
      {editing && <EditTeamMembers />}
      <div className="dark:border-b-white/20 border-b p-4">
        <h1 className="text-2xl">Teams</h1>
      </div>

      <div className="p-4 flex flex-col h-full overflow-auto scrollbar-thin pb-4">
        <div className="flex justify-between py-5">
          <h1 className="underline font-bold text-2xl">Boards</h1>
          <select
            className="w-[300px] h-[35px] border border-gray-300 rounded"
            onChange={(e) => {
              const selectedTeams = teams.filter(
                (team) => team.boardName === e.target.value
              );
              setSelectedTeam(selectedTeams.length ? selectedTeams : null);
            }}
          >
            <option value="">All Boards</option>
            {teams?.map((board) => {
              const { id, boardName } = board;

              return (
                <option key={id} value={boardName}>
                  {boardName}
                </option>
              );
            })}
          </select>

          <input
            type="text"
            placeholder="Search"
            className="w-[300px] h-[35px] border border-gray-300 rounded p-2"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
        <TeamsTable />
      </div>
    </div>
  );
};

export default Teams;
