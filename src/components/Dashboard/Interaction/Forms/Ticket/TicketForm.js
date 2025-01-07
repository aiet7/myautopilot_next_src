// import useFormsStore from "@/utils/store/interaction/forms/formsStore";
// import TicketOnboarding from "./TicketOnboarding";
// import { useEffect } from "react";
// import useMspStore from "@/utils/store/auth/msp/mspStore";

// const TicketForm = () => {
//   const { userType } = useMspStore();
//   const {
//     loading,
//     formError,
//     ticket,
//     setTicket,
//     handleCreateTicketCategories,
//     handleTicketConfirmation,
//   } = useFormsStore();

//   useEffect(() => {
//     handleCreateTicketCategories();
//   }, []);
//   return (
//     <div className="flex flex-col gap-2 overflow-y-auto p-4 h-full scrollbar-thin">
//       {ticket?.currentTicketTitle === "" ? (
//         <div className="flex flex-col gap-2">
//           <p className="text-xl font-semibold">
//             No Tickets Are Currently Opened or Created
//           </p>
//           <p className="text-gray-500">
//             If you would like to open a ticket, please interact with our agent
//             to get started.
//           </p>
//         </div>
//       ) : (
//         <div className="flex flex-col  justify-between h-full">
//           <div className="flex flex-col gap-2">
//             {userType === "tech" && (
//               <div>
//                 <span className="font-bold">Company</span>
//                 <select
//                   className={`h-[30px] px-3 w-full border ${
//                     formError?.currentTicketCWCompanyId
//                       ? "border-red-500"
//                       : "border-transparent"
//                   }`}
//                   value={ticket.currentTicketCWCompanyId || ""}
//                   onChange={(e) => {
//                     setTicket(
//                       "currentTicketCWCompanyId",
//                       e.target.value,
//                       null,
//                       null,
//                       null,
//                       null,
//                       null,
//                       null,
//                       null,
//                       null,
//                       null,
//                       null,
//                       null,
//                       null
//                     );
//                   }}
//                 >
//                   <option value="" disabled>
//                     Select Company
//                   </option>
//                   {ticket.currentCompanies?.map((company) => {
//                     const {id, name, connectWiseCompanyId } = company;
//                     return (
//                       <option
//                         key={id}
//                         value={connectWiseCompanyId}
//                       >
//                         {name}
//                       </option>
//                     );
//                   })}
//                 </select>
//               </div>
//             )}

//             {userType === "tech" && (
//               <div>
//                 <span className="font-bold">Board</span>
//                 <select
//                   className={`h-[30px] px-3 w-full border ${
//                     formError?.currentTicketBoardId
//                       ? "border-red-500"
//                       : "border-transparent"
//                   }`}
//                   value={ticket.currentTicketBoardId || ""}
//                   onChange={(e) => {
//                     const newBoardId = parseInt(e.target.value, 10);
//                     setTicket(
//                       "currentTicketBoardId",
//                       newBoardId,
//                       newBoardId,
//                       null,
//                       null,
//                       null,
//                       null,
//                       null,
//                       null,
//                       null,
//                       null,
//                       null,
//                       null,
//                       null
//                     );
//                   }}
//                 >
//                   <option value="" disabled>
//                     Select Board
//                   </option>
//                   {ticket.categories?.boardDetails?.map((board) => (
//                     <option key={board.boardId} value={board.boardId}>
//                       {board.boardName}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             )}
//             <div>
//               <span className="font-bold">Ticket Name</span>
//               <input
//                 className={`h-[30px] px-4 w-full border ${
//                   formError?.currentTicketTitle
//                     ? "border-red-500"
//                     : "border-transparent"
//                 }`}
//                 value={ticket.currentTicketTitle || ""}
//                 onChange={(e) =>
//                   setTicket(
//                     "currentTicketTitle",
//                     e.target.value,
//                     null,
//                     null,
//                     null,
//                     null,
//                     null,
//                     null,
//                     null,
//                     null,
//                     null,
//                     null,
//                     null,
//                     null
//                   )
//                 }
//               />
//             </div>
//             <div>
//               <span className="font-bold">Description</span>
//               <textarea
//                 maxLength={100}
//                 className={`dark:bg-black max-h-[130px] min-h-[70px] border outline-blue-500 w-full px-4 bg-white ${
//                   formError?.currentTicketDescription
//                     ? "border-red-500"
//                     : "border-transparent"
//                 }`}
//                 value={ticket.currentTicketDescription || ""}
//                 onChange={(e) =>
//                   setTicket(
//                     "currentTicketDescription",
//                     e.target.value,
//                     null,
//                     null,
//                     null,
//                     null,
//                     null,
//                     null,
//                     null,
//                     null,
//                     null,
//                     null,
//                     null,
//                     null
//                   )
//                 }
//               />
//             </div>
//             <div className="flex gap-4">
//               <div className="w-full">
//                 <span className="font-bold">Type</span>
//                 <select
//                   className={`h-[30px] px-3 w-full border ${
//                     formError?.currentTicketCategoryId
//                       ? "border-red-500"
//                       : "border-transparent"
//                   }`}
//                   value={ticket.currentTicketCategoryId || ""}
//                   onChange={(e) => {
//                     const newCategoryId = parseInt(e.target.value, 10);
//                     const selectedCategory = ticket.categories?.boardDetails
//                       ?.find(
//                         (board) => board.boardId === ticket.currentTicketBoardId
//                       )
//                       ?.mspConnectWiseBoardTypes.find(
//                         (type) => type?.typeId === newCategoryId
//                       );

