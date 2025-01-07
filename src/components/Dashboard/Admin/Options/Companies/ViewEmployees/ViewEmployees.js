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
    <div className="flex flex-col">
      {addEmployee && <AddEmployee />}
      <div className="flex flex-col gap-7">
        <div className="flex flex-col p-4">
          <div className="flex justify-between items-center w-full py-4">
            <div className="relative flex items-center w-48 bg-gray-100 rounded-lg py-1">
              <div
                className={`absolute left-0 top-0 h-full w-1/2 bg-blue-500 rounded-lg transition-transform duration-300 ${
                  currentEmployeeView === "PSA Contacts"
                    ? "translate-x-full"
                    : ""
                }`}
              ></div>
              <button
                className={`relative w-1/2 text-center text-xs transition-colors duration-300 ${
                  currentEmployeeView === "Active"
                    ? "text-white "
                    : "text-gray-600"
                }`}
                onClick={() => setCurrentEmployeeView("Active")}
              >
                Active
              </button>
              <button
                className={`relative w-1/2 text-center text-xs transition-colors duration-300 ${
                  currentEmployeeView === "PSA Contacts"
                    ? "text-white "
                    : "text-gray-600"
                }`}
                onClick={() => setCurrentEmployeeView("PSA Contacts")}
              >
                Technicians
              </button>
            </div>
            <p
              onClick={() => handleViewCompanyAllTickets(user?.mspCustomDomain)}
              className="underline text-blue-600 cursor-pointer"
            >
              See All Tickets
            </p>
            <button
              onClick={() =>
                handleViewCompanyEmployeeForm(user?.mspCustomDomain)
              }
              className="text-sm border transition ease-in hover:bg-[#FFFFFF] hover:text-[#465E89]   bg-[#465E89] text-white font-bold px-5 rounded-lg py-1"
            >
              Add Employee
            </button>
          </div>
          {/* <div className="flex items-center gap-1">
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
                className="text-sm border transition ease-in hover:bg-[#FFFFFF] hover:text-[#465E89]   bg-[#465E89] text-white font-bold px-5 rounded-lg py-1"
              >
                Add Employee
              </button>
            )}
            <p
              onClick={() => handleViewCompanyAllTickets(user?.mspCustomDomain)}
              className="hover:underline text-blue-800 cursor-pointer"
            >
              See All Tickets
            </p>
          </div> */}

          {renderComponent()}
        </div>
      </div>
    </div>
  );
};

export default ViewEmployees;
