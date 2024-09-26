"use client";

import useUiStore from "@/utils/store/ui/uiStore";
import useIntegrationsStore from "@/utils/store/admin/control/integrations/integrationsStore";
import Image from "next/image";
import Link from "next/link";
import useUserStore from "@/utils/store/user/userStore";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useMspStore from "@/utils/store/auth/msp/mspStore";

const Cards = () => {
  const { user } = useUserStore();
  const { userType } = useMspStore();
  const { openAdmin, handleHistoryMenu } = useUiStore();
  const router = useRouter();

  const {
    clientList,
    mspCards,
    clientCards,
    selectedCompany,
    selectedCategory,
    setSelectedCompany,
    setSelectedCategory,
    handleDescriptionOverlay,
    handleIntegrationsCard,
    initializeClientList,
  } = useIntegrationsStore();

  const isMSP = router.pathname.includes("msp-integrations");
  const cardsToDisplay = isMSP ? mspCards : clientCards;
  const filteredCards = selectedCategory
    ? cardsToDisplay.filter((card) => card.category === selectedCategory)
    : cardsToDisplay;

  useEffect(() => {
    if (!isMSP) {
      initializeClientList();
    } else {
      console.log("not loading");
    }
  }, [isMSP, user]);

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
          <h1 className="text-2xl">Integration Center</h1>
        </div>
        <div className="flex flex-col py-6 w-full overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded ${
                selectedCategory === null
                  ? "bg-[#465E89] text-white"
                  : "dark:bg-gray-700 text-gray-500 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              } focus:outline-none focus:border-blue-700 focus:ring focus:ring-blue-200`}
            >
              All
            </button>
            {["PSA", "RMM", "SUITE", "AI", "EMAIL"].map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded ${
                  selectedCategory === category
                    ? "bg-[#465E89] text-white"
                    : "dark:bg-gray-700 text-gray-500 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                } focus:outline-none focus:border-blue-700 focus:ring focus:ring-blue-200`}
              >
                {category}
              </button>
            ))}
            {clientList && !isMSP && (
              <select
                onChange={(e) => {
                  setSelectedCompany(e.target.value);
                }}
                className="dark:bg-white border rounded-lg shadow-lg p-2 cursor-pointer text-black w-full"
              >
                <option value="Select Company" disabled selected>
                  Select Company
                </option>
                {clientList
                  .filter((client) =>
                    userType === "tech"
                      ? true
                      : client.connectWiseCompanyId ===
                        user?.connectWiseCompanyId
                  )
                  .map((client, index) => {
                    const { id, name, connectWiseClientsAutopilotDbId } =
                      client;

                    return (
                      <option key={id} value={connectWiseClientsAutopilotDbId}>
                        {name}
                      </option>
                    );
                  })}
              </select>
            )}
          </div>
          {(isMSP || (!isMSP && selectedCompany)) && (
            <div className="grid grid-cols-1 lg:grid-cols-2  xl:grid-cols-3 gap-4 py-7 px-4 overflow-auto scrollbar-thin">
              {filteredCards.map((card, index) => {
                const { value, view, description, isHovered } = card;
                return (
                  <Link
                    key={view}
                    href={`/${user?.mspCustomDomain}/dashboard/${
                      user?.id
                    }/admin/${
                      isMSP ? "msp-integrations" : "client-integrations"
                    }/${view.toLowerCase()}`}
                  >
                    <div
                      id="manage"
                      onClick={() => handleIntegrationsCard(view, isMSP)}
                      onMouseEnter={() =>
                        handleDescriptionOverlay(view, true, isMSP)
                      }
                      onMouseLeave={() =>
                        handleDescriptionOverlay(view, false, isMSP)
                      }
                      className="dark:bg-white/60 dark:shadow-white/20 relative flex items-center justify-center border shadow-lg rounded w-full h-60  cursor-pointer"
                    >
                      <Image
                        src={value}
                        alt="Card Image"
                        width={300}
                        height={300}
                        priority={true}
                      />
                      {isHovered && (
                        <div className="absolute bg-black/80 inset-0 w-full flex items-center justify-center">
                          <p className="text-white text-lg px-10">
                            {description}
                          </p>
                        </div>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cards;
