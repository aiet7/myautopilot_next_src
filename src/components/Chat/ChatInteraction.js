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
          `https://etech7-wf-etech7-worflow-2.azuremicroservices.io/send?message=${encodedMessage}`
        );
        if (response.status === 200) {
          const responseBody = await response.json();
          handleProcessResponse(
            responseBody.intent,
            responseBody.mailEntities,
            responseBody.data
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
      className={`flex flex-col h-full w-full  ${
        (openChatHistory && "opacity-5") || (openChatAssistant && "opacity-5")
      } dark:bg-black transition-all duration-300 ease-in-out bg-white`}
    >
      <div className="flex-grow overflow-auto no-scrollbar ">
        {conversationHistory[currentConversationIndex]?.map((item, index) => {
          return (
            <div
              key={index}
              className={`p-2 py-4 text-md  ${
                item.role === "user"
                  ? "dark:border-white/40 bg-black/5 border-b"
                  : "dark:bg-white/10 dark:border-white/40 border-b"
              }`}
            >
              <div className="flex gap-2 mx-auto max-w-[600px]">
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
      <div className="px-4 py-2 ">
        <FaSpinner
          className={`${isWaiting ? "opacity-100" : "opacity-0"} animate-spin`}
        />
      </div>
      <div className="flex items-center gap-3 px-4 py-2">
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
          className="border outline-blue-500 w-full px-4 h-[50px]"
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
