// "use client";

// import Pagination from "./Sections/Internal/Pagination";
// import TicketMode from "./Sections/Internal/TicketBot/TicketMode";
// import ChatMode from "./Sections/Internal/ChatBot/ChatMode";
// import QueueMenus from "./Sections/Internal/QueueBot/QueueMode";
// import useUiStore from "@/utils/store/ui/uiStore";
// import useTicketsStore from "@/utils/store/interaction/tickets/ticketsStore";
// import useQueueStore from "@/utils/store/interaction/queue/queueStore";
// import useConversationStore from "@/utils/store/interaction/conversations/conversationsStore";
// import useUserStore from "@/utils/store/user/userStore";

// const AssistantMenus = () => {
//   const { user } = useUserStore();

//   const { currentNavOption } = useUiStore();

//   const { activeTicketBotMode } = useTicketsStore();
//   const {
//     eligibleView,
//     activeQueueBotMode,
//     setEligibleView,
//     handleShowAllEligibleTickets,
//   } = useQueueStore();

//   const { selectedAgent, assistantMode, setAssistantMode, handleDeleteAgent } =
//     useConversationStore();

//   const renderModeComponent = () => {
//     switch (currentNavOption) {
//       case "Tickets":
//         return <TicketMode />;
//       case "Assistant":
//         return <ChatMode />;
//       case "Dispatch":
//         return <QueueMenus />;
//       default:
//         return null;
//     }
//   };

//   const showPagination =
//     assistantMode !== "Create" &&
//     assistantMode !== "Edit" &&
//     ((currentNavOption === "Tickets" && activeTicketBotMode === "History") ||
//       currentNavOption === "Assistant" ||
//       (currentNavOption === "Dispatch" &&
//         activeQueueBotMode === "All Queue Tickets"));

//   return (
//     <div className="dark:bg-gray-900 shadow-xl bg-white w-full py-2 px-4">
//       <div className="grid gap-4 grid-cols-1 grid-cols-[auto,1fr] items-center">
//         <div className="flex items-center gap-2  flex-wrap">
//           {renderModeComponent()}
//           {currentNavOption === "Assistant" && (
//             <div className="flex items-center gap-1 flex-wrap">
//               <button
//                 onClick={() => setAssistantMode("Edit")}
//                 className={`${
//                   assistantMode === "Edit" ? "bg-blue-500" : "bg-[#465E89]"
//                 } text-xs border transition ease-in hover:bg-[#FFFFFF] hover:text-[#465E89] font-semibold text-white rounded-md px-2 py-1`}
//               >
//                 Edit
//               </button>
//               <button
//                 onClick={() => setAssistantMode("Create")}
//                 className={`${
//                   assistantMode === "Create" ? "bg-blue-500" : "bg-[#465E89]"
//                 } text-xs border transition ease-in hover:bg-[#FFFFFF] hover:text-[#465E89] font-semibold text-white rounded-md px-2 py-1`}
//               >
//                 Create Assistant
//               </button>
//               <button
//                 onClick={() => handleDeleteAgent(selectedAgent?.id)}
//                 className="text-xs border transition ease-in hover:bg-[#FFFFFF] hover:text-[#465E89] bg-red-500 font-semibold text-white rounded-md px-2 py-1"
//               >
//                 Delete
//               </button>
//             </div>
//           )}
//           {currentNavOption === "Dispatch" &&
//             activeQueueBotMode === "All Queue Tickets" && (
//               <button
//                 onClick={() =>
//                   eligibleView
//                     ? setEligibleView(false)
//                     : handleShowAllEligibleTickets(
//                         user?.mspCustomDomain,
//                         user?.id,
//                         user?.connectWiseTechnicanId
//                       )
//                 }
//                 className="text-xs border transition ease-in hover:bg-[#FFFFFF] hover:text-[#465E89] bg-[#465E89] font-semibold text-white rounded-md px-2 py-1"
//               >
//                 {eligibleView ? "See All Tickets" : "See Eligible Tickets"}
//               </button>
//             )}
//         </div>

//         <div className="flex justify-end  w-full ">
//           {showPagination && <Pagination />}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AssistantMenus;

"use client";

import Pagination from "./Sections/Internal/Pagination";
import TicketMode from "./Sections/Internal/TicketBot/TicketMode";
import ChatMode from "./Sections/Internal/ChatBot/ChatMode";
import QueueMenus from "./Sections/Internal/QueueBot/QueueMode";
import useUiStore from "@/utils/store/ui/uiStore";
import useTicketsStore from "@/utils/store/interaction/tickets/ticketsStore";
import useQueueStore from "@/utils/store/interaction/queue/queueStore";
import useConversationStore from "@/utils/store/interaction/conversations/conversationsStore";
import useAssistantStore from "@/utils/store/assistant/assistantStore";
import useUserStore from "@/utils/store/user/userStore";
import { MdFullscreen } from "react-icons/md";
import { IoFilter } from "react-icons/io5";
import TicketFilterMenu from "./Sections/Internal/TicketBot/TicketFilterMenu";
import ChatFilterMenu from "./Sections/Internal/ChatBot/ChatFilterMenu";
import QueueFilterMenu from "./Sections/Internal/QueueBot/AllQueueTickets/QueueFilterMenu";
import { useRef, useEffect } from "react";

