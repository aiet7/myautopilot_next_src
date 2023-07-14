"use client";

import { useState, useEffect, useRef } from "react";

import { MarkedChatInteraction } from "@/utils/marked/marked";
import { AiOutlineUser, AiOutlineRobot } from "react-icons/ai";

import {
  BsFillMicFill,
  BsFillStopFill,
  BsFillSendFill,
  BsHandThumbsDown,
} from "react-icons/bs";

import { HiOutlineArrowSmallDown } from "react-icons/hi2";

import { FaSpinner } from "react-icons/fa";

import { trimQuotes } from "../../utils/stringManipulation.js";

const AgentInteraction = ({
  initialUser,
  selectedAgent,
  promptAssistantInput,
  conversationHistories,
  currentConversationIndices,
  setConversationHistories,
  openAgentHistory,
  openAgentAssistant,
  handleNewConversation,
  handleOpenAgentHistory,
  handleOpenAgentAssistant,
}) => {
  const latestMessageRef = useRef(null);
  const chatContainerRef = useRef(null);
  const controllerRef = useRef(null);
  const inputRef = useRef(null);

  const [userInput, setUserInput] = useState("");
  const [isWaiting, setIsWaiting] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [isOverflowed, setIsOverflowed] = useState(false);
  const [isServerError, setIsServerError] = useState(false);
  const [isFeedbackSubmitted, setIsFeedbackSubmitted] = useState(false);

  const handleSubmitFeedback = async (messageId) => {
    try {
      const cleanedMessageId = messageId.substring(0, messageId.length - 3);
      const response = await fetch(
        `https://etech7-wf-etech7-db-service.azuremicroservices.io/updateFeedback?messageId=${cleanedMessageId}&feedback=false`
      );
      if (response.status === 200) {
        setIsFeedbackSubmitted(true);
        setTimeout(() => {
          setIsFeedbackSubmitted(false);
        }, 2000);
      } else {
        console.log("feedback failed");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleSendUserMessage = async (message) => {
    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    controllerRef.current = new AbortController();

    let currentConversation;
    if (!(selectedAgent in conversationHistories)) {
      conversationHistories[selectedAgent] = [];
    }

    if (conversationHistories[selectedAgent].length === 0) {
      currentConversation = await handleNewConversation(0);
    } else {
      currentConversation =
        conversationHistories[selectedAgent][
          currentConversationIndices[selectedAgent]
        ];
    }

    if (message.trim() !== "") {
      inputRef.current.focus();

      handleAddUserMessage(message);
      setIsWaiting(true);
      setIsServerError(false);
      setUserInput("");

      try {
        const encodedMessage = encodeURIComponent(trimQuotes(message));

        const response = await fetch(
          `https://etech7-wf-etech7-clu-service.azuremicroservices.io/jarvis4?text=${encodedMessage}&conversationId=${currentConversation.id}&userId=${initialUser.id}`,
          // `http://localhost:8081/jarvis4?text=${encodedMessage}&conversationId=${currentConversation.id}&userId=${initialUser.id}`,
          {
            signal: controllerRef.current.signal,
          }
        );

        if (response.status === 200) {
          const responseBody = await response.json();
          handleProcessResponse(responseBody.intent, responseBody.message);
        } else if (response.status === 500) {
          setIsServerError(true);
        }
      } catch (e) {
        console.log(e);
      } finally {
        setIsWaiting(false);
      }
    }
  };

  const handleAbortRequest = () => {
    if (controllerRef.current) {
      controllerRef.current.abort();
      handleAddAssistantMessage(
        "Stopped generating.  Request may still be fullfilled."
      );
    }
  };

  const handleTriggerSpeech = () => {
    recognition.start();

    recognition.onresult = (event) => {
      const speechResult = event.results[0][0].transcript;
      handleSendUserMessage(speechResult);
      recognition.stop();
      setIsListening(false);
    };

    recognition.onspeechend = () => {
      recognition.stop();
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.log("Error occurred in recognition: " + event.error);
      setIsListening(false);
    };

    setIsListening(true);
  };

  const handleProcessResponse = (intent, message) => {
    switch (intent) {
      default:
        handleDefaultActionProcess(message);
        break;
    }
  };

  const handleDefaultActionProcess = async (message) => {
    handleAddAssistantMessage(message);
  };

  const handleAddUserMessage = async (message) => {
    setConversationHistories((prevState) => {
      const newConversations = { ...prevState };
      const currentAgentConversations = newConversations[selectedAgent];

      if (
        !currentAgentConversations[currentConversationIndices[selectedAgent]]
          .messages
      ) {
        currentAgentConversations[
          currentConversationIndices[selectedAgent]
        ].messages = [];
      }

      currentAgentConversations[
        currentConversationIndices[selectedAgent]
      ].messages.push({
        id: Date.now() + "-user",
        content: message,
        role: "user",
        timeStamp: new Date().toISOString(),
      });

      return newConversations;
    });
  };
  const handleAddAssistantMessage = (message) => {
    setConversationHistories((prevState) => {
      const newConversations = { ...prevState };
      const currentAgentConversations = newConversations[selectedAgent];

      if (
        !currentAgentConversations[currentConversationIndices[selectedAgent]]
          .messages
      ) {
        currentAgentConversations[
          currentConversationIndices[selectedAgent]
        ].messages = [];
      }

      currentAgentConversations[
        currentConversationIndices[selectedAgent]
      ].messages.push({
        id: Date.now() + "-ai",
        content: message,
        role: "assistant",
        timeStamp: new Date().toISOString(),
      });

      return newConversations;
    });
  };

  const handleScrollToBottom = (smooth) => {
    latestMessageRef.current?.scrollIntoView({
      behavior: smooth ? "smooth" : "auto",
      block: "end",
    });
  };

  const handleCheckScroll = () => {
    const container = chatContainerRef.current;
    const atBottom =
      Math.abs(
        container.scrollHeight - container.scrollTop - container.clientHeight
      ) < 5;
    setIsAtBottom(atBottom);
    setIsOverflowed(container.scrollHeight > container.clientHeight);
  };

  useEffect(() => {
    setUserInput(promptAssistantInput);
  }, [promptAssistantInput]);

  useEffect(() => {
    handleScrollToBottom(true);
  }, [conversationHistories]);

  useEffect(() => {
    handleScrollToBottom();
  }, [currentConversationIndices[selectedAgent]]);

  return (
    <div
      onClick={() => {
        openAgentHistory && handleOpenAgentHistory(false);
        openAgentAssistant && handleOpenAgentAssistant(false);
      }}
      className={`relative flex flex-col h-full w-full  ${
        (openAgentHistory && "lg:opacity-100 opacity-5") ||
        (openAgentAssistant && "lg:opacity-100 opacity-5")
      } dark:bg-black transition-all duration-300 ease-in-out bg-white`}
    >
      {!isAtBottom && isOverflowed && (
        <button
          onClick={handleScrollToBottom}
          className="dark:border-white/10 dark:bg-white/10 dark:text-gray-200 absolute bottom-28 right-4 rounded-full border border-gray-200 bg-gray-50 text-gray-600"
        >
          <HiOutlineArrowSmallDown className="m-1" size={18} />
        </button>
      )}
      <div
        ref={chatContainerRef}
        onScroll={handleCheckScroll}
        className="flex-grow overflow-auto no-scrollbar"
      >
        {conversationHistories[selectedAgent]?.[
          currentConversationIndices[selectedAgent]
        ]?.messages?.map((item, index, arr) => {
          return (
            <div
              key={item.id}
              className={`px-4 py-4 text-md w-full  ${
                item.role === "user"
                  ? "dark:border-white/40 bg-black/5 border-b"
                  : "dark:bg-white/10 dark:border-white/40 border-b"
              }`}
              ref={index === arr.length - 1 ? latestMessageRef : null}
            >
              <div className="flex items-start max-w-[600px] mx-auto gap-4">
                <span>
                  {item.role === "user" ? (
                    <AiOutlineUser size={20} />
                  ) : (
                    <AiOutlineRobot size={20} />
                  )}
                </span>
                <div className="flex-grow min-w-[0]">
                  {(() => {
                    switch (item.type) {
                      case "form":
                        switch (item.formType) {
                          default:
                            return null;
                        }
                      default:
                        return (
                          <MarkedChatInteraction markdown={item.content} />
                        );
                    }
                  })()}
                </div>
                <span>
                  {item.role === "assistant" && (
                    <BsHandThumbsDown
                      onClick={() => handleSubmitFeedback(item.id)}
                      size={20}
                      className="cursor-pointer select-none"
                    />
                  )}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      <div className="px-4 py-2">
        {isServerError ? (
          <p className="text-red-600 text-xs">Server Error, try again please</p>
        ) : isFeedbackSubmitted ? (
          <p className="text-yellow-500 text-xs">
            Your feedback has been submitted
          </p>
        ) : (
          <FaSpinner
            className={`${
              isWaiting ? "opacity-100" : "opacity-0"
            } animate-spin`}
          />
        )}
      </div>

      <div className="relative flex items-center px-4 py-2">
        <input
          ref={inputRef}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSendUserMessage(userInput);
            }
          }}
          value={userInput}
          placeholder="Command Your AutoPilot..."
          className="dark:bg-black bg-white border outline-blue-500 w-full px-4 h-[50px] pr-24"
        />
        <div className="flex items-center gap-3 absolute right-24 pr-2 flex items-center bottom-0 top-0">
          <BsFillSendFill
            size={25}
            onClick={() => handleSendUserMessage(userInput)}
            className={`${
              userInput !== ""
                ? "dark:text-white dark:hover:text-blue-500 hover:text-blue-500 text-black cursor-pointer"
                : "dark:text-gray-500 text-gray-300 select-none"
            } `}
          />
        </div>
        <div className="flex items-center gap-1 pl-2">
          <BsFillStopFill
            onClick={handleAbortRequest}
            size={35}
            className="hover:text-blue-500 cursor-pointer"
          />
          <BsFillMicFill
            onClick={handleTriggerSpeech}
            className={`hover:text-blue-500 ${
              isListening ? "text-blue-500" : null
            } cursor-pointer`}
            size={25}
          />
        </div>
      </div>
    </div>
  );
};

export default AgentInteraction;
