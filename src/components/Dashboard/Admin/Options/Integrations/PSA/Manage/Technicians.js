"use client";

import useManageStore from "@/utils/store/admin/control/integrations/PSA/manageStore";
import useTechStore from "@/utils/store/user/techStore";
import { useEffect } from "react";

const Technician = () => {
  const { tech } = useTechStore();

  const {
    successMessage,
    errorMessage,
    techniciansSelected,
    technicians,
    techniciansTierOptions,
    techniciansRoleOptions,
    setSelectedTechnicians,
    handleAddManageTechnician,
    initializeManageTechnicians,
  } = useManageStore();

  useEffect(() => {
    initializeManageTechnicians();
  }, [tech]);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex flex-col text-xl overflow-hidden">
        {technicians?.length !== 0 ? (
          <div className="flex flex-col gap-7 text-xl overflow-hidden">
            <p className="font-bold">Your Current Technicians</p>
            {technicians && (
              <div className="flex gap-2 flex-col overflow-hidden ">
                <div className="flex items-center justify-start gap-2">
                  <button
                    onClick={() =>
                      handleAddManageTechnician(tech?.mspCustomDomain)
                    }
                    className="text-sm  bg-blue-800 text-white font-bold px-5 rounded-lg py-1"
                  >
                    Bulk Save
                  </button>
                  {successMessage && (
                    <p className="text-emerald-500">
                      Saved Technicians Successfully!
                    </p>
                  )}
                  {errorMessage && (
                    <p className="text-red-500">Error Saving Technicians</p>
                  )}
                </div>
                <div className="block text-sm overflow-auto scrollbar-thin max-h-full max-w-full ">
                  <table className="min-w-full table-fixed border-separate border-spacing-0 text-left">
                    <thead className="sticky top-0 bg-white text-lg text-black/60">
                      <tr className="">
                        <th className="p-2 border-l border-t border-b border-r"></th>
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
                      {technicians?.map((technician) => {
                        const {
                          id,
                          firstName,
                          lastName,
                          mobilePhone,
                          identifier,
                          officeEmail,
                          officePhone,
                          primaryEmail,
                        } = technician;
                        return (
                          <tr key={id}>
                            <td className="p-2 truncate border-l border-r border-b">
                              <input
                                checked={
                                  techniciansSelected[id]?.selected || false
                                }
                                onChange={(e) =>
                                  setSelectedTechnicians(
                                    id,
                                    "selected",
                                    e.target.checked
                                  )
                                }
                                className="flex items-center justify-center w-full h-full"
                                type="checkbox"
                              />
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
                                      id,
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
                                      id,
                                      "role",
                                      e.target.value
                                    )
                                  }
                                >
                                  {techniciansRoleOptions.map((role) => {
                                    const { name } = role;
                                    return (
                                      <option key={name} value={name}>
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
