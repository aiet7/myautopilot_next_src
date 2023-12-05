"use client";
import useUiStore from "@/utils/store/ui/uiStore.js";
import { useEffect } from "react";
import { UsaStates } from "usa-states";
import Link from "next/link";

const MSPSignupPage = () => {
  const usStates = new UsaStates();

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
          <form className="p-6 w-[450px] flex flex-col gap-10 items-start justify-center lg:shadow-lg  lg:rounded-lg lg:bg-white">
            <div className="flex flex-col items-start">
              <h1 className="text-2xl font-bold ">Enter Your MSP Details.</h1>
              <p className="text-black/60">
                Please fill out all of the required fields*
              </p>
            </div>
            <div className="flex flex-col gap-4 w-full text-sm">
              <input
                type="text"
                placeholder="Msp name"
                className="rounded w-full p-2 border border-gray-300  bg-white text-black"
              />
              <input
                type="text"
                placeholder="Custom domain name"
                className=" rounded w-full p-2 border border-gray-300  bg-white text-black"
              />
              <input
                type="text"
                placeholder="Brand logo url"
                className="rounded w-full p-2 border border-gray-300  bg-white text-black"
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Street"
                  className="rounded w-full p-2 border border-gray-300 bg-white text-black"
                />

                <input
                  type="text"
                  placeholder="City "
                  className="rounded w-full p-2 border border-gray-300 bg-white text-black"
                />
              </div>
              <div className="w-full flex gap-2">
                <input
                  type="text"
                  placeholder="Zipcode"
                  className="rounded w-full p-2 border border-gray-300 bg-white text-black"
                />
                <select
                  className={`rounded  w-full p-2 border rounded-none border-gray-300`}
                >
                  <option value="">State</option>
                  {usStates.states.map((state) => (
                    <option key={state.abbreviation} value={state.abbreviation}>
                      {state.abbreviation}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <button className="hover:bg-blue-500 text-lg font-bold w-full rounded bg-blue-800 text-white py-4">
              Sign up
            </button>
            <Link href={"/auth/signup"}>
              <span className="text-sm text-blue-800 font-semibold">
                Back to sign up
              </span>
            </Link>
          </form>
        </div>
      )}
    </>
  );
};

export default MSPSignupPage;
