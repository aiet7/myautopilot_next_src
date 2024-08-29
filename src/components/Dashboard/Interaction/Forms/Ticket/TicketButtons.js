"use client";

import useInteractionStore from "@/utils/store/interaction/interactionsStore";

const TicketButtons = () => {
  const {
    diagnosticQuestions,
    userButtonsSelected,
    setUserButtonsSelected,
  } = useInteractionStore();
  
  return (
    <div className="flex flex-col gap-4">
      <p className="font-bold ">
        For a faster resolution, please answer the following questions.{" "}
        <span className="uppercase">
          You can create the ticket without answering these questions if you
          like to wait longer.
        </span>
      </p>
      {diagnosticQuestions.map((item, index) => {
        const question = Object.keys(item)[0];
        const options = item[question];

        return (
          <div key={index} className="flex flex-col  gap-1">
            <p className="font-bold text-lg">{question}</p>
            <div className="flex flex-wrap gap-2">
              {options.map((option, idx) => (
                <button
                  key={idx}
                  className={`w-[160px] rounded-md border py-5 ${
                    userButtonsSelected[question] === option
                      ? "dark:bg-white/40 bg-black/20"
                      : "dark:text-white dark:hover:bg-white/40 hover:bg-black/20 text-black"
                  }`}
                  onClick={() => setUserButtonsSelected(question, option)}
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

export default TicketButtons;
