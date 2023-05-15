"use client";

import { useState } from "react";
import Image from "next/image";

const ChatAssistant = ({ openChatAssistant }) => {
  return (
    <div
      className={`px-4 py-10 bg-white absolute z-10 top-0 bottom-0 right-0 transition-all duration-300 ease-in-out transform ${
        openChatAssistant
          ? "translate-x-0 w-[300px]"
          : "translate-x-[600px] w-[300px]"
      } lg:relative lg:translate-x-0 lg:w-[300px] lg:bg-transparent lg:shadow-lg lg:static`}
    >
      Testing
    </div>
  );
};

export default ChatAssistant;
