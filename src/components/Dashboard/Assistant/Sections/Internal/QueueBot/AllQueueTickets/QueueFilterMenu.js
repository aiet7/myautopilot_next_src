"use client";

import useQueueStore from "@/utils/store/interaction/queue/queueStore";
import useAssistantStore from "@/utils/store/assistant/assistantStore";
const QueueFilterMenu = () => {
  const { setAssistantMenuOpen } = useAssistantStore();
  const {
    filterQueueTicketMode,
    allQueueTickets,
    filterQueueTicketModeOpen,
    setActiveFilterMode,
    setActiveQueueFilterModeOpen,
  } = useQueueStore();

  const uniqueTypes = [
    ...new Set(allQueueTickets?.map((ticket) => ticket.categoryName)),
  ];
  const uniqueSubTypes = [
    ...new Set(allQueueTickets?.map((ticket) => ticket.subCategoryName)),
  ];
  const uniquePriorities = [
    ...new Set(allQueueTickets?.map((ticket) => ticket.priority)),
  ];


  return (
    <div
      onMouseLeave={() => setActiveQueueFilterModeOpen("")}
      className="absolute top-4 z-[100] left-1 w-full bg-white border rounded shadow-lg "
    >
      <div
        className={`${
          filterQueueTicketMode === "Newest" ? "bg-black/20" : ""
        } px-4 py-2 cursor-pointer hover:bg-black/20`}
        onClick={() => {
          setActiveFilterMode("Newest");
          setAssistantMenuOpen(false);
        }}
        onMouseEnter={() => setActiveQueueFilterModeOpen("")}
      >
        Newest
      </div>
      <div
        className={`${
          filterQueueTicketMode === "Oldest" ? "bg-black/20" : ""
        } px-4 py-2 cursor-pointer hover:bg-black/20`}
        onClick={() => {
          setActiveFilterMode("Oldest");
          setAssistantMenuOpen(false);
        }}
        onMouseEnter={() => setActiveQueueFilterModeOpen("")}
      >
        Oldest
      </div>
      <div
        className={`${
          filterQueueTicketMode === "Closed" ? "bg-black/20" : ""
        } px-4 py-2 cursor-pointer hover:bg-black/20`}
        onClick={() => {
          setActiveFilterMode("Closed");
          setAssistantMenuOpen(false);
        }}
        onMouseEnter={() => setActiveQueueFilterModeOpen("")}
      >
        Closed
      </div>

      <div className="relative">
        <div
          className={`relative px-4 py-2 cursor-pointer hover:bg-black/20 ${
            filterQueueTicketModeOpen === "Type" ||
            uniqueTypes.includes(filterQueueTicketMode)
              ? "bg-black/20"
              : ""
          }`}
          onMouseEnter={() => setActiveQueueFilterModeOpen("Type")}
        >
          Type
        </div>
        {filterQueueTicketModeOpen === "Type" && (
          <div className="absolute right-full top-0  w-48 max-h-80 bg-white border rounded shadow-lg z-[100] overflow-y-auto scrollbar-thin">
            {uniqueTypes.map((type) => (
              <div
                key={type}
                className={`${
                  filterQueueTicketMode === type ? "bg-black/20" : ""
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
            filterQueueTicketModeOpen === "Subtype" ||
            uniqueSubTypes.includes(filterQueueTicketMode)
              ? "bg-black/20"
              : ""
          }`}
          onMouseEnter={() => setActiveQueueFilterModeOpen("Subtype")}
        >
          Subtype
        </div>
        {filterQueueTicketModeOpen === "Subtype" && (
          <div className="absolute right-full top-0 w-48 max-h-80 bg-white border rounded shadow-lg overflow-y-auto scrollbar-thin">
            {uniqueSubTypes.map((subType) => (
              <div
                key={subType}
                className={`${
                  filterQueueTicketMode === subType ? "bg-black/20" : ""
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
            filterQueueTicketModeOpen === "Priority" ||
            uniquePriorities.includes(filterQueueTicketMode)
              ? "bg-black/20"
              : ""
          }`}
          onMouseEnter={() => setActiveQueueFilterModeOpen("Priority")}
        >
          Priority
        </div>
        {filterQueueTicketModeOpen === "Priority" && (
          <div className="absolute right-full top-0 w-48 max-h-80 bg-white border rounded shadow-lg overflow-y-auto scrollbar-thin">
            {uniquePriorities.map((priority) => (
              <div
                key={priority}
                className={`${
                  filterQueueTicketMode === priority ? "bg-black/20" : ""
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

export default QueueFilterMenu;
