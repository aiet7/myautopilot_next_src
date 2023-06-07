"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const WelcomePage = () => {
  const [height, setHeight] = useState(null);
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
    <div
      className="h-full flex items-center justify-center bg-gradient-to-b from-white to-gray-100"
      style={{ height: `${height}px` }}
    >
      <div className="relative w-full max-w-2xl p-8 bg-white bg-opacity-5 ">
        <div className="absolute inset-0 z-0 flex justify-center items-center">
          <Image
            src="https://media.istockphoto.com/id/1217110109/vector/circuit-board-in-the-shape-of-human-brain.jpg?s=612x612&w=0&k=20&c=wBxXfTtG41CR8XvDHw70ItsRGU4iSWhZ15osRuOnuO8="
            width={700}
            height={700}
            quality={100}
            alt="Circuit board in the shape of a human brain"
            className="opacity-5"
          />
        </div>
        <div className="relative z-10 flex flex-col gap-4">
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-4xl text-center">Welcome to MyAutoPilot</h1>
            <p className="text-xl text-center">
              Login with your AutoPilot account to continue
            </p>
          </div>
          <div className="flex justify-center items-center gap-8">
            <button
              onClick={handleShowLogin}
              className="w-[120px] bg-red-500 text-white py-3 rounded-sm focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50"
            >
              Login
            </button>
            <button
              onClick={handleShowSigmup}
              className="w-[120px]  bg-red-500 text-white py-3 rounded-sm focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50"
            >
              Signup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
