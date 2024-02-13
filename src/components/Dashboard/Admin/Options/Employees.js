"use client";

import useEmployeesStore from "@/utils/store/admin/control/employees/employeesStore";
import useUiStore from "@/utils/store/ui/uiStore";
import useTechStore from "@/utils/store/user/techStore";
import { useEffect } from "react";

const Employees = ({}) => {
  const { tech } = useTechStore();
  const { openAdmin, handleHistoryMenu } = useUiStore();
  const { employees, initializeEmployees } = useEmployeesStore();

  useEffect(() => {
    initializeEmployees();
  }, [tech]);


  return (
    <div
      onClick={() => {
        if (window.innerWidth < 1023) {
          openAdmin && handleHistoryMenu(false);
        }
      }}
      className={`relative flex flex-col h-full w-full ${
        openAdmin && "lg:opacity-100 opacity-5 xl:ml-[350px]"
      }  dark:bg-black transition-all duration-300 ease bg-white`}
    >
      <div className="dark:border-b-white/20 border-b p-4">
        <h1 className="text-2xl">Employees</h1>
      </div>
      <div className="flex flex-col h-full overflow-hidden">
        <div className="flex flex-col text-xl overflow-hidden">
          {employees?.length !== 0 ? (
            <div className="flex flex-col gap-7 text-xl overflow-hidden ">
              {employees && (
                <div className="flex  flex-col overflow-hidden px-4">
                  <div className="flex items-center justify-start gap-2 py-4">
                    <button className="text-sm  bg-blue-800 text-white font-bold px-5 rounded-lg py-1">
                      Add Employee
                    </button>
                  </div>
                  <div className="block text-sm overflow-auto scrollbar-thin max-h-full max-w-full">
                    <table className="min-w-full table-fixed border-separate border-spacing-0 text-left">
                      <thead className="dark:text-white dark:bg-gray-700 sticky top-0  text-lg text-black/60 bg-[#F5F8FA]">
                        <tr className="">
                          <th className="p-2 border-l border-t border-b border-r ">
                            Name
                          </th>
                          <th className="p-2 border-t border-b border-r ">
                            Technician ID
                          </th>
                          <th className="p-2 border-t border-b border-r">
                            Identifier
                          </th>
                          <th className="p-2 border-t border-b border-r">
                            Phone Number
                          </th>
                          <th className="p-2 border-t border-b border-r">
                            Office Number
                          </th>
                          <th className="p-2 border-t border-b border-r">
                            Primary Email
                          </th>
                          <th className="p-2 border-t border-b border-r">
                            Office Email
                          </th>
                          <th className="p-2 border-t border-b border-r">
                            Tier
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {employees?.map((employee) => {
                          const {
                            id,
                            firstName,
                            lastName,
                            identifier,
                            mobilePhone,
                            connectWiseMembersId,
                            officeEmail,
                            officePhone,
                            primaryEmail,
                            tier,
                          } = employee;
                          return (
                            <tr key={id}>
                              <td className="p-2 truncate border-l  border-r border-b">
                                {firstName + " " + lastName}
                              </td>
                              <td className="p-2 truncate border-r border-b">
                                {connectWiseMembersId}
                              </td>
                              <td className="p-2 truncate border-r border-b">
                                {identifier}
                              </td>
                              <td className="p-2 truncate border-r border-b">
                                {mobilePhone}
                              </td>
                              <td className="p-2 truncate border-r border-b">
                                {officePhone}
                              </td>
                              <td className="p-2 truncate border-r border-b">
                                {primaryEmail}
                              </td>
                              <td className="p-2 truncate border-r border-b">
                                {officeEmail}
                              </td>
                              <td className="p-2 truncate border-r border-b">
                                {tier}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <p className="text-xl font-bold text-black/20 p-4 w-full">
              Currently Have No Employees Listed
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Employees;
