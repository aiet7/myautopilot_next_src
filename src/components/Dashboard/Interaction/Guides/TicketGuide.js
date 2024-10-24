"use client";

import useInteractionStore from "@/utils/store/interaction/interactionsStore";
import useUserStore from "@/utils/store/user/userStore";
import { BsStars } from "react-icons/bs";
import { GiRobotHelmet } from "react-icons/gi";

const TicketGuide = () => {
  const { user } = useUserStore();
  const { handleCreateTicketMessage } = useInteractionStore();

  return (
    <div className="flex flex-col items-center justify-between p-4 text-xs h-full  max-w-[700px] mx-auto">
      <div className="dark:border-white flex items-center justify-center border border-black px-12 py-2 rounded-lg font-bold mb-4">
        <BsStars size={15} />
        <span className="text-lg">AI Autopilot</span>
      </div>
      <div className="flex flex-col gap-6 items-center">
        <GiRobotHelmet size={70} />
        <p className="text-lg font-semibold">Hi, I Am Jarvis</p>
        <div className="flex flex-col items-center gap-2">
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold">Your Tech Support Engineer</h2>
            <p className="text-lg font-semibold">
              {user?.mspCustomDomain === "public"
                ? "I Can Help You Resolve IT Related Issues"
                : "I Can Help You Open Tickets"}
            </p>
          </div>

          <p className="text-lg font-semibold">
            Start Typing Your Issue In The Input Box Below
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 ">
        <div
          onClick={() =>
            handleCreateTicketMessage(
              "My printer is not working or turning on."
            )
          }
          className="dark:hover:bg-white/20 hover:bg-black/20 flex flex-col  border p-4 rounded-xl w-full cursor-pointer"
        >
          <p className="font-semibold">Hardware Issues</p>
          <p>My printer is not working or turning on.</p>
        </div>

        <div
          onClick={() =>
            handleCreateTicketMessage(
              "I am not receiving any emails nor can I send."
            )
          }
          className="dark:hover:bg-white/20 hover:bg-black/20 flex flex-col border p-4 rounded-xl w-full cursor-pointer"
        >
          <p className="font-semibold">Software Issues</p>
          <p>I am not receiving any emails nor can I send.</p>
        </div>

        <div
          onClick={() =>
            handleCreateTicketMessage(
              "I think I have malware installed in my PC."
            )
          }
          className="dark:hover:bg-white/20 hover:bg-black/20 flex flex-col border p-4 rounded-xl w-full cursor-pointer"
        >
          <p className="font-semibold">Security Issues</p>
          <p>I think I have malware installed in my PC.</p>
        </div>

        <div
          onClick={() =>
            handleCreateTicketMessage("I need my workers password reset.")
          }
          className="dark:hover:bg-white/20 hover:bg-black/20 flex flex-col border p-4 rounded-xl w-full cursor-pointer"
        >
          <p className="font-semibold">Account or Billing Issues</p>
          <p>I need my workers password reset.</p>
        </div>
      </div>
    </div>
  );
};

export default TicketGuide;
