"use client";

import Image from "next/image";
import Engineer from "./Engineer";
import { useTheme } from "next-themes";

const InternalPilot = () => {
  const { theme } = useTheme();
  return (
    <div className="relative flex-grow flex flex-col items-center py-10 gap-14 overflow-auto scrollbar-thin">
      <div className="flex flex-col items-center">
        <Image
          priority={true}
          src={
            theme === "light"
              ? "/images/autopilot_logo_light.png"
              : "/images/autopilot_logo_dark.png"
          }
          alt="Etech7_Login_Logo"
          width={50}
          height={50}
        />
        <h2 className="text-2xl font-semibold">AutoPilot</h2>
      </div>
      <div className="flex flex-col w-full items-center gap-2 px-6">
        <p>Choose a conversation style</p>
        <div className="dark:bg-black dark:shadow-white/40 flex items-center w-full rounded-lg bg-white p-1 shadow-lg">
          <button className="dark:text-white w-full p-2 ">Creative</button>
          <button className="dark:text-white w-full p-2 ">Balanced</button>
          <button className="w-full p-2 bg-blue-800 text-white rounded">
            Precise
          </button>
        </div>
      </div>
      <div className="flex flex-col items-center gap-2">
        <p className="text-sm max-w-[250px] text-center">
          Here are some things AutoPilot can help you do.
        </p>
        <div className="flex flex-col w-full gap-2 px-6">
          <button className="dark:bg-black dark:text-white dark:shadow-white/40 bg-white px-4 py-3 shadow-lg rounded-lg w-full text-left">
            Act as an IT specialist for [this issue]
          </button>
          <button className="dark:bg-black dark:text-white dark:shadow-white/40 bg-white px-4 py-3 shadow-lg rounded-lg w-full text-left">
            Update IT tech if I resolved ticket myself
          </button>
          <button className="dark:bg-black dark:text-white dark:shadow-white/40 bg-white px-4 py-3 shadow-lg rounded-lg w-full text-left">
            Lorem Ipsum Button number 3
          </button>
          <button className="dark:bg-black dark:text-white dark:shadow-white/40 bg-white px-4 py-3 shadow-lg rounded-lg w-full text-left">
            Lorem Ipsum Button number 3
          </button>
        </div>
      </div>
      <Engineer />
    </div>
  );
};

export default InternalPilot;
