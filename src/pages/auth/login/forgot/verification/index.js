"use client";

import Image from "next/image";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookie from "js-cookie";
import useAuthStore from "@/utils/store/auth/authStore.js";

import useUiStore from "@/utils/store/ui/uiStore.js";

const VerificationPage = () => {
  const router = useRouter();

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

      let session_token = Cookie.get("session_token");

      const client_id = Cookie.get("client_id");

      if (session_token && client_id) {
        router.push(`/dashboard/${client_id}`);
      }

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
          <form className="w-[300px] flex flex-col items-center gap-4">
            <Image
              priority={true}
              src="/images/etech7_logo_auth.webp"
              alt="Etech7_Login_Logo"
              width={50}
              height={50}
            />
            <h1 className="text-xl font-bold text-black text-center">
              Verification Code
            </h1>
            <p className="text-red-500 text-sm">{errorMessage}</p>
            <input
              onChange={(e) => setVerificationCode(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleForgotPasswordVerifyCode(router.push);
                }
              }}
              type="text"
              placeholder="Enter your verification code"
              className="w-full p-2 border border-gray-300 bg-white text-black"
            />
            <button
              onClick={() => handleForgotPasswordVerifyCode(router.push)}
              type="button"
              className="hover:bg-blue-500 w-full  py-2 bg-[#00AEEE] text-white font-bold rounded-sm"
            >
              Verify
            </button>
            <div className="flex flex-col w-full">
              <p className="w-full text-black">
                <span
                  onClick={handleResendVerificationCode}
                  className="text-[#00AEEE] cursor-pointer"
                >
                  Resend code
                </span>
              </p>
              <p className="text-green-500 text-sm">{resentCodeMessage}</p>

            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default VerificationPage;
