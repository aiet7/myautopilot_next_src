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
  const { currentView, setCurrentView, setAddEmployee, initializeEmployees } =
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
      className={`relative flex flex-col h-full w-full text-sm ${
        openAdmin && "lg:opacity-100 opacity-5 xl:ml-[250px]"
      }  dark:bg-black transition-all duration-300 ease bg-white`}
    >
      <div className="dark:border-b-white/20 border-b p-4">
        <h1 className="text-2xl">Employees</h1>
      </div>
      {/* <div className="flex items-center gap-1 text-sm pt-4 px-4">
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
      </div> */}
      {/* <div className="flex items-center text-sm p-4">
        <button
          className={`cursor-pointer px-4 py-1 border-b-2 min-w-[75px] ${
            currentView === "Active"
              ? "text-blue-600 font-bold border-blue-600"
              : "text-gray-600 border-transparent "
          }`}
          onClick={() => setCurrentView("Active")}
        >
          Active
        </button>
        <span className="text-gray-400">/</span>
        <button
          className={`cursor-pointer px-4 py-1 border-b-2 min-w-[75px] ${
            currentView === "Technicians"
              ? "text-blue-600 font-bold border-blue-600"
              : "text-gray-600 border-transparent "
          }`}
          onClick={() => setCurrentView("Technicians")}
        >
          Technicians
        </button>
      </div> */}

      <div className="flex justify-between items-center w-full pt-8 px-4 ">
        <div className="relative flex items-center w-48 bg-gray-100 rounded-lg py-1">
          <div
            className={`absolute left-0 top-0 h-full w-1/2 bg-blue-500 rounded-lg transition-transform duration-300 ${
              currentView === "Technicians" ? "translate-x-full" : ""
            }`}
          ></div>
          <button
            className={`relative w-1/2 text-center text-xs transition-colors duration-300 ${
              currentView === "Active" ? "text-white " : "text-gray-600"
            }`}
            onClick={() => setCurrentView("Active")}
          >
            Active
          </button>
          <button
            className={`relative w-1/2 text-center text-xs transition-colors duration-300 ${
              currentView === "Technicians" ? "text-white " : "text-gray-600"
            }`}
            onClick={() => setCurrentView("Technicians")}
          >
            Technicians
          </button>
        </div>
        <button
          onClick={() => setAddEmployee(true)}
          className="text-sm border transition ease-in hover:bg-[#FFFFFF] hover:text-[#465E89]   bg-[#465E89] text-white font-bold px-5 rounded-lg py-1"
        >
          Add Employee
        </button>
      </div>

      <div className="flex flex-col h-full overflow-auto scrollbar-thin">
        {renderComponent()}
      </div>
    </div>
  );
};

export default Employees;
