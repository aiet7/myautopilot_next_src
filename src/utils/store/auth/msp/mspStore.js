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
    mspCustomDomain: "",
    techInfo: {
      email: "",
      password: "",
    },
  },

  errorMessage: {
    emptyFields: false,
    emailCheck: false,
  },
  successMessage: false,

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
      errorMessage,
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
      set({
        errorMessage: { ...errorMessage, emptyFields: true, emailCheck: false },
      });
      return;
    }
    if (currentStep === 1) {
      set({
        currentStep: 2,
        errorMessage: {
          ...errorMessage,
          emptyFields: false,
          emailCheck: false,
        },
      });
    } else {
      const [msp, tech] = await Promise.all([
        handleSignupMSP(),
        handleSignupTechnician(),
      ]);

      set({
        currentStep: 1,
        errorMessage: {
          ...errorMessage,
          emptyFields: false,
          emailCheck: false,
        },
        successMessage: true,
      });
      navigator(
        `/${msp?.customDomain}/dashboard/${tech?.id}/admin/integrations`
      );
      Cookie.set("session_token", tech?.id, { expires: 7 });
      Cookie.set("client_id", tech?.id, { expires: 7 });
    }
  },

  handleTechnicianCheck: async () => {
    const { loginInputs, errorMessage } = get();
    const { techInfo } = loginInputs;

    if (techInfo.email === "") {
      set({
        errorMessage: { ...errorMessage, emptyFields: true, emailCheck: false },
      });
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
        set({
          mspDomains: mspList,
          errorMessage: {
            ...errorMessage,
            emptyFields: false,
            emailCheck: false,
          },
        });
      } else {
        set({
          errorMessage: {
            ...errorMessage,
            emailCheck: true,
            emptyFields: false,
          },
        });
      }
    } catch (e) {
      console.log(e);
    }
  },

  handleTechnicianLogin: async (navigator, mspCustomDomain) => {
    const { loginInputs, errorMessage } = get();
    const { techInfo } = loginInputs;
    if (techInfo.email === "" || techInfo.password === "") {
      set({
        errorMessage: { ...errorMessage, emptyFields: true, emailCheck: false },
      });
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
        set({
          errorMessage: {
            ...errorMessage,
            emailCheck: false,
            emptyFields: false,
          },
        });
        navigator(`/${tech?.mspCustomDomain}/dashboard/${tech?.id}`);
        Cookie.set("session_token", tech?.id, { expires: 7 });
        Cookie.set("client_id", tech?.id, { expires: 7 });
      } else {
        set({
          errorMessage: {
            ...errorMessage,
            emailCheck: true,
            emptyFields: false,
          },
        });
      }
    } catch (e) {
      console.log(e);
    }
  },

  clearMSPCredentials: () => {
    const { errorMessage } = get();
    set({
      mspDomains: null,
      currentStep: 1,
      successMessage: "",
      errorMessage: { ...errorMessage, emptyFields: false, emailCheck: false },
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
        mspCustomDomain: "",
        techInfo: {
          email: "",
          password: "",
        },
      },
    });
  },
}));

export default useMspStore;
