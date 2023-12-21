"use client";

import useManageStore from "@/utils/store/admin/control/integrations/PSA/manageStore";
import useTechStore from "@/utils/store/user/techStore";
import { AiOutlineClose } from "react-icons/ai";
import { FaClipboard, FaSpinner } from "react-icons/fa";

const Board = () => {
  const { tech } = useTechStore();

  const {
    activeBoard,
    connectwiseBoards,
    loadingMerge,
    connectwiseMerge,
    setConnectwiseBoard,
    handleGetBoardDetails,
  } = useManageStore();
  
  return (
    <div className="dark:bg-black/80 absolute bg-black/60 z-[99] top-0 bottom-0 right-0 left-0 flex  items-center justify-center p-2 lg:p-10">
      <div className="flex flex-col items-end bg-white w-full h-full p-4 rounded-lg text-black">
        <AiOutlineClose
          className="cursor-pointer"
          size={20}
          onClick={() => {
            setConnectwiseBoard(null);
          }}
        />
        <div className="flex flex-col gap-4 overflow-hidden w-full h-full">
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
                    className={`${
                      activeBoard === id && "bg-blue-800 text-white"
                    } border rounded-lg shadow-lg px-4 py-2 cursor-pointer`}
                  >
                    {name}
                  </div>
                );
              })}
            </div>
          )}
          <div className="flex items-center gap-2 text-xl font-semibold italic text-black/30">
            {loadingMerge ? (
              <>
                <p className="">
                  Loading your board. This might take a few minutes
                </p>
                <FaSpinner size={20} className="animate-spin" />
              </>
            ) : (
              <>
                <p className="">Please select a board to view</p>
                <FaClipboard size={20} />
              </>
            )}
          </div>
          <div className="flex flex-col text-xl overflow-hidden">
            {connectwiseMerge &&
              connectwiseMerge.mspConnectWiseManageCategorizations && (
                <div className="block text-sm overflow-auto scrollbar-thin  max-h-full max-w-full">
                  <table className=" min-w-full table-fixed border-separate border-spacing-0 text-left">
                    <thead className="sticky top-0 bg-white text-lg text-black/60">
                      <tr className="">
                        <th className="p-2 border-l border-t border-b border-r ">
                          Category Name
                        </th>
                        <th className="p-2 border-t border-b border-r">
                          Sub-Categorizations
                        </th>
                        <th className="p-2 border-t border-b border-r">
                          Priority
                        </th>
                        <th className="p-2 border-t border-b border-r">
                          Severity
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {connectwiseMerge.mspConnectWiseManageCategorizations.map(
                        (category) => {
                          const { categoryId, categoryName } = category;
                          return (
                            <tr key={categoryId}>
                              <td className="p-2 truncate border-l border-r border-b">
                                {categoryName}
                              </td>
                              <td className="p-2 truncate border-r border-b">
                                <select className="w-full">
                                  {category.mspConnectWiseManageSubCategorizations.map(
                                    (subCat) => {
                                      const { subCategoryId, subCategoryName } =
                                        subCat;
                                      return (
                                        <option key={subCategoryId}>
                                          {subCategoryName}
                                        </option>
                                      );
                                    }
                                  )}
                                </select>
                              </td>
                              <td className="p-2 border-r border-b">
                                <select className="w-full">
                                  {category.mspConnectWiseManageSubCategorizations.map(
                                    (subCat) => {
                                      const { priority } = subCat;
                                      return (
                                        <option key={priority}>
                                          {priority}
                                        </option>
                                      );
                                    }
                                  )}
                                </select>
                              </td>
                              <td className="p-2 border-r border-b">
                                <select className="w-full">
                                  {category.mspConnectWiseManageSubCategorizations.map(
                                    (subCat) => {
                                      const { severity } = subCat;
                                      return (
                                        <option key={severity}>
                                          {severity}
                                        </option>
                                      );
                                    }
                                  )}
                                </select>
                              </td>
                            </tr>
                          );
                        }
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
