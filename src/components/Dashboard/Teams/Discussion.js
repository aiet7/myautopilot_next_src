"use client";

import { useEffect } from "react";
import MarkedInteraction from "../Marked/MarkedInteraction";
import { BsFillSendFill } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";
import { AiOutlineCheck } from "react-icons/ai";
import { HiOutlineLightBulb } from "react-icons/hi";
import { HiOutlineArrowSmallDown } from "react-icons/hi2";

import { FaSpinner } from "react-icons/fa";
import useTeamsStore from "@/utils/store/teams/teamsStore.js";
import useUiStore from "@/utils/store/ui/uiStore.js";
import useRefStore from "@/utils/store/teams/ref/refStore.js";

import { Tooltip as ReactTooltip } from "react-tooltip";

const Discussion = () => {
  const { activeTab, openRooms, handleHistoryMenu } = useUiStore();
  const {
    userInput,
    textAreaHeight,
    isAtBottom,
    isOverflowed,
    connected,
    wsIsPending,
    showSummarized,
    teamsHistories,
    currentTeamsIndex,
    handleShowSummarized,
    handleSendUserMessage,
    handleCheckScroll,
    handleScrollToBottom,
    handleTextAreaChange,
  } = useTeamsStore();

  const { inputRef, chatContainerRef, latestMessageRef } = useRefStore();

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
        if (window.innerWidth < 1023) {
          openRooms && handleHistoryMenu(false);
        }
      }}
      className={`relative flex flex-col h-full w-full ${
        openRooms && "lg:opacity-100 opacity-5 xl:ml-[350px]"
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
        className="flex-grow overflow-auto scrollbar-thin"
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

                    <MarkedInteraction
                      id={item.id}
                      markdown={displayedContent}
                    />
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
        {wsIsPending &&
          Object.values(wsIsPending).every(
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
            data-tooltip-id="Send Message"
            onClick={() => handleSendUserMessage(userInput)}
            size={25}
            className={`${
              userInput !== ""
                ? "dark:text-white dark:hover:text-blue-500 hover:text-blue-500 text-black cursor-pointer"
                : "dark:text-gray-500 text-gray-300 select-none"
            } `}
          />
          <ReactTooltip
            place="top"
            content="Send Message"
            id="Send Message"
            className="z-[99]"
          />
        </div>
      </div>
    </div>
  );
};

export default Discussion;
