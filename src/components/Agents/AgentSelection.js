"use client";

import { FaMicrochip } from "react-icons/fa";
import { GiSettingsKnobs, GiClawHammer } from "react-icons/gi";
import { useState } from "react";
import { SiMarketo } from "react-icons/si";
import { TbWorldWww } from "react-icons/tb";

const AgentSelection = ({
  initialAgents,
  openAgentHistory,
  openAgentSelectionHover,
  handleOpenAgentSelectionHide,
  handleAgentSelected,
}) => {
  // const [selectedAgentId, setSelectedAgentId] = useState(null);
  // const [editedPrompt, setEditedPrompt] = useState("");

  // const handleOpenAgentSettings = (id, defaultPrompt) => {
  //   if (selectedAgentId === id) {
  //     setSelectedAgentId(null);
  //   } else {
  //     setSelectedAgentId(id);
  //     setEditedPrompt(defaultPrompt);
  //   }
  // };

  return (
    <div
      onMouseLeave={handleOpenAgentSelectionHide}
      className={`${
        openAgentSelectionHover
          ? "dark:bg-[#111111] dark:lg:shadow-lg dark:lg:shadow-white/50 bubble-agents bg-[#f6f8fc] absolute bottom-[74px] z-[99] w-full rounded-md flex flex-col lg:left-[63px] lg:top-0 lg:bottom-[28px] lg:w-[310px] lg:shadow-lg lg:shadow-black/50 lg:mt-6"
          : `px-4 py-6 bg-[#f6f8fc] absolute z-10 top-0 bottom-0 transition-all duration-300 ease-in-out transform flex flex-col ${
              openAgentHistory
                ? "translate-x-0 w-[300px] dark:shadow-white shadow-lg shadow-black/50"
                : "-translate-x-full w-[300px]"
            } dark:bg-[#111111] dark:xl:border-white/20 xl:relative xl:translate-x-0 xl:min-w-[300px] xl:static xl:border-r`
      }`}
    >
      <button
        className={`${
          openAgentSelectionHover && "rounded-tr-md rounded-tl-md p-8"
        } w-full p-4 bg-blue-800 text-white `}
      >
        + New Agent
      </button>
      <div
        className={`${
          openAgentSelectionHover && "px-2"
        } h-[200px] overflow-y-auto scrollbar-thin lg:h-full`}
      >
        {initialAgents.slice(0, -1).map((agent, index) => {
          const { id, agentName, defaultPrompt } = agent;
          return (
            <div key={id} className=" flex flex-col items-start my-2">
              <div
                className="
               dark:hover:bg-white/40 hover:bg-black/20  h-[50px] w-full flex items-center cursor-pointer"
              >
                <div className="flex items-center justify-between px-2 w-full">
                  <div
                    onClick={() => handleAgentSelected(id)}
                    className="flex items-center gap-4"
                  >
                    {agentName === "Marketing Agent" && <SiMarketo />}
                    {agentName === "IT Agent" && <TbWorldWww />}
                    {agentName === "Law Agent" && <GiClawHammer />}
                    <p>{agentName}</p>
                  </div>
                  {/* <GiSettingsKnobs
                    className="select-none"
                    onClick={() => handleOpenAgentSettings(id, defaultPrompt)}
                  /> */}
                </div>
              </div>
              {/* {selectedAgentId === id && (
                <div className="w-full">
                  <textarea
                    className="dark:bg-white/10 w-full bg-black/5 p-2 rounded-bl-md rounded-br-md scrollbar-thin min-h-[100px] max-h-[200px]"
                    value={editedPrompt}
                    onChange={(e) => setEditedPrompt(e.target.value)}
                  />
                  <button
                    onClick={() => setSelectedAgentId(null)}
                    className="w-full bg-blue-800 py-2 text-white"
                  >
                    Save
                  </button>
                </div>
              )} */}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AgentSelection;
