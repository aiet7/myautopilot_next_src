"use client";
import useQueueStore from "@/utils/store/interaction/queue/queueStore";
import { useEffect } from "react";
import SmallScreenQueue from "./SmallScreenQueue";
import LargeScreenQueue from "./LargeScreenQueue";
import QueueNav from "./QueueNav";

const QueueManagment = () => {
  const { myQueueTicket, isMobile, setIsMobile } = useQueueStore();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 1600);
      };
      handleResize();

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  return (
    <div className="">
      <QueueNav />
      <div className={`${isMobile ? "flex-col" : "flex-row"} flex text-xs `}>
        {myQueueTicket ? (
          <>
            {isMobile ? (
              <SmallScreenQueue />
            ) : (
              <>
                <LargeScreenQueue />
              </>
            )}
          </>
        ) : (
          <p className="dark:text-white/40 text-semibold text-2xl text-black/30 pt-9">
            Currently No Tickets In Queue
          </p>
        )}
      </div>
    </div>
  );
};

export default QueueManagment;
