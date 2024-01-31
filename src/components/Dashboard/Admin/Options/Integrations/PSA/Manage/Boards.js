"use client";

import useManageStore from "@/utils/store/admin/control/integrations/PSA/manageStore";
import useTechStore from "@/utils/store/user/techStore";
import { FaClipboard, FaSpinner } from "react-icons/fa";
import { SiOpenai } from "react-icons/si";
import { AiOutlinePlus } from "react-icons/ai";

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
    customBoard,
    connectwiseBoards,
    loadingMerge,
    customBoardMerge,
    connectwiseMerge,
    setConnectwiseBoard,
    setBoardInputs,
    setCustomBoardInputs,
    handleGetBoardDetails,
    handleCustomBoard,
    handleSaveBoard,
  } = useManageStore();

  const boardData = customBoard ? customBoardMerge : connectwiseMerge;

  return (
    <div className="flex flex-col gap-4 h-full overflow-hidden">
      <div className="flex flex-col gap-8 pb-2 justify-between items-start text-xl font-semibold italic text-black/30 md:flex-row">
        {loadingMerge ? (
          <div className="flex items-center gap-2">
            <p>Loading your board.</p>
            <FaSpinner size={20} className="animate-spin" />
          </div>
        ) : customBoard ? (
          <div className="flex items-center gap-2">
            <p>Customize Your Own Board</p>
            <FaClipboard size={20} />
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <p>Please select a board to view</p>
            <FaClipboard size={20} />
          </div>
        )}
      </div>
      {connectwiseBoards && (
        <div className="flex gap-2 items-center flex-wrap font-semibold ">
          {connectwiseBoards.map((board) => {
            const { id, name } = board;

            return (
              <div
                key={id}
                onClick={() => handleGetBoardDetails(id, tech?.mspCustomDomain)}
                className={`${
                  activeBoard === id && "bg-blue-800 text-white"
                } border rounded-lg shadow-lg px-4 py-2 cursor-pointer `}
              >
                {name}
              </div>
            );
          })}
          <div
            onClick={handleCustomBoard}
            className={`${
              customBoard && "bg-green-800 text-white"
            } border rounded-lg shadow-lg px-4 py-2 cursor-pointer `}
          >
            Custom
          </div>
        </div>
      )}

      {customBoard && (
        <div className="flex items-center gap-2">
          <input
            className="border p-1 rounded"
            placeholder="Enter Board Title"
            onChange={(e) =>
              setCustomBoardInputs(null, null, "boardTitle", e.target.value)
            }
          />
          <select
            onChange={(e) =>
              setCustomBoardInputs(null, null, "department", e.target.value)
            }
            className="p-1 border rounded w-[125px]"
          >
            {customBoardMerge.departmentsList.map((department) => {
              const { id, name } = department;
              return <option key={id}>{name}</option>;
            })}
          </select>
          <select
            onChange={(e) =>
              setCustomBoardInputs(null, null, "location", e.target.value)
            }
            className="p-1 border rounded w-[150px]"
          >
            {customBoardMerge.locationsList.map((location) => {
              const { id, name } = location;
              return <option key={id}>{name}</option>;
            })}
          </select>
        </div>
      )}
      <div className="flex flex-col text-xl overflow-hidden">
        {boardData && boardData.mspConnectWiseManageCategorizations && (
          <div className="block text-sm overflow-auto scrollbar-thin  max-h-full max-w-full">
            <table className=" min-w-full table-fixed border-separate border-spacing-0 text-left">
              <thead className="sticky top-0 bg-white text-lg text-black/60">
                <tr className="">
                  <th className="p-2 border-l border-t border-b border-r ">
                    <div className="flex justify-between items-center">
                      Category Name
                      <AiOutlinePlus className="text-black" size={20} />
                    </div>
                  </th>
                  <th className="p-2 border-t border-b border-r">
                    Sub-Categorizations
                  </th>
                  <th className="p-2 border-t border-b border-r">Priority</th>
                  <th className="p-2 border-t border-b border-r">Severity</th>
                  <th className="p-2 border-t border-b border-r">Impact</th>
                  <th className="p-2 border-t border-b border-r">Tier</th>
                  <th className="p-2 border-t border-b border-r">Duration</th>
                </tr>
              </thead>
              <tbody>
                {boardData.mspConnectWiseManageCategorizations.map(
                  (category) => {
                    const {
                      categoryId,
                      categoryName,
                      mspConnectWiseManageSubCategorizations,
                    } = category;
                    return (
                      <tr key={categoryId}>
                        <td className="p-2 truncate border-l border-r border-b align-top">
                          {customBoard ? (
                            <input
                              type="text"
                              placeholder={categoryName}
                              onChange={(e) =>
                                setCustomBoardInputs(
                                  categoryId,
                                  null,
                                  "categoryName",
                                  e.target.value
                                )
                              }
                            />
                          ) : (
                            categoryName
                          )}
                        </td>
                        <td className="p-2 truncate border-r border-b align-top">
                          {mspConnectWiseManageSubCategorizations.map(
                            (subCat) => {
                              const { subCategoryId, subCategoryName } = subCat;
                              return (
                                <div key={subCategoryId}>
                                  {customBoard ? (
                                    <input
                                      type="text"
                                      placeholder={subCategoryName}
                                      onChange={(e) =>
                                        setCustomBoardInputs(
                                          categoryId,
                                          subCategoryId,
                                          "subCategoryName",
                                          e.target.value
                                        )
                                      }
                                    />
                                  ) : (
                                    <p>{subCategoryName}</p>
                                  )}
                                </div>
                              );
                            }
                          )}
                          {customBoard && (
                            <AiOutlinePlus
                              size={20}
                              className="cursor-pointer mt-1"
                            />
                          )}
                        </td>
                        <td className="p-1 border-r border-b align-top">
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
                                        boardData?.prioritiesList.find(
                                          (priority) =>
                                            priority.id ===
                                            parseInt(e.target.value)
                                        );
                                      if (customBoard) {
                                        setCustomBoardInputs(
                                          categoryId,
                                          subCategoryId,
                                          "priority",
                                          selectedPriority.name
                                        );
                                      } else {
                                        setBoardInputs(
                                          categoryId,
                                          subCategoryId,
                                          "priority",
                                          selectedPriority.id,
                                          selectedPriority.name
                                        );
                                      }
                                    }}
                                  >
                                    {boardData.prioritiesList.map(
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
                        <td className="p-1 border-r border-b align-top">
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
                                      if (customBoard) {
                                        setCustomBoardInputs(
                                          categoryId,
                                          subCategoryId,
                                          "severity",
                                          e.target.value
                                        );
                                      } else {
                                        setBoardInputs(
                                          categoryId,
                                          subCategoryId,
                                          "severity",
                                          e.target.value,
                                          null
                                        );
                                      }
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
                        <td className="p-1 border-r border-b align-top">
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
                                      if (customBoard) {
                                        setCustomBoardInputs(
                                          categoryId,
                                          subCategoryId,
                                          "impact",
                                          e.target.value
                                        );
                                      } else {
                                        setBoardInputs(
                                          categoryId,
                                          subCategoryId,
                                          "impact",
                                          e.target.value,
                                          null
                                        );
                                      }
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
                        <td className="p-1 border-r border-b align-top">
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
                                      if (customBoard) {
                                        setCustomBoardInputs(
                                          categoryId,
                                          subCategoryId,
                                          "tier",
                                          e.target.value
                                        );
                                      } else {
                                        setBoardInputs(
                                          categoryId,
                                          subCategoryId,
                                          "tier",
                                          e.target.value,
                                          null
                                        );
                                      }
                                    }}
                                  >
                                    {tierOptions.map((option) => (
                                      <option key={option}>{option}</option>
                                    ))}
                                  </select>
                                </div>
                              );
                            }
                          )}
                        </td>
                        <td className="p-1 border-r border-b align-top">
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
                                      if (customBoard) {
                                        setCustomBoardInputs(
                                          categoryId,
                                          subCategoryId,
                                          "duration",
                                          e.target.value
                                        );
                                      } else {
                                        setBoardInputs(
                                          categoryId,
                                          subCategoryId,
                                          "duration",
                                          e.target.value,
                                          null
                                        );
                                      }
                                    }}
                                  >
                                    {durationOptions.map((option) => (
                                      <option key={option}>{option}</option>
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
        {boardData && (
          <button
            onClick={() => handleSaveBoard(tech?.mspCustomDomain)}
            className="hover:bg-blue-500 bg-blue-800 text-white px-6 py-2 rounded-lg "
          >
            SAVE
          </button>
        )}
      </div>
    </div>
  );
};

export default Board;
