"use client";

import useBoardStore from "@/utils/store/admin/control/board/boardStore";

const AutotaskTable = () => {
  const { boards, searchValue, selectedBoard } = useBoardStore();

  const filteredBoards = (
    selectedBoard ||
    boards?.autotaskConfig?.ticketQueueDetails ||
    []
  )
    .map((queue) => ({
      ...queue,
      issueTypes: queue.issueTypes?.map((issue) => ({
        ...issue,
        subIssueTypes: issue.subIssueTypes?.filter((subIssue) => {
          const query = searchValue.toLowerCase();
          return subIssue.label?.toLowerCase().includes(query);
        }),
      })),
    }))
    .filter((queue) =>
      queue.issueTypes?.some((issue) => issue.subIssueTypes?.length > 0)
    );

  const highlightText = (text) => {
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
      {filteredBoards.length > 0 ? (
        filteredBoards.map((queue) => (
          <div key={queue.queueId}>
            <div className="flex items-center gap-4 font-bold pt-6 pb-2">
              <h2>
                Queue Name:{" "}
                <span className="font-normal">{queue.queueName}</span>
              </h2>
              <h2>
                Ticket Opening Status:{" "}
                <span className="font-normal">{boards?.autotaskConfig?.newCreatingTicketStatus}</span>
              </h2>
              <h2>
                Ticket Closing Status:{" "}
                <span className="font-normal">{boards?.autotaskConfig?.closingTicketStatus}</span>
              </h2>
            </div>
            <table className="min-w-full table-fixed border-separate border-spacing-0 text-left">
              <thead className="dark:text-white dark:bg-gray-700 text-black/60 bg-[#F5F8FA]">
                <tr>
                  <th className="p-2 border-t border-b border-r border-l">
                    Issue Type
                  </th>
                  <th className="p-2 border-t border-b border-r border-l">
                    Ticket Type
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

                  <th className="p-2 border-t border-b border-r">
                    SLA Deadline (hr)
                  </th>
                </tr>
              </thead>
              <tbody>
                {queue.issueTypes?.map((type) =>
                  type.subIssueTypes?.map((subtype, index) => (
                    <tr key={subtype.value}>
                      {index === 0 && (
                        <td
                          className="p-2 border-l border-b"
                          rowSpan={type.subIssueTypes.length}
                        >
                          {highlightText(type.label)}
                        </td>
                      )}
                      <td className="p-2 border-l border-b">
                        {highlightText(subtype.ticketTypeLabel)}
                      </td>
                      <td className="p-2 border-l border-b">
                        {highlightText(subtype.label)}
                      </td>
                      <td className="p-2 border-l border-b">
                        {highlightText(subtype.subTypeScore.toString())}
                      </td>
                      <td className="p-2 border-l border-b">
                        {highlightText(subtype.priorityLabel?.toString())}
                      </td>
                      <td className="p-2 border-l border-b">
                        {highlightText(subtype.priorityScore?.toString())}
                      </td>
                      <td className="p-2 border-l border-r border-b">
                        {highlightText(subtype.slaDeadLineInHours?.toString())}
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

export default AutotaskTable;
