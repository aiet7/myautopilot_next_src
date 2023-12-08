"use client";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useUiStore from "@/utils/store/ui/uiStore.js";
import { FaNetworkWired, FaBusinessTime, FaRegUser } from "react-icons/fa";

const UserLoginPage = () => {
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
          <div className="flex flex-col gap-6 p-4">
            <h1 className="text-black text-4xl font-bold text-left lg:text-center">
              Log in
            </h1>
            <div className="text-black flex flex-col gap-6  items-center justify-center lg:flex-row">
              <Link href={"/auth/login/users/business"}>
                <div className="hover:shadow-blue-500  flex flex-col  justify-center items-center w-full shadow-xl rounded-lg  cursor-pointer lg:w-[275px]">
                  <h2 className="flex items-center justify-center text-2xl font-bold  bg-black/5 rounded-tr-lg rounded-tl-lg w-full p-3 lg:h-[100px]">
                    Business
                  </h2>
                  <p className="text-black/60 py-2 px-4 h-[100px] lg:h-[175px] lg:pt-8">
                    Ideal for IT service providers offering managed services.
                    Get tailored solutions to manage your clients IT
                    infrastructure efficiently.
                  </p>
                  <div className="p-2 h-full">
                    <FaNetworkWired size={25} />
                  </div>
                </div>
              </Link>
              <Link href={"/auth/login/users/personal"}>
                <div className="hover:shadow-blue-500 flex flex-col  justify-center items-center w-full shadow-xl rounded-lg  cursor-pointer lg:w-[275px]">
                  <h2 className="flex items-center justify-center text-2xl font-bold  bg-black/5 rounded-tr-lg rounded-tl-lg w-full p-3 lg:h-[100px]">
                    Personal
                  </h2>
                  <p className="text-black/60 py-2 px-4 h-[100px] lg:h-[175px] lg:pt-8">
                    Perfect for businesses of all sizes seeking robust IT
                    solutions. Enhance your operational efficiency and
                    streamline workflows.
                  </p>
                  <div className="flex p-2">
                    <FaBusinessTime size={25} />
                  </div>
                </div>
              </Link>
            </div>
            <div className="flex flex-col">
              <Link href={"/auth/login"}>
                <span className="text-sm text-blue-800 font-semibold">
                  Back
                </span>
              </Link>
              <Link href={"/auth/signup"}>
                <span className="text-sm text-blue-800 font-semibold">
                  No account? Sign up
                </span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserLoginPage;
