"use client";

import Workflows from "@/components/Dashboard/Admin/Options/Workflows";
import Layout from "@/components/Layouts/Layout";

const WorkflowsPage = () => {
  return (
    <>
      <Workflows />
    </>
  );
};

WorkflowsPage.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

export default WorkflowsPage;
