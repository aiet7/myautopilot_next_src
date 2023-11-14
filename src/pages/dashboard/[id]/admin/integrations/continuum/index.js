"use client";

import Continuum from "@/components/Dashboard/Admin/Options/Integrations/RMM/Continuum";
import Layout from "@/components/Layouts/Layout";

const ContinuumPage = () => {
  return (
    <>
      <Continuum />
    </>
  );
};

ContinuumPage.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

export default ContinuumPage;
