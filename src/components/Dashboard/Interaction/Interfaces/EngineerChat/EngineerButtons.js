"use client";

import useInteractionStore from "@/utils/store/interaction/interactionsStore";

const EngineerButtons = () => {
  const {
    userChatButtonsSelected,
    setUserChatButtonsSelected,
  } = useInteractionStore();


  return (
    <div className="flex flex-col gap-4">
      

      <div className="flex justify-between">
        {interactiveElements?.some((item) => item.type === "Question") && (
          <div className="w-full">
            <p className="font-bold text-lg">Questions</p>
            {interactiveElements?.map((item, index) => {
              if (item.type === "Question" && item.options?.length) {
                return (
                  <div key={index} className="flex flex-col gap-1">
                    <p className="font-bold text-md">{item.content}</p>
                    <div className="flex flex-wrap gap-2">
                      {item.options?.map((option, idx) => (
                        <button
                          key={idx}
                          className={`w-[180px] rounded-md border py-5 ${
                            userChatButtonsSelected[item.content] === option
                              ? "dark:bg-white/40 bg-black/20"
                              : "dark:text-white dark:hover:bg-white/40 hover:bg-black/20 text-black"
                          }`}
                          onClick={() => {
                            setUserChatButtonsSelected(item.content, option);
                          }}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              }
              return null;
            })}
          </div>
        )}
        {interactiveElements?.some((item) => item.type === "Guidance") && (
          <div className="w-full">
            <p className="font-bold text-lg">Guidance</p>
            {interactiveElements?.map((item, index) => {
              if (item.type === "Guidance") {
                return (
                  <div key={index} className="flex flex-col gap-1">
                    <p className="font-bold text-md">{item.content}</p>
                    {item.options && (
                      <div className="flex flex-wrap gap-2">
                        {item.options.map((option, idx) => (
                          <button
                            key={idx}
                            className="w-[180px] rounded-md border py-5 dark:text-white dark:hover:bg-white/40 hover:bg-black/20 text-black"
                            onClick={() => {
                              setUserChatButtonsSelected(item.content, option);
                            }}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }
              return null;
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default EngineerButtons;
