"use client";

import useUserStore from "@/utils/store/user/userStore";
import useUiStore from "@/utils/store/ui/uiStore";
import useContactsStore from "@/utils/store/admin/control/contacts/contactsStore";
import { useEffect } from "react";
import ViewContacts from "./ViewContacts/ViewContacts";
import ViewAllTickets from "./ViewAllTickets";
import ViewContactTickets from "./ViewContactTickets";

const Contacts = () => {
  const { user } = useUserStore();
  const { openAdmin, handleHistoryMenu } = useUiStore();
  const {
    currentView,
    selectedContact,
    setCurrentView,
    initializeActiveContacts,
  } = useContactsStore();

  useEffect(() => {
    initializeActiveContacts();
  }, [user]);

  const renderBreadCrumb = () => {
    switch (currentView) {
      case "ContactAllTickets":
        return (
          <h1 className="text-2xl">
            <span
              onClick={() => setCurrentView("Contacts")}
              className="hover:underline cursor-pointer"
            >
              Contacts
            </span>{" "}
            / Tickets
          </h1>
        );
      case "ContactTickets":
        return (
          <h1 className="text-2xl">
            <span
              onClick={() => setCurrentView("Contacts")}
              className="hover:underline cursor-pointer"
            >
              Contacts
            </span>{" "}
            / {selectedContact} / Tickets
          </h1>
        );
      default:
        return <h1 className="text-2xl">Contacts</h1>;
    }
  };

  const renderComponent = () => {
    switch (currentView) {
      case "ContactAllTickets":
        return <ViewAllTickets />;
      case "ContactTickets":
        return <ViewContactTickets />;
      default:
        return <ViewContacts />;
    }
  };

  return (
    <div
      onClick={() => {
        if (window.innerWidth < 1023) {
          openAdmin && handleHistoryMenu(false);
        }
      }}
      className={`relative flex flex-col h-full w-full text-sm ${
        openAdmin && "lg:opacity-100 opacity-5 xl:ml-[250px]"
      }  dark:bg-black transition-all duration-300 ease bg-white `}
    >
      <div className="dark:border-b-white/20 border-b p-4">
        {renderBreadCrumb()}
      </div>
      <div className="flex flex-col h-full overflow-hidden text-sm ">
        {renderComponent()}
      </div>
    </div>
  );
};

export default Contacts;
