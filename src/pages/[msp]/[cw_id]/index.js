"use client";

import PodLayout from "@/components/Layouts/PodLayout";
import useConversationStore from "@/utils/store/interaction/conversations/conversationsStore";
import useLocalStorageStore from "@/utils/store/localstorage/localStorageStore";
import useUiStore from "@/utils/store/ui/uiStore";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Interaction from "@/components/Dashboard/Interaction/Interaction";

const PodPage = () => {
  const router = useRouter();

  const { currentNavOption, setCurrentNavOption } = useUiStore();
  const { initializePod } = useConversationStore();

  useEffect(() => {
    if (router.isReady) {
      const currentPath = router.asPath;
      const { msp, cw_id } = router.query;
      setCurrentNavOption("Assistant");
      getStorage(currentPath, null);

      if ((msp, cw_id)) {
        initializePod(msp, cw_id ? cw_id : 632006);
      }
    }
  }, [router.isReady, router.asPath]);

  useEffect(() => {
    setStorage();

    window.addEventListener("beforeunload", setStorage);

    return () => {
      window.removeEventListener("beforeunload", setStorage);
    };
  }, [currentNavOption]);

  const { getStorage, setStorage } = useLocalStorageStore();

  return (
    <div className="relative flex flex-col h-full w-full ">
      <Interaction />
    </div>
  );
};

PodPage.getLayout = (page) => {
  return <PodLayout>{page}</PodLayout>;
};

export default PodPage;
