"use client";

import useTicketsStore from "@/utils/store/interaction/tickets/ticketsStore";

const TicketSearch = () => {
    const { searchValue, setSearchValue } = useTicketsStore();
    
  return (
    <input
      value={searchValue}
      onChange={(e) => setSearchValue(e.target.value)}
      className="w-full p-1 rounded-md border"
      placeholder="Search Tickets"
    />
  );
};

export default TicketSearch;
