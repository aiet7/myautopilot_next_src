"use client";

import useManageStore from "@/utils/store/admin/control/integrations/PSA/manageStore";
import useUserStore from "@/utils/store/user/userStore";
import { FaClipboard, FaSpinner } from "react-icons/fa";
import { AiOutlinePlus } from "react-icons/ai";

const Board = () => {
  const { user } = useUserStore();

  const {
    connectwiseDefaultPriorites,
    connectwiseOpenStatuses,
    connectwiseClosedStatuses,
    successMessage,
    errorMessage,
    successMessageCategory,
    errorMessageCategory,
    successMessageSubCategory,
    errorMessageSubCategory,
    successMessageOpenStatus,
    errorMessageOpenStatus,
    successMessageClosedStatus,
    errorMessageClosedStatus,
    tierOptions,
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
    handleCreateCategory,
    handleCreateSubCategory,
    handleGetBoardDetails,
    handleSaveCustomBoardMetadata,
    handleSaveBoard,
    handleSaveCustomBoard,
  } = useManageStore();

  const boardData = customBoard ? customBoardMerge : connectwiseMerge;
 
  // useEffect(() => {
  //   if (
  //     boardData &&
  //     boardData.connectWiseConfig &&
  //     boardData.connectWiseConfig.boardDetails[0].mspConnectWiseBoardTypes
  //   ) {
  //     boardData.connectWiseConfig.boardDetails[0].mspConnectWiseBoardTypes.forEach(
  //       (type) => {
  //         const categoryId = type.typeId;

  //         type.mspConnectWiseBoardSubTypes.forEach((subType) => {
  //           const subCategoryId = subType.subTypeId;

  //           if (!subType.priorityId || subType.priorityId === 0) {
  //             const defaultPriority = connectwiseDefaultPriorites;
  //             setBoardInputs(
  //               categoryId,
  //               subCategoryId,
  //               "priority",
  //               null,
  //               defaultPriority.id,
  //               defaultPriority.name
  //             );
  //           }

  //           if (subType.tier === null) {
  //             const defaultTier = "Tier1" || tierOptions[3];
  //             setBoardInputs(
  //               categoryId,
  //               subCategoryId,
  //               "tier",
  //               null,
  //               defaultTier,
  //               null
  //             );
  //           }

  //           if (subType.slaDeadlineInHours === 0) {
  //             const defaultDuration = 15 || durationOptions["15 Minutes"];
  //             setBoardInputs(
  //               categoryId,
  //               subCategoryId,
  //               "slaDeadlineInHours",
  //               null,
  //               defaultDuration,
  //               null
  //             );
  //           }
  //         });
  //       }
  //     );
  //   }
  // }, [loadingMerge]);

  return (
    <div className="flex flex-col gap-4 h-full overflow-hidden relative">
      <div className="flex flex-col gap-8  justify-between items-start text-lg font-semibold italic text-black/30 md:flex-row">
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
            onChange={(e) => {
              const selectedBoard = connectwiseBoards.find(
                (board) => board.id === Number(e.target.value)
              );
              handleGetBoardDetails(
                e.target.value,
                selectedBoard?.name,
                user?.mspCustomDomain
              );
            }}
            className="dark:bg-white border rounded-lg shadow-lg p-2 cursor-pointer text-black"
          >
            <option value="" disabled selected>
              Select Board
            </option>

            {connectwiseBoards &&
              connectwiseBoards.map((board) => {
                const { id, name } = board;
                return (
                  <option key={id} value={id}>
                    {name}
                  </option>
                );
              })}
          </select>
          {/* <button
            id="manageAuthenticated-customBoard"
            onClick={() =>
              handleGetBoardDetails("custom", user?.mspCustomDomain)
            }
            className="hover:bg-blue-500 bg-blue-800 text-white px-6 py-2 rounded-md"
          >
            Custom Board
          </button> */}
          {/* {connectwiseMerge && (
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
          )} */}

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
                      "newCreatingTicketStatus",
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
                        "newCreatingTicketStatus",
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
                    className="hover:bg-blue-500 bg-blue-800 text-white px-6 py-2 rounded"
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
                      "closingTicketStatus",
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
                        "closingTicketStatus",
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
                    className="hover:bg-blue-500 bg-blue-800 text-white px-6 py-2 rounded"
                  >
                    Save Closed Status
                  </button>
                </div>
              )}
            </>
          )}
          {successMessageOpenStatus && (
            <p className="text-emerald-500">Saved Open Status Successfully!</p>
          )}
          {errorMessageOpenStatus && (
            <p className="text-red-500">Error Saving Open Status!</p>
          )}
          {successMessageClosedStatus && (
            <p className="text-emerald-500">
              Saved Closed Status Successfully!
            </p>
          )}
          {errorMessageClosedStatus && (
            <p className="text-red-500">Error Saving Closed Status!</p>
          )}
        </div>
      )}

      {customBoardMetadata && (
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {customBoard ? (
            <div className="flex items-center gap-1 ">
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
            <div className="flex items-center gap-1">
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
            <div className="flex items-center gap-1 ">
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
      <div className="flex flex-col  overflow-hidden">
        {boardData &&
          boardData.connectWiseConfig &&
          boardData.connectWiseConfig.boardDetails[0]
            .mspConnectWiseBoardTypes && (
            <div
              id={`${customBoard && "manageAuthenticated-customTemplate"}`}
              className="block text-sm overflow-auto scrollbar-thin  max-h-full max-w-full"
            >
              <table className=" min-w-full table-fixed border-separate border-spacing-0 text-left">
                <thead className="sticky top-0  text-black/60 bg-[#F5F8FA]">
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
                        Type Name
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
                      Sub-Type
                    </th>
                    <th
                      id={
                        customBoard
                          ? "manageAuthenticated-customSubcategory"
                          : "manageAuthenticated-subcategory"
                      }
                      className="p-2 border-t border-b border-r"
                    >
                      Sub-Type Score
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
                          id="manageAuthenticated-priority"
                          className="p-2 border-t border-b border-r"
                        >
                          Priority Score
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
                          SLA
                        </th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {boardData.connectWiseConfig.boardDetails[0].mspConnectWiseBoardTypes.map(
                    (type) => {
                      const {
                        typeId,
                        typeName,
                        mspConnectWiseBoardSubTypes,
                        isNew,
                        tempIndex,
                      } = type;
                      return (
                        <tr key={typeId}>
                          <td className="p-2 truncate border-l border-r border-b align-top">
                            {customBoard || isNew ? (
                              <div className="flex items-center gap-1">
                                <input
                                  className="border p-1 w-full"
                                  type="text"
                                  placeholder={typeName}
                                  onChange={(e) => {
                                    customBoard
                                      ? setCustomBoardInputs(
                                          typeId,
                                          null,
                                          "typeName",
                                          e.target.value,
                                          null,
                                          null
                                        )
                                      : setBoardInputs(
                                          typeId,
                                          null,
                                          "typeName",
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
                                    className="hover:bg-blue-500 bg-blue-800 text-white px-2 py-1 rounded"
                                  >
                                    Save
                                  </button>
                                )}
                              </div>
                            ) : (
                              typeName
                            )}
                          </td>
                          <td className="p-2 truncate border-r border-b align-top">
                            {mspConnectWiseBoardSubTypes.map((subType) => {
                              const {
                                subTypeId,
                                subTypeName,
                                isNew,
                                tempIndex,
                              } = subType;
                              return (
                                <div key={subTypeId}>
                                  {customBoard || isNew ? (
                                    <div className="flex items-center gap-1">
                                      <input
                                        className="border p-1"
                                        type="text"
                                        placeholder={subTypeName}
                                        onChange={(e) => {
                                          customBoard
                                            ? setCustomBoardInputs(
                                                typeId,
                                                subTypeId,
                                                "subTypeName",
                                                e.target.value,
                                                null,
                                                null
                                              )
                                            : setBoardInputs(
                                                typeId,
                                                subTypeId,
                                                "subTypeName",
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
                                              typeId
                                            )
                                          }
                                          className="hover:bg-blue-500 bg-blue-800 text-white px-2 py-1 rounded"
                                        >
                                          Save
                                        </button>
                                      )}
                                    </div>
                                  ) : (
                                    <p>{subTypeName}</p>
                                  )}
                                </div>
                              );
                            })}

                            <AiOutlinePlus
                              size={20}
                              className="cursor-pointer mt-1"
                              onClick={() =>
                                setNewCustomSubcategory(typeId, customBoard)
                              }
                            />
                          </td>
                          <td className="p-1 border-r border-b align-top">
                            {mspConnectWiseBoardSubTypes.map((subType) => {
                              const { subTypeId, subTypeScore } = subType;

                              return (
                                <div key={subTypeId}>
                                  <input
                                    className="border px-1 w-full"
                                    type="number"
                                    min="1"
                                    max="100"
                                    step="1"
                                    value={subTypeScore || ""}
                                    onInput={(e) => {
                                      const newValue = e.target.value;

                                      if (
                                        newValue === "" ||
                                        (newValue >= 1 &&
                                          newValue <= 100 &&
                                          /^[0-9]+$/.test(newValue))
                                      ) {
                                        customBoard
                                          ? setCustomBoardInputs(
                                              typeId,
                                              subTypeId,
                                              "subTypeScore",
                                              newValue,
                                              null,
                                              null
                                            )
                                          : setBoardInputs(
                                              typeId,
                                              subTypeId,
                                              "subTypeScore",
                                              newValue,
                                              null,
                                              null
                                            );
                                      }
                                    }}
                                  />
                                </div>
                              );
                            })}
                          </td>
                          {!customBoard && (
                            <>
                              <td className="p-1 border-r border-b align-top">
                                {mspConnectWiseBoardSubTypes.map((subType) => {
                                  const { subTypeId, priorityId } = subType;

                                  return (
                                    <div
                                      key={subTypeId}
                                      className="flex flex-col"
                                    >
                                      <select
                                        value={priorityId}
                                        onChange={(e) => {
                                          const selectedPriority =
                                            connectwiseDefaultPriorites.find(
                                              (priority) =>
                                                priority.id ===
                                                parseInt(e.target.value)
                                            );
                                          if (customBoard) {
                                            setCustomBoardInputs(
                                              typeId,
                                              subTypeId,
                                              "priority",
                                              selectedPriority.name,
                                              null,
                                              null
                                            );
                                          } else {
                                            setBoardInputs(
                                              typeId,
                                              subTypeId,
                                              "priority",
                                              null,
                                              selectedPriority.id,
                                              selectedPriority.name
                                            );
                                          }
                                        }}
                                      >
                                        {connectwiseDefaultPriorites?.map(
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
                                })}
                              </td>
                              <td className="p-1 border-r border-b align-top">
                                {mspConnectWiseBoardSubTypes.map((subType) => {
                                  const { subTypeId, priorityScore } = subType;

                                  return (
                                    <div key={subTypeId}>
                                      <input
                                        className="border px-1 w-full"
                                        type="number"
                                        min="1"
                                        max="100"
                                        step="1"
                                        value={priorityScore || ""}
                                        onInput={(e) => {
                                          const newValue = e.target.value;

                                          if (
                                            newValue === "" ||
                                            (newValue >= 1 &&
                                              newValue <= 100 &&
                                              /^[0-9]+$/.test(newValue))
                                          ) {
                                            customBoard
                                              ? setCustomBoardInputs(
                                                  typeId,
                                                  subTypeId,
                                                  "priorityScore",
                                                  newValue,
                                                  null,
                                                  null
                                                )
                                              : setBoardInputs(
                                                  typeId,
                                                  subTypeId,
                                                  "priorityScore",
                                                  newValue,
                                                  null,
                                                  null
                                                );
                                          }
                                        }}
                                      />
                                    </div>
                                  );
                                })}
                              </td>{" "}
                              <td className="p-1 border-r border-b align-top">
                                {mspConnectWiseBoardSubTypes.map((subType) => {
                                  const { subTypeId, tier } = subType;
                                  return (
                                    <div
                                      key={subTypeId}
                                      className="flex flex-col"
                                    >
                                      <select
                                        value={tier}
                                        onChange={(e) => {
                                          if (customBoard) {
                                            setCustomBoardInputs(
                                              typeId,
                                              subTypeId,
                                              "tier",
                                              e.target.value,
                                              null,
                                              null
                                            );
                                          } else {
                                            setBoardInputs(
                                              typeId,
                                              subTypeId,
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
                                })}
                              </td>
                              <td className="p-1 border-r border-b align-top">
                                {mspConnectWiseBoardSubTypes.map((subType) => {
                                  const { subTypeId, slaDeadLineInHours } =
                                    subType;
                                  const minHours = 1;
                                  const maxHours = 72;
                                  const step = 1;

                                  return (
                                    <div
                                      key={subTypeId}
                                      className="flex items-center gap-2 w-3/4 flex-nowrap"
                                    >
                                      <input
                                        type="range"
                                        min={minHours}
                                        max={maxHours}
                                        step={step}
                                        value={slaDeadLineInHours || minHours}
                                        onChange={(e) => {
                                          const newValue = Number(
                                            e.target.value
                                          );
                                          if (customBoard) {
                                            setCustomBoardInputs(
                                              typeId,
                                              subTypeId,
                                              "slaDeadLineInHours",
                                              newValue,
                                              null,
                                              null
                                            );
                                          } else {
                                            setBoardInputs(
                                              typeId,
                                              subTypeId,
                                              "slaDeadLineInHours",
                                              null,
                                              newValue,
                                              null
                                            );
                                          }
                                        }}
                                        className="w-full cursor-pointer accent-blue-500 "
                                      />
                                      <span className="text-sm whitespace-nowrap">
                                        {slaDeadLineInHours || minHours} Hours
                                      </span>
                                    </div>
                                  );
                                })}
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
              className=" self-end bg-blue-800 text-white font-bold px-5 rounded py-2"
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
