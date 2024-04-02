import { create } from "zustand";
import useIntegrationsStore from "../integrationsStore";

const dbServiceUrl = process.env.NEXT_PUBLIC_DB_SERVICE_URL;
const connectWiseServiceUrl = process.env.NEXT_PUBLIC_CONNECTWISE_SERVICE_URL;
const emailConnectorUrl = process.env.NEXT_PUBLIC_EMAILCONNECTOR_URL;
const workflowServiceUrl = process.env.NEXT_PUBLIC_WORKFLOW_SERVICE_URL;

const useSuiteStore = create((set, get) => ({
  officeDomains: null,
  officeLicenses: null,
  officeUsers: null,

  activeConfig: false,

  integrationInputs: {
    email: null,
    google: null,
    microsoft: null,
    tenantId: "",
    secretId: "",
    secretValue: "",
  },

  successOfficeIntegration: false,
  successOfficeDisconnect: false,

  errorOfficeIntegration: false,
  errorOfficeDisconnect: false,

  setActiveConfig: async (config, mspCustomDomain, clientId) => {
    const { handleGetOfficeUsers } = get();
    await handleGetOfficeUsers(mspCustomDomain, clientId);
    set({
      activeConfig: config,
    });
  },

  setCloseConfiguration: () => {
    set({
      officeDomains: null,
      officeLicenses: null,
      officeUsers: null,
      activeConfig: false,
      successOfficeIntegration: false,
      successOfficeDisconnect: false,

      errorOfficeIntegration: false,
      errorOfficeDisconnect: false,
    });
  },

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
        set({
          successOfficeIntegration: false,
          successOfficeDisconnect: false,

          errorOfficeIntegration: false,
          errorOfficeDisconnect: false,
        });
        console.log("OFFICE KEYS SAVED");
      } else {
        set({
          successOfficeIntegration: false,
          successOfficeDisconnect: false,

          errorOfficeIntegration: false,
          errorOfficeDisconnect: false,
        });
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
        set({
          successOfficeIntegration: false,
          successOfficeDisconnect: false,

          errorOfficeIntegration: false,
          errorOfficeDisconnect: false,
        });

        console.log("OFFICE KEYS REMOVED");
      } else {
        set({
          successOfficeIntegration: false,
          successOfficeDisconnect: false,

          errorOfficeIntegration: false,
          errorOfficeDisconnect: false,
        });
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
        `${workflowServiceUrl}/microsoftGraph/allUsers?mspCustomDomain=${mspCustomDomain}&clientId=${clientId}`
      );

      if (response.status === 200) {
        const users = await response.json();
        set({
          officeUsers: users,
        });

        const updatedResponse = await fetch(
          `${dbServiceUrl}/${mspCustomDomain}/integrations/updateMicrosoft?status=${true}&clientId=${clientId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (updatedResponse.status === 200) {
          const updatedIntegrations = await updatedResponse.json();
          handleUpdateClientIntegrations(updatedIntegrations);
          set({
            successOfficeIntegration: true,
            successOfficeDisconnect: false,
            errorOfficeIntegration: false,
            errorOfficeDisconnect: false,
          });
        } else {
          set({
            officeUsers: null,
            successOfficeIntegration: false,
            successOfficeDisconnect: false,

            errorOfficeIntegration: true,
            errorOfficeDisconnect: false,
          });
        }
      } else {
        set({
          officeUsers: null,
          successOfficeIntegration: false,
          successOfficeDisconnect: false,

          errorOfficeIntegration: true,
          errorOfficeDisconnect: false,
        });
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
        const updatedResponse = await fetch(
          `${dbServiceUrl}/${mspCustomDomain}/integrations/updateMicrosoft?status=${false}&clientId=${clientId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const updatedIntegrations = await updatedResponse.json();
        handleUpdateClientIntegrations(updatedIntegrations);
        set({
          officeDomains: null,
          successOfficeDisconnect: true,
          successOfficeIntegration: false,

          errorOfficeIntegration: false,
          errorOfficeDisconnect: false,
        });
        console.log("OFFICE INTEGRATION REMOVED");
      } else {
        console.log("OFFICE INTEGRATION REMOVAL FAILED");
      }
    } catch (e) {
      console.log(e);
    }
  },

  handleGetOfficeUsers: async (mspCustomDomain, clientId) => {
    try {
      const response = await fetch(
        `${workflowServiceUrl}/microsoftGraph/allUsers?mspCustomDomain=${mspCustomDomain}&clientId=${clientId}`
      );

      if (response.status === 200) {
        const users = await response.json();
        set({
          officeUsers: users,
        });
      }
    } catch (e) {
      console.log(e);
    }
  },

  clearOffice: () => {
    set({
      officeDomains: null,
      officeLicenses: null,
      officeUsers: null,

      activeConfig: false,

      integrationInputs: {
        email: null,
        google: null,
        microsoft: null,
        tenantId: "",
        secretId: "",
        secretValue: "",
      },

      successOfficeIntegration: false,
      successOfficeDisconnect: false,

      errorOfficeIntegration: false,
      errorOfficeDisconnect: false,
    });
  },
}));

export default useSuiteStore;
