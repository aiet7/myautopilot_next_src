"use client";
import Image from "next/image";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookie from "js-cookie";
import useAuthStore from "@/utils/store/auth/authStore.js";

import useUiStore from "@/utils/store/ui/uiStore.js";

const CreatepasswordPage = () => {
  const router = useRouter();

  const { height, setHeight } = useUiStore();
  const {
    errorMessage,
    setPassword,
    setVerifyPassword,
    handleCreateNewPassword,
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
          <form className="p-6 w-[450px] flex flex-col gap-10 items-start justify-center lg:shadow-lg  lg:rounded-lg lg:bg-white">
            <div className="text-black flex flex-col items-start">
              <h1 className="text-2xl font-bold ">Create A Password</h1>
              <p className="text-black/60">
                Please fill out all of the required fields*
              </p>
              <p className="text-red-500 text-sm">{errorMessage}</p>
            </div>
            <div className="flex flex-col gap-4 w-full text-sm">
              <input
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleCreateNewPassword(router.push);
                  }
                }}
                type="password"
                placeholder="Enter New Password"
                className="w-full p-2 border border-gray-300 bg-white text-black"
              />
              <input
                onChange={(e) => setVerifyPassword(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleCreateNewPassword(router.push);
                  }
                }}
                type="password"
                placeholder="Re-Enter New Password"
                className="w-full p-2 border border-gray-300 bg-white text-black"
              />
              <button
                onClick={() => handleCreateNewPassword(router.push)}
                type="button"
                className="hover:bg-blue-500 text-lg font-bold w-full rounded bg-blue-800 text-white py-4"
              >
                Continue
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default CreatepasswordPage;
