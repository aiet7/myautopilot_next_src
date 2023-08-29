"use client";

import useAgentsStore from "@/utils/store/agents/agentsStore";
import useUiStore from "@/utils/store/ui/uiStore";
import { GiClawHammer } from "react-icons/gi";

import { SiMarketo } from "react-icons/si";
import { TbWorldWww } from "react-icons/tb";

const Selection = ({}) => {
  const { agents, handleAgentSelected } = useAgentsStore();
  const { hoverTab, openHistory } = useUiStore();
  return (
    <div
      className={`${
        hoverTab === "agents" &&
        "bubble-agents h-full shadow-lg shadow-blue-500"
      } ${
        openHistory ? "translate-x-0 w-[300px]" : "-translate-x-full w-[300px]"
      }  dark:bg-[#111111] bg-[#f6f8fc] absolute z-10 top-0 bottom-0 left-0 p-4 flex flex-col transition-all duration-300 ease-in-out transform xl:relative xl:min-w-[300px] xl:translate-x-0`}
    >
      <button className={`w-full p-4 bg-blue-800 text-white `}>
        + New Agent
      </button>
      <div className={`h-[200px] overflow-y-auto scrollbar-thin lg:h-full`}>
        {agents.slice(1).map((agent, index) => {
          const { id, agentName } = agent;
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
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Selection;
