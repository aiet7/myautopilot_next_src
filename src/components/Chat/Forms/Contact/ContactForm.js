const ContactForm = ({
  currentContactGivenName,
  setCurrentContactGivenName,
  currentContactSurname,
  setCurrentContactSurname,
  currentEmailId,
  setCurrentEmailId,
  currentContactEmailId,
  setCurrentContactEmailId,
  currentContactMobileNumber,
  setCurrentContactMobileNumber,
  loading,
  handleContactConfirmation,
  itemId,
  showCancelButton,
}) => {
  return (
    <div>
      <div>
        <span className="font-bold">First Name</span>
        <input
          className="h-[50px] border outline-blue-500 w-full px-4"
          value={currentContactGivenName}
          onChange={(e) => setCurrentContactGivenName(e.target.value)}
        />
      </div>
      <div>
        <span className="font-bold">Last Name</span>
        <input
          className="h-[50px] border outline-blue-500 w-full px-4"
          value={currentContactSurname}
          onChange={(e) => setCurrentContactSurname(e.target.value)}
        />
      </div>
      <div>
        <span className="font-bold">Email</span>
        <input
          className="h-[50px] border outline-blue-500 w-full px-4"
          value={showCancelButton ? currentContactEmailId : currentEmailId}
          onChange={(e) =>
            showCancelButton
              ? setCurrentContactEmailId(e.target.value)
              : setCurrentEmailId(e.target.value)
          }
        />
      </div>
      <div>
        <span className="font-bold">Phone Number</span>
        <input
          className="h-[50px] border outline-blue-500 w-full px-4"
          value={currentContactMobileNumber}
          onChange={(e) => setCurrentContactMobileNumber(e.target.value)}
        />
      </div>
      <div className="flex items-center gap-4 py-2">
        <button
          className="bg-green-300 rounded-md px-3 py-2 text-white"
          disabled={loading.contactForm}
          onClick={() => handleContactConfirmation(true, itemId)}
        >
          {loading.contactForm ? "Adding..." : "Add Contact"}
        </button>
        {showCancelButton && (
          <button
            className="bg-red-300 rounded-md px-3 py-2 text-white"
            onClick={() => handleContactConfirmation(false, itemId)}
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
};

export default ContactForm;
