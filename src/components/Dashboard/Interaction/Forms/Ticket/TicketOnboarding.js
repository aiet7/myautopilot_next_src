import useFormsStore from "@/utils/store/interaction/forms/formsStore";

const TicketOnboarding = ({}) => {
  const {
    ticket: { onBoarding },
    setTicket,
  } = useFormsStore();

  return (
    <div className="flex flex-col gap-2">
      <div>
        <div>
          <span className="font-bold">New Employee First name</span>
          <input
            value={onBoarding.currentTicketNewFirstName || ""}
            onChange={(e) =>
              setTicket("onBoarding.currentTicketNewFirstName", e.target.value)
            }
            className="h-[50px] border outline-blue-500 w-full px-4"
          />
        </div>
      </div>
      <div>
        <span className="font-bold">New Employee Last name</span>
        <input
          value={onBoarding.currentTicketNewLastName || ""}
          onChange={(e) =>
            setTicket("onBoarding.currentTicketNewLastName", e.target.value)
          }
          className="h-[50px] border outline-blue-500 w-full px-4"
        />
      </div>
      <div>
        <span className="font-bold">New Employee Email</span>
        <input
          value={onBoarding.currentTicketNewEmailId || ""}
          onChange={(e) =>
            setTicket("onBoarding.currentTicketNewEmailId", e.target.value)
          }
          className="h-[50px] border outline-blue-500 w-full px-4"
        />
      </div>
      <div>
        <span className="font-bold">New Employee Phone Number</span>
        <input
          value={onBoarding.currentTicketNewPhoneNumber || ""}
          onChange={(e) =>
            setTicket("onBoarding.currentTicketNewPhoneNumber", e.target.value)
          }
          className="h-[50px] border outline-blue-500 w-full px-4"
        />
      </div>
      <div>
        <span className="font-bold">LicenseId</span>
        <input
          value={onBoarding.currentTicketLicenseId || ""}
          onChange={(e) =>
            setTicket("onBoarding.currentTicketLicenseId", e.target.value)
          }
          className="h-[50px] border outline-blue-500 w-full px-4"
        />
      </div>
    </div>
  );
};

export default TicketOnboarding;
