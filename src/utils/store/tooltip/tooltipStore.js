import { create } from "zustand";
import { ACTIONS, STATUS, EVENTS } from "react-joyride";

const useTooltipStore = create((set, get) => ({
  run: false,
  stepIndex: 0,
  steps: [
    {
      target: "#nav-employees",
      content:
        "Here you can navigate through your technicians that you have configured with Manage",
    },
    {
      target: "#nav-roles",
      content:
        "Here you can create and edit your roles and assign them to your technicians and clients",
    },
    {
      target: "#nav-integrations",
      content: "This is where you will integrate all of your different tools.",
    },
    {
      target: "#nav-branding",
      content:
        "This is where you will customize your application like sidebar color and your own subdomain.",
    },
    {
      target: "#nav-companies",
      content:
        "This is where you will navigate through all of your clients and their employees, assign them roles and see all of their tickets.",
    },
  ],

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
