"use client";
import Image from "next/image";
import Link from "next/link";
import useUiStore from "@/utils/store/ui/uiStore";
import { useEffect } from "react";
import { useRouter } from "next/router";
import useInitializeAppStore from "@/utils/store/init/initializeAppStore";
import useMspStore from "@/utils/store/auth/msp/mspStore";
import useAuthStore from "@/utils/store/auth/authStore";

import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const MSPPage = ({}) => {
  const { height, setHeight } = useUiStore();
  const { mspSubDomain, initializeSubDomain } = useInitializeAppStore();

  const {
    userType,
    current2FA,
    errorMessage,
    setLoginInputs,
    handleSwitchMspLoginFlow,
    handleClientLogin,
    handleClient2FALogin,
    handleTechnicianLogin,
    handleTechnician2FALogin,
    clearMSPCredentials,
    initializeUserType,
  } = useMspStore();

  const { showPassword, setShowPassword, handleShowForgotPassword } =
    useAuthStore();
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

  useEffect(() => {
    console.log("firing off")
    initializeUserType();
  }, [userType]);

  console.log(userType)

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
            <div className="text-black flex flex-col items-center gap-10">
              <div className="rounded-full w-44 h-44 shadow-xl shadow-black/30  flex items-center justify-center">
                <img
                  src={mspSubDomain?.brandLogoUrl}
                  alt={`${mspSubDomain?.mspName} Portal Logo`}
                />
              </div>
              <h1 className="text-2xl font-bold text-black text-center">
                Welcome back to {mspSubDomain?.mspName}
              </h1>
              {errorMessage?.emailCheck && (
                <p className="text-red-500">Email or password incorrect.</p>
              )}
              {errorMessage?.emptyFields && (
                <p className="text-red-500">Please fill out required field*.</p>
              )}
            </div>
            <div className="flex flex-col gap-4 w-full">
              {!current2FA && (
                <div className="flex items-center justify-between text-xs font-bold">
                  {userType === "tech" ? (
                    <p>Technician Login</p>
                  ) : (
                    <p>Client Login</p>
                  )}
                  <button type="button" onClick={handleSwitchMspLoginFlow}>
                    Switch
                  </button>
                </div>
              )}
              {current2FA ? (
                <>
                  <input
                    onChange={(e) =>
                      setLoginInputs(
                        userType === "tech" ? "techInfo" : "clientInfo",
                        "login2FA",
                        e.target.value
                      )
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();

                        if (userType === "tech") {
                          handleTechnician2FALogin(
                            router.push,
                            mspSubDomain?.customDomain
                          );
                        } else {
                          handleClient2FALogin(
                            router.push,
                            mspSubDomain?.customDomain
                          );
                        }
                      }
                    }}
                    type="text"
                    placeholder="Enter 2FA Token"
                    className="w-full p-2 border border-gray-300 bg-white text-black"
                  />
                  <button
                    onClick={() => {
                      if (userType === "tech") {
                        handleTechnician2FALogin(
                          router.push,
                          mspSubDomain?.customDomain
                        );
                      } else {
                        handleClient2FALogin(
                          router.push,
                          mspSubDomain?.customDomain
                        );
                      }
                    }}
                    type="button"
                    className="hover:bg-blue-500 text-lg font-bold w-full rounded bg-blue-800 text-white py-4"
                  >
                    Continue
                  </button>
                </>
              ) : (
                <>
                  <input
                    onChange={(e) =>
                      setLoginInputs(
                        userType === "tech" ? "techInfo" : "clientInfo",
                        "email",
                        e.target.value
                      )
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        if (userType === "tech") {
                          handleTechnicianLogin(mspSubDomain?.customDomain);
                        } else {
                          handleClientLogin(mspSubDomain?.customDomain);
                        }
                      }
                    }}
                    type="email"
                    placeholder="Enter your email"
                    className="w-full p-2 border border-gray-300 bg-white text-black"
                  />
                  <div className="flex items-center gap-2">
                    <input
                      onChange={(e) =>
                        setLoginInputs(
                          userType === "tech" ? "techInfo" : "clientInfo",
                          "password",
                          e.target.value
                        )
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          if (userType === "tech") {
                            handleTechnicianLogin(mspSubDomain?.customDomain);
                          } else {
                            handleClientLogin(mspSubDomain?.customDomain);
                          }
                        }
                      }}
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="w-full p-2 border border-gray-300  bg-white text-black"
                    />
                    <>
                      {showPassword ? (
                        <FaRegEyeSlash
                          onClick={() => setShowPassword(false)}
                          className="cursor-pointer"
                          size={20}
                        />
                      ) : (
                        <FaRegEye
                          onClick={() => setShowPassword(true)}
                          size={20}
                          className="cursor-pointer"
                        />
                      )}
                    </>
                  </div>
                  <button
                    onClick={() => {
                      if (userType === "tech") {
                        handleTechnicianLogin(mspSubDomain?.customDomain);
                      } else {
                        handleClientLogin(mspSubDomain?.customDomain);
                      }
                    }}
                    type="button"
                    className="hover:bg-blue-500 text-lg font-bold w-full rounded bg-blue-800 text-white py-4"
                  >
                    Continue
                  </button>
                </>
              )}
              <div className="flex flex-col w-full">
                <Link
                  onClick={() => clearMSPCredentials()}
                  href={`/${mspSubDomain?.customDomain}/activate`}
                >
                  <span className="text-sm text-blue-800 font-semibold">
                    Activate Account
                  </span>
                </Link>
              </div>
              <span
                onClick={() => {
                  clearMSPCredentials();
                  handleShowForgotPassword(
                    router.push,
                    mspSubDomain?.customDomain
                  );
                }}
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
