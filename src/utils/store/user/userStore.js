import { handleGetTech, handleGetClient } from "@/utils/api/serverProps";
import { create } from "zustand";
import useMspStore from "../auth/msp/mspStore";
import useLocalStorageStore from "../localstorage/localStorageStore";
import useCookiesStore from "../cookies/cookiesStore";
import useTicketConversationsStore from "../interaction/conversations/ticketConversationsStore";
import useEngineerStore from "../assistant/sections/iternal/engineer/engineerStore";
import useTicketsStore from "../interaction/tickets/ticketsStore";
import useConversationStore from "../interaction/conversations/conversationsStore";
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
import useQueueStore from "../interaction/queue/queueStore";
import useToolsStore from "../assistant/sections/external/downloads/downloadStore";
import useUiStore from "../ui/uiStore";
import useTeamsStore from "../admin/control/teams/teamsStore";

const dbServiceUrl = process.env.NEXT_PUBLIC_DB_SERVICE_URL;
const useUserStore = create((set, get) => ({
  user: null,
  userInputs: {},
  editing: {},
  errorMessage: "",
  passwordError: "",
  userPasswords: {},

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
      set({ user: userData, userInputs: { ...userData } });
      if (userType === "tech") {
        await initializeMSPTickets();
      } else if (userType === "client") {
        await initializeClientTickets();
      }
    } else {
      console.error("Failed to initialize tech information.");
    }
  },

  handleStartEdit: (field) => {
    const { editing } = get();
    set({ editing: { ...editing, [field]: true } });
  },

  handleEditOnChange: (field, value) => {
    const { userInputs } = get();

    if (field.startsWith("companyAddress.")) {
      const addressField = field.split(".")[1];
      set({
        userInputs: {
          ...userInputs,
          companyAddress: {
            ...userInputs.companyAddress,
            [addressField]: value,
          },
        },
      });
    } else {
      set({ userInputs: { ...userInputs, [field]: value } });
    }
  },

  handlePasswordChange: (field, value) => {
    const { userPasswords } = get();
    set({ userPasswords: { ...userPasswords, [field]: value } });
  },

  handleResetPassword: async () => {},

  handleSaveChanges: async (field, value) => {
    const { user, userInputs, editing } = get();
    const { userType } = useMspStore.getState();
    const userTypeEndpoint =
      userType === "tech" ? "technicianUsers" : "clientUsers";

    const updatedUser = field.startsWith("companyAddress.")
      ? {
          ...user,
          companyAddress: {
            ...user.companyAddress,
            [field.split(".")[1]]: value,
          },
        }
      : { ...user, [field]: value };

    try {
      const response = await fetch(
        `${dbServiceUrl}/${user.mspCustomDomain}/${userTypeEndpoint}/edit`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUser),
        }
      );

      if (response.ok) {
        const editedUser = await response.json();
        const mergedUser = {
          ...editedUser,
          permissions: user.permissions,
        };

        set({
          user: mergedUser,
          userInputs: { ...userInputs, [field]: value },
          editing: { ...editing, [field]: false },
          errorMessage: "",
        });
        console.log(updatedUser, "User Changes Saved!");
      } else {
        const errorData = await response.json();
        set({ errorMessage: errorData.message || "Failed to save changes" });
        console.log("User Changes Failed!");
      }
    } catch (error) {
      set({ errorMessage: "An error occurred while saving changes." });
      console.error("Error in handleSaveChanges:", error);
    }
  },

  handleCancelEdit: (field) => {
    const { user, userInputs, editing } = get();
    set({ userInputs: { ...userInputs, [field]: user[field] } });
    set({ editing: { ...editing, [field]: false } });
  },

  handleLogout: async (navigator) => {
    const { clearMSPCredentials } = useMspStore.getState();
    const { clearStorage } = useLocalStorageStore.getState();
    const { clearCookies } = useCookiesStore.getState();
    const { clearTicketConversation } = useTicketConversationsStore.getState();
    const { clearEngineer } = useEngineerStore.getState();
    const { clearTickets } = useTicketsStore.getState();
    const { clearConversation } = useConversationStore.getState();
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
    const { clearTools } = useToolsStore.getState();
    const { clearUI } = useUiStore.getState();
    const { clearTeams } = useTeamsStore.getState();

    await clearTickets();

    set({
      user: null,
      userInputs: {},
      editing: {},
      errorMessage: "",
      passwordError: "",
      userPasswords: {},
    });

    clearMSPCredentials();
    clearStorage();
    clearCookies();
    clearTicketConversation();
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
    clearTools();
    clearUI();
    clearTeams();

    if (window.location.pathname.startsWith("/public/dashboard")) {
      navigator("/public");
    } else {
      navigator("/auth/login");
    }
  },
}));

export default useUserStore;
