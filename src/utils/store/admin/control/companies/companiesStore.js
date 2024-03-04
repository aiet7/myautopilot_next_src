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
  companyDetails: null,
  selectedCompany: null,
  companyEmployeeRoleOptions: null,

  viewDetails: false,

  successMessage: false,
  errorMessage: false,

  initializeCompanies: async () => {
    const userStore = useUserStore.getState();
    set({ companies: null });

    if (userStore.user) {
      // const newCompanies = await handleGetManageDBClients(
      //   userStore.user.mspCustomDomain
      // );
      // set({ companies: newCompanies });
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

  setSelectedCompanyEmployee: (id, field, value) => {
    const { companyDetails } = get();
    const updatedCompanyEmployees = companyDetails.map((employee) => {
      if (employee.id === id) {
        return { ...employee, [field]: value };
      }
      return employee;
    });
    set({
      companyDetails: updatedCompanyEmployees,
    });
  },

  setViewDetails: (view) => {
    set({ viewDetails: view, companyDetails: null });
  },

  handleViewDetails: async (mspCustomDomain, companyId, companyName) => {
    try {
      const response = await fetch(
        `${dbServiceUrl}/${mspCustomDomain}/clientUsersOfEachClient?clientId=${companyId}`
      );

      if (response.status === 200) {
        const details = await response.json();
        console.log("Viewing Details!");
        set({
          companyDetails: details,
          selectedCompany: companyName,
          viewDetails: true,
        });
      } else {
        console.log("Viewing Details Failed!");
        set({
          viewDetails: false,
        });
      }
    } catch (e) {
      console.log(e);
    }
  },

  handleSaveCompanyEmployee: async (mspCustomDomain, companyEmployeeId) => {
    const { companyDetails } = get();

    const companyEmployeeToUpdate = companyDetails.find(
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
      companyDetails: null,
      employeesRoleOptions: null,
      selectedCompany: null,
      viewDetails: false,
      successMessage: false,
      errorMessage: false,
    });
  },
}));

export default useCompaniesStore;
