"use client";

import useIntegrationsStore from "@/utils/store/admin/control/integrations/integrationsStore";
import Cards from "./Cards/Cards";
import Automate from "./RMM/Automate";
import Manage from "./PSA/Manage";
import Office from "./SUITE/Office";
import Workspace from "./SUITE/Workspace";
import Nable from "./RMM/Nable";
import Continuum from "./RMM/Continuum";
import DattoRMM from "./RMM/DatoRMM";
import DattoPSA from "./PSA/DattoPSA";
import ScreenConnect from "./RMM/ScreenConnect";
import Openai from "./AI/Openai";

const Integrations = () => {
  const { activeIntegrationsCard } = useIntegrationsStore();

  return (
    <div className="w-full h-full flex flex-col">
      <div className="dark:border-b-white/20 border-b p-4">
        <h1 className="text-2xl">Integration Center</h1>
      </div>
      <div className="flex flex-col py-6 w-full overflow-hidden">
        {activeIntegrationsCard === "cards" && <Cards />}
        {activeIntegrationsCard === "automate" && <Automate />}
        {activeIntegrationsCard === "connectwise" && <Manage />}
        {activeIntegrationsCard === "office365" && <Office />}
        {activeIntegrationsCard === "googlews" && <Workspace />}
        {(activeIntegrationsCard === "nablermm" ||
          activeIntegrationsCard === "ncentral") && <Nable />}
        {activeIntegrationsCard === "continuum" && <Continuum />}
        {activeIntegrationsCard === "aem" && <DattoRMM />}
        {activeIntegrationsCard === "autotask" && <DattoPSA />}
        {activeIntegrationsCard === "screenconnect" && <ScreenConnect />}
        {activeIntegrationsCard === "openai" && <Openai />}
      </div>
    </div>
  );
};

export default Integrations;
