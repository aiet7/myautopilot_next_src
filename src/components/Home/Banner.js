"use client";

import Image from "next/image";

const Banner = () => {
  return (
    <div className="w-full h-[500px] relative">
      <Image
        src="/myautopilot_banner.jpg"
        quality={100}
        layout="fill"
        objectFit="cover"
        alt="myautopilot banner"
      />
    </div>
  );
};

export default Banner;
