"use client";

import Layout from "@/components/Layouts/Layout";
import Office from "@/components/Dashboard/Admin/Options/Integrations/SUITE/Office";

const OfficePage = () => {
  return (
    <>
      <Office />
    </>
  );
};

OfficePage.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

export default OfficePage;
