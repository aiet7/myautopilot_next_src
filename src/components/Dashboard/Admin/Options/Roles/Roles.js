"use client";

import useRolesStore from "@/utils/store/admin/control/roles/rolesStore";
import useUiStore from "@/utils/store/ui/uiStore";
import useUserStore from "@/utils/store/user/userStore";
import { useEffect } from "react";
import { convertDate } from "@/utils/conversions";
import EditRole from "./EditRole";
import CreateRole from "./CreateRole";

const Roles = ({ }) => {
  const { user } = useUserStore();

  const {
    errorMessage,
    roles,
    activeRole,
    createRole,
    setActiveEditRole,
    setCreateRole,
    handleCloneRole,
    handleDeleteRole,
    initializeRoles,
  } = useRolesStore();

  const { openAdmin, handleHistoryMenu } = useUiStore();

  useEffect(() => {
    initializeRoles();
  }, [user]);

  return (
    <div
      onClick={() => {
        if (window.innerWidth < 1023) {
          openAdmin && handleHistoryMenu(false);
        }
      }}
      className={`relative flex flex-col h-full w-full ${openAdmin && "lg:opacity-100 opacity-5 xl:ml-[350px]"
        }  dark:bg-black transition-all duration-300 ease bg-white`}
    >
      {activeRole && <EditRole />}
      {createRole && <CreateRole />}
      <div className="dark:border-b-white/20 border-b p-4">
        <h1 className="text-2xl">Roles</h1>
      </div>
      <div className="flex flex-col h-full overflow-hidden pb-4">
        <div className="flex flex-col text-xl overflow-hidden">
          {roles?.length !== 0 ? (
            <div className="flex flex-col gap-7 text-xl overflow-hidden">
              {roles && (
                <div className="flex  flex-col overflow-hidden px-4">
                  <div className="flex items-center justify-start gap-2 py-4">
                    <button
                      onClick={() => setCreateRole(true)}
                      className="text-sm  bg-blue-800 text-white font-bold px-5 rounded-lg py-1"
                    >
                      Add Role
                    </button>
                  </div>
                  <div className="block text-sm overflow-auto scrollbar-thin max-h-full max-w-full">
                    <table className="min-w-full table-fixed border-separate border-spacing-0 text-left">
                      <thead className="dark:text-white dark:bg-gray-700 sticky top-0 text-lg text-black/60 bg-[#F5F8FA]">
                        <tr className="">
                          <th className="p-2 border-l border-t border-b border-r"></th>
                          <th className="p-2 border-t border-b border-r">
                            Name
                          </th>
                          <th className="p-2 border-t border-b border-r">
                            Date Created
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {roles?.map((role) => {
                          const { id, custom, name, timeStamp } = role;
                          return (
                            <tr key={id}>
                              <td className="p-2 truncate border-l  border-r border-b">
                                <div className="flex gap-3">
                                  <button
                                    onClick={() =>
                                      handleCloneRole(id, user?.mspCustomDomain)
                                    }
                                    className="hover:underline text-blue-500"
                                  >
                                    Clone
                                  </button>
                                  {custom === true && (
                                    <>
                                      <button
                                        onClick={() => setActiveEditRole(id)}
                                        className="hover:underline text-blue-500"
                                      >
                                        Edit
                                      </button>

                                      <button
                                        onClick={() =>
                                          handleDeleteRole(
                                            id,
                                            user?.mspCustomDomain
                                          )
                                        }
                                        className="hover:underline text-blue-500"
                                      >
                                        Delete
                                      </button>
                                    </>
                                  )}
                                </div>
                              </td>
                              <td className="p-2 truncate border-r border-b">
                                {name} (Custom: {custom ? "True" : "False"})
                              </td>
                              <td className="p-2 truncate border-r border-b">
                                {convertDate(timeStamp)}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                    {errorMessage.clone && (
                      <p className="font-semibold text-red-500">
                        Error Cloning Role!
                      </p>
                    )}

                    {errorMessage.delete && (
                      <p className="font-bold text-red-500">
                        Error Deleting Role!
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <p className="text-xl font-bold text-black/20 p-4 w-full">
              Currently Have No Roles Listed
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Roles;
