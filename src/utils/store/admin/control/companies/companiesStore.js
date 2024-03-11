import {
  handleGetManageDBClients,
  handleGetRoles,
} from "@/utils/api/serverProps";
import useUserStore from "@/utils/store/user/userStore";
import { create } from "zustand";

const dbServiceUrl = process.env.NEXT_PUBLIC_DB_SERVICE_URL;
const connectWiseServiceUrl = process.env.NEXT_PUBLIC_CONNECTWISE_SERVICE_URL;

const useCompaniesStore = create((set, get) => ({
  companies: null,
  companyInactiveEmployees: null,
  companyActiveEmployees: null,
  companyAllTickets: null,
  companyEmployeeTickets: null,
  selectedCompany: null,
  selectedCompanyDbId: null,
  selectedEmployee: null,
  companyEmployeeRoleOptions: null,

  currentView: "Companies",
  currentEmployeeView: "Active",
  addEmployee: false,

  successMessage: false,
  errorMessage: false,

  initializeCompanies: async () => {
    const userStore = useUserStore.getState();
    set({ companies: null });

    if (userStore.user) {
      try {
        const [dbClients, newRoles] = await Promise.all([
          handleGetManageDBClients(userStore.user.mspCustomDomain),
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
    const { companyInactiveEmployees } = get();
    const updatedCompanyEmployees = companyInactiveEmployees.map((employee) => {
      if (employee.id === id) {
        return { ...employee, [field]: value };
      }
      return employee;
    });
    set({
      companyInactiveEmployees: updatedCompanyEmployees,
    });
  },

  setCurrentView: (view) => {
    set({ currentView: view });
  },

  setAddEmployee: (add) => set({ addEmployee: add }),

  handleViewCompanyEmployees: async (
    mspCustomDomain,
    companyId,
    companyName,
    connectWiseClientsAutopilotDbId
  ) => {
    try {
      const activeEmployeesPromise = fetch(
        `${dbServiceUrl}/${mspCustomDomain}/clientUsersOfEachClient?clientId=${companyId}`
      );
      const inactiveEmployeesPromise = fetch(
        `${dbServiceUrl}/${mspCustomDomain}/connectWiseContacts`
      );

      const [activeResponse, inactiveResponse] = await Promise.all([
        activeEmployeesPromise,
        inactiveEmployeesPromise,
      ]);

      if (activeResponse.status === 200) {
        const details = await activeResponse.json();
        set({
          companyActiveEmployees: details,
          selectedCompany: companyName,
          selectedCompanyDbId: connectWiseClientsAutopilotDbId,
          currentView: "CompanyEmployees",
        });
      }

      if (inactiveResponse.status === 200) {
        const details = await inactiveResponse.json();
        set({
          companyInactiveEmployees: details,
        });
      }
    } catch (e) {
      console.log(e);
    }
  },

  handleAddCompanyEmployee: async (mspCustomDomain) => {
    try {
      const response = await fetch(
        `${connectWiseServiceUrl}/getCommunicationTypes?mspCustomDomain=${mspCustomDomain}`
      );

      if (response.status === 200) {
        const communicationTypes = await response.json();
        console.log(communicationTypes);
        set({
          addEmployee: true,
        });
      }
    } catch (e) {
      console.log(e);
    }
  },

  handleViewCompanyAllTickets: async () => {
    const { selectedCompanyDbId } = get();
    try {
      const response = await fetch(
        `${dbServiceUrl}/supportTickets/byClientsAutopilotDbid?clientsAutopilotDbid=${selectedCompanyDbId}`
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
    const { companyInactiveEmployees } = get();

    const companyEmployeeToUpdate = companyInactiveEmployees.find(
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
      companyInactiveEmployees: null,
      companyActiveEmployees: null,
      companyAllTickets: null,
      companyEmployeeTickets: null,
      selectedCompany: null,
      selectedCompanyDbId: null,
      selectedEmployee: null,
      companyEmployeeRoleOptions: null,

      currentView: "Companies",
      currentEmployeeView: "Active",

      successMessage: false,
      errorMessage: false,
    });
  },
}));

export default useCompaniesStore;
