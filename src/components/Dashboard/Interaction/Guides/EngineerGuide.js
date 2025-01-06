"use client";

import useConversationStore from "@/utils/store/interaction/conversations/conversationsStore";
import useInteractionStore from "@/utils/store/interaction/interactionsStore";
import { useEffect } from "react";
import { BsStars } from "react-icons/bs";
import { GiRobotAntennas } from "react-icons/gi";

const EngineerGuide = () => {
  const { handleSendMessage } = useInteractionStore();
  const { selectedAgent, activeChatBotMode, initializePod } =
    useConversationStore();

  const examplePrompts = selectedAgent?.examplePrompts
    ? Object.entries(selectedAgent.examplePrompts).map(([title, prompt]) => ({
        title,
        prompt,
      }))
    : [];


  return (
    <div className="flex flex-col items-center justify-between p-4 h-full max-w-[700px] mx-auto text-xs">
      <div className="dark:border-white flex items-center justify-center border border-black px-12 py-2 rounded-lg font-bold">
        <BsStars size={15} />
        <span className="text-lg">AI Autopilot</span>
      </div>
      <div className="flex flex-col gap-6 items-center">
        <GiRobotAntennas size={70} />
        <p className="text-lg font-semibold">Hi, I Am Vision</p>
        <div className="flex flex-col items-center text-center">
          <h2 className="text-2xl font-bold">
            Your Specialized {activeChatBotMode}
          </h2>
          <p className="text-lg font-semibold">
            What Would You Like Me To Advice You On
          </p>
          <p>Security & Compliance, Backup & Disaster Recovery etc...</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 ">
        {examplePrompts.map((item, index) => (
          <div
            key={index}
            onClick={() => handleSendMessage(item.prompt)}
            className="dark:hover:bg-white/20 hover:bg-black/20 flex flex-col border p-4 rounded-xl w-full cursor-pointer"
          >
            <p className="font-bold">{item.title}</p>
            <p>{item.prompt}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EngineerGuide;
