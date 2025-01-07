"use client";

import { useEffect } from "react";
import useUiStore from "@/utils/store/ui/uiStore";
import useCompaniesStore from "@/utils/store/admin/control/companies/companiesStore";
import useUserStore from "@/utils/store/user/userStore";
import ViewEmployees from "./ViewEmployees/ViewEmployees";
import ViewCompanies from "./ViewCompanies";
import ViewAllTickets from "./ViewAllTickets";
import ViewEmployeeTickets from "./ViewEmployeeTickets";
import { IoIosArrowForward } from "react-icons/io";

const Companies = () => {
  const { user } = useUserStore();

  const { openAdmin, handleHistoryMenu } = useUiStore();
  const {
    currentView,
    selectedCompany,
    selectedEmployee,
    setCurrentView,
    initializeCompanies,
  } = useCompaniesStore();

  useEffect(() => {
    initializeCompanies();
  }, [user]);

  const renderBreadCrumb = () => {
    switch (currentView) {
      case "CompanyEmployees":
        return (
          <h1 className="text-2xl flex items-center gap-1">
            <span
              onClick={() => setCurrentView("Companies")}
              className="text-blue-600 font-medium underline cursor-pointer"
            >
              Companies
            </span>
            <IoIosArrowForward size={20} className="mt-1" />
            {selectedCompany}
          </h1>
        );
      case "CompanyAllTickets":
        return (
          <h1 className="text-2xl flex items-center gap-1">
            <span
              onClick={() => setCurrentView("Companies")}
              className="text-blue-600 font-medium underline cursor-pointer "
            >
              Companies
            </span>{" "}
            <IoIosArrowForward size={20} className="mt-1" />
            <span
              onClick={() => setCurrentView("CompanyEmployees")}
              className="text-blue-600 font-medium underline cursor-pointer "
            >
              {selectedCompany}
            </span>{" "}
            <IoIosArrowForward size={20} className="mt-1" />
            Tickets
          </h1>
        );
      case "CompanyEmployeeTickets":
        return (
          <h1 className="text-2xl flex items-center gap-1">
            <span
              onClick={() => setCurrentView("Companies")}
              className="text-blue-600 font-medium underline cursor-pointer "
            >
              Companies
            </span>{" "}
            <IoIosArrowForward size={20} className="mt-1" />
            <span
              onClick={() => setCurrentView("CompanyEmployees")}
              className="text-blue-600 font-medium underline cursor-pointer "
            >
              {selectedCompany}
            </span>{" "}
            <IoIosArrowForward size={20} className="mt-1" />
            {selectedEmployee} <IoIosArrowForward size={20} className="mt-1" />
            Tickets
          </h1>
        );
      default:
        return <h1 className="text-2xl">Companies</h1>;
    }
  };

  const renderComponent = () => {
    switch (currentView) {
      case "CompanyEmployees":
        return <ViewEmployees />;
      case "CompanyAllTickets":
        return <ViewAllTickets />;
      case "CompanyEmployeeTickets":
        return <ViewEmployeeTickets />;
      default:
        return <ViewCompanies />;
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
      }  dark:bg-black transition-all duration-300 ease bg-white `}
    >
      <div className="dark:border-b-white/20 border-b p-4">
        {renderBreadCrumb()}
      </div>
      <div className="flex flex-col h-full overflow-auto scrollbar-thin">
        {renderComponent()}
      </div>
    </div>
  );
};

export default Companies;
