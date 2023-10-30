"use client";

import useToolsStore from "@/utils/store/assistant/sections/tools/toolsStore";

const Tools = () => {
  const { tools } = useToolsStore();

  return (
    <div className="flex-grow flex flex-col gap-8 overflow-hidden">
      <h3 className="dark:border-white/40 text-lg border-b">Tools</h3>
      <div className="flex-grow overflow-y-auto scrollbar-thin">
        <div className="flex flex-grow flex-col gap-8">
          <div className="flex flex-col">
            <p className="text-2xl">Manage Your Tools</p>
            <p className="dark:text-white/60 text-lg text-black/60">
              Access and download the specific tools you need: Agent and Screen
              Connect for seamless connectivity and management.
            </p>
          </div>
          {tools.map((tool, index) => {
            const { title, description, link, linkTitle } = tool;
            return (
              <div key={index}>
                <p className="text-lg font-bold">{title}</p>
                <p className="dark:text-white/60 text-black/60">
                  {description}
                </p>
                <a href={link} target="_blank" rel="noopener noreferrer">
                  <button className="hover:bg-blue-500 bg-blue-800 text-white py-2 w-full">
                    {linkTitle}
                  </button>
                </a>
              </div>
            );
          })}
        </div>
      </div>
      {/* <a href={agentLink} target="_blank" rel="noopener noreferrer">
        <button className="hover:bg-blue-500 bg-blue-800 text-white py-2 w-full">
          Agent Installer
        </button>
      </a>
      <a href={screenConnectLink} target="_blank" rel="noopener noreferrer">
        <button className="hover:bg-blue-500 bg-blue-800 text-white py-2 w-full">
          Screen Connect Installer
        </button>
      </a> */}
    </div>
  );
};

export default Tools;
