"use client";

import EmailConnecter from "@/components/Dashboard/Admin/Options/Integrations/Email/EmailConnecter";
import Layout from "@/components/Layouts/Layout";

const EmailConnecterPage = () => {
  return (
    <>
      <EmailConnecter />
    </>
  );
};

EmailConnecterPage.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

export default EmailConnecterPage;
