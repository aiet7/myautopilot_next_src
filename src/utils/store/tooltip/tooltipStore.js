import { create } from "zustand";

const useTooltipStore = create((set, get) => ({
  currentStepIndex: 0,
  steps: [
    {
      elementId: "sidebar",
      description: "Here you can navigate through our admin backend configuration",
    },
    {
      elementId: "navbar",
      description:
        "This is the navigation bar where you can find links to different sections.",
    },
    
  ],
  show: true,

  setShow: (show) => set(() => ({ show })),
  setCurrentStepIndex: (index) => set(() => ({ currentStepIndex: index })),
  handleNextStep: () =>
    set((state) => ({ currentStepIndex: state.currentStepIndex + 1 })),
  handlePrevStep: () =>
    set((state) => ({ currentStepIndex: state.currentStepIndex - 1 })),
  handleResetGuide: () => set(() => ({ currentStepIndex: 0, show: false })),
}));

export default useTooltipStore;
