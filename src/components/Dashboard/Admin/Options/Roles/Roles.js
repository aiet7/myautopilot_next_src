"use client";

import useRolesStore from "@/utils/store/admin/control/roles/rolesStore";
import useUiStore from "@/utils/store/ui/uiStore";
import useTechStore from "@/utils/store/user/techStore";
import { useEffect } from "react";
import { convertDate } from "@/utils/conversions";
import EditRole from "./EditRole";
import CreateRole from "./CreateRole";

const Roles = ({}) => {
  const { tech } = useTechStore();

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
  }, [tech]);

  return (
    <div
      onClick={() => {
        if (window.innerWidth < 1023) {
          openAdmin && handleHistoryMenu(false);
        }
      }}
      className={`relative flex flex-col h-full w-full ${
        openAdmin && "lg:opacity-100 opacity-5 xl:ml-[350px]"
      }  dark:bg-black transition-all duration-300 ease bg-white`}
    >
      {activeRole && <EditRole />}
      {createRole && <CreateRole />}
      <div className="w-full h-full flex flex-col ">
        <div className="dark:border-b-white/20 border-b p-4">
          <h1 className="text-2xl">Roles</h1>
        </div>
        <div className="dark:shadow-white/40 dark:border-white/20 overflow-hidden flex flex-col lg:dark:shadow-white/40 lg:border lg:shadow lg:my-12 lg:mx-4">
          <div className="flex flex-col gap-2 p-4">
            <p className="dark:text-white/70 text-sm text-black/50">
              Create roles and assign permissions
            </p>
            <div className="flex items-center gap-2 ">
              <button
                onClick={() => setCreateRole(true)}
                className="dark:border-white/20 hover:bg-blue-500 border bg-blue-800 text-white py-1 px-3"
              >
                Create Role
              </button>
              <input
                type="text"
                placeholder="Search by name"
                className="dark:border-white/20 p-1 border mr-2"
              />
            </div>
          </div>

          <div className="px-4 pb-4 block text-sm overflow-auto scrollbar-thin max-h-full max-w-full">
            <table className="dark:text-white/70 text-black/50 min-w-full table-fixed border-separate border-spacing-0 text-left">
              <thead className="dark:bg-gray-700 sticky top-0 bg-[#F5F8FA]">
                <tr className="">
                  <th className="p-2 w-[44px] h-[44px] border"></th>
                  <th className="p-2  truncate border-t border-b border-r cursor-pointer">
                    Name
                  </th>
                  <th className="p-2  truncate border-t border-b border-r cursor-pointer">
                    Date Created
                  </th>
                </tr>
              </thead>
              <tbody>
                {roles?.map((role, index) => {
                  const { id, custom, name, timeStamp } = role;
                  return (
                    <tr key={id} className="">
                      <td className="p-2 border-r border-l border-b text-center">
                        <div className="flex gap-3">
                          <button
                            onClick={() =>
                              handleCloneRole(id, tech?.mspCustomDomain)
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
                                  handleDeleteRole(id, tech?.mspCustomDomain)
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
              <p className="font-semibold text-red-500">Error Cloning Role!</p>
            )}

            {errorMessage.delete && (
              <p className="font-bold text-red-500">Error Deleting Role!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Roles;

// db.Roles.insertMany([
//   {
//     _id: ObjectId("654002b96a55f75b62a1b55b"),
//     name: "regular",
//     permissions: {
//       clientBilling: false,
//       mspBilling: false,
//       clientUserManagement: false,
//       technicianUserManagement: false,
//       mspBranding: false,
//       mspIntegrations: false,
//       clientDocuments: false,
//       mspDocuments: false,
//     },
//     mspCustomDomain: 5,
//     custom: false,
//     _class: "com.etech7.entity.Roles",
//   },
// ]);
