"use client";

import { useState } from "react";

import { AiOutlinePlus } from "react-icons/ai";

import {
  generalSkills,
  generalPrompts,
} from "../../utils/prompts/generalPromptLibrary.js";
import { ITSkills, ITPrompts } from "../../utils/prompts/ITPromptLibrary.js";
import { lawSkills, lawPrompts } from "../../utils/prompts/lawPromptLibrary.js";
import {
  mathSkills,
  mathPrompts,
} from "../../utils/prompts/mathPromptLibrary.js";

const ChatAssistant = ({ openChatAssistant, handlePromptAssistantInput }) => {
  const options = ["General", "IT", "Law", "Math", "Favorites"];
  const [selectedAssistant, setSelectedAssistant] = useState("General");

  const [favoriteSkills, setFavoriteSkills] = useState([]);
  const [favoritePrompts, setFavoritePrompts] = useState([]);

  const handleAddToFavorites = (item, type) => {
    if (type === "skill") {
      setFavoriteSkills((prevState) => [...prevState, item]);
    } else if (type === "prompt") {
      setFavoritePrompts((prevState) => [...prevState, item]);
    }
  };

  return (
    <div
      className={`px-4 py-6 bg-gray-100 dark:bg-black absolute z-10 top-0 bottom-0 right-0 transition-all duration-300 ease-in-out transform ${
        openChatAssistant
          ? "translate-x-0 w-[300px] dark:shadow-white shadow-lg shadow-black/50"
          : "translate-x-full w-[300px]"
      } xl:relative xl:translate-x-0 xl:min-w-[300px] xl:static xl:dark:shadow-white xl:shadow-lg xl:shadow-black/50`}
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
                <div key={index} className="flex flex-col gap-1">
                  <button
                    onClick={() => handlePromptAssistantInput(prompt)}
                    className="w-full flex items-center justify-between text-white font-bold bg-red-500 py-1 px-2 rounded-md"
                  >
                    {name}

                    <AiOutlinePlus
                      onClick={() =>
                        handleAddToFavorites(generalSkill, "skill")
                      }
                      size={30}
                      className="cursor-pointer"
                    />
                  </button>

                  <pre className="dark:bg-white/20 whitespace-pre-wrap bg-black/5 p-2 rounded-md text-sm w-full">
                    {description}
                  </pre>
                </div>
              );
            })}
          {selectedAssistant === "IT" &&
            ITSkills.map((ITSkill, index) => {
              const { name, description, prompt } = ITSkill;
              return (
                <div key={index} className="flex flex-col items-start gap-1">
                  <button
                    onClick={() => handlePromptAssistantInput(prompt)}
                    className="w-full flex items-center justify-between text-white font-bold bg-red-500 py-1 px-2 rounded-md"
                  >
                    {name}
                    <AiOutlinePlus
                      onClick={() => handleAddToFavorites(ITSkill, "skill")}
                      size={30}
                      className="cursor-pointer"
                    />
                  </button>
                  <pre className="dark:bg-white/20 whitespace-pre-wrap bg-black/5 p-2 rounded-md text-sm w-full">
                    {description}
                  </pre>
                </div>
              );
            })}
          {selectedAssistant === "Law" &&
            lawSkills.map((lawSkill, index) => {
              const { name, description, prompt } = lawSkill;
              return (
                <div key={index} className="flex flex-col items-start gap-1">
                  <button className="text-white font-bold bg-red-500 py-1 w-full rounded-md">
                    {name}
                  </button>
                  <pre className="dark:bg-white/20 whitespace-pre-wrap bg-black/5 p-2 rounded-md text-sm w-full">
                    {description}
                  </pre>
                </div>
              );
            })}
          {selectedAssistant === "Math" &&
            mathSkills.map((mathSkill, index) => {
              const { name, description, prompt } = mathSkill;
              return (
                <div key={index} className="flex flex-col items-start gap-1">
                  <button className="text-white font-bold bg-red-500 py-1 w-full rounded-md">
                    {name}
                  </button>
                  <pre className="dark:bg-white/20 whitespace-pre-wrap bg-black/5 p-2 rounded-md text-sm w-full">
                    {description}
                  </pre>
                </div>
              );
            })}
          {selectedAssistant === "Favorites" &&
            favoriteSkills.map((favoriteSkill, index) => {
              const { name, description, prompt } = favoriteSkill;
              return (
                <div key={index} className="flex flex-col items-start gap-1">
                  <button className="text-white font-bold bg-red-500 py-1 w-full rounded-md">
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
                        <div
                          key={index}
                          className="dark:bg-white/20 flex items-center p-2 justify-between bg-black/5 rounded-md"
                        >
                          <pre
                            onClick={() => handlePromptAssistantInput(example)}
                            className="whitespace-pre-wrap  text-sm w-full cursor-pointer"
                          >
                            {example}
                          </pre>
                          <AiOutlinePlus
                            onClick={() =>
                              handleAddToFavorites(generalPrompt, "prompt")
                            }
                            size={30}
                            className="cursor-pointer"
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          {selectedAssistant === "IT" &&
            ITPrompts.map((ITPrompt, index) => {
              const { title, examples } = ITPrompt;
              return (
                <div key={index}>
                  <h4 className="font-bold">{title}</h4>
                  <div className="flex flex-col gap-2">
                    {examples.map((example, index) => {
                      return (
                        <div
                          key={index}
                          className="dark:bg-white/20 flex items-center p-2 justify-between bg-black/5  rounded-md"
                        >
                          <pre
                            onClick={() => handlePromptAssistantInput(example)}
                            className=" whitespace-pre-wrap text-sm w-full cursor-pointer"
                          >
                            {example}
                          </pre>
                          <AiOutlinePlus
                            onClick={() =>
                              handleAddToFavorites(ITPrompt, "prompt")
                            }
                            size={30}
                            className="cursor-pointer"
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          {selectedAssistant === "Law" &&
            lawPrompts.map((lawPrompt, index) => {
              const { title, examples } = lawPrompt;
              return (
                <div key={index}>
                  <h4 className="font-bold">{title}</h4>
                  <div className="flex flex-col gap-2">
                    {examples.map((example, index) => {
                      return (
                        <div
                          key={index}
                          className="dark:bg-white/20 flex items-center p-2 justify-between bg-black/5  rounded-md"
                        >
                          <pre
                            onClick={() => handlePromptAssistantInput(example)}
                            className=" whitespace-pre-wrap text-sm w-full cursor-pointer"
                          >
                            {example}
                          </pre>
                          <AiOutlinePlus
                            onClick={() =>
                              handleAddToFavorites(lawPrompt, "prompt")
                            }
                            size={30}
                            className="cursor-pointer"
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          {selectedAssistant === "Math" &&
            mathPrompts.map((mathPrompt, index) => {
              const { title, examples } = mathPrompt;
              return (
                <div key={index}>
                  <h4 className="font-bold">{title}</h4>
                  <div className="flex flex-col gap-2">
                    {examples.map((example, index) => {
                      return (
                        <div
                          key={index}
                          className="dark:bg-white/20 flex items-center p-2 justify-between bg-black/5  rounded-md"
                        >
                          <pre
                            onClick={() => handlePromptAssistantInput(example)}
                            className=" whitespace-pre-wrap text-sm w-full cursor-pointer"
                          >
                            {example}
                          </pre>
                          <AiOutlinePlus
                            onClick={() =>
                              handleAddToFavorites(mathPrompt, "prompt")
                            }
                            size={30}
                            className="cursor-pointer"
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          {selectedAssistant === "Favorites" &&
            favoritePrompts.map((favoritePrompt, index) => {
              const { title, examples } = favoritePrompt;
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
