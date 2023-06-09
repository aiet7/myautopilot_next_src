"use client";

import { useState, useRef } from "react";

import { AiOutlinePlus, AiOutlineCheck, AiOutlineMinus } from "react-icons/ai";
import { FaSpinner } from "react-icons/fa";
import { SiOpenai } from "react-icons/si";

import { MarkedChatAssistant } from "../../utils/marked/marked.js";

import { generalSkills } from "../../utils/prompts/generalPromptLibrary.js";

const ChatAssistant = ({ openChatAssistant, handlePromptAssistantInput }) => {
  const inputRef = useRef(null);

  const prependText =
    "Act as an expert prompt engineer. If there is an instance of another open ai gpt4 and you want it to function at its best. give me the top 5 prompts, without quotation marks around the prompts, that you would give it to gpt to get the best results by making sure to sure it at its best regarding";

  const [activeButton, setActiveButton] = useState("General");
  const [userInput, setUserInput] = useState("");
  const [prompts, setPrompts] = useState("");
  const [isWaiting, setIsWaiting] = useState(false);

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
      className={`px-4 py-6 bg-gray-100 dark:bg-black absolute z-10 top-0 bottom-0 right-0 transition-all duration-300 ease-in-out transform flex flex-col gap-4 ${
        openChatAssistant
          ? "translate-x-0 w-[300px] dark:shadow-white shadow-lg shadow-black/50"
          : "translate-x-full w-[300px]"
      } xl:relative xl:translate-x-0 xl:min-w-[300px] xl:static xl:dark:shadow-white xl:shadow-lg xl:shadow-black/50`}
    >
      <h2 className="text-2xl font-bold text-center">AI Assistant</h2>
      <div className="dark:bg-white/20 bg-white flex items-center w-full  rounded-md">
        <button
          onClick={() => setActiveButton("General")}
          className={`${
            activeButton === "General" && "bg-blue-800 text-white"
          }  w-full m-1 p-2 rounded-md`}
        >
          General
        </button>
        <button
          onClick={() => setActiveButton("Favorites")}
          className={`${
            activeButton === "Favorites" && "bg-blue-800 text-white"
          }  w-full m-1 p-2 rounded-md`}
        >
          Favorites
        </button>
      </div>

      {activeButton === "General" && (
        <div className="flex-grow flex flex-col gap-4 overflow-hidden">
          <h3 className="text-left text-lg">Skills</h3>
          <div className="flex-grow overflow-y-auto scrollbar-thin">
            <div className="flex flex-grow flex-col gap-4 px-1">
              {generalSkills.map((generalSkill, index) => {
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
                      <AiOutlinePlus size={30} className="cursor-pointer" />
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
      )}
    </div>
  );
};

export default ChatAssistant;
