import useFormsStore from "@/utils/store/interaction/forms/formsStore";
import TicketOnboarding from "./TicketOnboarding";
import {
  categories,
  subCategories,
} from "../../../../../utils/tickets/ticketCreation";

const TicketForm = ({ itemId }) => {
  const {
    loading,
    formError,
    ticket,
    setTicket,
    handleTicketConfirmation,
  } = useFormsStore();

  return (
    <div>
      <div className="flex  flex-col gap-2">
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
          <span className="font-bold">Category</span>
          <input
            disabled
            className="h-[50px] border outline-blue-500 w-full px-4"
            value={ticket.currentTicketCategory || ""}
            onChange={(e) => setTicket("currentTicketCategory", e.target.value)}
          />
        </div>
        <div>
          <span className="font-bold">Subcategory</span>
          <input
            disabled
            className="h-[50px] border outline-blue-500 w-full px-4"
            value={ticket.currentTicketSubCategory || ""}
            onChange={(e) => setTicket("currentTicketSubCategory", e.target.value)}
          />
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
        <div>
          <span className="font-bold">Impact</span>
          <input
            disabled
            className="h-[50px] border outline-blue-500 w-full px-4"
            value={ticket.currentTicketImpact || ""}
            onChange={(e) => setTicket("currentTicketImpact", e.target.value)}
          />
        </div>
        <div>
          <span className="font-bold">Severity</span>
          <input
            disabled
            className="h-[50px] border outline-blue-500 w-full px-4"
            value={ticket.currentTicketSeverity || ""}
            onChange={(e) => setTicket("currentTicketSeverity", e.target.value)}
          />
        </div>
        <div>
          <span className="font-bold">Tier</span>
          <input
            disabled
            className="h-[50px] border outline-blue-500 w-full px-4"
            value={ticket.currentTicketTier || ""}
            onChange={(e) => setTicket("currentTicketTier", e.target.value)}
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
