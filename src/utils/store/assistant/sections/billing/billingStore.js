import { create } from "zustand";

const useBillingStore = create((set, get) => ({
  billingBenefits: [
    {
      title: "Automated Billing",
      description:
        "Bill the correct amount based on agreements in your CRM or accounting software every time, without manually adjusting individual invoices.",
    },

    {
      title: "Automated Statements",
      description:
        "Send emails with a detailed account summary of what they were charged and the services they received.",
    },
  ],
}));

export default useBillingStore;
