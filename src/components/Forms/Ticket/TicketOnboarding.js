const TicketOnboarding = ({
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
}) => {
  return (
    <div className="flex flex-col gap-2">
      <div>
        <div>
          <span className="font-bold">New Employee First name</span>
          <input
            value={currentTicketNewFirstName || ""}
            onChange={(e) => setCurrentTicketNewFirstName(e.target.value)}
            className="h-[50px] border outline-blue-500 w-full px-4"
          />
        </div>
      </div>
      <div>
        <span className="font-bold">New Employee Last name</span>
        <input
          value={currentTicketNewLastName || ""}
          onChange={(e) => setCurrentTicketNewLastName(e.target.value)}
          className="h-[50px] border outline-blue-500 w-full px-4"
        />
      </div>
      <div>
        <span className="font-bold">New Employee Email</span>
        <input
          value={currentTicketNewEmailId || ""}
          onChange={(e) => setCurrentTicketNewEmailId(e.target.value)}
          className="h-[50px] border outline-blue-500 w-full px-4"
        />
      </div>
      <div>
        <span className="font-bold">New Employee Phone Number</span>
        <input
          value={currentTicketNewPhoneNumber || ""}
          onChange={(e) => setCurrentTicketNewPhoneNumber(e.target.value)}
          className="h-[50px] border outline-blue-500 w-full px-4"
        />
      </div>
      <div>
        <span className="font-bold">LicenseId</span>
        <input
          value={currentTicketLicenseId || ""}
          onChange={(e) => setCurrentTicketLicenseId(e.target.value)}
          className="h-[50px] border outline-blue-500 w-full px-4"
        />
      </div>
    </div>
  );
};

export default TicketOnboarding;
