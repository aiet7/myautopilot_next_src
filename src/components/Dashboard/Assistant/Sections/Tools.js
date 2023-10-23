"use client";

import useToolsStore from "@/utils/store/assistant/sections/tools/toolsStore";

const Tools = () => {
  const { agentLink, screenConnectLink } = useToolsStore();

  return (
    <div className="flex-grow flex flex-col gap-4 overflow-hidden">
      <h3 className="text-left text-lg">Tools</h3>
          <a href={agentLink} target="_blank" rel="noopener noreferrer">
            <button className="hover:bg-blue-500 bg-blue-800 text-white py-2 w-full">
              Agent Installer
            </button>
          </a>
          <a href={screenConnectLink} target="_blank" rel="noopener noreferrer">
            <button className="hover:bg-blue-500 bg-blue-800 text-white py-2 w-full">
              Screen Connect Installer
            </button>
          </a>
    </div>
  );
};

export default Tools;
