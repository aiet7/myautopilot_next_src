import Image from "next/image";

const Loading = () => {
  return (
    <div className="bg-white absolute top-0 left-0 right-0 bottom-0 w-full h-full flex flex-col  items-center justify-center gap-4">
      <Image
        priority
        src="/etech7_logo.webp"
        alt="Etech7_Login_Logo"
        width={300}
        height={300}
      />
      <div className="flex items-end text-4xl loading-dots text-black">
        <h2 className="">Logging in</h2>
        <span>.</span>
        <span>.</span>
        <span>.</span>
      </div>
    </div>
  );
};

export default Loading;
