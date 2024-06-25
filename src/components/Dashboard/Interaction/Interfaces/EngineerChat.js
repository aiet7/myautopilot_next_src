"use client";

import { useEffect } from "react";
import useUserStore from "@/utils/store/user/userStore";
import useInteractionStore from "@/utils/store/interaction/interactionsStore";
import useRefStore from "@/utils/store/interaction/ref/refStore";
import Switch from "../Forms/Switch";
import useConversationStore from "@/utils/store/interaction/conversations/conversationsStore";
import EngineerGuide from "../Guides/EngineerGuide";
import { SiOpenai } from "react-icons/si";

const EngineerChat = () => {
  const { user } = useUserStore();
  const {
    conversationHistories,
    currentConversationIndex,
    troubleshootingConversationId,
  } = useConversationStore();
  const { handleScrollToBottom, handleCheckScroll } = useInteractionStore();
  const { latestMessageRef, chatContainerRef } = useRefStore();

  useEffect(() => {
    handleScrollToBottom(true);
  }, [conversationHistories]);

  useEffect(() => {
    handleScrollToBottom(false);
  }, [currentConversationIndex]);

 
  return (
    <div
      className="flex-grow overflow-auto scrollbar-thin"
      ref={chatContainerRef}
      onScroll={handleCheckScroll}
    >
      {conversationHistories[currentConversationIndex]?.messages ===
        undefined && <EngineerGuide />}
      {conversationHistories[currentConversationIndex]?.messages?.map(
        (item, index, arr) => {
          return (
            <div
              key={item.id}
              className={`px-4 py-4  w-full ${
                item.role === "user"
                  ? "dark:border-white/40 bg-black/5 border-b"
                  : "dark:bg-white/10 dark:border-white/40 border-b"
              }`}
              ref={index === arr.length - 1 ? latestMessageRef : null}
            >
              <div className="max-w-[450px] 2xl:max-w-[700px] flex items-start gap-4 mx-auto">
                <span>
                  {item.role === "user" ? (
                    <div className="w-7 h-7  bg-blue-800 flex justify-center items-center text-white">
                      {user?.firstName[0]}
                    </div>
                  ) : (
                    <div className="w-7 h-7  bg-[#ab68ff]  flex justify-center items-center text-white">
                      <SiOpenai />
                    </div>
                  )}
                </span>

                <div className="flex-grow min-w-[0]">
                  <Switch item={item} itemId={item.id} />
                </div>
              </div>
            </div>
          );
        }
      )}
    </div>
  );
};

export default EngineerChat;
