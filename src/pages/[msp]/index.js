"use client";
import Image from "next/image";
import Link from "next/link";
import useUiStore from "@/utils/store/ui/uiStore";
import { useEffect } from "react";
import { useRouter } from "next/router";
import useInitializeAppStore from "@/utils/store/init/initializeAppStore";
import useAuthStore from "@/utils/store/auth/authStore";

const MSPPage = ({}) => {
  const { height, setHeight } = useUiStore();
  const { mspSubDomain, initializeSubDomain } = useInitializeAppStore();
  const { handleShowForgotPassword } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      const { msp } = router.query;
      if (msp) {
        initializeSubDomain(msp);
      } else {
        router.push("/auth/login");
      }
    }
  }, [router.isReady]);

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
          <div className="absolute opacity-5 overflow-hidden  top-0 bottom-0 left-0 right-0">
            <Image
              src={"/images/msp_portal_image.png"}
              alt="msp_portal_image"
              fill
              className="object-cover"
            />
          </div>

          <form className="relative p-6 w-[450px] flex flex-col gap-10 items-center justify-center lg:shadow-lg  lg:rounded-lg lg:bg-white">
            <div className="flex flex-col items-center gap-10">
              <div className="rounded-full w-44 h-44 shadow-xl shadow-black/30  flex items-center justify-center">
                <img
                  src={mspSubDomain?.brandLogoUrl}
                  alt={`${mspSubDomain?.mspName} Portal Logo`}
                />
              </div>
              <h1 className="text-2xl font-bold text-black text-center">
                Welcome back to {mspSubDomain?.mspName}
              </h1>
            </div>
            <div className="flex flex-col gap-4 w-full">
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
                className="hover:bg-blue-500 text-lg font-bold w-full rounded bg-blue-800 text-white py-4"
              >
                Continue
              </button>
              <div className="flex flex-col w-full">
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

export default MSPPage;
