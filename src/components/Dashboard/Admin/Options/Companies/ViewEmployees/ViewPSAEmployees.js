"use client";

import useCompaniesStore from "@/utils/store/admin/control/companies/companiesStore";
import useUserStore from "@/utils/store/user/userStore";

const ViewPSAEmployees = () => {
  const { user } = useUserStore();
  const {
    companyPSAEmployees,
    handleViewCompanyEmployeeTickets,
    handleSaveCompanyEmployee,
  } = useCompaniesStore();

  return (
    <>
      {companyPSAEmployees?.length !== 0 ? (
        <div className="block   max-h-full max-w-full">
          {companyPSAEmployees && (
            <table className="min-w-full table-fixed border-separate border-spacing-0 text-left">
              <thead className="dark:text-white dark:bg-gray-700 sticky top-0 text-black/60 bg-[#F5F8FA]">
                <tr className="">
                  <th className="p-2 border-l border-t border-b  "></th>
                  <th className="p-2 border-l border-t border-b border-r">
                    Name
                  </th>
                  <th className="p-2 border-t border-b border-r">
                    Email Address
                  </th>
                  <th className="p-2 border-t border-b border-r">
                    Phone Number
                  </th>
                </tr>
              </thead>
              <tbody>
                {companyPSAEmployees?.map((employee) => {
                  const {
                    id,
                    firstName,
                    lastName,
                    connectWiseEmailId,
                    connectWisePhoneNumber,
                    defaultPhoneNbr,
                  } = employee;
                  return (
                    <tr
                      className="dark:hover:bg-blue-950 hover:bg-blue-50 cursor-pointer"
                      onClick={() =>
                        handleViewCompanyEmployeeTickets(
                          id,
                          firstName,
                          lastName
                        )
                      }
                      key={id}
                    >
                      <td className="p-2 truncate border-l  border-b">
                        <button
                          onClick={() =>
                            handleSaveCompanyEmployee(user?.mspCustomDomain, id)
                          }
                          className="hover:underline text-blue-500"
                        >
                          Save
                        </button>
                      </td>
                      <td className="p-2 truncate border-l  border-r border-b">
                        {firstName + " " + lastName}
                      </td>
                      <td className="p-2 truncate border-r border-b">
                        {connectWiseEmailId}
                      </td>
                      <td className="p-2 truncate border-r border-b">
                        {connectWisePhoneNumber || defaultPhoneNbr}
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
          Currently Have No Inactive Employees Listed
        </p>
      )}
    </>
  );
};

export default ViewPSAEmployees;
