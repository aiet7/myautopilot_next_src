import useUserStore from "@/utils/store/user/userStore";
import { create } from "zustand";

const usePoliciesStore = create((set, get) => ({
  tempDocs: [
    {
      title: "Data Protection",
      description: "This policy outlines how we handle and protect your data.",
    },
    {
      title: "Email",
      description:
        "Guidelines for the use of company email accounts and best practices.",
    },
    {
      title: "Internet",
      description:
        "Rules and regulations governing the use of the internet in the workplace.",
    },
  ],

  handleSubmitDoc: async (policyTitle) => {
    const userStore = useUserStore.getState();
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");

    const newDate = `${month}-${day}-${year}`;

    let endpoint = "";
    let params = new URLSearchParams();

    try {
      switch (policyTitle) {
        case "Data Protection":
          endpoint = "/dataProtectionPolicy";
          params.append("companyName", userStore.user.companyName);
          params.append(
            "name",
            userStore.user.firstName + " " + userStore.user.lastName
          );
          params.append("date", newDate);
          params.append("email", userStore.user.email);
          break;

        case "Email":
          endpoint = "/emailPolicy";
          params.append("companyName", userStore.user.companyName);
          params.append(
            "name",
            userStore.user.firstName + " " + userStore.user.lastName
          );
          params.append("date", newDate);
          break;

        case "Internet":
          endpoint = "/internetPolicy";
          params.append("companyName", userStore.user.companyName);
          params.append(
            "name",
            userStore.user.firstName + " " + userStore.user.lastName
          );
          params.append("date", newDate);
          break;

        default:
          throw new Error("Unknown policy title");
      }

      const response = await fetch(
        `https://etech7-wf-etech7-document-service.azuremicroservices.io${endpoint}?${params.toString()}`,
        {
          method: "GET",
          headers: {
            Accept:
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          },
        }
      );

      if (response.status === 200) {
        const blob = await response.blob();
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `${policyTitle} Policy.docx`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (e) {
      console.log(e);
    }
  },
}));

export default usePoliciesStore;
