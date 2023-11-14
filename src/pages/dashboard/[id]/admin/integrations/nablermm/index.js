"use client";

import Nable from "@/components/Dashboard/Admin/Options/Integrations/RMM/Nable";
import Layout from "@/components/Layouts/Layout";

const NablePage = () => {
  return (
    <>
      <Nable />
    </>
  );
};

NablePage.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

export default NablePage;
