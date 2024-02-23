"use client";

import useManageStore from "@/utils/store/admin/control/integrations/PSA/manageStore";
import useUserStore from "@/utils/store/user/userStore";
import { FaClipboard, FaSpinner } from "react-icons/fa";
import { AiOutlinePlus } from "react-icons/ai";

const Board = () => {
  const { user } = useUserStore();

  const {
    connectwiseOpenStatuses,
    connectwiseClosedStatuses,
    successMessage,
    errorMessage,
    severityOptions,
    impactOptions,
    tierOptions,
    durationOptions,
    activeBoard,
    customBoardTitle,
    customBoardLocation,
    customBoardDepartment,
    customBoardMetadata,
    customBoard,
    connectwiseBoards,
    loadingMerge,
    customBoardMerge,
    connectwiseMerge,
    setBoardInputs,
    setCustomBoardInputs,
    setNewCustomCategory,
    setNewCustomSubcategory,
    handleGetBoardDetails,
    handleSaveCustomBoardMetadata,
    handleSaveBoard,
    handleSaveCustomBoard,
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
        ) : customBoard || customBoardMetadata ? (
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
        <div className="flex flex-wrap gap-2 items-center text-xs ">
          <select
            onChange={(e) =>
              handleGetBoardDetails(e.target.value, user?.mspCustomDomain)
            }
            className="border rounded-lg shadow-lg p-2 cursor-pointer text-black"
          >
            <option value="Select Board" disabled selected>
              Select Board
            </option>

            {connectwiseBoards &&
              connectwiseBoards.map((board) => {
                const { id, name } = board;
                return (
                  <option
                    key={id}
                    value={id}
                    className={`${
                      activeBoard === id ? "bg-blue-800 text-white" : ""
                    }`}
                  >
                    {name}
                  </option>
                );
              })}
            <option value="custom">Custom</option>
          </select>
          {connectwiseOpenStatuses && (
            <select
              onChange={(e) => {
                const selectedOpenStatus = connectwiseOpenStatuses.find(
                  (status) => status.id.toString() === e.target.value
                );

                setBoardInputs(
                  null,
                  null,
                  "openStatus",
                  selectedOpenStatus.id,
                  selectedOpenStatus.name
                );
              }}
              className="border rounded-lg shadow-lg p-2 cursor-pointer text-black"
            >
              <option value="Select Open Status" disabled selected>
                Select Open Status
              </option>
              {connectwiseOpenStatuses.map((open) => {
                const { id, name } = open;
                return (
                  <option value={id} key={id}>
                    {name}
                  </option>
                );
              })}
            </select>
          )}
          {connectwiseClosedStatuses && (
            <select
              onChange={(e) => {
                const selectedClosedStatus = connectwiseClosedStatuses.find(
                  (status) => status.id.toString() === e.target.value
                );
                setBoardInputs(
                  null,
                  null,
                  "closedStatus",
                  selectedClosedStatus.id,
                  selectedClosedStatus.name
                );
              }}
              className="border rounded-lg shadow-lg p-2 cursor-pointer text-black"
            >
              <option value="Select Closed Status" disabled selected>
                Select Closed Status
              </option>
              {connectwiseClosedStatuses.map((closed) => {
                const { id, name } = closed;
                return (
                  <option value={id} key={id}>
                    {name}
                  </option>
                );
              })}
            </select>
          )}
        </div>
      )}

      {customBoardMetadata && (
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {customBoard ? (
            <div className="flex items-center gap-1 text-sm">
              <h2 className="font-bold">Title:</h2>
              <p>{customBoardTitle}</p>
            </div>
          ) : (
            <input
              className="border p-2 rounded"
              placeholder="Enter Board Title"
              onChange={(e) =>
                setCustomBoardInputs(
                  null,
                  null,
                  "boardTitle",
                  e.target.value,
                  null,
                  null
                )
              }
            />
          )}
          {customBoard ? (
            <div className="flex items-center gap-1 text-sm">
              <h2 className="font-bold">Department:</h2>
              <p>{customBoardDepartment?.name}</p>
            </div>
          ) : (
            <select
              onChange={(e) => {
                const selectedDepartment =
                  customBoardMerge.departmentsList.find(
                    (department) => department.id.toString() === e.target.value
                  );

                setCustomBoardInputs(
                  null,
                  null,
                  "department",
                  null,
                  selectedDepartment.id,
                  selectedDepartment.name
                );
              }}
              className="border rounded-lg shadow-lg p-2 cursor-pointer text-black"
            >
              <option value="" disabled selected>
                Select Department
              </option>

              {customBoardMerge &&
                customBoardMerge.departmentsList.map((department) => {
                  const { id, name } = department;
                  return (
                    <option value={id} key={id}>
                      {name}
                    </option>
                  );
                })}
            </select>
          )}
          {customBoard ? (
            <div className="flex items-center gap-1 text-sm">
              <h2 className="font-bold">Location:</h2>
              <p>{customBoardLocation?.name}</p>
            </div>
          ) : (
            <select
              onChange={(e) => {
                const selectedLocation = customBoardMerge.locationsList.find(
                  (location) => location.id.toString() === e.target.value
                );

                setCustomBoardInputs(
                  null,
                  null,
                  "location",
                  null,
                  selectedLocation.id,
                  selectedLocation.name
                );
              }}
              className="border rounded-lg shadow-lg p-2 cursor-pointer text-black"
            >
              <option value="" disabled selected>
                Select Location
              </option>

              {customBoardMerge &&
                customBoardMerge.locationsList.map((location) => {
                  const { id, name } = location;
                  return (
                    <option value={id} key={id}>
                      {name}
                    </option>
                  );
                })}
            </select>
          )}
          {!customBoard && (
            <button
              onClick={() =>
                handleSaveCustomBoardMetadata(user?.mspCustomDomain)
              }
              className="hover:bg-blue-500 bg-blue-800 text-white px-6 py-2 rounded-lg "
            >
              SAVE METADATA
            </button>
          )}
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
                      {customBoard && (
                        <AiOutlinePlus
                          onClick={setNewCustomCategory}
                          className="text-black cursor-pointer"
                          size={20}
                        />
                      )}
                    </div>
                  </th>
                  <th className="p-2 border-t border-b border-r">
                    Sub-Categorizations
                  </th>
                  {!customBoard && (
                    <>
                      <th className="p-2 border-t border-b border-r">
                        Priority
                      </th>
                      <th className="p-2 border-t border-b border-r">
                        Severity
                      </th>
                      <th className="p-2 border-t border-b border-r">Impact</th>
                      <th className="p-2 border-t border-b border-r">Tier</th>
                      <th className="p-2 border-t border-b border-r">
                        Duration
                      </th>
                    </>
                  )}
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
                                  e.target.value,
                                  null,
                                  null
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
                                          e.target.value,
                                          null,
                                          null
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
                              onClick={() =>
                                setNewCustomSubcategory(categoryId)
                              }
                            />
                          )}
                        </td>
                        {!customBoard && (
                          <>
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
                                              selectedPriority.name,
                                              null,
                                              null
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
                                              e.target.value,
                                              null,
                                              null
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
                                              e.target.value,
                                              null,
                                              null
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
                                              e.target.value,
                                              null,
                                              null
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
                                              e.target.value,
                                              null,
                                              null
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
                          </>
                        )}
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
            onClick={() =>
              customBoard
                ? handleSaveCustomBoard(user?.mspCustomDomain)
                : handleSaveBoard(user?.mspCustomDomain)
            }
            className="hover:bg-blue-500 bg-blue-800 text-white px-6 py-2 rounded-lg "
          >
            {customBoard ? "Save Custom Board" : "Save Board"}
          </button>
        )}
      </div>
    </div>
  );
};

export default Board;
