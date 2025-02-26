import {} from "@/utils/api/serverProps";
import useUserStore from "@/utils/store/user/userStore";
import { create } from "zustand";
import {
  handleGetPsaDBClientContactsActive,
  handleGetPsaDBClientContactsPSA,
} from "@/utils/api/serverProps";

const dbServiceUrl = process.env.NEXT_PUBLIC_DB_SERVICE_URL;
const connectWiseServiceUrl = process.env.NEXT_PUBLIC_CONNECTWISE_SERVICE_URL;

const useContactsStore = create((set, get) => ({
  activeContacts: null,
  psaContacts: null,

  contactTickets: null,
  contactAllTickets: null,

  currentView: "Contacts",
  currentContactView: "Active",

  selectedContact: null,

  addContact: false,

  addContactInputs: {
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

  setCurrentView: (view) => {
    set({ currentView: view });
  },

  setCurrentContactView: (view) => set({ currentContactView: view }),

  setAddContact: (add) =>
    set({ addContact: add, successMessage: false, errorMessage: false }),

  setNewContactInputs: (name, value) => {
    set((state) => ({
      addContactInputs: {
        ...state.addContactInputs,
        [name]: value,
      },
    }));
  },

  initializeActiveContacts: async () => {
    const userStore = useUserStore.getState();
    set({ contacts: null });

    if (userStore.user) {
      try {
        const activeContactsPromise = handleGetPsaDBClientContactsActive(
          userStore.user.mspCustomDomain,
          userStore.user.clientsAutopilotDbid
        );
        const psaContactsPromise = handleGetPsaDBClientContactsPSA(
          userStore.user.mspCustomDomain,
          userStore.user.psaCompanyId
        );

        const [activeResponse, psaResponse] = await Promise.all([
          activeContactsPromise,
          psaContactsPromise,
        ]);

        if (activeResponse) {
          set({
            activeContacts: activeResponse,
            currentView: "Contacts",
          });
        }

        if (psaResponse) {
          set({
            psaContacts: psaResponse,
          });
        }
      } catch (e) {
        console.log(e);
      }
    }
  },

  handleViewContactAllTickets: async (clientId) => {
    try {
      const response = await fetch(
        `${dbServiceUrl}/supportTickets/byClientsAutopilotDbid?clientsAutopilotDbid=${clientId}`
      );

      if (response.status === 200) {
        const allTickets = await response.json();
        set({
          contactAllTickets: allTickets,
          currentView: "ContactAllTickets",
        });
      } else {
        console.log("Viewing All Tickets Failed!");
        set({
          currentView: "Contacts",
        });
      }
    } catch (e) {
      console.log(e);
    }
  },

  handleViewContactTickets: async (clientId, firstName, lastName) => {
    try {
      const response = await fetch(
        `${dbServiceUrl}/supportTickets/byClientsUserId?clientsUserId=${clientId}`
      );
      if (response.status === 200) {
        const contactTickets = await response.json();
        set({
          contactTickets: contactTickets,
          selectedContact: firstName + " " + lastName,
          currentView: "ContactTickets",
        });
      } else {
        console.log("Viewing Contact Tickets Failed!");
        set({
          currentView: "Contacts",
        });
      }
    } catch (e) {
      console.log(e);
    }
  },

  handleViewContactsForm: async (mspCustomDomain) => {
    try {
      const response = await fetch(
        `${connectWiseServiceUrl}/getCommunicationTypes?mspCustomDomain=${mspCustomDomain}`
      );

      if (response.status === 200) {
        const communicationTypes = await response.json();

        set({
          addContact: true,
          emailTypes: communicationTypes,
          phoneTypes: communicationTypes,
        });
      }
    } catch (e) {
      console.log(e);
    }
  },

  handleSaveNewContact: async (mspCustomDomain, clientId) => {
    const { psaContacts, addContactInputs } = get();

    try {
      const response = await fetch(
        `${connectWiseServiceUrl}/addConnectWiseContact?mspCustomDomain=${mspCustomDomain}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName: addContactInputs.firstName,
            lastName: addContactInputs.lastName,
            email: addContactInputs.email,
            phone: addContactInputs.phone,
            companyId: clientId,
            emailTypeId: addContactInputs.emailTypeId,
            phoneTypeId: addContactInputs.phoneTypeId,
          }),
        }
      );

      if (response.status === 200) {
        const newContact = await response.json();
        console.log("CONTACT ADDED!");
        set({
          psaContacts: [...psaContacts, newContact],
          successMessage: true,
          errorMessage: false,
        });
      } else {
        console.log("CONTACT ADD FAILED!");
        set({
          successMessage: false,
          errorMessage: true,
        });
      }
    } catch (e) {
      console.log(e);
    }
  },

  clearContacts: () => {
    set({
      activeContacts: null,
      psaContacts: null,

      contactTickets: null,
      contactAllTickets: null,

      currentView: "Contacts",
      currentContactView: "Active",

      selectedContact: null,

      addContact: false,

      addContactInputs: {
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

export default useContactsStore;
