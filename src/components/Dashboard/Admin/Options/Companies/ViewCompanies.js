"use client";
import useCompaniesStore from "@/utils/store/admin/control/companies/companiesStore";
import useUserStore from "@/utils/store/user/userStore";

const ViewCompanies = () => {
  const { user } = useUserStore();
  const { companies, handleViewCompanyEmployees } = useCompaniesStore();
 
  return (
    
    <div className="flex flex-col  ">
      <div className="flex flex-col gap-7  ">
        <div className="flex flex-col  p-4">
          {companies?.length !== 0 ? (
            <div className="block  max-h-full max-w-full ">
              {companies && (
                <table className="min-w-full table-fixed border-separate border-spacing-0 text-left">
                  <thead className="dark:text-white dark:bg-gray-700 sticky top-0 text-black/60 bg-[#F5F8FA]">
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
                        connectWiseClientsAutopilotDbId,
                        addressLine1,
                        addressLine2,
                        city,
                        zip,
                        defaultContact,
                        phoneNumber,
                      } = company;
                      return (
                        <tr
                          className="dark:hover:bg-blue-950 hover:bg-blue-50 cursor-pointer"
                          key={id}
                          onClick={() =>
                            handleViewCompanyEmployees(
                              user?.mspCustomDomain,
                              id,
                              name,
                              connectWiseClientsAutopilotDbId,
                              connectWiseCompanyId
                            )
                          }
                        >
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
              )}
            </div>
          ) : (
            <p className="text-xl font-bold text-black/20  w-full">
              Currently Have No Companies Listed
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
export default ViewCompanies;
