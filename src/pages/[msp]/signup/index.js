"use client";

import useUiStore from "@/utils/store/ui/uiStore";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Link from "next/link";
import useMspStore from "@/utils/store/auth/msp/mspStore";

const PublicSignupPage = () => {
  const router = useRouter();
  const { msp } = router.query;
  const { height, setHeight } = useUiStore();
  const {
    userType,
    errorMessage,
    signupInputs,
    setSignupInputs,
    handleSignupPublic,
    clearMSPCredentials,
    initializeUserType,
  } = useMspStore();
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

  useEffect(() => {
    initializeUserType();
  }, [userType]);

  return (
    <>
      {height && (
        <div
          className="relative z-[99]  bg-gradient-to-b from-white via-white to-gray-400 h-full flex justify-center items-center"
          style={{ height: `calc(${height}px - 1px)` }}
        >
          <form className="p-6 w-[450px]  flex flex-col gap-10 items-start  justify-center  lg:shadow-lg  lg:rounded-lg lg:bg-white">
            <div className="flex flex-col items-start">
              <h1 className="text-2xl font-bold text-black">
                Enter Your User Details.
              </h1>
              {errorMessage?.publicSignup && (
                <p className="text-red-500">User Already Exists*.</p>
              )}
              {errorMessage?.emptyFields && (
                <p className="text-red-500">Please fill out required field*.</p>
              )}
            </div>
            <div className="flex flex-col gap-4 w-full">
              <div className="flex gap-2">
                <input
                  value={signupInputs?.publicInfo?.firstName || ""}
                  onChange={(e) =>
                    setSignupInputs("publicInfo", "firstName", e.target.value)
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleSignupPublic(router.push);
                    }
                  }}
                  type="text"
                  placeholder="First name*"
                  className="rounded w-full p-2 border border-gray-300  bg-white text-black"
                />
                <input
                  value={signupInputs?.publicInfo?.lastName || ""}
                  onChange={(e) =>
                    setSignupInputs("publicInfo", "lastName", e.target.value)
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleSignupPublic(router.push);
                    }
                  }}
                  type="text"
                  placeholder="Last name*"
                  className="rounded w-full p-2 border border-gray-300  bg-white text-black"
                />
              </div>
              <input
                value={signupInputs?.publicInfo?.email || ""}
                onChange={(e) =>
                  setSignupInputs("publicInfo", "email", e.target.value)
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleSignupPublic(router.push);
                  }
                }}
                type="email"
                placeholder="Email address*"
                className="rounded w-full p-2 border border-gray-300  bg-white text-black"
              />
              <input
                value={signupInputs?.publicInfo?.phoneNumber || ""}
                onChange={(e) =>
                  setSignupInputs("publicInfo", "phoneNumber", e.target.value)
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleSignupPublic(router.push);
                  }
                }}
                type="text"
                placeholder="Phone number*"
                className="rounded w-full p-2 border border-gray-300  bg-white text-black"
              />
              <input
                value={signupInputs?.publicInfo?.password || ""}
                onChange={(e) =>
                  setSignupInputs("publicInfo", "password", e.target.value)
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleSignupPublic(router.push);
                  }
                }}
                type="password"
                placeholder="Password*"
                className="rounded w-full p-2 border border-gray-300  bg-white text-black"
              />
              <button
                onClick={() => handleSignupPublic(router.push)}
                type="button"
                className="border transition ease-in hover:bg-[#FFFFFF] hover:text-[#465E89]   bg-[#465E89] text-white py-3 rounded-lg"
              >
                Sign Up
              </button>
            </div>
            <div className="flex flex-col gap-1">
              <Link href={`/${msp}`} onClick={() => clearMSPCredentials()}>
                <span className="text-sm text-blue-800 font-semibold">
                  Have An Account? Log in
                </span>
              </Link>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default PublicSignupPage;
