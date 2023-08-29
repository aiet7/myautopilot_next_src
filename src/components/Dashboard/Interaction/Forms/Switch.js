import MarkedInteraction from "../../Marked/MarkedInteraction";

import EmailButtons from "./Email/EmailButtons.js";
import EmailForm from "./Email/EmailForm.js";
import ContactForm from "./Contact/ContactForm.js";
import TicketForm from "./Ticket/Ticket.js";
import EventForm from "./Event/Event.js";
import TaskForm from "./Task/TaskForm.js";

const Switch = ({ item, itemId }) => {
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
              <TicketForm itemId={itemId} />
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
