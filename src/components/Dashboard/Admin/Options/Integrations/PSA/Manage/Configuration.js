"use client";
import useManageStore from "@/utils/store/admin/control/integrations/PSA/manageStore";
import { AiOutlineClose } from "react-icons/ai";
import Technician from "./Technician";
import Clients from "./Clients";
import Board from "./Board";
import Contacts from "./Contacts";

const Configuration = () => {
  const { activeConfigSteps, setActiveConfig } = useManageStore();


  const renderComponent = () => {
    switch (activeConfigSteps) {
      case 1:
        return <Technician />;
      case 2:
        return <Clients />;
      case 3:
        return <Contacts />;
      case 4:
        return <Board />;
    }
  };

  return (
    <div className="dark:bg-black/80 absolute bg-black/60 z-[99] top-0 bottom-0 right-0 left-0 flex  items-center justify-center p-2 lg:p-10">
      <div className="flex flex-col items-end bg-white w-full h-full p-4 rounded-lg text-black">
        <AiOutlineClose
          className="cursor-pointer"
          size={20}
          onClick={() => {
            setActiveConfig(false);
          }}
        />
        <div className="flex flex-col gap-4 overflow-hidden w-full h-full">
          <div className="flex flex-col gap-2 py-2 text-center font-bold lg:flex-row">
            <button className="bg-blue-800 text-white px-4 py-3 rounded-lg w-full border">
              Technicians
            </button>
            <button className="px-4 py-3 rounded-lg w-full text-black/20 border">
              Clients
            </button>
            <button className="px-4 py-3 rounded-lg w-full text-black/20 border">
              Contacts
            </button>
            <button className="px-4 py-3 rounded-lg w-full text-black/20 border">
              Board
            </button>
          </div>
          {renderComponent()}
        </div>
      </div>
    </div>
  );
};

export default Configuration;
