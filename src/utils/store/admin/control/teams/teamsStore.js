import { create } from "zustand";
import useUserStore from "@/utils/store/user/userStore";
import { handleGetDBTeams } from "@/utils/api/serverProps";

const dbServiceUrl = process.env.NEXT_PUBLIC_DB_SERVICE_URL;

const useTeamsStore = create((set, get) => ({
  deleteMenu: false,
  teams: null,
  searchValue: "",
  selectedTeam: null,
  editing: false,
  adding: false,
  delete: false,
  teamId: null,
  currentEditingTeam: null,
  editMemberInputs: {
    firstName: "",
    lastName: "",
    email: "",
    tierLevel: "",
  },
  currentMember: null,
  activeTechnicians: [],
  selectedTechnicians: [],

  initializeTeams: async () => {
    const { user } = useUserStore.getState();

    set({ teams: null, selectedTeam: null });

    if (user) {
      try {
        const newTeams = await handleGetDBTeams(user.mspCustomDomain);
        set({ teams: newTeams });
      } catch (error) {
        console.error("Failed to initialize teams:", error);
      }
    }
  },

  setActiveTechnicians: (technicians) =>
    set({ activeTechnicians: technicians }),
  setAdding: (value) => set({ adding: value }),
  setTeamId: (value) => set({ teamId: value }),
  setEditing: (value) => set({ editing: value }),
  setCurrentEditingTeam: (value) => set({ currentEditingTeam: value }),
  setSelectedTeam: (team) => set({ selectedTeam: team }),
  setSearchValue: (value) => set({ searchValue: value }),
  setCurrentMember: (member) => set({ currentMember: member }),
  setDeleteMenu: (show) => set({ deleteMenu: show }),
  setEditMemberInputs: (key, value) =>
    set((state) => ({
      editMemberInputs: { ...state.editMemberInputs, [key]: value },
    })),

  setTechnicianSelection: (technician) => {
    const { selectedTechnicians } = get();
    const isSelected = selectedTechnicians.some(
      (tech) => tech.email === technician.email
    );

    set({
      selectedTechnicians: isSelected
        ? selectedTechnicians.filter((tech) => tech.email !== technician.email)
        : [...selectedTechnicians, technician],
    });
  },

  // handleAddMembers: async () => {
  //   const { selectedTechnicians, teamId, teams, selectedTeam } = get();

  //   if (!teamId || selectedTechnicians.length === 0) {
  //     console.error("No team ID or no selected technicians.");
  //     return;
  //   }

  //   try {
  //     while (selectedTechnicians.length != 0) {
  //       console.log(selectedTechnicians);
  //       const currentTechnician = selectedTechnicians.pop();

  //       const response = await fetch(
  //         `${dbServiceUrl}/api/teams/addMember/${teamId}?emailId=${encodeURIComponent(
  //           currentTechnician.email
  //         )}`,
  //         {
  //           method: "PUT",
  //           headers: { "Content-Type": "application/json" },
  //           body: JSON.stringify(currentTechnician),
  //         }
  //       );

  //       if (!response.ok) {
  //         const errorMessage = await response.text();
  //         console.error(
  //           `Failed to add member: ${currentTechnician.email}, Error: ${errorMessage}`
  //         );
  //         continue;
  //       }

  //       console.log(`Added member: ${currentTechnician.email} successfully.`);

  //       set((state) => ({
  //         activeTechnicians: state.activeTechnicians.filter(
  //           (t) => t.email !== currentTechnician.email
  //         ),
  //       }));
  //     }

  //     const updatedTeamResponse = await fetch(
  //       `${dbServiceUrl}/api/teams/getById/${teamId}`,
  //       {
  //         method: "GET",
  //         headers: { "Content-Type": "application/json" },
  //       }
  //     );

  //     if (!updatedTeamResponse.ok) {
  //       const errorMessage = await updatedTeamResponse.text();
  //       throw new Error(`Failed to fetch updated team: ${errorMessage}`);
  //     }

  //     const updatedTeam = await updatedTeamResponse.json();

  //     set({
  //       teams: teams.map((team) => (team.id === teamId ? updatedTeam : team)),
  //       selectedTeam: selectedTeam?.map((team) =>
  //         team.id === teamId ? updatedTeam : team
  //       ),
  //     });
  //   } catch (error) {
  //     console.error("Error while adding members:", error);
  //   }
  // },

  handleAddMembers: async () => {
    const { selectedTechnicians, teamId, teams, selectedTeam } = get();

    if (!teamId || selectedTechnicians.length === 0) {
      console.error("No team ID or no selected technicians.");
      return;
    }

    try {
      const response = await fetch(
        `${dbServiceUrl}/api/teams/addMembers/${teamId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(selectedTechnicians),
        }
      );

      if (response.status === 200) {
        console.log("Added members successfully.");

        const addedTechniciansEmails = selectedTechnicians.map((t) => t.email);

        set((state) => ({
          activeTechnicians: state.activeTechnicians.filter(
            (t) => !addedTechniciansEmails.includes(t.email)
          ),
          teams: state.teams.map((team) =>
            team.id === teamId
              ? {
                  ...team,
                  members: [...team.members, ...selectedTechnicians],
                }
              : team
          ),
          selectedTeam: state.selectedTeam?.map((team) =>
            team.id === teamId
              ? {
                  ...team,
                  members: [...team.members, ...selectedTechnicians],
                }
              : team
          ),
        }));
      } else {
        console.log("FAILED TO ADD TECHS");
      }
    } catch (error) {
      console.log("Error while adding members:");
    }
  },

  handleEditMember: async () => {
    const {
      editMemberInputs,
      currentMember,
      teamId,
      currentEditingTeam,
      teams,
      errorMessage,
      successMessage,
    } = get();

    if (!currentEditingTeam?.members) {
      console.error("Team data or members are not available.");
      return;
    }

    try {
      const updatedMemberData = {
        firstName: editMemberInputs.firstName || currentMember.firstName,
        lastName: editMemberInputs.lastName || currentMember.lastName,
        email: editMemberInputs.email || currentMember.email,
        tierLevel: editMemberInputs.tierLevel || currentMember.tierLevel,
        autopilotTechnicianUsersId: currentMember.autopilotTechnicianUsersId,
      };

      const updatedTeamData = {
        ...currentEditingTeam,
        members: currentEditingTeam.members.map((member) =>
          member.email === currentMember.email ? updatedMemberData : member
        ),
      };

      const response = await fetch(
        `${dbServiceUrl}/api/teams/update/${teamId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedTeamData),
        }
      );

      if (response.status === 200) {
        console.log("Team updated successfully.");
        set({
          teams: teams.map((team) =>
            team.id === teamId ? updatedTeamData : team
          ),
          currentEditingTeam: updatedTeamData,
          errorMessage: { ...errorMessage, editMember: false },
          successMessage: { ...successMessage, editMember: true },
        });
      } else {
        set({
          errorMessage: { ...errorMessage, editMember: true },
          successMessage: { ...successMessage, editMember: false },
        });
        console.log("ERROR UPDATING MEMBER");
      }
    } catch (error) {
      console.log(error);
    }
  },

  handleDeleteMember: async (teamId, member) => {
    const {
      teams,
      currentEditingTeam,
      selectedTeam,
      errorMessage,
      successMessage,
    } = get();

    try {
      const response = await fetch(
        `${dbServiceUrl}/api/teams/removeMember/${teamId}?emailId=${encodeURIComponent(
          member.email
        )}`,
        { method: "DELETE", headers: { "Content-Type": "application/json" } }
      );

      if (response.status === 200) {
        const updatedMembers = currentEditingTeam.members.filter(
          (teamMember) => teamMember.email !== member.email
        );

        const updatedTeam = { ...currentEditingTeam, members: updatedMembers };

        set({
          currentEditingTeam: updatedTeam,
          teams: teams.map((team) => (team.id === teamId ? updatedTeam : team)),
          selectedTeam: selectedTeam?.map((team) =>
            team.id === teamId ? updatedTeam : team
          ),
          errorMessage: { ...errorMessage, deleteMember: false },
          successMessage: { ...successMessage, deleteMember: true },
        });
        console.log("Member removed successfully.");
      } else {
        set({
          errorMessage: { ...errorMessage, deleteMember: true },
          successMessage: { ...successMessage, deleteMember: false },
        });
        console.log("ERROR REMOVING MEMBER");
      }
    } catch (error) {
      console.log(error);
    }
  },

  handleGetAllMember: async (mspCustomDomain) => {
    const { errorMessage, successMessage } = get();

    if (!mspCustomDomain) {
      console.error("mspCustomDomain is undefined or null");
      return;
    }

    try {
      const response = await fetch(
        `${dbServiceUrl}/${mspCustomDomain}/technicianUsers/queueEligibleTechnicians`
      );

      if (response.status === 200) {
        const data = await response.json();
        const filteredTechnicians = data
          .filter((technician) => technician.connectWiseTechnicanId !== 0)
          .map(
            ({
              firstName,
              lastName,
              email,
              tierLevel,
              connectWiseTechnicanId,
            }) => ({
              firstName,
              lastName,
              email,
              tierLevel,
              connectWiseTechnicanId,
            })
          );

        set({
          activeTechnicians: filteredTechnicians,
          errorMessage: { ...errorMessage, getAllMember: false },
          successMessage: { ...successMessage, getAllMember: true },
        });
      } else {
        set({
          errorMessage: { ...errorMessage, getAllMember: true },
          successMessage: { ...successMessage, getAllMember: false },
        });
        console.log("ERROR FETCHING ACTIVE TECHNICIANS");
      }
    } catch (error) {
      console.log(error);
    }
  },

  clearTeams: () =>
    set({
      deleteMenu: false,
      teams: null,
      searchValue: "",
      selectedTeam: null,
      editing: false,
      adding: false,
      delete: false,
      teamId: null,
      currentEditingTeam: null,
      editMemberInputs: {
        firstName: "",
        lastName: "",
        email: "",
        tierLevel: "",
      },
      currentMember: null,
      activeTechnicians: [],
      selectedTechnicians: [],
    }),
}));

export default useTeamsStore;
