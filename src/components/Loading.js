
const Loading = () => {
  return (
    <div className="bg-white absolute top-0 left-0 right-0 bottom-0 w-full h-full flex flex-col  items-center justify-center gap-4">
      <div className="flex items-end text-8xl loading-dots text-blue-800">
        <span>.</span>
        <span>.</span>
        <span>.</span>
      </div>
    </div>
  );
};

export default Loading;
