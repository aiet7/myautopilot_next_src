import { handleGetRoles } from "@/utils/api/serverProps";
import useUserStore from "@/utils/store/user/userStore";
import { create } from "zustand";

const dbServiceUrl = process.env.NEXT_PUBLIC_DB_SERVICE_URL;
const connectWiseServiceUrl = process.env.NEXT_PUBLIC_CONNECTWISE_SERVICE_URL;

const useRolesStore = create((set, get) => ({
  roles: null,

  roleInputs: {
    roleTitle: "",
    selectedPermissions: {
      clientBilling: false,
      mspBilling: false,
      clientUserManagement: false,
      technicianUserManagement: false,
      mspBranding: false,
      mspIntegrations: false,
      clientDocuments: false,
      mspDocuments: false,
    },
  },

  permissions: [
    "clientBilling",
    "mspBilling",
    "clientUserManagement",
    "technicianUserManagement",
    "mspBranding",
    "mspIntegrations",
    "clientDocuments",
    "mspDocuments",
  ],

  activeRole: null,

  createRole: false,

  successMessage: {
    edit: false,
    create: false,
    clone: false,
    delete: false,
  },
  errorMessage: {
    edit: false,
    create: false,
    clone: false,
    delete: false,
  },

  initializeRoles: async () => {
    const userStore = useUserStore.getState();
    set({ roles: null });

    if (userStore.user) {
      const newRoles = await handleGetRoles(userStore.user.mspCustomDomain);
      set({ roles: newRoles });
    }
  },

  setRoleInputs: (type, field, value) => {
    set((prevState) => ({
      roleInputs:
        type === "checkbox"
          ? {
              ...prevState.roleInputs,
              selectedPermissions: {
                ...prevState.roleInputs.selectedPermissions,
                [field]:
                  type === "checkbox"
                    ? !prevState.roleInputs.selectedPermissions[field]
                    : value,
              },
            }
          : {
              ...prevState.roleInputs,
              [field]: value,
            },
    }));
  },

  setActiveEditRole: (roleId) => {
    const { roles, errorMessage, successMessage } = get();

    if (roleId === null) {
      set({
        activeRole: null,
        roleInputs: {
          roleTitle: "",
          selectedPermissions: {
            clientBilling: false,
            mspBilling: false,
          },
        },
      });
    } else {
      const roleToEdit = roles.find((role) => role.id === roleId);
      if (roleToEdit) {
        set({
          activeRole: roleId,
          roleInputs: {
            roleTitle: roleToEdit.name,
            selectedPermissions: roleToEdit.permissions,
          },
        });
      }
    }
    set({
      errorMessage: { ...errorMessage, edit: false },
      successMessage: { ...successMessage, edit: false },
    });
  },

  setCreateRole: (create) => {
    const { errorMessage, successMessage } = get();
    set({
      createRole: create,
      errorMessage: { ...errorMessage, create: false },
      successMessage: { ...successMessage, create: false },
    });
  },

  handleSaveEditedRole: async (roleId, mspCustomDomain) => {
    const { roles, roleInputs, errorMessage, successMessage } = get();
    const { roleTitle, selectedPermissions } = roleInputs;

    try {
      const response = await fetch(
        `${dbServiceUrl}/${mspCustomDomain}/roles/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: roleId,
            name: roleTitle,
            permissions: selectedPermissions,
            custom: true,
            mspCustomDomain: mspCustomDomain,
          }),
        }
      );

      if (response.status === 200) {
        const updatedRole = await response.json();
        const updatedRoles = roles.map((role) =>
          role.id === roleId ? updatedRole : role
        );
        set({
          roles: updatedRoles,
          errorMessage: { ...errorMessage, edit: false },
          successMessage: { ...successMessage, edit: true },
        });
        console.log("ROLE EDITED");
      } else {
        set({
          errorMessage: { ...errorMessage, edit: true },
          successMessage: { ...successMessage, edit: false },
        });
        console.log("ERROR EDITING ROLE");
      }
    } catch (e) {
      console.log(e);
    }
  },

  handleCreateRole: async (mspCustomDomain) => {
    const { roles, roleInputs, errorMessage, successMessage } = get();

    const { roleTitle, selectedPermissions } = roleInputs;

    try {
      const response = await fetch(
        `${dbServiceUrl}/${mspCustomDomain}/roles/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: roleTitle,
            permissions: selectedPermissions,
            custom: true,
            mspCustomDomain: mspCustomDomain,
          }),
        }
      );

      if (response.status === 200) {
        const newRole = await response.json();
        set({
          errorMessage: { ...errorMessage, create: false },
          successMessage: { ...successMessage, create: true },
          roles: [...roles, newRole],
        });
        console.log("ROLE CREATED");
      } else {
        set({
          errorMessage: { ...errorMessage, create: true },
          successMessage: { ...successMessage, create: false },
        });
        console.log("ERROR CREATING ROLE");
      }
    } catch (e) {
      console.log(e);
    } finally {
      set({
        roleInputs: {
          roleTitle: "",
          selectedPermissions: {
            clientBilling: false,
            mspBilling: false,
            clientUserManagement: false,
            technicianUserManagement: false,
            mspBranding: false,
            mspIntegrations: false,
            clientDocuments: false,
            mspDocuments: false,
          },
        },
      });
    }
  },

  handleCloneRole: async (roleId, mspCustomDomain) => {
    const { roles, errorMessage, successMessage } = get();

    const roleToClone = roles.find((role) => role.id === roleId);
    const baseName = roleToClone.name.split(" - Clone")[0];
    const cloneCount = roles.filter((role) =>
      role.name.startsWith(baseName + " - Clone")
    ).length;

    try {
      const response = await fetch(
        `${dbServiceUrl}/${mspCustomDomain}/roles/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: `${baseName} - Clone ${cloneCount + 1}`,
            permissions: roleToClone.permissions,
            custom: true,
            mspCustomDomain: mspCustomDomain,
          }),
        }
      );

      if (response.status === 200) {
        const clonedRole = await response.json();
        set({
          errorMessage: { ...errorMessage, clone: false },
          successMessage: { ...successMessage, clone: true },
          roles: [...roles, clonedRole],
        });
        console.log("ROLE CLONED");
      } else {
        set({
          errorMessage: { ...errorMessage, clone: true },
          successMessage: { ...successMessage, clone: false },
        });
        console.log("ERROR CLONING ROLE");
      }
    } catch (e) {
      console.log(e);
    }
  },

  handleDeleteRole: async (roleId, mspCustomDomain) => {
    const { roles, errorMessage, successMessage } = get();

    const roletoDelete = roles.find((role) => role.id === roleId);

    try {
      const response = await fetch(
        `${dbServiceUrl}/${mspCustomDomain}/roles/delete?id=${roletoDelete.id}`
      );

      if (response.status === 200) {
        const updatedRoles = roles.filter(
          (role) => role.id !== roletoDelete.id
        );
        set({
          errorMessage: { ...errorMessage, delete: false },
          successMessage: { ...successMessage, delete: true },
          roles: updatedRoles,
        });
        console.log("ROLE DELETED");
      } else {
        set({
          errorMessage: { ...errorMessage, delete: true },
          successMessage: { ...successMessage, delete: false },
        });
        console.log("ERROR DELETING ROLE");
      }
    } catch (e) {
      console.log(e);
    }
  },

  clearRoles: () => {
    set({
      roles: null,

      roleInputs: {
        roleTitle: "",
        selectedPermissions: {
          clientBilling: false,
          mspBilling: false,
          clientUserManagement: false,
          technicianUserManagement: false,
          mspBranding: false,
          mspIntegrations: false,
          clientDocuments: false,
          mspDocuments: false,
        },
      },

      permissions: [
        "clientBilling",
        "mspBilling",
        "clientUserManagement",
        "technicianUserManagement",
        "mspBranding",
        "mspIntegrations",
        "clientDocuments",
        "mspDocuments",
      ],

      activeRole: null,

      createRole: false,

      successMessage: {
        edit: false,
        create: false,
        clone: false,
        delete: false,
      },
      errorMessage: {
        edit: false,
        create: false,
        clone: false,
        delete: false,
      },
    });
  },
}));

export default useRolesStore;
