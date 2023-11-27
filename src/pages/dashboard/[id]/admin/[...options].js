"use client";

import { useRouter } from "next/router";
import dynamic from "next/dynamic";

const Layout = dynamic(() => import("@/components/Layouts/Layout"));

const Branding = dynamic(() =>
  import("@/components/Dashboard/Admin/Options/Branding")
);
const Companies = dynamic(() =>
  import("@/components/Dashboard/Admin/Options/Companies")
);
const Cards = dynamic(() =>
  import("@/components/Dashboard/Admin/Options/Integrations/Cards/Cards")
);
const Internal = dynamic(() =>
  import("@/components/Dashboard/Admin/Options/Internal")
);
const Roles = dynamic(() =>
  import("@/components/Dashboard/Admin/Options/Roles")
);
const Workflows = dynamic(() =>
  import("@/components/Dashboard/Admin/Options/Workflows")
);

const OptionPages = () => {
  const router = useRouter();

  const { options } = router.query;

  const renderComponent = () => {
    if (options && options.length > 0) {
      const componentKey = options[0].toLowerCase();
      switch (componentKey) {
        case "branding":
          return <Branding />;
        case "companies":
          return <Companies />;
        case "integrations":
          return <Cards />;
        case "internal":
          return <Internal />;
        case "roles":
          return <Roles />;
        case "workflows":
          return <Workflows />;
        default:
          return <p>Option not found</p>;
      }
    }
    return <p>Select an option</p>;
  };
  return <>{renderComponent()}</>;
};

OptionPages.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

export default OptionPages;
