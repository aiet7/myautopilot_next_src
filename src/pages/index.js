"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import useUiStore from "@/utils/store/ui/uiStore.js";

const WelcomePage = () => {
  const { height, setHeight } = useUiStore();

  const router = useRouter();

  const handleShowLogin = () => {
    router.push("auth/login");
  };

  const handleShowSigmup = () => {
    router.push("auth/signup");
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
          className="h-full flex items-center justify-center bg-gradient-to-b from-white to-gray-100"
          style={{ height: `calc(${height}px - 1px)` }}
        >
          <div className="relative w-full max-w-2xl p-8 bg-white bg-opacity-5 ">
            <div className="absolute inset-0 z-0 flex justify-center items-center">
              <Image
                src="/etech7_logo.webp"
                width={750}
                height={750}
                quality={100}
                alt="Etech7_Logo"
                className="opacity-10"
              />
            </div>
            <div className="relative z-10 flex flex-col gap-4">
              <div className="flex flex-col items-center gap-2">
                <h1 className="text-4xl text-center">Welcome to MyAutoPilot</h1>
                <p className="text-xl text-center">
                  Login with your AutoPilot account to continue please.
                </p>
              </div>
              <div className="flex justify-center items-center gap-8">
                <button
                  onClick={handleShowLogin}
                  className="w-[120px] bg-[#00AEEE] text-white py-3 rounded-sm focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50"
                >
                  Login
                </button>
                <button
                  onClick={handleShowSigmup}
                  className="w-[120px]  bg-[#00AEEE] text-white py-3 rounded-sm focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50"
                >
                  Signup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WelcomePage;
