"use client";

import useUiStore from "@/utils/store/ui/uiStore";
import { useEffect } from "react";

const PodTroubleshootLayout = ({ children }) => {
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
          id="PodTroubleshootLayout_Container"
          className="flex flex-col h-full w-full "
          style={{ height: `calc(${height}px - 1px)` }}
        >
          <div className="flex flex-col h-full w-full lg:flex-row-reverse">
            <div className="flex flex-col h-full w-full overflow-hidden">
            
              <div className="flex flex-1 relative overflow-hidden ">
                {children}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PodTroubleshootLayout;
