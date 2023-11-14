"use client";

import ScreenConnect from "@/components/Dashboard/Admin/Options/Integrations/RMM/ScreenConnect";
import Layout from "@/components/Layouts/Layout";

const ScreenConnectPage = () => {
  return (
    <>
      <ScreenConnect />
    </>
  );
};

ScreenConnectPage.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

export default ScreenConnectPage;
