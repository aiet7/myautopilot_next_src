"use client";

import useEmployeesStore from "@/utils/store/admin/control/employees/employeesStore";
import useUiStore from "@/utils/store/ui/uiStore";
import useUserStore from "@/utils/store/user/userStore";
import { useEffect } from "react";
import ViewActiveEmployees from "./ViewActiveEmployees";
import ViewEmployees from "./ViewEmployees";

const Employees = ({}) => {
  const { user } = useUserStore();
  const { openAdmin, handleHistoryMenu } = useUiStore();
  const { currentView, setCurrentView, initializeEmployees } =
    useEmployeesStore();

  useEffect(() => {
    initializeEmployees();
  }, [user]);

  const renderComponent = () => {
    switch (currentView) {
      case "Technicians":
        return <ViewEmployees />;
      default:
        return <ViewActiveEmployees />;
    }
  };

  return (
    <div
      onClick={() => {
        if (window.innerWidth < 1023) {
          openAdmin && handleHistoryMenu(false);
        }
      }}
      className={`relative flex flex-col h-full w-full ${
        openAdmin && "lg:opacity-100 opacity-5 xl:ml-[350px]"
      }  dark:bg-black transition-all duration-300 ease bg-white`}
    >
      <div className="dark:border-b-white/20 border-b p-4">
        <h1 className="text-2xl">Employees</h1>
      </div>
      <div className="flex items-center gap-1 p-4 text-sm">
        <span
          onClick={() => setCurrentView("Active")}
          className={`${
            currentView !== "Technicians" && "font-bold"
          } cursor-pointer`}
        >
          Active
        </span>
        <span>/</span>
        <span
          onClick={() => setCurrentView("Technicians")}
          className={`${
            currentView === "Technicians" && "font-bold"
          } cursor-pointer`}
        >
          Technicians
        </span>
      </div>
      <div className="flex flex-col h-full overflow-hidden pb-4">
        {renderComponent()}
      </div>
    </div>
  );
};

export default Employees;
