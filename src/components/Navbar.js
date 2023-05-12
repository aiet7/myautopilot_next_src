"use client";

import { useRouter } from "next/navigation";
import { googleLogout } from "@react-oauth/google";
import { AiOutlinePoweroff } from "react-icons/ai";

const Navbar = () => {
  const router = useRouter();

  const handleLogout = () => {
    googleLogout();
    router.push("auth/login");
  };

  return (
    <nav className="w-full bg-black text-white font-bold flex justify-between items-center py-5 px-10">
      <h1>MyAutoPilot</h1>
      <AiOutlinePoweroff onClick={handleLogout} size={30} />
    </nav>
  );
};

export default Navbar;
