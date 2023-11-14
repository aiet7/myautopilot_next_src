"use client";
import DattoRMM from "@/components/Dashboard/Admin/Options/Integrations/RMM/DatoRMM";
import Layout from "@/components/Layouts/Layout";

const AemPage = () => {
  return (
    <>
      <DattoRMM />
    </>
  );
};

AemPage.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

export default AemPage;
