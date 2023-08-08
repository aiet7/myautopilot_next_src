const EventForm = ({
  currentEventSummary,
  setCurrentEventSummary,
  currentEventDescription,
  setCurrentEventDescription,
  currentEventStartTime,
  setCurrentEventStartTime,
  currentEventEndTime,
  setCurrentEventEndTime,
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
            value={currentEventSummary || ""}
            onChange={(e) => setCurrentEventSummary(e.target.value)}
          />
        </div>
        <div>
          <span className="font-bold">Body</span>
          <input
            className="h-[50px] border outline-blue-500 w-full px-4"
            value={currentEventDescription || ""}
            onChange={(e) => setCurrentEventDescription(e.target.value)}
          />
        </div>
        <div>
          <span className="font-bold">Start Time</span>
          <input
            type="datetime-local"
            className="h-[50px] border outline-blue-500 w-full px-4"
            value={currentEventStartTime || ""}
            onChange={(e) => setCurrentEventStartTime(e.target.value)}
          />
        </div>
        <div>
          <span className="font-bold">End Time</span>
          <input
            type="datetime-local"
            className="h-[50px] border outline-blue-500 w-full px-4"
            value={currentEventEndTime || ""}
            onChange={(e) => setCurrentEventEndTime(e.target.value)}
          />
        </div>
      </div>
      <div className="flex items-center gap-4 py-2">
        <button
          className="border border-white/30 bg-blue-800 px-3 py-1 text-white"
          disabled={loading.eventForm}
          onClick={() => handleScheduleConfirmation(true, itemId)}
        >
          {loading.eventForm ? "Scheduling..." : "Schedule Event"}
        </button>
        <button
          className="dark:text-white dark:border-white/30 border border-blue-800 px-3 py-1 text-blue-800"
          onClick={() => handleScheduleConfirmation(false, itemId)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EventForm;