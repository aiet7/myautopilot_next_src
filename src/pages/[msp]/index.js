"use client";
import Image from "next/image";
import useUiStore from "@/utils/store/ui/uiStore";
import { useEffect } from "react";
import { handleGetMSPs } from "@/utils/api/serverProps.js";

const MSPPage = ({ initialMSPs }) => {
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
          <div className="absolute opacity-10 overflow-hidden  top-0 bottom-0 left-0 right-0">
            <Image
              src={"/images/msp_portal_image.png"}
              alt="msp_portal_image"
              fill
              className="object-cover"
            />
          </div>

          <form className="relative w-[300px] flex flex-col items-center gap-4 ">
            <div className="rounded-full w-44 h-44 shadow-xl shadow-black/30  flex items-center justify-center">
              <img
                src={initialMSPs?.brandLogoUrl}
                alt={`${initialMSPs?.mspName} Portal Logo`}
              />
            </div>
            <h1 className="text-xl font-bold text-black text-center">
              Welcome back to {initialMSPs[0]?.mspName}
            </h1>

            <input
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleLoginCredentialsAuth(router.push);
                }
              }}
              type="email"
              placeholder="Enter your email"
              className="w-full p-2 border border-gray-300 bg-white text-black"
            />

            <input
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleLoginCredentialsAuth(router.push);
                }
              }}
              type="password"
              placeholder="Enter your password"
              className="w-full p-2 border border-gray-300  bg-white text-black"
            />
            <button
              onClick={() => handleLoginCredentialsAuth(router.push)}
              type="button"
              className="hover:bg-blue-500 w-full  py-2 bg-[#00AEEE] text-white font-bold rounded-sm"
            >
              Continue
            </button>
            <div className="flex flex-col w-full">
              <p className="w-full text-black">
                Do not have an account?{" "}
                <span
                  onClick={() => handleShowSignup(router.push)}
                  className="text-[#00AEEE]  cursor-pointer"
                >
                  Sign up
                </span>
              </p>
              <p className="w-full text-black">
                <span
                  onClick={() => handleShowForgotPassword(router.push)}
                  className="text-[#00AEEE]  cursor-pointer"
                >
                  Forgot password?
                </span>
              </p>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export const getServerSideProps = async (context) => {
  const {
    params: { msp },
  } = context;
  const MSPs = await handleGetMSPs(msp);

  if (MSPs.message === "No MSPs") {
    return {
      redirect: {
        destination: "/auth/signup",
        permanent: false,
      },
    };
  }

  return {
    props: {
      initialMSPs: MSPs,
    },
  };
};

export default MSPPage;
