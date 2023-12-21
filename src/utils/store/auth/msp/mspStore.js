import { create } from "zustand";
import Cookie from "js-cookie";

const useMspStore = create((set, get) => ({
  mspDomains: null,
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
  successMessage: false,

  setCurrentStep: (step) => set({ currentStep: step }),

  setMspDomains: (msp) => set({ mspDomains: msp }),

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
        return await response.json();
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
        return await response.json();
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
      const [msp, tech] = await Promise.all([
        handleSignupMSP(),
        handleSignupTechnician(),
      ]);
      set({ currentStep: 1, errorMessage: false, successMessage: true });
      navigator(
        `/${msp?.customDomain}/dashboard/${tech?.id}/admin/integrations`
      );
      Cookie.set("session_token", tech?.id, { expires: 7 });
      Cookie.set("client_id", tech?.id, { expires: 7 });
    }
  },

  handleTechnicianCheck: async () => {
    const { loginInputs } = get();
    const { techInfo } = loginInputs;

    if (techInfo.email === "") {
      set({ errorMessage: true });
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:9019/technicianUsers/signin`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            emailId: techInfo.email,
          }),
        }
      );

      if (response.ok) {
        const mspList = await response.json();
        set({ mspDomains: mspList, errorMessage: false });
      }
    } catch (e) {
      console.log(e);
    }
  },

  handleTechnicianLogin: async (navigator, mspCustomDomain) => {
    const { loginInputs } = get();
    const { techInfo } = loginInputs;
    if (techInfo.email === "" || techInfo.password === "") {
      set({ errorMessage: true });
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:9019/${mspCustomDomain}/technicianUsers/signin`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            emailId: techInfo.email,
            password: techInfo.password,
          }),
        }
      );

      if (response.ok) {
        const tech = await response.json();
        set({ errorMessage: false });
        navigator(`/${tech?.mspCustomDomain}/dashboard/${tech?.id}`);
        Cookie.set("session_token", tech?.id, { expires: 7 });
        Cookie.set("client_id", tech?.id, { expires: 7 });
      }
    } catch (e) {
      console.log(e);
    }
  },

  clearMSPCredentials: () => {
    set({
      successMessage: false,
      errorMessage: false,
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
    });
  },
}));

export default useMspStore;
