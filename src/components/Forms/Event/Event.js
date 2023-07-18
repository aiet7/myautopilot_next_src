const EventForm = ({
  currentEventSubject,
  setCurrentEventSubject,
  currentEventBody,
  setCurrentEventBody,
  currentEventStartTime,
  setCurrentEventStartTime,
  currentEventEndTime,
  setCurrentEventEndTime,
  currentEventLocation,
  setCurrentEventLocation,
  currentEventUserInfo,
  setCurrentEventUserInfo,
  loading,
  handleScheduleConfirmation,
  itemId,
}) => {
  return (
    <div>
      <div className="flex flex-col gap-2">
        <div>
          <span className="font-bold">Subject</span>
          <input
            className="h-[50px] border outline-blue-500 w-full px-4"
            value={currentEventSubject}
            onChange={(e) => setCurrentEventSubject(e.target.value)}
          />
        </div>
        <div>
          <span className="font-bold">Body</span>
          <input
            className="h-[50px] border outline-blue-500 w-full px-4"
            value={currentEventBody}
            onChange={(e) => setCurrentEventBody(e.target.value)}
          />
        </div>
        <div>
          <span className="font-bold">Start Time</span>
          <input
            type="datetime-local"
            className="h-[50px] border outline-blue-500 w-full px-4"
            value={currentEventStartTime}
            onChange={(e) => setCurrentEventStartTime(e.target.value)}
          />
        </div>
        <div>
          <span className="font-bold">End Time</span>
          <input
            type="datetime-local"
            className="h-[50px] border outline-blue-500 w-full px-4"
            value={currentEventEndTime}
            onChange={(e) => setCurrentEventEndTime(e.target.value)}
          />
        </div>
        <div>
          <span className="font-bold">Location</span>
          <input
            className="h-[50px] border outline-blue-500 w-full px-4"
            value={currentEventLocation}
            onChange={(e) => setCurrentEventLocation(e.target.value)}
          />
        </div>
        <div>
          <span className="font-bold">Name</span>
          <input
            className="h-[50px] border outline-blue-500 w-full px-4"
            value={currentEventUserInfo[0]?.name || ""}
            onChange={(e) =>
              setCurrentEventUserInfo([
                {
                  ...currentEventUserInfo[0],
                  name: e.target.value,
                },
              ])
            }
          />
        </div>
        <div>
          <span className="font-bold">Email</span>
          <input
            className="h-[50px] border outline-blue-500 w-full px-4"
            value={currentEventUserInfo[0]?.email || ""}
            onChange={(e) =>
              setCurrentEventUserInfo([
                {
                  ...currentEventUserInfo[0],
                  email: e.target.value,
                },
              ])
            }
          />
        </div>
      </div>
      <div className="flex items-center gap-4 py-2">
        <button
          className="bg-green-300 rounded-md px-3 py-2 text-white"
          disabled={loading.eventForm}
          onClick={() => handleScheduleConfirmation(true, itemId)}
        >
          {loading.eventForm ? "Scheduling..." : "Schedule Event"}
        </button>
        <button
          className="bg-red-300 rounded-md px-3 py-2 text-white"
          onClick={() => handleScheduleConfirmation(false, itemId)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EventForm;
