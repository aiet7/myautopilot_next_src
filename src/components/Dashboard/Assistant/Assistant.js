"use client";

import { useState } from "react";

import AssistantRail from "../AssistantRail.js";
import Skills from "./Sections/Skills.js";
import Updates from "./Sections/Updates.js";
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
      <div className="flex flex-col px-4 py-6 gap-4 w-full overflow-hidden">
        <h2 className="text-2xl font-bold text-center">
          {initialAgents.find((agent) => agent.id === selectedAgent)
            ?.agentName === "General Agent"
            ? "MyAutoPilot"
            : initialAgents.find((agent) => agent.id === selectedAgent)
                ?.agentName + " Assistant"}
        </h2>
        {activeAssistantButton === "Skills" && (
          <Skills
            initialAgents={initialAgents}
            selectedAgent={selectedAgent}
            handlePromptAssistantInput={handlePromptAssistantInput}
          />
        )}
        {activeAssistantButton === "Updates" && (
          <Updates handlePromptAssistantInput={handlePromptAssistantInput} />
        )}
        {activeAssistantButton === "Engineer" && (
          <Engineer handlePromptAssistantInput={handlePromptAssistantInput} />
        )}
        {activeAssistantButton === "Tasks" && (
          <Tasks tasks={tasks} handleDeleteTask={handleDeleteTask} />
        )}
        {activeAssistantButton === "Notes" && <Notes />}
        {activeAssistantButton === "Favorites" && (
          <Favorites initialUser={initialUser} />
        )}
        {activeAssistantButton === "Workflows" && (
          <Workflows ticketIsPending={ticketIsPending} />
        )}
      </div>
    </div>
  );
};

export default Assistant;
