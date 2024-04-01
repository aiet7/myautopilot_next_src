import { create } from "zustand";
import useIntegrationsStore from "../integrationsStore";

const dbServiceUrl = process.env.NEXT_PUBLIC_DB_SERVICE_URL;
const connectWiseServiceUrl = process.env.NEXT_PUBLIC_CONNECTWISE_SERVICE_URL;
const emailConnectorUrl = process.env.NEXT_PUBLIC_EMAILCONNECTOR_URL;
const workflowServiceUrl = process.env.NEXT_PUBLIC_WORKFLOW_SERVICE_URL;

const useSuiteStore = create((set, get) => ({
  integrationInputs: {
    email: null,
    google: null,
    microsoft: null,
    tenantId: "",
    secretId: "",
    secretValue: "",
  },

  officeDomains: null,
  officeLicenses: null,

  successOfficeIntegration: false,
  successOfficeDisconnect: false,

  errorOfficeIntegration: false,
  errorOfficeDisconnect: false,

  setIntegrationInputs: (type, field, value) =>
    set((prevState) =>
      type === "checkbox"
        ? {
            integrationInputs: {
              ...prevState.integrationInputs,
              [field]: !prevState.integrationInputs[field],
            },
          }
        : {
            integrationInputs: {
              ...prevState.integrationInputs,
              [field]: value,
            },
          }
    ),

  handleSaveOfficeKeys: async (mspCustomDomain, clientId) => {
    const { integrationInputs } = get();
    const { handleUpdateClientIntegrations } = useIntegrationsStore.getState();

    const { google, microsoft, email, ...microsoftGraphIntegration } =
      integrationInputs;
    try {
      const response = await fetch(
        `${dbServiceUrl}/${mspCustomDomain}/clientIntegrations/update`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            mspCustomDomain: mspCustomDomain,
            microsoftGraphIntegration: microsoftGraphIntegration,
            clientsAutopilotDbid: clientId,
          }),
        }
      );

      if (response.status === 200) {
        const updatedIntegrations = await response.json();
        handleUpdateClientIntegrations(updatedIntegrations);
        set({});
        console.log("OFFICE KEYS SAVED");
      } else {
        set({});
        console.log("OFFICE KEYS FAILED TO SAVE");
      }
    } catch (e) {
      console.log(e);
    }
  },

  handleRemoveOfficeKeys: async (mspCustomDomain, clientId) => {
    const { handleUpdateClientIntegrations } = useIntegrationsStore.getState();

    try {
      const response = await fetch(
        `${dbServiceUrl}/${mspCustomDomain}/clientIntegrations/update`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            clientsAutopilotDbid: clientId,
            mspCustomDomain: mspCustomDomain,
            microsoftGraphIntegration: {
              tenantId: "",
              secretId: "",
              secretValue: "",
            },
          }),
        }
      );

      if (response.status === 200) {
        const updatedIntegrations = await response.json();
        handleUpdateClientIntegrations(updatedIntegrations);
        set({});

        console.log("OFFICE KEYS REMOVED");
      } else {
        set({});
        console.log("OFFICE KEYS FAILED TO REMOVE");
      }
    } catch (e) {
      console.log(e);
    }
  },

  handleIntegrateOffice: async (mspCustomDomain, clientId) => {
    const { handleUpdateClientIntegrations } = useIntegrationsStore.getState();

    try {
      const response = await fetch(
        `${workflowServiceUrl}/microsoftGraph/domains?mspCustomDomain=${mspCustomDomain}&clientId=${clientId}`
      );

      if (response.status === 200) {
        const domains = await response.json();
        console.log("OFFICE INTEGRATED");
        set({
          officeDomains: domains,
        });
      } else {
        console.log("OFFICE INTEGRATION FAILED");
      }
    } catch (e) {
      console.log(e);
    }
  },

  handleDisconnectOffice: async (mspCustomDomain, clientId) => {
    const { handleUpdateClientIntegrations } = useIntegrationsStore.getState();
    try {
      const response = await fetch(
        `${dbServiceUrl}/${mspCustomDomain}/clientIntegrations/update`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            clientsAutopilotDbid: clientId,
            mspCustomDomain: mspCustomDomain,
            microsoftGraphIntegration: {
              tenantId: "",
              secretId: "",
              secretValue: "",
            },
          }),
        }
      );

      if (response.status === 200) {
        console.log("OFFICE INTEGRATION REMOVED");
        console.log(domains);
      } else {
        console.log("OFFICE INTEGRATION REMOVAL FAILED");
      }
    } catch (e) {
      console.log(e);
    }
  },
}));

export default useSuiteStore;
