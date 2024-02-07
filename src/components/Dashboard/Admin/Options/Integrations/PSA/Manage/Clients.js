"use client";

import useManageStore from "@/utils/store/admin/control/integrations/PSA/manageStore";
import useTechStore from "@/utils/store/user/techStore";
import { useEffect } from "react";
import { FaSpinner } from "react-icons/fa";

const Clients = () => {
  const { tech } = useTechStore();

  const {
    activePage,
    activePerPage,
    successMessage,
    errorMessage,
    clients,
    clientsSelected,
    clientsFilterType,
    loadingClients,
    setSelectedClients,
    setClientsFilterType,
    handleAddManageClients,
    initializeManageClients,
  } = useManageStore();

  const filteredClients = clientsFilterType
    ? clients?.filter((client) =>
        client.types?.some((type) => type.name === clientsFilterType)
      )
    : clients;

  const indexOfLastClient = activePage * activePerPage;
  const indexOfFirstClient = indexOfLastClient - activePerPage;
  const currentClients = filteredClients?.slice(
    indexOfFirstClient,
    indexOfLastClient
  );

  const filteredClientTypes = Array.from(
    new Set(
      clients?.flatMap((client) => client.types?.map((type) => type.name))
    )
  );

  useEffect(() => {
    initializeManageClients();
  }, [initializeManageClients, tech]);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex flex-col text-xl overflow-hidden">
        {currentClients?.length !== 0 ? (
          <div className="flex flex-col gap-7 text-xl overflow-hidden">
            {loadingClients ? (
              <div className="flex items-center gap-2">
                <p className="font-bold">Loading your Clients</p>
                <FaSpinner className="animate-spin" size={20} />
              </div>
            ) : (
              <p className="font-bold">Your Current Clients</p>
            )}

            {currentClients && (
              <div className="flex gap-2 flex-col overflow-hidden ">
                <div className="flex items-center justify-start gap-2">
                  <button
                    onClick={() =>
                      handleAddManageClients(tech?.mspCustomDomain)
                    }
                    className="text-sm  bg-blue-800 text-white font-bold px-5 rounded-lg py-1"
                  >
                    Bulk Save
                  </button>
                  {successMessage && (
                    <p className="text-emerald-500">
                      Saved Clients Successfully!
                    </p>
                  )}
                  {errorMessage && (
                    <p className="text-red-500">Error Saving Clients</p>
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
                        <th className="p-2 border-t border-b border-r">
                          <div className="flex flex-col items-start lg:flex-row lg:items-center lg:gap-4">
                            Type
                            <select
                              className="text-xs  p-1 border rounded-lg"
                              onChange={(e) =>
                                setClientsFilterType(e.target.value)
                              }
                            >
                              <option value="">All Types</option>
                              {filteredClientTypes?.map((type) => (
                                <option key={type} value={type}>
                                  {type}
                                </option>
                              ))}
                            </select>
                          </div>
                        </th>
                        <th className="p-2 border-t border-b border-r">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentClients?.map((client) => {
                        const {
                          name,
                          connectWiseCompanyId,
                          addressLine1,
                          addressLine2,
                          city,
                          zip,
                          defaultContact,
                          phoneNumber,
                          status,
                          types,
                          isInDB,
                        } = client;
                        return (
                          <tr
                            key={connectWiseCompanyId}
                            className={`${isInDB ? "text-black/20" : ""}`}
                          >
                            <td className="p-2 truncate border-l border-r border-b">
                              {!isInDB && (
                                <input
                                  checked={
                                    clientsSelected[connectWiseCompanyId]
                                      ?.selected || false
                                  }
                                  onChange={(e) =>
                                    setSelectedClients(
                                      connectWiseCompanyId,
                                      e.target.checked
                                    )
                                  }
                                  className="flex items-center justify-center w-full h-full"
                                  type="checkbox"
                                />
                              )}
                            </td>
                            <td className="p-2 truncate  border-r border-b">
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
                            <td className="p-2 truncate border-r border-b">
                              <div className="flex flex-col gap-1">
                                {types?.map((type) => {
                                  const { id, name } = type;
                                  return <p key={id}>{name}</p>;
                                })}
                              </div>
                            </td>

                            <td className="p-2 truncate border-r border-b">
                              {status?.name}
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
            Currently Have No Clients Listed
          </p>
        )}
      </div>
    </div>
  );
};

export default Clients;
