"use client";

import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import Loading from "../../../components/Loading.js";

import { UsaStates } from "usa-states";
import useAuthStore from "@/utils/store/auth/authStore.js";
import useUiStore from "@/utils/store/ui/uiStore.js";

const Signup = () => {
  const usStates = new UsaStates();
  const router = useRouter();
  const { height, setHeight } = useUiStore();

  const {
    firstName,
    lastName,
    companyId,
    companyName,
    phoneNumber,
    companyAddress,
    loading,
    errorMessage,
    showSignupForm,
    setEmail,
    setPassword,
    setFirstName,
    setLastName,
    setCompanyId,
    setCompanyName,
    setPhoneNumber,
    setCompanyAddress,
    handleSignupEmailCheck,
    handleSignupCredentialsAuth,
    handleShowLogin,
  } = useAuthStore();

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
      {loading ? <Loading /> : null}
      {height && (
        <div
          className="relative z-[99]  bg-gradient-to-b from-white via-white to-gray-400 h-full flex justify-center items-center"
          style={{ height: `calc(${height}px - 1px)` }}
        >
          <form className="w-[300px] flex flex-col items-center gap-4">
            <Image
              priority
              src="/etech7_logo_auth.webp"
              alt="Circuit board in the shape of a human brain"
              width={50}
              height={50}
            />
            <h1 className="text-xl font-bold text-black text-center">
              Create your account
            </h1>
            <p className="text-center text-black text-sm">
              Please note that all of the fields are required for account
              creation.
            </p>
            <p className="text-red-500 text-sm">{errorMessage}</p>

            {!showSignupForm && (
              <>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleSignupEmailCheck();
                    }
                  }}
                  type="email"
                  placeholder="Enter your email"
                  className="w-full p-2 border border-gray-300  bg-white text-black"
                />
                <button
                  onClick={handleSignupEmailCheck}
                  type="button"
                  className="w-full py-2 bg-[#00AEEE] text-white font-bold rounded-sm"
                >
                  Continue
                </button>
              </>
            )}
            {showSignupForm && (
              <>
                <div className="flex gap-2">
                  <input
                    value={firstName || ""}
                    onChange={(e) => setFirstName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleSignupCredentialsAuth(router.push);
                      }
                    }}
                    type="text"
                    placeholder="First name"
                    className="w-full p-2 border border-gray-300 bg-white text-black"
                  />
                  <input
                    value={lastName || ""}
                    onChange={(e) => setLastName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleSignupCredentialsAuth(router.push);
                      }
                    }}
                    type="text"
                    placeholder="Last name"
                    className="w-full p-2 border border-gray-300 bg-white text-black"
                  />
                </div>
                <input
                  disabled
                  value={companyId || ""}
                  onChange={(e) => setCompanyId(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleSignupCredentialsAuth(router.push);
                    }
                  }}
                  type="text"
                  placeholder="Company Id"
                  className="w-full p-2 border border-gray-300 bg-white text-black"
                />
                <input
                  value={companyName || ""}
                  onChange={(e) => setCompanyName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleSignupCredentialsAuth(router.push);
                    }
                  }}
                  type="text"
                  placeholder="Company name"
                  className="w-full p-2 border border-gray-300 bg-white text-black"
                />
                <div className="flex gap-2">
                  <input
                    value={companyAddress.street || ""}
                    onChange={(e) =>
                      setCompanyAddress("street", e.target.value)
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleSignupCredentialsAuth(router.push);
                      }
                    }}
                    type="text"
                    placeholder="Street"
                    className="w-full p-2 border border-gray-300 bg-white text-black"
                  />

                  <input
                    value={companyAddress.city || ""}
                    onChange={(e) => setCompanyAddress("city", e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleSignupCredentialsAuth(router.push);
                      }
                    }}
                    type="text"
                    placeholder="City "
                    className="w-full p-2 border border-gray-300 bg-white text-black"
                  />
                </div>
                <div className="w-full flex gap-2">
                  <input
                    value={companyAddress.zipcode || ""}
                    maxLength={5}
                    onChange={(e) =>
                      setCompanyAddress("zipcode", e.target.value)
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleSignupCredentialsAuth(router.push);
                      }
                    }}
                    type="text"
                    placeholder="Zipcode"
                    className="w-full p-2 border border-gray-300 bg-white text-black"
                  />
                  <select
                    value={companyAddress.state || ""}
                    onChange={(e) => setCompanyAddress("state", e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleSignupCredentialsAuth(router.push);
                      }
                    }}
                    className={`w-full p-2 border rounded-none border-gray-300  ${
                      companyAddress.state
                        ? "bg-white text-black"
                        : "bg-white text-gray-400"
                    }`}
                  >
                    <option value="">State</option>
                    {usStates.states.map((state) => (
                      <option
                        key={state.abbreviation}
                        value={state.abbreviation}
                      >
                        {state.abbreviation}
                      </option>
                    ))}
                  </select>
                </div>
                <input
                  value={phoneNumber || ""}
                  maxLength={10}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleSignupCredentialsAuth(router.push);
                    }
                  }}
                  type="text"
                  placeholder="Phone number"
                  className="w-full p-2 border border-gray-300 bg-white text-black"
                />
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleSignupCredentialsAuth(router.push);
                    }
                  }}
                  type="password"
                  placeholder="Password"
                  className="w-full p-2 border border-gray-300 bg-white text-black"
                />
                <button
                  onClick={() => handleSignupCredentialsAuth(router.push)}
                  type="button"
                  className="w-full  py-2 bg-[#00AEEE] text-white font-bold rounded-sm"
                >
                  Continue
                </button>
              </>
            )}
            <p className="w-full">
              Already have an account?{" "}
              <span
                onClick={() => handleShowLogin(router.push)}
                className="text-[#00AEEE] cursor-pointer"
              >
                Login
              </span>
            </p>
          </form>
        </div>
      )}
    </>
  );
};

export default Signup;
