"use client";

import { AiOutlineDownload } from "react-icons/ai";

import useDocumentStore from "@/utils/store/assistant/sections/external/policies/policiesStore";

const Policies = () => {
  const { tempDocs, handleSubmitDoc } = useDocumentStore();
  return (
    <div className="flex-grow flex flex-col gap-8 overflow-hidden">
      <div className="flex-grow overflow-y-auto scrollbar-thin">
        <div className="flex flex-col flex-grow gap-4">
          {tempDocs.map((doc, index) => {
            const { title, description } = doc;
            return (
              <div
                key={index}
                className="dark:bg-white/30 dark:text-white dark:border-white/20 flex flex-col justify-between gap-3 border rounded-md text-black bg-white p-2 cursor-pointer"
                onClick={() => handleSubmitDoc(title)}
              >
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between py-2">
                    <p className="font-bold text-lg">{title}</p>
                    <AiOutlineDownload size={20} />
                  </div>
                  <p className="text-sm">{description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Policies;
