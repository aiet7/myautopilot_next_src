"use client";

import useDocumentStore from "@/utils/store/assistant/sections/document/documentStore";

const Documents = () => {
  const { tempDocs, handleDocSelected, currentDocIndex } = useDocumentStore();

  return (
    <div className="flex-grow flex flex-col gap-4 overflow-hidden">
      <h3 className="text-left text-lg">Documents</h3>
      <div className="flex-grow overflow-y-auto scrollbar-thin">
        {tempDocs.map((doc, index) => {
          const { title } = doc;
          return (
            <div key={index} className="flex flex-col items-start my-2">
              <div
                onClick={() => handleDocSelected(index)}
                className={`${`${
                  currentDocIndex === index && "dark:bg-white/40 bg-black/20"
                }`} dark:text-white dark:hover:bg-white/40 hover:bg-black/20 text-black w-full flex items-center justify-between h-[50px] cursor-pointer`}
              >
                <div className="flex items-center justify-between px-2 w-full">
                  <div className="flex items-center gap-4">
                    <p>{title} Policy</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Documents;
