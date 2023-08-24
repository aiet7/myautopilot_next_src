import useFormsStore from "@/utils/store/interaction/forms/formsStore";

const ContactForm = ({ itemId }) => {
  const {
    loading,
    contact,
    email,
    setContact,
    setEmail,
    handleContactConfirmation,
  } = useFormsStore();
  return (
    <div>
      <div className="flex flex-col gap-2">
        <div>
          <span className="font-bold">First Name</span>
          <input
            className="h-[50px] border outline-blue-500 w-full px-4"
            value={contact.currentContactGivenName || ""}
            onChange={(e) =>
              setContact("currentContactGivenName", e.target.value)
            }
          />
        </div>
        <div>
          <span className="font-bold">Last Name</span>
          <input
            className="h-[50px] border outline-blue-500 w-full px-4"
            value={contact.currentContactFamilyName || ""}
            onChange={(e) =>
              setContact("currentContactFamilyName", e.target.value)
            }
          />
        </div>
        <div>
          <span className="font-bold">Email</span>
          <input
            className="h-[50px] border outline-blue-500 w-full px-4"
            value={
              contact.showCancelButton
                ? contact.currentContactEmailIds?.[0] || ""
                : email.currentEmailId || ""
            }
            onChange={(e) =>
              contact.showCancelButton
                ? setContact("currentContactEmailIds", [e.target.value])
                : setEmail("currentEmailId", e.target.value)
            }
          />
        </div>
        <div>
          <span className="font-bold">Phone Number</span>
          <input
            className="h-[50px] border outline-blue-500 w-full px-4"
            value={contact.currentContactMobileNumber || ""}
            onChange={(e) =>
              setContact("currentContactMobileNumber", e.target.value)
            }
          />
        </div>
      </div>
      <div className="flex items-center gap-4 py-2">
        <button
          className="border border-white/30 bg-blue-800 px-3 py-1 text-white"
          disabled={loading.contactForm}
          onClick={() => handleContactConfirmation(true, itemId)}
        >
          {loading.contactForm ? "Adding..." : "Add Contact"}
        </button>
        {contact.showCancelButton && (
          <button
            className="dark:text-white dark:border-white/30 border border-blue-800 px-3 py-1 text-blue-800"
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
