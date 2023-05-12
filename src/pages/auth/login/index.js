"use client";

import Image from "next/image";

import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import { TiVendorMicrosoft } from "react-icons/ti";

const Login = () => {
  const router = useRouter();
  const handleGoogleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => router.push("/dashboard"),
    onError: (error) => router.push("/auth/login"),
  });

  const handleShowSignup = () => {
    router.push("/auth/signup");
  };

  return (
    <div className="bg-gradient-to-b from-white via-white to-gray-400 min-h-screen flex justify-center items-center">
      <form className="w-[250px] flex flex-col items-center gap-4">
        <h1 className="text-2xl font-bold text-black">Sign In To MyJarvis</h1>
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

        <button
          onClick={() => handleGoogleLogin()}
          type="button"
          className="w-full p-2 bg-red-500 text-white font-bold flex items-center justify-start rounded-md gap-2"
        >
          <FcGoogle size={30} />
          Sign in with Google
        </button>

        <button
          type="button"
          className="w-full p-2 py-2 bg-blue-500 text-white font-bold flex items-center justify-start rounded-md gap-2"
        >
          <TiVendorMicrosoft size={30} />
          Sign in with Microsoft
        </button>
        <button
          onClick={() => handleShowSignup()}
          type="button"
          className="w-full text-blue-500 text-sm flex items-center justify-start"
        >
          Dont have an account?
        </button>
      </form>
    </div>
  );
};

export default Login;
