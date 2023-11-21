"use client";

import Selection from "./Selection";
import History from "./History/History";
import useUiStore from "@/utils/store/ui/uiStore";
import Rooms from "./Teams/Rooms";
import Documents from "./Documents/Documents";

const Hover = ({}) => {
  const {
    hoverTab,
    openHistory,
    openRooms,
    openDocs,
    handleUpdateHoverMouseLeave,
  } = useUiStore();
  return (
    <div
      onMouseLeave={() => {
        handleUpdateHoverMouseLeave();
      }}
      className={`absolute z-[99] lg:top-0 lg:bottom-0 ${
        (hoverTab === "general" && openHistory) ||
        (hoverTab === "agents" && openHistory) ||
        (hoverTab === "teams" && openRooms) ||
        (hoverTab === "docs" && openDocs)
          ? "lg:left-[60px] xl:left-[60px]"
          : "lg:left-[410px] xl:left-[410px]"
      } xl:left-[410px]`}
    >
      {hoverTab === "general" && <History />}
      {hoverTab === "agents" && <Selection />}
      {hoverTab === "teams" && <Rooms />}
      {hoverTab === "docs" && <Documents />}
    </div>
  );
};

export default Hover;
