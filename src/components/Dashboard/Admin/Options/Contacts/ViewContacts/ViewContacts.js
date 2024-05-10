"use client";

import useContactsStore from "@/utils/store/admin/control/contacts/contactsStore";
import useUserStore from "@/utils/store/user/userStore";
import ViewPSAContacts from "./ViewPSAContacts";
import ViewActiveContacts from "./ViewActiveContacts";
import AddContact from "./AddContact";

const ViewContacts = () => {
  const { user } = useUserStore();
  const {
    addContact,
    currentContactView,
    setCurrentContactView,
    handleViewContactAllTickets,
    handleViewContactsForm,
  } = useContactsStore();

  const renderComponent = () => {
    switch (currentContactView) {
      case "PSA Contacts":
        return <ViewPSAContacts />;
      default:
        return <ViewActiveContacts />;
    }
  };

  return (
    <div className="flex flex-col text-xl overflow-hidden">
      {addContact && <AddContact />}
      <div className="flex flex-col gap-7 text-xl overflow-hidden">
        <div className="flex flex-col overflow-hidden p-4">
          <div className="flex items-center gap-1  text-sm">
            <span
              onClick={() => setCurrentContactView("Active")}
              className={`${
                currentContactView !== "PSA Contacts" && "font-bold"
              } cursor-pointer`}
            >
              Active
            </span>
            <span>/</span>

            <span
              onClick={() => setCurrentContactView("PSA Contacts")}
              className={`${
                currentContactView === "PSA Contacts" && "font-bold"
              } cursor-pointer`}
            >
              PSA Contacts
            </span>
          </div>
          <div className="flex items-center justify-start gap-2 py-4">
            {currentContactView === "PSA Contacts" && (
              <button
                onClick={() => handleViewContactsForm(user?.mspCustomDomain)}
                className="text-sm  bg-blue-800 text-white font-bold px-5 rounded-lg py-1"
              >
                Add Contact
              </button>
            )}
            <p
              className="hover:underline text-blue-800 text-sm cursor-pointer"
              onClick={() =>
                handleViewContactAllTickets(user?.clientsAutopilotDbid)
              }
            >
              See All Tickets
            </p>
          </div>

          {renderComponent()}
        </div>
      </div>
    </div>
  );
};

export default ViewContacts;
