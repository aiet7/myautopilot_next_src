"use client";
import useManageStore from "@/utils/store/admin/control/integrations/PSA/manageStore";
import { AiOutlineClose } from "react-icons/ai";
import Technician from "./Technicians";
import Clients from "./Clients";
import Board from "./Boards";
import Contacts from "./Contacts";
import Teams from "./Teams/Teams";
import Tickets from "./Tickets";

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
        return <Teams />;
      case 4:
        return <Clients />;
      case 5:
        return <Contacts />;
      case 6:
        return <Tickets />;
    }
  };

  return (
    <div className="dark:bg-black/80 absolute bg-black/60 z-[99] top-0 bottom-0 right-0 left-0 flex items-center justify-center ">
      <div className="flex flex-col items-end bg-white w-full h-full p-4  text-black">
        <AiOutlineClose
          className="cursor-pointer"
          size={20}
          onClick={setCloseConfiguration}
        />
        <div className="flex flex-col gap-4 overflow-hidden w-full h-full">
          <div className="relative flex items-center justify-between w-full">
            <div className="absolute top-1/3 left-0 w-[98%] h-[4px] bg-gray-300 "></div>

            <div className="flex flex-col items-center ">
              <button
                onClick={() => setActiveConfigStep(1)}
                className={`flex items-center justify-center w-12 h-12 rounded-full relative ${
                  activeConfigSteps === 1
                    ? "bg-blue-800 text-white"
                    : "bg-gray-400 text-white"
                } font-semibold`}
              >
                1
              </button>
              <span className="text-sm font-medium">Board</span>
            </div>

            <div className="flex flex-col items-center">
              <button
                onClick={() => setActiveConfigStep(2)}
                className={`flex items-center justify-center w-12 h-12 rounded-full relative ${
                  activeConfigSteps === 2
                    ? "bg-blue-800 text-white"
                    : "bg-gray-400 text-white"
                } font-semibold`}
              >
                2
              </button>
              <span className="text-sm font-medium">Technicians</span>
            </div>
            <div className="flex flex-col items-center">
              <button
                onClick={() => setActiveConfigStep(3)}
                className={`flex items-center justify-center w-12 h-12 rounded-full relative ${
                  activeConfigSteps === 3
                    ? "bg-blue-800 text-white"
                    : "bg-gray-400 text-white"
                } font-semibold`}
              >
                3
              </button>
              <span className="text-sm font-medium">Teams</span>
            </div>

            <div className="flex flex-col items-center">
              <button
                onClick={() => setActiveConfigStep(4)}
                className={`flex items-center justify-center w-12 h-12 rounded-full relative ${
                  activeConfigSteps === 4
                    ? "bg-blue-800 text-white"
                    : "bg-gray-400 text-white"
                } font-semibold`}
              >
                4
              </button>
              <span className="text-sm font-medium">Clients</span>
            </div>

            <div className="flex flex-col items-center ">
              <button
                onClick={() => setActiveConfigStep(5)}
                className={`flex items-center justify-center w-12 h-12 rounded-full relative ${
                  activeConfigSteps === 5
                    ? "bg-blue-800 text-white"
                    : "bg-gray-400 text-white"
                } font-semibold`}
              >
                5
              </button>
              <span className=" text-sm font-medium">Contacts</span>
            </div>

            <div className="flex flex-col items-center ">
              <button
                onClick={() => setActiveConfigStep(6)}
                className={`flex items-center justify-center w-12 h-12 rounded-full relative ${
                  activeConfigSteps === 6
                    ? "bg-blue-800 text-white"
                    : "bg-gray-400 text-white"
                } font-semibold`}
              >
                6
              </button>
              <span className=" text-sm font-medium">Tickets</span>
            </div>
          </div>

          {renderComponent()}
          {activeConfigSteps !== 1 &&
            activeConfigSteps !== 3 &&
            activeConfigSteps !== 6 && (
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
