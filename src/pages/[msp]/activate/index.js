"use client";
import useUiStore from "@/utils/store/ui/uiStore.js";
import { UsaStates } from "usa-states";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/router";
import useMspStore from "@/utils/store/auth/msp/mspStore";

const ActivatePage = () => {
  const router = useRouter();

  const { msp } = router.query;
  const { height, setHeight } = useUiStore();
  const { activeFormTab, setFormChange } = useMspStore();

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
              <div className="dark:bg-black dark:text-white dark:shadow-white/40 flex items-center gap-2 w-full rounded-lg bg-white p-1 shadow-lg ">
                <button
                  type="button"
                  onClick={() => setFormChange("Technician")}
                  className={`${
                    activeFormTab === "Technician" && "bg-blue-800 text-white"
                  } font-bold w-full rounded-lg py-4`}
                >
                  Technician
                </button>
                <button
                  type="button"
                  onClick={() => setFormChange("Client")}
                  className={`${
                    activeFormTab === "Client" && "bg-blue-800 text-white"
                  } font-bold w-full rounded-lg py-4`}
                >
                  Client
                </button>
              </div>
              <div className="text-black flex flex-col items-start">
                <h1 className="text-2xl font-bold ">
                  {activeFormTab === "Technician"
                    ? "Enter Your Technician Details."
                    : "Enter Your Client Details."}
                </h1>
                <p className="text-black/60">
                  Please fill out all of the required fields*
                </p>
              </div>
              <input
                type="email"
                placeholder="Email address"
                className="rounded w-full p-2 border border-gray-300  bg-white text-black"
              />
              <button className="hover:bg-blue-500 text-lg font-bold w-full rounded bg-blue-800 text-white py-4">
                Continue
              </button>
              <div className="flex flex-col gap-1">
                <Link href={"/auth/signup"}>
                  <span className="text-sm text-blue-800 font-semibold">
                    Back to sign up
                  </span>
                </Link>
                <Link href={`/${msp}`}>
                  <span className="text-sm text-blue-800 font-semibold">
                    Have An Account? Log in
                  </span>
                </Link>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ActivatePage;
