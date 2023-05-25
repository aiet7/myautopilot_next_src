"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import MicrosoftLogin from "react-microsoft-login";
import { TiVendorMicrosoft } from "react-icons/ti";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const [height, setHeight] = useState(null);

  const router = useRouter();

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log(tokenResponse);
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
      console.log(info);
      router.push("/dashboard");
    },
  });

  const handleShowSignup = () => {
    router.push("/auth/signup");
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
      {height && (
        <div
          className="bg-gradient-to-b from-white via-white to-gray-400 h-full flex justify-center items-center"
          style={{ height: `${height}px` }}
        >
          <form className="w-[250px]  flex flex-col items-center gap-4">
            <h1 className="text-2xl font-bold text-black text-center">
              Sign In To MyJarvis
            </h1>
            <Image
              src="https://media.istockphoto.com/id/1217110109/vector/circuit-board-in-the-shape-of-human-brain.jpg?s=612x612&w=0&k=20&c=wBxXfTtG41CR8XvDHw70ItsRGU4iSWhZ15osRuOnuO8="
              alt="Circuit board in the shape of a human brain"
              width={175}
              height={175}
            />

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            <button
              type="submit"
              className="w-full py-2 bg-green-700 text-white font-bold rounded-md"
            >
              Continue
            </button>
            <div className="flex items-center ">
              <span className="mx-2">or</span>
            </div>
            <div className="flex flex-col gap-1">
              <button
                onClick={() => handleGoogleLogin()}
                type="button"
                className="w-[250px] p-2 bg-red-500 text-white font-bold flex items-center justify-start rounded-md gap-2"
              >
                <FcGoogle size={30} />
                Sign in with Google
              </button>

              <MicrosoftLogin clientId="f8c7976f-3e93-482d-88a3-62a1133cbbc3">
                <button
                  
                  type="button"
                  className="w-[250px] p-2 bg-blue-500 text-white font-bold flex items-center justify-start rounded-md gap-2"
                >
                  <TiVendorMicrosoft size={30} />
                  Sign in with Microsoft
                </button>
              </MicrosoftLogin>
            </div>
            <button
              onClick={() => handleShowSignup()}
              type="button"
              className="w-full text-blue-500 text-sm flex items-center justify-start"
            >
              Dont have an account?
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Login;
