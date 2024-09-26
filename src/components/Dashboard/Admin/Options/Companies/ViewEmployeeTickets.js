"use client";

import useCompaniesStore from "@/utils/store/admin/control/companies/companiesStore";

const ViewEmployeeTickets = () => {
  const { companyEmployeeTickets } = useCompaniesStore();

  return (
    <div className="flex flex-col overflow-hidden">
      <div className="flex flex-col gap-7  overflow-hidden">
        <div className="flex flex-col overflow-hidden px-4">
          <div className="flex items-center justify-start gap-2 py-4">
            <button className="text-sm border transition ease-in hover:bg-[#FFFFFF] hover:text-[#465E89]   bg-[#465E89] text-white font-bold px-5 rounded-lg py-1">
              Add Ticket
            </button>
          </div>
          {companyEmployeeTickets?.length !== 0 ? (
            <div className="block  overflow-auto scrollbar-thin max-h-full max-w-full">
              {companyEmployeeTickets && (
                <table className="min-w-full table-fixed border-separate border-spacing-0 text-left">
                  <thead className="dark:text-white dark:bg-gray-700 sticky top-0 text-black/60 bg-[#F5F8FA]">
                    <tr className="">
                      <th className="p-2 border-l border-t border-b">
                        Ticket ID
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
                    {companyEmployeeTickets?.map((ticket) => {
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
                          <td className="p-2 truncate border-l  border-b">
                            {ticketId}
                          </td>
                          <td className="p-2 truncate border-l  border-r border-b">
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

export default ViewEmployeeTickets;
