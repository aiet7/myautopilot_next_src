"use client";

import { useState, useRef } from "react";
import { MarkedChatAssistant } from "../../../../utils/marked/marked.js";

import { FaSpinner } from "react-icons/fa";
import { SiOpenai } from "react-icons/si";

const Engineer = ({ handlePromptAssistantInput }) => {
  const inputRef = useRef(null);

  const prependText =
    "Act as an expert prompt engineer. If there is an instance of another open ai gpt4 and you want it to function at its best. give me the top 5 prompts, without quotation marks around the prompts, that you would give it to gpt to get the best results by making sure to sure it at its best regarding";

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
              placeholder="A well-crafted prompt can make all the difference.  Provide us any topic!"
            />

            <div className="bg-[#10a37f] w-full flex items-center justify-center p-2 ">
              {isWaiting ? (
                <FaSpinner size={20} className="animate-spin text-white" />
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
  );
};

export default Engineer;
