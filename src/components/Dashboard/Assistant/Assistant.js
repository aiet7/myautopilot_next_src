"use client";

import { useRef, useEffect } from "react";
import useUiStore from "@/utils/store/ui/uiStore.js";
import AssistantRail from "./AssistantRail.js";
import AssistantControl from "./AssistantControl.js";
import InternalPilot from "./Sections/Internal/InternalPilot.js";
import useAssistantStore from "@/utils/store/assistant/assistantStore.js";
import ExternalPilot from "./Sections/External/ExternalPilot.js";

const Assistant = () => {
  const { openAssistant } = useUiStore();
  const {
    setAssistantWidth,
    assistantWidth,
    activeAssistantTabOpen,
    isResizing,
    setIsResizing,
  } = useAssistantStore();

  const resizableRef = useRef(null);
  const isMobile = window.innerWidth < 1023;

  const startResize = (e) => {
    e.preventDefault();
    setIsResizing(true); // Start resizing
  };

  const stopResize = () => {
    setIsResizing(false); // Stop resizing
    if (resizableRef.current) {
      setAssistantWidth(parseInt(resizableRef.current.style.width, 10));
    }
  };

  const resize = (e) => {
    if (!isResizing || !resizableRef.current || isMobile) return; // Check resizing state

    const newWidth = window.innerWidth - e.clientX;

    // Keep width between 400 and 900
    if (newWidth > 400 && newWidth < 900) {
      setAssistantWidth(newWidth); // Update width in real-time
    }
  };

  useEffect(() => {
    if (isResizing) {
      document.addEventListener("mousemove", resize);
      document.addEventListener("mouseup", stopResize);
    }

    return () => {
      document.removeEventListener("mousemove", resize);
      document.removeEventListener("mouseup", stopResize);
    };
  }, [isResizing]); // Only run on isResizing change

  useEffect(() => {
    if (resizableRef.current) {
      if (isMobile) {
        // Set width to full screen on mobile
        resizableRef.current.style.width = "100%";
      } else {
        // Apply the assistantWidth on larger screens
        resizableRef.current.style.width = `${assistantWidth}px`;
      }
    }
  }, [assistantWidth, isMobile]);

  return (
    <div
      ref={resizableRef}
      className={`dark:bg-[#111111] absolute z-10 top-0 bottom-0 right-0 lg:right-10 text-sm bg-gray-200 transition-transform duration-300 ease-in-out ${
        openAssistant ? "translate-x-0" : "translate-x-full"
      } flex dark:border-white/10 lg:border-l lg:border-black/10 ${
        isMobile ? "w-full" : `w-[${assistantWidth || 400}px]`
      } max-w-[100%]`}
    >
      {isMobile && <AssistantRail />}

      <div className="flex flex-col w-full h-full relative">
        <AssistantControl />

        <div className="relative flex flex-col overflow-hidden h-full ">
          <InternalPilot />
          {activeAssistantTabOpen && <ExternalPilot />}
        </div>
      </div>

      {/* Draggable Resize Handle */}
      {!isMobile && (
        <div
          className="absolute top-0 bottom-0 left-0 w-1 cursor-ew-resize bg-gray-300"
          onMouseDown={startResize}
        />
      )}
    </div>
  );
};

export default Assistant;
