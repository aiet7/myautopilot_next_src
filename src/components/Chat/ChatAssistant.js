"use client";

import { useState } from "react";

import { AiOutlinePlus, AiOutlineCheck, AiOutlineMinus } from "react-icons/ai";

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
  const [customPrompt, setCustomPrompt] = useState({
    name: "",
    description: "",
    prompt: "",
  });

  const [favoriteSkills, setFavoriteSkills] = useState([]);
  const [favoritePrompts, setFavoritePrompts] = useState([]);

  const handleAddCustomPrompt = () => {
    if (customPrompt.prompt) {
      setFavoritePrompts((prevState) => [...prevState, customPrompt]);
      setCustomPrompt({ name: "", description: "", prompt: "" });
    }
  };

  const handleAddToFavorites = (item, type) => {
    if (type === "skill") {
      if (handleIsInFavorites(item, type)) {
        setFavoriteSkills((prevState) =>
          prevState.filter(
            (favorite) => JSON.stringify(favorite) !== JSON.stringify(item)
          )
        );
      } else {
        setFavoriteSkills((prevState) => [...prevState, item]);
      }
    } else if (type === "prompt") {
      if (handleIsInFavorites(item, type)) {
        setFavoritePrompts((prevState) =>
          prevState.filter(
            (favorite) => JSON.stringify(favorite) !== JSON.stringify(item)
          )
        );
      } else {
        setFavoritePrompts((prevState) => [...prevState, item]);
      }
    }
  };

  const handleIsInFavorites = (item, type) => {
    if (type === "skill") {
      return favoriteSkills.some(
        (favorite) => JSON.stringify(favorite) === JSON.stringify(item)
      );
    } else if (type === "prompt") {
      return favoritePrompts.some(
        (favorite) => JSON.stringify(favorite) === JSON.stringify(item)
      );
    }
    return false;
  };

  return (
    <div
      className={`px-4 py-6 bg-gray-100 dark:bg-black absolute z-10 top-0 bottom-0 right-0 transition-all duration-300 ease-in-out transform ${
        openChatAssistant
          ? "translate-x-0 w-[300px] dark:shadow-white shadow-lg shadow-black/50"
          : "translate-x-full w-[300px]"
      } xl:relative xl:translate-x-0 xl:min-w-[300px] xl:static xl:dark:shadow-white xl:shadow-lg xl:shadow-black/50`}
    >
      <h2 className="text-2xl font-bold text-center">Agents</h2>
      <div className="py-2">
        <select
          className="w-full p-2 bg-white text-black rounded-none"
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
        <div className="flex flex-col gap-3 p-1 overflow-y-auto  flex-grow h-[18vh] scrollbar-thin md:h-[30vh]">
          {selectedAssistant === "General" &&
            generalSkills.map((generalSkill, index) => {
              const { name, description, prompt } = generalSkill;
              return (
                <div key={index} className="flex flex-col gap-1">
                  <div className="w-full flex items-center justify-between text-white font-bold bg-red-500 py-1 px-2">
                    <span
                      className="w-full cursor-pointer"
                      onClick={() => handlePromptAssistantInput(prompt)}
                    >
                      {name}
                    </span>
                    {handleIsInFavorites(generalSkill, "skill") ? (
                      <AiOutlineCheck size={30} className="cursor-pointer" />
                    ) : (
                      <AiOutlinePlus
                        onClick={() =>
                          handleAddToFavorites(generalSkill, "skill")
                        }
                        size={30}
                        className="cursor-pointer"
                      />
                    )}
                  </div>

                  <pre className="dark:bg-white/20 whitespace-pre-wrap bg-black/5 p-2 text-xs w-full">
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
                  <div className="w-full flex items-center justify-between text-white font-bold bg-red-500 py-1 px-2 ">
                    <span
                      className="w-full cursor-pointer"
                      onClick={() => handlePromptAssistantInput(prompt)}
                    >
                      {name}
                    </span>
                    {handleIsInFavorites(ITSkill, "skill") ? (
                      <AiOutlineCheck size={30} className="cursor-pointer" />
                    ) : (
                      <AiOutlinePlus
                        onClick={() => handleAddToFavorites(ITSkill, "skill")}
                        size={30}
                        className="cursor-pointer"
                      />
                    )}
                  </div>
                  <pre className="dark:bg-white/20 whitespace-pre-wrap bg-black/5 p-2 text-xs w-full">
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
                  <button className="text-white font-bold bg-red-500 py-1 w-full">
                    {name}
                  </button>
                  <pre className="dark:bg-white/20 whitespace-pre-wrap bg-black/5 p-2 text-xs w-full">
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
                  <button className="text-white font-bold bg-red-500 py-1 w-full">
                    {name}
                  </button>
                  <pre className="dark:bg-white/20 whitespace-pre-wrap bg-black/5 p-2 text-xs w-full">
                    {description}
                  </pre>
                </div>
              );
            })}
          {selectedAssistant === "Favorites" &&
            (favoriteSkills.length > 0 ? (
              favoriteSkills.map((favoriteSkill, index) => {
                const { name, description, prompt } = favoriteSkill;
                return (
                  <div key={index} className="flex flex-col items-start gap-1">
                    <div className="w-full flex items-center justify-between text-white font-bold bg-red-500 py-1 px-2">
                      <span
                        className="w-full cursor-pointer"
                        onClick={() => handlePromptAssistantInput(prompt)}
                      >
                        {name}
                      </span>
                      {handleIsInFavorites(favoriteSkill, "skill") ? (
                        <AiOutlineMinus
                          onClick={() =>
                            handleAddToFavorites(favoriteSkill, "skill")
                          }
                          size={30}
                          className="cursor-pointer"
                        />
                      ) : (
                        <AiOutlinePlus size={30} className="cursor-pointer" />
                      )}
                    </div>
                    <pre className="dark:bg-white/20 whitespace-pre-wrap bg-black/5 p-2 text-xs w-full">
                      {description}
                    </pre>
                  </div>
                );
              })
            ) : (
              <p className="text-gray-500">No skills added yet.</p>
            ))}
        </div>
        <h3 className="text-center text-lg">Prompts</h3>
        <div className="flex flex-col w-full">
          <input
            placeholder="Enter custom title..."
            className="bg-white p-1 text-black rounded-none border-b text-sm"
            value={customPrompt.name}
            onChange={(e) =>
              setCustomPrompt({ ...customPrompt, name: e.target.value })
            }
          />
          <input
            placeholder="Enter custom description..."
            className="bg-white p-1 text-black rounded-none border-b text-sm"
            value={customPrompt.description}
            onChange={(e) =>
              setCustomPrompt({ ...customPrompt, description: e.target.value })
            }
          />
          <input
            placeholder="Enter your own prompt..."
            className="bg-white p-1 text-black rounded-none text-sm"
            value={customPrompt.prompt}
            onChange={(e) =>
              setCustomPrompt({ ...customPrompt, prompt: e.target.value })
            }
          />
          <button
            onClick={handleAddCustomPrompt}
            className="dark:bg-white/40 bg-black/30 text-white p-1"
          >
            Add Prompt
          </button>
        </div>
        <div className="flex flex-col gap-3 p-1  overflow-y-auto flex-grow h-[18vh] scrollbar-thin md:h-[30vh]">
          {selectedAssistant === "General" &&
            generalPrompts.map((generalPrompt, index) => {
              const { name, description, prompt } = generalPrompt;
              return (
                <div key={index} className="flex flex-col gap-1">
                  <div className="w-full flex items-center justify-between text-white font-bold bg-blue-800 py-1 px-2">
                    <span
                      className="w-full cursor-pointer"
                      onClick={() => handlePromptAssistantInput(prompt)}
                    >
                      {name}
                    </span>
                    {handleIsInFavorites(generalPrompt, "prompt") ? (
                      <AiOutlineCheck size={30} className="cursor-pointer" />
                    ) : (
                      <AiOutlinePlus
                        onClick={() =>
                          handleAddToFavorites(generalPrompt, "prompt")
                        }
                        size={30}
                        className="cursor-pointer"
                      />
                    )}
                  </div>

                  <pre className="dark:bg-white/20 whitespace-pre-wrap bg-black/5 p-2 text-xs w-full">
                    {description}
                  </pre>
                </div>
              );
            })}
          {/*{selectedAssistant === "IT" &&
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
                          {handleIsInFavorites(example, "prompt") ? (
                            <AiOutlineCheck
                              size={30}
                              className="cursor-pointer"
                            />
                          ) : (
                            <AiOutlinePlus
                              onClick={() =>
                                handleAddToFavorites(example, "prompt")
                              }
                              size={30}
                              className="cursor-pointer"
                            />
                          )}
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
                          {handleIsInFavorites(example, "prompt") ? (
                            <AiOutlineCheck
                              size={30}
                              className="cursor-pointer"
                            />
                          ) : (
                            <AiOutlinePlus
                              onClick={() =>
                                handleAddToFavorites(example, "prompt")
                              }
                              size={30}
                              className="cursor-pointer"
                            />
                          )}
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
                          {handleIsInFavorites(example, "prompt") ? (
                            <AiOutlineCheck
                              size={30}
                              className="cursor-pointer"
                            />
                          ) : (
                            <AiOutlinePlus
                              onClick={() =>
                                handleAddToFavorites(example, "prompt")
                              }
                              size={30}
                              className="cursor-pointer"
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
            */}
          {selectedAssistant === "Favorites" &&
            (favoritePrompts.length > 0 ? (
              favoritePrompts.map((favoritePrompt, index) => {
                const { name, description, prompt } = favoritePrompt;
                return (
                  <div
                    key={index}
                    onClick={() => handlePromptAssistantInput(prompt)}
                    className="flex flex-col items-start gap-1"
                  >
                    <div className="w-full flex items-center justify-between text-white font-bold bg-blue-800 py-1 px-2">
                      <span
                        className="w-full cursor-pointer"
                        onClick={() => handlePromptAssistantInput(prompt)}
                      >
                        {name}
                      </span>
                      {handleIsInFavorites(favoritePrompt, "prompt") ? (
                        <AiOutlineMinus
                          onClick={() =>
                            handleAddToFavorites(favoritePrompt, "prompt")
                          }
                          size={30}
                          className="cursor-pointer"
                        />
                      ) : (
                        <AiOutlinePlus size={30} className="cursor-pointer" />
                      )}
                    </div>
                    <pre className="dark:bg-white/20 whitespace-pre-wrap bg-black/5 p-2 text-xs w-full">
                      {description}
                    </pre>
                  </div>
                );
              })
            ) : (
              <p className="text-gray-500">No skills added yet.</p>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ChatAssistant;
