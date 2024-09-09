"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import useUiStore from "@/utils/store/ui/uiStore.js";
import useMspStore from "@/utils/store/auth/msp/mspStore";

const WelcomePage = () => {
  
  const { height, setHeight } = useUiStore();
  const { handleNavigateMSPSignup } = useMspStore();

  const router = useRouter();

  const handleShowLogin = () => {
    router.push("/auth/login");
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHeight(window.innerHeight);

      const handleResize = () => setHeight(window.innerHeight);
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  return (
    <>
      {height && (
        <div
          className="flex items-center justify-center bg-gradient-to-b from-white via-white to-gray-400"
          style={{ height: `calc(${height}px - 1px)` }}
        >
          <div className="absolute inset-0 opacity-5 flex items-center justify-center">
            <Image
              priority={true}
              src="/images/autopilot_logo_light.png"
              width={500}
              height={500}
              alt="Etech7_Logo"
            />
          </div>

          <div className="flex flex-col gap-6 px-4 max-w-[950px] mx-auto relative">
            <h1 className="text-6xl font-bold">MyAutoPilot</h1>
            <h2 className="text-2xl font-bold italic text-black/40">
              Revolutionizing <span className="text-black">MSP Operations</span>{" "}
              with Intelligent AI Automation
            </h2>
            <div className="flex gap-4 ">
              <button
                onClick={handleShowLogin}
                className="hover:bg-blue-500 bg-blue-800 w-full text-white py-3 rounded-lg lg:w-[150px]"
              >
                Log in
              </button>
              <button
                onClick={() => handleNavigateMSPSignup(router.push)}
                className="hover:bg-blue-500 bg-blue-800 w-full text-white py-3 rounded-lg lg:w-[150px]"
              >
                Sign up
              </button>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-xl font-bold italic">
                Integrating AI into Managed Services Software Suites & Tools
              </p>
              <p className="text-lg font-semibold">
                ConnectWise / Kaseya / Datto / N-able
              </p>
            </div>
            <div className="flex flex-col gap-6 text-sm lg:text-lg py-4 lg:flex-row">
              <div className="flex flex-col text-left gap-2 lg:text-center">
                <h3 className="text-2xl font-bold">Ticket Automation</h3>
                <p className="lg:leading-7">
                  AI-driven ticket creation, categorization, prioritization,
                  dispatching and scheduling are fully automated for you and
                  your clients
                </p>
              </div>
              <div className="flex flex-col text-left gap-2 lg:text-center">
                <h3 className="text-2xl font-bold">Software Integration</h3>
                <p className="lg:leading-7">
                  AutoPilot integrates and powers RMM, PSA, CRM software suites
                  and tools, unifying working environments for your clients
                </p>
              </div>
              <div className="flex flex-col text-left gap-2 lg:text-center">
                <h3 className="text-2xl font-bold">Client Portal</h3>
                <p className="lg:leading-7">
                  Centralized dashboard includes ticketing portal, billing
                  portal, remote access portal, password management portal, and
                  more
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WelcomePage;
