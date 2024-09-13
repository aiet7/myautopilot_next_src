"use client";

import History from "./History";

const ChatBot = () => {

  return (
    <div className="flex-grow overflow-y-auto flex flex-col">
      <History />
    </div>
  );
};

export default ChatBot;
