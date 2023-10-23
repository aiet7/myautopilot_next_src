import MarkedInteraction from "../../Marked/MarkedInteraction";

import Troubleshoot from "./Ticket/Troubleshoot";

import EmailButtons from "./Email/EmailButtons.js";
import EmailForm from "./Email/EmailForm.js";
import ContactForm from "./Contact/ContactForm.js";
import TicketForm from "./Ticket/TicketForm.js";
import EventForm from "./Event/EventForm.js";
import TaskForm from "./Task/TaskForm.js";
import useTicketConversationsStore from "@/utils/store/interaction/conversations/ticketConversationsStore";
import { useEffect } from "react";

const Switch = ({ item, itemId }) => {
  const { activeSectionButton, isMobile, setIsMobile, setActiveSectionButton } =
    useTicketConversationsStore();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 1023);
      };
      handleResize();

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  switch (item.type) {
    case "form":
      switch (item.formType) {
        case "emailButtons + emailForm":
          return (
            <div className="flex flex-col gap-6">
              <p>Please select an email address.</p>
              <EmailButtons />
              <EmailForm itemId={itemId} />
            </div>
          );

        case "contactForm + emailForm":
          return (
            <div className="flex flex-col gap-6">
              <p>Would you like to add this email to your contacts?.</p>
              <ContactForm />
              <EmailForm itemId={itemId} />
            </div>
          );
        case "contactForm":
          return (
            <div className="flex flex-col gap-6">
              <p>Add email to contact.</p>
              <ContactForm itemId={itemId} />
            </div>
          );
        case "ticketForm":
          return (
            <div className="flex flex-col gap-6">
              <p>Create a support ticket.</p>
              <div
                className={`${
                  isMobile ? "flex-col" : "flex-row"
                } flex gap-6 items-start`}
              >
                {isMobile ? (
                  <>
                    <div className="dark:border-white/20 flex items-center border rounded w-full">
                      <button
                        onClick={() => setActiveSectionButton("Form")}
                        className={`${
                          activeSectionButton === "Form" &&
                          "bg-blue-800 text-white"
                        } w-full rounded p-2`}
                      >
                        Form
                      </button>
                      <button
                        onClick={() => setActiveSectionButton("Troubleshoot")}
                        className={`${
                          activeSectionButton === "Troubleshoot" &&
                          "bg-blue-800 text-white"
                        } w-full rounded p-2`}
                      >
                        Troubleshoot
                      </button>
                    </div>
                    <div className="w-full">
                      {activeSectionButton === "Form" && (
                        <TicketForm itemId={itemId} />
                      )}
                      {activeSectionButton === "Troubleshoot" && (
                        <Troubleshoot />
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex-1">
                      <TicketForm itemId={itemId} />
                    </div>
                    <div className="flex-1">
                      <Troubleshoot />
                    </div>
                  </>
                )}
              </div>
            </div>
          );
        case "eventForm":
          return (
            <div className="flex flex-col gap-6">
              <p>Schedule an event.</p>
              <EventForm itemId={itemId} />
            </div>
          );
        case "taskForm":
          return (
            <div className="flex flex-col gap-6">
              <p>Create a task.</p>
              <TaskForm itemId={itemId} />
            </div>
          );

        default:
          return null;
      }
    default:
      return <MarkedInteraction id={item.id} markdown={item.content} />;
  }
};
export default Switch;
