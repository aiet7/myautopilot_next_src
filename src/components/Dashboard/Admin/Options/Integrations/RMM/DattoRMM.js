"use client";

import useIntegrationsStore from "@/utils/store/admin/control/integrations/integrationsStore";
import useUiStore from "@/utils/store/ui/uiStore";
import Image from "next/image";
import Link from "next/link";
import useUserStore from "@/utils/store/user/userStore";
import { useRouter } from "next/router";

const DattoRMM = () => {
  const router = useRouter();

  const { user } = useUserStore();

  const { handleIntegrationsCard } = useIntegrationsStore();
  const { openAdmin, handleHistoryMenu } = useUiStore();
  const isMSP = router.pathname.includes("msp-integrations");

  return (
    <div
      onClick={() => {
        if (window.innerWidth < 1023) {
          openAdmin && handleHistoryMenu(false);
        }
      }}
      className={`relative flex flex-col h-full w-full text-sm ${
        openAdmin && "lg:opacity-100 opacity-5 xl:ml-[250px]"
      }  dark:bg-black transition-all duration-300 ease bg-white`}
    >
      <div className="w-full h-full flex flex-col">
        <div className="dark:border-b-white/20 border-b p-4">
          <h1 className="text-2xl">Datto RMM Integration</h1>
        </div>
        <div className="flex flex-col gap-2 overflow-auto scrollbar-thin lg:flex-row lg:my-12 lg:mx-4">
          <div className="border">
            <div className="flex flex-col">
              <div className="dark:bg-white/60 px-4 h-44 flex justify-center items-center border-b lg:w-80">
                <Image
                  src="/images/logo-AEM.png"
                  alt="Card Image"
                  width={250}
                  height={250}
                  priority={true}
                />
              </div>
              <div className="flex flex-col">
                <Link
                  href={`/${user?.mspCustomDomain}/dashboard/${
                    user?.id
                  }/admin/${
                    isMSP ? "msp-integrations" : "client-integrations"
                  }`}
                >
                  <button
                    onClick={() => handleIntegrationsCard("cards", isMSP)}
                    className="dark:text-white dark:hover:bg-white/20 hover:bg-black/5 text-black px-4 py-2 w-full text-left border-b"
                  >
                    Integration Center
                  </button>
                </Link>
                <button className="bg-blue-500 text-white px-4 py-2  w-full  text-left border-b">
                  API Settings
                </button>
                <div className="flex flex-col  p-4">
                  <h2 className="text-2xl">Help Topics</h2>
                  <a
                    target="_blank"
                    href="https://www.datto.com/products/rmm/resources/"
                    className="hover:underline text-blue-800"
                  >
                    Creating a Public Key
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full border">
            <div className="flex flex-col">
              <div className="flex flex-col p-4 border-b h-28">
                <p className="text-xl">Datto RMM Configuration Settings</p>
                <p>API Setup</p>
                <p className="">
                  You must create a Public Api Key from Datto RMM.
                </p>
              </div>
              <div className="flex flex-col p-4 gap-6">
                <div className="flex flex-col gap-6 lg:flex-row ">
                  <div className="flex flex-col w-full gap-1">
                    <p>Public Key</p>
                    <p className="dark:text-white/60 text-black/60">
                      Your generated Public Key that was created via Datto RMM
                    </p>
                    <input className="border p-1" />
                  </div>
                  <div className="flex flex-col w-full gap-1">
                    <p>Private Key</p>
                    <p className="dark:text-white/60 text-black/60">
                      Your generated Private Key that was created via Datto RMM
                    </p>
                    <input className="border p-1" />
                  </div>
                </div>
                <div className="flex flex-col gap-6 lg:flex-row">
                  <div className="flex flex-col w-full gap-1">
                    <p>Platform Name</p>
                    <p className="dark:text-white/60 text-black/60">
                      Your server domain name
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

export default DattoRMM;
