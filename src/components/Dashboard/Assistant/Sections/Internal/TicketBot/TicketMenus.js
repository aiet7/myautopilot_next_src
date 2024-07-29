"use client";

import useAssistantStore from "@/utils/store/assistant/assistantStore";
import useTicketsStore from "@/utils/store/interaction/tickets/ticketsStore";
import { BsFilterLeft, BsThreeDotsVertical, BsCheck } from "react-icons/bs";

const TicketMenus = () => {
  const {
    activeTicketBotModeOpen,
    filterTicketModeOpen,
    activeTicketBotMode,
    filterTicketMode,
    activeTicketOptions,
    filterTicketOptions,
    setActiveTicketBotMode,
    setActiveFilterMode,
    setActiveTicketBotModeOpen,
    setActiveTicketFilterModeOpen,
  } = useTicketsStore();

  const { setAssistantWidthOpen } = useAssistantStore();

  return (
    <div>
      <div className="relative flex items-center ">
        <BsThreeDotsVertical
          onClick={() => {
            setActiveTicketBotModeOpen(!activeTicketBotModeOpen);
            setActiveTicketFilterModeOpen(false);
            setAssistantWidthOpen(false);
          }}
          size={20}
          className="cursor-pointer "
        />
        {activeTicketBotModeOpen && (
          <div className="absolute flex flex-col  font-semibold top-6 right-8  bg-white border rounded-lg shadow-lg w-[100px] p-1 z-[100] ">
            {activeTicketOptions.map((option) => (
              <div
                key={option}
                className=" hover:bg-black/20 p-1 rounded flex justify-between items-center border-b text-black"
              >
                <button
                  onClick={() => {
                    setActiveTicketBotMode(option);
                    setActiveTicketBotModeOpen(false);
                  }}
                  className=" w-full text-left "
                >
                  {option}
                </button>
                {activeTicketBotMode === option && <BsCheck size={20} />}
              </div>
            ))}
          </div>
        )}
        <BsFilterLeft
          onClick={() => {
            setActiveTicketFilterModeOpen(!filterTicketModeOpen);
            setActiveTicketBotModeOpen(false);
          }}
          size={27}
          className="cursor-pointer"
        />
        {filterTicketModeOpen && (
          <div className="absolute flex flex-col  font-semibold top-6 right-2 bg-white border rounded-lg shadow-lg w-[150px] p-1 z-[100] ">
            {filterTicketOptions.map((option) => (
              <div
                key={option}
                className="hover:bg-black/20 p-1 rounded flex justify-between items-center border-b text-black"
              >
                <button
                  onClick={() => {
                    setActiveFilterMode(option);
                    setActiveTicketFilterModeOpen(false);
                  }}
                  className="w-full text-left "
                >
                  {option}
                </button>
                {filterTicketMode === option && <BsCheck size={20} />}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketMenus;