//                     setTicket(
//                       "currentTicketCategoryId",
//                       selectedCategory?.typeName,
//                       ticket.currentTicketBoardId,
//                       newCategoryId,
//                       null,
//                       null,
//                       null,
//                       null,
//                       null,
//                       null,
//                       null,
//                       null,
//                       null,
//                       null
//                     );
//                   }}
//                 >
//                   <option value="" disabled>
//                     Select a type
//                   </option>
//                   {ticket.categories?.boardDetails
//                     ?.find(
//                       (board) => board.boardId === ticket.currentTicketBoardId
//                     )
//                     ?.mspConnectWiseBoardTypes.map((type) => (
//                       <option key={type?.typeId} value={type?.typeId}>
//                         {type?.typeName}
//                       </option>
//                     ))}
//                 </select>
//               </div>

//               <div className="w-full">
//                 <span className="font-bold">Subtype</span>
//                 <select
//                   className={`h-[30px] px-3 w-full border ${
//                     formError?.currentTicketSubCategoryId
//                       ? "border-red-500"
//                       : "border-transparent"
//                   }`}
//                   value={ticket.currentTicketSubCategoryId || ""}
//                   onChange={(e) => {
//                     const newSubCategoryId = parseInt(e.target.value, 10);
//                     const selectedBoard = ticket.categories?.boardDetails.find(
//                       (board) => board.boardId === ticket.currentTicketBoardId
//                     );

//                     const selectedCategory =
//                       selectedBoard?.mspConnectWiseBoardTypes.find(
//                         (type) =>
//                           type?.typeId === ticket.currentTicketCategoryId
//                       );

//                     const selectedSubcategory =
//                       selectedCategory?.mspConnectWiseBoardSubTypes.find(
//                         (sub) => sub?.subTypeId === newSubCategoryId
//                       );

//                     setTicket(
//                       "currentTicketSubCategoryId",
//                       selectedSubcategory?.subTypeName,
//                       ticket.currentTicketBoardId,
//                       ticket.currentTicketCategoryId,
//                       newSubCategoryId,
//                       selectedSubcategory?.priority,
//                       selectedSubcategory?.priorityId,
//                       selectedSubcategory?.priorityScore,
//                       selectedSubcategory?.impact,
//                       selectedSubcategory?.impactScore,
//                       selectedSubcategory?.severity,
//                       selectedSubcategory?.severityScore,
//                       selectedSubcategory?.tier,
//                       selectedSubcategory?.slaDeadLineInHours
//                     );
//                   }}
//                 >
//                   <option value="" disabled>
//                     {ticket.currentTicketCategoryId
//                       ? "Please select a subtype"
//                       : "Select a type first"}
//                   </option>
//                   {ticket.currentTicketCategoryId &&
//                     ticket.categories?.boardDetails

