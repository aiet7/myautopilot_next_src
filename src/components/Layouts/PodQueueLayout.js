"use client";

import useUiStore from "@/utils/store/ui/uiStore";
import { useEffect } from "react";

const PodQueueLayout = ({ children }) => {
  const { height, setHeight } = useUiStore();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHeight(window.innerHeight);

      const handleResize = () => setHeight(window.innerHeight);
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);
  return (
    <>
      {height && (
        <div
          id="PodQueueLayout_Container"
          className="flex flex-col h-full w-full "
          style={{ height: `calc(${height}px - 1px)` }}
        >
          {children}
        </div>
      )}
    </>
  );
};

export default PodQueueLayout;
