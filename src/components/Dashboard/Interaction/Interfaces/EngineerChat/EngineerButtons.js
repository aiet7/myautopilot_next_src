"use client";

import useInteractionStore from "@/utils/store/interaction/interactionsStore";

const EngineerButtons = () => {
  const {
    diagnosticChatQuestions,
    userChatButtonsSelected,
    setUserChatButtonsSelected,
  } = useInteractionStore();
  return (
    <div className="flex flex-col gap-4">
      <p className="font-bold text-lg">
        {diagnosticChatQuestions?.description}
      </p>

      {diagnosticChatQuestions?.questionnaire?.map((item, index) => {
        const question = Object.keys(item)[0];
        const options = item[question];
        return (
          <div key={index} className="flex flex-col  gap-1">
            <p className="font-bold text-lg">{question}</p>
            <div className="flex flex-wrap gap-2">
              {options?.map((option, idx) => (
                <button
                  key={idx}
                  className={`w-[180px] rounded-md border py-5 ${
                    userChatButtonsSelected[question] === option
                      ? "dark:bg-white/40 bg-black/20"
                      : "dark:text-white dark:hover:bg-white/40 hover:bg-black/20 text-black"
                  }`}
                  onClick={() => setUserChatButtonsSelected(question, option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default EngineerButtons;
