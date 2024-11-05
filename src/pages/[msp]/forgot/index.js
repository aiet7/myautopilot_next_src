"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Cookie from "js-cookie";
import useAuthStore from "@/utils/store/auth/authStore.js";

import useUiStore from "@/utils/store/ui/uiStore.js";

const ForgotPasswordPage = () => {
  const router = useRouter();
  const { msp } = router.query;
  const { height, setHeight } = useUiStore();
  const { errorMessage, setEmail, handleForgotPasswordEmailCheck } =
    useAuthStore();

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
            <div className="text-black flex flex-col items-start">
              <h1 className="text-2xl font-bold ">Forgot My Password</h1>
              {errorMessage?.emailCheck && (
                <p className="text-red-500">Email does not exist.</p>
              )}
              {errorMessage?.emptyFields && (
                <p className="text-red-500">Please fill out required field*.</p>
              )}
            </div>
            <div className="flex flex-col gap-4 w-full ">
              <input
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleForgotPasswordEmailCheck(router.push, msp);
                  }
                }}
                type="email"
                placeholder="Email Address"
                className="w-full p-2 border border-gray-300 bg-white text-black"
              />
              <button
                onClick={() => handleForgotPasswordEmailCheck(router.push, msp)}
                type="button"
                className="border transition ease-in hover:bg-[#FFFFFF] hover:text-[#465E89]   bg-[#465E89] text-white py-3 rounded-lg"
              >
                Continue
              </button>
              <Link href={`/${msp}`}>
                <span className="text-sm text-blue-800 font-semibold">
                  Back to login in
                </span>
              </Link>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default ForgotPasswordPage;
