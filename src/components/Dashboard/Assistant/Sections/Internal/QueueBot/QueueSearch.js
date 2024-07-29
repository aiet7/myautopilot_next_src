"use client";

import useQueueStore from "@/utils/store/interaction/queue/queueStore";

const QueueSearch = () => {
  const { searchValue, setSearchValue } = useQueueStore();
  return (
    <input
      value={searchValue}
      onChange={(e) => setSearchValue(e.target.value)}
      className="w-full p-1 rounded-md border"
      placeholder="Search Tickets"
    />
  );
};

export default QueueSearch;
