"use client";
import useUiStore from "@/utils/store/ui/uiStore.js";
import { useEffect } from "react";
import Link from "next/link";

const PersonalSignupPage = () => {
  const { height, setHeight } = useUiStore();

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
          className="relative z-[99]  bg-gradient-to-b from-white via-white to-gray-400 h-full flex justify-center items-center"
          style={{ height: `calc(${height}px - 1px)` }}
        >
          <div className="p-4 flex flex-col items-center w-full justify-center h-full ">
            <form className=" p-6 w-[450px]  flex flex-col gap-10 items-start justify-center lg:shadow-lg  lg:rounded-lg lg:bg-white ">
              <div className="flex flex-col items-start">
                <h1 className="text-2xl font-bold ">Personal</h1>
                <p className="text-black/60">
                  Please fill out all of the required fields*
                </p>
              </div>
              <div className="flex flex-col gap-4 w-full text-sm  overflow-auto scrollbar-thin pr-2">
                <input
                  type="email"
                  placeholder="Email Address"
                  className="rounded w-full p-2 border border-gray-300  bg-white text-black"
                />

                <input
                  type="password"
                  placeholder="Password"
                  className=" rounded w-full p-2 border border-gray-300  bg-white text-black"
                />
              </div>
              <button className="hover:bg-blue-500 text-lg font-bold w-full rounded bg-blue-800 text-white py-4">
                Sign up
              </button>
              <Link href={"/auth/signup"}>
                <span className="text-sm text-blue-800 font-semibold">Back to sign up</span>
              </Link>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default PersonalSignupPage;
