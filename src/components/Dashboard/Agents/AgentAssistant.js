"use client";

import { useState, useRef } from "react";

import { AiOutlineDelete, AiOutlineCheck } from "react-icons/ai";
import { FaSpinner } from "react-icons/fa";
import { SiOpenai } from "react-icons/si";

import { MarkedChatAssistant } from "../../../utils/marked/marked.js";

import { ITSkills } from "../../../utils/prompts/ITPromptLibrary.js";
import { generalUpdates } from "../../../utils/prompts/generalPromptLibrary.js";
import { PROCESS_NAMES } from "../../../utils/tickets/ticketProcess.js";
import AssistantRail from "../AssistantRail.js";

const AgentAssistant = ({
  tasks,
  ticketIsPending,
  initialAgents,
  selectedAgent,
  openAgentAssistant,
  handlePromptAssistantInput,
  handleDeleteTask,
}) => {
  const inputRef = useRef(null);

  const prependText =
    "Act as an expert prompt engineer. If there is an instance of another open ai gpt4 and you want it to function at its best. give me the top 5 prompts, without quotation marks around the prompts, that you would give it to gpt to get the best results by making sure to sure it at its best regarding";

  const [activeButton, setActiveButton] = useState("Skills");

  const [userInput, setUserInput] = useState("");
  const [prompts, setPrompts] = useState("");
  const [isWaiting, setIsWaiting] = useState(false);

  const handleAssistantTabChange = (tab) => {
    setActiveButton(tab);
  };

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

  return (
    <div
      className={`${
        selectedAgent ? "block" : "hidden"
      } bg-[#f6f8fc] absolute z-10 top-0 bottom-0 right-0 transition-all duration-300 ease-in-out transform flex ${
        openAgentAssistant
          ? "translate-x-0 w-[300px] dark:shadow-white shadow-lg shadow-black/50"
          : "translate-x-full w-[300px]"
      } dark:bg-[#111111] dark:xl:border-white/20 xl:relative xl:translate-x-0 xl:min-w-[300px] xl:static xl:border-l`}
    >
      <AssistantRail
        selectedAgent={selectedAgent}
        activeButton={activeButton}
        handleAssistantTabChange={handleAssistantTabChange}
      />
      <div className="flex flex-col px-4 py-6 gap-4 w-full overflow-hidden">
        <h2 className="text-2xl font-bold text-center">
          {initialAgents.find((agent) => agent.id === selectedAgent)
            ?.agentName + " Assistant"}
        </h2>
        {activeButton === "Skills" && (
          <div className="flex-grow flex flex-col gap-4 overflow-hidden">
            <h3 className="text-left text-lg ">Skills</h3>
            <div className="flex-grow overflow-y-auto scrollbar-thin">
              <div className="flex flex-grow flex-col gap-4">
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
          </div>
        )}
        {activeButton === "Updates" && (
          <div className="flex-grow flex flex-col gap-4 overflow-hidden">
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
          </div>
        )}
        {activeButton === "Engineer" && (
          <div className="flex-grow flex flex-col gap-4 overflow-hidden">
            <h3 className="text-left text-lg">Prompt Engineer</h3>
            <div className="flex-grow overflow-y-auto scrollbar-thin">
              <div className="flex flex-grow flex-col gap-4 ">
                <div className="w-full flex flex-col items-center rounded gap-1">
                  <textarea
                    value={userInput}
                    ref={inputRef}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleSendPromptGenerator();
                      }
                    }}
                    className="w-full p-2 scrollbar-thin min-h-[100px] max-h-[200px]"
                    placeholder="Ex. Marketing, IT, Finance etc"
                  />

                  <div className="bg-[#10a37f] w-full flex items-center justify-center p-2 ">
                    {isWaiting ? (
                      <FaSpinner size={20} className="animate-spin" />
                    ) : (
                      <SiOpenai
                        size={20}
                        className={` ${
                          userInput !== ""
                            ? "hover:text-blue-600 text-white cursor-pointer"
                            : "text-white/20 select-none"
                        }`}
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
        )}
        {activeButton === "Tasks" && (
          <div className="flex-grow flex flex-col gap-4 overflow-hidden">
            <h3 className="text-left text-lg">Tasks</h3>
            <div className="flex-grow overflow-y-auto scrollbar-thin">
              <div className="flex flex-grow flex-col gap-4">
                {tasks.map((task, index) => {
                  const { taskName, timeStamp } = task;
                  return (
                    <div
                      key={index}
                      className="dark:bg-white/30 dark:text-white dark:border-white/20 flex flex-col justify-between gap-3 border rounded-md text-black bg-white p-2"
                    >
                      <div className="flex justify-between">
                        <p className="break-words whitespace-pre-wrap">
                          {taskName}
                        </p>
                        <div className="flex">
                          <AiOutlineDelete
                            size={20}
                            className="cursor-pointer"
                            onClick={() => handleDeleteTask(index)}
                          />
                        </div>
                      </div>
                      <p>{new Date(timeStamp).toLocaleString()}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
        {activeButton === "Notes" && (
          <div className="flex-grow flex flex-col gap-4 overflow-hidden">
            <h3 className="text-left text-lg">Notes</h3>
            <div className="flex-grow overflow-y-auto scrollbar-thin"></div>
          </div>
        )}
        {activeButton === "Workflows" && (
          <div className="flex-grow flex flex-col gap-4 overflow-hidden">
            <h3 className="text-left text-lg">Workflows</h3>
            <div className="flex-grow overflow-y-auto scrollbar-thin">
              {ticketIsPending.ticketCreated !== undefined && (
                <div className="flex flex-grow flex-col gap-4">
                  {PROCESS_NAMES.filter(
                    (process) => ticketIsPending[process.name] !== undefined
                  ).map((process) => {
                    return (
                      <div
                        key={process.name}
                        className="flex items-center justify-between border shadow p-2"
                      >
                        <span>{process.displayName}</span>
                        {ticketIsPending[process.name] ? (
                          <AiOutlineCheck size={20} />
                        ) : (
                          process.waitingMessage &&
                          !ticketIsPending[process.name] && (
                            <span>{process.waitingMessage}</span>
                          )
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AgentAssistant;
