"use client";

import { useRouter } from "next/navigation";
import { googleLogout } from "@react-oauth/google";
import { AiOutlinePoweroff } from "react-icons/ai";

import Cookie from "js-cookie";

const Navbar = () => {
  const router = useRouter();

  const handleLogout = () => {
    Cookie.remove("session_token");
    Cookie.remove("user_id");
    googleLogout();
    router.push("/auth/login");
  };

  return (
    <nav className="w-full bg-black text-white font-bold flex justify-between items-center px-10 h-[60px] ">
      <h1>MyAutoPilot</h1>
      <AiOutlinePoweroff
        className="cursor-pointer"
        onClick={handleLogout}
        size={30}
      />
    </nav>
  );
};

export default Navbar;
