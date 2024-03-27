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

  const { integrations, handleIntegrationsCard } = useIntegrationsStore();
  const { openAdmin, handleHistoryMenu } = useUiStore();
  const isMSP = router.pathname.includes("msp-integrations");

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
                    href="https://docs.connectwise.com/ConnectWise_Documentation/090/040/010/010/060"
                    className="hover:underline text-sm text-blue-800"
                  >
                    Creating a Public Key
                  </a>
                  <a
                    target="_blank"
                    href="https://support.google.com/mail/answer/185833?hl=en"
                    className="hover:underline text-sm text-blue-800"
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
                <p className="text-sm">
                  You must create a Public Api Key from ConnectWise.
                </p>
              </div>
              <div className="flex flex-col p-4 gap-6 text-sm">
                <div className="flex flex-col gap-6 lg:flex-row ">
                  <div className="flex flex-col w-full gap-1">
                    <p>Client ID</p>
                    <p className="dark:text-white/60 text-black/60">
                      Your Client ID that is assigned to you from ConnectWise
                    </p>
                    {integrations?.connectWiseManageIntegration?.clientId ? (
                      <p className="p-1">
                        {convertHideIntegrationKeys(
                          integrations?.connectWiseManageIntegration?.clientId
                        )}
                      </p>
                    ) : (
                      <input
                        id="manage-clientId"
                        value={integrationInputs.clientId}
                        onChange={(e) =>
                          setIntegrationInputs(
                            "text",
                            "clientId",
                            e.target.value
                          )
                        }
                        className="outline outline-1 p-1 "
                      />
                    )}
                  </div>
                  <div className="flex flex-col w-full gap-1">
                    <p>Public Key</p>
                    <p className="dark:text-white/60 text-black/60">
                      Your generated Public Key that was created via ConnectWise
                      Manager
                    </p>
                    {integrations?.connectWiseManageIntegration?.publicKey ? (
                      <p className="p-1">
                        {convertHideIntegrationKeys(
                          integrations?.connectWiseManageIntegration?.publicKey
                        )}
                      </p>
                    ) : (
                      <input
                        id="manage-publicKey"
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
                </div>
                <div className="flex flex-col gap-6 lg:flex-row">
                  <div className="flex flex-col w-full gap-1">
                    <p>Company ID</p>
                    <p className="dark:text-white/60 text-black/60">
                      Your Company ID that is assigned to you from ConnectWise
                    </p>
                    {integrations?.connectWiseManageIntegration?.companyId ? (
                      <p className="p-1">
                        {convertHideIntegrationKeys(
                          integrations?.connectWiseManageIntegration?.companyId
                        )}
                      </p>
                    ) : (
                      <input
                        id="manage-companyId"
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
                  <div className="flex flex-col w-full gap-1">
                    <p>Private Key</p>
                    <p className="dark:text-white/60 text-black/60">
                      Your generated Private Key that was created via
                      ConnectWise Manager
                    </p>
                    {integrations?.connectWiseManageIntegration?.privateKey ? (
                      <p className="p-1">
                        {convertHideIntegrationKeys(
                          integrations?.connectWiseManageIntegration?.privateKey
                        )}
                      </p>
                    ) : (
                      <input
                        id="manage-privateKey"
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
                {!integrations?.connectWiseManageIntegrator && (
                  <>
                    {integrations?.connectWiseManageIntegration?.clientId ? (
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
                        id="manage-saveKeys"
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

                {/* <div className="border-b" />
                <h2 className="text-lg">Email Connector (Optional)</h2>
                <div className="flex flex-col gap-6 lg:flex-row">
                  <div className="flex flex-col w-full gap-1">
                    <p>Gmail Address</p>
                    <p className="dark:text-white/60 text-black/60">
                      Your Gmail address that you want to connect
                    </p>
                    {integrations?.emailConnectorIntegration?.emailId ? (
                      <p className="p-1">
                        {convertHideIntegrationKeys(
                          integrations?.emailConnectorIntegration?.emailId
                        )}
                      </p>
                    ) : (
                      <input
                        value={integrationInputs.emailConnectorGmail}
                        onChange={(e) =>
                          setIntegrationInputs(
                            "text",
                            "emailConnectorGmail",
                            e.target.value
                          )
                        }
                        className="outline outline-1 p-1 "
                      />
                    )}
                  </div>
                  {!integrations?.emailConnectorIntegration?.password && (
                    <div className="flex flex-col w-full gap-1">
                      <p>App Password</p>
                      <p className="dark:text-white/60 text-black/60">
                        Your App Password you set in Gmail settings
                      </p>
                      <input
                        value={integrationInputs.emailConnectorAppPassword}
                        onChange={(e) =>
                          setIntegrationInputs(
                            "text",
                            "emailConnectorAppPassword",
                            e.target.value
                          )
                        }
                        type="password"
                        className="outline outline-1 p-1 "
                      />
                    </div>
                  )}
                </div>

                <button
                  onClick={() => {
                    integrations?.emailIntegrator
                      ? handleDisconnectEmailIntegrator(tech?.mspCustomDomain)
                      : handleIntegrateEmailConnector(tech?.mspCustomDomain);
                  }}
                  className="hover:bg-blue-500  self-start bg-blue-800 text-white rounded-lg px-3 py-1"
                >
                  <div className="flex items-center gap-1">
                    {integrations?.emailIntegrator ? (
                      <>
                        <span>Disconnect</span>
                        <div className="flex items-center">
                          <FcGoogle />
                          <span>mail</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <span>Connect</span>
                        <div className="flex items-center">
                          <FcGoogle />
                          <span>mail</span>
                        </div>
                      </>
                    )}
                  </div>
                    </button>*/}
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

                {integrations?.connectWiseManageIntegrator && (
                  <button
                    id="manageAuthenticated-configuration"
                    onClick={() => setActiveConfig(true, user?.mspCustomDomain)}
                    className="hover:bg-blue-500 bg-blue-800 text-white rounded-lg px-3 py-1"
                  >
                    Configuration
                  </button>
                )}
                {
                  <button
                    id={
                      integrations?.connectWiseManageIntegrator
                        ? "manageAuthenticated-disconnect"
                        : "manage-authenticate"
                    }
                    onClick={() =>
                      integrations?.connectWiseManageIntegrator
                        ? handleDisconnectManage(user?.mspCustomDomain)
                        : handleIntegrateManage(user?.mspCustomDomain)
                    }
                    className="hover:bg-blue-500 bg-blue-800 text-white rounded-lg px-3 py-1"
                  >
                    {integrations?.connectWiseManageIntegrator
                      ? "Disconnect"
                      : "Authenticate"}
                  </button>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Manage;
