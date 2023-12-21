"use client";

import useRolesStore from "@/utils/store/admin/control/roles/rolesStore";
import { AiOutlineClose } from "react-icons/ai";
import { convertDate } from "@/utils/conversions";
import useTechStore from "@/utils/store/user/techStore";

const EditRole = () => {
  const { tech } = useTechStore();
  const {
    roleInputs,
    successMessage,
    errorMessage,
    roles,
    activeRole,
    setActiveEditRole,
    setRoleInputs,
    handleSaveEditedRole,
  } = useRolesStore();

  return (
    <div className="dark:bg-black/80 absolute bg-black/60 z-[99] top-0 bottom-0 right-0 left-0 p-2 lg:p-10">
      <div className="flex flex-col items-end bg-white max-w-[700px] h-full p-4 rounded-lg text-black mx-auto">
        <AiOutlineClose
          className="cursor-pointer"
          size={20}
          onClick={() => {
            setActiveEditRole(null);
          }}
        />
        <div className="flex flex-col gap-4 overflow-hidden w-full h-full">
          {activeRole && (
            <div className="flex gap-2 items-center justify-center font-semibold h-full">
              {roles
                ?.filter((filter) => filter.id === activeRole)
                ?.map((role) => {
                  const { id, custom, name, permissions, timeStamp } = role;
                  return (
                    <div
                      key={id}
                      className="flex flex-col items-center gap-8 w-full h-full"
                    >
                      <div className="flex flex-col items-center gap-1">
                        <h2 className="text-4xl font-bold">{name} Role</h2>
                        <p className="font-semibold text-black/30 italic">
                          Created {convertDate(timeStamp)}
                        </p>
                        <p className=" font-semibold text-black/30 italic">
                          Custom: {custom ? "True" : "False"}
                        </p>
                      </div>

                      <div className="text-xl flex flex-col items-start w-full gap-3">
                        <p className="w-24 font-bold">Permissions</p>
                        {Object.entries(roleInputs.selectedPermissions).map(
                          (permission) => {
                            const [permissionKey, permissionValue] = permission;

                            return (
                              <label
                                className="flex items-center gap-2"
                                key={permissionKey}
                              >
                                <input
                                  type="checkbox"
                                  checked={permissionValue}
                                  onChange={(e) =>
                                    setRoleInputs(
                                      "checkbox",
                                      permissionKey,
                                      e.target.checked
                                    )
                                  }
                                />
                                {permissionKey}
                              </label>
                            );
                          }
                        )}
                      </div>
                      <div className="flex items-end gap-4 justify-end h-full w-full ">
                        {successMessage.edit && (
                          <p className="font-semibold text-emerald-500">
                            Successfully Edited Role!
                          </p>
                        )}
                        {errorMessage.edit && (
                          <p className="font-bold text-red-500">
                            Error Editing Role!
                          </p>
                        )}
                        <button
                          onClick={() => {
                            handleSaveEditedRole(id, tech?.mspCustomDomain);
                          }}
                          className="hover:bg-blue-500 bg-blue-800 text-white rounded-lg py-2 px-20 font-bold"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditRole;
