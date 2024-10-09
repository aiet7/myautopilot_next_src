"use client";

import useBoardStore from "@/utils/store/admin/control/board/boardStore";

const BoardTable = () => {
    const { boards, selectedBoard, searchValue } = useBoardStore();
    
  const filteredBoards = (selectedBoard || boards?.boardDetails)
    ?.map((board) => ({
      ...board,
      mspConnectWiseBoardTypes: board.mspConnectWiseBoardTypes?.map((type) => ({
        ...type,
        mspConnectWiseBoardSubTypes: type.mspConnectWiseBoardSubTypes?.filter(
          (subtype) => {
            const query = searchValue.toLowerCase();
            return (
              subtype.subTypeName?.toLowerCase().includes(query) ||
              subtype.subTypeScore?.toString().toLowerCase().includes(query) ||
              subtype.priority?.toString().toLowerCase().includes(query) ||
              subtype.priorityScore?.toString().toLowerCase().includes(query) ||
              subtype.tier?.toString().toLowerCase().includes(query) ||
              subtype.slaDeadLineInHours
                ?.toString()
                .toLowerCase()
                .includes(query)
            );
          }
        ),
      })),
    }))
    .filter((board) =>
      board.mspConnectWiseBoardTypes.some(
        (type) => type.mspConnectWiseBoardSubTypes.length > 0
      )
    );

  const highlightText = (text, searchValue) => {
    if (!searchValue) return text;

    const regex = new RegExp(`(${searchValue})`, "gi");
    const parts = text.split(regex);
    return parts.map((part, index) =>
      regex.test(part) ? (
        <span key={index} className="bg-yellow-300">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div>
      {filteredBoards?.length > 0 ? (
        filteredBoards?.map((board) => (
          <div key={board.boardId}>
            <h1 className="font-bold pt-4 pb-2 ">
              Board Name: <span className="font-normal">{board.boardName}</span>
            </h1>
            <table className="min-w-full table-fixed border-separate border-spacing-0 text-left">
              <thead className="dark:text-white dark:bg-gray-700  text-black/60 bg-[#F5F8FA]">
                <tr>
                  <th className="p-2 border-t border-b border-r border-l">
                    Type Name
                  </th>
                  <th className="p-2 border-t border-b border-r">
                    Subtype Name
                  </th>
                  <th className="p-2 border-t border-b border-r">
                    Subtype Score
                  </th>
                  <th className="p-2 border-t border-b border-r">Priority</th>
                  <th className="p-2 border-t border-b border-r">
                    Priority Score
                  </th>
                  <th className="p-2 border-t border-b border-r">Tier</th>
                  <th className="p-2 border-t border-b border-r">SLA Score</th>
                </tr>
              </thead>
              <tbody>
                {board.mspConnectWiseBoardTypes.map((type) =>
                  type.mspConnectWiseBoardSubTypes.map((subtype, index) => (
                    <tr key={subtype.subTypeId}>
                      {index === 0 && (
                        <td
                          className="p-2 border-l border-b"
                          rowSpan={type.mspConnectWiseBoardSubTypes.length}
                        >
                          {highlightText(type.typeName, searchValue)}
                        </td>
                      )}
                      <td className="p-2 border-l border-b">
                        {highlightText(subtype.subTypeName, searchValue)}
                      </td>
                      <td className="p-2 border-l border-b">
                        {highlightText(
                          subtype.subTypeScore?.toString(),
                          searchValue
                        )}
                      </td>
                      <td className="p-2 border-l border-b">
                        {highlightText(
                          subtype.priority?.toString(),
                          searchValue
                        )}
                      </td>
                      <td className="p-2 border-l border-b">
                        {highlightText(
                          subtype.priorityScore?.toString(),
                          searchValue
                        )}
                      </td>
                      <td className="p-2 border-l border-b">
                        {highlightText(subtype.tier?.toString(), searchValue)}
                      </td>
                      <td className="p-2 border-l border-r border-b">
                        {highlightText(
                          subtype.slaDeadLineInHours?.toString(),
                          searchValue
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        ))
      ) : (
        <div className="text-center p-4 text-gray-500">
          No matching results found.
        </div>
      )}
    </div>
  );
};

export default BoardTable;