//                       ?.find(
//                         (board) => board.boardId === ticket.currentTicketBoardId
//                       )
//                       ?.mspConnectWiseBoardTypes?.find(
//                         (type) =>
//                           type?.typeId === ticket.currentTicketCategoryId
//                       )
//                       ?.mspConnectWiseBoardSubTypes.map((sub) => (
//                         <option key={sub?.subTypeId} value={sub?.subTypeId}>
//                           {sub?.subTypeName}
//                         </option>
//                       ))}
//                 </select>
//               </div>
//             </div>
//             <div className="flex gap-4">
//               <div className="w-full">
//                 <span className="font-bold">Priority</span>
//                 <input
//                   disabled
//                   className={`h-[30px] px-4 w-full`}
//                   value={ticket.currentTicketPriority || ""}
//                 />
//               </div>
//               <div className="w-full">
//                 <span className="font-bold">Impact</span>
//                 <input
//                   disabled
//                   className={`h-[30px] px-4 w-full`}
//                   value={ticket.currentTicketImpact || ""}
//                 />
//               </div>
//               <div className="w-full">
//                 <span className="font-bold">Severity</span>
//                 <input
//                   disabled
//                   className={`h-[30px] px-4 w-full`}
//                   value={ticket.currentTicketSeverity || ""}
//                 />
//               </div>
//               <div className="w-full">
//                 <span className="font-bold">Tier</span>
//                 <input
//                   disabled
//                   className={`h-[30px] px-4 w-full`}
//                   value={ticket.currentTicketTier || ""}
//                 />
//               </div>
//             </div>

//             {userType === "tech" && (
//               <div className="flex gap-4">
//                 <div className="w-full">
//                   <span className="font-bold">Impact Score</span>
//                   <input
//                     className={`h-[30px] px-4 w-full border ${
//                       formError?.currentTicketImpactScore
//                         ? "border-red-500"
//                         : "border-transparent"
//                     }`}
//                     value={ticket.currentTicketImpactScore || ""}
//                     onChange={(e) =>
//                       setTicket(
//                         "currentTicketImpactScore",
//                         e.target.value,
//                         null,
//                         null,
//                         null,
//                         null,
//                         null,
//                         null,
//                         null,
//                         e.target.value,
//                         null,
//                         null,
//                         null,
//                         null
//                       )
//                     }
//                   />
//                 </div>
//                 <div className="w-full">
//                   <span className="font-bold">Severity Score</span>
//                   <input
//                     className={`h-[30px] px-4 w-full border ${
//                       formError?.currentTicketSeverityScore
//                         ? "border-red-500"
//                         : "border-transparent"
//                     }`}
//                     value={ticket.currentTicketSeverityScore || ""}
//                     onChange={(e) =>
//                       setTicket(
//                         "currentTicketSeverityScore",
//                         e.target.value,
//                         null,
//                         null,
//                         null,
//                         null,
//                         null,
//                         null,
//                         null,
//                         null,
//                         null,
//                         e.target.value,
//                         null
//                       )
//                     }
//                   />
//                 </div>
//               </div>
//             )}

