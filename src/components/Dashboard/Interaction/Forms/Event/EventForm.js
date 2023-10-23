import useFormsStore from "@/utils/store/interaction/forms/formsStore";

const EventForm = ({ itemId }) => {
  const { loading, event, setEvent, handleScheduleConfirmation } =
    useFormsStore();
  return (
    <div>
      <div className="flex flex-col gap-2">
        <div>
          <span className="font-bold">Subject</span>
          <input
            className="h-[50px] border outline-blue-500 w-full px-4"
            value={event.currentEventSummary || ""}
            onChange={(e) => setEvent("currentEventSummary", e.target.value)}
          />
        </div>
        <div>
          <span className="font-bold">Body</span>
          <input
            className="h-[50px] border outline-blue-500 w-full px-4"
            value={event.currentEventDescription || ""}
            onChange={(e) =>
              setEvent("currentEventDescription", e.target.value)
            }
          />
        </div>
        <div>
          <span className="font-bold">Start Time</span>
          <input
            type="datetime-local"
            className="h-[50px] border outline-blue-500 w-full px-4"
            value={event.currentEventStartTime || ""}
            onChange={(e) => setEvent("currentEventStartTime", e.target.value)}
          />
        </div>
        <div>
          <span className="font-bold">End Time</span>
          <input
            type="datetime-local"
            className="h-[50px] border outline-blue-500 w-full px-4"
            value={event.currentEventEndTime || ""}
            onChange={(e) => setEvent("currentEventEndTime", e.target.value)}
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
