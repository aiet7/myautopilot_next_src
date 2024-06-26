"use client";
import useManageStore from "@/utils/store/admin/control/integrations/PSA/manageStore";
import { AiOutlineClose } from "react-icons/ai";
import Technician from "./Technicians";
import Clients from "./Clients";
import Board from "./Boards";
import Contacts from "./Contacts";

const Configuration = () => {
  const {
    activePage,
    activePageNumbers,
    setActivePage,
    activeConfigSteps,
    setActiveConfigStep,
    setCloseConfiguration,
  } = useManageStore();

  const renderComponent = () => {
    switch (activeConfigSteps) {
      case 1:
        return <Board />;
      case 2:
        return <Technician />;
      case 3:
        return <Clients />;
      case 4:
        return <Contacts />;
    }
  };

  return (
    <div className="dark:bg-black/80 absolute bg-black/60 z-[99] top-0 bottom-0 right-0 left-0 flex items-center justify-center p-2 lg:p-10">
      <div className="flex flex-col items-end bg-white w-full h-full p-4 rounded-lg text-black">
        <AiOutlineClose
          className="cursor-pointer"
          size={20}
          onClick={setCloseConfiguration}
        />
        <div className="flex flex-col gap-4 overflow-hidden w-full h-full">
          <div className="flex flex-wrap gap-2 py-2 text-center font-bold text-xs md:flex-nowrap">
            <button
              id="manageAuthenticated-boardStep"
              onClick={() => setActiveConfigStep(1)}
              className={`${
                activeConfigSteps === 1 && "text-white bg-blue-800"
              } px-4 py-3 rounded-lg w-full text-black/20 border`}
            >
              Board
            </button>
            <button
              id="manageAuthenticated-technicianStep"
              onClick={() => setActiveConfigStep(2)}
              className={`${
                activeConfigSteps === 2 && "text-white bg-blue-800"
              } px-4 py-3 rounded-lg w-full text-black/20 border`}
            >
              Technicians
            </button>
            <button
              id="manageAuthenticated-clientStep"
              onClick={() => setActiveConfigStep(3)}
              className={`${
                activeConfigSteps === 3 && "text-white bg-blue-800"
              } px-4 py-3 rounded-lg w-full text-black/20 border`}
            >
              Clients
            </button>
            <button
              id="manageAuthenticated-contactStep"
              onClick={() => setActiveConfigStep(4)}
              className={`${
                activeConfigSteps === 4 && "text-white bg-blue-800"
              } px-4 py-3 rounded-lg w-full text-black/20 border`}
            >
              Contacts
            </button>
          </div>
          {renderComponent()}
          {activeConfigSteps !== 1 && (
            <div className="flex justify-center font-bold py-2 gap-2">
              {activePageNumbers.map((page) => (
                <button
                  className={`${
                    activePage === page ? "text-blue-800" : "text-black/20"
                  }`}
                  onClick={() => setActivePage(page)}
                  key={page}
                >
                  {page}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Configuration;
