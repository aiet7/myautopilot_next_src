"use client";

import useTeamsStore from "@/utils/store/admin/control/teams/teamsStore";

const Confirmation = () => {
  const {
    setDeleteMenu,
    teamId,
    currentMember,
    handleDeleteMember,
    setCurrentMember,
  } = useTeamsStore();
  
  return (
    <div className="h-full w-full flex justify-center items-center dark:bg-black/80 absolute bg-black/60 z-[99] top-0 bottom-0 right-0 left-0 p-2 lg:p-10">
      <div className="flex flex-col justify-center items-center bg-white w-full max-w-[400px] h-[175px] p-4 rounded-lg text-black mx-auto relative">
        <div className="text-center">
          <h1 className="font-bold text-xl">
            Are you sure you want to delete this member?
          </h1>
          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={() => {
                handleDeleteMember(teamId, currentMember);
                setCurrentMember(null);
                setDeleteMenu(false);
              }}
              className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
            >
              Confirm
            </button>
            <button
              onClick={() => {
                setCurrentMember(null);
                setDeleteMenu(false);
              }}
              className="bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
