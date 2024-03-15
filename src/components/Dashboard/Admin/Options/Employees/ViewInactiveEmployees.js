"use client";

import useEmployeesStore from "@/utils/store/admin/control/employees/employeesStore";
import useUserStore from "@/utils/store/user/userStore";

const ViewInactiveEmployees = () => {
  const { user } = useUserStore();

  const {
    successMessage,
    errorMessage,
    inactiveEmployees,
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
                    </tr>
                  </thead>
                  <tbody>
                    {inactiveEmployees?.map((employee) => {
                      const {
                        id,
                        mobilePhone,
                        officePhone,
                        primaryEmail,
                        officeEmail,
                        firstName,
                        lastName,
                        connectWiseMembersId,
                      } = employee;
                      return (
                        <tr key={id}>
                          <td className="p-2 truncate border-l  border-b">
                            <button
                              onClick={() =>
                                handleSaveEmployee(
                                  user?.mspCustomDomain,
                                  id,
                                  false
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
                            {primaryEmail || officeEmail}
                          </td>
                          <td className="p-2 truncate border-r border-b">
                            {connectWiseMembersId}
                          </td>

                          <td className="p-2 truncate border-r border-b">
                            {mobilePhone || officePhone}
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
