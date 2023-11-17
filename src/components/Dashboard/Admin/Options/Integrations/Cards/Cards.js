"use client";

import useUiStore from "@/utils/store/ui/uiStore";
import useIntegrationsStore from "@/utils/store/admin/control/integrations/integrationsStore";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Cards = () => {
  const router = useRouter();
  const { openAdmin, handleHistoryMenu } = useUiStore();

  const {
    cards,
    selectedCategory,
    filteredCards,
    setSelectedCategory,
    setFilteredCards,
    handleIntegrationsCard,
  } = useIntegrationsStore();

  useEffect(() => {
    const newFilteredCards = selectedCategory
      ? cards.filter((card) => card.category === selectedCategory)
      : cards;
    setFilteredCards(newFilteredCards);
  }, [selectedCategory, cards]);

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
          <h1 className="text-2xl">Integration Center</h1>
        </div>
        <div className="flex flex-col py-6 w-full overflow-hidden">
          <div className="flex gap-2 px-4 py-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded ${
                selectedCategory === null
                  ? "bg-blue-800 text-white"
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
                    ? "bg-blue-800 text-white"
                    : "dark:bg-gray-700 text-gray-500 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                } focus:outline-none focus:border-blue-700 focus:ring focus:ring-blue-200`}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2  xl:grid-cols-3 gap-4 py-7 px-4 overflow-auto scrollbar-thin">
            {filteredCards.map((card, index) => {
              const { value, view } = card;
              return (
                <div
                  key={index}
                  className="dark:hover:bg-white/70 dark:bg-white/60 dark:shadow-white/20 hover:bg-black/5 flex items-center justify-center border shadow-lg rounded w-full h-60  cursor-pointer"
                  onClick={() => handleIntegrationsCard(view, router.push)}
                >
                  <Image
                    src={value}
                    alt="Card Image"
                    width={300}
                    height={300}
                    priority={true}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
