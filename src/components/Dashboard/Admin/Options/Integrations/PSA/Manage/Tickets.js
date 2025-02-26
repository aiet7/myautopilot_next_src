"use client";

import useManageStore from "@/utils/store/admin/control/integrations/PSA/manageStore";
import useUserStore from "@/utils/store/user/userStore";
import { useEffect } from "react";
import { FaSpinner, FaClipboard } from "react-icons/fa";

const Tickets = () => {
  const { user } = useUserStore();

  const {
    finishedIntagrationShow,
    connectwiseSyncMerge,
    connectwiseBoardsForSync,
    loadingSyncMerge,
    setFinishedIntegratingToast,
    handleEnableBoardSync,
    handleGetDBBoardDetails,
    initializeManageTickets,
  } = useManageStore();

  useEffect(() => {
    initializeManageTickets();
  }, [user]);
    
  return (
    <div className="flex flex-col gap-4 h-full overflow-hidden relative">
      <div className="flex flex-col gap-8  justify-between items-start text-lg font-semibold italic text-black/30 md:flex-row">
        {loadingSyncMerge ? (
          <div className="flex items-center gap-2">
            <p>Loading your board.</p>
            <FaSpinner size={20} className="animate-spin" />
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <p>Please select a board to sync</p>
            <FaClipboard size={20} />
          </div>
        )}
      </div>
      {connectwiseBoardsForSync && (
        <>
          <div className="flex justify-between flex-wrap gap-2 items-center text-xs ">
            <select
              id="manageAuthenticated-chooseBoard"
              className="dark:bg-white border rounded-lg shadow-lg p-2 cursor-pointer text-black"
              onChange={(e) => {
                const selectedBoard = connectwiseBoardsForSync.find(
                  (board) => board.id === Number(e.target.value)
                );
                handleGetDBBoardDetails(user?.mspCustomDomain, selectedBoard);
              }}
            >
              <option value="" disabled selected>
                Select Board
              </option>

              {connectwiseBoardsForSync &&
                connectwiseBoardsForSync.map((board) => {
                  const { id, name } = board;
                  return (
                    <option key={id} value={id}>
                      {name}
                    </option>
                  );
                })}
            </select>
            <button
              onClick={() => handleEnableBoardSync(user?.mspCustomDomain)}
              className="bg-blue-800 text-white font-bold px-5 rounded py-2"
            >
              Enable Syncing
            </button>
          </div>
          <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded">
            <p className="text-lg text-gray-600">
              All your tickets on the triage or dispatch board are collected
              from multiple sources—whether it is via email, phone calls, or
              other communication channels. Our system automatically categorizes
              each ticket and directs it to the appropriate board, ensuring that
              every customer inquiry is organized efficiently and handled
              promptly. This seamless integration not only streamlines your
              workflow but also helps your team focus on resolving issues
              faster.
            </p>
          </div>
          <div className="flex flex-col gap-2 flex-1 overflow-hidden">
            <p className="font-bold text-xl">Your Synced Boards Are:</p>
            <div className="flex-1 overflow-y-auto scrollbar-thin">
              {connectwiseSyncMerge?.connectWiseConfig?.boardTicketSync?.map(
                (sync) => {
                  const { boardId, boardName } = sync;
                  return (
                    <div key={boardId} className="text-lg">
                      <p>{boardName}</p>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </>
      )}
      {finishedIntagrationShow && (
        <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center z-[99]">
          <div className="flex flex-col justify-center gap-4 w-[320px] h-[220px] p-3 rounded-md shadow-md border">
            <h2 className="font-bold">Finished Integrating</h2>
            <p>
              You have successfully integrated your ConnectWise Manage system
              into our platform. You can now manage your tickets, board,
              technicians and clients through our admin portal!
            </p>
            <button
              onClick={() => setFinishedIntegratingToast(false)}
              className="self-end bg-blue-800 text-white font-bold px-5 rounded py-1"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tickets;
