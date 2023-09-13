import useFormsStore from "@/utils/store/interaction/forms/formsStore";
import TicketOnboarding from "./TicketOnboarding";
import {
  categories,
  subCategories,
} from "../../../../../utils/tickets/ticketCreation";
import { useEffect } from "react";

const TicketForm = ({ itemId }) => {
  const {
    loading,
    formError,
    ticket,
    filteredSubCategories,
    setTicket,
    setFilteredSubCategories,
    handleTicketConfirmation,
  } = useFormsStore();

  useEffect(() => {
    const filtered = subCategories.filter(
      (subCategory) => subCategory.category === ticket.currentTicketCategory
    );
    setFilteredSubCategories(filtered);
  }, [ticket.currentTicketCategory, subCategories]);

  return (
    <div>
      <div className="flex flex-col gap-2">
        <div>
          <span className="font-bold">Ticket Name</span>
          <p className="text-xs text-red-500">{formError}</p>
          <input
            className="h-[50px] border outline-blue-500 w-full px-4"
            value={ticket.currentTicketTitle || ""}
            onChange={(e) => setTicket("currentTicketTitle", e.target.value)}
          />
        </div>
        <div>
          <span className="font-bold">Description</span>
          <input
            maxLength={100}
            className="h-[50px] border outline-blue-500 w-full px-4"
            value={ticket.currentTicketDescription || ""}
            onChange={(e) =>
              setTicket("currentTicketDescription", e.target.value)
            }
          />
        </div>
        <div>
          <span className="font-bold">Summary</span>
          <input
            className="h-[50px] border outline-blue-500 w-full px-4"
            value={ticket.currentTicketSummary || ""}
            onChange={(e) => setTicket("currentTicketSummary", e.target.value)}
          />
        </div>

        <div>
          <span className="font-bold">Category</span>

          <select
            value={ticket.currentTicketCategory || ""}
            onChange={(e) => setTicket("currentTicketCategory", e.target.value)}
            className="h-[50px] border outline-blue-500 w-full px-4"
          >
            <option value="">Select a category</option>
            {categories.map((category, index) => (
              <option key={index} value={category.id}>
                {category.title}
              </option>
            ))}
          </select>
        </div>
        <div>
          <span className="font-bold">Subcategory</span>
          <select
            value={ticket.currentTicketSubCategory || ""}
            onChange={(e) =>
              setTicket("currentTicketSubCategory", e.target.value)
            }
            className="h-[50px] border outline-blue-500 w-full px-4"
          >
            <option value="">Select a subcategory</option>
            {filteredSubCategories.map((subCategory, index) => (
              <option key={index} value={subCategory.id}>
                {subCategory.title}
              </option>
            ))}
          </select>
        </div>
        <div>
          <span className="font-bold">Priority</span>
          <input
            disabled
            className="h-[50px] border outline-blue-500 w-full px-4"
            value={ticket.currentTicketPriority || ""}
            onChange={(e) => setTicket("currentTicketPriority", e.target.value)}
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
            onChange={(e) => setTicket("currentTicketName", e.target.value)}
          />
        </div>
        <div>
          <span className="font-bold">Email</span>
          <input
            className="h-[50px] border outline-blue-500 w-full px-4"
            value={ticket.currentTicketEmailId || ""}
            onChange={(e) => setTicket("currentTicketEmailId", e.target.value)}
          />
        </div>
        <div>
          <span className="font-bold">Phone Number</span>
          <input
            className="h-[50px] border outline-blue-500 w-full px-4"
            value={ticket.currentTicketPhoneNumber || ""}
            onChange={(e) =>
              setTicket("currentTicketPhoneNumber", e.target.value)
            }
          />
        </div>
      </div>
      <div className="flex items-center gap-4 py-2">
        <button
          className="border border-white/30 bg-blue-800 px-3 py-1 text-white"
          disabled={loading.ticketForm}
          onClick={() => {
            handleTicketConfirmation(true, itemId);
          }}
        >
          {loading.ticketForm ? "Creating..." : "Create Ticket"}
        </button>
        <button
          className="dark:text-white dark:border-white/30 border border-blue-800 px-3 py-1 text-blue-800"
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
