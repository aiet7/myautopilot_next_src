"use client";

import useAssistantStore from "@/utils/store/assistant/assistantStore";
import useUiStore from "@/utils/store/ui/uiStore";
import { GiRobotAntennas, GiRobotHelmet } from "react-icons/gi";
import Image from "next/image";

const Introduction = () => {
  const { handleUIAssistantTabChange, handleAssistantTabChange } =
    useAssistantStore();
  const { openAssistant } = useUiStore();
  console.log(openAssistant)
  return (
    <div
      className={`relative flex flex-col h-full w-full text-sm ${
        openAssistant && "lg:opacity-100 opacity-5 xl:mr-[350px]"
      } dark:bg-black transition-all duration-300 ease bg-white `}
    >
      <div className="flex flex-col gap-20 items-center p-4  h-full overflow-auto scrollbar-thin max-w-[900px] mx-auto">
        <h1 className="text-5xl font-bold text-center">
          Welcome to AI Autopilot!
        </h1>
        <Image
          priority={true}
          src="/images/autopilot_logo_light.png"
          width={150}
          height={150}
          alt="Logo"
        />
        <div className="flex flex-col items-center gap-12">
          <h2 className="text-xl font-semibold">Let&#39;s Get Started</h2>
          <div className="flex flex-col gap-10 md:flex-row">
            <div className="flex flex-col items-center gap-4">
              <GiRobotAntennas size={60} />
              <p className="text-xl text-center">
                Create support ticket with Jarvis
              </p>
              <p>
                Creating a support ticket allows you to report an issue or
                request assistance from our support team. This is the best way
                to get help with any problems or questions you may have. Our
                team will review your ticket and get back to you as soon as
                possible.
              </p>
              <button
                onClick={() => {
                  handleUIAssistantTabChange("Tickets");
                  handleAssistantTabChange("Tickets");
                }}
                className="dark:shadow-white/40 hover:bg-blue-500 w-full py-5 bg-blue-800 text-white rounded-lg shadow-lg"
              >
                Create Ticket With Jarvis
              </button>
            </div>
            <div className="flex flex-col items-center gap-4">
              <GiRobotHelmet size={60} />
              <p className="text-xl text-center">
                Consult with our assistant Vision
              </p>
              <p>
                Conversing with our IT bot provides immediate assistance with
                common IT issues and questions. The bot can help troubleshoot
                problems, provide answers to frequently asked questions, and
                guide you through various processes. This is a quick and
                efficient way to get help without waiting.
              </p>
              <button
                onClick={() => {
                  handleUIAssistantTabChange("Engineer");
                  handleAssistantTabChange("Engineer");
                }}
                className="dark:shadow-white/40 hover:bg-blue-500 w-full py-5 bg-blue-800 text-white rounded-lg shadow-lg "
              >
                Consult with Vision
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Introduction;
