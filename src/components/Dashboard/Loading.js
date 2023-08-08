import { FaSpinner } from "react-icons/fa";

const Loading = () => {
  return (
    <div className="bg-black/70 absolute top-0 left-0 right-0 bottom-0 w-full h-full flex items-center justify-center">
      <FaSpinner size={110} className="animate-spin text-white" />
    </div>
  );
};

export default Loading;
