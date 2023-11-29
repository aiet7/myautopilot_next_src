"use client";

import useAssistantStore from "@/utils/store/assistant/assistantStore.js";
import useSkillsStore from "@/utils/store/assistant/sections/iternal/skills/skillsStore";

const Skills = ({}) => {
  const { handlePromptAssistantInput } = useAssistantStore();
  const { handleGetSkills } = useSkillsStore();

  const skillsArray = handleGetSkills();
  
  return (
    <div className="flex-grow flex flex-col gap-4 overflow-hidden">
      <h3 className="text-left text-lg ">Skills</h3>
      <div className="flex-grow overflow-y-auto scrollbar-thin">
        <div className="flex flex-grow flex-col gap-4">
          {skillsArray.map((skill, index) => {
            const { name, description, prompt } = skill;
            return (
              <div key={index} className="flex flex-col">
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
    </div>
  );
};

export default Skills;
