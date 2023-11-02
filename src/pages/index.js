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
          className="flex items-center justify-center bg-gradient-to-b from-white via-white to-gray-400"
          style={{ height: `calc(${height}px - 1px)` }}
        >
          <div className="flex flex-col items-center gap-4 w-full">
            <Image
              priority={true}
              src="/images/etech7_logo.webp"
              width={300}
              height={300}
              alt="Etech7_Logo"
            />

            <h1 className="text-3xl text-center">Client Portal</h1>
            <div className="flex justify-center items-center gap-8">
              <button
                onClick={handleShowLogin}
                className="hover:bg-blue-500 w-[120px] bg-[#00AEEE] text-white py-3 rounded-sm"
              >
                Login
              </button>
              <button
                onClick={handleShowSigmup}
                className="hover:bg-blue-500 w-[120px] bg-[#00AEEE] text-white py-3 rounded-sm"
              >
                Signup
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WelcomePage;
