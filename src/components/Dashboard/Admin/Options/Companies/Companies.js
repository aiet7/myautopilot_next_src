"use client";

import { useEffect } from "react";
import useUiStore from "@/utils/store/ui/uiStore";
import useCompaniesStore from "@/utils/store/admin/control/companies/companiesStore";
import useUserStore from "@/utils/store/user/userStore";
import ViewEmployees from "./ViewEmployees";
import ViewCompanies from "./ViewCompanies";
import ViewAllTickets from "./ViewAllTickets";
import ViewEmployeeTickets from "./ViewEmployeeTickets";

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
          <h1 className="text-2xl">
            <span
              onClick={() => setCurrentView("Companies")}
              className="hover:underline cursor-pointer"
            >
              Companies
            </span>{" "}
            / {selectedCompany}
          </h1>
        );
      case "CompanyAllTickets":
        return (
          <h1 className="text-2xl">
            <span
              onClick={() => setCurrentView("Companies")}
              className="hover:underline cursor-pointer"
            >
              Companies
            </span>{" "}
            /{" "}
            <span
              onClick={() => setCurrentView("CompanyEmployees")}
              className="hover:underline cursor-pointer"
            >
              {selectedCompany}
            </span>{" "}
            / Tickets
          </h1>
        );
      case "CompanyEmployeeTickets":
        return (
          <h1 className="text-2xl">
            <span
              onClick={() => setCurrentView("Companies")}
              className="hover:underline cursor-pointer"
            >
              Companies
            </span>{" "}
            /{" "}
            <span
              onClick={() => setCurrentView("CompanyEmployees")}
              className="hover:underline cursor-pointer"
            >
              {selectedCompany}
            </span>{" "}
            / {selectedEmployee} / Tickets
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
      className={`relative flex flex-col h-full w-full ${
        openAdmin && "lg:opacity-100 opacity-5 xl:ml-[350px]"
      }  dark:bg-black transition-all duration-300 ease bg-white `}
    >
      <div className="dark:border-b-white/20 border-b p-4">
        {renderBreadCrumb()}
      </div>
      <div className="flex flex-col h-full overflow-hidden">
        {renderComponent()}
      </div>
    </div>
  );
};

export default Companies;
