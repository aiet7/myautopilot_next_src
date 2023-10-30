"use client";

import usePasswordsStore from "@/utils/store/assistant/sections/passwords/passwordsStore";

const Passwords = () => {
  const { passwordBenefits } = usePasswordsStore();

  return (
    <div className="flex-grow flex flex-col gap-8 overflow-hidden">
      <h3 className="dark:border-white/40 text-lg border-b">Passwords</h3>
      <div className="flex-grow overflow-y-auto scrollbar-thin">
        <div className="flex flex-grow flex-col gap-8">
          <div className="flex flex-col">
            <p className="text-2xl">Manage your privileged access securely</p>
            <p className="dark:text-white/60 text-lg text-black/60">
              Passportal™ empowers safe, privileged access management across
              your devices, networks, and applications while helping you create,
              manage, and automate strong credentials.
            </p>
          </div>
          {passwordBenefits.map((benefit, index) => {
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
            href="https://etech7.mypasswordapp.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="hover:bg-blue-500 bg-blue-800 text-white py-2 w-full">
              Passwords Portal
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Passwords;
