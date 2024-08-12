import useFormsStore from "@/utils/store/interaction/forms/formsStore";
import TicketOnboarding from "./TicketOnboarding";
import { useEffect } from "react";
import useMspStore from "@/utils/store/auth/msp/mspStore";

const TicketForm = ({ itemId }) => {
  const { userType } = useMspStore();
  const {
    loading,
    formError,
    ticket,
    setTicket,
    handleCreateTicketCategories,
    handleTicketConfirmation,
  } = useFormsStore();


  useEffect(() => {
    handleCreateTicketCategories();
  }, []);

  
  return (
    <div>
      {ticket?.currentTicketTitle === "" ? (
        <div className="flex flex-col gap-2">
          <p className="text-xl font-semibold">
            No Tickets Are Currently Opened or Created
          </p>
          <p className="text-gray-500">
            If you would like to open a ticket, please interact with our agent
            to get started.
          </p>
        </div>
      ) : (
        <div className="">
          <div className="flex flex-col gap-2">
            {userType === "tech" && (
              <div>
                <span className="font-bold">Company</span>
                <select
                  className="h-[50px] border outline-blue-500 w-full px-3"
                  value={ticket.currentTicketCWCompanyId || ""}
                  onChange={(e) => {
                    setTicket(
                      "currentTicketCWCompanyId",
                      e.target.value,
                      null,
                      null,
                      null,
                      null,
                      null,
                      null,
                      null,
                      null,
                      null,
                      null,
                      null,
                      null
                    );
                  }}
                >
                  <option value="" disabled>
                    Select Company
                  </option>
                  {ticket.currentCompanies?.map((company) => {
                    const { name, connectWiseCompanyId } = company;
                    return (
                      <option
                        key={connectWiseCompanyId}
                        value={connectWiseCompanyId}
                      >
                        {name}
                      </option>
                    );
                  })}
                </select>
              </div>
            )}
            {userType === "tech" && (
              <div>
                <span className="font-bold">Board</span>
                <select
                  className="h-[50px] border outline-blue-500 w-full px-3"
                  value={ticket.currentTicketBoardId || ""}
                  onChange={(e) => {
                    const newBoardId = parseInt(e.target.value, 10);
                    setTicket(
                      "currentTicketBoardId",
                      newBoardId,
                      newBoardId,
                      null,
                      null,
                      null,
                      null,
                      null,
                      null,
                      null,
                      null,
                      null,
                      null,
                      null
                    );
                  }}
                >
                  <option value="" disabled>
                    Select Board
                  </option>
                  {ticket.categories?.boardDetails?.map((board) => (
                    <option key={board.boardId} value={board.boardId}>
                      {board.boardName}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <div>
              <span className="font-bold">Ticket Name</span>
              <p className="text-xs text-red-500">{formError}</p>
              <input
                className="h-[50px] border outline-blue-500 w-full px-4"
                value={ticket.currentTicketTitle || ""}
                onChange={(e) =>
                  setTicket(
                    "currentTicketTitle",
                    e.target.value,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null
                  )
                }
              />
            </div>
            <div>
              <span className="font-bold">Description</span>
              <input
                maxLength={100}
                className="h-[50px] border outline-blue-500 w-full px-4"
                value={ticket.currentTicketDescription || ""}
                onChange={(e) =>
                  setTicket(
                    "currentTicketDescription",
                    e.target.value,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null
                  )
                }
              />
            </div>
            <div className="flex gap-4">
              <div className="w-full">
                <span className="font-bold">Type</span>
                <select
                  className="h-[50px] border outline-blue-500 w-full px-3"
                  value={ticket.currentTicketCategoryId || ""}
                  onChange={(e) => {
                    const newCategoryId = parseInt(e.target.value, 10);
                    const selectedCategory = ticket.categories?.boardDetails
                      ?.find(
                        (board) => board.boardId === ticket.currentTicketBoardId
                      )
                      ?.mspConnectWiseBoardTypes.find(
                        (type) => type?.typeId === newCategoryId
                      );

                    setTicket(
                      "currentTicketCategoryId",
                      selectedCategory?.typeName,
                      ticket.currentTicketBoardId,
                      newCategoryId,
                      null,
                      null,
                      null,
                      null,
                      null,
                      null,
                      null,
                      null,
                      null,
                      null
                    );
                  }}
                >
                  <option value="" disabled>
                    Select a type
                  </option>
                  {ticket.categories?.boardDetails
                    ?.find(
                      (board) => board.boardId === ticket.currentTicketBoardId
                    )
                    ?.mspConnectWiseBoardTypes.map((type) => (
                      <option key={type?.typeId} value={type?.typeId}>
                        {type?.typeName}
                      </option>
                    ))}
                </select>
              </div>

              <div className="w-full">
                <span className="font-bold">Subtype</span>
                <select
                  className="h-[50px] border outline-blue-500 w-full px-3"
                  value={ticket.currentTicketSubCategoryId || ""}
                  onChange={(e) => {
                    const newSubCategoryId = parseInt(e.target.value, 10);
                    const selectedBoard = ticket.categories?.boardDetails.find(
                      (board) => board.boardId === ticket.currentTicketBoardId
                    );

                    const selectedCategory =
                      selectedBoard?.mspConnectWiseBoardTypes.find(
                        (type) =>
                          type?.typeId === ticket.currentTicketCategoryId
                      );

                    const selectedSubcategory =
                      selectedCategory?.mspConnectWiseBoardSubTypes.find(
                        (sub) => sub?.subTypeId === newSubCategoryId
                      );

                    setTicket(
                      "currentTicketSubCategoryId",
                      selectedSubcategory?.subTypeName,
                      ticket.currentTicketBoardId,
                      ticket.currentTicketCategoryId,
                      newSubCategoryId,
                      selectedSubcategory?.priority,
                      selectedSubcategory?.priorityId,
                      selectedSubcategory?.priorityScore,
                      selectedSubcategory?.impact,
                      selectedSubcategory?.impactScore,
                      selectedSubcategory?.severity,
                      selectedSubcategory?.severityScore,
                      selectedSubcategory?.tier,
                      selectedSubcategory?.slaDeadLineInHours
                    );
                  }}
                >
                  <option value="" disabled>
                    {ticket.currentTicketCategoryId
                      ? "Please select a subtype"
                      : "Select a type first"}
                  </option>
                  {ticket.currentTicketCategoryId &&
                    ticket.categories?.boardDetails

                      ?.find(
                        (board) => board.boardId === ticket.currentTicketBoardId
                      )
                      ?.mspConnectWiseBoardTypes?.find(
                        (type) =>
                          type?.typeId === ticket.currentTicketCategoryId
                      )
                      ?.mspConnectWiseBoardSubTypes.map((sub) => (
                        <option key={sub?.subTypeId} value={sub?.subTypeId}>
                          {sub?.subTypeName}
                        </option>
                      ))}
                </select>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-full">
                <span className="font-bold">Priority</span>
                <input
                  disabled
                  className="h-[50px] border outline-blue-500 w-full px-4"
                  value={ticket.currentTicketPriority || ""}
                />
              </div>
              <div className="w-full">
                <span className="font-bold">Impact</span>
                <input
                  disabled
                  className="h-[50px] border outline-blue-500 w-full px-4"
                  value={ticket.currentTicketImpact || ""}
                />
              </div>
              <div className="w-full">
                <span className="font-bold">Severity</span>
                <input
                  disabled
                  className="h-[50px] border outline-blue-500 w-full px-4"
                  value={ticket.currentTicketSeverity || ""}
                />
              </div>
            </div>
            <div>
              <span className="font-bold">Tier</span>
              <input
                disabled
                className="h-[50px] border outline-blue-500 w-full px-4"
                value={ticket.currentTicketTier || ""}
              />
            </div>
            {userType === "tech" && (
              <div className="flex gap-4">
                <div className="w-full">
                  <span className="font-bold">Impact Score</span>
                  <input
                    className="h-[50px] border outline-blue-500 w-full px-4"
                    value={ticket.currentTicketImpactScore || ""}
                    onChange={(e) =>
                      setTicket(
                        "currentTicketImpactScore",
                        e.target.value,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        e.target.value,
                        null,
                        null,
                        null,
                        null
                      )
                    }
                  />
                </div>
                <div className="w-full">
                  <span className="font-bold">Severity Score</span>
                  <input
                    className="h-[50px] border outline-blue-500 w-full px-4"
                    value={ticket.currentTicketSeverityScore || ""}
                    onChange={(e) =>
                      setTicket(
                        "currentTicketSeverityScore",
                        e.target.value,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        e.target.value,
                        null
                      )
                    }
                  />
                </div>
              </div>
            )}

            {ticket.currentTicketCategory === "TRAINING_OR_ONBOARDING" &&
              ticket.currentTicketSubCategory === "NEW_EMPLOYEE_ONBOARDING" && (
                <TicketOnboarding />
              )}
            <div>
              <span className="font-bold">Name</span>
              <input
                className="h-[50px] border outline-blue-500 w-full px-4"
                value={ticket.currentTicketName || ""}
                onChange={(e) =>
                  setTicket(
                    "currentTicketName",
                    e.target.value,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null
                  )
                }
              />
            </div>
            <div>
              <span className="font-bold">Email</span>
              <input
                className="h-[50px] border outline-blue-500 w-full px-4"
                value={ticket.currentTicketEmailId || ""}
                onChange={(e) =>
                  setTicket(
                    "currentTicketEmailId",
                    e.target.value,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null
                  )
                }
              />
            </div>
            <div>
              <span className="font-bold">Phone Number</span>
              <input
                className="h-[50px] border outline-blue-500 w-full px-4"
                value={ticket.currentTicketPhoneNumber || ""}
                onChange={(e) =>
                  setTicket(
                    "currentTicketPhoneNumber",
                    e.target.value,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null
                  )
                }
              />
            </div>
          </div>
          <div className="flex items-center gap-4 py-2">
            <button
              className="hover:bg-blue-500 border border-white/30 bg-blue-800 px-3 py-1 text-white"
              disabled={loading.ticketForm}
              onClick={() => {
                handleTicketConfirmation(true, itemId);
              }}
            >
              {loading.ticketForm ? "Creating..." : "Create Ticket"}
            </button>
            <button
              className="dark:text-white dark:border-white/30  border border-blue-800 px-3 py-1 text-blue-800"
              onClick={() => {
                handleTicketConfirmation(false, itemId);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketForm;
