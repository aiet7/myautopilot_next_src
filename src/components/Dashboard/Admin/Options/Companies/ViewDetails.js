"use client";
import useCompaniesStore from "@/utils/store/admin/control/companies/companiesStore";
import useUserStore from "@/utils/store/user/userStore";
import { AiOutlineClose } from "react-icons/ai";

const ViewDetails = () => {
  const { user } = useUserStore();

  const {
    companyDetails,
    selectedCompany,
    companyEmployeeRoleOptions,
    setViewDetails,
    setSelectedCompanyEmployee,
    handleSaveCompanyEmployee,
  } = useCompaniesStore.getState();

  return (
    <div className="dark:bg-black/80 absolute bg-black/60 z-[99] top-0 bottom-0 right-0 left-0 p-2 lg:p-10">
      <div className="flex flex-col items-end bg-white max-w-[700px] h-full p-4 rounded-lg text-black mx-auto">
        <AiOutlineClose
          className="cursor-pointer"
          size={20}
          onClick={() => {
            setViewDetails(false);
          }}
        />
        <div className="flex flex-col gap-4 overflow-hidden w-full h-full">
          <div className="flex flex-col items-center justify-center font-semibold">
            <div className="flex flex-col items-center gap-8 w-full">
              <div className="flex flex-col items-center gap-1">
                <h2 className="text-4xl font-bold">
                  {selectedCompany || "Fixing Company Name"}
                </h2>
              </div>
              {companyDetails.length !== 0 ? (
                <>
                  {companyDetails.map((details) => {
                    const {
                      id,
                      email,
                      firstName,
                      lastName,
                      phoneNumber,
                      roleId,
                    } = details;
                    return (
                      <div
                        key={id}
                        className="flex flex-col items-start w-full border-b p-2"
                      >
                        <div className="flex items-center justify-between w-full">
                          <div className="flex flex-col items-start">
                            <p>{firstName + " " + lastName}</p>
                            <p>{email}</p>
                            <p>{phoneNumber || "555-555-5555"}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <select
                              value={roleId}
                              onChange={(e) =>
                                setSelectedCompanyEmployee(
                                  id,
                                  "roleId",
                                  e.target.value
                                )
                              }
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
                            <button
                              onClick={() =>
                                handleSaveCompanyEmployee(
                                  user?.mspCustomDomain,
                                  id
                                )
                              }
                              className="hover:underline text-blue-500"
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </>
              ) : (
                <p className="text-xl font-bold text-black/20 w-full">
                  Currently Have No Employees Added
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDetails;
