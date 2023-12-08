"use client";
import useBusinessStore from "@/utils/store/auth/business/businessStore";
import useUiStore from "@/utils/store/ui/uiStore.js";
import { UsaStates } from "usa-states";
import Link from "next/link";
import { useEffect } from "react";

const BusinessSignupPage = () => {
  const usStates = new UsaStates();

  const { height, setHeight } = useUiStore();
  const { activeBusinessFormTab, handleBusinessFormChange } =
    useBusinessStore();

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
                  onClick={() => handleBusinessFormChange("Technician")}
                  className={`${
                    activeBusinessFormTab === "Technician" &&
                    "bg-blue-800 text-white"
                  } font-bold w-full rounded-lg py-4`}
                >
                  Technician
                </button>
                <button
                  type="button"
                  onClick={() => handleBusinessFormChange("Employee")}
                  className={`${
                    activeBusinessFormTab === "Employee" &&
                    "bg-blue-800 text-white"
                  } font-bold w-full rounded-lg py-4`}
                >
                  Employee
                </button>
              </div>
              <div className="text-black flex flex-col items-start">
                <h1 className="text-2xl font-bold ">
                  {activeBusinessFormTab === "Technician"
                    ? "Enter Your Technician Details."
                    : "Enter Your Employee Details."}
                </h1>
                <p className="text-black/60">
                  Please fill out all of the required fields*
                </p>
              </div>
              <div className="flex flex-col gap-4 w-full h-[200px] overflow-auto scrollbar-thin pr-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="First name"
                    className="rounded w-full p-2 border border-gray-300  bg-white text-black"
                  />
                  <input
                    type="text"
                    placeholder="Last name"
                    className="rounded w-full p-2 border border-gray-300  bg-white text-black"
                  />
                </div>
                {activeBusinessFormTab !== "Technician" && (
                  <>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Street"
                        className="w-full p-2 border border-gray-300 bg-white text-black"
                      />

                      <input
                        type="text"
                        placeholder="City "
                        className="w-full p-2 border border-gray-300 bg-white text-black"
                      />
                    </div>
                    <div className="w-full flex gap-2">
                      <input
                        type="text"
                        placeholder="Zipcode"
                        className="w-full p-2 border border-gray-300 bg-white text-black"
                      />
                      <select
                        className={`w-full p-2 border rounded-none border-gray-300 `}
                      >
                        <option value="">State</option>
                        {usStates.states.map((state) => (
                          <option
                            key={state.abbreviation}
                            value={state.abbreviation}
                          >
                            {state.abbreviation}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Connectwise Client ID"
                        className="w-full p-2 border border-gray-300 bg-white text-black"
                      />

                      <input
                        type="text"
                        placeholder="Connectwise Contacts ID"
                        className="w-full p-2 border border-gray-300 bg-white text-black"
                      />
                    </div>
                  </>
                )}
                <input
                  type="text"
                  placeholder="Invite code"
                  className="rounded w-full p-2 border border-gray-300  bg-white text-black"
                />
                <input
                  type="text"
                  placeholder="Phone number"
                  className="rounded w-full p-2 border border-gray-300  bg-white text-black"
                />
                <input
                  type="email"
                  placeholder="Email address"
                  className="rounded w-full p-2 border border-gray-300  bg-white text-black"
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="rounded w-full p-2 border border-gray-300  bg-white text-black"
                />
              </div>
              <button className="hover:bg-blue-500 text-lg font-bold w-full rounded bg-blue-800 text-white py-4">
                Sign up
              </button>
              <div className="flex flex-col gap-1">
                <Link href={"/auth/signup"}>
                  <span className="text-sm text-blue-800 font-semibold">
                    Back to sign up
                  </span>
                </Link>
                <Link href={"/auth/login"}>
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

export default BusinessSignupPage;
