"use client";
import useIntegrationsStore from "@/utils/store/admin/control/integrations/integrationsStore";
import Image from "next/image";

const Workspace = () => {
  const { handleIntegrationsCard } = useIntegrationsStore();

  return (
    <>
      <div className="flex flex-col px-4 gap-2 overflow-auto scrollbar-thin lg:flex-row">
        <div className="border">
          <div className="flex flex-col">
            <div className="dark:bg-white/60 px-4 h-44   flex justify-center items-center border-b lg:w-80">
              <Image
                src="/images/logo-GoogleWS.png"
                alt="Card Image"
                width={250}
                height={250}
                priority={true}
              />
            </div>
            <div className="flex flex-col">
              <button
                onClick={() => handleIntegrationsCard("cards")}
                className="dark:text-white dark:hover:bg-white/20 hover:bg-black/5 text-black px-4 py-2  w-full text-left text-sm border-b"
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
                  href="https://support.google.com/a/users/answer/1631886?hl=en"
                  className="hover:underline text-sm text-blue-800"
                >
                  Google Workspace Documentation
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full border">
          <div className="flex flex-col">
            <div className="flex flex-col p-4 border-b h-28">
              <p className="text-xl">Google Workspace Configuration Settings</p>
              <p>API Setup</p>
            </div>
            <div className="flex flex-col p-4 gap-6 text-sm">
              <div className="flex flex-col gap-6 lg:flex-row ">
                <div className="flex flex-col w-full gap-1">
                  <p>Client ID</p>
                  <p className="dark:text-white/60 text-black/60">
                    Your Client_ID that is assigned to you from Google
                  </p>
                  <input className="border p-1" />
                </div>
                <div className="flex flex-col w-full gap-1">
                  <p>Google ID</p>
                  <p className="dark:text-white/60 text-black/60">
                    Your Google login ID
                  </p>
                  <input className="border p-1" />
                </div>
              </div>

              <div className="flex flex-col w-full gap-1">
                <p>Secret Key</p>
                <p className="dark:text-white/60 text-black/60">
                  Your generated Secret Key that was created via Google API
                </p>
                <input className="border p-1" />
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

export default Workspace;
