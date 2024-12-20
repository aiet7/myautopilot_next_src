"use client";

import useEmployeesStore from "@/utils/store/admin/control/employees/employeesStore";
import useUserStore from "@/utils/store/user/userStore";

const ViewEmployees = () => {
  const { user } = useUserStore();

  const { employees, handleSaveEmployee } = useEmployeesStore();
  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-7  ">
        <div className="flex  flex-col p-4">
          {employees?.length !== 0 ? (
            <div className="block  max-h-full max-w-full">
              {employees && (
                <table className="min-w-full table-fixed border-separate border-spacing-0 text-left">
                  <thead className="dark:text-white dark:bg-gray-700 sticky top-0 text-black/60 bg-[#F5F8FA]">
                    <tr className="">
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
                        Mobile Number
                      </th>
                      <th className="p-2 border-t border-b border-r">
                        Office Number
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {employees?.map((employee) => {
                      const {
                        id,
                        email,
                        mobilePhone,
                        officePhone,
                      
                        firstName,
                        lastName,
                        psaMemberId,
                      } = employee;
                      return (
                        <tr key={id}>
                          <td className="p-2 truncate border-l  border-r border-b">
                            {firstName + " " + lastName}
                          </td>
                          <td className="p-2 truncate border-r border-b">
                            {email}
                          </td>
                          <td className="p-2 truncate border-r border-b">
                            {psaMemberId}
                          </td>
                          <td className="p-2 truncate border-r border-b">
                            {mobilePhone || officePhone}
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

export default ViewEmployees;
