"use client";

import { useState } from "react";
import { AiOutlineUser, AiOutlineRobot } from "react-icons/ai";
import { BsFillMicFill, BsFillStopFill, BsFillSendFill } from "react-icons/bs";
import { FaSpinner } from "react-icons/fa";

import { parseList } from "../../utils/detectContentType.js";

const ChatInteraction = ({
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
        setUserInput("");
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
    <div className="flex-1 flex flex-col">
      <div className="flex-1 flex flex-col max-h-[65vh] pt-11 overflow-auto no-scrollbar sm:max-h-[80vh]">
        {conversationHistory[currentConversationIndex]?.map((item, index) => {
          return (
            <div
              key={index}
              className={`p-4 ${
                item.role === "user" ? "bg-gray-100" : "bg-gray-200 "
              }`}
            >
              <div className="flex gap-3 items-start">
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
      <div className="pt-4 px-4">
        <FaSpinner
          className={`${isWaiting ? "opacity-100" : "opacity-0"} animate-spin`}
        />
      </div>
      <div className="flex items-center gap-4 py-4 px-4">
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
          className="w-full h-[55px] p-4 text-lg border-2"
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
