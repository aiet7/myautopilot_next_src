"use client";

import Layout from "@/components/Layouts/Layout";
import Branding from "@/components/Dashboard/Admin/Options/Branding";

const BrandingPage = () => {
  return (
    <>
      <Branding />
    </>
  );
};

BrandingPage.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

export default BrandingPage;