const AssistantMenus = () => {
  const { user } = useUserStore();
  const { assistantMenuOpen, setAssistantMenuOpen } = useAssistantStore();

  const { currentNavOption, setToggleFullScreen } = useUiStore();

  const { activeTicketBotMode } = useTicketsStore();
  const {
    eligibleView,
    activeQueueBotMode,
    setEligibleView,
    handleShowAllEligibleTickets,
  } = useQueueStore();

  const { selectedAgent, assistantMode, setAssistantMode, handleDeleteAgent } =
    useConversationStore();

  const renderModeComponent = () => {
    switch (currentNavOption) {
      case "Tickets":
        return <TicketMode />;
      case "Assistant":
        return <ChatMode />;
      case "Dispatch":
        return <QueueMenus />;
      default:
        return null;
    }
  };

  const filterRef = useRef(null);

  const handleClickOutside = (event) => {
    if (filterRef.current && !filterRef.current.contains(event.target)) {
      setAssistantMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const showPagination =
    assistantMode !== "Create" &&
    assistantMode !== "Edit" &&
    ((currentNavOption === "Tickets" && activeTicketBotMode === "History") ||
      currentNavOption === "Assistant" ||
      (currentNavOption === "Dispatch" &&
        activeQueueBotMode === "All Queue Tickets"));

  const renderFilterMenu = () => {
    switch (currentNavOption) {
      case "Tickets":
        return <TicketFilterMenu />;
      case "Assistant":
        return <ChatFilterMenu />;
      case "Dispatch":
        return <QueueFilterMenu />;

      default:
        return null;
    }
  };

  return (
    <div className="dark:bg-gray-900 shadow-xl bg-white w-full py-2 px-4">
      <div className="grid gap-4 grid-cols-1 grid-cols-[auto,1fr] items-center">
        <div className="flex items-center gap-2  flex-wrap">
          {renderModeComponent()}
          {currentNavOption === "Assistant" && (
            <div className="flex items-center gap-1 flex-wrap">
              <button
                onClick={() => setAssistantMode("Edit")}
                className={`${
                  assistantMode === "Edit" ? "bg-blue-500" : "bg-[#465E89]"
                } text-xs border transition ease-in hover:bg-[#FFFFFF] hover:text-[#465E89] font-semibold text-white rounded px-2 py-1`}
              >
                Edit
              </button>
              <button
                onClick={() => setAssistantMode("Create")}
                className={`${
                  assistantMode === "Create" ? "bg-blue-500" : "bg-[#465E89]"
                } text-xs border transition ease-in hover:bg-[#FFFFFF] hover:text-[#465E89] font-semibold text-white rounded px-2 py-1`}
              >
                Create Assistant
              </button>
              <button
                onClick={() => handleDeleteAgent(selectedAgent?.id)}
                className="text-xs border transition ease-in hover:bg-[#FFFFFF] hover:text-[#465E89] bg-red-500 font-semibold text-white rounded px-2 py-1"
              >
                Delete
              </button>
            </div>
          )}

          {currentNavOption === "Dispatch" &&
            activeQueueBotMode === "All Queue Tickets" && (
              <button
                onClick={() =>
                  eligibleView
                    ? setEligibleView(false)
                    : handleShowAllEligibleTickets(
                        user?.mspCustomDomain,
                        user?.id,
                        user?.connectWiseTechnicanId
                      )
                }
                className="text-xs border transition ease-in hover:bg-[#FFFFFF] hover:text-[#465E89] bg-[#465E89] font-semibold text-white rounded px-2 py-1"
              >
                {eligibleView ? "See All Tickets" : "See Eligible Tickets"}
              </button>
            )}
        </div>

        <div className="flex justify-end w-full ">
          <div
            ref={filterRef}
            className="relative justify-center items-center flex"
          >
            <div
              onClick={() => setAssistantMenuOpen((prev) => !prev)}
              className={`
               flex justify-center items-center space-x-2 px-4 rounded hover:cursor-pointer`}
            >
              <span className="text-sm">Filters</span>
              <IoFilter size={20} />
            </div>
            {assistantMenuOpen && (
              <div className="absolute top-3 w-48 bg-white border-gray-300 rounded z-10">
                {renderFilterMenu()}
              </div>
            )}
          </div>

          {showPagination && <Pagination />}
          <MdFullscreen
            size="25"
            className="transition-transform duration-200 ease-in-out hover:scale-125 hover:cursor-pointer"
            onClick={setToggleFullScreen}
          />
        </div>
      </div>
    </div>
  );
};

export default AssistantMenus;
