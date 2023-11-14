"use client";

import Cards from "@/components/Dashboard/Admin/Options/Integrations/Cards/Cards";
import Layout from "@/components/Layouts/Layout";

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
