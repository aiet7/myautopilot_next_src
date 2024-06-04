"use client";
import useQueueStore from "@/utils/store/interaction/queue/useQueueStore";
import Troubleshoot from "../../Forms/Ticket/Troubleshoot";
import useUserStore from "@/utils/store/user/userStore";
import Input from "../../Input";

const QueueManagment = () => {
  const { user } = useUserStore();
  const {
    editTicket,
    ticketRequeued,
    ticketClosed,
    severityOptions,
    impactOptions,
    tierOptions,
    editingMyQueueTicket,
    myQueueTicket,
    isMobile,
    activeSectionButton,
    setActiveSectionButton,
    setEditTicket,
    setCancelEdit,
    handleNextQueueTicket,
    handleRequeueTicket,
    handleCloseTicket,
    handleEditTicket,
    handleSaveTicket,
  } = useQueueStore();

  return (
    <div className={`${isMobile ? "flex-col" : "flex-row"} flex `}>
      {isMobile ? (
        <>
          <div className="dark:border-white/20 flex items-center border rounded w-full">
            <button
              onClick={() => setActiveSectionButton("Form")}
              className={`${
                activeSectionButton === "Form" && "bg-blue-800 text-white"
              } w-full rounded p-2`}
            >
              Form
            </button>
            <button
              onClick={() => setActiveSectionButton("Troubleshoot")}
              className={`${
                activeSectionButton === "Troubleshoot" &&
                "bg-blue-800 text-white"
              } w-full rounded p-2`}
            >
              Troubleshoot
            </button>
          </div>
          <div className="w-full">
            {activeSectionButton === "Form" && (
              <div className="flex-1">
                <div className="flex  flex-col gap-2">
                  <div>
                    <div>
                      <span className="font-bold">Score</span>
                      <input
                        value={myQueueTicket?.compositeScore.toFixed(2) || ""}
                        className="h-[50px] border outline-blue-500 w-full px-4"
                        readOnly
                      />
                    </div>
                    <div>
                      <span className="font-bold">Ticket ID</span>
                      <input
                        value={myQueueTicket?.ticketId || ""}
                        className="h-[50px] border outline-blue-500 w-full px-4"
                        readOnly
                      />
                    </div>
                    <div>
                      <span className="font-bold">Description</span>
                      <textarea
                        value={myQueueTicket?.description || ""}
                        maxLength={100}
                        className="h-[50px] border outline-blue-500 w-full px-4"
                        readOnly
                      />
                    </div>
                    <div>
                      <span className="font-bold">Tier</span>
                      <input
                        value={myQueueTicket?.tier || ""}
                        disabled
                        className="h-[50px] border outline-blue-500 w-full px-4"
                      />
                    </div>
                    <div>
                      <span className="font-bold">Assigned Technician</span>
                      <input
                        value={myQueueTicket?.assignedTech || ""}
                        className="h-[50px] border outline-blue-500 w-full px-4"
                        readOnly
                      />
                    </div>

                    <div>
                      <span className="font-bold">Date Created</span>
                      <p>
                        {new Date(
                          myQueueTicket?.creationTime
                        ).toLocaleDateString() +
                          " " +
                          new Date(
                            myQueueTicket?.creationTime
                          ).toLocaleTimeString()}
                      </p>
                    </div>
                    {myQueueTicket?.holdUntil && (
                      <div>
                        <span className="font-bold">
                          Hold Until {myQueueTicket?.holdUntil}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex w-full justify-between my-4">
                  <button
                    onClick={() =>
                      handleNextQueueTicket(
                        user?.mspCustomDomain,
                        user?.tierLevel,
                        user?.id
                      )
                    }
                    className="hover:bg-blue-500 border border-white/30 bg-blue-800 w-[150px] py-1 text-white"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
            {activeSectionButton === "Troubleshoot" && <Troubleshoot />}
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col w-full">
            <div className="flex gap-16">
              <div className="flex-1 max-h-[800px] overflow-auto scrollbar-thin px-2">
                <div className="flex  flex-col gap-2 ">
                  <div>
                    <div>
                      <span className="font-bold">Score</span>
                      <input
                        value={myQueueTicket?.compositeScore.toFixed(2) || ""}
                        className="h-[50px] border outline-blue-500 w-full px-4"
                        readOnly
                      />
                    </div>
                    <div>
                      <span className="font-bold">Ticket ID</span>
                      <input
                        value={myQueueTicket?.ticketId || ""}
                        className="h-[50px] border outline-blue-500 w-full px-4"
                        readOnly
                      />
                    </div>
                    <div>
                      <span className="font-bold">Description</span>
                      <textarea
                        value={
                          editTicket
                            ? editingMyQueueTicket?.description
                            : myQueueTicket?.description
                        }
                        maxLength={100}
                        className="max-h-[200px] min-h-[100px] border outline-blue-500 w-full px-4"
                        readOnly={!editTicket}
                        onChange={(e) => {
                          if (editTicket) {
                            setEditTicket({ description: e.target.value });
                          }
                        }}
                      />
                    </div>
                    <div>
                      <span className="font-bold">Category</span>
                      {editTicket ? (
                        <select
                          className="h-[50px] border outline-blue-500 w-full px-4"
                          value={editingMyQueueTicket?.categoryId || ""}
                          onChange={(e) => {
                            const categoryId = parseInt(e.target.value, 10);
                            const category =
                              editingMyQueueTicket?.categories?.find(
                                (category) => category.categoryId === categoryId
                              );
                            setEditTicket({
                              categoryId: categoryId,
                              categoryName: category?.categoryName,
                              subCategoryId: null,
                              subCategories:
                                category?.mspConnectWiseManageSubCategorizations ||
                                [],
                            });
                          }}
                        >
                          {editingMyQueueTicket?.categories?.map((category) => (
                            <option
                              key={category.categoryId}
                              value={category.categoryId}
                            >
                              {category.categoryName}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          disabled
                          className="h-[50px] border outline-blue-500 w-full px-4"
                          value={myQueueTicket?.categoryName || ""}
                        />
                      )}
                    </div>
                    <div>
                      <span className="font-bold">Subcategory</span>
                      {editTicket ? (
                        <select
                          className="h-[50px] border outline-blue-500 w-full px-4"
                          value={editingMyQueueTicket?.subCategoryId || ""}
                          onChange={(e) => {
                            const subCategoryId = parseInt(e.target.value, 10);
                            const subCategory =
                              editingMyQueueTicket?.subCategories.find(
                                (sub) => sub.subCategoryId === subCategoryId
                              );
                            setEditTicket({
                              subCategoryId: subCategoryId,
                              subCategoryName: subCategory?.subCategoryName,
                              priority: subCategory?.priority,
                              priorityId: subCategory?.priorityId,
                              impact: subCategory?.impact,
                              severity: subCategory?.severity,
                              tier: subCategory?.tier,
                              durationToResolve: subCategory?.durationToResolve,
                            });
                          }}
                        >
                          {editingMyQueueTicket?.categoryId &&
                            editingMyQueueTicket?.subCategories.map(
                              (subCategory) => (
                                <option
                                  key={subCategory.subCategoryId}
                                  value={subCategory.subCategoryId}
                                >
                                  {subCategory.subCategoryName}
                                </option>
                              )
                            )}
                        </select>
                      ) : (
                        <input
                          disabled
                          className="h-[50px] border outline-blue-500 w-full px-4"
                          value={myQueueTicket?.subCategoryName || ""}
                        />
                      )}
                    </div>

                    <div>
                      <span className="font-bold">Priority</span>
                      {editTicket ? (
                        <select
                          className="h-[50px] border outline-blue-500 w-full px-4"
                          value={editingMyQueueTicket?.priorityId || ""}
                          onChange={(e) => {
                            const priorityId = parseInt(e.target.value, 10);
                            const priority =
                              editingMyQueueTicket?.priorities.find(
                                (p) => p.id === priorityId
                              );
                            setEditTicket({
                              priorityId: priorityId,
                              priority: priority?.name,
                            });
                          }}
                        >
                          {editingMyQueueTicket?.priorities.map((priority) => (
                            <option key={priority.id} value={priority.id}>
                              {priority.name}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          disabled
                          className="h-[50px] border outline-blue-500 w-full px-4"
                          value={myQueueTicket?.priority || ""}
                        />
                      )}
                    </div>
                    <div>
                      <span className="font-bold">Impact</span>
                      {editTicket ? (
                        <select
                          className="h-[50px] border outline-blue-500 w-full px-4"
                          value={editingMyQueueTicket?.impact || ""}
                          onChange={(e) => {
                            setEditTicket({ impact: e.target.value });
                          }}
                        >
                          {impactOptions.map((impact) => (
                            <option key={impact} value={impact}>
                              {impact}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          disabled
                          className="h-[50px] border outline-blue-500 w-full px-4"
                          value={myQueueTicket?.impact || ""}
                        />
                      )}
                    </div>
                    <div>
                      <span className="font-bold">Severity</span>
                      {editTicket ? (
                        <select
                          className="h-[50px] border outline-blue-500 w-full px-4"
                          value={editingMyQueueTicket?.severity || ""}
                          onChange={(e) =>
                            setEditTicket({ severity: e.target.value })
                          }
                        >
                          {severityOptions.map((severity) => (
                            <option key={severity} value={severity}>
                              {severity}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          disabled
                          className="h-[50px] border outline-blue-500 w-full px-4"
                          value={myQueueTicket?.severity || ""}
                        />
                      )}
                    </div>
                    <div>
                      <span className="font-bold">Tier</span>
                      {editTicket ? (
                        <select
                          className="h-[50px] border outline-blue-500 w-full px-4"
                          value={editingMyQueueTicket?.tier || ""}
                          onChange={(e) =>
                            setEditTicket({ tier: e.target.value })
                          }
                        >
                          {tierOptions.map((tier) => (
                            <option key={tier} value={tier}>
                              {tier}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          disabled
                          className="h-[50px] border outline-blue-500 w-full px-4"
                          value={myQueueTicket?.tier || ""}
                        />
                      )}
                    </div>
                    <div>
                      <span className="font-bold">Status</span>
                      {editTicket ? (
                        <select
                          className="h-[50px] border outline-blue-500 w-full px-4"
                          value={editingMyQueueTicket?.statusId || ""}
                          onChange={(e) => {
                            const statusId = parseInt(e.target.value, 10);
                            const status = editingMyQueueTicket?.statuses.find(
                              (s) => s.id === statusId
                            );
                            setEditTicket({
                              statusId: statusId,
                              status: status?.name,
                            });
                          }}
                        >
                          {editingMyQueueTicket?.statuses.map((status) => (
                            <option key={status.id} value={status.id}>
                              {status.name}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          disabled
                          className="h-[50px] border outline-blue-500 w-full px-4"
                          value={myQueueTicket?.status || ""}
                        />
                      )}
                    </div>
                    <div>
                      <span className="font-bold">Date Created</span>
                      <p>
                        {new Date(
                          myQueueTicket?.creationTime
                        ).toLocaleDateString() +
                          " " +
                          new Date(
                            myQueueTicket?.creationTime
                          ).toLocaleTimeString()}
                      </p>
                    </div>
                    {myQueueTicket?.holdUntil && (
                      <div>
                        <span className="font-bold">
                          Hold Until {myQueueTicket?.holdUntil}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <div className="flex w-full gap-4 my-4">
                    {!editTicket && (
                      <>
                        {!(ticketRequeued || ticketClosed) ? (
                          <>
                            <button
                              onClick={() =>
                                handleRequeueTicket(
                                  user?.mspCustomDomain,
                                  myQueueTicket,
                                  user?.id
                                )
                              }
                              className="hover:bg-blue-500 border border-white/30 bg-blue-800 w-[150px] py-1 text-white"
                            >
                              Requeue
                            </button>
                            <button
                              onClick={() =>
                                handleCloseTicket(
                                  user?.mspCustomDomain,
                                  myQueueTicket?.ticketId,
                                  user?.id
                                )
                              }
                              className="hover:bg-blue-500 border border-white/30 bg-blue-800 w-[150px] py-1 text-white"
                            >
                              Close Ticket
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() =>
                              handleNextQueueTicket(
                                user?.mspCustomDomain,
                                user?.tierLevel,
                                user?.id
                              )
                            }
                            className="hover:bg-blue-500 border border-white/30 bg-blue-800 w-[150px] py-1 text-white"
                          >
                            Next
                          </button>
                        )}
                      </>
                    )}
                  </div>
                  {editTicket ? (
                    <div className="flex w-full gap-4">
                      <button
                        onClick={() =>
                          handleSaveTicket(
                            user?.mspCustomDomain,
                            myQueueTicket?.ticketId
                          )
                        }
                        className="hover:bg-blue-500 border border-white/30 bg-blue-800 w-[150px] py-1 text-white"
                      >
                        Save
                      </button>
                      <button
                        onClick={setCancelEdit}
                        className="hover:bg-blue-500 border border-white/30 bg-blue-800 w-[150px] py-1 text-white"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleEditTicket(user?.mspCustomDomain)}
                      className="hover:bg-blue-500 border border-white/30 bg-blue-800 w-[150px] py-1 text-white"
                    >
                      Edit
                    </button>
                  )}
                </div>
                {ticketRequeued && (
                  <p className="font-semibold">
                    Ticket Added Back Into The Queue!
                  </p>
                )}
                {ticketClosed && (
                  <p className="font-semibold">Ticket Has Been Closed!</p>
                )}
              </div>
              <div className="flex-1 max-h-[800px] overflow-auto scrollbar-thin px-2">
                <Troubleshoot />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default QueueManagment;
