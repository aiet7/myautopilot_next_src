"use client";

import { useEffect } from "react";
import { useRouter } from "next/router";
import Cookie from "js-cookie";
import useAuthStore from "@/utils/store/auth/authStore.js";

import useUiStore from "@/utils/store/ui/uiStore.js";

const VerificationPage = () => {
  const router = useRouter();
  const { msp } = router.query;
  const { height, setHeight } = useUiStore();
  const {
    resentCodeMessage,
    errorMessage,
    setVerificationCode,
    handleResendVerificationCode,
    handleForgotPasswordVerifyCode,
  } = useAuthStore();

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
              <h1 className="text-2xl font-bold ">Verification Code</h1>
              <p className="text-black/60">
                Please fill out all of the required fields*
              </p>
              <p className="text-red-500 text-sm">{errorMessage}</p>
            </div>
            <div className="flex flex-col gap-4 w-full text-sm">
              <input
                onChange={(e) => setVerificationCode(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleForgotPasswordVerifyCode(router.push, msp);
                  }
                }}
                type="text"
                placeholder="Enter your verification code"
                className="w-full p-2 border border-gray-300 bg-white text-black"
              />
              <button
                onClick={() => handleForgotPasswordVerifyCode(router.push, msp)}
                type="button"
                className="border transition ease-in hover:bg-[#FFFFFF] hover:text-[#465E89]   bg-[#465E89] text-white py-3 rounded-lg"
              >
                Verify
              </button>
              <span
                onClick={handleResendVerificationCode}
                className="text-sm text-blue-800 font-semibold"
              >
                Resend code
              </span>
              <p className="text-green-500 text-sm">{resentCodeMessage}</p>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default VerificationPage;
