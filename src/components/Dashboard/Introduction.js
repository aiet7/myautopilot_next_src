"use client";

import useAssistantStore from "@/utils/store/assistant/assistantStore";
import useUiStore from "@/utils/store/ui/uiStore";
import { BsStars } from "react-icons/bs";
import Image from "next/image";

const Introduction = () => {
  const { handleUIAssistantTabChange, handleAssistantTabChange } =
    useAssistantStore();
  const { openAssistant } = useUiStore();
  return (
    <div
      className={`relative flex flex-col h-full w-full  ${
        openAssistant && "lg:opacity-100 opacity-5 xl:mr-[350px]"
      } dark:bg-black transition-all duration-300 ease bg-white `}
    >
      <div className="flex flex-col gap-20 items-center  p-4 text-md h-full  max-w-[900px] mx-auto">
        <h1 className="text-5xl font-bold text-center">
          Welcome to Autopilot!
        </h1>
        <Image
          priority={true}
          src="/images/autopilot_logo_light.png"
          width={150}
          height={150}
          alt="Logo"
        />
        <div className="flex flex-col items-center gap-12">
          <h2 className="text-3xl font-semibold">Let&#39;s Get Started</h2>
          <div className="flex flex-col gap-10 md:flex-row">
            <div className="flex flex-col gap-4">
              <p className="text-2xl">
                Would you like to create a support ticket?
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
                className="dark:shadow-white/40 hover:bg-blue-500 w-full px-4 py-5 bg-blue-800 text-white rounded-lg shadow-lg text-lg"
              >
                Create Support Ticket
              </button>
            </div>
            <div className="flex flex-col gap-4">
              <p className="text-2xl">
                Would you like to converse with our IT bot?
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
                className="dark:shadow-white/40 hover:bg-blue-500 w-full px-4 py-5 bg-blue-800 text-white rounded-lg shadow-lg text-lg"
              >
                Chat With IT Bot
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Introduction;
