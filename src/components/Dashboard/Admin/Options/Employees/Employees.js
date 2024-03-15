"use client";

import useEmployeesStore from "@/utils/store/admin/control/employees/employeesStore";
import useUiStore from "@/utils/store/ui/uiStore";
import useUserStore from "@/utils/store/user/userStore";
import { useEffect } from "react";
import ViewActiveEmployees from "./ViewActiveEmployees";
import ViewInactiveEmployees from "./ViewInactiveEmployees";

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
      case "Inactive":
        return <ViewInactiveEmployees />;
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
            currentView !== "Inactive" && "font-bold"
          } cursor-pointer`}
        >
          Active
        </span>
        <span>/</span>
        <span
          onClick={() => setCurrentView("Inactive")}
          className={`${
            currentView === "Inactive" && "font-bold"
          } cursor-pointer`}
        >
          All
        </span>
      </div>
      <div className="flex flex-col h-full overflow-hidden">
        {renderComponent()}
      </div>
    </div>
  );
};

export default Employees;
