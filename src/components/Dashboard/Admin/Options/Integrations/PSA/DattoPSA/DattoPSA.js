"use client";

import useIntegrationsStore from "@/utils/store/admin/control/integrations/integrationsStore";
import useUiStore from "@/utils/store/ui/uiStore";
import Image from "next/image";

import Link from "next/link";
import useUserStore from "@/utils/store/user/userStore";
import { useRouter } from "next/router";

import { convertHideIntegrationKeys } from "@/utils/conversions";
import useAutotaskStore from "@/utils/store/admin/control/integrations/PSA/autotaskStore";
import Configuration from "./Configuration";

const DattoPSA = () => {
  const router = useRouter();

  const { user } = useUserStore();
  const { mspIntegrations, handleIntegrationsCard } = useIntegrationsStore();
  const { openAdmin, handleHistoryMenu } = useUiStore();
  const {
    activeConfig,
    successAutotaskIntegration,
    successAutotaskDisconnect,
    errorAutotaskIntegration,
    errorAutotaskDisconnect,
    integrationInputs,
    setIntegrationInputs,
    setActiveConfig,
    handleSaveAutotaskKeys,
    handleRemoveAutotaskKeys,
    handleIntegrateAutotask,
    handleDisconnectAutotask,
  } = useAutotaskStore();

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
      {activeConfig && <Configuration />}
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
                  href={`/${user?.mspCustomDomain}/dashboard/${
                    user?.id
                  }/admin/${
                    isMSP ? "msp-integrations" : "client-integrations"
                  }`}
                >
                  <button
                    onClick={() => handleIntegrationsCard("cards", isMSP)}
                    className="dark:text-white dark:hover:bg-white/20 hover:bg-black/5 text-black px-4 py-2 w-full text-left text-sm border-b"
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
                    href="https://ww1.autotask.net/help/Content/2_Getting_Started/GETTING_STARTED_LANDING.htm"
                    className="hover:underline  text-blue-800"
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
              <div className="flex flex-col p-4 gap-6">
                <div className="flex flex-col gap-6 lg:flex-row ">
                  <div className="flex flex-col w-full gap-1">
                    <p>Username</p>
                    <p className="dark:text-white/60 text-black/60">
                      The username you use to login to Autotask
                    </p>
                    {mspIntegrations?.autotaskIntegration?.userName ? (
                      <p className="p-1">
                        {convertHideIntegrationKeys(
                          mspIntegrations?.autotaskIntegration?.userName
                        )}
                      </p>
                    ) : (
                      <input
                        value={integrationInputs.userName}
                        onChange={(e) =>
                          setIntegrationInputs(
                            "text",
                            "userName",
                            e.target.value
                          )
                        }
                        className="outline outline-1 p-1 "
                      />
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-6 ">
                  <div className="flex flex-col w-full gap-1">
                    <p>Secret</p>
                    <p className="dark:text-white/60 text-black/60">
                      The secret you use to access Autotask API
                    </p>
                    {mspIntegrations?.autotaskIntegration?.secret ? (
                      <p className="p-1">
                        {convertHideIntegrationKeys(
                          mspIntegrations?.autotaskIntegration?.secret
                        )}
                      </p>
                    ) : (
                      <input
                        value={integrationInputs.secret}
                        onChange={(e) =>
                          setIntegrationInputs("text", "secret", e.target.value)
                        }
                        className="outline outline-1 p-1 "
                      />
                    )}
                  </div>

                  {!mspIntegrations?.autotaskIntegrator && (
                    <>
                      {mspIntegrations?.autotaskIntegration?.userName ? (
                        <button
                          onClick={() =>
                            handleRemoveAutotaskKeys(user?.mspCustomDomain)
                          }
                          className="hover:bg-blue-500 self-start bg-blue-800 text-white rounded px-3 py-1"
                        >
                          Remove Keys
                        </button>
                      ) : (
                        <button
                          onClick={() =>
                            handleSaveAutotaskKeys(user?.mspCustomDomain)
                          }
                          className="hover:bg-blue-500 self-start bg-blue-800 text-white rounded px-3 py-1"
                        >
                          Save Keys
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>
              <div className="p-4 flex items-center justify-end gap-4">
                {successAutotaskIntegration && (
                  <p className="text-emerald-500">
                    Successfully Integrated Autotask!
                  </p>
                )}
                {errorAutotaskIntegration && (
                  <p className="text-red-500">Error Integrating Autotask!</p>
                )}
                {successAutotaskDisconnect && (
                  <p className="text-emerald-500">
                    Successfully Disconnected Autotask!
                  </p>
                )}
                {errorAutotaskDisconnect && (
                  <p className="text-red-500">Error Disconnecting Autotask!</p>
                )}

                {mspIntegrations?.autotaskIntegrator && (
                  <button
                    onClick={() => setActiveConfig(true, user?.mspCustomDomain)}
                    className="hover:bg-blue-500 bg-blue-800 text-white rounded px-3 py-1"
                  >
                    Configuration
                  </button>
                )}
                <button
                  onClick={() =>
                    mspIntegrations?.autotaskIntegrator
                      ? handleDisconnectAutotask(user?.mspCustomDomain)
                      : handleIntegrateAutotask(user?.mspCustomDomain)
                  }
                  className="hover:bg-blue-500 bg-blue-800 text-white rounded px-3 py-1"
                >
                  {mspIntegrations?.autotaskIntegrator
                    ? "Disconnect"
                    : "Authenticate"}
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
