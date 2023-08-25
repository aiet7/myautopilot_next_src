import { FaSpinner } from "react-icons/fa";

const Loading = () => {
  return (
    <div className="bg-white absolute top-0 left-0 right-0 bottom-0 w-full h-full flex flex-col items-center justify-center gap-4">
      <div className="flex items-center gap-2">
        {"Welcome back, pilot!".split("").map((char, index) => (
          <span
            key={index}
            className="wave-animation font-bold lg:text-4xl"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {char}
          </span>
        ))}
      </div>
      <FaSpinner size={30} className="animate-spin text-black" />
    </div>
  );
};

export default Loading;
