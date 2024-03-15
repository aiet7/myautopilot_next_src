import { create } from "zustand";
import { ACTIONS, STATUS, EVENTS } from "react-joyride";

const useTooltipStore = create((set, get) => ({
  run: true,
  stepIndex: 0,

  steps: [],
  initialSteps: [
    {
      target: "#manage-clientId",
      content: (
        <div className="flex flex-col gap-4">
          <p>
            Here you can input your Client ID that you recieved from Connectwise
            Manage portal.
          </p>
          <a
            className="text-sm text-purple-700"
            target="_blank"
            rel="noopener noreferrer"
            href="https://help-desk-migration.com/help/how-to-generate-connectwise-client-id/"
          >
            How to get your Client ID
          </a>
        </div>
      ),
      disableBeacon: true,
      title: "Client ID",
    },
    {
      target: "#manage-publicKey",
      content: (
        <div className="flex flex-col gap-4">
          <p>
            Here you can input your Public Key that you received from
            Connectwise Manage portal.
          </p>
          <a
            className="text-sm text-purple-700"
            target="_blank"
            rel="noopener noreferrer"
            href="https://help-desk-migration.com/help/how-to-generate-connectwise-api-keys/"
          >
            How to get your Public Key
          </a>
        </div>
      ),
      title: "Public Key",
    },
    {
      target: "#manage-companyId",
      content: (
        <div className="flex flex-col gap-4">
          <p>
            Here you can input your Company Id that you received from
            Connectwise Manage portal.
          </p>
          <a
            className="text-sm text-purple-700"
            target="_blank"
            rel="noopener noreferrer"
            href="https://help-desk-migration.com/help/find-company-id-connectwise/"
          >
            How to get your Company ID
          </a>
        </div>
      ),
      title: "Company ID",
    },
    {
      target: "#manage-privateKey",
      content: (
        <div className="flex flex-col gap-4">
          <p>
            Here you can input your Private Key that you recieved from
            Connectwise Manage portal.
          </p>
          <a
            className="text-sm text-purple-700"
            target="_blank"
            rel="noopener noreferrer"
            href="https://help-desk-migration.com/help/find-company-id-connectwise/"
          >
            How to get your Private Key
          </a>
        </div>
      ),
      title: "Private Key",
    },
    {
      target: "#manage-saveKeys",
      content:
        "Once your have entered all the top inputs, you can save your keys for future authentication for Manage.",
      title: "Save Keys",
    },
    {
      target: "#manage-authenticate",
      content:
        "Once you have successfully saved your keys, click on authenticate to see if your keys are eligable for our Manage backend configurations.",
      title: "Authenticate",
    },
  ],

  authenticatedSteps: [
    {
      target: "#manageAuthenticated-configuration",
      content:
        "Here will have all of your configurations to start onboarding your technicians, clients, contacts and your ticketing scheduling and dispatching.",
      disableBeacon: true,
      title: "Configuration",
    },
    {
      target: "#manageAuthenticated-disconnect",
      content:
        "Here you can disconnect your Manage integration.  However, if you do the ticketing automation and creation will be disconnected as well.",
      disableBeacon: true,
      title: "Disconnect",
    },
  ],

  initializeSteps: async (steps) => {
    set({ steps: steps, run: true, stepIndex: 0 });
  },

  setRun: (run) => set(() => ({ run })),
  setStepIndex: (index) => set(() => ({ stepIndex: index })),

  handleJoyrideCallback: (data) => {
    const { action, index, status, type } = data;
    const { stepIndex } = get();
    if (status === "finished" || status === "skipped" || action === "close") {
      set({ run: false });
    } else if (
      index === stepIndex &&
      (type === EVENTS.STEP_AFTER || type === EVENTS.TARGET_NOT_FOUND)
    ) {
      set({ stepIndex: stepIndex + (action === ACTIONS.PREV ? -1 : 1) });
    }
  },
}));

export default useTooltipStore;
