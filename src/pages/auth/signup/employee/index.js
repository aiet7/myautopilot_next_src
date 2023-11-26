"use client";
import useUiStore from "@/utils/store/ui/uiStore.js";
import { useEffect } from "react";

const EmployeeSignup = () => {
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
          className="relative z-[99]  bg-gradient-to-b from-white via-white to-gray-400 h-full flex justify-center items-center"
          style={{ height: `calc(${height}px - 1px)` }}
        ></div>
      )}
    </>
  );
};

export default EmployeeSignup;
