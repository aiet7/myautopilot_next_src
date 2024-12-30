"use client";

import useQueueStore from "@/utils/store/interaction/queue/queueStore";
import useAssistantStore from "@/utils/store/assistant/assistantStore";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import useUiStore from "@/utils/store/ui/uiStore";
import { useEffect } from "react";

const QueueTicket = () => {
  const {
    myQueueTicket,
    editingMyQueueTicket,
    editTicket,
    impactOptions,
    severityOptions,
    tierOptions,
    setEditTicket,
    ticketRequeued,
    ticketClosed,
    ticketSaved,
  } = useQueueStore();

  const { toggleTicketView, setToggleTicketView } = useUiStore();

  const { assistantWidth } = useAssistantStore();

  useEffect(() => {
    return () => {
      setToggleTicketView(true);
    };
  }, [setToggleTicketView]);

  return (
    <div className="relative border-2 shadow-md bg-white dark:bg-black">
      <div className="flex justify-between items-center px-10 py-3">
        <h1 className="font-bold text-[#465E89]">
          Ticket # {myQueueTicket?.ticketId}
        </h1>
        {toggleTicketView ? (
          <IoIosArrowUp
            size="20"
            onClick={() => setToggleTicketView(false)}
            className="hover:cursor-pointer"
          />
        ) : (
          <IoIosArrowDown
            size="20"
            onClick={() => setToggleTicketView(true)}
            className="hover:cursor-pointer"
          />
        )}
      </div>

      <div
        className={`overflow-hidden transition-all duration-200 ease-in-out ${
          toggleTicketView ? "max-h-[1000px]" : "max-h-0"
        }`}
      >
        <div
          className={`${
            assistantWidth < 750 ? "grid-cols-1" : "grid-cols-2"
          } grid gap-3 p-10`}
        >
          <div className="flex justify-center items-center w-full ">
            <span className="font-bold w-[35%]">Board: </span>
            <input
              disabled
              className="dark:bg-transparent dark:border-white border-black border-b w-[65%] px-4 bg-transparent "
              value={myQueueTicket?.boardName || ""}
              readOnly
            />
          </div>

          <div className="flex justify-center items-center w-full ">
            <span className="font-bold w-[35%]">SLA:</span>
            <input
              disabled
              className="dark:bg-transparent dark:border-white border-black border-b w-[65%] px-4  bg-transparent"
              value={myQueueTicket?.sla?.name || ""}
            />
          </div>

          <div className="flex justify-center items-center w-full ">
            <span className="font-bold w-[35%]  ">Status:</span>
            <input
              disabled
              className="dark:bg-transparent dark:border-white border-black border-b w-[65%] px-4  bg-transparent"
              value={myQueueTicket?.status?.name || ""}
            />
          </div>
          <div className="flex justify-center items-center w-full ">
            <span className="font-bold w-[35%]  ">Agreement:</span>
            <input
              disabled
              className="dark:bg-transparent dark:border-white border-black border-b w-[65%] px-4  bg-transparent"
              value={myQueueTicket?.agreement?.name || ""}
            />
          </div>
          <div className="flex justify-center items-center w-full">
            <span className="font-bold w-[35%]">Type:</span>

            {editTicket ? (
              <select
                className="dark:bg-transparent dark:border-white px-3 w-[65%] bg-transparent border-b border-black focus:outline-none focus:ring-0"
                value={editingMyQueueTicket?.categoryId || ""}
                onChange={(e) => {
                  const categoryId = parseInt(e.target.value, 10);
                  const category = editingMyQueueTicket?.categories?.find(
                    (category) => category.categoryId === categoryId
                  );
                  setEditTicket({
                    categoryId: categoryId,
                    categoryName: category?.categoryName,
                    subCategoryId: null,
                    subCategories:
                      category?.mspConnectWiseManageSubCategorizations || [],
                  });
                }}
              >
                {editingMyQueueTicket?.categories?.map((category) => (
                  <option
                    key={category.categoryId}
                    value={category.categoryId}
                    className="dark:text-black"
                  >
                    {category.categoryName}
                  </option>
                ))}
              </select>
            ) : (
              <input
                disabled
                className="bg-transparent dark:bg-transparent dark:border-white border-b border-black w-[65%] px-4 "
                value={myQueueTicket?.categoryName || ""}
              />
            )}
          </div>

          <div className="flex justify-center items-center w-full ">
            <span className="font-bold w-[35%]">Predecessor:</span>
            <input
              disabled
              className="dark:bg-transparent dark:border-white border-black border-b w-[65%] px-4  bg-transparent"
              value={myQueueTicket?.predecessorType || ""}
            />
          </div>

          <div className="flex justify-center items-center w-full ">
            <span className="font-bold w-[35%]">Subtype:</span>

            {editTicket ? (
              <select
                className="dark:bg-transparent dark:border-white border-black border-b w-[65%] px-4  bg-transparent focus:outline-none focus:ring-0"
                value={editingMyQueueTicket?.subCategoryId || ""}
                onChange={(e) => {
                  const subCategoryId = parseInt(e.target.value, 10);
                  const subCategory = editingMyQueueTicket?.subCategories.find(
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
                  editingMyQueueTicket?.subCategories.map((subCategory) => (
                    <option
                      key={subCategory.subCategoryId}
                      value={subCategory.subCategoryId}
                      className="dark:text-black"
                    >
                      {subCategory.subCategoryName}
                    </option>
                  ))}
              </select>
            ) : (
              <input
                disabled
                className="dark:bg-transparent dark:border-white border-black border-b w-[65%] px-4  bg-transparent"
                value={myQueueTicket?.subCategoryName || ""}
              />
            )}
          </div>

          <div className="flex justify-center items-center w-full ">
            <span className="font-bold w-[35%]">Estimated Start Date:</span>
            <input
              disabled
              className="dark:bg-transparent dark:border-white border-black border-b w-[65%] px-4  bg-transparent"
              value={myQueueTicket?.estimatedStartDate || ""}
            />
          </div>
          <div className="flex justify-center items-center w-ful ">
            <span className="font-bold w-[35%]">Item:</span>
            <input
              disabled
              className="dark:bg-transparent dark:border-white border-black border-b w-[65%] px-4  bg-transparent"
              value={myQueueTicket?.item || ""}
            />
          </div>

          <div className="flex justify-center items-center w-full ">
            <span className="font-bold w-[35%]">Due Date:</span>
            <input
              disabled
              className="dark:bg-transparent dark:border-white border-black border-b w-[65%] px-4  bg-transparent"
              value={null || ""}
            />
          </div>

          <div className="flex justify-center items-center w-full ">
            <span className="font-bold w-[35%]">Ticket Owner:</span>
            <input
              disabled
              className="dark:bg-transparent dark:border-white border-black border-b w-[65%] px-4  bg-transparent"
              value={null || ""}
            />
          </div>
          <div className="flex justify-center items-center w-full ">
            <span className="font-bold w-[35%]">Duration:</span>
            <input
              disabled
              className="dark:bg-transparent dark:border-white border-black border-b w-[65%] px-4  bg-transparent"
              value={myQueueTicket?.duration || ""}
            />
          </div>

          <div></div>
          <div className="flex justify-center items-center w-full ">
            <span className="font-bold w-[35%]">Impact/Urgency:</span>
            <input
              disabled
              className="dark:bg-transparent dark:border-white border-black border-b w-[65%] px-4  bg-transparent"
              value={myQueueTicket?.impact || ""}
            />
          </div>

          <div></div>
          <div className="flex justify-center items-center w-full ">
            <span className="font-bold w-[35%]">Priority:</span>
            {editTicket ? (
              <select
                className="dark:bg-transparent dark:border-white border-black border-b w-[65%] px-4  bg-transparent focus:outline-none focus:ring-0"
                value={editingMyQueueTicket?.priorityId || ""}
                onChange={(e) => {
                  const priorityId = parseInt(e.target.value, 10);
                  const priority = editingMyQueueTicket?.priorities?.find(
                    (p) => p.id === priorityId
                  );
                  setEditTicket({
                    priorityId: priorityId,
                    priority: priority?.name,
                  });
                }}
              >
                {editingMyQueueTicket?.priorities?.map((priority) => (
                  <option
                    key={priority.id}
                    value={priority.id}
                    className="dark:text-black"
                  >
                    {priority.name}
                  </option>
                ))}
              </select>
            ) : (
              <input
                disabled
                className="dark:bg-transparent dark:border-white border-black border-b w-[65%] px-4  bg-transparent"
                value={myQueueTicket?.priority || ""}
              />
            )}
          </div>

          <div></div>
          <div className="flex justify-center items-center w-full ">
            <span className="font-bold w-[35%]">SLA Status:</span>
            {editTicket ? (
              <select
                className="dark:bg-transparent dark:border-white border-black border-b w-[65%] px-4  bg-transparent focus:outline-none focus:ring-0"
                value={editingMyQueueTicket?.statusId || ""}
                onChange={(e) => {
                  const statusId = parseInt(e.target.value, 10);
                  const status = editingMyQueueTicket?.statuses?.find(
                    (s) => s.id === statusId
                  );
                  setEditTicket({
                    statusId: statusId,
                    status: status?.name,
                  });
                }}
              >
                {editingMyQueueTicket?.statuses?.map((status) => (
                  <option
                    key={status.id}
                    value={status.id}
                    className="dark:text-black"
                  >
                    {status.name}
                  </option>
                ))}
              </select>
            ) : (
              <input
                disabled
                className="bg-transparent dark:bg-transparent dark:border-white border-black border-b w-[65%] px-4"
                value={myQueueTicket?.status || ""}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QueueTicket;

/*


<span className="font-bold sm:pb-0 py-2">Description: </span>

          <textarea
            value={
              editTicket
                ? editingMyQueueTicket?.description || ""
                : myQueueTicket?.description ||
                  myQueueTicket?.ticketInformation ||
                  ""
            }
            maxLength={100}
            className="bg-white dark:text-black  max-h-[150px] min-h-[100px] px-3  border-2 focus:outline-none focus:ring-0"
            readOnly={!editTicket}
            onChange={(e) => {
              if (editTicket) {
                setEditTicket({ description: e.target.value });
              }
            }}
          />

<div className="sm:flex sm:w-full">
            <div className=" flex sm:w-[50%] w-full mr-3">
              <span className="font-bold w-[25%] sm:pb-0 py-2">Type:</span>
              {editTicket ? (
                <select
                  className="bg-white dark:bg-transparent dark:border-white px-3 w-[75%] bg-transparent border-b border-black focus:outline-none focus:ring-0"
                  value={editingMyQueueTicket?.categoryId || ""}
                  onChange={(e) => {
                    const categoryId = parseInt(e.target.value, 10);
                    const category = editingMyQueueTicket?.categories?.find(
                      (category) => category.categoryId === categoryId
                    );
                    setEditTicket({
                      categoryId: categoryId,
                      categoryName: category?.categoryName,
                      subCategoryId: null,
                      subCategories:
                        category?.mspConnectWiseManageSubCategorizations || [],
                    });
                  }}
                >
                  {editingMyQueueTicket?.categories?.map((category) => (
                    <option
                      key={category.categoryId}
                      value={category.categoryId}
                      className="dark:text-black"
                    >
                      {category.categoryName}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  disabled
                  className="bg-white dark:bg-transparent dark:border-white border-b border-black w-[75%] px-4 "
                  value={myQueueTicket?.categoryName || ""}
                />
              )}
            </div>
            <div className="flex sm:w-[50%]">
              <span className="font-bold w-[25%] sm:pb-0 py-2">Subtype:</span>
              {editTicket ? (
                <select
                  className="bg-white dark:bg-transparent dark:border-white px-3 w-[75%] bg-transparent border-b border-black focus:outline-none focus:ring-0"
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
                    editingMyQueueTicket?.subCategories.map((subCategory) => (
                      <option
                        key={subCategory.subCategoryId}
                        value={subCategory.subCategoryId}
                        className="dark:text-black"
                      >
                        {subCategory.subCategoryName}
                      </option>
                    ))}
                </select>
              ) : (
                <input
                  disabled
                  className="bg-white dark:bg-transparent dark:border-white border-b border-black w-[75%] px-4"
                  value={myQueueTicket?.subCategoryName || ""}
                />
              )}
            </div>
          </div>
          <div className="sm:flex sm:w-full">
            <div className="flex w-full sm:w-[50%] mr-3">
              <span className="font-bold w-[25%] sm:pb-0 py-2">Priority: </span>
              {editTicket ? (
                <select
                  className="bg-white dark:bg-transparent dark:border-white px-3 w-[75%] bg-transparent border-b border-black focus:outline-none focus:ring-0"
                  value={editingMyQueueTicket?.priorityId || ""}
                  onChange={(e) => {
                    const priorityId = parseInt(e.target.value, 10);
                    const priority = editingMyQueueTicket?.priorities?.find(
                      (p) => p.id === priorityId
                    );
                    setEditTicket({
                      priorityId: priorityId,
                      priority: priority?.name,
                    });
                  }}
                >
                  {editingMyQueueTicket?.priorities?.map((priority) => (
                    <option
                      key={priority.id}
                      value={priority.id}
                      className="dark:text-black"
                    >
                      {priority.name}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  disabled
                  className="bg-white dark:bg-transparent dark:border-white border-b border-black w-[75%] px-4"
                  value={myQueueTicket?.priority || ""}
                />
              )}
            </div>
            <div className="flex sm:w-[50%]">
              <span className="font-bold w-[25%] sm:pb-0 py-2">Impact:</span>
              {editTicket ? (
                <select
                  className="bg-white dark:bg-transparent dark:border-white px-3 w-[75%] bg-transparent border-b border-black focus:outline-none focus:ring-0"
                  value={editingMyQueueTicket?.impact || ""}
                  onChange={(e) => {
                    setEditTicket({ impact: e.target.value });
                  }}
                >
                  {impactOptions.map((impact) => (
                    <option
                      key={impact}
                      value={impact}
                      className="dark:text-black"
                    >
                      {impact}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  disabled
                  className="bg-white dark:bg-transparent dark:border-white px-3 w-[75%] bg-transparent border-b border-black focus:outline-none focus:ring-0"
                  value={myQueueTicket?.impact || ""}
                />
              )}
            </div>
          </div>

          <div className="sm:flex sm:w-full">
            <div className="flex w-full sm:w-[50%] mr-3">
              <span className="font-bold w-[25%] sm:pb-0 py-2">Severity:</span>
              {editTicket ? (
                <select
                  className="bg-white dark:bg-transparent dark:border-white px-3 w-[75%] bg-transparent border-b border-black focus:outline-none focus:ring-0"
                  value={editingMyQueueTicket?.severity || ""}
                  onChange={(e) => setEditTicket({ severity: e.target.value })}
                >
                  {severityOptions.map((severity) => (
                    <option
                      key={severity}
                      value={severity}
                      className="dark:text-black"
                    >
                      {severity}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  disabled
                  className="bg-white dark:bg-transparent dark:border-white border-b border-black w-[75%] px-4"
                  value={myQueueTicket?.severity || ""}
                />
              )}
            </div>
            <div className="flex sm:w-[50%]">
              <span className="font-bold w-[25%] sm:pb-0 py-2">Tier:</span>
              {editTicket ? (
                <select
                  className="bg-white dark:bg-transparent dark:border-white px-3 w-[75%] bg-transparent border-b border-black focus:outline-none focus:ring-0 "
                  value={editingMyQueueTicket?.tier || ""}
                  onChange={(e) => setEditTicket({ tier: e.target.value })}
                >
                  {tierOptions.map((tier) => (
                    <option key={tier} value={tier} className="dark:text-black">
                      {tier}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  disabled
                  className="bg-white dark:bg-transparent dark:border-white border-black border-b w-[75%] px-4"
                  value={myQueueTicket?.tier || ""}
                />
              )}
            </div>
          </div>

          <div className="sm:flex sm:w-full">
            <div className=" flex w-full sm:w-[50%] mr-3">
              <span className="font-bold w-[25%] sm:pb-0 py-2">
                Impact Score:
              </span>

              <input
                disabled
                className="bg-white dark:bg-transparent dark:border-white border-b w-[75%] border-black  px-4"
                value={myQueueTicket?.impactScore || ""}
              />
            </div>
            <div className="flex sm:w-[50%]">
              <span className="font-bold w-[25%] sm:pb-0 py-2">
                Severity Score:
              </span>
              <input
                disabled
                className="bg-white dark:bg-transparent dark:border-white border-b border-black w-[75%] px-4"
                value={myQueueTicket?.severityScore || ""}
              />
            </div>
          </div>
          <div className="sm:flex w-full">
            <div className="w-full flex sm:w-[50%] mr-3">
              <span className="font-bold w-[25%] sm:pb-0 py-2">Status:</span>
              {editTicket ? (
                <select
                  className="bg-white dark:bg-transparent dark:border-white border-black border-b w-[75%] px-4 bg-transparent "
                  value={editingMyQueueTicket?.statusId || ""}
                  onChange={(e) => {
                    const statusId = parseInt(e.target.value, 10);
                    const status = editingMyQueueTicket?.statuses?.find(
                      (s) => s.id === statusId
                    );
                    setEditTicket({
                      statusId: statusId,
                      status: status?.name,
                    });
                  }}
                >
                  {editingMyQueueTicket?.statuses?.map((status) => (
                    <option
                      key={status.id}
                      value={status.id}
                      className="dark:text-black"
                    >
                      {status.name}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  disabled
                  className="bg-white dark:bg-transparent dark:border-white border-black border-b w-[75%] px-4"
                  value={myQueueTicket?.status || ""}
                />
              )}
            </div>
            <div className="w-[50%]"></div>
          </div>

          <div className="sm:flex w-full">
            <div className="flex w-full sm:w-[50%] mr-3">
              <span className="font-bold w-[25%] sm:pb-0 py-2">Name: </span>
              <input
                disabled
                className="bg-white dark:bg-transparent dark:border-white border-b border-black  w-[75%] px-4"
                value={myQueueTicket?.name || ""}
              />
            </div>
            <div className="flex sm:w-[50%]">
              <span className="font-bold w-[25%] sm:pb-0 py-2">Email:</span>
              <input
                disabled
                className="bg-white dark:bg-transparent dark:border-white border-b border-black  w-[75%] px-4"
                value={myQueueTicket?.emailId || ""}
              />
            </div>
          </div>

          <div className="sm:flex w-full">
            <div className="flex w-full sm:w-[50%] mr-3">
              <span className="font-bold w-[25%] sm:pb-0 py-2">
                Phone Number:
              </span>
              <input
                disabled
                className="bg-white dark:bg-transparent dark:border-white w-[75%] border-b border-black px-4 "
                value={myQueueTicket?.phoneNumber || ""}
              />
            </div>
            <div className="w-[50%]"></div>
          </div>

          <div>
            <span className="font-bold">Date Created</span>
            <p>
              {new Date(myQueueTicket?.creationTime).toLocaleDateString() +
                " " +
                new Date(myQueueTicket?.creationTime).toLocaleTimeString()}
            </p>
          </div>
          {myQueueTicket?.holdUntil && (
            <div>
              <span className="font-bold">
                Hold Until {myQueueTicket?.holdUntil}
              </span>
            </div>
          )}
          {ticketRequeued && (
            <p className="font-semibold">Ticket Added Back Into The Queue!</p>
          )}
          {ticketClosed && (
            <p className="font-semibold">Ticket Has Been Closed!</p>
          )}
          {ticketSaved && (
            <p className="font-semibold">Ticket Has Been Saved!</p>
          )}
        </div>
      </div>
    </div>


*/
