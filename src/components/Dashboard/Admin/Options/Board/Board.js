"use client";

import useBoardStore from "@/utils/store/admin/control/board/boardStore";
import useUiStore from "@/utils/store/ui/uiStore";
import useUserStore from "@/utils/store/user/userStore";
import { useEffect } from "react";
import BoardTable from "./BoardTable";

const Board = () => {
  const { user } = useUserStore();
  const { openAdmin, handleHistoryMenu } = useUiStore();

  const {
    boards,
    searchValue,
    setSelectedBoard,
    setSearchValue,
    intializeBoard,
  } = useBoardStore();

  useEffect(() => {
    intializeBoard();
  }, [user]);
  
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
      <div className="dark:border-b-white/20 border-b p-4">
        <h1 className="text-2xl">Boards</h1>
      </div>

      <div className="p-4 flex flex-col h-full overflow-auto scrollbar-thin pb-4">
        <div className="flex justify-between py-5">
          <h1 className="underline font-bold text-2xl">Boards</h1>
          <select
            className="w-[300px] h-[35px] border border-gray-300 rounded"
            onChange={(e) => {
              const selectedBoard = boards.boardDetails.filter(
                (board) => board.boardName === e.target.value
              );
              setSelectedBoard(selectedBoard.length ? selectedBoard : null);
            }}
          >
            <option value="">All Boards</option>
            {boards?.boardDetails?.map((board) => {
              const { boardId, boardName } = board;
              return (
                <option key={boardId} value={boardName}>
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
        <BoardTable />
      </div>
    </div>
  );
};

export default Board;
