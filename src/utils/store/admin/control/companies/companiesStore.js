import { handleGetPsaDBClients, handleGetRoles } from "@/utils/api/serverProps";
import useUserStore from "@/utils/store/user/userStore";
import { create } from "zustand";

const dbServiceUrl = process.env.NEXT_PUBLIC_DB_SERVICE_URL;
const connectWiseServiceUrl = process.env.NEXT_PUBLIC_CONNECTWISE_SERVICE_URL;

const useCompaniesStore = create((set, get) => ({
  companies: null,
  companyPSAEmployees: null,
  companyActiveEmployees: null,
  companyAllTickets: null,
  companyEmployeeTickets: null,
  selectedCompany: null,
  selectedCompanyDbId: null,
  selectedCompanyId: null,
  selectedEmployee: null,
  companyEmployeeRoleOptions: null,

  currentView: "Companies",
  currentEmployeeView: "Active",

  addEmployee: false,
  addEmployeeInputs: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",

    companyId: "",
    emailTypeId: "",
    phoneTypeId: "",
  },

  emailTypes: null,
  phoneTypes: null,

  successMessage: false,
  errorMessage: false,

  initializeCompanies: async () => {
    const userStore = useUserStore.getState();
    set({
      companies: null,
      companyActiveEmployees: null,
      companyPSAEmployees: null,
    });

    if (userStore.user) {
      try {
        const [dbClients, newRoles] = await Promise.all([
          handleGetPsaDBClients(userStore.user.mspCustomDomain),
          handleGetRoles(userStore.user.mspCustomDomain),
        ]);
        set({
          companies: dbClients,
          companyEmployeeRoleOptions: newRoles,
        });
      } catch (e) {
        console.log(e);
      }
    }
  },

  setCurrentEmployeeView: (view) => set({ currentEmployeeView: view }),

  setSelectedCompanyEmployee: (id, field, value) => {
    const { companyActiveEmployees } = get();
    const updatedCompanyEmployees = companyActiveEmployees.map((employee) => {
      if (employee.id === id) {
        return { ...employee, [field]: value };
      }
      return employee;
    });
    set({
      companyActiveEmployees: updatedCompanyEmployees,
    });
  },

  setCurrentView: (view) => {
    set({ currentView: view });
  },

  setAddEmployee: (add) =>
    set({ addEmployee: add, successMessage: false, errorMessage: false }),

  setNewEmployeeInputs: (name, value) => {
    set((state) => ({
      addEmployeeInputs: {
        ...state.addEmployeeInputs,
        [name]: value,
      },
    }));
  },

  handleViewCompanyEmployees: async (
    mspCustomDomain,
    companyId,
    companyName,
    psaClientsAutopilotDbId,
    psaCompanyId
  ) => {
    try {
      const activeEmployeesPromise = fetch(
        `${dbServiceUrl}/${mspCustomDomain}/clientUsersOfEachClient?clientId=${companyId}`
      );
      const psaEmployeesPromise = fetch(
        `${dbServiceUrl}/${mspCustomDomain}/psaContactsByClientId?psaCompanyId=${psaCompanyId}`
      );

      const [activeResponse, psaResponse] = await Promise.all([
        activeEmployeesPromise,
        psaEmployeesPromise,
      ]);

      if (activeResponse.status === 200) {
        const details = await activeResponse.json();
        set({
          companyActiveEmployees: details,
          selectedCompany: companyName,
          selectedCompanyDbId: psaClientsAutopilotDbId,
          selectedCompanyId: psaCompanyId,
          currentView: "CompanyEmployees",
        });
      }

      if (psaResponse.status === 200) {
        const details = await psaResponse.json();
        set({
          companyPSAEmployees: details,
        });
      }
    } catch (e) {
      console.log(e);
    }
  },

  handleViewCompanyEmployeeForm: async (mspCustomDomain) => {
    try {
      const response = await fetch(
        `${connectWiseServiceUrl}/getCommunicationTypes?mspCustomDomain=${mspCustomDomain}`
      );

      if (response.status === 200) {
        const communicationTypes = await response.json();

        set({
          addEmployee: true,
          emailTypes: communicationTypes,
          phoneTypes: communicationTypes,
        });
      }
    } catch (e) {
      console.log(e);
    }
  },

  handleSaveNewCompanyEmployee: async (mspCustomDomain) => {
    const { companyPSAEmployees, addEmployeeInputs, selectedCompanyId } = get();

    try {
      const response = await fetch(
        `${connectWiseServiceUrl}/addConnectWiseContact?mspCustomDomain=${mspCustomDomain}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName: addEmployeeInputs.firstName,
            lastName: addEmployeeInputs.lastName,
            email: addEmployeeInputs.email,
            phone: addEmployeeInputs.phone,
            companyId: selectedCompanyId,
            emailTypeId: addEmployeeInputs.emailTypeId,
            phoneTypeId: addEmployeeInputs.phoneTypeId,
          }),
        }
      );

      if (response.status === 200) {
        const newCompanyEmployee = await response.json();
        console.log("EMPLOYEE ADDED!");
        set({
          companyPSAEmployees: [...companyPSAEmployees, newCompanyEmployee],
          successMessage: true,
          errorMessage: false,
        });
      } else {
        console.log("EMPLOYEE ADD FAILED!");
        set({
          successMessage: false,
          errorMessage: true,
        });
      }
    } catch (e) {
      console.log(e);
    }
  },

  handleViewCompanyAllTickets: async (mspCustomDomain) => {
    try {
      const response = await fetch(
        `${dbServiceUrl}/supportTickets/byMspCustomDomain?mspCustomDomain=${mspCustomDomain}`
      );

      if (response.status === 200) {
        const allTickets = await response.json();
        set({
          companyAllTickets: allTickets,
          currentView: "CompanyAllTickets",
        });
      } else {
        console.log("Viewing All Tickets Failed!");
        set({
          currentView: "CompanyEmployees",
        });
      }
    } catch (e) {
      console.log(e);
    }
  },

  handleViewCompanyEmployeeTickets: async (clientId, firstName, lastName) => {
    try {
      const response = await fetch(
        `${dbServiceUrl}/supportTickets/byClientsUserId?clientsUserId=${clientId}`
      );
      if (response.status === 200) {
        const employeeTickets = await response.json();
        set({
          companyEmployeeTickets: employeeTickets,
          selectedEmployee: firstName + " " + lastName,
          currentView: "CompanyEmployeeTickets",
        });
      } else {
        console.log("Viewing Employee Tickets Failed!");
        set({
          currentView: "CompanyEmployees",
        });
      }
    } catch (e) {
      console.log(e);
    }
  },

  handleSaveCompanyEmployee: async (mspCustomDomain, companyEmployeeId) => {
    const { companyActiveEmployees } = get();

    const companyEmployeeToUpdate = companyActiveEmployees.find(
      (employee) => employee.id === companyEmployeeId
    );

    try {
      const response = await fetch(
        `${dbServiceUrl}/${mspCustomDomain}/clientUsers/edit`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: companyEmployeeToUpdate.email,
            roleId: companyEmployeeToUpdate.roleId,
          }),
        }
      );

      if (response.status === 200) {
        console.log("Role Updated!");
        set({
          successMessage: true,
          errorMessage: false,
        });
      } else {
        console.log("Role Updated Failed");
        set({
          successMessage: false,
          errorMessage: true,
        });
      }
    } catch (e) {
      console.log(e);
    }
  },

  clearCompanies: () => {
    set({
      companies: null,
      companyPSAEmployees: null,
      companyActiveEmployees: null,
      companyAllTickets: null,
      companyEmployeeTickets: null,
      selectedCompany: null,
      selectedCompanyDbId: null,
      selectedCompanyId: null,
      selectedEmployee: null,
      companyEmployeeRoleOptions: null,

      currentView: "Companies",
      currentEmployeeView: "Active",

      addEmployee: false,
      addEmployeeInputs: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",

        companyId: "",
        emailTypeId: "",
        phoneTypeId: "",
      },

      emailTypes: null,
      phoneTypes: null,

      successMessage: false,
      errorMessage: false,
    });
  },
}));

export default useCompaniesStore;
