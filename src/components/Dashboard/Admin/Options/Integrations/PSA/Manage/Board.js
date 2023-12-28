"use client";

import useManageStore from "@/utils/store/admin/control/integrations/PSA/manageStore";
import useTechStore from "@/utils/store/user/techStore";
import { AiOutlineClose } from "react-icons/ai";
import { FaClipboard, FaSpinner } from "react-icons/fa";

const Board = () => {
  const { tech } = useTechStore();

  const {
    successMessage,
    errorMessage,
    severityOptions,
    impactOptions,
    tierOptions,
    durationOptions,
    activeBoard,
    connectwiseBoards,
    loadingMerge,
    connectwiseMerge,
    setConnectwiseBoard,
    setBoardInputs,
    handleGetBoardDetails,
    handleSaveBoard,
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
          <div className="flex flex-col gap-8 justify-between items-center  text-xl font-semibold italic text-black/30 md:flex-row">
            {loadingMerge ? (
              <div className="flex items-center gap-2">
                <p>Loading your board. This might take a few minutes</p>
                <FaSpinner size={20} className="animate-spin" />
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <p>Please select a board to view</p>
                <FaClipboard size={20} />
              </div>
            )}
            <div className="flex flex-col gap-2 items-center md:flex-row">
              <div className="flex flex-col items-start ">
                <p>Ask our AI to generate you a board! </p>
                <div className="flex items-center w-full">
                  <p className="text-xs">This might take a few minutes...</p>
                  <button className="hover:bg-emerald-600 bg-emerald-500 text-white text-sm px-8 py-1 w-full rounded-lg">
                    Generate
                  </button>
                </div>
              </div>
            </div>
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
                        <th className="p-2 border-t border-b border-r">
                          Impact
                        </th>
                        <th className="p-2 border-t border-b border-r">Tier</th>
                        <th className="p-2 border-t border-b border-r">
                          Duration
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {connectwiseMerge.mspConnectWiseManageCategorizations.map(
                        (category) => {
                          const {
                            categoryId,
                            categoryName,
                            mspConnectWiseManageSubCategorizations,
                          } = category;
                          return (
                            <tr key={categoryId}>
                              <td className="p-2 truncate border-l border-r border-b">
                                {categoryName}
                              </td>
                              <td className="p-2 truncate border-r border-b">
                                {mspConnectWiseManageSubCategorizations.map(
                                  (subCat) => {
                                    const { subCategoryId, subCategoryName } =
                                      subCat;
                                    return (
                                      <p key={subCategoryId}>
                                        {subCategoryName}
                                      </p>
                                    );
                                  }
                                )}
                              </td>
                              <td className="p-2 border-r border-b">
                                {mspConnectWiseManageSubCategorizations.map(
                                  (subCat) => {
                                    const { subCategoryId } = subCat;
                                    return (
                                      <div
                                        key={subCategoryId}
                                        className="flex flex-col"
                                      >
                                        <select
                                          onChange={(e) => {
                                            const selectedPriority =
                                              connectwiseMerge?.prioritiesList.find(
                                                (priority) =>
                                                  priority.id ===
                                                  parseInt(e.target.value)
                                              );
                                            setBoardInputs(
                                              categoryId,
                                              subCategoryId,
                                              "priority",
                                              selectedPriority.id,
                                              selectedPriority.name
                                            );
                                          }}
                                        >
                                          {connectwiseMerge.prioritiesList.map(
                                            (priority) => {
                                              const { id, name } = priority;
                                              return (
                                                <option key={id} value={id}>
                                                  {name}
                                                </option>
                                              );
                                            }
                                          )}
                                        </select>
                                      </div>
                                    );
                                  }
                                )}
                              </td>
                              <td className="p-2 border-r border-b">
                                {mspConnectWiseManageSubCategorizations.map(
                                  (subCat) => {
                                    const { subCategoryId } = subCat;
                                    return (
                                      <div
                                        key={subCategoryId}
                                        className="flex flex-col"
                                      >
                                        <select
                                          onChange={(e) => {
                                            setBoardInputs(
                                              categoryId,
                                              subCategoryId,
                                              "severity",
                                              e.target.value,
                                              null
                                            );
                                          }}
                                        >
                                          {severityOptions.map((option) => (
                                            <option key={option} value={option}>
                                              {option}
                                            </option>
                                          ))}
                                        </select>
                                      </div>
                                    );
                                  }
                                )}
                              </td>
                              <td className="p-2 border-r border-b">
                                {mspConnectWiseManageSubCategorizations.map(
                                  (subCat) => {
                                    const { subCategoryId } = subCat;
                                    return (
                                      <div
                                        key={subCategoryId}
                                        className="flex flex-col"
                                      >
                                        <select
                                          onChange={(e) => {
                                            setBoardInputs(
                                              categoryId,
                                              subCategoryId,
                                              "impact",
                                              e.target.value,
                                              null
                                            );
                                          }}
                                        >
                                          {impactOptions.map((option) => (
                                            <option key={option} value={option}>
                                              {option}
                                            </option>
                                          ))}
                                        </select>
                                      </div>
                                    );
                                  }
                                )}
                              </td>
                              <td className="p-2 border-r border-b">
                                {mspConnectWiseManageSubCategorizations.map(
                                  (subCat) => {
                                    const { subCategoryId } = subCat;
                                    return (
                                      <div
                                        key={subCategoryId}
                                        className="flex flex-col"
                                      >
                                        <select
                                          onChange={(e) => {
                                            setBoardInputs(
                                              categoryId,
                                              subCategoryId,
                                              "tier",
                                              e.target.value,
                                              null
                                            );
                                          }}
                                        >
                                          {tierOptions.map((option) => (
                                            <option key={option}>
                                              {option}
                                            </option>
                                          ))}
                                        </select>
                                      </div>
                                    );
                                  }
                                )}
                              </td>
                              <td className="p-2 border-r border-b">
                                {mspConnectWiseManageSubCategorizations.map(
                                  (subCat) => {
                                    const { subCategoryId } = subCat;
                                    return (
                                      <div
                                        key={subCategoryId}
                                        className="flex flex-col"
                                      >
                                        <select
                                          onChange={(e) => {
                                            setBoardInputs(
                                              categoryId,
                                              subCategoryId,
                                              "duration",
                                              e.target.value,
                                              null
                                            );
                                          }}
                                        >
                                          {durationOptions.map((option) => (
                                            <option key={option}>
                                              {option}
                                            </option>
                                          ))}
                                        </select>
                                      </div>
                                    );
                                  }
                                )}
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
          <div className="flex items-center gap-2 self-end">
            {successMessage && (
              <p className="text-emerald-500">Saved Board Successfully!</p>
            )}
            {errorMessage && <p className="text-red-500">Error Saving Board</p>}
            <button
              onClick={() => handleSaveBoard(tech?.mspCustomDomain)}
              className="hover:bg-blue-500 bg-blue-800 text-white px-6 py-2 rounded-lg "
            >
              SAVE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Board;
