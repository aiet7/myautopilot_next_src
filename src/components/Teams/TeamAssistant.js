"use client";

const TeamAssistant = ({ openTeamsAssistant }) => {
  return (
    <div
      className={`px-4 py-6 bg-[#f6f8fc] absolute z-10 top-0 bottom-0 right-0 transition-all duration-300 ease-in-out transform flex flex-col gap-4 ${
        openTeamsAssistant
          ? "translate-x-0 w-[300px] dark:shadow-white shadow-lg shadow-black/50"
          : "translate-x-full w-[300px]"
      } dark:bg-[#111111] dark:xl:border-white/20 xl:relative xl:translate-x-0 xl:min-w-[300px] xl:static xl:border-l`}
    ></div>
  );
};

export default TeamAssistant;
