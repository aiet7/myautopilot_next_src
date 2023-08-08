"use client";

import Image from "next/image";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between px-40 py-2">
      <div className="flex items-center gap-4">
        <Image
          src="/myautopilot_logo.png"
          width={50}
          height={50}
          quality={100}
          alt="Circuit board in the shape of a human brain"
        />
        <p className="font-bold">MyAutoPilot</p>
      </div>
      <div className="flex items-center gap-4 text-sm">
        <button>Learn</button>
        <button>Support</button>
        <button className="bg-blue-800 text-white p-2">Free Account</button>
        <button>Sign in</button>
      </div>
    </div>
  );
};

export default Navbar;
