"use client";

import useAssistantStore from "@/utils/store/assistant/assistantStore";
import Passwords from "./Passwords";
import RemoteAccess from "./RemoteAccess";
import Billing from "./Billing";
import Tools from "./Downloads";
import Policies from "./Policies";
import Downloads from "./Downloads";

import { AiOutlineClose } from "react-icons/ai";

const ExternalPilot = () => {
  const { activeAssistantTab, setCloseExternalApps } = useAssistantStore();

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
    <div className="relative flex-grow flex flex-col items-center gap-4 p-4 h-full overflow-auto scrollbar-thin">
      <div className="self-end">
        <AiOutlineClose
          onClick={setCloseExternalApps}
          size={20}
          className="cursor-pointer"
        />
      </div>
      {renderComponent()}
    </div>
  );
};

export default ExternalPilot;
