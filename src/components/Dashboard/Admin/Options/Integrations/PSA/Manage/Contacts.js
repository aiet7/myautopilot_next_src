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
              <div className="flex items-center gap-2 text-lg">
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
                    <thead className="sticky top-0 bg-white  text-black/60">
                      <tr className="">
                        <th className="p-2 border-l border-t border-b border-r">
                          <input
                            type="checkbox"
                            checked={currentContacts.every(
                              (contact) =>
                                contactsSelected[contact.connectWiseContactId]
                                  ?.selected
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
                        <th className="p-2 border-t border-b border-r ">
                          Company
                        </th>
                        <th className="p-2 border-t border-b border-r">
                          Title
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
                        <th className="p-2 border-t border-b border-r">
                          Default Phone Number
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentContacts?.map((contact) => {
                        const {
                          firstName,
                          lastName,
                          title,
                          company,
                          connectWiseEmailId,
                          connectWiseCompanyId,
                          connectWiseContactId,
                          connectWisePhoneNumber,
                          defaultPhoneNbr,
                          defaultPhoneType,
                          isInDB,
                        } = contact;
                        return (
                          <tr
                            key={connectWiseContactId}
                            className={`${isInDB ? "text-black/20" : ""}`}
                          >
                            <td className="p-2 truncate border-l border-r border-b">
                              {!isInDB && (
                                <input
                                  checked={
                                    contactsSelected[connectWiseContactId]
                                      ?.selected || false
                                  }
                                  onChange={(e) =>
                                    setSelectedContacts(
                                      connectWiseContactId,
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
                              {company?.name}
                            </td>
                            <td className="p-2 truncate border-r border-b">
                              {title}
                            </td>
                            <td className="p-2 truncate border-r border-b">
                              {connectWiseCompanyId}
                            </td>
                            <td className="p-2 truncate border-r border-b">
                              {connectWiseContactId}
                            </td>
                            <td className="p-2 truncate border-r border-b">
                              {connectWiseEmailId}
                            </td>
                            <td className="p-2 truncate border-r border-b">
                              {connectWisePhoneNumber}
                            </td>
                            <td className="p-2 truncate border-r border-b">
                              {defaultPhoneType + ": " + defaultPhoneNbr}
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
                  className="self-end  bg-blue-800 text-white font-bold px-5 rounded-lg py-1"
                >
                  Save
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
      {finishedIntagrationShow && (
        <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center z-[99]">
          <div className="bg-gray-700 text-white flex flex-col justify-center gap-4 w-[320px] h-[220px] p-3 rounded-md">
            <h2 className="font-bold">Finished Integrating</h2>
            <p>
              You have successfully integrated your ConnectWise Manage system
              into our platform. You can now manage your tickets, board,
              technicians and clients through our admin portal!
            </p>
            <button
              onClick={() => setFinishedIntegratingToast(false)}
              className="self-end bg-blue-800 text-white font-bold px-5 rounded-lg py-1"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contacts;
