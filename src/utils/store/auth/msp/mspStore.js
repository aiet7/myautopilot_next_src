import { create } from "zustand";
import Cookie from "js-cookie";
import { tokenize } from "prismjs/components/prism-core";


const dbServiceUrl = process.env.NEXT_PUBLIC_DB_SERVICE_URL;
const connectWiseServiceUrl = process.env.NEXT_PUBLIC_CONNECTWISE_SERVICE_URL;

const useMspStore = create((set, get) => ({
  userType: null,
  mspDomains: null,
  msp: null,
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
      role: "",
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
      brandLogoFile: null,
      webSiteUrl: "",
      companyAddress: {
        street: "",
        city: "",
        state: "",
        zipcode: "",
      },
      phoneNumber: "",
    },
    publicInfo: {
      email: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      password: "",
    },
  },

  qrUrl: null,
  current2FA: false,
  loginInputs: {
    mspCustomDomain: "",
    techInfo: {
      email: "",
      password: "",
      login2FA: "",
      authCode: ""
    },
    clientInfo: {
      email: "",
      password: "",
      login2FA: "",
    },
  },

  errorMessage: {
    techSignup: false,
    publicSignup: false,
    fileSize: false,
    fileMissing: false,
    emptyFields: false,
    emailCheck: false,
    clientEmailCheck: false,
    techEmailCheck: false,
    login2FA: false,
  },

  successMessage: false,

  showPassword: false,

  initializeUserType: async () => {
    const lastActiveUserType = localStorage.getItem("lastActiveUserType");

    if (!lastActiveUserType) {
      localStorage.setItem("lastActiveUserType", "client");
      set({
        userType: "client",
      });
    } else {
      set({
        userType: lastActiveUserType,
      });
    }
  },

  setFileSizeError: (error) => {
    const { errorMessage } = get();
    set({ errorMessage: { ...errorMessage, fileSize: error } });
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

    // sets the state for the users inputs
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

  handleNavigatePublicSignup: (navigator) => {
    const { clearMSPCredentials } = get();
    navigator("/public/signup");
    localStorage.setItem("lastActiveUserType", "client");
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
    const { errorMessage } = get();
    localStorage.setItem("lastActiveUserType", "tech");
    set({
      userType: "tech",
      errorMessage: {
        ...errorMessage,
        clientEmailCheck: false,
        techEmailCheck: false,
      },
    });
  },

  handleActiveClientTab: () => {
    const { errorMessage } = get();

    localStorage.setItem("lastActiveUserType", "client");
    set({
      userType: "client",
      errorMessage: {
        ...errorMessage,
        clientEmailCheck: false,
        techEmailCheck: false,
      },
    });
  },

  handleSignupPublic: async (navigator) => {
    const { signupInputs, errorMessage } = get();
    const { publicInfo } = signupInputs;

    if (
      publicInfo.firstName === "" ||
      publicInfo.lastName === "" ||
      publicInfo.email === "" ||
      publicInfo.password === "" ||
      publicInfo.phoneNumber === ""
    ) {
      set({
        errorMessage: {
          ...errorMessage,
          emptyFields: true,
        },
      });
      return;
    }

    try {
      const response = await fetch(`${dbServiceUrl}/public/user/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: publicInfo.firstName,
          lastName: publicInfo.lastName,
          phoneNumber: publicInfo.phoneNumber,
          emailId: publicInfo.email,
          password: publicInfo.password,
        }),
      });

      if (response.ok) {
        const publicUser = await response.json();
        set({
          errorMessage: {
            ...errorMessage,
            publicSignup: false,
            emptyFields: false,
          },
        });
        navigator(`/${publicUser.mspCustomDomain}/dashboard/${publicUser.id}`);
        Cookie.set("session_token", publicUser.id, { expires: 7 });
        Cookie.set("client_id", publicUser.id, { expires: 7 });
      } else {
        set({
          errorMessage: {
            ...errorMessage,
            publicSignup: true,
            emptyFields: false,
          },
        });
        console.log("ERROR SIGNING UP PUBLIC USER");
      }
    } catch (e) {
      console.log(e);
    }
  },

  handleSignupMSP: async () => {
    const { signupInputs } = get();
    const { mspCustomDomain, mspInfo } = signupInputs;

    const formData = new FormData();
    formData.append("mspName", mspInfo.mspName);
    formData.append("customDomain", mspCustomDomain);
    formData.append("companyPhoneNumber", mspInfo.phoneNumber);
    formData.append("webSiteUrl", mspInfo.webSiteUrl);

    if (mspInfo.brandLogoFile) {
      formData.append("file", mspInfo.brandLogoFile);
    }

    try {
      const response = await fetch(`${dbServiceUrl}/msp`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const msp = await response.json();
        set({
          msp: msp,
        });
        return msp;
      } else {
        console.log("ERROR SAVING MSP");
      }
    } catch (e) {
      console.log(e);
    }
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
          body: JSON.stringify({
            firstName: techInfo.firstName,
            lastName: techInfo.lastName,
            phoneNumber: techInfo.phoneNumber,
            email: techInfo.email,
            password: techInfo.password,
            role: techInfo.role,
          }),
        }
      );

      if (response.ok) {
        const technician = await response.json();

        return technician;
      } else {
        console.log("ERROR SAVING TECH");
      }
    } catch (e) {
      console.log();
    }
  },

  handleSignupProgression: async (navigator) => {
    const {
      msp,
      errorMessage,
      signupInputs,
      currentStep,
      handleSignupTechnician,
      handleSignupMSP,
    } = get();
    const { techInfo, mspInfo, mspCustomDomain } = signupInputs;

    if (currentStep === 1) {
      if (
        mspCustomDomain !== "" &&
        mspInfo.mspName !== "" &&
        mspInfo.companyUrl !== "" &&
        mspInfo.phoneNumber !== ""
      ) {
        const msp = await handleSignupMSP();
        if (msp && msp.id) {
          set({
            currentStep: 2,
            errorMessage: {
              ...errorMessage,
              techSignup: false,
              emptyFields: false,
              emailCheck: false,
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
        set({
          errorMessage: {
            ...errorMessage,
            emptyFields: true,
            emailCheck: false,
          },
        });
        return;
      }
    } else {
      if (
        techInfo.firstName !== "" &&
        techInfo.lastName !== "" &&
        techInfo.role !== "" &&
        techInfo.phoneNumber !== "" &&
        techInfo.email !== "" &&
        techInfo.password !== ""
      ) {
        const tech = await handleSignupTechnician();
        if (tech && tech.id) {
          set({
            successMessage: true,
            errorMessage: {
              ...errorMessage,
              emptyFields: false,
              emailCheck: false,
              techSignup: false,
            },
          });

          navigator(
            `/${msp.customDomain}/dashboard/${tech.id}/admin/msp-integrations/connectwise`
          );
          Cookie.set("session_token", tech.id, { expires: 7 });
          Cookie.set("client_id", tech.id, { expires: 7 });
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
        set({
          errorMessage: {
            ...errorMessage,
            emptyFields: true,
            emailCheck: false,
          },
        });
        return;
      }
    }
  },

  handleTechnicianCheck: async (navigator) => {
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
        if (mspList.length === 1) {
          navigator(`/${mspList[0].mspCustomDomain}`);
        } else if (mspList.length > 1) {
          set({
            mspDomains: mspList,
            errorMessage: {
              ...errorMessage,
              emptyFields: false,
              emailCheck: false,
            },
          });
        }
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

  handleClientCheck: async (navigator) => {
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

        if (mspList.length === 1) {
          navigator(`/${mspList[0].mspCustomDomain}`);
        } else if (mspList.length > 1) {
          set({
            mspDomains: mspList,
            errorMessage: {
              ...errorMessage,
              emptyFields: false,
              emailCheck: false,
            },
          });
        }
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
        const responseData = await response.text();
        console.log("QR URL:", responseData);
        set({
          qrUrl: responseData,
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
    // debugger
    const { techInfo } = loginInputs;

    if (techInfo.authCode === "") {
      set({
        errorMessage: { ...errorMessage, emptyFields: true, emailCheck: false },
      });
      return;
    }

    const encodedEmail = encodeURIComponent(techInfo.email);
    const encodedToken = encodeURIComponent(techInfo.authCode);

    try {
      const response = await fetch(
        `${dbServiceUrl}/${mspCustomDomain}/technicianUsers/verify-2fa?email=${encodedEmail}&token=${techInfo.authCode}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          
          body: JSON.stringify({
            email: encodedEmail,
            token: techInfo.authCode,
          }),
        }
      );

      if (response.ok) {
        const tech = await response.json();
        set({
          errorMessage: {
            ...errorMessage,
            login2FA: false,
            emptyFields: false,
          },
        });
        navigator(`/${tech?.mspCustomDomain}/dashboard/${tech?.id}`);
        Cookie.set("session_token", tech?.id, { expires: 7 });
        Cookie.set("client_id", tech?.id, { expires: 7 });
      } else {
        // debugger
        set({
          errorMessage: {
            ...errorMessage,
            // login2FA: true,
            emptyFields: false,
          },
        });
      }
    } catch (e) {
      console.log(e);
    }
  },
  // handleTechnician2FALogin: async (navigator, mspCustomDomain) => {
  //   const { loginInputs, errorMessage } = get();
  //   // debugger
  //   const { techInfo } = loginInputs;

  //   if (techInfo.login2FA === "") {
  //     set({
  //       errorMessage: { ...errorMessage, emptyFields: true, emailCheck: false },
  //     });
  //     return;
  //   }

  //   const encodedEmail = encodeURIComponent(techInfo.email);
  //   const encodedToken = encodeURIComponent(techInfo.authCode);
  //   // const encodedToken = encodeURIComponent(techInfo.login2FA);

  //   try {
  //     const response = await fetch(
  //       `${dbServiceUrl}/${mspCustomDomain}/technicianUsers/verify-2fa`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
          
  //         body: JSON.stringify({
  //           email: encodedEmail,
  //           token: encodedToken,
  //         }),
  //       }
  //       // `${dbServiceUrl}/${mspCustomDomain}/technicianUsers/validateResetToken?email=${encodedEmail}&token=${encodedToken}`
  //     );

  //     if (response.ok) {
  //       const tech = await response.json();
  //       set({
  //         errorMessage: {
  //           ...errorMessage,
  //           login2FA: false,
  //           emptyFields: false,
  //         },
  //       });
  //       navigator(`/${tech?.mspCustomDomain}/dashboard/${tech?.id}`);
  //       Cookie.set("session_token", tech?.id, { expires: 7 });
  //       Cookie.set("client_id", tech?.id, { expires: 7 });
  //     } else {
  //       debugger
  //       set({
  //         errorMessage: {
  //           ...errorMessage,
  //           login2FA: true,
  //           emptyFields: false,
  //         },
  //       });
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   }
  // },

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
            login2FA: false,
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
            login2FA: true,
            emptyFields: false,
          },
        });
      }
    } catch (e) {
      console.log(e);
    }
  },

  handleActivateTechnicianCheck: async (mspCustomDomain) => {
    const { signupInputs, errorMessage } = get();
    const { techInfo } = signupInputs;
    try {
      const response = await fetch(
        `${dbServiceUrl}/${mspCustomDomain}/technicianUsers/signup?email=${techInfo.email}`
      );
      if (response.ok) {
        const technicians = await response.json();
        set({
          technicianList: technicians,
          errorMessage: {
            ...errorMessage,
            techEmailCheck: false,
          },
        });
      } else {
        console.log("Error");
        set({
          errorMessage: {
            ...errorMessage,
            techEmailCheck: true,
          },
        });
      }
    } catch (e) {
      console.log();
    }
  },

  handleActivateClientCheck: async (mspCustomDomain) => {
    const { signupInputs, errorMessage } = get();
    const { clientInfo } = signupInputs;
    try {
      const response = await fetch(
        `${dbServiceUrl}/${mspCustomDomain}/clientUsers/signup?email=${clientInfo.email}`
      );

      if (response.ok) {
        const clients = await response.json();
        set({
          clientList: clients,
          errorMessage: {
            ...errorMessage,
            clientEmailCheck: false,
          },
        });
      } else {
        set({
          errorMessage: {
            ...errorMessage,
            clientEmailCheck: true,
          },
        });
      }
    } catch (e) {
      console.log(e);
    }
  },

  handleActivateTechnician: async (navigator, mspCustomDomain) => {
    const { signupInputs, selectedTechnician } = get();
    const { techInfo } = signupInputs;

    const { id, connectWiseMembersId, primaryEmail, ...restTechnicianDetails } =
      selectedTechnician;

    const payload = {
      ...restTechnicianDetails,
      email: primaryEmail,
      password: techInfo.password,
      connectWiseMembersAutopilotDbId: id,
      connectWiseTechnicanId: connectWiseMembersId,
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
      email: selectedClient.connectWiseEmailId,
      password: clientInfo.password,
    };

    try {
      const response = await fetch(
        `${dbServiceUrl}/${mspCustomDomain}/clientUsers/createAccount?connectWiseCompanyId=${selectedClient.connectWiseCompanyId}&clientId=${selectedClient.id}`,
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
      userType: null,
      mspDomains: null,
      msp: null,
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
          role: "",
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
          brandLogoFile: null,
          webSiteUrl: "",
          companyAddress: {
            street: "",
            city: "",
            state: "",
            zipcode: "",
          },
          phoneNumber: "",
        },
        publicInfo: {
          email: "",
          firstName: "",
          lastName: "",
          phoneNumber: "",
          password: "",
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
        publicSignup: false,
        fileSize: false,
        fileMissing: false,
        emptyFields: false,
        emailCheck: false,
        clientEmailCheck: false,
        techEmailCheck: false,
        login2FA: false,
      },

      successMessage: false,

      showPassword: false,
    });
  },
}));

export default useMspStore;
