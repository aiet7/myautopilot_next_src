"use client";

import Link from "next/link";
import { useEffect } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { IoIosConstruct } from "react-icons/io";
import useUiStore from "@/utils/store/ui/uiStore.js";
import useMspStore from "@/utils/store/auth/msp/mspStore";
import { useRouter } from "next/router";

const LoginPage = () => {
  const router = useRouter()
  const { height, setHeight } = useUiStore();
  const { handleNavigateTechnicianPage, handleNavigateClientPage } = useMspStore.getState()

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
          className="bg-gradient-to-b from-white via-white to-gray-400 h-full flex justify-center items-center"
          style={{ height: `calc(${height}px - 1px)` }}
        >
          <div className="flex flex-col gap-6 p-4">
            <h1 className="text-black text-4xl font-bold text-left lg:text-center">
              Log in
            </h1>
            <div className="text-black flex flex-col gap-3 items-center justify-center lg:flex-row lg:gap-6">

              <div onClick={() => handleNavigateTechnicianPage(router.push)} className="hover:shadow-blue-500  flex flex-col  justify-center items-center w-full shadow-xl rounded-lg  cursor-pointer lg:w-[275px]">
                <h2 className="flex items-center justify-center text-2xl font-bold  bg-black/5 rounded-tr-lg rounded-tl-lg w-full p-3 lg:h-[100px]">
                  Technician
                </h2>
                <p className="text-black/60 py-2 px-4 h-[100px] lg:h-[175px] lg:pt-8">
                  Ideal for IT service providers offering managed services.
                  Get tailored solutions to manage your clients IT
                  infrastructure efficiently.
                </p>
                <div className="p-2 h-full">
                  <IoIosConstruct size={25} />
                </div>
              </div>

              <div onClick={() => handleNavigateClientPage(router.push)} className="hover:shadow-blue-500 flex flex-col  justify-center items-center w-full shadow-xl rounded-lg  cursor-pointer lg:w-[275px]">
                <h2 className="flex items-center justify-center text-2xl font-bold  bg-black/5 rounded-tr-lg rounded-tl-lg w-full p-3 lg:h-[100px]">
                  Client
                </h2>
                <p className="text-black/60 py-2 px-4 h-[100px] lg:h-[175px] lg:pt-8">
                  Perfect for businesses of all sizes seeking robust IT
                  solutions. Enhance your operational efficiency and
                  streamline workflows.
                </p>
                <div className="flex p-2">
                  <FaRegUserCircle size={25} />
                </div>
              </div>

            </div>
            <Link href={"/auth/signup"}>
              <span className="text-sm text-blue-800 font-semibold">
                No account? Sign up
              </span>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginPage;
