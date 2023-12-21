"use client";

import useRolesStore from "@/utils/store/admin/control/roles/rolesStore";
import useTechStore from "@/utils/store/user/techStore";
import { AiOutlineClose } from "react-icons/ai";

const CreateRole = () => {
  const { tech } = useTechStore();
  const {
    successMessage,
    errorMessage,
    roleInputs,
    permissions,
    setCreateRole,
    setRoleInputs,
    handleCreateRole,
  } = useRolesStore();
  
  return (
    <div className="dark:bg-black/80 absolute bg-black/60 z-[99] top-0 bottom-0 right-0 left-0 p-2 lg:p-10">
      <div className="flex flex-col items-end bg-white max-w-[700px] h-full p-4 rounded-lg text-black mx-auto">
        <AiOutlineClose
          className="cursor-pointer"
          size={20}
          onClick={() => {
            setCreateRole(false);
          }}
        />
        <div className="flex flex-col gap-4 overflow-hidden w-full h-full">
          <div className="flex flex-col items-center justify-center font-semibold">
            <div className="flex flex-col items-center gap-8 w-full">
              <div className="flex flex-col items-center gap-1">
                <h2 className="text-4xl font-bold">Create A Role</h2>
                <p className="font-semibold text-black/30 italic">
                  Create a role and assign permissions to a technician or
                  client.
                </p>
              </div>
              <div className="flex items-center w-full gap-4">
                <p className="text-lg w-24 font-bold">Role Title</p>
                <input
                  value={roleInputs.roleTitle}
                  onChange={(e) =>
                    setRoleInputs("text", "roleTitle", e.target.value)
                  }
                  className="p-1 w-full border rounded"
                />
              </div>
              <div className="text-xl flex flex-col items-start w-full gap-3">
                <p className="w-24 font-bold">Permissions</p>
                {permissions.map((permission) => {
                  return (
                    <label className="flex items-center gap-2" key={permission}>
                      <input
                        type="checkbox"
                        onChange={(e) =>
                          setRoleInputs(
                            "checkbox",
                            permission,
                            e.target.checked
                          )
                        }
                        checked={roleInputs.selectedPermissions[permission]}
                      />
                      {permission}
                    </label>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="flex items-end gap-4 justify-end h-full w-full ">
            {successMessage.create && (
              <p className="font-semibold text-emerald-500">
                Successfully Created Role!
              </p>
            )}
            {errorMessage.create && (
              <p className="font-bold text-red-500">Error Creating Role!</p>
            )}
            <button
              onClick={() => handleCreateRole(tech?.mspCustomDomain)}
              className="hover:bg-blue-500 bg-blue-800 text-white rounded-lg py-2 px-20 font-bold"
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateRole;
