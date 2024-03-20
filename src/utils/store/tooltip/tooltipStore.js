import { create } from "zustand";
import { ACTIONS, STATUS, EVENTS } from "react-joyride";
import useMspStore from "../auth/msp/mspStore";

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
      title: "Disconnect",
    },
  ],

  preSelectedBoardSteps: [
    {
      target: `#manageAuthenticated-boardStep`,
      content:
        "Here is where you will set up your board to configure your ticketing system.",
      disableBeacon: true,
      title: "Board",
    },
    {
      target: `#manageAuthenticated-chooseBoard`,
      content:
        "Here you will select your board that you would like to work with.",
      title: "Select Board",
    },
    {
      target: `#manageAuthenticated-customBoard`,
      content:
        "Here you will be able to customize your own board with a predefined template we have prepared for you.",
      title: "Custom Board",
    },
  ],

  postSelectedBoardSteps: [
    {
      target: `#manageAuthenticated-generateAiBoard`,
      content:
        "Here is where you can ask our AI to generate our board for you with predefined categories and subcategories.  This can take a few seconds to generate.",
      disableBeacon: true,
      title: "AI Board",
    },
    {
      target: `#manageAuthenticated-openStatus`,
      content:
        "Here you will either select your open statuses from Connectwise, or will create your own if none is found.",
      title: "Open Status",
    },
    {
      target: `#manageAuthenticated-closedStatus`,
      content:
        "Here you will either select your closed statuses from Connectwise, or will create your own if none is found.",
      title: "Closed Status",
    },
    {
      target: `#manageAuthenticated-category`,
      content:
        "Here you will see your categories per the board you have selected.  You can add your own category to a pre existing board.",
      title: "Category",
    },
    {
      target: `#manageAuthenticated-subcategory`,
      content:
        "Here you will see your subcategories per the board you have selected.  You can add your own subcategory to a pre existing board.",
      title: "Subcategory",
    },
    {
      target: `#manageAuthenticated-priority`,
      content: (
        <div className="flex flex-col items-start gap-2">
          <p>Here you will select your priority for each subcategory.</p>
          <ul>
            <li>Priority 1 - Critical</li>
            <li>Priority 2 - High</li>
            <li>Priority 3 - Medium</li>
            <li>Priority 4 - Low</li>
            <li>Do Not Respond</li>
          </ul>
        </div>
      ),
      title: "Priority",
    },
    {
      target: `#manageAuthenticated-severity`,
      content: (
        <div className="flex flex-col items-start gap-2">
          <p>Here you will select your severity for each subcategory.</p>
          <ul>
            <li>High</li>
            <li>Medium</li>
            <li>Low</li>
          </ul>
        </div>
      ),
      title: "Severity",
    },
    {
      target: `#manageAuthenticated-impact`,
      content: (
        <div className="flex flex-col items-start gap-2">
          <p>Here you will select your impact for each subcategory.</p>
          <ul>
            <li>High</li>
            <li>Medium</li>
            <li>Low</li>
          </ul>
        </div>
      ),
      title: "Impact",
    },
    {
      target: `#manageAuthenticated-tier`,
      content: (
        <div className="flex flex-col items-start gap-2">
          <p>Here you will select your tier for each subcategory.</p>
          <ul>
            <li>Tier1</li>
            <li>Tier2</li>
            <li>Tier3</li>
            <li>No Dispatching</li>
          </ul>
        </div>
      ),
      title: "Tier",
    },
    {
      target: `#manageAuthenticated-duration`,
      content: (
        <div className="flex flex-col items-start gap-2">
          <p>
            Here you will select your duration time to solve for each
            subcategory.
          </p>
          <ul>
            <li>15 Minutes</li>
            <li>30 Minutes</li>
            <li>45 Minutes</li>
            <li>1 Hour</li>
            <li>1 Hour 30 Minutes</li>
            <li>2 Hours 30 Minutes</li>
            <li>3 Hours 30 Minutes</li>
            <li>4 Hours</li>
          </ul>
        </div>
      ),
      title: "Duration",
    },
    {
      target: `#manageAuthenticated-saveBoard`,
      content:
        "Once you have configured your board, press here to save the board.  You can edit this board by selecting the board from the SELECT BOARD dropdown",
      title: "Save Board",
    },
    {
      target: `#manageAuthenticated-next`,
      content:
        "You can skip to the next step by pressing this button.  Remember, our steps pre determine the next step you take.  We advice to complete each step to its fullest.",
      title: "Next Step",
    },
  ],

  preCustomSelectedBoardSteps: [
    {
      target: `#manageAuthenticated-customTitle`,
      content: "Here is where you will input your custom board title.",
      disableBeacon: true,
      title: "Custom Title",
    },
    {
      target: `#manageAuthenticated-department`,
      content:
        "Here is where you will select your specific department that you would like this custom board to be saved to.",
      disableBeacon: true,
      title: "Department",
    },
    {
      target: `#manageAuthenticated-location`,
      content:
        "Here is where you will select your specific location that you would like this custom board to be saved to.",
      disableBeacon: true,
      title: "Location",
    },
    {
      target: `#manageAuthenticated-saveMetaData`,
      content:
        "Save your title, department and location and you will have our custom board template appear below.",
      disableBeacon: true,
      title: "Save Meta Data",
    },
  ],

  postCustomSelectedBoardSteps: [
    {
      target: `#manageAuthenticated-customTemplate`,
      content:
        "This is our custom board template which you can build off of. The current categories and subcategories are editable and you can implement your own categories and subcategories.  Or you can leave them and save the board with the provided default categories and subcategories",
      disableBeacon: true,
      title: "Custom Board Template",
    },
    {
      target: `#manageAuthenticated-customCategory`,
      content:
        "Here is where you can add your own category to the custom board.",
      title: "Custom Category ",
    },
    {
      target: `#manageAuthenticated-customSubcategory`,
      content:
        "Here is where you can add your own subcategory to the custom board.",
      title: "Custom Subcategory ",
    },
    {
      target: `#manageAuthenticated-customSaveCustomBoard`,
      content:
        "Once you have configured your custom board, press here to save the custom board.  You can edit this board by selecting the board from the SELECT BOARD dropdown.",
      title: "Save Custom Board",
    },
    {
      target: `#manageAuthenticated-next`,
      content:
        "You can skip to the next step by pressing this button.  Remember, our steps pre determine the next step you take.  We advice to complete each step to its fullest.",
      title: "Next Step",
    },
  ],

  technicianSteps: [
    {
      target: `#manageAuthenticated-technicianStep`,
      content:
        "Here is where you will on board your technicians from Connectwise Manage.  If you have a large amount of technicians in your Connectwise instance, please allow us some time to import them.",
      disableBeacon: true,
      title: "Technicians",
    },
    {
      target: `#manageAuthenticated-technicianTier`,
      content:
        "This is where you will assign specific tiers to the technicians you are currently on boarding.",
      title: "Technician Tiers",
    },
    {
      target: `#manageAuthenticated-technicianRole`,
      content:
        "This is where you will assign specific roles to the technicians you are currently on boarding.",
      title: "Technician Roles",
    },
    {
      target: `#manageAuthenticated-saveTechnicians`,
      content:
        "One you assigned your tiers and roles to your technicians, you can use the checkbox to on board specific technicians OR you can check all to bulk save all of the technicians.  Remember, the more you check the longer time to process the on boarding.",
      title: "Save Technicians",
    },
  ],

  clientSteps: [
    {
      target: `#manageAuthenticated-clientStep`,
      content:
        "Here is where you will on board your clients from Connectwise Manage.  If you have a large amount of clients in your Connectwise instance, please allow us some time to import them",
      disableBeacon: true,
      title: "Clients",
    },
    {
      target: `#manageAuthenticated-defaultClient`,
      content:
        "You must select the default company to be able to create any tickets.",
      title: "Default Company",
    },
    {
      target: `#manageAuthenticated-clientContactAutoSync`,
      content:
        "If you would like to skip the manual client and contact(NEXT STEP) on boarding steps, you can choose the type you would like to auto sync both from connectwise.  Remember, This process may take some time to complete.  There will be a notifaction that will notify you when the process is complete.",
      title: "Client and Contact AutoSync",
    },
    {
      target: `#manageAuthenticated-saveClients`,
      content:
        "One you assigned your default company, you can use the checkbox to on board specific clients OR you can check all to bulk save all of the clients.  Remember, the more you check the longer time to process the on boarding.  Also, the clients you have saved here will reflect the contacts you will see in the next step (Contacts)",
      title: "Save Clients",
    },
  ],

  contactSteps: [
    {
      target: `#manageAuthenticated-contactStep`,
      content:
        "Here is where you will on board your contacts from Connectwise Manage.  The contacts you will see here are based off the clients you have saved.  If you have saved a large amount of clients, each contact per client will have to be imported.  Please allow us some time to import them",
      disableBeacon: true,
      title: "Contacts",
    },
    {
      target: `#manageAuthenticated-saveContacts`,
      content:
        "You can use the checkbox to on board specific contacts OR you can check all to bulk save all of the contacts.  Remember, the more you check the longer time to process the on boarding.",
      title: "Save Contacts",
    },
  ],

  initializeDynamicSteps: () => {
    const {
      currentCondition,
      initialSteps,
      authenticatedSteps,
      preSelectedBoardSteps,
      postSelectedBoardSteps,
      preCustomSelectedBoardSteps,
      postCustomSelectedBoardSteps,
      technicianSteps,
      clientSteps,
      contactSteps,
    } = get();
    switch (currentCondition) {
      case "initial":
        set({ steps: initialSteps });
        break;
      case "authenticated":
        set({ steps: authenticatedSteps });
        break;
      case "preSelectedBoard":
        set({ steps: preSelectedBoardSteps });
        break;
      case "postSelectedBoard":
        set({ steps: postSelectedBoardSteps });
        break;
      case "preCustomSelectedBoard":
        set({ steps: preCustomSelectedBoardSteps });
        break;
      case "postCustomSelectedBoard":
        set({ steps: postCustomSelectedBoardSteps });
        break;
      case "technician":
        set({ steps: technicianSteps });
        break;
      case "client":
        set({ steps: clientSteps });
        break;
      case "contact":
        set({ steps: contactSteps });
        break;
      // Add more cases as needed for other conditions
      default:
        set({ steps: [] });
    }
    set({ run: true, stepIndex: 0 }); // Restart the Joyride with the new steps
  },

  setRun: (run) => set(() => ({ run })),
  setStepIndex: (index) => set(() => ({ stepIndex: index })),

  handleUpdateCurrentCondition: (condition) => {
    const { initializeDynamicSteps } = get();
    set({
      currentCondition: condition,
    });
    initializeDynamicSteps();
  },

  handleJoyrideCallback: (data) => {
    const { setIsFirstTimeUser } = useMspStore.getState();
    const { action, index, status, type } = data;
    const { stepIndex } = get();
    if (status === "skipped") {
      setIsFirstTimeUser(false);
    }
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
