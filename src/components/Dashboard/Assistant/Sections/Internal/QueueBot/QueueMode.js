"use client";

import useQueueStore from "@/utils/store/interaction/queue/queueStore";
import useAssistantStore from "@/utils/store/assistant/assistantStore";
import useUserStore from "@/utils/store/user/userStore";

const QueueMode = () => {
  const { user } = useUserStore();
  const {
    activeQueueBotMode,
    activeQueueOptions,
    setActiveQueueFilterModeOpen,
    handleActiveQueueBotMode,
  } = useQueueStore();

  return (
    <div className="relative flex items-center ">
      <select
        value={activeQueueBotMode}
        className="px-4 py-1 border w-[150px]"
        onChange={(e) => {
          setActiveQueueFilterModeOpen(false);
          handleActiveQueueBotMode(
            e.target.value,
            user?.mspCustomDomain,
            user?.tierLevel,
            user?.id
          );
        }}
      >
        {activeQueueOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default QueueMode;
