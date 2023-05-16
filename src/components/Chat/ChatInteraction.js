"use client";

import { useState } from "react";
import { AiOutlineUser, AiOutlineRobot } from "react-icons/ai";
import { BsFillMicFill, BsFillStopFill, BsFillSendFill } from "react-icons/bs";
import { FaSpinner } from "react-icons/fa";

import { parseList } from "../../utils/detectContentType.js";

const ChatInteraction = ({
  openChatHistory,
  openChatAssistant,
  currentConversationIndex,
  conversationHistory,
  setConversationHistory,
}) => {
  const [userInput, setUserInput] = useState("");
  const [isWaiting, setIsWaiting] = useState(false);

  const handleSendMail = (mailEntities) => {
    console.log(mailEntities);
  };

  const handleScheduleEvent = (message) => {
    console.log(message);
  };

  const handleCreateTicket = (message) => {
    console.log(message);
  };

  const handleAddContact = (message) => {
    console.log(message);
  };

  const handleGetEvents = (message) => {
    console.log(message);
  };

  const handleDefaultAction = (message) => {
    handleAddAssistantMessage(message);
  };

  const handleSendUserMessage = async () => {
    if (userInput.trim() !== "") {
      handleAddUserMessage(userInput);
      setIsWaiting(true);
      setUserInput("");
      try {
        const encodedMessage = encodeURIComponent(userInput);
        const response = await fetch(
          `http://localhost:8081/jarvis4?text=${encodedMessage}`
        );
        if (response.status === 200) {
          const responseBody = await response.json();
          handleProcessResponse(
            responseBody.intent,
            responseBody.mailEntities,
            responseBody.message
          );
        }
      } catch (e) {
        console.log(e);
      } finally {
        setIsWaiting(false);
      }
    }
  };

  const handleProcessResponse = (intent, mailEntities, message) => {
    switch (intent) {
      case "sendMail":
        handleSendMail(mailEntities);
        break;
      case "scheduleEvent":
        handleScheduleEvent(message);
        break;
      case "createTicket":
        handleCreateTicket(message);
        break;
      case "addContact":
        handleAddContact(message);
        break;
      case "getEvents":
        handleGetEvents(message);
        break;
      default:
        handleDefaultAction(message);
        break;
    }
  };

  const handleAddUserMessage = (message) => {
    setConversationHistory((prevState) => {
      const newConversationHistory = [...prevState];
      if (!newConversationHistory[currentConversationIndex]) {
        newConversationHistory[currentConversationIndex] = [];
      }
      newConversationHistory[currentConversationIndex].push({
        content: message,
        role: "user",
      });
      return newConversationHistory;
    });
  };

  const handleAddAssistantMessage = (message) => {
    setConversationHistory((prevState) => {
      const newConversationHistory = [...prevState];
      if (!newConversationHistory[currentConversationIndex]) {
        newConversationHistory[currentConversationIndex] = [];
      }
      newConversationHistory[currentConversationIndex].push({
        content: message,
        role: "assistant",
      });
      return newConversationHistory;
    });
  };

  return (
    <div
      className={`${
        (openChatHistory && "opacity-5") || (openChatAssistant && "opacity-5")
      } dark:bg-black transition-all duration-300 ease-in-out flex-1 flex flex-col bg-white `}
    >
      <div className="flex-1 max-h-[64vh] overflow-y-auto no-scrollbar sm:max-h-[75vh] lg:max-h-[80vh]">
        {conversationHistory[currentConversationIndex]?.map((item, index) => {
          return (
            <div
              key={index}
              className={`p-6 text-sm ${
                item.role === "user"
                  ? "dark:border-white/40 bg-black/5 border-b"
                  : "dark:bg-white/10 dark:border-white/40 border-b"
              }`}
            >
              <div className="flex gap-2">
                <span>
                  {item.role === "user" ? (
                    <AiOutlineUser size={20} />
                  ) : (
                    <AiOutlineRobot size={20} />
                  )}
                </span>
                {parseList(item.content)}
              </div>
            </div>
          );
        })}
      </div>
      <div className="p-4">
        <FaSpinner
          className={`${isWaiting ? "opacity-100" : "opacity-0"} animate-spin`}
        />
      </div>
      <div className="flex items-center gap-3 px-4 w-full">
        <input
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSendUserMessage();
            }
          }}
          value={userInput}
          placeholder="Command Your AutoPilot..."
          className="border outline-blue-500 rounded-md w-full p-4 h-[50px]"
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
