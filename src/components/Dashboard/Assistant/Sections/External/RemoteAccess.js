"use client";
import useRemoteStore from "@/utils/store/assistant/sections/external/remote/remoteStore";

const RemoteAccess = () => {
  const { remoteBenefits } = useRemoteStore();

  return (
    <div className="flex-grow flex flex-col  overflow-hidden">
      <div className="flex-grow overflow-y-auto scrollbar-thin">
        <div className="flex flex-grow flex-col gap-4">
          <div className="flex flex-col ">
            <p className="dark:text-white/60 text-lg text-black/60">
              Connect to any device, anywhere, anytime.
            </p>
          </div>

          {remoteBenefits.map((benefit, index) => {
            const { title, description } = benefit;
            return (
              <div key={index}>
                <p className="text-lg font-bold">{title}</p>
                <p className="dark:text-white/60 text-black/60">
                  {description}
                </p>
              </div>
            );
          })}

          <a
            href="https://rmm.etech7.com:8040/Login?Reason=0"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="text-sm border transition ease-in hover:bg-[#FFFFFF] hover:text-[#465E89]   bg-[#465E89] text-white font-bold px-5 rounded-lg py-2 w-full">
              Remote Access
            </button>
          </a>
          <a
            href="https://rmm.etech7.com:8040"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="text-sm border transition ease-in hover:bg-[#FFFFFF] hover:text-[#465E89]   bg-[#465E89] text-white font-bold px-5 rounded-lg py-2 w-full">
              Remote Support
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default RemoteAccess;
