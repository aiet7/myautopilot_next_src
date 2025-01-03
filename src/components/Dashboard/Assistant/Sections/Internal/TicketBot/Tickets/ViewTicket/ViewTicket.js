// "use client";

// import { IoMdArrowRoundBack } from "react-icons/io";
// import Ticket from "./Ticket";
// import Notes from "./Notes";
// import TicketNav from "./TicketNav";
// import useTicketsStore from "@/utils/store/interaction/tickets/ticketsStore";

// const ViewTicket = () => {
//   const { activeTicketButton, setViewTicket } = useTicketsStore();

//   const renderComponent = () => {
//     switch (activeTicketButton) {
//       case "Ticket":
//         return <Ticket />;
//       case "Notes":
//         return <Notes />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="flex flex-col gap-2 ">
//       <IoMdArrowRoundBack
//         className="cursor-pointer self-end"
//         onClick={() => setViewTicket(false)}
//         size={20}
//       />
//       <TicketNav />
//       {renderComponent()}
//     </div>
//   );
// };

// export default ViewTicket;

"use client";

import { IoMdArrowRoundBack } from "react-icons/io";
import Ticket from "./Ticket";
import Notes from "./Notes";
import Company from "./Company";
import useTicketsStore from "@/utils/store/interaction/tickets/ticketsStore";

const ViewTicket = () => {
  const { setViewTicket } = useTicketsStore();

  return (
    <div className="flex flex-col gap-4 pb-4">
      <IoMdArrowRoundBack
        className="cursor-pointer self-end"
        onClick={() => {
          setViewTicket(false);
        }}
        size={20}
      />
      <Company />
      <Ticket />
      <Notes />
    </div>
  );
};

export default ViewTicket;
