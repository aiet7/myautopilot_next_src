"use client";
import useIntegrationsStore from "@/utils/store/admin/control/integrations/integrationsStore";
import useUiStore from "@/utils/store/ui/uiStore";
import Image from "next/image";
import Link from "next/link";
import useUserStore from "@/utils/store/user/userStore";
import { useRouter } from "next/router";
import { convertHideIntegrationKeys } from "@/utils/conversions";
import useSuiteStore from "@/utils/store/admin/control/integrations/suite/suiteStore";
import ViewOfficeUsers from "./ViewOfficeUsers";

const Office = () => {
  const router = useRouter();

  const { user } = useUserStore();

  const { selectedCompany, clientIntegrations, handleIntegrationsCard } =
    useIntegrationsStore();
  const { openAdmin, handleHistoryMenu } = useUiStore();
  const {
    activeConfig,
    successOfficeIntegration,
    successOfficeDisconnect,
    errorOfficeIntegration,
    errorOfficeDisconnect,
    integrationInputs,
    setActiveConfig,
    setIntegrationInputs,
    handleSaveOfficeKeys,
    handleRemoveOfficeKeys,
    handleIntegrateOffice,
    handleDisconnectOffice,
  } = useSuiteStore();

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
      {activeConfig && <ViewOfficeUsers />}

      <div className="w-full h-full flex flex-col">
        <div className="dark:border-b-white/20 border-b p-4">
          <h1 className="text-2xl">Microsoft Office Suite Integration</h1>
        </div>
        <div className="flex flex-col  gap-2 overflow-auto scrollbar-thin lg:flex-row lg:my-12 lg:mx-4">
          <div className="border">
            <div className="flex flex-col">
              <div className="dark:bg-white/60 px-4 h-44  flex justify-center items-center border-b lg:w-80">
                <Image
                  src="/images/logo-Office365.png"
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
                    href="https://learn.microsoft.com/en-us/microsoft-365/?view=o365-worldwide"
                    className="hover:underline  text-blue-800"
                  >
                    Microsoft 365 Documentation
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full border">
            <div className="flex flex-col">
              <div className="flex flex-col p-4 border-b h-28">
                <p className="text-xl">
                  Microsoft Office Configuration Settings
                </p>
                <p>API Setup</p>
              </div>
              <div className="flex flex-col p-4 gap-6 ">
                <div className="flex flex-col gap-6 lg:flex-row ">
                  <div className="flex flex-col w-full gap-1">
                    <p>Tenant ID</p>
                    <p className="dark:text-white/60 text-black/60">
                      Your Tenant ID that is assigned to you from Microsoft
                    </p>
                    {clientIntegrations?.microsoftGraphIntegration?.tenantId ? (
                      <p className="p-1">
                        {convertHideIntegrationKeys(
                          clientIntegrations?.microsoftGraphIntegration
                            ?.tenantId
                        )}
                      </p>
                    ) : (
                      <input
                        value={integrationInputs.tenantId}
                        className="outline outline-1 p-1 "
                        onChange={(e) =>
                          setIntegrationInputs(
                            "text",
                            "tenantId",
                            e.target.value
                          )
                        }
                      />
                    )}
                  </div>
                  <div className="flex flex-col w-full gap-1">
                    <p>Secret ID</p>
                    <p className="dark:text-white/60 text-black/60">
                      Your Microsoft Secret ID
                    </p>
                    {clientIntegrations?.microsoftGraphIntegration?.secretId ? (
                      <p className="p-1">
                        {convertHideIntegrationKeys(
                          clientIntegrations?.microsoftGraphIntegration
                            ?.secretId
                        )}
                      </p>
                    ) : (
                      <input
                        value={integrationInputs.secretId}
                        className="outline outline-1 p-1 "
                        onChange={(e) =>
                          setIntegrationInputs(
                            "text",
                            "secretId",
                            e.target.value
                          )
                        }
                      />
                    )}
                  </div>
                </div>

                <div className="flex flex-col w-full gap-1">
                  <p>Secret Value</p>
                  <p className="dark:text-white/60 text-black/60">
                    Your generated Secret Value that was created via Microsoft
                    API
                  </p>
                  {clientIntegrations?.microsoftGraphIntegration
                    ?.secretValue ? (
                    <p className="p-1">
                      {convertHideIntegrationKeys(
                        clientIntegrations?.microsoftGraphIntegration
                          ?.secretValue
                      )}
                    </p>
                  ) : (
                    <input
                      value={integrationInputs.secretValue}
                      className="outline outline-1 p-1 "
                      onChange={(e) =>
                        setIntegrationInputs(
                          "text",
                          "secretValue",
                          e.target.value
                        )
                      }
                    />
                  )}
                </div>
                {!clientIntegrations?.microsoft && (
                  <>
                    {clientIntegrations?.microsoftGraphIntegration?.tenantId ? (
                      <button
                        onClick={() =>
                          handleRemoveOfficeKeys(
                            user?.mspCustomDomain,
                            selectedCompany
                          )
                        }
                        className="hover:bg-blue-500 self-start bg-blue-800 text-white rounded px-3 py-1"
                      >
                        Remove Keys
                      </button>
                    ) : (
                      <button
                        id="manage-saveKeys"
                        onClick={() =>
                          handleSaveOfficeKeys(
                            user?.mspCustomDomain,
                            selectedCompany
                          )
                        }
                        className="hover:bg-blue-500 self-start bg-blue-800 text-white rounded px-3 py-1"
                      >
                        Save Keys
                      </button>
                    )}
                  </>
                )}
              </div>

              <div className="p-4 flex items-center justify-end gap-4">
                {successOfficeIntegration && (
                  <p className="text-emerald-500">
                    Successfully Integrated Manage!
                  </p>
                )}
                {errorOfficeIntegration && (
                  <p className="text-red-500">Error Integrating Manage!</p>
                )}
                {successOfficeDisconnect && (
                  <p className="text-emerald-500">
                    Successfully Disconnected Manage!
                  </p>
                )}
                {errorOfficeDisconnect && (
                  <p className="text-red-500">Error Disconnecting Manage!</p>
                )}

                {clientIntegrations?.microsoft && (
                  <button
                    id="manageAuthenticated-configuration"
                    onClick={() =>
                      setActiveConfig(
                        true,
                        user?.mspCustomDomain,
                        selectedCompany
                      )
                    }
                    className="hover:bg-blue-500 bg-blue-800 text-white rounded px-3 py-1"
                  >
                    View
                  </button>
                )}
                <button
                  onClick={() =>
                    clientIntegrations?.microsoft
                      ? handleDisconnectOffice(
                          user?.mspCustomDomain,
                          selectedCompany
                        )
                      : handleIntegrateOffice(
                          user?.mspCustomDomain,
                          selectedCompany
                        )
                  }
                  className="hover:bg-blue-500 bg-blue-800 text-white rounded px-3 py-1"
                >
                  {clientIntegrations?.microsoft
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

export default Office;
