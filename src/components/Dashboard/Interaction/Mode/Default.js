"use client";

import { useEffect } from "react";

import EngineerGuide from "../Guides/EngineerGuide";
import DocumentGuide from "../Guides/DocumentGuide";
import TicketGuide from "../Guides/TicketGuide";

import { SiOpenai } from "react-icons/si";
import Switch from "../Forms/Switch";

import useConversationStore from "@/utils/store/interaction/conversations/conversationsStore";
import useDocConversationsStore from "@/utils/store/interaction/conversations/docConversationsStore";
import useUiStore from "@/utils/store/ui/uiStore";
import useRefStore from "@/utils/store/interaction/ref/refStore";
import useAssistantStore from "@/utils/store/assistant/assistantStore";
import useTicketConversationsStore from "@/utils/store/interaction/conversations/ticketConversationsStore";
import useInteractionStore from "@/utils/store/interaction/interactionsStore";
import useTechStore from "@/utils/store/user/techStore";

const Default = () => {
  const { tech } = useTechStore()
  const { openDocs, openHistory, openAssistant } = useUiStore();
  const { messages } = useTicketConversationsStore();
  const { conversationHistories, currentConversationIndex } =
    useConversationStore();
  const { documentConversationHistories, currentDocumentConversationIndex } =
    useDocConversationsStore();
  const { latestMessageRef, chatContainerRef } = useRefStore();

  const { handleScrollToBottom, handleCheckScroll } = useInteractionStore();
  const { activeUIAssistantTab } = useAssistantStore();

  useEffect(() => {
    handleScrollToBottom(true);
  }, [conversationHistories, documentConversationHistories]);

  useEffect(() => {
    handleScrollToBottom(false);
  }, [currentConversationIndex, currentDocumentConversationIndex]);

  const messagesToRender = (() => {
    switch (activeUIAssistantTab) {
      case "Engineer":
        return conversationHistories[currentConversationIndex]?.messages;
      case "Document":
        return documentConversationHistories[currentDocumentConversationIndex]
          ?.messages;
      case "Tickets":
        return messages;
    }
  })();

  return (
    <div
      className="flex-grow overflow-auto scrollbar-thin"
      ref={chatContainerRef}
      onScroll={handleCheckScroll}
    >
      {messagesToRender === undefined &&
        activeUIAssistantTab === "Engineer" && <EngineerGuide />}
      {messagesToRender === undefined &&
        activeUIAssistantTab === "Document" && <DocumentGuide />}
      {messagesToRender?.length === 0 && activeUIAssistantTab === "Tickets" && (
        <TicketGuide />
      )}
      {messagesToRender?.map((item, index, arr) => {
        return (
          <div
            key={item.id}
            className={`px-4 py-4 text-md w-full ${item.role === "user"
              ? "dark:border-white/40 bg-black/5 border-b"
              : "dark:bg-white/10 dark:border-white/40 border-b"
              }`}
            ref={index === arr.length - 1 ? latestMessageRef : null}
          >
            <div
              className={`
         ${!openHistory && activeUIAssistantTab !== "Tickets" && "max-w-[700px]"
                } 
         ${!openAssistant &&
                activeUIAssistantTab !== "Tickets" &&
                "max-w-[700px]"
                }
         ${!openDocs && activeUIAssistantTab !== "Tickets" && "max-w-[700px]"}
        
         ${activeUIAssistantTab === "Tickets"
                  ? "max-w-[1250px]"
                  : "max-w-[450px] 2xl:max-w-[700px]"
                } flex items-start gap-4 mx-auto`}
            >
              <span>
                {item.role === "user" ? (
                  <div className="w-7 h-7 text-sm bg-blue-800  flex justify-center items-center text-white">
                    {tech?.firstName[0]}
                  </div>
                ) : (
                  <>
                    {activeUIAssistantTab === "Engineer" ? (
                      <div className="w-7 h-7 text-sm bg-[#ab68ff]  flex justify-center items-center text-white">
                        <SiOpenai />
                      </div>
                    ) : (
                      <div className="w-7 h-7 text-sm bg-[#00AEEE]  flex justify-center items-center text-white">
                        E7
                      </div>
                    )}
                  </>
                )}
              </span>

              <div className="flex-grow min-w-[0]">
                <Switch item={item} itemId={item.id} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Default;
