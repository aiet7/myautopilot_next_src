"use client";

import Workspace from "@/components/Dashboard/Admin/Options/Integrations/SUITE/Workspace";
import Layout from "@/components/Layouts/Layout";

const GooglePage = () => {
  return (
    <>
      <Workspace />
    </>
  );
};

GooglePage.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

export default GooglePage;
