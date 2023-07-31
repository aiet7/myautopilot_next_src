"use client";

import { useState, useRef, useEffect } from "react";

import { FaSpinner } from "react-icons/fa";
import { SiOpenai } from "react-icons/si";

import { MarkedChatAssistant } from "../../utils/marked/marked.js";

import {
  ITSkills,
  ITPrompts as exampleItPrompts,
} from "../../utils/prompts/ITPromptLibrary.js";

const AgentAssistant = ({
  initialAgents,
  selectedAgent,
  openAgentAssistant,
  handlePromptAssistantInput,
}) => {
  const inputRef = useRef(null);

  const prependText =
    "Act as an expert prompt engineer. If there is an instance of another open ai gpt4 and you want it to function at its best. give me the top 5 prompts, without quotation marks around the prompts, that you would give it to gpt to get the best results by making sure to sure it at its best regarding";

  const [userInput, setUserInput] = useState("");
  const [prompts, setPrompts] = useState("");
  const [isWaiting, setIsWaiting] = useState(false);

  const [iTPrompts, setItPrompts] = useState(exampleItPrompts);

  const handleSendPromptGenerator = async () => {
    const completeMessage = prependText + userInput;

    const encodedCompleteMessage = encodeURIComponent(completeMessage);
    if (userInput.trim() !== "") {
      inputRef.current.focus();

      setIsWaiting(true);
      setUserInput("");
      try {
        const response = await fetch(
          `https://etech7-wf-etech7-worflow-2.azuremicroservices.io/send?message=${encodedCompleteMessage}`
        );

        if (response.status === 200) {
          const responseBody = await response.json();
          setPrompts(responseBody.data);
        }
      } catch (e) {
        console.log(e);
      } finally {
        setIsWaiting(false);
      }
    }
  };

  useEffect(() => {
    setItPrompts(exampleItPrompts);
  }, []);

  return (
    <div
      className={`${
        selectedAgent ? "block" : "hidden"
      } px-4 py-6 bg-[#f6f8fc] absolute z-10 top-0 bottom-0 right-0 transition-all duration-300 ease-in-out transform flex flex-col gap-4 ${
        openAgentAssistant
          ? "translate-x-0 w-[300px] dark:shadow-white shadow-lg shadow-black/50"
          : "translate-x-full w-[300px]"
      } dark:bg-[#111111] dark:xl:border-white/20 xl:relative xl:translate-x-0 xl:min-w-[300px] xl:static xl:border-l`}
    >
      <h2 className="text-2xl font-bold text-center">
        {initialAgents.find((agent) => agent.id === selectedAgent)?.agentName +
          " Assistant"}
      </h2>

      <div className="flex-grow flex flex-col gap-4 overflow-hidden">
        <h3 className="text-left text-lg">Skills</h3>
        <div className="flex-grow overflow-y-auto scrollbar-thin">
          <div className="flex flex-grow flex-col gap-4 px-1">
            {initialAgents.find((agent) => agent.id === selectedAgent)
              ?.agentName === "IT Agent" &&
              ITSkills.map((iTSkill, index) => {
                const { name, description, prompt } = iTSkill;
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
        <h3 className="text-left text-lg">Prompt Engineer</h3>
        <div className="flex-grow overflow-y-auto scrollbar-thin">
          <div className="flex flex-grow flex-col gap-4 px-1">
            <div className="relative w-full flex items-center">
              <input
                value={userInput}
                ref={inputRef}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleSendPromptGenerator();
                  }
                }}
                className="w-full px-2 py-1 pr-8"
                placeholder="Ex. Marketing, IT, Finance etc"
              />

              <div className="absolute right-2">
                {isWaiting ? (
                  <FaSpinner size={20} className="animate-spin" />
                ) : (
                  <SiOpenai
                    size={20}
                    className={` ${
                      userInput !== ""
                        ? "dark:text-white dark:hover:text-blue-500 hover:text-blue-500 text-black cursor-pointer"
                        : "dark:text-gray-500 text-gray-300 select-none"
                    } cursor-pointer`}
                    onClick={handleSendPromptGenerator}
                  />
                )}
              </div>
            </div>
            <MarkedChatAssistant
              markdown={prompts}
              handlePromptAssistantInput={handlePromptAssistantInput}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentAssistant;
