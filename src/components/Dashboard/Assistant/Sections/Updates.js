"use client";

import { generalUpdates } from "../../../../utils/prompts/generalPromptLibrary";

const Updates = ({ handlePromptAssistantInput }) => {
  return (
    <>
      <h3 className="text-left text-lg">Updates</h3>
      <div className="flex-grow overflow-y-auto scrollbar-thin">
        <div className="flex flex-grow flex-col gap-4 ">
          {generalUpdates.map((generalUpdates, index) => {
            const { name, description, prompt } = generalUpdates;
            return (
              <div key={index} className="flex flex-col gap-1">
                <div className="w-full flex items-center justify-between text-white font-bold bg-blue-800 py-1 px-2">
                  <span
                    className="w-full cursor-pointer"
                    onClick={() => handlePromptAssistantInput(prompt)}
                  >
                    {name}
                  </span>
                </div>

                <pre className="dark:bg-white/20 whitespace-pre-wrap bg-black/5 p-2 text-xs w-full">
                  {description}
                </pre>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Updates;
