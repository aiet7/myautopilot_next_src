"use client";

import DattoPSA from "@/components/Dashboard/Admin/Options/Integrations/PSA/DattoPSA";
import Layout from "@/components/Layouts/Layout";

const AutoTaskPage = () => {
  return (
    <>
      <DattoPSA />
    </>
  );
};

AutoTaskPage.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

export default AutoTaskPage;
