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
  const noResizing = window.innerWidth < window.screen.width * 0.75; // 3/4 screen

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
    if (!isResizing || !resizableRef.current || isMobile || noResizing) return;
    const adjustment = activeAssistantTabOpen ? 225 : 0;
    const newWidth = window.innerWidth - e.clientX - adjustment;

    if (newWidth > 400 && newWidth < 800) {
      setAssistantWidth(newWidth);
    }
  };

  // Reset assistant width to 600px if window width is less than 3/4 of the screen
  useEffect(() => {
    if (noResizing && !isMobile) {
      setAssistantWidth(500);
    }
  }, [noResizing, isMobile, setAssistantWidth]);

  useEffect(() => {
    if (isResizing) {
      document.addEventListener("mousemove", resize);
      document.addEventListener("mouseup", stopResize);
    }

    return () => {
      document.removeEventListener("mousemove", resize);
      document.removeEventListener("mouseup", stopResize);
    };
  }, [isResizing]);

  useEffect(() => {
    if (resizableRef.current) {
      if (isMobile) {
        resizableRef.current.style.width = "100%";
      } else {
        resizableRef.current.style.width = `${assistantWidth}px`;
      }
    }
  }, [assistantWidth, isMobile]);

  return (
    <>
      <div
        ref={resizableRef}
        style={{
          transform: openAssistant
            ? activeAssistantTabOpen && !isMobile
              ? `translateX(-225px)`
              : `translateX(0)`
            : `translateX(100%)`,
          width: isMobile ? "100%" : `${assistantWidth || 400}px`,
        }}
        className={`w-full h-full dark:bg-[#111111] absolute top-0 bottom-0 right-0 lg:right-[45px] text-sm bg-gray-200 transition-transform duration-300 ease-in-out flex dark:border-white/10 lg:border-l lg:border-black/10 max-w-[100%]`}
      >
        {isMobile && <AssistantRail />}
        <div className="flex flex-col w-full h-full relative">
          <AssistantControl />
          <InternalPilot />
        </div>
        {!isMobile && !noResizing && (
          <div
            className="absolute top-0 bottom-0 left-0 w-1 cursor-ew-resize bg-gray-300"
            onMouseDown={startResize}
          />
        )}
      </div>
    </>
  );
};

export default Assistant;
