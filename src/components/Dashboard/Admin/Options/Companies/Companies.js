"use client";

import { useEffect } from "react";
import useUiStore from "@/utils/store/ui/uiStore";
import useCompaniesStore from "@/utils/store/admin/control/companies/companiesStore";
import useUserStore from "@/utils/store/user/userStore";
import ViewWorkers from "./ViewDetails";

const Companies = () => {
  const { user } = useUserStore();
  const { openAdmin, handleHistoryMenu } = useUiStore();
  const { companies, viewDetails, handleViewDetails, initializeCompanies } = useCompaniesStore();

  useEffect(() => {
    initializeCompanies();
  }, [user]);

  return (
    <div
      onClick={() => {
        if (window.innerWidth < 1023) {
          openAdmin && handleHistoryMenu(false);
        }
      }}
      className={`relative flex flex-col h-full w-full ${openAdmin && "lg:opacity-100 opacity-5 xl:ml-[350px]"
        }  dark:bg-black transition-all duration-300 ease bg-white `}
    >
      {viewDetails && <ViewWorkers />}
      <div className="dark:border-b-white/20 border-b p-4">
        <h1 className="text-2xl">Companies</h1>
      </div>
      <div className="flex flex-col h-full overflow-hidden">
        <div className="flex flex-col text-xl overflow-hidden">
          {companies?.length !== 0 ? (
            <div className="flex flex-col gap-7 text-xl overflow-hidden">
              {companies && (
                <div className="flex flex-col overflow-hidden px-4">
                  <div className="flex items-center justify-start gap-2 py-4">
                    <button className="text-sm  bg-blue-800 text-white font-bold px-5 rounded-lg py-1">
                      Add Company
                    </button>
                  </div>
                  <div className="block text-sm overflow-auto scrollbar-thin max-h-full max-w-full">
                    <table className="min-w-full table-fixed border-separate border-spacing-0 text-left">
                      <thead className="dark:text-white dark:bg-gray-700 sticky top-0 text-lg text-black/60 bg-[#F5F8FA]">
                        <tr className="">
                          <th className="p-2 border-l border-t border-b border-r">
                            Name
                          </th>
                          <th className="p-2 border-t border-b border-r">
                            Company ID
                          </th>

                          <th className="p-2 border-t border-b border-r">
                            Address
                          </th>
                          <th className="p-2 border-t border-b border-r">
                            Contact
                          </th>
                          <th className="p-2 border-t border-b border-r">
                            Phone Number
                          </th>

                        </tr>
                      </thead>
                      <tbody>
                        {companies?.map((company) => {
                          const {
                            id,
                            name,
                            connectWiseCompanyId,
                            addressLine1,
                            addressLine2,
                            city,
                            zip,
                            defaultContact,
                            phoneNumber,

                          } = company;
                          return (
                            <tr  className="dark:hover:bg-blue-950 hover:bg-blue-50 cursor-pointer" key={id} onClick={() => handleViewDetails(user?.mspCustomDomain, id)}>
                              <td className="p-2 truncate border-l  border-r border-b">
                                {name}
                              </td>
                              <td className="p-2 truncate border-r border-b">
                                {connectWiseCompanyId}
                              </td>
                              <td className="p-2 truncate border-r border-b">
                                {addressLine1 +
                                  ", " +
                                  addressLine2 +
                                  ", " +
                                  city +
                                  " " +
                                  zip}
                              </td>
                              <td className="p-2 truncate border-r border-b">
                                {defaultContact?.name}
                              </td>
                              <td className="p-2 truncate border-r border-b">
                                {phoneNumber}
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

export default Companies;
