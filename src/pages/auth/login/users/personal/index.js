"use client";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useUiStore from "@/utils/store/ui/uiStore.js";

const PersonalLoginPage = () => {
  const router = useRouter();
  const { height, setHeight } = useUiStore();
  useEffect(() => {
    if (typeof window !== "undefined") {
      setHeight(window.innerHeight);

      // let session_token = Cookie.get("session_token");

      // const client_id = Cookie.get("client_id");

      // if (session_token && client_id) {
      //   router.push(`/dashboard/${client_id}`);
      // }

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
          className="bg-gradient-to-b from-white via-white to-gray-400 h-full flex justify-center items-center"
          style={{ height: `calc(${height}px - 1px)` }}
        >
          <form className="p-6 w-[450px] flex flex-col gap-10 items-start justify-center lg:shadow-lg  lg:rounded-lg lg:bg-white">
            <div className="flex flex-col items-start">
              <h1 className="text-2xl font-bold ">
                Enter Your Personal User Details.
              </h1>
              <p className="text-black/60">
                Please fill out all of the required fields*
              </p>
            </div>
            <div className="flex flex-col gap-4 w-full text-sm">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full p-2 border border-gray-300 bg-white text-black"
              />

              <input
                type="password"
                placeholder="Enter your password"
                className="w-full p-2 border border-gray-300  bg-white text-black"
              />
              <button
                onClick={() => handleLoginCredentialsAuth(router.push)}
                type="button"
                className="hover:bg-blue-500 text-lg font-bold w-full rounded bg-blue-800 text-white py-4"
              >
                Continue
              </button>
              <div className="flex flex-col gap-1">
                <Link href={"/auth/login/users"}>
                  <span className="text-sm text-blue-800 font-semibold">
                    Back to login in
                  </span>
                </Link>
                <Link href={"/auth/signup"}>
                  <span className="text-sm text-blue-800 font-semibold">
                    No Account? Sign up
                  </span>
                </Link>
              </div>
              <span
                onClick={() => handleShowForgotPassword(router.push)}
                className="text-sm text-blue-800 font-extrabold cursor-pointer"
              >
                Forgot password?
              </span>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default PersonalLoginPage;
