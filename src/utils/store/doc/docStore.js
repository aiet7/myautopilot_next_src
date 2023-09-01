import { create } from "zustand";
import useUiStore from "../ui/uiStore";

const useDocStore = create((set, get) => ({
  tempDocs: [
    {
      title: "Data Protection",
      fields: [
        { inputField: "companyName", label: "Company Name" },
        { inputField: "name", label: "Name" },
        { inputField: "date", label: "Date" },
        { inputField: "email", label: "Email" },
      ],
      guide:
        "A Data Protection Policy ensures that sensitive personal information is handled securely, transparently, and efficiently in the IT ecosystem of a company. It usually stipulates how personal data should be processed, stored, transferred, and eventually deleted or anonymized. This policy is crucial to ensure compliance with privacy laws and to maintain trust with clients and employees.",
    },
    {
      title: "Email",
      fields: [
        { inputField: "companyName", label: "Company Name" },
        { inputField: "name", label: "Name" },
        { inputField: "date", label: "Date" },
      ],
      guide:
        "An Email Policy outlines the acceptable use of company email for communication, ensuring professional etiquette and safeguarding against potential threats. It covers aspects such as personal use, forbidden content, and email retention. This policy is imperative for maintaining corporate identity, ensuring data security, and avoiding misunderstandings.",
    },
    {
      title: "Internet",
      fields: [
        { inputField: "companyName", label: "Company Name" },
        { inputField: "name", label: "Name" },
        { inputField: "date", label: "Date" },
      ],
      guide:
        "The Internet Policy sets forth rules for appropriate use of the company's internet facilities and services. This encompasses the browsing of websites, downloads, and social media access. The policy's main goal is to ensure that employees use the internet in a way that does not compromise the company's IT infrastructure, reputation, or expose it to unnecessary risks.",
    },
    {
      title: "Tax Accounting Cyber Security",
      fields: [
        { inputField: "companyName", label: "Company Name" },
        { inputField: "employeeName", label: "Employee Name" },
        { inputField: "date", label: "Date" },
        { inputField: "employeeTitle", label: "Employee Title" },
        { inputField: "ownerTitle", label: "Owner Title" },
      ],
      guide:
        "This policy focuses on the protection of financial data from potential cyber threats. Given that tax accounting involves handling sensitive financial data, this policy establishes protocols to protect such information from cyberattacks, unauthorized access, and data breaches. This policy is crucial for financial integrity, trustworthiness, and regulatory compliance.",
    },
  ],
  inputValues: {},
  currentDocIndex: null,

  setInputValues: (field, value) => {
    set((state) => ({
      inputValues: {
        ...state.inputValues,
        [field]: value,
      },
    }));
  },

  handleDocSelected: (index) => {
    const { setActiveTab, setHoverTab } = useUiStore.getState();
    set({ currentDocIndex: index, inputValues: {} });
    setActiveTab("docs");
    setHoverTab(null);
  },
}));

export default useDocStore;
