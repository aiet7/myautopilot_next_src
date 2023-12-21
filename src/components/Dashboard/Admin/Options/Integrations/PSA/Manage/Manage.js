"use client";

import useManageStore from "@/utils/store/admin/control/integrations/PSA/manageStore";
import useIntegrationsStore from "@/utils/store/admin/control/integrations/integrationsStore";
import useUiStore from "@/utils/store/ui/uiStore";
import useTechStore from "@/utils/store/user/techStore";

import Image from "next/image";
import Board from "./Board";

import Link from "next/link";
import { convertHideIntegrationKeys } from "@/utils/conversions";

const Manage = () => {
  const { tech } = useTechStore();
  const {
    connectwiseBoards,
    integrationInputs,
    setIntegrationInputs,
    handleIntegrateManage,
    handleDisconnectManage,
    handleGetBoard,
  } = useManageStore();
  const { integrations, handleIntegrationsCard } = useIntegrationsStore();
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
      {connectwiseBoards && <Board />}
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
                  href={`/${tech?.mspCustomDomain}/dashboard/${tech?.id}/admin/integrations`}
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
                      <p>
                        {convertHideIntegrationKeys(
                          integrations?.connectWiseManageIntegration?.clientId
                        )}
                      </p>
                    ) : (
                      <input
                        value={integrationInputs.clientId}
                        onChange={(e) =>
                          setIntegrationInputs(
                            "text",
                            "clientId",
                            e.target.value
                          )
                        }
                        className="border p-1"
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
                      <p>
                        {convertHideIntegrationKeys(
                          integrations?.connectWiseManageIntegration?.publicKey
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
                        className="border p-1"
                      />
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-6 lg:flex-row">
                  <div className="flex flex-col w-full gap-1">
                    <p>Comapany ID</p>
                    <p className="dark:text-white/60 text-black/60">
                      Your Company ID that is assigned to you from ConnectWise
                    </p>
                    {integrations?.connectWiseManageIntegration?.companyId ? (
                      <p>
                        {convertHideIntegrationKeys(
                          integrations?.connectWiseManageIntegration?.companyId
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
                        className="border p-1"
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
                      <p>
                        {convertHideIntegrationKeys(
                          integrations?.connectWiseManageIntegration?.privateKey
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
                        className="border p-1"
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className="p-4 flex items-center justify-end gap-4">
                {integrations?.connectWiseManageIntegrator && (
                  <button
                    onClick={() => handleGetBoard(tech?.mspCustomDomain)}
                    className="hover:bg-blue-500 bg-blue-800 text-white px-3 py-1"
                  >
                    Categorization
                  </button>
                )}
                <button
                  onClick={() =>
                    integrations?.connectWiseManageIntegrator
                      ? handleDisconnectManage(tech?.mspCustomDomain)
                      : handleIntegrateManage(tech?.mspCustomDomain)
                  }
                  className="hover:bg-blue-500 bg-blue-800 text-white px-3 py-1"
                >
                  {integrations?.connectWiseManageIntegrator
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