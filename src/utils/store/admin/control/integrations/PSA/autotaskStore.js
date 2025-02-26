import { create } from "zustand";
import useIntegrationsStore from "../integrationsStore";

const dbServiceUrl = process.env.NEXT_PUBLIC_DB_SERVICE_URL;
const psaServiceUrl = process.env.NEXT_PUBLIC_PSA_SERVICE_URL;
const emailConnectorUrl = process.env.NEXT_PUBLIC_EMAILCONNECTOR_URL;

const useAutotaskStore = create((set, get) => ({
  successAutotaskIntegration: false,
  successAutotaskDisconnect: false,

  errorAutotaskIntegration: false,
  errorAutotaskDisconnect: false,

  activeConfig: false,

  integrationInputs: {
    autotaskIntegrator: false,
    apiIntegrationCode: "C5S5QARJOUFS2GQJSJFTIDDQ5A",
    microsoftGraphIntegrator: false,
    emailIntegrator: false,
    userName: "",
    secret: "",
    emailConnectorGmail: "",
    emailConnectorAppPassword: "",
  },

  setActiveConfig: async (config, mspCustomDomain) => {
    set({
      activeConfig: config,
    });
  },

  setCloseConfiguration: () => {
    set({
      successAutotaskIntegration: false,
      successAutotaskDisconnect: false,

      errorAutotaskIntegration: false,
      errorAutotaskDisconnect: false,

      activeConfig: false,
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

  handleSaveAutotaskKeys: async (mspCustomDomain) => {
    const { integrationInputs } = get();
    const { handleUpdateMSPIntegrations } = useIntegrationsStore.getState();

    const {
      autotaskIntegrator,
      microsoftGraphIntegrator,
      emailIntegrator,
      ...autotaskIntegration
    } = integrationInputs;

    try {
      const response = await fetch(
        `${dbServiceUrl}/${mspCustomDomain}/integrations/update`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            mspCustomDomain: mspCustomDomain,
            autotaskIntegration: autotaskIntegration,
          }),
        }
      );

      if (response.status === 200) {
        const updatedIntegrations = await response.json();
        handleUpdateMSPIntegrations(updatedIntegrations);
        set({
          successAutotaskIntegration: false,
          successAutotaskDisconnect: false,

          errorAutotaskIntegration: false,
          errorAutotaskDisconnect: false,
        });
        console.log("AUTOTASK KEYS SAVED");
      } else {
        set({
          successAutotaskDisconnect: false,
          successAutotaskIntegration: false,

          errorAutotaskIntegration: false,
          errorAutotaskDisconnect: false,
        });
        console.log("AUTOTASK KEYS FAILED TO SAVE");
      }
    } catch (e) {
      console.log(e);
    }
  },

  handleRemoveAutotaskKeys: async (mspCustomDomain) => {
    const { handleUpdateMSPIntegrations } = useIntegrationsStore.getState();

    try {
      const response = await fetch(
        `${dbServiceUrl}/${mspCustomDomain}/integrations/update`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            mspCustomDomain: mspCustomDomain,
            autotaskIntegration: {
              userName: "",
              secret: "",
            },
          }),
        }
      );

      if (response.status === 200) {
        const updatedIntegrations = await response.json();
        handleUpdateMSPIntegrations(updatedIntegrations);
        set({
          successAutotaskDisconnect: false,
          successAutotaskIntegration: false,

          errorAutotaskIntegration: false,
          errorAutotaskDisconnect: false,
        });

        console.log("AUTOTASK KEYS REMOVED");
      } else {
        set({
          successAutotaskDisconnect: false,
          successAutotaskIntegration: false,

          errorAutotaskIntegration: false,
          errorAutotaskDisconnect: false,
        });
        console.log("AUTOTASK KEYS FAILED TO REMOVE");
      }
    } catch (e) {
      console.log(e);
    }
  },

  handleIntegrateAutotask: async (mspCustomDomain) => {
    const { handleUpdateMSPIntegrations } = useIntegrationsStore.getState();
    try {
      const response = await fetch(
        `${psaServiceUrl}/autotask/getStatuses?mspCustomDomain=${mspCustomDomain}`
      );

      if (response.status === 200) {
        const updatedResponse = await fetch(
          `${dbServiceUrl}/${mspCustomDomain}/integrations/updateAutotaskIntegrator?status=${true}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (updatedResponse.status === 200) {
          const updatedIntegrations = await updatedResponse.json();

          handleUpdateMSPIntegrations(updatedIntegrations);

          set({
            successAutotaskIntegration: true,
            successAutotaskDisconnect: false,

            errorAutotaskIntegration: false,
            errorAutotaskDisconnect: false,
          });
        } else {
          set({
            successAutotaskIntegration: false,
            successAutotaskDisconnect: false,

            errorAutotaskIntegration: true,
            errorAutotaskDisconnect: false,
          });
        }
      } else {
        set({
          successAutotaskIntegration: false,
          successAutotaskDisconnect: false,

          errorAutotaskIntegration: true,
          errorAutotaskDisconnect: false,
        });
      }
    } catch (e) {
      console.log(e);
    }
  },

  handleDisconnectAutotask: async (mspCustomDomain) => {
    const { handleUpdateMSPIntegrations } = useIntegrationsStore.getState();

    try {
      const response = await fetch(
        `${dbServiceUrl}/${mspCustomDomain}/integrations/update`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            mspCustomDomain: mspCustomDomain,
            autotaskIntegration: {
              userName: "",
              secret: "",
            },
          }),
        }
      );

      if (response.status === 200) {
        const updatedResponse = await fetch(
          `${dbServiceUrl}/${mspCustomDomain}/integrations/updateAutotaskIntegrator?status=${false}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const updatedIntegrations = await updatedResponse.json();

        handleUpdateMSPIntegrations(updatedIntegrations);
        set({
          successAutotaskDisconnect: true,
          successAutotaskIntegration: false,

          errorAutotaskIntegration: false,
          errorAutotaskDisconnect: false,

          activeConfig: false,
        });
        console.log("AUTOTASK DISCONNECTED");
      } else {
        set({
          successAutotaskDisconnect: false,
          successAutotaskIntegration: false,

          errorAutotaskIntegration: false,
          errorAutotaskDisconnect: true,
        });
        console.log("FAILED DISCONNECTION");
      }
    } catch (e) {
      console.log(e);
    }
  },
}));

export default useAutotaskStore;
