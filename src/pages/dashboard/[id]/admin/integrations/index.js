"use client";

import dynamic from "next/dynamic";

import Layout from "@/components/Layouts/Layout";

const Cards = dynamic(() =>
  import("@/components/Dashboard/Admin/Options/Integrations/Cards/Cards")
);

const IntegrationsPage = () => {
  return (
    <>
      <Cards />
    </>
  );
};

IntegrationsPage.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

export default IntegrationsPage;
