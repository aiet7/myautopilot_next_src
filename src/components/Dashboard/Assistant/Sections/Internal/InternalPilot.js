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
          width={35}
          height={35}
        />
        <h2 className="text-xl font-semibold">AutoPilot</h2>
      </div>

      <Engineer />
    </div>
  );
};

export default InternalPilot;
