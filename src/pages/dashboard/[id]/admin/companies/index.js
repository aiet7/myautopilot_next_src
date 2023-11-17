"use client";

import Companies from "@/components/Dashboard/Admin/Options/Companies";
import Layout from "@/components/Layouts/Layout";

const CompaniesPage = () => {
  return (
    <>
      <Companies />
    </>
  );
};


CompaniesPage.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

export default CompaniesPage;
