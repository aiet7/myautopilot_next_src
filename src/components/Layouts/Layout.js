"use client";
import { ThemeProvider } from "next-themes";

import useUiStore from "@/utils/store/ui/uiStore";
import useAssistantStore from "@/utils/store/assistant/assistantStore";
import { useEffect } from "react";

import SettingsRail from "../Dashboard/SettingsRail";
import History from "../Dashboard/History/History";
import Documents from "../Dashboard/Document/Documents";
import Account from "../Dashboard/Account";
import TabNavRail from "../Dashboard/TabNavRail";
import Nav from "../Dashboard/Admin/Nav";

const Layout = ({ children }) => {
  const { height, activeTab, openSettings, setHeight, handleToggleSettings } =
    useUiStore();
  const { activeUIAssistantTab } = useAssistantStore();

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
    <ThemeProvider attribute="class">
      {height && (
        <div
          onClick={() => openSettings && handleToggleSettings(false)}
          className="flex flex-col h-full w-full "
          style={{ height: `calc(${height}px - 1px)` }}
        >
          <div className="flex flex-col h-full w-full lg:flex-row-reverse">
            <div className="flex flex-col h-full w-full overflow-hidden">
              {activeTab !== "settings" && <SettingsRail />}
              <div className="flex flex-1 relative overflow-hidden">
                {activeTab === "admin" && <Nav />}
                {activeTab === "iTAgent" &&
                  activeUIAssistantTab === "Engineer" && <History />}
                {activeTab === "iTAgent" &&
                  activeUIAssistantTab === "DocGuide" && <Documents />}
                {children}
              </div>
              {activeTab === "settings" && (
                <div className="overflow-auto h-full w-full no-scrollbar">
                  <Account />
                </div>
              )}
            </div>
            <TabNavRail />
          </div>
        </div>
      )}
    </ThemeProvider>
  );
};

export default Layout;
