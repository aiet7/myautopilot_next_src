"use client";

import useCompaniesStore from "@/utils/store/admin/control/companies/companiesStore";
import ViewActiveEmployees from "../../Companies/ViewEmployees/ViewActiveEmployees";
import ViewPSAEmployees from "./ViewPSAEmployees";
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
      case "PSA Contacts":
        return <ViewPSAEmployees />;
      default:
        return <ViewActiveEmployees />;
    }
  };
  return (
    <div className="flex flex-col text-xl overflow-hidden">
      {addEmployee && <AddEmployee />}
      <div className="flex flex-col gap-7 text-xl overflow-hidden">
        <div className="flex flex-col overflow-hidden p-4">
          <div className="flex items-center gap-1  text-sm">
            <span
              onClick={() => setCurrentEmployeeView("Active")}
              className={`${
                currentEmployeeView !== "PSA Contacts" && "font-bold"
              } cursor-pointer`}
            >
              Active
            </span>
            <span>/</span>

            <span
              onClick={() => setCurrentEmployeeView("PSA Contacts")}
              className={`${
                currentEmployeeView === "PSA Contacts" && "font-bold"
              } cursor-pointer`}
            >
              PSA Contacts
            </span>
          </div>
          <div className="flex items-center justify-start gap-2 py-4">
            {currentEmployeeView === "PSA Contacts" && (
              <button
                onClick={() =>
                  handleViewCompanyEmployeeForm(user?.mspCustomDomain)
                }
                className="text-sm  bg-blue-800 text-white font-bold px-5 rounded-lg py-1"
              >
                Add Employee
              </button>
            )}
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
