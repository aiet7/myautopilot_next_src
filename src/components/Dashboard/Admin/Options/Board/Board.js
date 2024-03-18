"use client";

import useBoardStore from "@/utils/store/admin/control/board/boardStore";
import useUiStore from "@/utils/store/ui/uiStore";
import useUserStore from "@/utils/store/user/userStore";
import { useEffect } from "react";

const Board = () => {
  const { user } = useUserStore();
  const { openAdmin, handleHistoryMenu } = useUiStore();

  const { board, durationOptions, intializeBoard } = useBoardStore();

  useEffect(() => {
    intializeBoard();
  }, [user]);

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
      <div className="dark:border-b-white/20 border-b p-4">
        <h1 className="text-2xl">Board</h1>
      </div>
      <div className="flex flex-col h-full overflow-hidden pb-4">
        <div className="flex flex-col text-xl overflow-hidden">
          {board ? (
            <div className="flex flex-col gap-7 text-xl overflow-hidden">
              <div className="flex  flex-col overflow-hidden px-4">
                <div className="flex items-center justify-start gap-2 py-4">
                  <button className="text-sm  bg-blue-800 text-white font-bold px-5 rounded-lg py-1">
                    Configure Board
                  </button>
                </div>
                <div className="block text-sm overflow-auto scrollbar-thin max-h-full max-w-full">
                  <table className="min-w-full table-fixed border-separate border-spacing-0 text-left">
                    <thead className="dark:text-white dark:bg-gray-700 sticky top-0 text-lg text-black/60 bg-[#F5F8FA]">
                      <tr className="">
                        <th className="p-2 border-t border-b border-r border-l">
                          Category Name
                        </th>
                        <th className="p-2 border-t border-b border-r">
                          Sub-Categorizations
                        </th>
                        <th className="p-2 border-t border-b border-r">
                          Priority
                        </th>
                        <th className="p-2 border-t border-b border-r">
                          Severity
                        </th>
                        <th className="p-2 border-t border-b border-r">
                          Impact
                        </th>
                        <th className="p-2 border-t border-b border-r">Tier</th>
                        <th className="p-2 border-t border-b border-r">
                          Duration
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {board?.mspConnectWiseManageCategorizations.map(
                        (category) => {
                          const {
                            categoryId,
                            categoryName,
                            mspConnectWiseManageSubCategorizations,
                          } = category;
                          return (
                            <tr key={categoryId}>
                              <td className="p-2 truncate border-l border-r border-b align-top">
                                {categoryName}
                              </td>
                              <td className="p-2 truncate border-r border-b align-top">
                                {mspConnectWiseManageSubCategorizations.map(
                                  (subCat) => {
                                    const { subCategoryId, subCategoryName } =
                                      subCat;
                                    return (
                                      <div key={subCategoryId}>
                                        <div className="flex items-center gap-1">
                                          {subCategoryName}
                                        </div>
                                      </div>
                                    );
                                  }
                                )}
                              </td>
                              <td className="p-2 truncate border-r border-b align-top">
                                {mspConnectWiseManageSubCategorizations.map(
                                  (subCat) => {
                                    const { subCategoryId, priority } = subCat;
                                    return (
                                      <div key={subCategoryId}>
                                        <div className="flex items-center gap-1">
                                          {priority}
                                        </div>
                                      </div>
                                    );
                                  }
                                )}
                              </td>
                              <td className="p-2 truncate border-r border-b align-top">
                                {mspConnectWiseManageSubCategorizations.map(
                                  (subCat) => {
                                    const { subCategoryId, severity } = subCat;
                                    return (
                                      <div key={subCategoryId}>
                                        <div className="flex items-center gap-1">
                                          {severity}
                                        </div>
                                      </div>
                                    );
                                  }
                                )}
                              </td>
                              <td className="p-2 truncate border-r border-b align-top">
                                {mspConnectWiseManageSubCategorizations.map(
                                  (subCat) => {
                                    const { subCategoryId, impact } = subCat;
                                    return (
                                      <div key={subCategoryId}>
                                        <div className="flex items-center gap-1">
                                          {impact}
                                        </div>
                                      </div>
                                    );
                                  }
                                )}
                              </td>
                              <td className="p-2 truncate border-r border-b align-top">
                                {mspConnectWiseManageSubCategorizations.map(
                                  (subCat) => {
                                    const { subCategoryId, tier } = subCat;
                                    return (
                                      <div key={subCategoryId}>
                                        <div className="flex items-center gap-1">
                                          {tier}
                                        </div>
                                      </div>
                                    );
                                  }
                                )}
                              </td>
                              <td className="p-2 truncate border-r border-b align-top">
                                {mspConnectWiseManageSubCategorizations.map(
                                  (subCat) => {
                                    const { subCategoryId, durationToResolve } =
                                      subCat;
                                    const durationKey = Object.keys(
                                      durationOptions
                                    ).find(
                                      (key) =>
                                        durationOptions[key] ===
                                        durationToResolve
                                    );
                                    return (
                                      <div key={subCategoryId}>
                                        <div className="flex items-center gap-1">
                                          {durationKey}
                                        </div>
                                      </div>
                                    );
                                  }
                                )}
                              </td>
                            </tr>
                          );
                        }
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-xl font-bold text-black/20 p-4 w-full">
              Currently Have No Board Listed
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Board;