//             {ticket.currentTicketCategory === "TRAINING_OR_ONBOARDING" &&
//               ticket.currentTicketSubCategory === "NEW_EMPLOYEE_ONBOARDING" && (
//                 <TicketOnboarding />
//               )}
//             <div>
//               <span className="font-bold">Name</span>
//               <input
//                 className={`h-[30px] px-4 w-full border ${
//                   formError?.currentTicketName
//                     ? "border-red-500"
//                     : "border-transparent"
//                 }`}
//                 value={ticket.currentTicketName || ""}
//                 onChange={(e) =>
//                   setTicket(
//                     "currentTicketName",
//                     e.target.value,
//                     null,
//                     null,
//                     null,
//                     null,
//                     null,
//                     null,
//                     null,
//                     null,
//                     null,
//                     null,
//                     null,
//                     null
//                   )
//                 }
//               />
//             </div>
//             <div>
//               <span className="font-bold">Email</span>
//               <input
//                 className={`h-[30px] px-4 w-full border ${
//                   formError?.currentTicketEmailId
//                     ? "border-red-500"
//                     : "border-transparent"
//                 }`}
//                 value={ticket.currentTicketEmailId || ""}
//                 onChange={(e) =>
//                   setTicket(
//                     "currentTicketEmailId",
//                     e.target.value,
//                     null,
//                     null,
//                     null,
//                     null,
//                     null,
//                     null,
//                     null,
//                     null,
//                     null,
//                     null,
//                     null,
//                     null
//                   )
//                 }
//               />
//             </div>
//             <div>
//               <span className="font-bold">Phone Number</span>
//               <input
//                 className={`h-[30px] px-4 w-full border  ${
//                   formError?.currentTicketPhoneNumber
//                     ? "border-red-500"
//                     : "border-transparent"
//                 }`}
//                 value={ticket.currentTicketPhoneNumber || ""}
//                 onChange={(e) =>
//                   setTicket(
//                     "currentTicketPhoneNumber",
//                     e.target.value,
//                     null,
//                     null,
//                     null,
//                     null,
//                     null,
//                     null,
//                     null,
//                     null,
//                     null,
//                     null,
//                     null,
//                     null
//                   )
//                 }
//               />
//             </div>
//           </div>
//           <div className="flex items-center gap-4 py-2  text-lg lg:p-0">
//             <button
//               className="border transition ease-in hover:bg-[#FFFFFF] hover:text-[#465E89] rounded-md  bg-[#465E89] text-white border-white/30  px-6 py-2  w-full"
//               disabled={loading.ticketForm}
//               onClick={() => {
//                 handleTicketConfirmation(true);
//               }}
//             >
//               {loading.ticketForm ? "Creating..." : "Create Ticket"}
//             </button>
//             <button
//               className=" dark:border-white/30   border border-blue-800 px-6 py-2 transition ease-in hover:bg-gray-100 bg-[#FFFFFF] rounded-md  text-[#465E89] w-full"
//               onClick={() => {
//                 handleTicketConfirmation(false);
//               }}
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TicketForm;

import useFormsStore from "@/utils/store/interaction/forms/formsStore";
import TicketOnboarding from "./TicketOnboarding";
import { useEffect } from "react";
import useMspStore from "@/utils/store/auth/msp/mspStore";

