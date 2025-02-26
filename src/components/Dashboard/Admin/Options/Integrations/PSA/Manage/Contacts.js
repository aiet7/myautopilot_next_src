"use client";

import useUserStore from "@/utils/store/user/userStore";
import useManageStore from "@/utils/store/admin/control/integrations/PSA/manageStore";
import { useEffect } from "react";
import { FaSpinner } from "react-icons/fa";

const Contacts = () => {
  const { user } = useUserStore();
  const {
    finishedIntagrationShow,
    activePage,
    activePerPage,
    successMessage,
    errorMessage,
    contacts,
    contactsSelected,
    loadingContacts,
    setFinishedIntegratingToast,
    setSelectedContacts,
    setSelectAllContacts,
    handleAddManageContacts,
    initializeManageContacts,
  } = useManageStore();

  const indexOfLastContact = activePage * activePerPage;
  const indexOfFirstContact = indexOfLastContact - activePerPage;
  const currentContacts = contacts?.slice(
    indexOfFirstContact,
    indexOfLastContact
  );
  useEffect(() => {
    initializeManageContacts();
  }, [user]);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex flex-col  overflow-hidden">
        {currentContacts?.length !== 0 ? (
          <div className="flex flex-col gap-7  overflow-hidden">
            {loadingContacts ? (
              <div className="flex items-center gap-2">
                <p className="font-bold">Loading your Contacts</p>
                <FaSpinner className="animate-spin" size={20} />
              </div>
            ) : (
              <div className="flex flex-col text-lg">
                <p className="font-bold">Your Current Contacts</p>
                <p className="text-xs">
                  Select Contacts you want to integrate and press next.
                </p>
              </div>
            )}
            {currentContacts && (
              <div className="flex gap-2 flex-col overflow-hidden ">
                <div className="flex items-center justify-start gap-2">
                  {errorMessage && (
                    <p className="text-red-500">Error Saving Contacts</p>
                  )}
                </div>
                <div className="block overflow-auto scrollbar-thin max-h-full max-w-full ">
                  <table className="min-w-full table-fixed border-separate border-spacing-0 text-left">
                    <thead className="sticky top-0 bg-[#F5F8FA] text-black/60">
                      <tr className="">
                        <th className="p-2 border-l border-t border-b border-r">
                          <input
                            type="checkbox"
                            checked={currentContacts.every(
                              (contact) =>
                                contactsSelected[contact.psaContactId]?.selected
                            )}
                            onChange={(e) =>
                              setSelectAllContacts(e.target.checked)
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
                          Contact ID
                        </th>
                        <th className="p-2 border-t border-b border-r">
                          Primary Email
                        </th>
                        <th className="p-2 border-t border-b border-r">
                          Phone Number
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentContacts?.map((contact) => {
                        const {
                          firstName,
                          lastName,
                          company,
                          email,
                          psaCompanyId,
                          psaContactId,
                          phone,
                          defaultPhoneNbr,
                          defaultPhoneType,
                          isInDB,
                        } = contact;
                        return (
                          <tr
                            key={psaContactId}
                            className={`${isInDB ? "text-black/20" : ""}`}
                          >
                            <td className="p-2 truncate border-l border-r border-b">
                              {!isInDB && (
                                <input
                                  checked={
                                    contactsSelected[psaContactId]?.selected ||
                                    false
                                  }
                                  onChange={(e) =>
                                    setSelectedContacts(
                                      psaContactId,
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
                              {psaCompanyId}
                            </td>
                            <td className="p-2 truncate border-r border-b">
                              {psaContactId}
                            </td>
                            <td className="p-2 truncate border-r border-b">
                              {email}
                            </td>
                            <td className="p-2 truncate border-r border-b">
                              {phone}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <button
                  id="manageAuthenticated-saveContacts"
                  onClick={() => handleAddManageContacts(user?.mspCustomDomain)}
                  className="self-end  bg-blue-800 text-white font-bold px-5 rounded py-2"
                >
                  Save Contacts
                </button>
              </div>
            )}
          </div>
        ) : (
          <p className="text-xl font-bold text-black/20  w-full">
            Currently Have No Contacts Listed
          </p>
        )}
      </div>
     
    </div>
  );
};

export default Contacts;
