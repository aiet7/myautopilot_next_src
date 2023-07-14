"use client";

import { useState, useRef, useEffect } from "react";

import { AiOutlinePlus, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { MdOutlineArrowDropDown, MdOutlineArrowDropUp } from "react-icons/md";

import { FaSpinner } from "react-icons/fa";
import { SiOpenai } from "react-icons/si";

import { MarkedChatAssistant } from "../../utils/marked/marked.js";

import {
  generalSkills,
  generalPrompts as exampleGeneralPrompts,
} from "../../utils/prompts/generalPromptLibrary.js";

const ChatAssistant = ({
  initialUser,
  openChatAssistant,
  handlePromptAssistantInput,
}) => {
  const inputRef = useRef(null);

  const prependText =
    "Act as an expert prompt engineer. If there is an instance of another open ai gpt4 and you want it to function at its best. give me the top 5 prompts, without quotation marks around the prompts, that you would give it to gpt to get the best results by making sure to sure it at its best regarding";

  const [activeButton, setActiveButton] = useState("General");
  const [userInput, setUserInput] = useState("");
  const [prompts, setPrompts] = useState("");
  const [isWaiting, setIsWaiting] = useState(false);

  const [customPrompt, setCustomPrompt] = useState({
    promptName: "",
    prompt: "",
  });
  const [generalPrompts, setGeneralPrompts] = useState(exampleGeneralPrompts);
  const [showPromptIndex, setShowPromptIndex] = useState(null);
  const allPrompts = [...generalPrompts, ...(initialUser.favorite || [])];

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

  const handleAddPrompt = async () => {
    if (
      customPrompt.promptName.trim() !== "" &&
      customPrompt.prompt.trim() !== ""
    ) {
      setGeneralPrompts([...generalPrompts, customPrompt]);
      try {
        const response = await fetch(
          `https://etech7-wf-etech7-db-service.azuremicroservices.io/addFavorite?userId=${initialUser.id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(customPrompt),
          }
        );

        if (response.status === 200) {
          const responseBody = await response.json();
          console.log(responseBody);
        } else {
          console.log("Failed to add");
        }
      } catch (e) {
        console.log(e);
      }

      setCustomPrompt({ promptName: "", prompt: "" });
    }
  };

  const handleDeletePrompt = async (index) => {
    const promptToDelete = allPrompts[index];

    try {
      const response = await fetch(
        `https://etech7-wf-etech7-db-service.azuremicroservices.io/deleteFavorite?id=${initialUser.id}&promptName=${promptToDelete.promptName}`
      );

      if (response.status === 200) {
        const updatedPrompts = allPrompts.filter((prompt, i) => i !== index);
        setGeneralPrompts(updatedPrompts);
        console.log("delete");
      } else {
        console.log("delete failed");
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    setGeneralPrompts(exampleGeneralPrompts);
  }, []);

  return (
    <div
      className={`px-4 py-6 bg-[#f6f8fc] absolute z-10 top-0 bottom-0 right-0 transition-all duration-300 ease-in-out transform flex flex-col gap-4 ${
        openChatAssistant
          ? "translate-x-0 w-[300px] dark:shadow-white shadow-lg shadow-black/50"
          : "translate-x-full w-[300px]"
      } dark:bg-[#111111] dark:xl:border-white/20 xl:relative xl:translate-x-0 xl:min-w-[300px] xl:static xl:border-l`}
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
      )}
      {activeButton === "Favorites" && (
        <div className="flex-grow flex flex-col gap-4 overflow-hidden">
          <div className="flex flex-col gap-1 w-full">
            <input
              value={customPrompt.promptName}
              onChange={(e) =>
                setCustomPrompt({ ...customPrompt, promptName: e.target.value })
              }
              className="px-2 py-1"
              placeholder="Prompt Name"
            />
            <input
              value={customPrompt.prompt}
              onChange={(e) =>
                setCustomPrompt({ ...customPrompt, prompt: e.target.value })
              }
              className="px-2 py-1"
              placeholder="Prompt"
            />
            <button
              onClick={handleAddPrompt}
              className="flex items-center justify-center gap-1 bg-blue-800 py-2 text-white font-bold"
            >
              <AiOutlinePlus size={25} />
              Add Custom Prompt
            </button>
          </div>
          <div className="flex-grow overflow-y-auto scrollbar-thin">
            <div className="flex flex-grow flex-col gap-2">
              {allPrompts.map((prompts, index) => {
                const { promptName, prompt } = prompts;
                return (
                  <div
                    key={index}
                    className="dark:bg-white/30 dark:text-white dark:border-white/20 flex flex-col justify-between gap-3 border rounded-md text-black bg-white p-2"
                  >
                    <div className="flex items-center justify-between">
                      <p
                        className={`${
                          showPromptIndex === index
                            ? "whitespace-pre-wrap"
                            : "truncate"
                        } text-lg font-bold`}
                      >
                        {promptName}
                      </p>
                      <div className="flex items-center gap-2">
                        <AiOutlineEdit size={20} className="cursor-pointer" />
                        <AiOutlineDelete
                          size={20}
                          className="cursor-pointer"
                          onClick={() => handleDeletePrompt(index)}
                        />
                      </div>
                    </div>
                    {showPromptIndex === index && (
                      <div
                        onClick={() => handlePromptAssistantInput(prompt)}
                        className="dark:bg-white/10 bg-black/5 p-2 rounded-md cursor-pointer"
                      >
                        <pre className="whitespace-pre-wrap">{prompt}</pre>
                      </div>
                    )}
                    {showPromptIndex === index ? (
                      <MdOutlineArrowDropUp
                        size={30}
                        className="self-center cursor-pointer"
                        onClick={() => setShowPromptIndex(null)}
                      />
                    ) : (
                      <MdOutlineArrowDropDown
                        size={30}
                        className="self-center cursor-pointer"
                        onClick={() => setShowPromptIndex(index)}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatAssistant;
