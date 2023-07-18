import TicketOnboarding from "./TicketOnboarding";

const TicketForm = ({
  currentTicketTitle,
  setCurrentTicketTitle,
  currentTicketDescription,
  setCurrentTicketDescription,
  currentTicketCategory,
  setCurrentTicketCategory,
  categories,
  currentTicketSubCategory,
  setCurrentTicketSubCategory,
  filteredSubCategories,
  currentTicketName,
  setCurrentTicketName,
  currentTicketEmailId,
  setCurrentTicketEmailId,
  currentTicketPhoneNumber,
  setCurrentTicketPhoneNumber,
  currentTicketNewFirstName,
  setCurrentTicketNewFirstName,
  currentTicketNewLastName,
  setCurrentTicketNewLastName,
  currentTicketNewEmailId,
  setCurrentTicketNewEmailId,
  currentTicketNewPhoneNumber,
  setCurrentTicketNewPhoneNumber,
  currentTicketLicenseId,
  setCurrentTicketLicenseId,
  loading,
  handleTicketConfirmation,
  itemId,
}) => {
  return (
    <div>
      <div className="flex flex-col gap-2">
        <div>
          <span className="font-bold">Ticket Name</span>
          <input
            className="h-[50px] border outline-blue-500 w-full px-4"
            value={currentTicketTitle}
            onChange={(e) => setCurrentTicketTitle(e.target.value)}
          />
        </div>
        <div>
          <span className="font-bold">Description</span>
          <input
            className="h-[50px] border outline-blue-500 w-full px-4"
            value={currentTicketDescription}
            onChange={(e) => setCurrentTicketDescription(e.target.value)}
          />
        </div>
        <div>
          <span className="font-bold">Category</span>

          <select
            value={currentTicketCategory}
            onChange={(e) => setCurrentTicketCategory(e.target.value)}
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
            value={currentTicketSubCategory}
            onChange={(e) => setCurrentTicketSubCategory(e.target.value)}
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
        {currentTicketCategory === "TRAINING_OR_ONBOARDING" &&
          currentTicketSubCategory === "NEW_EMPLOYEE_ONBOARDING" && (
            <TicketOnboarding
              currentTicketNewFirstName={currentTicketNewFirstName}
              setCurrentTicketNewFirstName={setCurrentTicketNewFirstName}
              currentTicketNewLastName={currentTicketNewLastName}
              setCurrentTicketNewLastName={setCurrentTicketNewLastName}
              currentTicketNewEmailId={currentTicketNewEmailId}
              setCurrentTicketNewEmailId={setCurrentTicketNewEmailId}
              currentTicketNewPhoneNumber={currentTicketNewPhoneNumber}
              setCurrentTicketNewPhoneNumber={setCurrentTicketNewPhoneNumber}
              currentTicketLicenseId={currentTicketLicenseId}
              setCurrentTicketLicenseId={setCurrentTicketLicenseId}
            />
          )}
        <div>
          <span className="font-bold">Name</span>
          <input
            className="h-[50px] border outline-blue-500 w-full px-4"
            value={currentTicketName}
            onChange={(e) => setCurrentTicketName(e.target.value)}
          />
        </div>
        <div>
          <span className="font-bold">Email</span>
          <input
            className="h-[50px] border outline-blue-500 w-full px-4"
            value={currentTicketEmailId}
            onChange={(e) => setCurrentTicketEmailId(e.target.value)}
          />
        </div>
        <div>
          <span className="font-bold">Phone Number</span>
          <input
            className="h-[50px] border outline-blue-500 w-full px-4"
            value={currentTicketPhoneNumber}
            onChange={(e) => setCurrentTicketPhoneNumber(e.target.value)}
          />
        </div>
      </div>
      <div className="flex items-center gap-4 py-2">
        <button
          className="bg-green-300 rounded-md px-3 py-2 text-white"
          disabled={loading.ticketForm}
          onClick={() => {
            handleTicketConfirmation(true, itemId);
          }}
        >
          {loading.ticketForm ? "Creating..." : "Create Ticket"}
        </button>
        <button
          className="bg-red-300 rounded-md px-3 py-2 text-white"
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