const TicketForm = () => {
  const { userType } = useMspStore();
  const {
    loading,
    formError,
    ticket,
    setTicket,
    handleCreateTicketCategories,
    handleTicketConfirmation,
  } = useFormsStore();

  useEffect(() => {
    handleCreateTicketCategories();
  }, []);

  return (
    <div className=" dark:bg-black flex flex-col gap-2 overflow-y-auto p-4 h-full scrollbar-thin ">
      {ticket?.currentTicketTitle === "" ? (
        <div className="flex flex-col gap-2">
          <p className="text-xl font-semibold">
            No Tickets Are Currently Opened or Created
          </p>
          <p className="text-gray-500">
            If you would like to open a ticket, please interact with our agent
            to get started.
          </p>
        </div>
      ) : (
        <div className="flex flex-col justify-between h-full">
          <div className="bg-white border-2 shadow-md px-10 py-3 flex flex-col gap-2">
            {userType === "tech" && (
              <>
                <div className=" flex w-full">
                  <div className=" flex w-[50%]">
                    <span className="font-bold w-[25%] mr-3">Company:</span>
                    <select
                      className={`dark:bg-transparent dark:border-white px-3 w-[75%] bg-transparent border-b ${
                        formError?.currentTicketCWCompanyId
                          ? "border-red-500"
                          : "border-black"
                      } focus:outline-none focus:ring-0`}
                      value={ticket.currentTicketCWCompanyId || ""}
                      onChange={(e) => {
                        setTicket(
                          "currentTicketCWCompanyId",
                          e.target.value,
                          null,
                          null,
                          null,
                          null,
                          null,
                          null,
                          null,
                          null,
                          null,
                          null,
                          null,
                          null
                        );
                      }}
                    >
                      <option value="" disabled>
                        Select Company
                      </option>
                      {ticket.currentCompanies?.map((company) => {
                        const { name, connectWiseCompanyId } = company;
                        return (
                          <option
                            key={connectWiseCompanyId}
                            value={connectWiseCompanyId}
                          >
                            {name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className=" flex w-[50%]">
                    <span className="px-3 font-bold w-[25%]">Board: </span>
                    <select
                      className={`dark:bg-transparent dark:border-white px-3 w-[75%] bg-transparent border-b  ${
                        formError?.currentTicketBoardId
                          ? "border-red-500"
                          : "border-black"
                      } focus:outline-none focus:ring-0}`}
                      value={ticket.currentTicketBoardId || ""}
                      onChange={(e) => {
                        const newBoardId = parseInt(e.target.value, 10);
                        setTicket(
                          "currentTicketBoardId",
                          newBoardId,
                          newBoardId,
                          null,
                          null,
                          null,
                          null,
                          null,
                          null,
                          null,
                          null,
                          null,
                          null,
                          null
                        );
                      }}
                    >
                      <option value="" disabled>
                        Select Board
                      </option>
                      {ticket.categories?.boardDetails?.map((board) => (
                        <option key={board.boardId} value={board.boardId}>
                          {board.boardName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </>
            )}

            <div className=" flex w-full">
              <div className=" flex w-[50%]">
                <span className=" font-bold w-[25%] mr-3">Ticket Name:</span>
                <input
                  className={`dark:bg-transparent dark:border-white px-3 w-[75%] bg-transparent border-b ${
                    formError?.currentTicketTitle
                      ? "border-red-500"
                      : "border-black"
                  } focus:outline-none focus:ring-0}`}
                  value={ticket.currentTicketTitle || ""}
                  onChange={(e) =>
                    setTicket(
                      "currentTicketTitle",
                      e.target.value,
                      null,
                      null,
                      null,
                      null,
                      null,
                      null,
                      null,
                      null,
                      null,
                      null,
                      null,
                      null
                    )
                  }
                />
              </div>
            </div>
            <div className=" flex w-full">
              <span className="font-bold w-[12.5%] mr-3">Description:</span>
              <textarea
                maxLength={100}
                className={`dark:text-black bg-white max-h-[150px] min-h-[100px] px-3 w-[87.5%] border-2 focus:outline-none focus:ring-0`}
                value={ticket.currentTicketDescription || ""}
                onChange={(e) =>
                  setTicket(
                    "currentTicketDescription",
                    e.target.value,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null
                  )
                }
              />
            </div>

            <div className=" flex w-full">
              <div className="flex w-[50%]">
                <span className="font-bold w-[25%] mr-3">Type:</span>
                <select
                  className={`dark:bg-transparent dark:border-white px-3 w-[75%] bg-transparent border-b ${
                    formError?.currentTicketCategoryId
                      ? "border-red-500"
                      : "border-black"
                  } focus:outline-none focus:ring-0`}
                  value={ticket.currentTicketCategoryId || ""}
                  onChange={(e) => {
                    const newCategoryId = parseInt(e.target.value, 10);
                    const selectedCategory = ticket.categories?.boardDetails
                      ?.find(
                        (board) => board.boardId === ticket.currentTicketBoardId
                      )
                      ?.mspConnectWiseBoardTypes.find(
                        (type) => type?.typeId === newCategoryId
                      );

                    setTicket(
                      "currentTicketCategoryId",
                      selectedCategory?.typeName,
                      ticket.currentTicketBoardId,
                      newCategoryId,
                      null,
                      null,
                      null,
                      null,
                      null,
                      null,
                      null,
                      null,
                      null,
                      null
                    );
                  }}
                >
                  <option value="" disabled>
                    Select a type
                  </option>
                  {ticket.categories?.boardDetails
                    ?.find(
                      (board) => board.boardId === ticket.currentTicketBoardId
                    )
                    ?.mspConnectWiseBoardTypes.map((type) => (
                      <option key={type?.typeId} value={type?.typeId}>
                        {type?.typeName}
                      </option>
                    ))}
                </select>
              </div>

              <div className="flex w-[50%]">
                <span className="font-bold w-[25%] px-3">Subtype:</span>
                <select
                  className={`dark:bg-transparent dark:border-white px-3 w-[75%] bg-transparent border-b ${
                    formError?.currentTicketSubCategoryId
                      ? "border-red-500"
                      : "border-black"
                  } focus:outline-none focus:ring-0`}
                  value={ticket.currentTicketSubCategoryId || ""}
                  onChange={(e) => {
                    const newSubCategoryId = parseInt(e.target.value, 10);
                    const selectedBoard = ticket.categories?.boardDetails.find(
                      (board) => board.boardId === ticket.currentTicketBoardId
                    );

                    const selectedCategory =
                      selectedBoard?.mspConnectWiseBoardTypes.find(
                        (type) =>
                          type?.typeId === ticket.currentTicketCategoryId
                      );

                    const selectedSubcategory =
                      selectedCategory?.mspConnectWiseBoardSubTypes.find(
                        (sub) => sub?.subTypeId === newSubCategoryId
                      );

                    setTicket(
                      "currentTicketSubCategoryId",
                      selectedSubcategory?.subTypeName,
                      ticket.currentTicketBoardId,
                      ticket.currentTicketCategoryId,
                      newSubCategoryId,
                      selectedSubcategory?.priority,
                      selectedSubcategory?.priorityId,
                      selectedSubcategory?.priorityScore,
                      selectedSubcategory?.impact,
                      selectedSubcategory?.impactScore,
                      selectedSubcategory?.severity,
                      selectedSubcategory?.severityScore,
                      selectedSubcategory?.tier,
                      selectedSubcategory?.slaDeadLineInHours
                    );
                  }}
                >
                  <option value="" disabled>
                    {ticket.currentTicketCategoryId
                      ? "Please select a subtype"
                      : "Select a type first"}
                  </option>
                  {ticket.currentTicketCategoryId &&
                    ticket.categories?.boardDetails

                      ?.find(
                        (board) => board.boardId === ticket.currentTicketBoardId
                      )
                      ?.mspConnectWiseBoardTypes?.find(
                        (type) =>
                          type?.typeId === ticket.currentTicketCategoryId
                      )
                      ?.mspConnectWiseBoardSubTypes.map((sub) => (
                        <option key={sub?.subTypeId} value={sub?.subTypeId}>
                          {sub?.subTypeName}
                        </option>
                      ))}
                </select>
              </div>
            </div>

            <div className="flex w-full ">
              <div className="  w-[50%] flex">
                <span className=" font-bold w-[25%] mr-3">Priority:</span>

                <input
                  disabled
                  className="dark:bg-transparent dark:border-white px-4  w-[75%] bg-transparent border-b border-black truncate"
                  value={ticket.currentTicketPriority || ""}
                />
              </div>
              <div className="flex w-[50%]">
                <span className="font-bold w-[25%] px-3 ">Impact:</span>
                <input
                  disabled
                  className="dark:bg-transparent dark:border-white px-4 w-[75%] bg-transparent border-b border-black truncate"
                  value={ticket.currentTicketImpact || ""}
                />
              </div>
            </div>

            <div className="flex w-full">
              <div className="flex w-[50%]">
                <span className="font-bold w-[25%] mr-3 ">Severity:</span>
                <input
                  disabled
                  className="dark:bg-transparent dark:border-white px-4  w-[75%] bg-transparent border-b border-black truncate"
                  value={ticket.currentTicketSeverity || ""}
                />
              </div>
              <div className="flex w-[50%]">
                <span className="font-bold w-[25%] px-3">Tier:</span>
                <input
                  disabled
                  className="dark:bg-transparent dark:border-white px-4  w-[75%] bg-transparent border-b border-black truncate"
                  value={ticket.currentTicketTier || ""}
                />
              </div>
            </div>

            {userType === "tech" && (
              <div className=" flex w-full">
                <div className=" flex w-[50%]">
                  <span className="font-bold whitespace-nowrap w-[25%] mr-3">
                    Impact Score:
                  </span>
                  <input
                    className={`dark:bg-transparent dark:border-white px-4 w-[75%] bg-transparent border-b  ${
                      formError?.currentTicketImpactScore
                        ? "border-red-500"
                        : "border-black"
                    } focus:outline-none focus:ring-0`}
                    value={ticket.currentTicketImpactScore || ""}
                    onChange={(e) =>
                      setTicket(
                        "currentTicketImpactScore",
                        e.target.value,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        e.target.value,
                        null,
                        null,
                        null,
                        null
                      )
                    }
                  />
                </div>
                <div className="flex w-[50%] ">
                  <span className="font-bold w-[25%] px-3">
                    Severity Score:
                  </span>
                  <input
                    className={`dark:bg-transparent dark:border-white px-4 w-[75%] bg-transparent border-b  ${
                      formError?.currentTicketSeverityScore
                        ? "border-red-500"
                        : "border-black"
                    } focus:outline-none focus:ring-0`}
                    value={ticket.currentTicketSeverityScore || ""}
                    onChange={(e) =>
                      setTicket(
                        "currentTicketSeverityScore",
                        e.target.value,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        e.target.value,
                        null
                      )
                    }
                  />
                </div>
              </div>
            )}

            {ticket.currentTicketCategory === "TRAINING_OR_ONBOARDING" &&
              ticket.currentTicketSubCategory === "NEW_EMPLOYEE_ONBOARDING" && (
                <TicketOnboarding />
              )}
            <div className="flex w-full">
              <div className="w-[50%] flex">
                <span className=" font-bold whitespace-nowrap w-[25%] mr-3">
                  Name:
                </span>
                <input
                  className={`dark:bg-transparent dark:border-white px-4 w-[75%] bg-transparent border-b  ${
                    formError?.currentTicketName
                      ? "border-red-500"
                      : "border-black"
                  } focus:outline-none focus:ring-0`}
                  value={ticket.currentTicketName || ""}
                  onChange={(e) =>
                    setTicket(
                      "currentTicketName",
                      e.target.value,
                      null,
                      null,
                      null,
                      null,
                      null,
                      null,
                      null,
                      null,
                      null,
                      null,
                      null,
                      null
                    )
                  }
                />
              </div>
              <div className="flex w-[50%]">
                <span className="font-bold  w-[25%] px-3">Email:</span>
                <input
                  className={`dark:bg-transparent dark:border-whitepx-4 w-[75%]  bg-transparent border-b ${
                    formError?.currentTicketEmailId
                      ? "border-red-500"
                      : "border-black"
                  } focus:outline-none focus:ring-0`}
                  value={ticket.currentTicketEmailId || ""}
                  onChange={(e) =>
                    setTicket(
                      "currentTicketEmailId",
                      e.target.value,
                      null,
                      null,
                      null,
                      null,
                      null,
                      null,
                      null,
                      null,
                      null,
                      null,
                      null,
                      null
                    )
                  }
                />
              </div>
            </div>
            <div className="flex w-[50%]">
              <span className="font-bold  w-[25%] mr-3">Phone:</span>
              <input
                className={`dark:bg-transparent dark:border-white px-4 w-[75%] bg-transparent border-b  ${
                  formError?.currentTicketPhoneNumber
                    ? "border-red-500"
                    : "border-black"
                } focus:outline-none focus:ring-0`}
                value={ticket.currentTicketPhoneNumber || ""}
                onChange={(e) =>
                  setTicket(
                    "currentTicketPhoneNumber",
                    e.target.value,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null
                  )
                }
              />
            </div>
          </div>
          <div className="flex items-center gap-4 py-2  text-lg lg:p-0">
            <button
              className="border transition ease-in hover:bg-[#FFFFFF] hover:text-[#465E89] rounded-md  bg-[#465E89] text-white border-white/30  px-6 py-2  w-full"
              disabled={loading.ticketForm}
              onClick={() => {
                handleTicketConfirmation(true);
              }}
            >
              {loading.ticketForm ? "Creating..." : "Create Ticket"}
            </button>
            <button
              className=" dark:border-white/30   border border-blue-800 px-6 py-2 transition ease-in hover:bg-gray-100 bg-[#FFFFFF] rounded-md  text-[#465E89] w-full"
              onClick={() => {
                handleTicketConfirmation(false);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketForm;
