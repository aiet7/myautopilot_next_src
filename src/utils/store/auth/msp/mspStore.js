import { create } from "zustand";
import Cookie from "js-cookie";

const dbServiceUrl = process.env.NEXT_PUBLIC_DB_SERVICE_URL;
const connectWiseServiceUrl = process.env.NEXT_PUBLIC_CONNECTWISE_SERVICE_URL;

const useMspStore = create((set, get) => ({
  userType: null,
  mspDomains: null,
  technician: null,
  technicianList: null,
  selectedTechnician: null,
  client: null,
  clientList: null,
  selectedClient: null,
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
    clientInfo: {
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

  current2FA: false,
  loginInputs: {
    mspCustomDomain: "",
    techInfo: {
      email: "",
      password: "",
      login2FA: "",
    },
    clientInfo: {
      email: "",
      password: "",
      login2FA: "",
    },
  },

  errorMessage: {
    techSignup: false,

    emptyFields: false,
    emailCheck: false,
  },
  successMessage: false,

  showPassword: false,

  initializeUserType: async () => {
    const lastActiveUserType = localStorage.getItem("lastActiveUserType");

    set({
      userType: lastActiveUserType,
    });
  },

  setCurrentStep: (step) => set({ currentStep: step }),

  setShowPassword: (show) => set({ showPassword: show }),

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

  setSelectedTechnician: (technician) => {
    set({ selectedTechnician: technician });
  },

  setSelectedClient: (client) => {
    set({ selectedClient: client });
  },

  handleSwitchMspLoginFlow: () => {
    const { userType } = get();

    if (userType === "tech") {
      localStorage.setItem("lastActiveUserType", "client");
      set({
        userType: "client",
      });
    } else {
      localStorage.setItem("lastActiveUserType", "tech");
      set({
        userType: "tech",
      });
    }
  },

  handleNavigateMSPSignup: (navigator) => {
    const { clearMSPCredentials } = get();
    navigator("/auth/signup");
    localStorage.setItem("lastActiveUserType", "tech");
    clearMSPCredentials();
  },

  handleNavigateMSPLogin: (navigator) => {
    navigator("/auth/login");
  },

  handleNavigateTechnicianPage: (navigator) => {
    navigator("/auth/login/tech");
    localStorage.setItem("lastActiveUserType", "tech");
  },

  handleNavigateClientPage: (navigator) => {
    navigator("/auth/login/client");
    localStorage.setItem("lastActiveUserType", "client");
  },

  handleActiveTechnicianTab: () => {
    localStorage.setItem("lastActiveUserType", "tech");
    set({
      userType: "tech",
    });
  },

  handleActiveClientTab: () => {
    localStorage.setItem("lastActiveUserType", "client");
    set({
      userType: "client",
    });
  },

  handleSignupTechnician: async () => {
    const { signupInputs } = get();
    const { mspCustomDomain, techInfo } = signupInputs;

    try {
      const response = await fetch(
        `${dbServiceUrl}/${encodeURIComponent(
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
        const technician = await response.json();
        set({
          technician: technician,
        });
        return technician;
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
      const response = await fetch(`${dbServiceUrl}/msp`, {
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
      technician,
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
      const tech = await handleSignupTechnician();
      if (tech && tech.id) {
        set({
          currentStep: 2,
          errorMessage: {
            ...errorMessage,
            emptyFields: false,
            emailCheck: false,
            techSignup: false,
          },
        });
      } else {
        set({
          errorMessage: {
            ...errorMessage,
            techSignup: true,
          },
        });
        return;
      }
    } else {
      const msp = await handleSignupMSP();
      if (msp && msp.id) {
        set({
          currentStep: 1,
          errorMessage: {
            ...errorMessage,
            techSignup: false,
            emptyFields: false,
            emailCheck: false,
          },
          successMessage: true,
        });
        navigator(
          `/${msp.customDomain}/dashboard/${technician.id}/admin/integrations`
        );
        Cookie.set("session_token", technician.id, { expires: 7 });
        Cookie.set("client_id", technician.id, { expires: 7 });
      }
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
      const response = await fetch(`${dbServiceUrl}/technicianUsers/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emailId: techInfo.email,
        }),
      });

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

  handleClientCheck: async () => {
    const { loginInputs, errorMessage } = get();
    const { clientInfo } = loginInputs;

    if (clientInfo.email === "") {
      set({
        errorMessage: { ...errorMessage, emptyFields: true, emailCheck: false },
      });
      return;
    }

    try {
      const response = await fetch(`${dbServiceUrl}/clientUsers/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emailId: clientInfo.email,
        }),
      });

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

  handleTechnicianLogin: async (mspCustomDomain) => {
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
        `${dbServiceUrl}/${mspCustomDomain}/technicianUsers/signin`,
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
        set({
          current2FA: true,
          errorMessage: {
            ...errorMessage,
            emailCheck: false,
            emptyFields: false,
          },
        });
      } else {
        set({
          current2FA: false,
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

  handleClientLogin: async (mspCustomDomain) => {
    const { loginInputs, errorMessage } = get();
    const { clientInfo } = loginInputs;
    if (clientInfo.email === "" || clientInfo.password === "") {
      set({
        errorMessage: { ...errorMessage, emptyFields: true, emailCheck: false },
      });
      return;
    }
    try {
      const response = await fetch(
        `${dbServiceUrl}/${mspCustomDomain}/clientUsers/signin`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            emailId: clientInfo.email,
            password: clientInfo.password,
          }),
        }
      );

      if (response.ok) {
        set({
          current2FA: true,
          errorMessage: {
            ...errorMessage,
            emailCheck: false,
            emptyFields: false,
          },
        });
      } else {
        set({
          current2FA: false,
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

  handleTechnician2FALogin: async (navigator, mspCustomDomain) => {
    const { loginInputs, errorMessage } = get();
    const { techInfo } = loginInputs;

    if (techInfo.login2FA === "") {
      set({
        errorMessage: { ...errorMessage, emptyFields: true, emailCheck: false },
      });
      return;
    }

    const encodedEmail = encodeURIComponent(techInfo.email);
    const encodedToken = encodeURIComponent(techInfo.login2FA);

    try {
      const response = await fetch(
        `${dbServiceUrl}/${mspCustomDomain}/technicianUsers/validateResetToken?email=${encodedEmail}&token=${encodedToken}`
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

  handleClient2FALogin: async (navigator, mspCustomDomain) => {
    const { loginInputs, errorMessage } = get();
    const { clientInfo } = loginInputs;

    if (clientInfo.login2FA === "") {
      set({
        errorMessage: { ...errorMessage, emptyFields: true, emailCheck: false },
      });
      return;
    }

    const encodedEmail = encodeURIComponent(clientInfo.email);
    const encodedToken = encodeURIComponent(clientInfo.login2FA);

    try {
      const response = await fetch(
        `${dbServiceUrl}/${mspCustomDomain}/clientUsers/validateResetToken?email=${encodedEmail}&token=${encodedToken}`
      );

      if (response.ok) {
        const client = await response.json();
        set({
          errorMessage: {
            ...errorMessage,
            emailCheck: false,
            emptyFields: false,
          },
        });
        navigator(`/${client?.mspCustomDomain}/dashboard/${client?.id}`);
        Cookie.set("session_token", client?.id, { expires: 7 });
        Cookie.set("client_id", client?.id, { expires: 7 });
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

  handleActivateTechnicianCheck: async (mspCustomDomain) => {
    const { signupInputs } = get();
    const { techInfo } = signupInputs;
    try {
      const response = await fetch(
        `${dbServiceUrl}/${mspCustomDomain}/technicianUsers/signup?email=${techInfo.email}`
      );
      if (response.ok) {
        const technicians = await response.json();
        set({
          technicianList: technicians,
        });
      } else {
        console.log("Error");
      }
    } catch (e) {
      console.log();
    }
  },

  handleActivateClientCheck: async (mspCustomDomain) => {
    const { signupInputs } = get();
    const { clientInfo } = signupInputs;
    try {
      const response = await fetch(
        `${dbServiceUrl}/${mspCustomDomain}/clientUsers/signup?email=${clientInfo.email}`
      );

      if (response.ok) {
        const clients = await response.json();
        set({
          clientList: clients,
        });
      } else {
        console.log("Error");
      }
    } catch (e) {
      console.log();
    }
  },

  handleActivateTechnician: async (navigator, mspCustomDomain) => {
    const { signupInputs, selectedTechnician } = get();
    const { techInfo } = signupInputs;
    const payload = {
      ...selectedTechnician,
      email: selectedTechnician.primaryEmail,
      password: techInfo.password,
    };

    try {
      const response = await fetch(
        `${dbServiceUrl}/${mspCustomDomain}/technicianUsers/createAccount`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        console.log("Technician Activated");
        navigator(`/${mspCustomDomain}`);
      } else {
        console.log("Technician Activation Failed");
      }
    } catch (e) {
      console.log(e);
    }
  },

  handleActivateClient: async (navigator, mspCustomDomain) => {
    const { signupInputs, selectedClient } = get();
    const { clientInfo } = signupInputs;
    const payload = {
      ...selectedClient,
      email: selectedClient.primaryEmail,
      password: clientInfo.password,
    };

    try {
      const response = await fetch(
        `${dbServiceUrl}/${mspCustomDomain}/technicianUsers/createAccount`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        console.log("Client Activated");
        navigator(`/${mspCustomDomain}`);
      } else {
        console.log("Client Activation Failed");
      }
    } catch (e) {
      console.log(e);
    }
  },

  clearMSPCredentials: () => {
    set({
      mspDomains: null,
      technician: null,
      technicianList: null,
      selectedTechnician: null,
      client: null,
      clientList: null,
      selectedClient: null,
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
        clientInfo: {
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

      current2FA: false,
      loginInputs: {
        mspCustomDomain: "",
        techInfo: {
          email: "",
          password: "",
          login2FA: "",
        },
        clientInfo: {
          email: "",
          password: "",
          login2FA: "",
        },
      },

      errorMessage: {
        techSignup: false,

        emptyFields: false,
        emailCheck: false,
      },
      successMessage: false,

      showPassword: false,
    });
  },
}));

export default useMspStore;
