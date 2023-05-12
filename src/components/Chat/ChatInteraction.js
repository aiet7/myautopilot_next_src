"use client";

import { useState } from "react";
import { BsFillMicFill, BsFillStopFill, BsFillSendFill } from "react-icons/bs";

const ChatInteraction = ({ conversationHistory }) => {
  const [userInput, setUserInput] = useState("");


  /*const addUserMessage = (message) => {
    const updatedConversation = [...conversationHistory];
    const currentConversation =
      updatedConversation[updatedConversation.length - 1];
    currentConversation.push({ content: message, role: "user" });
  };

  const addAssistantMessage = (message, isSent) => {
    const updatedConversation = [...conversationHistory];
    const currentConversation =
      updatedConversation[updatedConversation.length - 1];
    currentConversation.push({ content: message, isSent, role: "assistant" });
  };*/

  const handleSendUserMessage = async () => {
    if (userInput.trim() !== "") {
      try {
        const encodedMessage = encodeURIComponent(userInput);
        const response = await fetch(
          `http://localhost:8081/jarvis4?text=${encodedMessage}`
        );
        if (response.status === 200) {
          const responseBody = await response.text();
          console.log(responseBody);
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <div className="flex-1 flex flex-col p-4">
      <div className="flex-1">Chat Interaction here...</div>
      <div className="flex items-center gap-3">
        <input
          onChange={(e) => setUserInput(e.target.value)}
          value={userInput}
          placeholder="Command Your AutoPilot..."
          className="w-full h-[60px] p-4 text-lg border-2"
        />
        <BsFillSendFill
          size={25}
          onClick={handleSendUserMessage}
          className="cursor-pointer"
        />
        <BsFillMicFill size={25} className="cursor-pointer" />
        <BsFillStopFill size={25} className="cursor-pointer" />
      </div>
    </div>
  );
};

export default ChatInteraction;
