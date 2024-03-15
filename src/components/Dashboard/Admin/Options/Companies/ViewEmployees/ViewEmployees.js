"use client";

import useCompaniesStore from "@/utils/store/admin/control/companies/companiesStore";
import ViewActiveEmployees from "../../Companies/ViewEmployees/ViewActiveEmployees";
import ViewInactiveEmployees from "../../Companies/ViewEmployees/ViewInactiveEmployees";
import AddEmployee from "./AddEmployee";
import useUserStore from "@/utils/store/user/userStore";

const ViewEmployees = () => {
  const { user } = useUserStore();
  const {
    addEmployee,
    currentEmployeeView,
    setCurrentEmployeeView,
    handleViewCompanyAllTickets,
    handleViewCompanyEmployeeForm,
  } = useCompaniesStore();

  const renderComponent = () => {
    switch (currentEmployeeView) {
      case "Inactive":
        return <ViewInactiveEmployees />;
      default:
        return <ViewActiveEmployees />;
    }
  };
  return (
    <div className="flex flex-col text-xl overflow-hidden">
      {addEmployee && <AddEmployee />}
      <div className="flex flex-col gap-7 text-xl overflow-hidden">
        <div className="flex flex-col overflow-hidden px-4">
          <div className="flex items-center gap-1 py-4 text-sm">
            <span
              onClick={() => setCurrentEmployeeView("Active")}
              className={`${
                currentEmployeeView !== "Inactive" && "font-bold"
              } cursor-pointer`}
            >
              Active
            </span>
            <span>/</span>

            <span
              onClick={() => setCurrentEmployeeView("Inactive")}
              className={`${
                currentEmployeeView === "Inactive" && "font-bold"
              } cursor-pointer`}
            >
              All
            </span>
          </div>
          <div className="flex items-center justify-start gap-2 py-4">
            <button
              onClick={() =>
                handleViewCompanyEmployeeForm(user?.mspCustomDomain)
              }
              className="text-sm  bg-blue-800 text-white font-bold px-5 rounded-lg py-1"
            >
              Add Employee
            </button>
            <p
              onClick={handleViewCompanyAllTickets}
              className="hover:underline text-blue-800 text-sm cursor-pointer"
            >
              See All Tickets
            </p>
          </div>

          {renderComponent()}
        </div>
      </div>
    </div>
  );
};

export default ViewEmployees;
