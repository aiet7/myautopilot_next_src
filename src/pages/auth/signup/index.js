"use client";
import useUiStore from "@/utils/store/ui/uiStore.js";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import useMspStore from "@/utils/store/auth/msp/mspStore";

const MSPSignupPage = () => {
  const router = useRouter();
  const { height, setHeight } = useUiStore();
  const {
    successMessage,
    errorMessage,
    currentStep,
    signupInputs,
    setCurrentStep,
    setSignupInputs,
    setFileSizeError,
    handleSignupProgression,
    clearMSPCredentials,
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

  return (
    <>
      {height && (
        <div
          className="relative z-[99]  bg-gradient-to-b from-white via-white to-gray-400 h-full flex justify-center items-center"
          style={{ height: `calc(${height}px - 1px)` }}
        >
          <form className="p-6 w-[450px]  flex flex-col gap-10 items-start  justify-center  lg:shadow-lg  lg:rounded-lg lg:bg-white">
            <div className="flex justify-center w-full  items-center text-2xl font-bold">
              <div
                className={`${
                  currentStep >= 1 && "bg-blue-800 text-white"
                } w-16 h-16 border rounded-full flex items-center justify-center`}
              >
                1
              </div>
              <div className="border w-44" />
              <div
                className={`${
                  currentStep >= 2 ? "bg-blue-800 text-white" : "text-black/10"
                } w-16 h-16 border rounded-full flex items-center justify-center`}
              >
                2
              </div>
            </div>
            <div className="flex flex-col items-start">
              <h1 className="text-2xl font-bold text-black">
                {currentStep === 1
                  ? "Enter Your MSP Details."
                  : "Enter Your Technician Details."}
              </h1>
              {errorMessage?.emailCheck && (
                <p className="text-red-500">Email does not exist.</p>
              )}
              {errorMessage?.fileSize && (
                <p className="text-red-500">
                  Maximum image size exeeds 400x400.
                </p>
              )}

              {errorMessage?.emptyFields && (
                <p className="text-red-500">Please fill out required field*.</p>
              )}
              {errorMessage?.techSignup && (
                <p className="text-red-500">
                  Custom Domain or Technician already exists*.
                </p>
              )}
              {successMessage && (
                <p className="text-emerald-500">
                  Redirecting you to Integrations Page...
                </p>
              )}
            </div>
            <div className="flex flex-col gap-4 w-full ">
              {currentStep === 1 ? (
                <>
                  <input
                    value={signupInputs.mspCustomDomain}
                    onChange={(e) =>
                      setSignupInputs(
                        "",
                        "mspCustomDomain",
                        e.target.value.toLowerCase()
                      )
                    }
                    type="text"
                    placeholder="Custom Domain Name*"
                    className=" rounded w-full p-2 border border-gray-300  bg-white text-black"
                  />
                  <input
                    value={signupInputs.mspInfo.mspName}
                    onChange={(e) =>
                      setSignupInputs("mspInfo", "mspName", e.target.value)
                    }
                    type="text"
                    placeholder="Company Name*"
                    className="rounded w-full p-2 border border-gray-300  bg-white text-black"
                  />
                  <input
                    value={signupInputs.mspInfo.phoneNumber}
                    onChange={(e) =>
                      setSignupInputs("mspInfo", "phoneNumber", e.target.value)
                    }
                    type="text"
                    placeholder="Company Phone Number*"
                    className="rounded w-full p-2 border border-gray-300  bg-white text-black"
                  />

                  <input
                    value={signupInputs.mspInfo.webSiteUrl}
                    onChange={(e) =>
                      setSignupInputs("mspInfo", "webSiteUrl", e.target.value)
                    }
                    type="text"
                    placeholder="Company Website*"
                    className="rounded w-full p-2 border border-gray-300  bg-white text-black"
                  />
                  <input
                    onChange={async (e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const img = new Image();
                        img.src = URL.createObjectURL(file);
                        img.onload = () => {
                          if (img.width >= 400 || img.height >= 400) {
                            setSignupInputs("mspInfo", "brandLogoFile", null);
                            setFileSizeError(true);
                            e.target.value = "";
                          } else {
                            setSignupInputs("mspInfo", "brandLogoFile", file);
                            setFileSizeError(false);
                          }
                        };
                      }
                    }}
                    type="file"
                    placeholder="Company Brand Logo URL"
                  />
                </>
              ) : (
                <>
                  <div className="flex gap-2">
                    <input
                      value={signupInputs.techInfo.firstName}
                      onChange={(e) =>
                        setSignupInputs("techInfo", "firstName", e.target.value)
                      }
                      type="text"
                      placeholder="First name*"
                      className="rounded w-full p-2 border border-gray-300  bg-white text-black"
                    />
                    <input
                      value={signupInputs.techInfo.lastName}
                      onChange={(e) =>
                        setSignupInputs("techInfo", "lastName", e.target.value)
                      }
                      type="text"
                      placeholder="Last name*"
                      className="rounded w-full p-2 border border-gray-300  bg-white text-black"
                    />
                  </div>

                  <input
                    value={signupInputs.techInfo.email}
                    onChange={(e) =>
                      setSignupInputs("techInfo", "email", e.target.value)
                    }
                    type="email"
                    placeholder="Email address*"
                    className="rounded w-full p-2 border border-gray-300  bg-white text-black"
                  />
                  <input
                    value={signupInputs.techInfo.role}
                    onChange={(e) =>
                      setSignupInputs("techInfo", "role", e.target.value)
                    }
                    type="text"
                    placeholder="Role*"
                    className="rounded w-full p-2 border border-gray-300  bg-white text-black"
                  />
                  <input
                    value={signupInputs.techInfo.phoneNumber}
                    onChange={(e) =>
                      setSignupInputs("techInfo", "phoneNumber", e.target.value)
                    }
                    type="text"
                    placeholder="Phone number*"
                    className="rounded w-full p-2 border border-gray-300  bg-white text-black"
                  />
                  <input
                    value={signupInputs.techInfo.password}
                    onChange={(e) =>
                      setSignupInputs("techInfo", "password", e.target.value)
                    }
                    type="password"
                    placeholder="Password*"
                    className="rounded w-full p-2 border border-gray-300  bg-white text-black"
                  />
                </>
              )}
            </div>
            <div className="flex flex-col gap-2 w-full">
              <button
                type="button"
                onClick={() => handleSignupProgression(router.push)}
                className="hover:bg-blue-500 text-lg font-bold w-full rounded bg-blue-800 text-white py-4"
              >
                {currentStep === 1 ? "Next" : "Sign up"}
              </button>

              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className={`${
                  currentStep === 1 ? "opacity-0" : "opacity-100"
                } hover:bg-blue-500 text-lg font-bold w-full rounded bg-blue-800 text-white py-4`}
              >
                Back
              </button>
            </div>
            <div className="flex flex-col gap-1">
              <Link onClick={() => clearMSPCredentials()} href={"/auth/login"}>
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

export default MSPSignupPage;
