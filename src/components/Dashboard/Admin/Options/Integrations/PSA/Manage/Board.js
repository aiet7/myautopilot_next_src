"use client";
import useManageStore from "@/utils/store/admin/control/integrations/PSA/manageStore";
import useTechStore from "@/utils/store/user/techStore";
import { AiOutlineClose } from "react-icons/ai";
import { FaClipboard, FaSpinner } from "react-icons/fa";

const Board = () => {
  const { tech } = useTechStore();

  const {
    connectwiseBoards,
    loadingMerge,
    connectwiseMerge,
    setConnectwiseBoard,
    handleGetBoardDetails,
  } = useManageStore();
  console.log(connectwiseMerge);
  return (
    <div className="dark:bg-black/80 absolute bg-black/60 top-0 bottom-0 right-0 left-0 flex items-start justify-center py-10 px-2">
      <div className="flex flex-col items-end gap-4 bg-white max-w-full p-4 rounded-lg shadow-lg text-black ">
        <AiOutlineClose
          className="cursor-pointer"
          size={20}
          onClick={() => setConnectwiseBoard(null)}
        />
        <div className="flex flex-col gap-4 ">
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
          <div className="flex flex-col items-center p-4 text-xl font-semibold italic text-black/30 ">
            {loadingMerge ? (
              <>
                <p className="">
                  Loading your board. This might take a few minutes.
                </p>
                <FaSpinner size={25} className="animate-spin" />
              </>
            ) : (
              <>
                <p className="">Please select a board to view.</p>
                <FaClipboard size={25} />
              </>
            )}
            {connectwiseMerge &&
              connectwiseMerge.mspConnectWiseManageCategorizations && (
                <div className="block overflow-auto scrollbar-thin h-[300px] lg:h-[600px] ">
                  <table className="min-w-full table-fixed  border-separate border-spacing-0 text-left">
                    <thead>
                      <tr>
                        <th>Category ID</th>
                        <th>Category Name</th>
                        <th>Sub-Categorizations</th>
                      </tr>
                    </thead>
                    <tbody>
                      {connectwiseMerge.mspConnectWiseManageCategorizations.map(
                        (category) => (
                          <tr key={category.categoryId}>
                            <td>{category.categoryId}</td>
                            <td>{category.categoryName}</td>
                            <td>
                              {category.mspConnectWiseManageSubCategorizations.map(
                                (subCat) => (
                                  <div key={subCat.subCategoryId}>
                                    {subCat.subCategoryName} (Priority:{" "}
                                    {subCat.priority})
                                  </div>
                                )
                              )}
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Board;
