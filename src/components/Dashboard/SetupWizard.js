"use client";

import useTooltipStore from "@/utils/store/tooltip/tooltipStore";

const SetupWizard = () => {
  const {
    steps,
    show,
    currentStepIndex,
    handleNextStep,
    handlePrevStep,
    handleResetGuide,
  } = useTooltipStore();

  const step = steps[currentStepIndex];
  const targetElement = document.getElementById(step?.elementId);
  if (!show || !targetElement) {
    return null;
  }

  const { top, left, width, height } = targetElement.getBoundingClientRect();

  const tooltipStyle = {
    position: "absolute",
    top: `${top + height + window.scrollY}px`,
    left: `${left + window.scrollX + width / 2}px`,
    zIndex: 99,
    
  };

  return (
    <div style={tooltipStyle} className="  p-4 bg-white rounded shadow-lg border">
      <p >{step.description}</p>
      <div className="flex gap-2">
        {currentStepIndex > 0 && (
          <button className="rounded-md bg-blue-800 px-4 py-1 text-white" onClick={handlePrevStep}>Previous</button>
        )}
        {currentStepIndex < steps.length - 1 && (
          <button className="rounded-md bg-blue-800 px-4 py-1 text-white" onClick={handleNextStep}>Next</button>
        )}
        <button className="rounded-md bg-blue-800 px-4 py-1 text-white" onClick={handleResetGuide}>Close</button>
      </div>
    </div>
  );
};

export default SetupWizard;
