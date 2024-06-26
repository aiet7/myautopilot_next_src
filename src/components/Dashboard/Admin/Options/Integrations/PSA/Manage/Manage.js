"use client";

import useManageStore from "@/utils/store/admin/control/integrations/PSA/manageStore";
import useIntegrationsStore from "@/utils/store/admin/control/integrations/integrationsStore";
import useUiStore from "@/utils/store/ui/uiStore";
import useUserStore from "@/utils/store/user/userStore";

import Image from "next/image";
import Configuration from "./Configuration";

import Link from "next/link";
import { convertHideIntegrationKeys } from "@/utils/conversions";
import { useRouter } from "next/router";

const Manage = () => {
  const router = useRouter();

  const { user } = useUserStore();

  const {
    successManageIntegration,
    successManageDisconnect,
    errorManageDisconnect,
    errorManageIntegration,
    activeConfig,
    integrationInputs,
    setIntegrationInputs,
    setActiveConfig,
    handleSaveManageKeys,
    handleRemoveManageKeys,
    handleIntegrateManage,
    handleDisconnectManage,
  } = useManageStore();

  const { mspIntegrations, handleIntegrationsCard } = useIntegrationsStore();
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
      {activeConfig && <Configuration />}
      <div className="w-full h-full flex flex-col">
        <div className="dark:border-b-white/20 border-b p-4">
          <h1 className="text-2xl">ConnectWise Manage PSA Integration</h1>
        </div>
        <div className="flex flex-col gap-2 overflow-auto scrollbar-thin lg:flex-row lg:my-12 lg:mx-4">
          <div className="border">
            <div className="flex flex-col">
              <div className="dark:bg-white/60 px-4 h-44 flex justify-center items-center border-b lg:w-80">
                <Image
                  src="/images/logo-Connectwise.png"
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
                <button className="bg-blue-500 text-white px-4 py-2  w-full text-left border-b">
                  API Settings
                </button>
                <div className="flex flex-col  p-4">
                  <h2 className="text-2xl">Help Topics</h2>
                  <a
                    target="_blank"
                    href="https://docs.connectwise.com/ConnectWise_Documentation/090/040/010/010/060"
                    className="hover:underline text-blue-800"
                  >
                    Creating a Public Key
                  </a>
                  <a
                    target="_blank"
                    href="https://support.google.com/mail/answer/185833?hl=en"
                    className="hover:underline  text-blue-800"
                  >
                    Creating a Gmail App Password
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full border">
            <div className="flex flex-col">
              <div className="flex flex-col p-4 border-b h-28">
                <p className="text-xl">ConnectWise Configuration Settings</p>
                <p>API Setup</p>
                <p className="">
                  You must create a Public Api Key from ConnectWise.
                </p>
              </div>
              <div className="flex flex-col p-4 gap-6 ">
                <div className="flex flex-col gap-6 lg:flex-row ">
                  <div className="flex flex-col w-full gap-1">
                    <p>Public Key</p>
                    <p className="dark:text-white/60 text-black/60">
                      Your generated Public Key that was created via ConnectWise
                      Manager
                    </p>
                    {mspIntegrations?.connectWiseManageIntegration
                      ?.publicKey ? (
                      <p className="p-1">
                        {convertHideIntegrationKeys(
                          mspIntegrations?.connectWiseManageIntegration
                            ?.publicKey
                        )}
                      </p>
                    ) : (
                      <input
                        value={integrationInputs.publicKey}
                        onChange={(e) =>
                          setIntegrationInputs(
                            "text",
                            "publicKey",
                            e.target.value
                          )
                        }
                        className="outline outline-1 p-1 "
                      />
                    )}
                  </div>
                  <div className="flex flex-col w-full gap-1">
                    <p>Private Key</p>
                    <p className="dark:text-white/60 text-black/60">
                      Your generated Private Key that was created via
                      ConnectWise Manager
                    </p>
                    {mspIntegrations?.connectWiseManageIntegration
                      ?.privateKey ? (
                      <p className="p-1">
                        {convertHideIntegrationKeys(
                          mspIntegrations?.connectWiseManageIntegration
                            ?.privateKey
                        )}
                      </p>
                    ) : (
                      <input
                        value={integrationInputs.privateKey}
                        onChange={(e) =>
                          setIntegrationInputs(
                            "text",
                            "privateKey",
                            e.target.value
                          )
                        }
                        className="outline outline-1 p-1 "
                      />
                    )}
                  </div>
                </div>

                <div className="flex flex-col w-full gap-1">
                  <p>Company ID</p>
                  <p className="dark:text-white/60 text-black/60">
                    Your Company ID that is assigned to you from ConnectWise
                  </p>
                  {mspIntegrations?.connectWiseManageIntegration?.companyId ? (
                    <p className="p-1">
                      {convertHideIntegrationKeys(
                        mspIntegrations?.connectWiseManageIntegration?.companyId
                      )}
                    </p>
                  ) : (
                    <input
                      value={integrationInputs.companyId}
                      onChange={(e) =>
                        setIntegrationInputs(
                          "text",
                          "companyId",
                          e.target.value
                        )
                      }
                      className="outline outline-1 p-1 "
                    />
                  )}
                </div>

                {!mspIntegrations?.connectWiseManageIntegrator && (
                  <>
                    {mspIntegrations?.connectWiseManageIntegration?.publicKey ? (
                      <button
                        onClick={() =>
                          handleRemoveManageKeys(user?.mspCustomDomain)
                        }
                        className="hover:bg-blue-500 self-start bg-blue-800 text-white rounded-lg px-3 py-1"
                      >
                        Remove Keys
                      </button>
                    ) : (
                      <button
                        onClick={() =>
                          handleSaveManageKeys(user?.mspCustomDomain)
                        }
                        className="hover:bg-blue-500 self-start bg-blue-800 text-white rounded-lg px-3 py-1"
                      >
                        Save Keys
                      </button>
                    )}
                  </>
                )}

              </div>

              <div className="p-4 flex items-center justify-end gap-4">
                {successManageIntegration && (
                  <p className="text-emerald-500">
                    Successfully Integrated Manage!
                  </p>
                )}
                {errorManageIntegration && (
                  <p className="text-red-500">Error Integrating Manage!</p>
                )}
                {successManageDisconnect && (
                  <p className="text-emerald-500">
                    Successfully Disconnected Manage!
                  </p>
                )}
                {errorManageDisconnect && (
                  <p className="text-red-500">Error Disconnecting Manage!</p>
                )}

                {mspIntegrations?.connectWiseManageIntegrator && (
                  <button
                    onClick={() => setActiveConfig(true, user?.mspCustomDomain)}
                    className="hover:bg-blue-500 bg-blue-800 text-white rounded-lg px-3 py-1"
                  >
                    Configuration
                  </button>
                )}

                <button
                  id="manage-authenticated"
                  onClick={() =>
                    mspIntegrations?.connectWiseManageIntegrator
                      ? handleDisconnectManage(user?.mspCustomDomain)
                      : handleIntegrateManage(user?.mspCustomDomain)
                  }
                  className="hover:bg-blue-500 bg-blue-800 text-white rounded-lg px-3 py-1"
                >
                  {mspIntegrations?.connectWiseManageIntegrator
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

export default Manage;
