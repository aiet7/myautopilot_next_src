"use client";

import useQueueStore from "@/utils/store/interaction/queue/useQueueStore";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

import moment from "moment";

const MyActivities = () => {
  const { myActivities } = useQueueStore();

  const localizer = momentLocalizer(moment);

  return (
    <div className="">
      {myActivities?.length !== 0 ? (
        <div>
          <Calendar
            localizer={localizer}
            events={myActivities?.map((activity) => ({
              title: `Ticket ID: ${activity.ticketId}`,
              start: new Date(activity.sessions[0].startTime),
              end: new Date(activity.sessions[0].endTime),
              allDay: false,
              resource: activity.techId,
            }))}
            startAccessor="start"
            endAccessor="end"
            style={{ height: "100%" }}
            views={[Views.DAY]}
            defaultView={[Views.DAY]}
            defaultDate={new Date()}
          />
        </div>
      ) : (
        <p className="text-xl font-bold text-black/20 w-full">
          You Have No Recent Activities
        </p>
      )}
    </div>
  );
};

export default MyActivities;
