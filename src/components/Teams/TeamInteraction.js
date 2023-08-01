"use client";

import { useState, useEffect, useRef } from "react";
import { MarkedChatInteraction } from "../../utils/marked/marked.js";
import { BsFillSendFill } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";
import { AiOutlineCheck } from "react-icons/ai";
import { HiOutlineLightBulb } from "react-icons/hi";
import { HiOutlineArrowSmallDown } from "react-icons/hi2";

import { FaSpinner } from "react-icons/fa";

const TeamInteraction = ({
  showSummarized,
  connected,
  wsIsPending,
  activeTab,
  teamsHistories,
  currentTeamsIndex,
  setTeamsHistories,
  openTeamsHistory,
  openTeamsAssistant,
  handleConnectToWebSocket,
  handleShowSummarized,
  handleOpenTeamsHistory,
  handleOpenTeamsAssistant,
}) => {

  const inputRef = useRef(null);
  const chatContainerRef = useRef(null);

  const latestMessageRef = useRef(null);

  const [userInput, setUserInput] = useState("");
  const [textAreaHeight, setTextAreaHeight] = useState("24px");

  const [isAtBottom, setIsAtBottom] = useState(false);
  const [isOverflowed, setIsOverflowed] = useState(false);

  const handleSendUserMessage = (message) => {
    if (message.trim() !== "") {
      handleAddUserMessage(message);
      setUserInput("");
      try {
        handleConnectToWebSocket(teamsHistories[currentTeamsIndex].id, message);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const handleAddUserMessage = (message) => {
    setTeamsHistories((prevState) => {
      const newHistories = [...prevState];
      newHistories[currentTeamsIndex].messages.push({
        id: Date.now() + "-user",
        originalContent: message,
        summarizedContent: null,
        role: "user",
        timeStamp: new Date().toISOString(),
      });
      return newHistories;
    });
  };

  const handleTextAreaChange = (e) => {
    setUserInput(e.target.value);
    setTextAreaHeight(`${e.target.scrollHeight}px`);
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
    if (inputRef.current) {
      inputRef.current.style.height = "24px";
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
  }, [userInput, activeTab]);

  useEffect(() => {
    handleScrollToBottom(true);
  }, [currentTeamsIndex]);

  useEffect(() => {
    if (activeTab === "teams") {
      handleScrollToBottom();
    }
  }, [activeTab]);

  return (
    <div
      onClick={() => {
        openTeamsHistory && handleOpenTeamsHistory(false);
        openTeamsAssistant && handleOpenTeamsAssistant(false);
      }}
      className={`relative flex flex-col h-full w-full ${
        (openTeamsHistory && "lg:opacity-100 opacity-5") ||
        (openTeamsAssistant && "lg:opacity-100 opacity-5")
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
        {teamsHistories[currentTeamsIndex]?.messages?.map(
          (item, index, arr) => {
            const displayedContent =
              item.role !== "user" && showSummarized
                ? item.summarizedContent || "Summarizing..."
                : item.originalContent || "";
            return (
              <div
                key={item.id}
                className={`px-4 py-4 text-md w-full ${
                  item.role === "user"
                    ? "dark:border-white/40 bg-black/5 border-b border-t"
                    : ""
                }`}
                ref={index === arr.length - 1 ? latestMessageRef : null}
              >
                <div className=" flex items-start max-w-[900px] mx-auto gap-4">
                  <span>
                    {item.role === "user" ? (
                      <AiOutlineUser size={20} />
                    ) : (
                      <HiOutlineLightBulb size={20} />
                    )}
                  </span>
                  <div>
                    {item.role !== "user" && (
                      <p className="text-lg font-bold">{item.role}</p>
                    )}

                    <MarkedChatInteraction markdown={displayedContent} />
                  </div>
                </div>
              </div>
            );
          }
        )}
      </div>
      <div className="flex justify-between px-4 py-2">
        <div className="flex items-center gap-4">
          {connected &&
            Object.entries(wsIsPending).map(([topic, { role, status }]) => {
              return (
                <div key={topic} className="flex items-center gap-2">
                  <span>{role}</span>
                  {status === "pending" ? (
                    <FaSpinner className="animate-spin" />
                  ) : (
                    <AiOutlineCheck className="text-green-500" />
                  )}
                </div>
              );
            })}
        </div>
        {Object.values(wsIsPending).every(
          (statusObj) => statusObj.status === "complete"
        ) &&
          teamsHistories[currentTeamsIndex]?.messages?.length > 0 && (
            <button
              className="bg-blue-800 text-white px-4 rounded-sm  w-[150px]"
              onClick={handleShowSummarized}
            >
              {showSummarized ? "Original" : "Summarize"}
            </button>
          )}
      </div>
      <div className="relative flex items-center px-4 py-2">
        <textarea
          ref={inputRef}
          onChange={handleTextAreaChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSendUserMessage(userInput);
            }
          }}
          value={userInput}
          placeholder="Discuss..."
          className="dark:bg-black bg-white border outline-blue-500 w-full p-4 pr-24 resize-none no-scrollbar"
          style={{
            height: textAreaHeight,
            maxHeight: "200px",
          }}
          disabled={
            !teamsHistories[teamsHistories.length - 1]?.roomIndustry ||
            !teamsHistories[teamsHistories.length - 1]?.roomUserInput
          }
        />

        <div className="flex items-center gap-3 absolute right-6 pr-2 flex items-center bottom-0 top-0">
          <BsFillSendFill
            onClick={() => handleSendUserMessage(userInput)}
            size={25}
            className={`${
              userInput !== ""
                ? "dark:text-white dark:hover:text-blue-500 hover:text-blue-500 text-black cursor-pointer"
                : "dark:text-gray-500 text-gray-300 select-none"
            } `}
          />
        </div>
      </div>
    </div>
  );
};

export default TeamInteraction;
