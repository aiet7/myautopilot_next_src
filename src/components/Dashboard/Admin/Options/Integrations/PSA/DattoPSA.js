"use client";

import useIntegrationsStore from "@/utils/store/admin/control/integrations/integrationsStore";
import useUiStore from "@/utils/store/ui/uiStore";
import Image from "next/image";

import Link from "next/link";
import useUserStore from "@/utils/store/user/userStore";

const DattoPSA = () => {
  const { user } = useUserStore();
  const { handleIntegrationsCard } = useIntegrationsStore();
  const { openAdmin, handleHistoryMenu } = useUiStore();
  return (
    <div
      onClick={() => {
        if (window.innerWidth < 1023) {
          openAdmin && handleHistoryMenu(false);
        }
      }}
      className={`relative flex flex-col h-full w-full ${
        openAdmin && "lg:opacity-100 opacity-5 xl:ml-[350px]"
      }  dark:bg-black transition-all duration-300 ease bg-white`}
    >
      <div className="w-full h-full flex flex-col">
        <div className="dark:border-b-white/20 border-b p-4">
          <h1 className="text-2xl">Datto PSA Integration</h1>
        </div>
        <div className="flex flex-col  gap-2 overflow-auto scrollbar-thin lg:flex-row lg:my-12 lg:mx-4">
          <div className="border">
            <div className="flex flex-col">
              <div className="dark:bg-white/60 px-4 h-44 flex justify-center items-center border-b lg:w-80">
                <Image
                  src="/images/logo-Autotask.png"
                  alt="Card Image"
                  width={250}
                  height={250}
                  priority={true}
                />
              </div>
              <div className="flex flex-col">
                <Link
                  href={`/${user?.mspCustomDomain}/dashboard/${user?.id}/admin/msp-integrations`}
                >
                  <button
                    onClick={() => handleIntegrationsCard("cards")}
                    className="dark:text-white dark:hover:bg-white/20 hover:bg-black/5 text-black px-4 py-2 w-full text-left text-sm border-b"
                  >
                    Integration Center
                  </button>
                </Link>
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
      </div>
    </div>
  );
};

export default DattoPSA;
