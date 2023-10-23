"use client";

import useInteractionStore from "@/utils/store/interaction/interactionsStore";
import { BsStars } from "react-icons/bs";

const EngineerGuide = () => {
  const { handleSendMessage } = useInteractionStore();

  return (
    <div className="flex flex-col items-center justify-between p-4 text-md h-full  max-w-[700px] mx-auto">
      <div className="dark:border-white flex items-center justify-center border border-black px-12 py-2 rounded-lg font-bold">
        <BsStars size={15} />
        <span>GPT-3.5</span>
      </div>

      <div className="grid grid-cols-2 gap-2 text-sm">
        <div
          onClick={() =>
            handleSendMessage(
              "Give me ideas for setting up a secure home network."
            )
          }
          className="dark:hover:bg-white/20 hover:bg-black/20 flex flex-col  border p-4 rounded-xl w-full cursor-pointer"
        >
          <p className="font-semibold">Give me ideas</p>
          <p>for setting up a secure home network.</p>
        </div>

        <div
          onClick={() =>
            handleSendMessage(
              "Recommend a software to manage my growing photo collection."
            )
          }
          className="dark:hover:bg-white/20 hover:bg-black/20 flex flex-col border p-4 rounded-xl w-full cursor-pointer"
        >
          <p className="font-semibold">Recommend a software</p>
          <p>to manage my growing photo collection.</p>
        </div>

        <div
          onClick={() =>
            handleSendMessage(
              "Write a code snippet to fetch data from an API using JavaScript."
            )
          }
          className="dark:hover:bg-white/20 hover:bg-black/20 flex flex-col border p-4 rounded-xl w-full cursor-pointer"
        >
          <p className="font-semibold">Write a code snippet</p>
          <p>to fetch data from an API using JavaScript.</p>
        </div>

        <div
          onClick={() =>
            handleSendMessage(
              "Suggest a tool for effective remote team collaboration."
            )
          }
          className="dark:hover:bg-white/20 hover:bg-black/20 flex flex-col border p-4 rounded-xl w-full cursor-pointer"
        >
          <p className="font-semibold">Suggest a tool</p>
          <p>for effective remote team collaboration.</p>
        </div>
      </div>
    </div>
  );
};

export default EngineerGuide;
