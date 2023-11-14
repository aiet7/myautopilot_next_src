"use client";

import Layout from "@/components/Layouts/Layout";
import Roles from "@/components/Dashboard/Admin/Options/Roles";

const RolesPage = () => {
  return (
    <>
      <Roles />
    </>
  );
};

RolesPage.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

export default RolesPage;
