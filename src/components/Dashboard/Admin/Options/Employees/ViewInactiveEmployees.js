"use client";

import useEmployeesStore from "@/utils/store/admin/control/employees/employeesStore";
import useUserStore from "@/utils/store/user/userStore";

const ViewInactiveEmployees = () => {
  const { user } = useUserStore();

  const {
    successMessage,
    errorMessage,
    inactiveEmployees,
    employeesTierOptions,
    employeesRoleOptions,
    setSelectedEmployee,
    handleSaveEmployee,
  } = useEmployeesStore();

  return (
    <div className="flex flex-col text-xl overflow-hidden">
      <div className="flex flex-col gap-7 text-xl overflow-hidden ">
        <div className="flex  flex-col overflow-hidden px-4">
          <div className="flex items-center justify-start gap-2 py-4">
            <button className="text-sm  bg-blue-800 text-white font-bold px-5 rounded-lg py-1">
              Add Employee
            </button>
          </div>
          {inactiveEmployees?.length !== 0 ? (
            <div className="block text-sm overflow-auto scrollbar-thin max-h-full max-w-full">
              {inactiveEmployees && (
                <table className="min-w-full table-fixed border-separate border-spacing-0 text-left">
                  <thead className="dark:text-white dark:bg-gray-700 sticky top-0  text-lg text-black/60 bg-[#F5F8FA]">
                    <tr className="">
                      <th className="p-2 border-l border-t border-b"></th>
                      <th className="p-2 border-l border-t border-b border-r ">
                        Name
                      </th>
                      <th className="p-2 border-t border-b border-r ">
                        Email Address
                      </th>
                      <th className="p-2 border-t border-b border-r ">
                        Technician ID
                      </th>

                      <th className="p-2 border-t border-b border-r">
                        Phone Number
                      </th>

                      <th className="p-2 border-t border-b border-r">Tier</th>
                      <th className="p-2 border-t border-b border-r">Roles</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inactiveEmployees?.map((employee) => {
                      const {
                        id,
                        email,
                        firstName,
                        lastName,
                        phoneNumber,
                        connectWiseTechnicanId,
                        tierLevel,
                        roleId,
                      } = employee;
                      return (
                        <tr key={id}>
                          <td className="p-2 truncate border-l  border-b">
                            <button
                              onClick={() =>
                                handleSaveEmployee(user?.mspCustomDomain, id)
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
                            {email}
                          </td>
                          <td className="p-2 truncate border-r border-b">
                            {connectWiseTechnicanId}
                          </td>

                          <td className="p-2 truncate border-r border-b">
                            {phoneNumber}
                          </td>

                          <td className="p-2 truncate border-r border-b">
                            <div className="flex flex-col">
                              <select
                                value={tierLevel}
                                onChange={(e) =>
                                  setSelectedEmployee(
                                    id,
                                    "tierLevel",
                                    e.target.value
                                  )
                                }
                              >
                                {employeesTierOptions.map((tier) => (
                                  <option key={tier} value={tier}>
                                    {tier}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </td>
                          <td className="p-2 truncate border-r border-b">
                            <div className="flex flex-col">
                              <select
                                value={roleId}
                                onChange={(e) =>
                                  setSelectedEmployee(
                                    id,
                                    "roleId",
                                    e.target.value
                                  )
                                }
                              >
                                {employeesRoleOptions.map((role) => {
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
              Currently Have No Inactive Employees Listed
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewInactiveEmployees;
