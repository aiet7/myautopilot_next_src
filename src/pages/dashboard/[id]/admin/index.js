"use client";
import { ThemeProvider } from "next-themes";

import { useEffect } from "react";

import useUserStore from "@/utils/store/user/userStore";
import useUiStore from "@/utils/store/ui/uiStore";

import Nav from "@/components/Dashboard/Admin/Nav";
import Control from "@/components/Dashboard/Admin/Control/Control";
import TabNavRail from "@/components/Dashboard/TabNavRail";
import SettingsRail from "@/components/Dashboard/SettingsRail";

const Admin = () => {
  const { user } = useUserStore();
  const { height, activeTab, setHeight } = useUiStore();

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
          className="flex flex-col h-full w-full "
          style={{ height: `calc(${height}px - 1px)` }}
        >
          <div className="flex flex-col h-full w-full lg:flex-row-reverse">
            <div className="flex flex-col h-full w-full overflow-hidden">
              
              {activeTab !== "settings" && <SettingsRail />}
              {[
                "tim@etech7.com",
                "ariel@etech7.com",
                "eisanov@etech7.com",
                "mkandinov@etech7.com",
                "agogia@etech7.com",
              ].includes(user?.email) &&
                activeTab === "admin" && (
                  <div className="flex flex-1 relative overflow-hidden">
                    <Nav />
                    <Control />
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

export default Admin;
