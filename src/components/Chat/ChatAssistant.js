"use client";

import { useState } from "react";

import {
  generalSkills,
  generalPrompts,
} from "../../utils/prompts/generalPromptLibrary.js";

const ChatAssistant = ({ openChatAssistant, handlePromptAssistantInput }) => {
  const options = ["General", "IT", "Law", "Math"];
  const [selectedAssistant, setSelectedAssistant] = useState("General");

  return (
    <div
      className={`px-4 py-6 bg-gray-100 dark:bg-black dark:shadow-white shadow-lg shadow-black/50 absolute z-10 top-0 bottom-0 right-0 transition-all duration-300 ease-in-out transform ${
        openChatAssistant
          ? "translate-x-0 w-[300px]"
          : "translate-x-[600px] w-[300px]"
      } md:relative md:translate-x-0 md:min-w-[300px] md:static `}
    >
      <h2 className="text-2xl font-bold text-center">Workspace</h2>
      <div className="py-2">
        <select
          className="w-full p-2 rounded-md"
          value={selectedAssistant}
          onChange={(e) => setSelectedAssistant(e.target.value)}
        >
          {options.map((option, index) => {
            return (
              <option key={index} value={option}>
                {option}
              </option>
            );
          })}
        </select>
      </div>

      <h3 className="text-center text-lg">Skills</h3>
      <div className="flex flex-col gap-2 flex-grow">
        <div className="flex flex-col gap-3 py-2 overflow-y-auto flex-grow h-[22vh] no-scrollbar md:h-[35vh]">
          {selectedAssistant === "General" &&
            generalSkills.map((generalSkill, index) => {
              const { name, description, prompt } = generalSkill;
              return (
                <div key={index} className="flex flex-col items-start gap-1">
                  <button
                    onClick={() => handlePromptAssistantInput(prompt)}
                    className="text-white font-bold bg-red-500 rounded-sm py-1 w-[100px]"
                  >
                    {name}
                  </button>
                  <pre className="dark:bg-white/20 whitespace-pre-wrap bg-black/5 p-2 rounded-md text-sm w-full">
                    {description}
                  </pre>
                </div>
              );
            })}
        </div>
        <h3 className="text-center text-lg">Prompts</h3>
        <div className="flex flex-col gap-3 py-2  overflow-y-auto flex-grow h-[22vh] no-scrollbar md:h-[35vh]">
          {selectedAssistant === "General" &&
            generalPrompts.map((generalPrompt, index) => {
              const { title, examples } = generalPrompt;
              return (
                <div key={index}>
                  <h4 className="font-bold">{title}</h4>
                  <div className="flex flex-col gap-2">
                    {examples.map((example, index) => {
                      return (
                        <pre
                          onClick={() => handlePromptAssistantInput(example)}
                          key={index}
                          className="dark:bg-white/20 whitespace-pre-wrap bg-black/5 p-2 rounded-md text-sm w-full cursor-pointer"
                        >
                          {example}
                        </pre>
                      );
                    })}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default ChatAssistant;
