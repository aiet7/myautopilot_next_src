"use client";
import useSuiteStore from "@/utils/store/admin/control/integrations/suite/suiteStore";
import { AiOutlineClose } from "react-icons/ai";

const ViewOfficeUsers = () => {
  const { officeUsers, setCloseConfiguration } = useSuiteStore();

  console.log(officeUsers);

  return (
    <div className="dark:bg-black/80 absolute bg-black/60 z-[99] top-0 bottom-0 right-0 left-0 flex  items-center justify-center p-2 lg:p-10">
      <div className="flex flex-col items-end bg-white w-full h-full p-4 rounded-lg text-black">
        <AiOutlineClose
          className="cursor-pointer"
          size={20}
          onClick={setCloseConfiguration}
        />
        <div className="flex flex-col gap-4 overflow-hidden w-full h-full py-4">
          <div className="flex flex-col h-full overflow-hidden">
            <div className="flex flex-col text-xl overflow-hidden">
              {officeUsers?.length !== 0 ? (
                <div className="flex flex-col gap-7 text-xl overflow-hidden">
                  {officeUsers && (
                    <div className="flex gap-2 flex-col overflow-hidden ">
                      <div className="block text-sm overflow-auto scrollbar-thin max-h-full max-w-full">
                        <table className="min-w-full table-fixed border-separate border-spacing-0 text-left">
                          <thead className="sticky top-0 bg-white text-lg text-black/60">
                            <tr className="">
                              <th className="p-2 border-t border-b border-r border-l">
                                Display Name
                              </th>
                              <th className="p-2 border-t border-b border-r">
                                User ID
                              </th>
                              <th className="p-2 border-t border-b border-r">
                                Domain
                              </th>
                              <th className="p-2 border-t border-b border-r">
                                Licenses
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {officeUsers?.map((user) => {
                              const {
                                userId,
                                userPrincipalName,
                                displayName,
                                assignedLicenses,
                              } = user;
                              return (
                                <tr key={userId}>
                                  <td className="p-2 truncate  border-r border-b border-l">
                                    {displayName}
                                  </td>
                                  <td className="p-2 truncate border-r border-b">
                                    {userId}
                                  </td>
                                  <td className="p-2 truncate border-r border-b">
                                    {userPrincipalName}
                                  </td>
                                  <td className="p-2 truncate border-r border-b">
                                    {assignedLicenses.map((license) => {
                                      const { skuId, skuPartNumber } = license;
                                      return (
                                        <div key={skuId} >
                                          <p>{skuPartNumber}</p>
                                        </div>
                                      );
                                    })}
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
                <p className="text-xl font-bold text-black/20  w-full">
                  Currently Have No Office Users Listed
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewOfficeUsers;
