"use client";

import useAssistantStore from "@/utils/store/assistant/assistantStore";
import Passwords from "./Passwords";
import RemoteAccess from "./RemoteAccess";
import Billing from "./Billing";
import Tools from "./Downloads";
import Policies from "./Policies";
import Downloads from "./Downloads";

const ExternalPilot = () => {
  const { activeAssistantTab } = useAssistantStore();

  const renderComponent = () => {
    switch (activeAssistantTab) {
      case "Remote Access":
        return <RemoteAccess />;
      case "Passwords":
        return <Passwords />;
      case "Billing":
        return <Billing />;
      case "Downloads":
        return <Downloads />;
      case "Policies":
        return <Policies />;
      default:
        return null;
    }
  };

  return (
    <div className="relative flex-grow flex flex-col items-center py-10 px-2 gap-14 overflow-auto scrollbar-thin">
      {renderComponent()}
    </div>
  );
};

export default ExternalPilot;
