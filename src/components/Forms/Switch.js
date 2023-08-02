import { MarkedChatInteraction } from "../../utils/marked/marked.js";

import EmailButtons from "./Email/EmailButtons.js";
import EmailForm from "./Email/EmailForm.js";
import ContactForm from "./Contact/ContactForm.js";
import TicketForm from "./Ticket/Ticket.js";
import EventForm from "./Event/Event.js";
import TaskForm from "./Task/TaskForm.js";

const Switch = ({
  item,
  itemId,
  loading,
  categories,
  availableEmailIds,
  selectedEmailIndex,
  handleEmailSelection,
  currentEmailId,
  setCurrentEmailId,
  currentEmailSubject,
  setCurrentEmailSubject,
  currentEmailBody,
  setCurrentEmailBody,

  currentContactEmailIds,
  setCurrentContactEmailIds,
  currentContactGivenName,
  setCurrentContactGivenName,
  currentContactFamilyName,
  setCurrentContactFamilyName,
  currentContactMobileNumber,
  setCurrentContactMobileNumber,

  currentTicketTitle,
  setCurrentTicketTitle,
  currentTicketDescription,
  setCurrentTicketDescription,
  currentTicketCategory,
  setCurrentTicketCategory,
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

  currentEventSummary,
  setCurrentEventSummary,
  currentEventDescription,
  setCurrentEventDescription,
  currentEventStartTime,
  setCurrentEventStartTime,
  currentEventEndTime,
  setCurrentEventEndTime,

  currentTaskName,
  setCurrentTaskName,

  handleEmailConfirmation,
  handleContactConfirmation,
  handleTicketConfirmation,
  handleScheduleConfirmation,
  handleTaskConfirmation,
}) => {
  switch (item.type) {
    case "form":
      switch (item.formType) {
        case "emailButtons + emailForm":
          return (
            <div className="flex flex-col gap-6">
              <p>Please select an email address.</p>
              <EmailButtons
                availableEmailIds={availableEmailIds}
                selectedEmailIndex={selectedEmailIndex}
                handleEmailSelection={handleEmailSelection}
              />
              <EmailForm
                itemId={itemId}
                loading={loading}
                currentEmailId={currentEmailId}
                setCurrentEmailId={setCurrentEmailId}
                currentEmailSubject={currentEmailSubject}
                setCurrentEmailSubject={setCurrentEmailSubject}
                currentEmailBody={currentEmailBody}
                setCurrentEmailBody={setCurrentEmailBody}
                handleEmailConfirmation={handleEmailConfirmation}
              />
            </div>
          );

        case "contactForm + emailForm":
          return (
            <div className="flex flex-col gap-6">
              <p>Would you like to add this email to your contacts?.</p>
              <ContactForm
                showCancelButton={false}
                loading={loading}
                currentContactGivenName={currentContactGivenName}
                setCurrentContactGivenName={setCurrentContactGivenName}
                currentContactFamilyName={currentContactFamilyName}
                setCurrentContactFamilyName={setCurrentContactFamilyName}
                currentEmailId={currentEmailId}
                setCurrentEmailId={setCurrentEmailId}
                currentContactMobileNumber={currentContactMobileNumber}
                setCurrentContactMobileNumber={setCurrentContactMobileNumber}
                handleContactConfirmation={handleContactConfirmation}
              />
              <EmailForm
                itemId={itemId}
                loading={loading}
                currentEmailId={currentEmailId}
                setCurrentEmailId={setCurrentEmailId}
                currentEmailSubject={currentEmailSubject}
                setCurrentEmailSubject={setCurrentEmailSubject}
                currentEmailBody={currentEmailBody}
                setCurrentEmailBody={setCurrentEmailBody}
                handleEmailConfirmation={handleEmailConfirmation}
              />
            </div>
          );
        case "contactForm":
          return (
            <div className="flex flex-col gap-6">
              <p>Add email to contact.</p>
              <ContactForm
                showCancelButton={true}
                itemId={itemId}
                loading={loading}
                currentContactGivenName={currentContactGivenName}
                setCurrentContactGivenName={setCurrentContactGivenName}
                currentContactFamilyName={currentContactFamilyName}
                setCurrentContactFamilyName={setCurrentContactFamilyName}
                currentContactEmailIds={currentContactEmailIds}
                setCurrentContactEmailIds={setCurrentContactEmailIds}
                currentContactMobileNumber={currentContactMobileNumber}
                setCurrentContactMobileNumber={setCurrentContactMobileNumber}
                handleContactConfirmation={handleContactConfirmation}
              />
            </div>
          );
        case "ticketForm":
          return (
            <div className="flex flex-col gap-6">
              <p>Create a support ticket.</p>
              <TicketForm
                itemId={itemId}
                loading={loading}
                categories={categories}
                currentTicketTitle={currentTicketTitle}
                setCurrentTicketTitle={setCurrentTicketTitle}
                currentTicketDescription={currentTicketDescription}
                setCurrentTicketDescription={setCurrentTicketDescription}
                currentTicketCategory={currentTicketCategory}
                setCurrentTicketCategory={setCurrentTicketCategory}
                currentTicketSubCategory={currentTicketSubCategory}
                setCurrentTicketSubCategory={setCurrentTicketSubCategory}
                filteredSubCategories={filteredSubCategories}
                currentTicketName={currentTicketName}
                setCurrentTicketName={setCurrentTicketName}
                currentTicketEmailId={currentTicketEmailId}
                setCurrentTicketEmailId={setCurrentTicketEmailId}
                currentTicketPhoneNumber={currentTicketPhoneNumber}
                setCurrentTicketPhoneNumber={setCurrentTicketPhoneNumber}
                handleTicketConfirmation={handleTicketConfirmation}
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
            </div>
          );
        case "eventForm":
          return (
            <div className="flex flex-col gap-6">
              <p>Schedule an event.</p>
              <EventForm
                itemId={itemId}
                loading={loading}
                currentEventSummary={currentEventSummary}
                setCurrentEventSummary={setCurrentEventSummary}
                currentEventDescription={currentEventDescription}
                setCurrentEventDescription={setCurrentEventDescription}
                currentEventStartTime={currentEventStartTime}
                setCurrentEventStartTime={setCurrentEventStartTime}
                currentEventEndTime={currentEventEndTime}
                setCurrentEventEndTime={setCurrentEventEndTime}
                handleScheduleConfirmation={handleScheduleConfirmation}
              />
            </div>
          );
        case "taskForm":
          return (
            <div className="flex flex-col gap-6">
              <p>Create a task.</p>
              <TaskForm
                itemId={itemId}
                loading={loading}
                currentTaskName={currentTaskName}
                setCurrentTaskName={setCurrentTaskName}
                handleTaskConfirmation={handleTaskConfirmation}
              />
            </div>
          );

        default:
          return null;
      }
    default:
      return <MarkedChatInteraction markdown={item.content} />;
  }
};
export default Switch;
