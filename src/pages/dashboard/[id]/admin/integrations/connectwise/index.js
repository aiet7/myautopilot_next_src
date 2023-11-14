"use client";

import Manage from "@/components/Dashboard/Admin/Options/Integrations/PSA/Manage";
import Layout from "@/components/Layouts/Layout";

const ManagePage = () => {
  return (
    <>
      <Manage />
    </>
  );
};

ManagePage.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

export default ManagePage;
