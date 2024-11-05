"use client";

import useTeamsStore from "@/utils/store/admin/control/teams/teamsStore";
import useUserStore from "@/utils/store/user/userStore";
import { AiOutlineClose } from "react-icons/ai";

const EditTeamMembers = () => {
  const { user } = useUserStore();
  const {
    editMemberInputs,
    currentMember,
    setCurrentMember,
    setEditing,
    setCurrentEditingTeam,
    setEditMemberInputs,
    handleEditMember,
  } = useTeamsStore();


  return (
    <div className="dark:bg-black/80 absolute bg-black/60 z-[99] top-0 bottom-0 right-0 left-0 p-2 lg:p-10">
      <div className="flex flex-col items-end bg-white max-w-[700px] h-full p-4 rounded-lg text-black mx-auto">
        <AiOutlineClose
          onClick={() => {
            setEditing(false);
            setCurrentMember(null);

            setCurrentEditingTeam(null);
          }}
          className="cursor-pointer"
          size={20}
        />

        <div className="flex flex-col gap-4 overflow-hidden w-full h-full">
          <div className="flex flex-col items-center justify-center font-semibold">
            <div className="flex flex-col items-center gap-8 w-full ">
              <div className="flex flex-col items-center gap-1">
                <h2 className="text-4xl font-bold">
                  Edit {currentMember?.firstName} {currentMember?.lastName}{" "}
                  Details
                </h2>
              </div>
              <div className="flex flex-col items-center w-full gap-4">
                <div className="flex items-center gap-2 w-full">
                  <p className="w-1/6 min-w-[80px]">First Name</p>
                  <input
                    placeholder={currentMember?.firstName || "Enter first name"}
                    type="text"
                    className="flex-1 border p-1"
                    value={editMemberInputs.firstName}
                    onChange={(e) =>
                      setEditMemberInputs("firstName", e.target.value)
                    }
                  />
                </div>
                <div className="flex items-center gap-2 w-full">
                  <p className="w-1/6 min-w-[80px]">Last Name</p>
                  <input
                    placeholder={currentMember?.lastName || "Enter last name"}
                    type="text"
                    className="flex-1 border p-1"
                    value={editMemberInputs.lastName}
                    onChange={(e) =>
                      setEditMemberInputs("lastName", e.target.value)
                    }
                  />
                </div>
                <div className="flex items-center gap-2 w-full">
                  <p className="w-1/6 min-w-[80px]">Email</p>
                  <input
                    placeholder={currentMember?.email || "Enter email"}
                    type="text"
                    className="flex-1 border p-1"
                    value={editMemberInputs.email}
                    onChange={(e) =>
                      setEditMemberInputs("email", e.target.value)
                    }
                  />
                </div>
                <div className="flex items-center gap-2 w-full">
                  <p className="w-1/6 min-w-[80px]">Tier Level</p>
                  <select
                    className=" border p-1"
                    value={editMemberInputs.tierLevel || "Tier3"}
                    onChange={(e) =>
                      setEditMemberInputs("tierLevel", e.target.value)
                    }
                  >
                    <option value="Tier3">Tier 3</option>
                    <option value="Tier2">Tier 2</option>
                    <option value="Tier1">Tier 1</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-end gap-4 justify-end h-full w-full">
            <button
              onClick={() => {
                handleEditMember(user?.mspCustomDomain);
                setCurrentEditingTeam(null);
                setEditing(false);
              }}
              className="border transition ease-in hover:bg-[#FFFFFF] hover:text-[#465E89]   bg-[#465E89] text-white rounded-lg py-2 px-20 font-bold"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTeamMembers;
