"use client";

import useConversationStore from "@/utils/store/interaction/conversations/conversationsStore";

const ChatSearch = () => {
  const { searchValue, setSearchValue } = useConversationStore();

  return (
    <input
      value={searchValue}
      onChange={(e) => setSearchValue(e.target.value)}
      className="w-full p-1 rounded-md border"
      placeholder="Search Chats"
    />
  );
};

export default ChatSearch;
