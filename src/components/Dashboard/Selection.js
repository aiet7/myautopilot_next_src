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
      className={`absolute z-10 top-0 bottom-0 left-0 ${
        hoverTab === "agents" &&
        "bubble-agents h-full shadow-lg shadow-blue-500 min-w-[350px]"
      } ${
        openHistory ? "translate-x-0 w-[350px]" : "-translate-x-full w-[350px]"
      }  dark:bg-[#111111] bg-[#f6f8fc]  p-4 flex flex-col transition-transform duration-300 ease-in-out transform`}
    >
      <button className={`w-full p-4 bg-blue-800 text-white `}>
        + New Agent
      </button>
      <div className={`overflow-y-auto h-full scrollbar-thin `}>
        {agents.slice(1).map((agent, index) => {
          const { id, agentName } = agent;
          return (
            <div key={id} className=" flex flex-col items-start my-2">
              <div
                onClick={() => handleAgentSelected(id)}
                className="dark:hover:bg-white/40 hover:bg-black/20  h-[50px] w-full flex items-center cursor-pointer"
              >
                <div className="flex items-center justify-between px-2 w-full">
                  <div className="flex items-center gap-4">
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
