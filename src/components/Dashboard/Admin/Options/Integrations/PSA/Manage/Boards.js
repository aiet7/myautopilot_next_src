"use client";

import useManageStore from "@/utils/store/admin/control/integrations/PSA/manageStore";
import useUserStore from "@/utils/store/user/userStore";
import { FaClipboard, FaSpinner } from "react-icons/fa";
import { AiOutlinePlus } from "react-icons/ai";
import { SiOpenai } from "react-icons/si";
import { useEffect } from "react";

const Board = () => {
  const { user } = useUserStore();

  const {
    connectwiseOpenStatuses,
    connectwiseClosedStatuses,
    successMessage,
    errorMessage,
    successMessageCategory,
    errorMessageCategory,
    successMessageSubCategory,
    errorMessageSubCategory,
    successMessageStatus,
    errorMessageStatus,
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
    loadingAiMerge,
    loadingMerge,
    customBoardMerge,
    connectwiseMerge,
    setBoardInputs,
    setCustomBoardInputs,
    setNewCustomCategory,
    setNewCustomSubcategory,
    handleCreateOpenStatus,
    handleCreateClosedStatus,
    handleGenerateAIBoard,
    handleCreateCategory,
    handleCreateSubCategory,
    handleGetBoardDetails,
    handleSaveCustomBoardMetadata,
    handleSaveBoard,
    handleSaveCustomBoard,
  } = useManageStore();

  const boardData = customBoard ? customBoardMerge : connectwiseMerge;

  console.log(boardData)

  useEffect(() => {
    if (
      boardData &&
      boardData.mspConnectWiseManageCategorizations &&
      boardData.prioritiesList
    ) {
      boardData.mspConnectWiseManageCategorizations.forEach((category) => {
        const categoryId = category.categoryId;

        category.mspConnectWiseManageSubCategorizations.forEach(
          (subCategory) => {
            const subCategoryId = subCategory.subCategoryId;

            if (!subCategory.priorityId || subCategory.priorityId === 0) {
              const defaultPriority = boardData.prioritiesList[0];
              setBoardInputs(
                categoryId,
                subCategoryId,
                "priority",
                null,
                defaultPriority.id,
                defaultPriority.name
              );
            }

            if (subCategory.severity === null) {
              const defaultSeverity = "Low" || severityOptions[0];
              setBoardInputs(
                categoryId,
                subCategoryId,
                "severity",
                null,
                defaultSeverity,
                null
              );
            }

            if (subCategory.impact === null) {
              const defaultImpact = "Low" || impactOptions[0];
              setBoardInputs(
                categoryId,
                subCategoryId,
                "impact",
                null,
                defaultImpact,
                null
              );
            }

            if (subCategory.tier === null) {
              const defaultTier = "Tier1" || tierOptions[3];
              setBoardInputs(
                categoryId,
                subCategoryId,
                "tier",
                null,
                defaultTier,
                null
              );
            }

            if (subCategory.durationToResolve === 0) {
              const defaultDuration = 15 || durationOptions["15 Minutes"];
              setBoardInputs(
                categoryId,
                subCategoryId,
                "durationToResolve",
                null,
                defaultDuration,
                null
              );
            }
          }
        );
      });
    }
  }, [loadingMerge]);

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
            id="manageAuthenticated-chooseBoard"
            onChange={(e) =>
              handleGetBoardDetails(e.target.value, user?.mspCustomDomain)
            }
            className="dark:bg-white border rounded-lg shadow-lg p-2 cursor-pointer text-black"
          >
            <option value="" disabled selected>
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
          </select>
          <button
            id="manageAuthenticated-customBoard"
            onClick={() =>
              handleGetBoardDetails("custom", user?.mspCustomDomain)
            }
            className="hover:bg-blue-500 bg-blue-800 text-white px-6 py-2 rounded-md"
          >
            Custom Board
          </button>
          {connectwiseMerge && (
            <button
              id="manageAuthenticated-generateAiBoard"
              onClick={handleGenerateAIBoard}
              className="hover:bg-green-500 flex items-center gap-2 bg-green-600 text-white px-6 py-2 rounded-md"
            >
              <span>
                {loadingAiMerge
                  ? "Generating AI Board..."
                  : "Generate AI Board"}
              </span>
              <SiOpenai size={15} />
            </button>
          )}

          {connectwiseOpenStatuses && (
            <>
              {connectwiseOpenStatuses?.length > 0 ? (
                <select
                  id="manageAuthenticated-openStatus"
                  onChange={(e) => {
                    const selectedOpenStatus = connectwiseOpenStatuses.find(
                      (status) => status.id.toString() === e.target.value
                    );

                    setBoardInputs(
                      null,
                      null,
                      "openStatus",
                      null,
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
              ) : (
                <div className="flex items-center gap-2">
                  <input
                    className="border p-2 rounded"
                    placeholder="Enter Open Status"
                    onChange={(e) =>
                      setBoardInputs(
                        null,
                        null,
                        "openStatus",
                        null,
                        null,
                        e.target.value
                      )
                    }
                  />
                  <button
                    onClick={() =>
                      handleCreateOpenStatus(user?.mspCustomDomain)
                    }
                    className="hover:bg-blue-500 bg-blue-800 text-white px-6 py-2 rounded-md"
                  >
                    Save Open Status
                  </button>
                </div>
              )}
            </>
          )}
          {connectwiseClosedStatuses && (
            <>
              {connectwiseClosedStatuses?.length > 0 ? (
                <select
                  id="manageAuthenticated-closedStatus"
                  onChange={(e) => {
                    const selectedClosedStatus = connectwiseClosedStatuses.find(
                      (status) => status.id.toString() === e.target.value
                    );
                    setBoardInputs(
                      null,
                      null,
                      "closedStatus",
                      null,
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
              ) : (
                <div className="flex items-center gap-2">
                  <input
                    className="border p-2 rounded"
                    placeholder="Enter Closed Status"
                    onChange={(e) =>
                      setBoardInputs(
                        null,
                        null,
                        "closedStatus",
                        null,
                        null,
                        e.target.value
                      )
                    }
                  />
                  <button
                    onClick={() =>
                      handleCreateClosedStatus(user?.mspCustomDomain)
                    }
                    className="hover:bg-blue-500 bg-blue-800 text-white px-6 py-2 rounded-md"
                  >
                    Save Closed Status
                  </button>
                </div>
              )}
            </>
          )}
          {successMessageStatus && (
            <p className="text-emerald-500">Saved Open Status Successfully!</p>
          )}
          {errorMessageStatus && (
            <p className="text-red-500">Error Saving Open Status!</p>
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
              id="manageAuthenticated-customTitle"
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
              id="manageAuthenticated-department"
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
              id="manageAuthenticated-location"
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
              id="manageAuthenticated-saveMetaData"
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
          <div
            id={`${customBoard && "manageAuthenticated-customTemplate"}`}
            className="block text-sm overflow-auto scrollbar-thin  max-h-full max-w-full"
          >
            <table className=" min-w-full table-fixed border-separate border-spacing-0 text-left">
              <thead className="sticky top-0 bg-white text-lg text-black/60">
                <tr className="">
                  <th className="p-2 border-l border-t border-b border-r ">
                    <div
                      id={
                        customBoard
                          ? "manageAuthenticated-customCategory"
                          : "manageAuthenticated-category"
                      }
                      className="flex justify-between items-center"
                    >
                      Category Name
                      <AiOutlinePlus
                        onClick={() => setNewCustomCategory(customBoard)}
                        className="text-black cursor-pointer"
                        size={20}
                      />
                    </div>
                  </th>
                  <th
                    id={
                      customBoard
                        ? "manageAuthenticated-customSubcategory"
                        : "manageAuthenticated-subcategory"
                    }
                    className="p-2 border-t border-b border-r"
                  >
                    Sub-Categorizations
                  </th>
                  {!customBoard && (
                    <>
                      <th
                        id="manageAuthenticated-priority"
                        className="p-2 border-t border-b border-r"
                      >
                        Priority
                      </th>
                      <th
                        id="manageAuthenticated-severity"
                        className="p-2 border-t border-b border-r"
                      >
                        Severity
                      </th>
                      <th
                        id="manageAuthenticated-impact"
                        className="p-2 border-t border-b border-r"
                      >
                        Impact
                      </th>
                      <th
                        id="manageAuthenticated-tier"
                        className="p-2 border-t border-b border-r"
                      >
                        Tier
                      </th>
                      <th
                        id="manageAuthenticated-duration"
                        className="p-2 border-t border-b border-r"
                      >
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
                      isNew,
                      tempIndex,
                    } = category;
                    return (
                      <tr key={categoryId}>
                        <td className="p-2 truncate border-l border-r border-b align-top">
                          {customBoard || isNew ? (
                            <div className="flex items-center gap-1">
                              <input
                                type="text"
                                placeholder={categoryName}
                                onChange={(e) => {
                                  customBoard
                                    ? setCustomBoardInputs(
                                        categoryId,
                                        null,
                                        "categoryName",
                                        e.target.value,
                                        null,
                                        null
                                      )
                                    : setBoardInputs(
                                        categoryId,
                                        null,
                                        "categoryName",
                                        e.target.value,
                                        null,
                                        null
                                      );
                                }}
                              />
                              {!customBoard && (
                                <button
                                  onClick={() =>
                                    handleCreateCategory(
                                      user?.mspCustomDomain,
                                      tempIndex
                                    )
                                  }
                                  className="hover:bg-blue-500 bg-blue-800 text-white px-2 py-1rounded-lg "
                                >
                                  Save
                                </button>
                              )}
                            </div>
                          ) : (
                            categoryName
                          )}
                        </td>
                        <td className="p-2 truncate border-r border-b align-top">
                          {mspConnectWiseManageSubCategorizations.map(
                            (subCat) => {
                              const {
                                subCategoryId,
                                subCategoryName,
                                isNew,
                                tempIndex,
                              } = subCat;
                              return (
                                <div key={subCategoryId}>
                                  {customBoard || isNew ? (
                                    <div className="flex items-center gap-1">
                                      <input
                                        type="text"
                                        placeholder={subCategoryName}
                                        onChange={(e) => {
                                          customBoard
                                            ? setCustomBoardInputs(
                                                categoryId,
                                                subCategoryId,
                                                "subCategoryName",
                                                e.target.value,
                                                null,
                                                null
                                              )
                                            : setBoardInputs(
                                                categoryId,
                                                subCategoryId,
                                                "subCategoryName",
                                                e.target.value,
                                                null,
                                                null
                                              );
                                        }}
                                      />
                                      {!customBoard && (
                                        <button
                                          onClick={() =>
                                            handleCreateSubCategory(
                                              user?.mspCustomDomain,
                                              tempIndex,
                                              categoryId
                                            )
                                          }
                                          className="hover:bg-blue-500 bg-blue-800 text-white px-2 py-1 rounded-lg "
                                        >
                                          Save
                                        </button>
                                      )}
                                    </div>
                                  ) : (
                                    <p>{subCategoryName}</p>
                                  )}
                                </div>
                              );
                            }
                          )}

                          <AiOutlinePlus
                            size={20}
                            className="cursor-pointer mt-1"
                            onClick={() =>
                              setNewCustomSubcategory(categoryId, customBoard)
                            }
                          />
                        </td>
                        {!customBoard && (
                          <>
                            <td className="p-1 border-r border-b align-top">
                              {mspConnectWiseManageSubCategorizations.map(
                                (subCat) => {
                                  const { subCategoryId, priorityId } = subCat;

                                  return (
                                    <div
                                      key={subCategoryId}
                                      className="flex flex-col"
                                    >
                                      <select
                                        value={priorityId}
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
                                              null,
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
                                  const { subCategoryId, severity } = subCat;
                                  return (
                                    <div
                                      key={subCategoryId}
                                      className="flex flex-col"
                                    >
                                      <select
                                        value={severity}
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
                                              null,
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
                                  const { subCategoryId, impact } = subCat;
                                  return (
                                    <div
                                      key={subCategoryId}
                                      className="flex flex-col"
                                    >
                                      <select
                                        value={impact}
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
                                              null,
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
                                  const { subCategoryId, tier } = subCat;
                                  return (
                                    <div
                                      key={subCategoryId}
                                      className="flex flex-col"
                                    >
                                      <select
                                        value={tier}
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
                                              null,
                                              e.target.value,
                                              null
                                            );
                                          }
                                        }}
                                      >
                                        {tierOptions.map((option) => (
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
                                  const { subCategoryId, durationToResolve } =
                                    subCat;
                                  const durationKey = Object.keys(
                                    durationOptions
                                  ).find(
                                    (key) =>
                                      durationOptions[key] === durationToResolve
                                  );
                                  return (
                                    <div
                                      key={subCategoryId}
                                      className="flex flex-col"
                                    >
                                      <select
                                        value={durationKey}
                                        onChange={(e) => {
                                          if (customBoard) {
                                            setCustomBoardInputs(
                                              categoryId,
                                              subCategoryId,
                                              "durationToResolve",
                                              e.target.value,
                                              null,
                                              null
                                            );
                                          } else {
                                            setBoardInputs(
                                              categoryId,
                                              subCategoryId,
                                              "durationToResolve",
                                              null,
                                              durationOptions[e.target.value],
                                              null
                                            );
                                          }
                                        }}
                                      >
                                        {Object.keys(durationOptions).map(
                                          (option) => (
                                            <option key={option} value={option}>
                                              {option}
                                            </option>
                                          )
                                        )}
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
      <div className="flex items-center justify-between ">
        <div>
          {successMessageCategory && (
            <p className="text-emerald-500">Saved Category Successfully!</p>
          )}
          {errorMessageCategory && (
            <p className="text-red-500">Error Saving Board</p>
          )}
          {successMessageSubCategory && (
            <p className="text-emerald-500">Saved Category Successfully!</p>
          )}
          {errorMessageSubCategory && (
            <p className="text-red-500">Error Saving Board</p>
          )}
        </div>
        <div className="flex items-center gap-2 self-end ">
          {successMessage && customBoard && (
            <p className="text-emerald-500">Custom Board Saved!</p>
          )}
          {errorMessage && <p className="text-red-500">Error Saving Board</p>}
          {boardData && (
            <button
              id={
                customBoard
                  ? "manageAuthenticated-customSaveCustomBoard"
                  : "manageAuthenticated-saveBoard"
              }
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
    </div>
  );
};

export default Board;
