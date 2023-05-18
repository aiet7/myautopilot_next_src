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

  const [selectedEmailIndex, setSelectedEmailIndex] = useState(null);
  const [selectedEmailId, setSelectedEmailId] = useState("");

  const [currentEmailId, setCurrentEmailId] = useState("");
  const [currentEmailSubject, setCurrentEmailSubject] = useState("");
  const [currentEmailBody, setCurrentEmailBody] = useState("");
  const [availableEmailIds, setAvailableEmailIds] = useState([]);

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

  const handleEmailSelection = (email, emailIndex) => {
    setSelectedEmailIndex(emailIndex);
    setSelectedEmailId(email);
  };

  const handleEmailConfirmation = async (isConfirmed) => {
    if (isConfirmed) {
      try {
        const encodedEmailId = encodeURIComponent(selectedEmailId);
        const encodedSubject = encodeURIComponent(currentEmailSubject);
        const encodedBody = encodeURIComponent(currentEmailBody);

        const emailResponse = await fetch(
          `http://localhost:8082/graph?mailId=${encodedEmailId}&subject=${encodedSubject}&body=${encodedBody}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
          }
        );
        if (emailResponse.status === 200) {
          handleAddAssistantMessage("Email Sent!", null);
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      handleAddAssistantMessage("Email Cancelled!", null);
    }
  };

  const handleProcessResponse = (intent, mailEntities, message) => {
    switch (intent) {
      case "sendMail":
        handleEmailProcess(mailEntities);
        break;
      case "scheduleEvent":
        handleScheduleProcess(message);
        break;
      case "createTicket":
        handleCreateTicketProcess(message);
        break;
      case "addContact":
        handleAddContactProcess(message);
        break;
      case "getEvents":
        handleGetEventsProcess(message);
        break;
      default:
        handleDefaultActionProcess(message);
        break;
    }
  };

  const handleEmailProcess = (mailEntities) => {
    const { mailID, subject, body, emailIDs } = mailEntities;
    if (emailIDs && emailIDs.length !== 0) {
      handleAddAssistantMessage(null, "emailButtons + emailForm");
      setAvailableEmailIds(emailIDs);
      setCurrentEmailSubject(subject);
      setCurrentEmailBody(body);
    } else {
      handleAddAssistantMessage(null, "emailForm");
      setCurrentEmailId(mailID);
      setCurrentEmailSubject(subject);
      setCurrentEmailBody(body);
    }
  };

  const handleScheduleProcess = (message) => {
    console.log(message);
  };

  const handleCreateTicketProcess = (message) => {
    console.log(message);
  };

  const handleAddContactProcess = (message) => {
    console.log(message);
  };

  const handleGetEventsProcess = (message) => {
    console.log(message);
  };

  const handleDefaultActionProcess = (message) => {
    handleAddAssistantMessage(message, null);
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

  const handleAddAssistantMessage = (message, componentType) => {
    setConversationHistory((prevState) => {
      const newConversationHistory = [...prevState];
      if (!newConversationHistory[currentConversationIndex]) {
        newConversationHistory[currentConversationIndex] = [];
      }
      newConversationHistory[currentConversationIndex].push({
        content: message,
        role: "assistant",
        componentType: componentType,
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
      <div className=" flex-grow overflow-auto no-scrollbar ">
        {conversationHistory[currentConversationIndex]?.map((item, index) => {
          return (
            <div
              key={index}
              className={`px-4 py-4 text-md w-full  ${
                item.role === "user"
                  ? "dark:border-white/40 bg-black/5 border-b"
                  : "dark:bg-white/10 dark:border-white/40 border-b"
              }`}
            >
              <div className="flex items-start max-w-[800px] mx-auto gap-4">
                <span>
                  {item.role === "user" ? (
                    <AiOutlineUser size={20} />
                  ) : (
                    <AiOutlineRobot size={20} />
                  )}
                </span>
                <div className="flex-grow">
                  {item.componentType
                    ? (() => {
                        switch (item.componentType) {
                          case "emailButtons + emailForm":
                            return (
                              <div className="flex flex-col gap-6">
                                <p>Please select an email address.</p>
                                <div className="flex gap-2">
                                  {availableEmailIds.map((email, index) => (
                                    <button
                                      key={index}
                                      onClick={() =>
                                        handleEmailSelection(email, index)
                                      }
                                      className={`${
                                        selectedEmailIndex === index
                                          ? "bg-blue-900"
                                          : "bg-gray-500"
                                      }  text-white px-4 py-2 rounded-md`}
                                    >
                                      {email}
                                    </button>
                                  ))}
                                </div>
                                <div>
                                  <div>
                                    <span className="font-bold">Email</span>
                                    <input
                                      className="h-[50px] border outline-blue-500 w-full px-4"
                                      value={selectedEmailId}
                                      onChange={(e) =>
                                        setSelectedEmailId(e.target.value)
                                      }
                                    />
                                  </div>
                                  <div>
                                    <span className="font-bold">Subject</span>
                                    <input
                                      className="h-[50px] border outline-blue-500 w-full px-4"
                                      value={currentEmailSubject}
                                      onChange={(e) =>
                                        setCurrentEmailSubject(e.target.value)
                                      }
                                    />
                                  </div>
                                  <div>
                                    <span className="font-bold">Body</span>
                                    <textarea
                                      className="h-[200px] border outline-blue-500 w-full px-4 resize-none"
                                      value={currentEmailBody}
                                      onChange={(e) =>
                                        setCurrentEmailBody(e.target.value)
                                      }
                                    />
                                  </div>
                                </div>
                                <div className="flex items-center gap-4">
                                  <button
                                    className="bg-green-300 rounded-md px-3 py-2 text-white"
                                    onClick={() =>
                                      handleEmailConfirmation(true)
                                    }
                                  >
                                    Send Email
                                  </button>
                                  <button
                                    className="bg-red-300 rounded-md px-3 py-2 text-white"
                                    onClick={() =>
                                      handleEmailConfirmation(false)
                                    }
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            );
                          case "emailForm":
                            return (
                              <div className="flex flex-col gap-6">
                                <div>
                                  <div>
                                    <span className="font-bold">Email</span>
                                    <input
                                      className="h-[50px] border outline-blue-500 w-full px-4"
                                      value={currentEmailId}
                                      onChange={(e) =>
                                        setCurrentEmailId(e.target.value)
                                      }
                                    />
                                  </div>
                                  <div>
                                    <span className="font-bold">Subject</span>
                                    <input
                                      className="h-[50px] border outline-blue-500 w-full px-4"
                                      value={currentEmailSubject}
                                      onChange={(e) =>
                                        setCurrentEmailSubject(e.target.value)
                                      }
                                    />
                                  </div>
                                  <div>
                                    <span className="font-bold">Body</span>
                                    <textarea
                                      className="h-[200px] border outline-blue-500 w-full px-4 resize-none"
                                      value={currentEmailBody}
                                      onChange={(e) =>
                                        setCurrentEmailBody(e.target.value)
                                      }
                                    />
                                  </div>
                                </div>
                                <div className="flex items-center gap-4">
                                  <button
                                    className="bg-green-300 rounded-md px-3 py-2 text-white"
                                    onClick={() =>
                                      handleEmailConfirmation(true)
                                    }
                                  >
                                    Send Email
                                  </button>
                                  <button
                                    className="bg-red-300 rounded-md px-3 py-2 text-white"
                                    onClick={() =>
                                      handleEmailConfirmation(false)
                                    }
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            );

                          default:
                            return null;
                        }
                      })()
                    : parseList(item.content)}
                </div>
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
