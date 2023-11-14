"use client";

import Openai from "@/components/Dashboard/Admin/Options/Integrations/AI/Openai";
import Layout from "@/components/Layouts/Layout";

const OpenaiPage = () => {
  return (
    <>
      <Openai />
    </>
  );
};

OpenaiPage.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

export default OpenaiPage;
