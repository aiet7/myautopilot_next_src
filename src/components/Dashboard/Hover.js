"use client";

import Selection from "./Selection";
import History from "./History/History";
import useUiStore from "@/utils/store/ui/uiStore";
import Rooms from "./Teams/Rooms";

const Hover = ({}) => {
  const { hoverTab, handleUpdateHoverMouseLeave } = useUiStore();
  return (
    <div
      onMouseLeave={() => {
        handleUpdateHoverMouseLeave();
      }}
      className={`absolute z-[99] lg:top-0 lg:bottom-0 lg:left-[360px] xl:left-[60px]`}
    >
      {hoverTab === "general" && <History />}
      {hoverTab === "agents" && <Selection />}
      {hoverTab === "teams" && <Rooms />}
    </div>
  );
};

export default Hover;
