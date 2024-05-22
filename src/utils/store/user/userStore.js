import { handleGetTech, handleGetClient } from "@/utils/api/serverProps";
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
import useInteractionStore from "../interaction/interactionsStore";
import useInitializeAppStore from "../init/initializeAppStore";
import useAssistantStore from "../assistant/assistantStore";
import useBoardStore from "../admin/control/board/boardStore";
import useAdminStore from "../admin/adminStore";
import useContactsStore from "../admin/control/contacts/contactsStore";
import useQueueStore from "../interaction/queue/useQueueStore";

const useUserStore = create((set, get) => ({
  user: null,

  initializeUser: async (msp, id) => {
    const { getUser, saveUser } = useLocalStorageStore.getState();
    const { initializeMSPTickets, initializeClientTickets } =
      useTicketsStore.getState();
    const { initializeRoles } = useRolesStore.getState();

    let userData = null;
    let userType = localStorage.getItem("lastActiveUserType");

    const storedUser = getUser();

    if (storedUser && storedUser.id === id) {
      userData = storedUser;
    } else if (msp && id) {
      const fetchUser = userType === "tech" ? handleGetTech : handleGetClient;
      const fetchedUser = await fetchUser(msp, id);
      if (fetchedUser) {
        saveUser(fetchedUser);
        userData = fetchedUser;
        const rolesData = await initializeRoles();
        const userPermissions = rolesData.find(
          (role) => role.id === userData.roleId
        );
        if (userPermissions) {
          userData.permissions = userPermissions.permissions;
        }
      }
    }

    if (userData) {
      set({ user: userData });
      if (userType === "tech") {
        await initializeMSPTickets();
      } else if (userType === "client") {
        await initializeClientTickets();
      }
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
    const { clearInteraction } = useInteractionStore.getState();
    const { clearInit } = useInitializeAppStore.getState();
    const { clearAssistant } = useAssistantStore.getState();
    const { clearBoard } = useBoardStore.getState();
    const { clearAdmin } = useAdminStore.getState();
    const { clearContacts } = useContactsStore.getState();
    const { clearQueue } = useQueueStore.getState();

    await clearTickets();

    set({ user: null });

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
    clearInteraction();
    clearInit();
    clearAssistant();
    clearBoard();
    clearAdmin();
    clearContacts();
    clearQueue();

    navigator("/auth/login");
  },
}));

export default useUserStore;
