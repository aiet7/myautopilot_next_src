"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGoogleLogin } from "@react-oauth/google";
import MicrosoftLogin from "react-microsoft-login";
import { TiVendorMicrosoft } from "react-icons/ti";
import { FcGoogle } from "react-icons/fc";

import Cookie from "js-cookie";

const Login = () => {
  const [height, setHeight] = useState(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const [showLoginForm, setShowLoginForm] = useState(false);

  const router = useRouter();

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
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
      };

      const response = await fetch(
        `http://localhost:9019/validateUser?token=${Boolean(
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
        Cookie.set("session_token", tokenResponse.access_token, { expires: 7 });
        Cookie.set("user_id", googleUser.id, { expires: 7 });
      } else {
        setErrorMessage("Error with Google Login.");
      }
    },
  });

  const handleEmailCheck = async () => {
    const response = await fetch(
      `http://localhost:9019/getUser?email=${email}`
    );
    const user = await response.json();
    if (user.message === "No Users") {
      setErrorMessage("Account does not exists.  Please sign up.");
    } else if (user.password === null) {
      setErrorMessage(
        "Account was created with Google sign in.  Please sign in with Google."
      );
    } else {
      setErrorMessage("");
      setShowLoginForm(true);
    }
  };

  const handleEmailLogin = async () => {
    const user = {
      businessEmail: email,
      password: password,
    };
    const response = await fetch(`http://localhost:9019/validateUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (response.ok) {
      const user = await response.json();
      router.push(`/dashboard/${user.id}`);
      Cookie.set("session_token", user.id, { expires: 7 });
      Cookie.set("user_id", user.id, { expires: 7 });
    } else {
      setErrorMessage("Invalid username or password.");
    }
  };

  const handleShowSignup = () => {
    router.push("/auth/signup");
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHeight(window.innerHeight);

      const session_token = Cookie.get("session_token");
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
      {height && (
        <div
          className="bg-gradient-to-b from-white via-white to-gray-400 h-full flex justify-center items-center"
          style={{ height: `${height}px` }}
        >
          <form className="w-[300px]  flex flex-col items-center gap-4">
            <Image
              src="https://media.istockphoto.com/id/1217110109/vector/circuit-board-in-the-shape-of-human-brain.jpg?s=612x612&w=0&k=20&c=wBxXfTtG41CR8XvDHw70ItsRGU4iSWhZ15osRuOnuO8="
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
                  type="email"
                  placeholder="Enter your email"
                  className="w-full p-2 border border-gray-300 rounded-sm bg-white"
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
                  <span className="mx-2">or</span>
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

                  <MicrosoftLogin clientId="f8c7976f-3e93-482d-88a3-62a1133cbbc3">
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
                  type="password"
                  placeholder="Enter your password"
                  className="w-full p-2 border border-gray-300 rounded-sm bg-white"
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
