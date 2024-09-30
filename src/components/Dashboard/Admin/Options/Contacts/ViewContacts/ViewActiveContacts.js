"use client";

import useContactsStore from "@/utils/store/admin/control/contacts/contactsStore";

const ViewActiveContacts = () => {
  const { activeContacts, handleViewContactTickets } = useContactsStore();

  return (
    <>
      {activeContacts?.length !== 0 ? (
        <div className="block text-sm overflow-auto scrollbar-thin max-h-full max-w-full">
          {activeContacts && (
            <table className="min-w-full table-fixed border-separate border-spacing-0 text-left">
              <thead className="dark:text-white dark:bg-gray-700 sticky top-0  text-black/60 bg-[#F5F8FA]">
                <tr className="">
                  <th className="p-2 border-l border-t border-b border-r ">
                    Name
                  </th>
                  <th className="p-2 border-t border-b border-r ">
                    Email Address
                  </th>
                  <th className="p-2 border-t border-b border-r ">
                    Phone Number
                  </th>
                  <th className="p-2 border-t border-b border-r ">
                    Company ID
                  </th>
                </tr>
              </thead>
              <tbody>
                {activeContacts?.map((contact) => {
                  const {
                    id,
                    firstName,
                    lastName,
                    email,
                    phoneNumber,
                    connectWiseCompanyId,
                  } = contact;
                  return (
                    <tr
                      className="dark:hover:bg-blue-950 hover:bg-blue-50 cursor-pointer"
                      onClick={() =>
                        handleViewContactTickets(
                          id,
                          firstName,
                          lastName
                        )
                      }
                      key={id}
                    >
                      <td className="p-2 truncate border-l  border-r border-b">
                        {firstName + " " + lastName}
                      </td>
                      <td className="p-2 truncate border-r border-b">
                        {email}
                      </td>
                      <td className="p-2 truncate border-r border-b">
                        {phoneNumber}
                      </td>
                      <td className="p-2 truncate border-r border-b">
                        {connectWiseCompanyId}
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
          Currently Have No Active Contacts
        </p>
      )}
    </>
  );
};

export default ViewActiveContacts;
