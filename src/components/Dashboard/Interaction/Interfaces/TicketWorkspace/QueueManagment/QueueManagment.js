"use client";
import useQueueStore from "@/utils/store/interaction/queue/useQueueStore";
import { useEffect } from "react";
import SmallScreenQueue from "./SmallScreenQueue";
import LargeScreenQueue from "./LargeScreenQueue";

const QueueManagment = () => {
  const { myQueueTicket, isMobile, setIsMobile } = useQueueStore();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 1420);
      };
      handleResize();

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  return (
    <div className={`${isMobile ? "flex-col" : "flex-row"} flex `}>
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
        <p className="dark:text-white/40 text-semibold text-2xl text-black/30">
          Currently No Tickets In Queue
        </p>
      )}
    </div>
  );
};

export default QueueManagment;
