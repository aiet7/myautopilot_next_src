"use client";

import useEmployeesStore from "@/utils/store/admin/control/employees/employeesStore";
import useUserStore from "@/utils/store/user/userStore";
import AddEmployee from "./AddEmployee";

const ViewActiveEmployees = () => {
  const { user } = useUserStore();

  const {
    
    addEmployee,
    activeEmployees,
    employeesTierOptions,
    employeesRoleOptions,
    setSelectedEmployee,
    setAddEmployee,
    handleSaveActiveEmployee,
  } = useEmployeesStore();

  return (
    <div className="flex flex-col ">
      {addEmployee && <AddEmployee />}
      <div className="flex flex-col gap-7 ">
        <div className="flex  flex-col  p-4">
          <div className="flex items-center justify-start gap-2  pb-4">
            <button
              onClick={() => setAddEmployee(true)}
              className="text-sm border transition ease-in hover:bg-[#FFFFFF] hover:text-[#465E89]   bg-[#465E89] text-white font-bold px-5 rounded-lg py-1"
              >
              Add Employee
            </button>
          </div>
          {activeEmployees?.length !== 0 ? (
            <div className="block  max-h-full max-w-full">
              {activeEmployees && (
                <table className="min-w-full table-fixed border-separate border-spacing-0 text-left">
                  <thead className="dark:text-white dark:bg-gray-700 sticky top-0  text-black/60 bg-[#F5F8FA]">
                    <tr className="">
                      <th className="p-2 border-l border-t border-b"></th>
                      <th className="p-2 border-l border-t border-b border-r ">
                        Name
                      </th>
                      <th className="p-2 border-t border-b border-r ">
                        Email Address
                      </th>

                      <th className="p-2 border-t border-b border-r">
                        Phone Number
                      </th>

                      <th className="p-2 border-t border-b border-r">Roles</th>
                      <th className="p-2 border-t border-b border-r">Tier</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activeEmployees?.map((employee) => {
                      const {
                        id,
                        email,
                        firstName,
                        lastName,
                        phoneNumber,
                        roleId,
                        tierLevel,
                      } = employee;
                      return (
                        <tr key={id}>
                          <td className="p-2 truncate border-l  border-b">
                            <button
                              onClick={() =>
                                handleSaveActiveEmployee(
                                  user?.mspCustomDomain,
                                  id
                                )
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
                            {phoneNumber}
                          </td>

                          <td className="p-2 truncate border-r border-b">
                            <div className="flex flex-col">
                              <select
                                value={roleId}
                                onChange={(e) =>
                                  setSelectedEmployee(
                                    id,
                                    "roleId",
                                    e.target.value,
                                    true
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
                          <td className="p-2 truncate border-r border-b">
                            <div className="flex flex-col">
                              <select
                                value={tierLevel}
                                onChange={(e) =>
                                  setSelectedEmployee(
                                    id,
                                    "tierLevel",
                                    e.target.value,
                                    true
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
        </div>
      </div>
    </div>
  );
};

export default ViewActiveEmployees;
