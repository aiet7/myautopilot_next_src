"use client";

import { useState } from "react";

import AssistantRail from "../AssistantRail.js";
import Skills from "./Sections/Skills.js";
import Updates from "./Sections/Updates/Updates.js";
import Engineer from "./Sections/Engineer.js";
import Tasks from "./Sections/Tasks.js";
import Notes from "./Sections/Notes.js";
import Workflows from "./Sections/Workflow.js";
import Favorites from "./Sections/Favorites.js";

const Assistant = ({
  activeTab,
  tasks,
  ticketIsPending,
  initialAgents,
  initialUser,
  selectedAgent,
  openAgentAssistant,
  openChatAssistant,
  handlePromptAssistantInput,
  handleDeleteTask,
}) => {
  const [activeAssistantButton, setActiveAssistantButton] = useState("Skills");
  const selectedAgentName = initialAgents.find(
    (agent) => agent.id === selectedAgent
  )?.agentName;

  const handleAssistantTabChange = (tab) => {
    setActiveAssistantButton(tab);
  };

  return (
    <div
      className={`bg-[#f6f8fc] absolute z-10 top-0 bottom-0 right-0 transition-all duration-300 ease-in-out transform flex ${
        openAgentAssistant || openChatAssistant
          ? "translate-x-0 w-[300px] dark:shadow-white shadow-lg shadow-black/50"
          : "translate-x-full w-[300px]"
      } dark:bg-[#111111] dark:xl:border-white/20 xl:relative xl:translate-x-0 xl:min-w-[300px] xl:static xl:border-l`}
    >
      <AssistantRail
        activeTab={activeTab}
        activeAssistantButton={activeAssistantButton}
        handleAssistantTabChange={handleAssistantTabChange}
      />
      <div className="flex flex-col px-4 py-6 w-full overflow-hidden ">
        <div
          className={`${
            activeAssistantButton === "Skills"
              ? "flex-grow flex flex-col gap-4 overflow-hidden"
              : "hidden"
          }`}
        >
          <Skills
            initialAgents={initialAgents}
            selectedAgent={selectedAgent}
            handlePromptAssistantInput={handlePromptAssistantInput}
          />
        </div>
        <div
          className={`${
            activeAssistantButton === "Updates"
              ? "flex-grow flex flex-col gap-4 overflow-hidden"
              : "hidden"
          }`}
        >
          <Updates
            initialUser={initialUser}
            handlePromptAssistantInput={handlePromptAssistantInput}
          />
        </div>
        <div
          className={`${
            activeAssistantButton === "Engineer"
              ? "flex-grow flex flex-col gap-4 overflow-hidden"
              : "hidden"
          }`}
        >
          <Engineer handlePromptAssistantInput={handlePromptAssistantInput} />
        </div>
        <div
          className={`${
            activeAssistantButton === "Tasks"
              ? "flex-grow flex flex-col gap-4 overflow-hidden"
              : "hidden"
          }`}
        >
          <Tasks tasks={tasks} handleDeleteTask={handleDeleteTask} />
        </div>
        <div
          className={`${
            activeAssistantButton === "Notes"
              ? "flex-grow flex flex-col gap-4 overflow-hidden"
              : "hidden"
          }`}
        >
          <Notes />
        </div>
        <div
          className={`${
            activeAssistantButton === "Favorites"
              ? "flex-grow flex flex-col gap-4 overflow-hidden"
              : "hidden"
          }`}
        >
          <Favorites initialUser={initialUser} />
        </div>
        <div
          className={`${
            activeAssistantButton === "Workflows"
              ? "flex-grow flex flex-col gap-4 overflow-hidden"
              : "hidden"
          }`}
        >
          <Workflows ticketIsPending={ticketIsPending} />
        </div>
      </div>
    </div>
  );
};

export default Assistant;
