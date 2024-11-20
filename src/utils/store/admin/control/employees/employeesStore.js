import { create } from "zustand";
import useUserStore from "@/utils/store/user/userStore";
import {
  handleGetManageInactiveDBTechnicians,
  handleGetManageActiveDBTechnicians,
  handleGetRoles,
} from "@/utils/api/serverProps";

const dbServiceUrl = process.env.NEXT_PUBLIC_DB_SERVICE_URL;
const connectWiseServiceUrl = process.env.NEXT_PUBLIC_CONNECTWISE_SERVICE_URL;
const emailConnectorUrl = process.env.NEXT_PUBLIC_EMAILCONNECTOR_URL;

const useEmployeesStore = create((set, get) => ({
  employees: null,
  activeEmployees: null,

  employeesTierOptions: ["Tier1", "Tier2", "Tier3", "NoTier"],
  employeesRoleOptions: null,

  currentView: "Active",

  successMessage: false,
  errorMessage: false,

  addEmployeeInputs: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  },

  errors: {
    emptyFields: false,
    uniqueEmail: false,
  },

  addEmployee: false,

  resetErrors: () =>
    set({ errors: { emptyFields: false, uniqueEmail: false } }),

  initializeEmployees: async () => {
    const userStore = useUserStore.getState();
    set({ activeEmployees: null, employees: null });

    if (userStore.user) {
      try {
        const [dbEmployees, dbActiveEmployees, newRoles] = await Promise.all([
          handleGetManageInactiveDBTechnicians(userStore.user.mspCustomDomain),
          handleGetManageActiveDBTechnicians(userStore.user.mspCustomDomain),
          handleGetRoles(userStore.user.mspCustomDomain),
        ]);

        set({
          employees: dbEmployees,
          activeEmployees: dbActiveEmployees,
          employeesRoleOptions: newRoles,
        });
      } catch (e) {
        console.log(e);
      }
    }
  },

  setCurrentView: (view) => set({ currentView: view }),

  setSelectedEmployee: (id, field, value, isActive) => {
    const { activeEmployees, employees } = get();

    const targetEmployees = isActive ? activeEmployees : employees;

    const updatedEmployees = targetEmployees.map((employee) => {
      if (employee.id === id) {
        return { ...employee, [field]: value };
      }
      return employee;
    });

    if (isActive) {
      set({
        activeEmployees: updatedEmployees,
      });
    } else {
      set({
        employees: updatedEmployees,
      });
    }
  },

  setAddEmployee: (add) => {
    set({ addEmployee: add, successMessage: false, errorMessage: false });
  },

  setNewEmployeeInputs: (name, value) => {
    set((state) => ({
      addEmployeeInputs: {
        ...state.addEmployeeInputs,
        [name]: value,
      },
    }));
  },

  handleSaveActiveEmployee: async (mspCustomDomain, employeeId) => {
    const { activeEmployees } = get();

    const employeeToUpdate = activeEmployees.find(
      (employee) => employee.id === employeeId
    );
    try {
      const response = await fetch(
        `${dbServiceUrl}/${mspCustomDomain}/technicianUsers/edit`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: employeeToUpdate.email,
            roleId: employeeToUpdate.roleId,
            tierLevel: employeeToUpdate.tierLevel,
          }),
        }
      );

      if (response.status === 200) {
        console.log("Role And Tier Updated!");
        set({
          successMessage: true,
          errorMessage: false,
        });
      } else {
        console.log("Role And Tier Updated Failed!");
        set({
          successMessage: false,
          errorMessage: true,
        });
      }
    } catch (e) {
      console.log(e);
    }
  },

  handleSaveEmployee: async (mspCustomDomain, employeeId) => {
    const { employees } = get();

    const employeeToUpdate = employees.find(
      (employee) => employee.id === employeeId
    );

    try {
      const response = await fetch(
        `${dbServiceUrl}/${mspCustomDomain}/updateConnectWiseMemberTier?id=${employeeId}&tier=${employeeToUpdate.tier}`
      );

      if (response.status === 200) {
        console.log("Tier Updated!");
        set({
          successMessage: true,
          errorMessage: false,
        });
      } else {
        console.log("Tier Updated Failed!");
        set({
          successMessage: false,
          errorMessage: true,
        });
      }
    } catch (e) {
      console.log(e);
    }
  },

  handleSaveNewEmployee: async (mspCustomDomain) => {
    const { activeEmployees, addEmployeeInputs, resetErrors } = get();
    const { firstName, lastName, phone, email, password } = addEmployeeInputs;

    resetErrors();

    if (!firstName || !lastName || !phone || !email || !password) {
      set({
        errorMessage: true,
        errors: { emptyFields: true },
      });
    }

    if (!get().errors.emptyFields) {
      try {
        const response = await fetch(
          `${dbServiceUrl}/${mspCustomDomain}/technicianUsers/add`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              firstName: firstName,
              lastName: lastName,
              phoneNumber: phone,
              email: email,
              password: password,
            }),
          }
        );

        if (response.status === 200) {
          const newEmployee = await response.json();
          console.log("Employee Added!");
          set({
            activeEmployees: [...activeEmployees, newEmployee],
            successMessage: true,
            errorMessage: false,
          });
          resetErrors();
        } else if (response.status === 400) {
          set({ errors: { uniqueEmail: true } });
        } else {
          console.log("Employee Addition Failed!");
          set({
            successMessage: false,
            errorMessage: true,
          });
        }
      } catch (e) {
        console.log(e);
      }
    }
  },

  clearEmployees: () => {
    set({
      employees: null,
      activeEmployees: null,

      employeesTierOptions: ["Tier1", "Tier2", "Tier3", "NoTier"],
      employeesRoleOptions: null,

      currentView: "Active",

      successMessage: false,
      errorMessage: false,

      addEmployeeInputs: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
      },

      addEmployee: false,
    });
  },
}));

export default useEmployeesStore;
