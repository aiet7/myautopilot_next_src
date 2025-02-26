"use client";

import useBoardStore from "@/utils/store/admin/control/board/boardStore";
import useUiStore from "@/utils/store/ui/uiStore";
import useUserStore from "@/utils/store/user/userStore";
import { useEffect } from "react";
import BoardTable from "./BoardTables/BoardTables";

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

  const renderConfigDetails = () => {
    switch (boards?.psaType) {
      case "ConnectWise":
        return boards?.connectWiseConfig?.boardDetails || [];
      case "Autotask":
        return boards?.autotaskConfig?.ticketQueueDetails || [];
      default:
        return [];
    }
  };

  const renderConfigKeyAndName = (detail) => {
    switch (boards?.psaType) {
      case "ConnectWise":
        return { key: detail.boardId, name: detail.boardName };

      case "Autotask":
        return { key: detail.queueId, name: detail.queueName };

      default:
        return { key: null, name: null };
    }
  };

  const renderBoardSelection = (value) => {
    switch (boards?.psaType) {
      case "ConnectWise":
        return configDetails.filter((detail) => detail.boardName === value);
      case "Autotask":
        return configDetails.filter((detail) => detail.queueName === value);
      default:
        return [];
    }
  };

  const renderTitle = () => {
    switch (boards?.psaType) {
      case "ConnectWise":
        return "Boards";
      case "Autotask":
        return "Queue";

      default:
        return "";
    }
  };

  const renderSelectAll = () => {
    switch (boards?.psaType) {
      case "ConnectWise":
        return "All Boards";
      case "Autotask":
        return "All Queues";

      default:
        return "";
    }
  };

  const configDetails = renderConfigDetails();
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
          <h1 className="underline font-bold text-2xl">{renderTitle()}</h1>
          <select
            className="w-[300px] h-[35px] border border-gray-300 rounded"
            onChange={(e) => {
              const selectedBoard = renderBoardSelection(e.target.value);

              setSelectedBoard(selectedBoard.length ? selectedBoard : null);
            }}
          >
            <option value="">{renderSelectAll()}</option>
            {configDetails?.map((board) => {
              const { key, name } = renderConfigKeyAndName(board);
              return (
                <option key={key} value={name}>
                  {name}
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
