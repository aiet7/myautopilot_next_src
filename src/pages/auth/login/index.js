"use client";

import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGoogleLogin } from "@react-oauth/google";
import MicrosoftLogin from "react-microsoft-login";
import { TiVendorMicrosoft } from "react-icons/ti";
import { FcGoogle } from "react-icons/fc";

import Loading from "../../../components/Loading.js";

import Cookie from "js-cookie";
import useAuthStore from "@/utils/store/auth/authStore.js";
import useUiStore from "@/utils/store/ui/uiStore.js";

const Login = () => {
  const router = useRouter();
  const { height, setHeight } = useUiStore();
  const {
    loading,
    errorMessage,
    showLoginForm,
    setEmail,
    setPassword,
    handleGoogleAuth,
    handleMicrosoftAuth,
    handleLoginCredentialsAuth,
    handleLoginEmailCheck,
    handleShowSignup,
  } = useAuthStore();

  const handleSuccess = handleGoogleAuth(router.push);

  const handleGoogleLogin = useGoogleLogin({
    flow: "auth-code",
    scope:
      "https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/calendar.events.readonly https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/gmail.modify https://www.googleapis.com/auth/gmail.send https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/contacts https://www.googleapis.com/auth/contacts.readonly",
    onSuccess: async (codeResponse) => {
      await handleSuccess(codeResponse);
    },
  });

  const handleMicrosoftLogin = (err, data) => {
    handleMicrosoftAuth(router.push, err, data);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHeight(window.innerHeight);

      let session_token =
        Cookie.get("Secure-next.session-token-g") ||
        Cookie.get("microsoft_session_token") ||
        Cookie.get("session_token");

      const user_id = Cookie.get("user_id");

      if (session_token && user_id) {
        router.push(`/dashboard/${user_id}`);
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
      {loading ? <Loading /> : null}
      {height && (
        <div
          className="bg-gradient-to-b from-white via-white to-gray-400 h-full flex justify-center items-center"
          style={{ height: `calc(${height}px - 1px)` }}
        >
          <form className="w-[300px]  flex flex-col items-center gap-4">
            <Image
              priority
              src="/myautopilot_logo.png"
              alt="Circuit board in the shape of a human brain"
              width={125}
              height={125}
            />
            <h1 className="text-3xl font-bold text-black text-center">
              Welcome back
            </h1>
            <p className="text-red-500 text-sm">{errorMessage}</p>
            {!showLoginForm && (
              <>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleLoginEmailCheck();
                    }
                  }}
                  type="email"
                  placeholder="Enter your email"
                  className="w-full p-2 border border-gray-300 bg-white text-black"
                />

                <button
                  onClick={() => handleLoginEmailCheck()}
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
                    onClick={handleGoogleLogin}
                    type="button"
                    className="w-[300px] p-2 bg-red-500 text-white font-bold flex items-center justify-start rounded-sm gap-2"
                  >
                    <FcGoogle size={30} />
                    Sign in with Google
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
                    authCallback={handleMicrosoftLogin}
                    redirectUri="https://myautopilot.ai"
                  >
                    <button
                      type="button"
                      className="w-[300px] p-2 bg-blue-500 text-white font-bold flex items-center justify-start rounded-sm gap-2"
                    >
                      <TiVendorMicrosoft size={30} />
                      Sign in with Microsoft
                    </button>
                  </MicrosoftLogin>
                </div>
              </>
            )}
            {showLoginForm && (
              <>
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
                  className="w-full  py-2 bg-green-700 text-white font-bold rounded-sm"
                >
                  Continue
                </button>
              </>
            )}

            <button
              onClick={() => handleShowSignup(router.push)}
              type="button"
              className="w-full text-blue-500 text-sm flex items-center justify-start"
            >
              Do not have an account?
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Login;
