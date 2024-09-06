"use client";

import MarkedAssistant from "../../../../Marked/MarkedAssistant";

import { FaSpinner } from "react-icons/fa";
import { SiOpenai } from "react-icons/si";
import useEngineerStore from "@/utils/store/assistant/sections/iternal/engineer/engineerStore.js";
import useRefStore from "@/utils/store/assistant/ref/refStore.js";

const Engineer = () => {
  const { inputRef } = useRefStore();
  const {
    isWaiting,
    prompts,
    userInput,
    setUserInput,
    handleSendPromptGenerator,
  } = useEngineerStore();

  return (
    <div className="flex-grow flex flex-col w-full p-4">
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
          className="w-full p-2 scrollbar-thin min-h-[100px] max-h-[200px] rounded-lg"
          placeholder="A well-crafted prompt can make all the difference.  Provide us any IT topic!"
        />

        <div
          onClick={handleSendPromptGenerator}
          className={`${
            userInput !== ""
              ? "hover:text-blue-600 text-white cursor-pointer"
              : "text-white/20 select-none"
          } bg-[#10a37f] w-full flex items-center justify-center p-2 rounded-lg`}
        >
          {isWaiting ? (
            <FaSpinner size={20} className="animate-spin text-white" />
          ) : (
            <SiOpenai size={20} />
          )}
        </div>
      </div>
      <div className="flex-grow overflow-y-auto scrollbar-thin py-2 ">
        <div className="flex flex-grow flex-col gap-4 ">
          <MarkedAssistant markdown={prompts} />
        </div>
      </div>
    </div>
  );
};

export default Engineer;
