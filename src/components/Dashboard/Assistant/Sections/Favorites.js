"use client";

import useAssistantStore from "@/utils/store/assistant/assistantStore";
import useFavoritesStore from "@/utils/store/assistant/sections/favorites/favoritesStore";
import { useEffect } from "react";

import { AiOutlinePlus, AiOutlineDelete } from "react-icons/ai";
import { MdOutlineArrowDropUp, MdOutlineArrowDropDown } from "react-icons/md";

const Favorites = ({}) => {
  const { handlePromptAssistantInput } = useAssistantStore();
  const {
    customPrompt,
    favoritePrompts,
    showPromptIndex,
    setCustomPrompt,
    setShowPromptIndex,
    handleAddPrompt,
    handleDeletePrompt,
    initializeFavorites,
  } = useFavoritesStore();

  useEffect(() => {
    initializeFavorites();
  }, []);
  return (
    <div className="flex-grow flex flex-col gap-4 overflow-hidden">
      <h3 className="text-left text-lg">Favorites</h3>
      <div className="flex flex-col gap-1 w-full">
        <input
          value={customPrompt.promptName}
          onChange={(e) => setCustomPrompt("promptName", e.target.value)}
          className="px-2 py-1"
          placeholder="Prompt Name"
        />
        <textarea
          value={customPrompt.prompt}
          onChange={(e) => setCustomPrompt("prompt", e.target.value)}
          className="px-2 py-1 scrollbar-thin min-h-[100px] max-h-[200px]"
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
        <div className="flex flex-grow flex-col gap-4">
          {favoritePrompts.length === 0 && (
            <div className="dark:text-white/40 flex flex-col gap-2 text-black/40 italic">
              <h2 className="text-xl">Welcome to the favorites feature!</h2>
              <p className="text-sm">
                This feature allows you to create a custom `prompt name` and an
                associated `prompt` to interact with the chatbot. The prompts
                you create are saved under your favorites and you can easily use
                them to ask the chatbot anything you want, as many times as you
                want!
              </p>
              <p className="text-sm">
                To get started, simply input your desired prompt name and prompt
                text in the provided fields and click the `Add` button. Your
                favorite prompts will be listed here and can be used or deleted
                at any time. Enjoy customizing your chatbot experience!
              </p>
            </div>
          )}
          {favoritePrompts.map((prompts, index) => {
            const { promptName, prompt } = prompts;
            return (
              <div
                key={index}
                className="dark:bg-white/30 dark:text-white dark:border-white/20 flex flex-col justify-between gap-3 border rounded-md text-black bg-white p-2"
              >
                <div className="flex justify-between">
                  <p
                    className={`${
                      showPromptIndex === index
                        ? "whitespace-pre-wrap"
                        : "truncate"
                    } text-lg font-bold`}
                  >
                    {promptName}
                  </p>
                  <div className="flex gap-2">
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
  );
};

export default Favorites;
