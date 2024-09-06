"use client";
import { ThemeProvider } from "next-themes";
import dynamic from "next/dynamic";

import useUiStore from "@/utils/store/ui/uiStore";
import { useEffect } from "react";

import SettingsRail from "../Dashboard/SettingsRail";
import TabNavRail from "../Dashboard/TabNavRail";
import Nav from "../Dashboard/Nav";
import AdminNav from "../Dashboard/Admin/AdminNav";
import useTicketsStore from "@/utils/store/interaction/tickets/ticketsStore";
import useConversationStore from "@/utils/store/interaction/conversations/conversationsStore";
import useAssistantStore from "@/utils/store/assistant/assistantStore";
import useQueueStore from "@/utils/store/interaction/queue/queueStore";

const Account = dynamic(() => import("@/components/Dashboard/Account"));

const Layout = ({ children }) => {
  const {
    height,
    activeTab,
    openSettings,
    showQueueSubMenu,
    setHeight,
    handleToggleQueueSubMenu,
    handleToggleSettings,
  } = useUiStore();

  const {
    activeTicketBotModeOpen,
    filterTicketModeOpen,
    handleToggleTicketMenus,
  } = useTicketsStore();

  const { activeChatBotModeOpen, filterChatModeOpen, handleToggleChatMenus } =
    useConversationStore();

  const { assistantWidthOpen, handleToggleResizeMenus } = useAssistantStore();

  const {
    activeQueueBotModeOpen,
    filterQueueTicketModeOpen,
    handleToggleQueueTicketMenus,
  } = useQueueStore();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHeight(window.innerHeight);

      const handleResize = () => setHeight(window.innerHeight);
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  return (
    <ThemeProvider defaultTheme="light" attribute="class">
      {height && (
        <div
          onClick={() => {
            openSettings && handleToggleSettings(false);
            showQueueSubMenu && handleToggleQueueSubMenu(false);
            assistantWidthOpen && handleToggleResizeMenus(false);
            (activeQueueBotModeOpen || filterQueueTicketModeOpen) &&
              handleToggleQueueTicketMenus(false);
            (activeChatBotModeOpen || filterChatModeOpen) &&
              handleToggleChatMenus(false);
            (activeTicketBotModeOpen || filterTicketModeOpen) &&
              handleToggleTicketMenus(false);
          }}
          className="flex flex-col h-full w-full "
          style={{ height: `calc(${height}px - 1px)` }}
        >
          <div className="flex flex-col h-full w-full lg:flex-row-reverse">
            <div className="flex flex-col h-full w-full overflow-hidden">
              {activeTab !== "settings" && <SettingsRail />}
              <div className="flex flex-1 relative overflow-hidden">
                {activeTab === "admin" && <AdminNav />}
                {activeTab === "iTAgent" && <Nav />}

                {children}
              </div>
             
            </div>
            <TabNavRail />
          </div>
        </div>
      )}
    </ThemeProvider>
  );
};

export default Layout;
