"use client";

import useIntegrationsStore from "@/utils/store/admin/control/integrations/integrationsStore";
import Image from "next/image";
const DattoPSA = () => {
  const { handleIntegrationsCard } = useIntegrationsStore();

  return (
    <>
      <div className="flex flex-col px-4 gap-2 overflow-auto scrollbar-thin lg:flex-row">
        <div className="border">
          <div className="flex flex-col">
            <div className="dark:bg-white/60 px-4 h-44 flex justify-center items-center border-b lg:w-80">
              <Image
                src="/logo-Autotask.png"
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
              <button className="bg-blue-500 text-white px-4 py-2  w-full text-sm text-left border-b">
                API Settings
              </button>
              <div className="flex flex-col  p-4">
                <h2 className="text-2xl">Help Topics</h2>
                <a
                  target="_blank"
                  href="https://ww1.autotask.net/help/Content/2_Getting_Started/GETTING_STARTED_LANDING.htm"
                  className="hover:underline text-sm text-blue-800"
                >
                  Datto Autotask Documentation
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full border">
          <div className="flex flex-col">
            <div className="flex flex-col p-4 border-b h-28">
              <p className="text-xl">Datto PSA Configuration Settings</p>
              <p>API Setup</p>
            </div>
            <div className="flex flex-col p-4 gap-6 text-sm">
              <div className="flex flex-col gap-6 lg:flex-row ">
                <div className="flex flex-col w-full gap-1">
                  <p>Username</p>
                  <p className="dark:text-white/60 text-black/60">
                    The username you use to login to Autotask
                  </p>
                  <input className="border p-1" />
                </div>
              </div>
              <div className="flex flex-col gap-6 lg:flex-row">
                <div className="flex flex-col w-full gap-1">
                  <p>Password</p>
                  <p className="dark:text-white/60 text-black/60">
                    The password you use to login to Autoask
                  </p>
                  <input className="border p-1" />
                </div>
              </div>
            </div>
            <div className="p-4 flex  justify-end">
              <button className="hover:bg-blue-500 bg-blue-800 text-white px-3 py-1">
                Authenticate
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DattoPSA;
