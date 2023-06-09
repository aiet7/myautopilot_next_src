"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGoogleLogin } from "@react-oauth/google";
import MicrosoftLogin from "react-microsoft-login";
import { TiVendorMicrosoft } from "react-icons/ti";
import { FcGoogle } from "react-icons/fc";

import Loading from "../../../components/Loading.js";

import {
  isInputEmpty,
  isEmailInputValid,
} from "../../../utils/formValidations.js";

import Cookie from "js-cookie";

const Login = () => {
  const [height, setHeight] = useState(null);

  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const [showLoginForm, setShowLoginForm] = useState(false);

  const router = useRouter();

  const handleGoogleLogin = useGoogleLogin({
    scope:
      "https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/calendar.events.readonly https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/gmail.modify https://www.googleapis.com/auth/gmail.send https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/contacts https://www.googleapis.com/auth/contacts.readonly",
    onSuccess: async (tokenResponse) => {
      setLoading(true);
      try {
        const userInfo = await fetch(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          }
        );
        const info = await userInfo.json();

        const user = {
          firstName: info.given_name,
          lastName: info.family_name,
          businessEmail: info.email,
          businessName: "",
          businessPhone: "",
          address: {
            street: "",
            city: "",
            zipcode: "",
            state: "",
          },
        };

        const response = await fetch(
          // `http://localhost:9019/validateUser?token=${Boolean(
          //   tokenResponse.access_token
          // )}`,
          `https://etech7-wf-etech7-db-service.azuremicroservices.io/validateUser?token=${Boolean(
            tokenResponse.access_token
          )}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
          }
        );
        if (response.ok) {
          const googleUser = await response.json();
          router.push(`/dashboard/${googleUser.id}`);
          Cookie.set("google_session_token", tokenResponse.access_token, {
            expires: 7,
          });
          Cookie.set("user_id", googleUser.id, { expires: 7 });
        } else {
          setErrorMessage("Error with Google Login.");
        }
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    },
  });

  const handleMicrosoftLogin = async (err, data) => {
    setLoading(true);
    console.log(data);
    try {
      const {
        accessToken,
        account: { name, username },
      } = data;

      const fullName = name.split(" ");

      const user = {
        firstName: fullName[0],
        lastName: fullName[1],
        businessEmail: username,
        businessName: "",
        businessPhone: "",
        address: {
          street: "",
          city: "",
          zipcode: "",
          state: "",
        },
      };

      const response = await fetch(
        // `http://localhost:9019/validateUser?token=${Boolean(accessToken)}`,
        `https://etech7-wf-etech7-db-service.azuremicroservices.io/validateUser?token=${Boolean(
          accessToken
        )}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );

      if (response.ok) {
        const microsoftUser = await response.json();
        router.push(`/dashboard/${microsoftUser.id}`);
        Cookie.set("microsoft_session_token", accessToken, { expires: 7 });
        Cookie.set("user_id", microsoftUser.id, { expires: 7 });
      } else {
        setErrorMessage("Error with Microsoft Login.");
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailCheck = async () => {
    if (isInputEmpty(email) || !isEmailInputValid(email)) {
      setErrorMessage("A valid email is required.");
      return;
    }

    try {
      const response = await fetch(
        /*`http://localhost:9019/getUserByEmail?email=${email}`*/
        `https://etech7-wf-etech7-db-service.azuremicroservices.io/getUserByEmail?email=${email}`
      );
      const user = await response.json();
      if (user.message === "No Users") {
        setErrorMessage("Account does not exists.  Please sign up.");
      } else if (user.password === null) {
        setErrorMessage(
          "Account was created with a provider sign in.  Please sign in with your provider."
        );
      } else {
        setErrorMessage("");
        setShowLoginForm(true);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleEmailLogin = async () => {
    if (isInputEmpty(password)) {
      setErrorMessage("A password is required.");
      return;
    }
    setLoading(true);

    const user = {
      businessEmail: email,
      password: password,
    };

    try {
      const response = await fetch(
        /*`http://localhost:9019/validateUser`,*/
        `https://etech7-wf-etech7-db-service.azuremicroservices.io/validateUser`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );

      setErrorMessage("");
      if (response.ok) {
        const user = await response.json();
        router.push(`/dashboard/${user.id}`);
        Cookie.set("session_token", user.id, { expires: 7 });
        Cookie.set("user_id", user.id, { expires: 7 });
      } else {
        setErrorMessage("Invalid username or password.");
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const handleShowSignup = () => {
    router.push("/auth/signup");
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHeight(window.innerHeight);

      let session_token =
        Cookie.get("google_session_token") ||
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
          style={{ height: `${height}px` }}
        >
          <form className="w-[300px]  flex flex-col items-center gap-4">
            <Image
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
                      handleEmailCheck();
                    }
                  }}
                  type="email"
                  placeholder="Enter your email"
                  className="w-full p-2 border border-gray-300 bg-white text-black"
                />

                <button
                  onClick={handleEmailCheck}
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
                    onClick={() => handleGoogleLogin()}
                    type="button"
                    className="w-[300px] p-2 bg-red-500 text-white font-bold flex items-center justify-start rounded-sm gap-2"
                  >
                    <FcGoogle size={30} />
                    Sign in with Google
                  </button>

                  <MicrosoftLogin
                    graphScopes={["mail.read", "mail.readwrite", "mail.send"]}
                    clientId="d78746f9-41d1-4997-97eb-7c600d27f11e"
                    authCallback={handleMicrosoftLogin}
                    redirectUri="https://myautopilot.azurewebsites.net"
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
                      handleEmailLogin();
                    }
                  }}
                  type="password"
                  placeholder="Enter your password"
                  className="w-full p-2 border border-gray-300  bg-white text-black"
                />
                <button
                  onClick={handleEmailLogin}
                  type="button"
                  className="w-full  py-2 bg-green-700 text-white font-bold rounded-sm"
                >
                  Continue
                </button>
              </>
            )}

            <button
              onClick={() => handleShowSignup()}
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
