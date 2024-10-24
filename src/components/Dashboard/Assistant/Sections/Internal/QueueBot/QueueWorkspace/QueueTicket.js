"use client";

import useQueueStore from "@/utils/store/interaction/queue/queueStore";

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

  console.log(myQueueTicket);

  return (
    <div className="flex flex-col gap-2 ">
      <div>
        <span className="font-bold">Ticket ID</span>
        <input
          value={myQueueTicket?.ticketId || ""}
          className="h-[30px] border outline-blue-500 w-full px-4"
          readOnly
        />
      </div>

      <div>
        <span className="font-bold">Company</span>
        <input
          disabled
          className="dark:bg-black h-[30px] border outline-blue-500 w-full px-4 bg-white"
          value={myQueueTicket?.company || ""}
        />
      </div>
      <div>
        <span className="font-bold">Board</span>
        <input
          disabled
          className="dark:bg-black h-[30px] border outline-blue-500 w-full px-4 bg-white"
          value={myQueueTicket?.boardName || ""}
        />
      </div>
      <div>
        <span className="font-bold">Ticket Name</span>
        <input
          disabled
          className="dark:bg-black h-[30px] border outline-blue-500 w-full px-4 bg-white"
          value={myQueueTicket?.title || ""}
        />
      </div>
      <div>
        <span className="font-bold">Description</span>

        <textarea
          value={
            editTicket
              ? editingMyQueueTicket?.description || ""
              : myQueueTicket?.description ||
                myQueueTicket?.ticketInformation ||
                ""
          }
          maxLength={100}
          className="dark:bg-black max-h-[130px] min-h-[70px] border outline-blue-500 w-full px-4 bg-white"
          readOnly={!editTicket}
          onChange={(e) => {
            if (editTicket) {
              setEditTicket({ description: e.target.value });
            }
          }}
        />
      </div>

      <div className="flex gap-4">
        <div className="w-full">
          <span className="font-bold">Type</span>
          {editTicket ? (
            <select
              className="h-[30px] border outline-blue-500 w-full px-4"
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
                <option key={category.categoryId} value={category.categoryId}>
                  {category.categoryName}
                </option>
              ))}
            </select>
          ) : (
            <input
              disabled
              className="dark:bg-black h-[30px] border outline-blue-500 w-full px-4 bg-white"
              value={myQueueTicket?.categoryName || ""}
            />
          )}
        </div>
        <div className="w-full">
          <span className="font-bold">Subtype</span>
          {editTicket ? (
            <select
              className="h-[30px] border outline-blue-500 w-full px-4"
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
                  >
                    {subCategory.subCategoryName}
                  </option>
                ))}
            </select>
          ) : (
            <input
              disabled
              className="dark:bg-black h-[30px] border outline-blue-500 w-full px-4 bg-white"
              value={myQueueTicket?.subCategoryName || ""}
            />
          )}
        </div>
      </div>
      <div className="flex gap-4">
        <div className="w-full">
          <span className="font-bold">Priority</span>
          {editTicket ? (
            <select
              className="h-[30px] border outline-blue-500 w-full px-4"
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
                <option key={priority.id} value={priority.id}>
                  {priority.name}
                </option>
              ))}
            </select>
          ) : (
            <input
              disabled
              className="dark:bg-black h-[30px] border outline-blue-500 w-full px-4 bg-white"
              value={myQueueTicket?.priority || ""}
            />
          )}
        </div>
        <div className="w-full">
          <span className="font-bold">Impact</span>
          {editTicket ? (
            <select
              className="h-[30px] border outline-blue-500 w-full px-4"
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
              className="dark:bg-black h-[30px] border outline-blue-500 w-full px-4 bg-white"
              value={myQueueTicket?.impact || ""}
            />
          )}
        </div>
        <div className="w-full">
          <span className="font-bold">Severity</span>
          {editTicket ? (
            <select
              className="h-[30px] border outline-blue-500 w-full px-4"
              value={editingMyQueueTicket?.severity || ""}
              onChange={(e) => setEditTicket({ severity: e.target.value })}
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
              className="dark:bg-black h-[30px] border outline-blue-500 w-full px-4 bg-white"
              value={myQueueTicket?.severity || ""}
            />
          )}
        </div>
      </div>
      <div>
        <span className="font-bold">Tier</span>
        {editTicket ? (
          <select
            className="h-[30px] border outline-blue-500 w-full px-4 "
            value={editingMyQueueTicket?.tier || ""}
            onChange={(e) => setEditTicket({ tier: e.target.value })}
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
            className="dark:bg-black h-[30px] border outline-blue-500 w-full px-4 bg-white"
            value={myQueueTicket?.tier || ""}
          />
        )}
      </div>
      <div className="flex gap-4">
        <div className="w-full">
          <span className="font-bold">Impact Score</span>

          <input
            disabled
            className="dark:bg-black h-[30px] border outline-blue-500 w-full px-4 bg-white"
            value={myQueueTicket?.impactScore || ""}
          />
        </div>
        <div className="w-full">
          <span className="font-bold">Severity Score</span>
          <input
            disabled
            className="dark:bg-black h-[30px] border outline-blue-500 w-full px-4 bg-white"
            value={myQueueTicket?.severityScore || ""}
          />
        </div>
      </div>
      <div>
        <span className="font-bold">Status</span>
        {editTicket ? (
          <select
            className="h-[30px] border outline-blue-500 w-full px-4 "
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
              <option key={status.id} value={status.id}>
                {status.name}
              </option>
            ))}
          </select>
        ) : (
          <input
            disabled
            className="dark:bg-black h-[30px] border outline-blue-500 w-full px-4 bg-white"
            value={myQueueTicket?.status || ""}
          />
        )}
      </div>
      
        <div className="w-full">
          <span className="font-bold">Name</span>
          <input
            disabled
            className="dark:bg-black h-[30px] border outline-blue-500 w-full px-4 bg-white"
            value={myQueueTicket?.name || ""}
          />
        </div>
        <div className="w-full">
          <span className="font-bold">Email</span>
          <input
            disabled
            className="dark:bg-black h-[30px] border outline-blue-500 w-full px-4 bg-white"
            value={myQueueTicket?.emailId || ""}
          />
        </div>
        <div className="w-full">
          <span className="font-bold">Phone Number</span>
          <input
            disabled
            className="dark:bg-black h-[30px] border outline-blue-500 w-full px-4 bg-white"
            value={myQueueTicket?.phoneNumber || ""}
          />
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
      {ticketClosed && <p className="font-semibold">Ticket Has Been Closed!</p>}
      {ticketSaved && <p className="font-semibold">Ticket Has Been Saved!</p>}
    </div>
  );
};

export default QueueTicket;
