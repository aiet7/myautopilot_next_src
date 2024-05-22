"use client";

import useQueueStore from "@/utils/store/interaction/queue/useQueueStore";

const MyActivities = () => {
  const { myActivities } = useQueueStore();

  return (
    <div className="">
      {myActivities?.length !== 0 ? (
        <div></div>
      ) : (
        <p className="text-xl font-bold text-black/20 w-full">
          You Have No Recent Activities
        </p>
      )}
    </div>
  );
};

export default MyActivities;
