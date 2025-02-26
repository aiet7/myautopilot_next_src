"use client";

import useBoardStore from "@/utils/store/admin/control/board/boardStore";
import ConnectWiseTable from "./ConnectWiseTable";
import AutotaskTable from "./AutotaskTable";

const BoardTables = () => {
  const { boards } = useBoardStore();

  const renderTableComponent = () => {
    switch (boards?.psaType) {
      case "ConnectWise":
        return <ConnectWiseTable />;

      case "Autotask":
        return <AutotaskTable />;
    }
  };

  return <div>{renderTableComponent()}</div>;
};

export default BoardTables;
