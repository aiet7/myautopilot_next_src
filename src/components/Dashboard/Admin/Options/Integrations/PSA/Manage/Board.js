"use client";
import useManageStore from "@/utils/store/admin/control/integrations/PSA/manageStore";
import useTechStore from "@/utils/store/user/techStore";
import { AiOutlineClose } from "react-icons/ai";
const Board = () => {
  const { tech } = useTechStore();

  const { connectwiseBoards, setConnectwiseBoard, handleGetBoardDetails } =
    useManageStore();

  return (
    <div className="dark:bg-black/80 absolute bg-black/60 top-0 bottom-0 right-0 left-0 flex items-start justify-center py-10 px-2">
      <div className="flex flex-col items-end gap-4 bg-white max-w-full p-4 rounded-lg shadow-lg text-black">
        <AiOutlineClose
          className="cursor-pointer"
          size={20}
          onClick={() => setConnectwiseBoard(null)}
        />
        {connectwiseBoards && (
          <div className="flex gap-2 items-center flex-wrap font-semibold">
            {connectwiseBoards.map((board) => {
              const { id, name } = board;
              return (
                <div
                  key={id}
                  onClick={() =>
                    handleGetBoardDetails(id, tech?.mspCustomDomain)
                  }
                  className="border rounded-lg shadow-lg px-4 py-2 cursor-pointer"
                >
                  {name}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Board;
