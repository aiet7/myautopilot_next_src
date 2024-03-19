"use client";

import useCompaniesStore from "@/utils/store/admin/control/companies/companiesStore";
import useUserStore from "@/utils/store/user/userStore";

const ViewActiveEmployees = () => {
  const { user } = useUserStore();
  const {
    companyActiveEmployees,
    companyEmployeeRoleOptions,
    setSelectedCompanyEmployee,
    handleViewCompanyEmployeeTickets,
    handleSaveCompanyEmployee,
  } = useCompaniesStore();

  return (
    <>
      
      {companyActiveEmployees?.length !== 0 ? (
        <div className="block text-sm overflow-auto scrollbar-thin max-h-full max-w-full">
          {companyActiveEmployees && (
            <table className="min-w-full table-fixed border-separate border-spacing-0 text-left">
              <thead className="dark:text-white dark:bg-gray-700 sticky top-0 text-lg text-black/60 bg-[#F5F8FA]">
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
                  <th className="p-2 border-t border-b border-r">Roles</th>
                </tr>
              </thead>
              <tbody>
                {companyActiveEmployees?.map((employee) => {
                  const {
                    id,
                    firstName,
                    lastName,
                    email,
                    phoneNumber,
                    roleId,
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
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSaveCompanyEmployee(
                              user?.mspCustomDomain,
                              id
                            );
                          }}
                          className="hover:underline text-blue-500"
                        >
                          Save
                        </button>
                      </td>
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
                        <div className="flex flex-col">
                          <select
                            value={roleId}
                            onClick={(e) => e.stopPropagation()}
                            onChange={(e) => {
                              setSelectedCompanyEmployee(
                                id,
                                "roleId",
                                e.target.value
                              );
                            }}
                          >
                            {companyEmployeeRoleOptions.map((role) => {
                              const { id, name } = role;
                              return (
                                <option key={id} value={id}>
                                  {name}
                                </option>
                              );
                            })}
                          </select>
                        </div>
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
          Currently Have No Active Employees Listed
        </p>
      )}
    </>
  );
};

export default ViewActiveEmployees;
