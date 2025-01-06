// "use client";

// import useQueueStore from "@/utils/store/interaction/queue/queueStore";

// import { LuRectangleHorizontal } from "react-icons/lu";
// import { CiViewTable } from "react-icons/ci";
// import AllQueueTicketsTable from "./AllQueueTicketsTable";
// import AllQueueTicketsCards from "./AllQueueTicketsCards";
// import ViewTicket from "./ViewTicket/ViewTicket";
// import Pagination from "../../Pagination";

// const AllQueueTickets = () => {
//   const { cardView, viewQueueTicket, setCardView } = useQueueStore();

//   const renderComponent = () => {
//     switch (cardView) {
//       case true:
//         return <AllQueueTicketsCards />;

//       case false:
//         return <AllQueueTicketsTable />;

//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="flex flex-col h-full overflow-hidden p-4">
//       {viewQueueTicket ? (
//         <ViewTicket />
//       ) : (
//         <>
//           <div className="flex justify-between items-center mb-4">
//             <div className="">
//               {cardView ? (
//                 <CiViewTable
//                   className="cursor-pointer"
//                   size={20}
//                   onClick={() => setCardView(false)}
//                 />
//               ) : (
//                 <LuRectangleHorizontal
//                   className="cursor-pointer"
//                   size={20}
//                   onClick={() => setCardView(true)}
//                 />
//               )}
//             </div>
//           </div>
//           <div className="flex-1 overflow-auto scrollbar-thin">
//             {renderComponent()}
//             </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default AllQueueTickets;

"use client";

import useQueueStore from "@/utils/store/interaction/queue/queueStore";

import { LuRectangleHorizontal } from "react-icons/lu";
import { CiViewTable } from "react-icons/ci";
import AllQueueTicketsCards from "./AllQueueTicketsCards";
import ViewTicket from "./ViewTicket/ViewTicket";
import AllQueueTicketsTable from "./AllQueueTicketsTable";

const AllQueueTickets = () => {
  const { cardView, viewQueueTicket, setCardView } = useQueueStore();

  const renderComponent = () => {
    switch (cardView) {
      case true:
        return <AllQueueTicketsCards />;

      case false:
        return <AllQueueTicketsTable />;

      default:
        return null;
    }
  };

  return (
    <div className=" flex flex-col h-full p-4 dark:bg-black ">
      {viewQueueTicket ? (
        <ViewTicket />
      ) : (
        <>
          <div className="flex justify-between items-center mb-4 ">
            <div className="">
              {cardView ? (
                <CiViewTable
                  className="cursor-pointer"
                  size={20}
                  onClick={() => setCardView(false)}
                />
              ) : (
                <LuRectangleHorizontal
                  className="cursor-pointer"
                  size={20}
                  onClick={() => setCardView(true)}
                />
              )}
            </div>
          </div>
          <div className="flex-1 overflow-auto scrollbar-thin">
            {renderComponent()}
          </div>
        </>
      )}
    </div>
  );
};

export default AllQueueTickets;
