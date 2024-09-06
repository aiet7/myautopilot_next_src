"use client";

import useAssistantStore from "@/utils/store/assistant/assistantStore";
import useTicketsStore from "@/utils/store/interaction/tickets/ticketsStore";

const TicketFilterMenu = () => {
  const { setAssistantMenuOpen } = useAssistantStore();
  const {
    tickets,
    filterTicketMode,
    filterTicketModeOpen,
    setActiveFilterMode,
    setActiveTicketFilterModeOpen,
  } = useTicketsStore();

  const uniqueTypes = [
    ...new Set(tickets?.map((ticket) => ticket.type || ticket.category)),
  ];
  const uniqueSubTypes = [
    ...new Set(tickets?.map((ticket) => ticket.subType || ticket.subcategory)),
  ];
  const uniquePriorities = [
    ...new Set(tickets?.map((ticket) => ticket.priority)),
  ];

  return (
    <div
      onMouseLeave={() => setActiveTicketFilterModeOpen("")}
      className="absolute top-4 z-[100] left-1 w-full bg-white border rounded shadow-lg "
    >
      <div
        className={`${
          filterTicketMode === "Newest" ? "bg-black/20" : ""
        } px-4 py-2 cursor-pointer hover:bg-black/20`}
        onClick={() => {
          setActiveFilterMode("Newest");
          setAssistantMenuOpen(false);
        }}
        onMouseEnter={() => setActiveTicketFilterModeOpen("")}
      >
        Newest
      </div>
      <div
        className={`${
          filterTicketMode === "Oldest" ? "bg-black/20" : ""
        } px-4 py-2 cursor-pointer hover:bg-black/20`}
        onClick={() => {
          setActiveFilterMode("Oldest");
          setAssistantMenuOpen(false);
        }}
        onMouseEnter={() => setActiveTicketFilterModeOpen("")}
      >
        Oldest
      </div>
      <div
        className={`${
          filterTicketMode === "Closed" ? "bg-black/20" : ""
        } px-4 py-2 cursor-pointer hover:bg-black/20`}
        onClick={() => {
          setActiveFilterMode("Closed");
          setAssistantMenuOpen(false);
        }}
        onMouseEnter={() => setActiveTicketFilterModeOpen("")}
      >
        Closed
      </div>

      <div className="relative">
        <div
          className={`relative px-4 py-2 cursor-pointer hover:bg-black/20 ${
            filterTicketModeOpen === "Type" ||
            uniqueTypes.includes(filterTicketMode)
              ? "bg-black/20"
              : ""
          }`}
          onMouseEnter={() => setActiveTicketFilterModeOpen("Type")}
        >
          Type
        </div>
        {filterTicketModeOpen === "Type" && (
          <div className="absolute right-full top-0  w-48 max-h-80 bg-white border rounded shadow-lg z-[100] overflow-y-auto scrollbar-thin">
            {uniqueTypes.map((type) => (
              <div
                key={type}
                className={`${
                  filterTicketMode === type ? "bg-black/20" : ""
                } px-4 py-2 cursor-pointer hover:bg-black/20`}
                onClick={() => {
                  setActiveFilterMode(type);
                  setAssistantMenuOpen(false);
                }}
              >
                {type}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="relative">
        <div
          className={`relative px-4 py-2 cursor-pointer hover:bg-black/20 ${
            filterTicketModeOpen === "Subtype" ||
            uniqueSubTypes.includes(filterTicketMode)
              ? "bg-black/20"
              : ""
          }`}
          onMouseEnter={() => setActiveTicketFilterModeOpen("Subtype")}
        >
          Subtype
        </div>
        {filterTicketModeOpen === "Subtype" && (
          <div className="absolute right-full top-0 w-48 max-h-80 bg-white border rounded shadow-lg overflow-y-auto scrollbar-thin">
            {uniqueSubTypes.map((subType) => (
              <div
                key={subType}
                className={`${
                  filterTicketMode === subType ? "bg-black/20" : ""
                } px-4 py-2 cursor-pointer hover:bg-black/20`}
                onClick={() => {
                  setActiveFilterMode(subType);
                  setAssistantMenuOpen(false);
                }}
              >
                {subType}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="relative">
        <div
          className={`relative px-4 py-2 cursor-pointer hover:bg-black/20 ${
            filterTicketModeOpen === "Priority" ||
            uniquePriorities.includes(filterTicketMode)
              ? "bg-black/20"
              : ""
          }`}
          onMouseEnter={() => setActiveTicketFilterModeOpen("Priority")}
        >
          Priority
        </div>
        {filterTicketModeOpen === "Priority" && (
          <div className="absolute right-full top-0 w-48 max-h-80 bg-white border rounded shadow-lg overflow-y-auto scrollbar-thin">
            {uniquePriorities.map((priority) => (
              <div
                key={priority}
                className={`${
                  filterTicketMode === priority ? "bg-black/20" : ""
                } px-4 py-2 cursor-pointer hover:bg-black/20`}
                onClick={() => {
                  setActiveFilterMode(priority);
                  setAssistantMenuOpen(false);
                }}
              >
                {priority}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketFilterMenu;
