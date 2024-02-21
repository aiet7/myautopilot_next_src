import { handleGetTech } from "@/utils/api/serverProps";
import { create } from "zustand";
import useMspStore from "../auth/msp/mspStore";
import useLocalStorageStore from "../localstorage/localStorageStore";
import useCookiesStore from "../cookies/cookiesStore";
import useTicketConversationsStore from "../interaction/conversations/ticketConversationsStore";
import useEngineerStore from "../assistant/sections/iternal/engineer/engineerStore";
import useTicketsStore from "../interaction/tickets/ticketsStore";
import useConversationStore from "../interaction/conversations/conversationsStore";
import useDocConversationsStore from "../interaction/conversations/docConversationsStore";
import useFormsStore from "../interaction/forms/formsStore";
import useManageStore from "../admin/control/integrations/PSA/manageStore";
import useIntegrationsStore from "../admin/control/integrations/integrationsStore";
import useEmployeesStore from "../admin/control/employees/employeesStore";
import useCompaniesStore from "../admin/control/companies/companiesStore";
import useRolesStore from "../admin/control/roles/rolesStore";

const useTechStore = create((set, get) => ({
  tech: null,

  // initializeTech: async (msp, id) => {
  //   const { getUser, saveUser } = useLocalStorageStore.getState();

  //   const storedTech = getUser();

  //   if (storedTech && storedTech.id === id) {
  //     set({ tech: storedTech });
  //   } else if (msp && id) {
  //     const initialTech = await handleGetTech(msp, id);
  //     set({
  //       tech: initialTech,
  //     });
  //     saveUser(initialTech);
  //   }
  // },

  initializeTech: async (msp, id) => {
    const { getUser, saveUser } = useLocalStorageStore.getState();
    const { initializeMSPTickets } = useTicketsStore.getState();

    let techData = null;

    const storedTech = getUser();

    if (storedTech && storedTech.id === id) {
      techData = storedTech;
    } else if (msp && id) {
      const fetchedTech = await handleGetTech(msp, id);
      if (fetchedTech) {
        saveUser(fetchedTech);
        techData = fetchedTech;
      }
    }

    if (techData) {
      set({ tech: techData });
      await initializeMSPTickets();
    } else {
      console.error("Failed to initialize tech information.");
    }
  },

  handleLogout: async (navigator) => {
    const { clearMSPCredentials } = useMspStore.getState();
    const { clearStorage } = useLocalStorageStore.getState();
    const { clearCookies } = useCookiesStore.getState();
    const { clearTicketConversation } = useTicketConversationsStore.getState();
    const { clearEngineer } = useEngineerStore.getState();
    const { clearTickets } = useTicketsStore.getState();
    const { clearConversation } = useConversationStore.getState();
    const { clearDocConversation } = useDocConversationsStore.getState();
    const { clearTicketForms } = useFormsStore.getState();
    const { clearManage } = useManageStore.getState();
    const { clearIntegration } = useIntegrationsStore.getState();
    const { clearEmployees } = useEmployeesStore.getState();
    const { clearCompanies } = useCompaniesStore.getState();
    const { clearRoles } = useRolesStore.getState();

    await clearTickets();

    set({ tech: null });

    clearMSPCredentials();
    clearStorage();
    clearCookies();
    clearTicketConversation();
    clearDocConversation();
    clearConversation();
    clearEngineer();
    clearTicketForms();
    clearManage();
    clearIntegration();
    clearEmployees();
    clearCompanies();
    clearRoles();

    navigator("/auth/login");
  },
}));

export default useTechStore;
