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
          <div className="absolute inset-0 opacity-5 flex items-center justify-center ">
            <Image
              priority={true}
              src="/images/autopilot_logo_light.png"
              width={500}
              height={500}
              alt="Etech7_Logo"
            />
          </div>
          <div className="relative flex flex-col items-center gap-4 w-full">
            <h1 className="text-4xl font-bold w-full text-left px-4 lg:text-center">
              MyAutoPilot
            </h1>
            <div className="text-lg font-bold flex flex-col w-full px-4 justify-center items-center gap-4 lg:flex-row">
              <button
                onClick={handleShowLogin}
                className="hover:bg-blue-500 bg-blue-800 w-full text-white py-5 rounded-lg lg:w-[200px]"
              >
                Log in
              </button>
              <button
                onClick={() => handleNavigateMSPSignup(router.push)}
                className="hover:bg-blue-500 bg-blue-800 w-full text-white py-5 rounded-lg lg:w-[200px]"
              >
                Sign up
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WelcomePage;
