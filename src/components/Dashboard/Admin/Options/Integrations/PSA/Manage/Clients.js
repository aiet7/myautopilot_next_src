"use client";

import useManageStore from "@/utils/store/admin/control/integrations/PSA/manageStore";
import useUserStore from "@/utils/store/user/userStore";
import { useEffect } from "react";
import { FaSpinner } from "react-icons/fa";

const Clients = () => {
  const { user } = useUserStore();

  const {
    activePage,
    activePerPage,
    successMessage,
    errorMessage,
    clients,
    clientsSelected,
    clientsFilterType,
    clientAndContactTypes,
    selectedAutoSyncType,
    loadingClients,
    setSelectedClients,
    setSelectAllClients,
    setClientsFilterType,
    setSelectedAutoSyncType,
    handleAddManageClients,
    handleAutoSync,
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
  }, [user]);
  
  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex flex-col text-xl overflow-hidden">
        <div className="flex flex-col self-end gap-1">
          {clientAndContactTypes && (
            <div className="flex gap-1 self-end">
              <select
                onChange={(e) => {
                  const selectedType = clientAndContactTypes.find(
                    (type) => type.id === parseInt(e.target.value)
                  );

                  if (selectedType) {
                    setSelectedAutoSyncType(selectedType.id, selectedType.name);
                  }
                }}
                className="text-xs self-end p-1 border rounded-lg"
              >
                <option value="">All Types</option>
                {clientAndContactTypes.map((type) => {
                  const { id, name } = type;
                  return (
                    <option key={id} value={id}>
                      {name}
                    </option>
                  );
                })}
              </select>
              <button
                onClick={() =>
                  handleAutoSync(
                    user?.mspCustomDomain,
                    selectedAutoSyncType.id,
                    selectedAutoSyncType.name
                  )
                }
                className="text-sm self-end bg-blue-800 text-white font-bold px-5 rounded-lg py-1"
              >
                Auto Sync Clients and Contacts
              </button>
            </div>
          )}
        </div>
        {currentClients?.length !== 0 ? (
          <div className="flex flex-col gap-7 text-xl overflow-hidden">
            {loadingClients ? (
              <div className="flex items-center gap-2">
                <p className="font-bold">Loading your Clients</p>
                <FaSpinner className="animate-spin" size={20} />
              </div>
            ) : (
              <div className="flex flex-col">
                <p className="font-bold">Your Current Clients</p>
                <p className="text-xs">
                  Select Clients you want to integrate and press next. Your
                  Contacts will be based of the Clients you integrated.
                </p>
              </div>
            )}

            {currentClients && (
              <div className="flex gap-2 flex-col overflow-hidden ">
                <div className="flex items-center justify-start gap-2">
                  
                  {errorMessage && (
                    <p className="text-red-500">Error Saving Clients</p>
                  )}
                </div>
                <div className="block text-sm overflow-auto scrollbar-thin max-h-full max-w-full ">
                  <table className="min-w-full table-fixed border-separate border-spacing-0 text-left">
                    <thead className="sticky top-0 bg-white text-lg text-black/60">
                      <tr className="">
                        <th className="p-2 border-l border-t border-b border-r">
                          <input
                            type="checkbox"
                            checked={currentClients.every(
                              (client) =>
                                clientsSelected[client.connectWiseCompanyId]
                                  ?.selected
                            )}
                            onChange={(e) =>
                              setSelectAllClients(e.target.checked)
                            }
                            className="flex items-center justify-center w-full h-full"
                          />
                        </th>
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
                <button
                  onClick={() => handleAddManageClients(user?.mspCustomDomain)}
                  className="text-sm self-end bg-blue-800 text-white font-bold px-5 rounded-lg py-1"
                >
                  Save
                </button>
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
