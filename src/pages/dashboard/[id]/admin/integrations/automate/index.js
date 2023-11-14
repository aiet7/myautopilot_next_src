"use client";

import Automate from "@/components/Dashboard/Admin/Options/Integrations/RMM/Automate";
import Layout from "@/components/Layouts/Layout";

const AutomatePage = () => {
  return (
    <>
      <Automate />
    </>
  );
};

AutomatePage.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

export default AutomatePage;
