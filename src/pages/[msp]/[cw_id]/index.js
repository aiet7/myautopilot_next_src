"use client";

import PodTroubleshootLayout from "@/components/Layouts/PodTroubleshootLayout";
import useConversationStore from "@/utils/store/interaction/conversations/conversationsStore";
import useLocalStorageStore from "@/utils/store/localstorage/localStorageStore";
import useUiStore from "@/utils/store/ui/uiStore";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Interaction from "@/components/Dashboard/Interaction/Interaction";

const PodTroubleshootPage = () => {
  const router = useRouter();

  const { currentNavOption, setCurrentNavOption } = useUiStore();
  const { initializePod } = useConversationStore();
  const { getStorage, setStorage } = useLocalStorageStore();

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

  return (
    <div className="relative flex flex-col h-full w-full ">
      <Interaction />
    </div>
  );
};

PodTroubleshootPage.getLayout = (page) => {
  return <PodTroubleshootLayout>{page}</PodTroubleshootLayout>;
};

export default PodTroubleshootPage;
