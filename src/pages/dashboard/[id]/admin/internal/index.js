"use client";

import Layout from "@/components/Layouts/Layout";
import Internal from "@/components/Dashboard/Admin/Options/Internal";

const InternalPage = () => {
  return (
    <>
      <Internal />
    </>
  );
};

InternalPage.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};
export default InternalPage;
