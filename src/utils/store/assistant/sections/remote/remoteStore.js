import { create } from "zustand";

const useRemoteStore = create((set, get) => ({
  remoteBenefits: [
    {
      title: "Secure access",
      description:
        "World-class security functionality out of the box—including AES-256 encryption and two-factor authentication—so techs can provide remote support with confidence.",
    },
    {
      title: "Instant connectivity",
      description:
        "Your technicians will never waste a moment in helping customers resolve issues and stay productive.  Easily connect to any managed endpoint in a snap.",
    },
    {
      title: "Flexible plans",
      description:
        "Billing is by concurrent user, so it works for teams large and small—just use the features you need when you need them as your business grows.",
    },
  ],
}));

export default useRemoteStore;
