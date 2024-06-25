"use client";

import useTicketConversationsStore from "@/utils/store/interaction/conversations/ticketConversationsStore";
import TicketGuide from "../Guides/TicketGuide";
import useUserStore from "@/utils/store/user/userStore";
import useInteractionStore from "@/utils/store/interaction/interactionsStore";
import useRefStore from "@/utils/store/interaction/ref/refStore";
import Switch from "../Forms/Switch";

const TicketCreation = () => {
  const { user } = useUserStore();
  const { messages } = useTicketConversationsStore();
  const { handleCheckScroll } = useInteractionStore();
  const { latestMessageRef, chatContainerRef } = useRefStore();

  return (
    <div
      className="flex-grow overflow-auto scrollbar-thin"
      ref={chatContainerRef}
      onScroll={handleCheckScroll}
    >
      {messages?.length === 0 && <TicketGuide />}
      {messages?.map((item, index, arr) => {
        return (
          <div
            key={item.id}
            className={`px-4 py-4 text-md w-full ${
              item.role === "user"
                ? "dark:border-white/40 bg-black/5 border-b"
                : "dark:bg-white/10 dark:border-white/40 border-b"
            }`}
            ref={index === arr.length - 1 ? latestMessageRef : null}
          >
            <div className="max-w-[1250px] flex items-start gap-4 mx-auto">
              <span>
                {item.role === "user" ? (
                  <div className="w-7 h-7 bg-blue-800 flex justify-center items-center text-white">
                    {user?.firstName[0]}
                  </div>
                ) : (
                  <div className="w-7 h-7  bg-[#00AEEE] flex justify-center items-center text-white">
                    E7
                  </div>
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

export default TicketCreation;
