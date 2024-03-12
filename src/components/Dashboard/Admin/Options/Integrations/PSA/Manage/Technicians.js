"use client";

import useManageStore from "@/utils/store/admin/control/integrations/PSA/manageStore";
import useUserStore from "@/utils/store/user/userStore";
import { useEffect } from "react";
import { FaSpinner } from "react-icons/fa";

const Technician = () => {
  const { user } = useUserStore();

  const {
    activePage,
    activePerPage,
    successMessage,
    errorMessage,
    techniciansSelected,
    technicians,
    techniciansTierOptions,
    techniciansRoleOptions,
    loadingTechnicians,
    setSelectedTechnicians,
    setSelectAllTechnicians,
    handleAddManageTechnician,
    initializeManageTechnicians,
  } = useManageStore();

  const indexOfLastTech = activePage * activePerPage;
  const indexOfFirstTech = indexOfLastTech - activePerPage;
  const currentTechs = technicians?.slice(indexOfFirstTech, indexOfLastTech);

  useEffect(() => {
    initializeManageTechnicians();
  }, [user]);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex flex-col text-xl overflow-hidden">
        {currentTechs?.length !== 0 ? (
          <div className="flex flex-col gap-7 text-xl overflow-hidden">
            {loadingTechnicians ? (
              <div className="flex items-center gap-2">
                <p className="font-bold">Loading your Technicians</p>
                <FaSpinner className="animate-spin" size={20} />
              </div>
            ) : (
              <div className="flex flex-col">
                <p className="font-bold">Your Current Technicians</p>
                <p className="text-xs">
                  Select Technicians you want to integrate and press next.
                </p>
              </div>
            )}

            {currentTechs && (
              <div className="flex gap-2 flex-col overflow-hidden ">
                <div className="flex items-center justify-start gap-2">
                  {errorMessage && (
                    <p className="text-red-500">Error Saving Technicians</p>
                  )}
                </div>
                <div className="block text-sm overflow-auto scrollbar-thin max-h-full max-w-full">
                  <table className="min-w-full table-fixed border-separate border-spacing-0 text-left">
                    <thead className="sticky top-0 bg-white text-lg text-black/60">
                      <tr className="">
                        <th className="p-2 border-l border-t border-b border-r">
                          <input
                            type="checkbox"
                            checked={currentTechs.every(
                              (technician) =>
                                techniciansSelected[
                                  technician.connectWiseMembersId
                                ]?.selected
                            )}
                            onChange={(e) =>
                              setSelectAllTechnicians(e.target.checked)
                            }
                            className="flex items-center justify-center w-full h-full"
                          />
                        </th>
                        <th className="p-2 border-t border-b border-r ">
                          Name
                        </th>
                        <th className="p-2 border-t border-b border-r">
                          Identifier
                        </th>
                        <th className="p-2 border-t border-b border-r">
                          Primary Email
                        </th>
                        <th className="p-2 border-t border-b border-r">
                          Office Email
                        </th>
                        <th className="p-2 border-t border-b border-r">
                          Mobile Phone
                        </th>
                        <th className="p-2 border-t border-b border-r">
                          Office Phone
                        </th>
                        <th className="p-2 border-t border-b border-r">Tier</th>
                        <th className="p-2 border-t border-b border-r">Role</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentTechs?.map((technician) => {
                        const {
                          connectWiseMembersId,
                          firstName,
                          lastName,
                          mobilePhone,
                          identifier,
                          officeEmail,
                          officePhone,
                          primaryEmail,
                          isInDB,
                        } = technician;
                        return (
                          <tr
                            key={connectWiseMembersId}
                            className={`${isInDB ? "text-black/20" : ""}`}
                          >
                            <td className="p-2 truncate border-l border-r border-b">
                              {!isInDB && (
                                <input
                                  checked={
                                    techniciansSelected[connectWiseMembersId]
                                      ?.selected || false
                                  }
                                  onChange={(e) =>
                                    setSelectedTechnicians(
                                      connectWiseMembersId,
                                      "selected",
                                      e.target.checked
                                    )
                                  }
                                  className="flex items-center justify-center w-full h-full"
                                  type="checkbox"
                                />
                              )}
                            </td>
                            <td className="p-2 truncate  border-r border-b">
                              {firstName + " " + lastName}
                            </td>
                            <td className="p-2 truncate border-r border-b">
                              {identifier}
                            </td>
                            <td className="p-2 truncate border-r border-b">
                              {primaryEmail}
                            </td>
                            <td className="p-2 truncate border-r border-b">
                              {officeEmail}
                            </td>
                            <td className="p-2 truncate border-r border-b">
                              {mobilePhone}
                            </td>
                            <td className="p-2 truncate border-r border-b">
                              {officePhone}
                            </td>
                            <td className="p-2 truncate border-r border-b">
                              <div className="flex flex-col">
                                <select
                                  onChange={(e) =>
                                    setSelectedTechnicians(
                                      connectWiseMembersId,
                                      "tier",
                                      e.target.value
                                    )
                                  }
                                >
                                  {techniciansTierOptions.map((tier) => (
                                    <option value={tier} key={tier}>
                                      {tier}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </td>
                            <td className="p-2 truncate border-r border-b">
                              <div className="flex flex-col">
                                <select
                                  onChange={(e) =>
                                    setSelectedTechnicians(
                                      connectWiseMembersId,
                                      "roleId",
                                      e.target.value
                                    )
                                  }
                                >
                                  {techniciansRoleOptions.map((role) => {
                                    const { id, name } = role;
                                    return (
                                      <option key={name} value={id}>
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
                </div>
                <button
                  onClick={() =>
                    handleAddManageTechnician(user?.mspCustomDomain)
                  }
                  className="text-sm self-end bg-blue-800 text-white font-bold px-5 rounded-lg py-1"
                >
                  Save
                </button>
              </div>
            )}
          </div>
        ) : (
          <p className="text-xl font-bold text-black/20  w-full">
            Currently Have No Technicians Listed
          </p>
        )}
      </div>
    </div>
  );
};

export default Technician;
