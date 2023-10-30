import { create } from "zustand";

const usePasswordsStore = create((set, get) => ({
  passwordBenefits: [
    {
      title: "Advanced Security",
      description:
        "Combine encrypted data storage with automated credential hygiene across devices and platforms.",
    },
    {
      title: "Effective control",
      description:
        "Granularly manage user access to privileged client accounts to enforce safety and compliance.",
    },
    {
      title: "Improved efficiency",
      description:
        "Don’t waste time searching for essential user access data and client knowledge.",
    },
  ],
}));

export default usePasswordsStore;
