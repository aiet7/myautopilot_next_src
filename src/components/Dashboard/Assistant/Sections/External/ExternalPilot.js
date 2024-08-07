"use client";

import useAssistantStore from "@/utils/store/assistant/assistantStore";
import Passwords from "./Passwords";
import RemoteAccess from "./RemoteAccess";
import Billing from "./Billing";
import Tools from "./Downloads";
import Policies from "./Policies";
import Downloads from "./Downloads";

import { AiOutlineClose } from "react-icons/ai";
import BottomExternalMenu from "./BottomExternalMenu";
import TopExternalMenu from "./TopExternalMenu";

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
    <div className="relative flex-grow flex flex-col gap-4 h-full text-sm">
      <TopExternalMenu />
      <div className="relative flex flex-col flex-grow h-0 overflow-auto scrollbar-thin p-4">
        {renderComponent()}
      </div>
    </div>
  );
};

export default ExternalPilot;
