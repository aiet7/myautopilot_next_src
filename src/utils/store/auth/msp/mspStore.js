import { create } from "zustand";

const useMspStore = create((set, get) => ({
  currentStep: 1,
  signupInputs: {
    mspCustomDomain: "",
    techInfo: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
    },
    mspInfo: {
      mspName: "",
      brandLogoUrl: "",
    },
  },

  loginInputs: {
    mspCustomDomain: "timsdomain",
    techInfo: {
      email: "",
      password: "",
    },
  },

  errorMessage: false,

  setCurrentStep: (step) => set({ currentStep: step }),

  setSignupInputs: (section, field, value) =>
    set((prevState) => ({
      signupInputs: section
        ? {
            ...prevState.signupInputs,
            [section]: {
              ...prevState.signupInputs[section],
              [field]: value,
            },
          }
        : {
            ...prevState.signupInputs,
            [field]: value,
          },
    })),

  setLoginInputs: (section, field, value) =>
    set((prevState) => ({
      loginInputs: section
        ? {
            ...prevState.loginInputs,
            [section]: {
              ...prevState.loginInputs[section],
              [field]: value,
            },
          }
        : {
            ...prevState.loginInputs,
            [field]: value,
          },
    })),

  handleSignupTechnician: async () => {
    const { signupInputs } = get();
    const { mspCustomDomain, techInfo } = signupInputs;

    try {
      const response = await fetch(
        `http://localhost:9019/${encodeURIComponent(
          mspCustomDomain
        )}/technicianUsers/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(techInfo),
        }
      );

      if (response.ok) {
        console.log("SAVED TECH");
      } else {
        console.log("ERROR SAVING TECH");
      }
    } catch (e) {
      console.log();
    }
  },

  handleSignupMSP: async () => {
    const { signupInputs } = get();
    const { mspCustomDomain, mspInfo } = signupInputs;

    const msp = {
      ...mspInfo,
      customDomain: mspCustomDomain,
    };

    try {
      const response = await fetch(`http://localhost:9019/msp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(msp),
      });

      if (response.ok) {
        console.log("SAVED MSP");
      } else {
        console.log("ERROR SAVING MSP");
      }
    } catch (e) {
      console.log(e);
    }
  },

  handleSignupProgression: async (navigator) => {
    const {
      signupInputs,
      currentStep,
      handleSignupTechnician,
      handleSignupMSP,
    } = get();
    const { techInfo } = signupInputs;

    if (
      techInfo.firstName === "" ||
      techInfo.lastName === "" ||
      techInfo.email === "" ||
      techInfo.phoneNumber === "" ||
      techInfo.password === ""
    ) {
      set({ errorMessage: true });
      return;
    }
    if (currentStep === 1) {
      set({ currentStep: 2, errorMessage: false });
    } else {
      await Promise.all([handleSignupTechnician(), handleSignupMSP()]);
      set({ errorMessage: false });
      navigator("/auth/login");
    }
  },

  handleTechnicianLogin: async (navigator) => {
    const { loginInputs } = get();
    const { mspCustomDomain, techInfo } = loginInputs;

    if (techInfo.email === "" && techInfo.password === "") {
      set({ errorMessage: true });
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:9019/${encodeURIComponent(
          mspCustomDomain
        )}/technicianUsers/verifyPassword?email=${encodeURIComponent(
          techInfo.email
        )}&password=${encodeURIComponent(techInfo.password)}`,
        {
          method: "POST",
        }
      );

      if (response.ok) {
        const tech = await response.json();
        set({ errorMessage: false });

        navigator(`/${tech.mspCustomDomain}/dashboard/${tech.id}`);
      }
    } catch (e) {
      console.log(e);
    }
  },
}));

export default useMspStore;
