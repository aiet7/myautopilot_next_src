"use client";

import useContactsStore from "@/utils/store/admin/control/contacts/contactsStore";

const ViewAllTickets = () => {
  
  const { contactAllTickets } = useContactsStore();

  return (
    <div className="flex flex-col text-xl overflow-hidden">
      <div className="flex flex-col gap-7 text-xl overflow-hidden">
        <div className="flex flex-col overflow-hidden px-4">
          <div className="flex items-center justify-start gap-2 py-4">
            <button className="text-sm  bg-blue-800 text-white font-bold px-5 rounded-lg py-1">
              Add Ticket
            </button>
          </div>
          {contactAllTickets?.length !== 0 ? (
            <div className="block text-sm overflow-auto scrollbar-thin max-h-full max-w-full">
              {contactAllTickets && (
                <table className="min-w-full table-fixed border-separate border-spacing-0 text-left">
                  <thead className="dark:text-white dark:bg-gray-700 sticky top-0 text-lg text-black/60 bg-[#F5F8FA]">
                    <tr className="">
                      <th className="p-2 border-l border-t border-b border-r">
                        Ticket Id
                      </th>
                      <th className="p-2 border-l border-t border-b border-r">
                        Title
                      </th>
                      <th className="p-2 border-t border-b border-r">
                        Category
                      </th>
                      <th className="p-2 border-t border-b border-r">
                        Subcategory
                      </th>

                      <th className="p-2 border-t border-b border-r">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contactAllTickets?.map((ticket) => {
                      const {
                        id,
                        ticketId,
                        title,
                        category,
                        subcategory,
                        closed,
                      } = ticket;
                      return (
                        <tr key={id}>
                          <td className="p-2 truncate border-l  border-r border-b">
                            {ticketId}
                          </td>
                          <td className="p-2 truncate border-r border-b">
                            {title}
                          </td>
                          <td className="p-2 truncate border-r border-b">
                            {category}
                          </td>
                          <td className="p-2 truncate border-r border-b">
                            {subcategory}
                          </td>

                          <td className="p-2 truncate border-r border-b">
                            {closed ? "Closed" : "Open"}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          ) : (
            <p className="text-xl font-bold text-black/20 w-full">
              Currently Have No Tickets Listed
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewAllTickets;
