"use client";

import useQueueStore from "@/utils/store/interaction/queue/queueStore";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

import moment from "moment";
import useUserStore from "@/utils/store/user/userStore";

const Activities = () => {
  const { user } = useUserStore();
  const {
    currentActivitiesOption,
    myActivities,
    allActivities,
    handleShowMyActivities,
    handleShowAllActivities,
  } = useQueueStore();

  const localizer = momentLocalizer(moment);

  const activities =
    currentActivitiesOption === "myActivities" ? myActivities : allActivities;
  ("text-sm border transition ease-in hover:bg-[#FFFFFF] hover:text-[#465E89]   bg-[#465E89] text-white font-bold px-5 rounded-lg py-1");
  return (
    <div className="flex flex-col gap-4 h-full overflow-hidden p-4">
      <div className="flex items-center gap-2">
        <button
          onClick={() =>
            handleShowMyActivities(user?.mspCustomDomain, user?.id)
          }
          className={`${
            currentActivitiesOption === "myActivities"
              ? "bg-[#465E89] text-white"
              : "bg-[#465E89]/10 text-white/30"
          } text-sm border font-bold transition ease-in hover:bg-[#465E89] hover:text-white text-white py-2 rounded w-[120px]`}
        >
          My Activities
        </button>
        <button
          onClick={() => handleShowAllActivities(user?.mspCustomDomain)}
          className={`${
            currentActivitiesOption === "allActivities"
              ? "bg-[#465E89] text-white"
              : "bg-[#465E89]/10 text-white/30"
          } text-sm border font-bold transition ease-in hover:bg-[#465E89] hover:text-white text-white py-2 rounded w-[120px]`}
        >
          All Activities
        </button>
      </div>
      <div className="flex-1 overflow-auto ">
        <Calendar
          localizer={localizer}
          events={activities?.map((activity) => ({
            title: `Ticket ID: ${activity.ticketId}`,
            start: new Date(activity.sessions[0].startTime),
            end: new Date(activity.sessions[0].endTime),
            allDay: false,
            resource: activity.techId,
          }))}
          startAccessor="start"
          endAccessor="end"
          style={{ height: "100%", fontSize: "12px" }}
          views={[Views.DAY]}
          defaultView={Views.DAY}
          defaultDate={new Date()}
        />
      </div>
    </div>
  );
};

export default Activities;
