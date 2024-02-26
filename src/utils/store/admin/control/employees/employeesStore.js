import { create } from "zustand";
import useUserStore from "@/utils/store/user/userStore";
import {
  handleGetManageDBTechnicians,
  handleGetRoles,
} from "@/utils/api/serverProps";

const dbServiceUrl = process.env.NEXT_PUBLIC_DB_SERVICE_URL;
const connectWiseServiceUrl = process.env.NEXT_PUBLIC_CONNECTWISE_SERVICE_URL;
const emailConnectorUrl = process.env.NEXT_PUBLIC_EMAILCONNECTOR_URL;

const useEmployeesStore = create((set, get) => ({
  employees: null,

  employeesTierOptions: ["Tier1", "Tier2", "Tier3", "NoTier"],
  employeesRoleOptions: null,

  successMessage: false,
  errorMessage: false,

  initializeEmployees: async () => {
    const userStore = useUserStore.getState();
    set({ employees: null });

    if (userStore.user) {
      try {
        const [dbEmployees, newRoles] = await Promise.all([
          handleGetManageDBTechnicians(userStore.user.mspCustomDomain),
          handleGetRoles(userStore.user.mspCustomDomain),
        ]);

        set({
          employees: dbEmployees,
          employeesRoleOptions: newRoles,
        });
      } catch (e) {
        console.log(e);
      }
    }
  },

  setSelectedEmployee: (id, field, value) => {
    const { employees } = get()
    const updatedEmployees = employees.map((employee) => {
      if (employee.id === id) {
        return { ...employee, [field]: value }
      }
      return employee
    })
    set({
      employees: updatedEmployees
    })
  },

  handleSaveEmployee: async (mspCustomDomain, employeeId) => {
    const { employees } = get()

    const employeeToUpdate = employees.find((employee) => employee.id === employeeId)
    try {
      const response = await fetch(`${dbServiceUrl}/${mspCustomDomain}/technicianUsers/edit`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: employeeToUpdate.email,
          roleId: employeeToUpdate.roleId,
          tierLevel: employeeToUpdate.tierLevel

        })
      })

      if (response.status === 200) {
        console.log("Role and Tier Updated!")
        set({
          successMessage: true,
          errorMessage: false
        })
      } else {
        console.log("Role and Tier Updated Failed!")
        set({
          successMessage: false,
          errorMessage: true
        })
      }

    } catch (e) {
      console.log(e)
    }

  },

  clearEmployees: () => {
    set({
      employees: null,
    });
  },
}));

export default useEmployeesStore;
