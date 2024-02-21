import useFormsStore from "@/utils/store/interaction/forms/formsStore";
import TicketOnboarding from "./TicketOnboarding";

import { useEffect } from "react";

const TicketForm = ({ itemId }) => {
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
      <div className="flex  flex-col gap-2">
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
                null
              )
            }
          />
        </div>
        <div>
          <span className="font-bold">Category</span>
          <select
            className="h-[50px] border outline-blue-500 w-full px-3"
            value={ticket.currentTicketCategoryId || ""}
            onChange={(e) => {
              const selectedCategory =
                ticket.categories.mspConnectWiseManageCategorizations.find(
                  (category) =>
                    category.categoryId === parseInt(e.target.value, 10)
                );

              setTicket(
                "currentTicketCategoryId",
                selectedCategory.categoryId,
                selectedCategory.categoryId,
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
            {ticket.categories?.mspConnectWiseManageCategorizations.map(
              (category) => {
                const { categoryId, categoryName } = category;
                return (
                  <option key={categoryId} value={categoryId}>
                    {categoryName}
                  </option>
                );
              }
            )}
          </select>
        </div>

        <div>
          <span className="font-bold">Subcategory</span>
          <select
            className="h-[50px] border outline-blue-500 w-full px-3"
            value={ticket.currentTicketSubCategoryId || ""}
            onChange={(e) => {
              const selectedSubcategory =
                ticket.categories.mspConnectWiseManageCategorizations
                  .find(
                    (category) =>
                      category.categoryId === ticket.currentTicketCategoryId
                  )
                  ?.mspConnectWiseManageSubCategorizations.find(
                    (sub) => sub.subCategoryId === parseInt(e.target.value, 10)
                  );

              setTicket(
                "currentTicketSubCategoryId",
                selectedSubcategory.subCategoryName,
                ticket.currentTicketCategoryId,
                selectedSubcategory.subCategoryId,
                selectedSubcategory.priority,
                selectedSubcategory.priorityId,
                selectedSubcategory.impact,
                selectedSubcategory.severity,
                selectedSubcategory.tier,
                selectedSubcategory.durationToResolve
              );
            }}
          >
            <option value="" disabled selected>
              {ticket.currentTicketCategoryId && "Please select a subcategory"}
            </option>

            {ticket.currentTicketCategoryId &&
              ticket.categories?.mspConnectWiseManageCategorizations
                .find(
                  (category) =>
                    category.categoryId === ticket.currentTicketCategoryId
                )
                ?.mspConnectWiseManageSubCategorizations.map((subCategory) => {
                  const { subCategoryId, subCategoryName } = subCategory;
                  return (
                    <option key={subCategoryId} value={subCategoryId}>
                      {subCategoryName}
                    </option>
                  );
                })}
          </select>
        </div>

        <div>
          <span className="font-bold">Priority</span>
          <input
            disabled
            className="h-[50px] border outline-blue-500 w-full px-4"
            value={ticket.currentTicketPriority || ""}
          />
        </div>
        <div>
          <span className="font-bold">Impact</span>
          <input
            disabled
            className="h-[50px] border outline-blue-500 w-full px-4"
            value={ticket.currentTicketImpact || ""}
          />
        </div>
        <div>
          <span className="font-bold">Severity</span>
          <input
            disabled
            className="h-[50px] border outline-blue-500 w-full px-4"
            value={ticket.currentTicketSeverity || ""}
          />
        </div>
        <div>
          <span className="font-bold">Tier</span>
          <input
            disabled
            className="h-[50px] border outline-blue-500 w-full px-4"
            value={ticket.currentTicketTier || ""}
          />
        </div>

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
  );
};

export default TicketForm;
