"use client";

import useIntegrationsStore from "@/utils/store/admin/control/integrations/integrationsStore";
import Image from "next/image";

const Automate = () => {
  const { handleIntegrationsCard } = useIntegrationsStore();
  return (
    <>
      <div className="flex flex-col px-4 gap-2 overflow-auto scrollbar-thin lg:flex-row">
        <div className="border">
          <div className="flex flex-col">
            <div className="dark:bg-white/60 px-4 h-44 flex justify-center items-center border-b lg:w-80">
              <Image
                src="/logo-Automate.png"
                alt="Card Image"
                width={250}
                height={250}
              />
            </div>
            <div className="flex flex-col">
              <button
                onClick={() => handleIntegrationsCard("cards")}
                className="dark:text-white dark:hover:bg-white/20 hover:bg-black/5 text-black px-4 py-2 w-full text-left text-sm border-b"
              >
                Integration Center
              </button>
              <button className="dark:text-white  bg-blue-500 text-white px-4 py-2 w-full text-sm text-left border-b">
                API Settings
              </button>
              <div className="flex flex-col  p-4">
                
                  <h2 className="text-2xl">Help Topics</h2>
                  <a
                    target="_blank"
                    href="https://docs.connectwise.com/ConnectWise_Automate_Documentation"
                    className="hover:underline text-sm text-blue-800"
                  >
                    ConnectWise Automate Documentation
                  </a>
                
              </div>
            </div>
          </div>
        </div>
        <div className="w-full border">
          <div className="flex flex-col">
            <div className="flex flex-col p-4 border-b h-28">
              <p className="text-xl">Automate Configuration Settings</p>
              <p>API Setup</p>
            </div>
            <div className="flex flex-col p-4 gap-6 text-sm">
              <div className="flex flex-col gap-6 lg:flex-row ">
                <div className="flex flex-col w-full gap-1">
                  <p>Username</p>
                  <p className="dark:text-white/60 text-black/60">
                    Your username used to log into Connectwise Automate
                  </p>
                  <input className="border p-1" />
                </div>
                <div className="flex flex-col w-full gap-1">
                  <p>Server Domain Name</p>
                  <p className="dark:text-white/60 text-black/60">
                    Your server domain name
                  </p>
                  <input className="border p-1" />
                </div>
              </div>
              <div className="flex flex-col gap-6 lg:flex-row">
                <div className="flex flex-col w-full gap-1">
                  <p>Password</p>
                  <p className="dark:text-white/60 text-black/60">
                    Your password used to log into Connectwise Automate
                  </p>
                  <input className="border p-1" />
                </div>
                <div className="flex flex-col w-full gap-1">
                  <p>Sync Devices as Assets</p>
                  <p className="dark:text-white/60 text-black/60">
                    This will enable devices to be synced from Connectwise
                    ‎Automate
                  </p>
                  <input className="border p-1" />
                </div>
              </div>
            </div>
            <div className="p-4 flex gap-1 justify-end">
              <button className="hover:bg-blue-500 bg-blue-800 text-white px-3 py-1">
                Save
              </button>
              <button className="hover:bg-red-500 bg-red-600 text-white px-3 py-1">
                Disable Automate
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Automate;
