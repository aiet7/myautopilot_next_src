"use client";

import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGoogleLogin } from "@react-oauth/google";
import MicrosoftLogin from "react-microsoft-login";
import { TiVendorMicrosoft } from "react-icons/ti";
import { FcGoogle } from "react-icons/fc";

import Loading from "../../../components/Loading.js";

import { UsaStates } from "usa-states";
import useAuthStore from "@/utils/store/auth/authStore.js";
import useUiStore from "@/utils/store/ui/uiStore.js";

const Signup = () => {
  const usStates = new UsaStates();
  const router = useRouter();
  const { height, setHeight } = useUiStore();

  const {
    address,
    loading,
    errorMessage,
    showSignupForm,
    setEmail,
    setPassword,
    setFirstName,
    setLastName,
    setBusinessName,
    setPhoneNumber,
    setAddress,
    handleGoogleAuth,
    handleMicrosoftAuth,
    handleSignupEmailCheck,
    handleSignupCredentialsAuth,
    handleShowLogin,
  } = useAuthStore();

  const handleSuccess = handleGoogleAuth(router.push);

  const handleGoogleSignup = useGoogleLogin({
    flow: "auth-code",
    scope:
      "https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/calendar.events.readonly https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/gmail.modify https://www.googleapis.com/auth/gmail.send https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/contacts https://www.googleapis.com/auth/contacts.readonly",
    onSuccess: async (codeResponse) => {
      await handleSuccess(codeResponse);
    },
  });

  const handleMicrosoftSignup = (err, data) => {
    handleMicrosoftAuth(router.push, err, data);
  };

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
              src="/myautopilot_logo.png"
              alt="Circuit board in the shape of a human brain"
              width={125}
              height={125}
            />
            <h1 className="text-3xl font-bold text-black text-center">
              Create your account
            </h1>
            <p className="text-center text-black text-sm">
              Please note that the optional fields can be updated/changed in
              your profile page. Optional fields are not required during sign
              up.
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
                  className="w-full py-2 bg-green-700 text-white font-bold rounded-sm"
                >
                  Continue
                </button>

                <div className="flex items-center w-full">
                  <div className="border border-black/10 w-full" />
                  <span className="mx-2 text-black">or</span>
                  <div className="border border-black/10 w-full" />
                </div>
                <div className="flex flex-col gap-1">
                  <button
                    onClick={() => handleGoogleSignup()}
                    type="button"
                    className="w-[300px] p-2 bg-red-500 text-white font-bold flex items-center justify-start rounded-sm gap-2"
                  >
                    <FcGoogle size={30} />
                    Sign up with Google
                  </button>

                  <MicrosoftLogin
                    graphScopes={[
                      "mail.read",
                      "mail.readwrite",
                      "mail.send",
                      "calendars.read",
                      "calendars.readwrite",
                      "contacts.read",
                      "contacts.readwrite",
                    ]}
                    clientId="14a9d59a-1d19-486e-a4db-d81c5410a453"
                    authCallback={handleMicrosoftSignup}
                    redirectUri="https://myautopilot.ai"
                  >
                    <button
                      type="button"
                      className="w-[300px] p-2 bg-blue-500 text-white font-bold flex items-center justify-start rounded-sm gap-2"
                    >
                      <TiVendorMicrosoft size={30} />
                      Sign up with Microsoft
                    </button>
                  </MicrosoftLogin>
                </div>
              </>
            )}
            {showSignupForm && (
              <>
                <div className="flex gap-2">
                  <input
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
                  onChange={(e) => setBusinessName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleSignupCredentialsAuth(router.push);
                    }
                  }}
                  type="text"
                  placeholder="Business name"
                  className="w-full p-2 border border-gray-300 bg-white text-black"
                />
                <div className="flex gap-2">
                  <input
                    onChange={(e) => setAddress("street", e.target.value)}
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
                    onChange={(e) => setAddress("city", e.target.value)}
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
                    maxLength={5}
                    onChange={(e) => setAddress("zipcode", e.target.value)}
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
                    onChange={(e) => setAddress("state", e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleSignupCredentialsAuth(router.push);
                      }
                    }}
                    className={`w-full p-2 border rounded-none border-gray-300  ${
                      address.state
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
                  maxLength={10}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleSignupCredentialsAuth(router.push);
                    }
                  }}
                  type="text"
                  placeholder="*Phone number"
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
                  placeholder="*Password"
                  className="w-full p-2 border border-gray-300 bg-white text-black"
                />
                <button
                  onClick={() => handleSignupCredentialsAuth(router.push)}
                  type="button"
                  className="w-full  py-2 bg-green-700 text-white font-bold rounded-sm"
                >
                  Continue
                </button>
              </>
            )}
            <button
              onClick={() => handleShowLogin(router.push)}
              type="button"
              className="w-full text-blue-500 text-sm flex items-center justify-start"
            >
              Already have an account?
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Signup;
