import { create } from "zustand";
import Cookie from "js-cookie";

import {
  validateInput,
  isInputEmpty,
  isEmailInputValid,
} from "../../../utils/formValidations.js";

const useAuthStore = create((set, get) => ({
  email: "",
  password: "",
  firstName: "",
  lastName: "",
  phoneNumber: "",
  companyName: "",
  companyId: null,
  companyAddress: {
    street: "",
    city: "",
    zipcode: "",
    state: "",
  },
  errorMessage: "",
  showLoginForm: false,
  showSignupForm: false,
  loading: false,

  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  setFirstName: (firstName) => set({ firstName }),
  setLastName: (lastName) => set({ lastName }),
  setCompanyId: (companyId) => set({ companyId }),
  setCompanyName: (companyName) => set({ companyName }),
  setPhoneNumber: (phoneNumber) => set({ phoneNumber }),
  setCompanyAddress: (field, value) =>
    set((prevState) => ({
      companyAddress: { ...prevState.companyAddress, [field]: value },
    })),
  setErrorMessage: (errorMessage) => set({ errorMessage }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setShowLoginForm: (isShown) => set({ showLoginForm: isShown }),
  setShowSignupForm: (isShown) => set({ showSignupForm: isShown }),

  handleGoogleAuth: (navigator) => {
    const handleSuccess = async (response) => {
      set({ loading: true });
      try {
        const tokenResponse = await fetch(
          // `http://localhost:9019/getGoogleToken?code=${response.code}`
          `https://etech7-wf-etech7-db-service.azuremicroservices.io/getGoogleToken?code=${response.code}`
        );

        const token = await tokenResponse.json();

        const user = {
          accessToken: token.access_token,
          refreshToken: token.refresh_token,
          expiryTime: token.expiryTime,
          firstName: token.firstName,
          lastName: token.lastName,
          businessEmail: token.email,
          businessName: "",
          businessPhone: "",
          address: {
            street: "",
            city: "",
            zipcode: "",
            state: "",
          },
        };
        const validateGoogleResponse = await fetch(
          `https://etech7-wf-etech7-db-service.azuremicroservices.io/validateUser?token=google`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
          }
        );
        if (validateGoogleResponse.status === 200) {
          const googleUser = await validateGoogleResponse.json();
          navigator(`/dashboard/${googleUser.id}`);
          Cookie.set("Secure-next.session-token-g", token.id_token, {
            expires: 7,
            secure: true,
            sameSite: "lax",
          });
          Cookie.set("user_id", googleUser.id, {
            expires: 7,
          });
        } else {
          console.log("error");
        }
      } catch (e) {
        console.log(e);
      } finally {
        set({ loading: false });
      }
    };

    return handleSuccess;
  },

  handleMicrosoftAuth: async (navigator, err, data) => {
    set({ loading: true });
    try {
      const {
        accessToken,
        account: { name, username },
      } = data;
      const fullName = name.split(" ");

      const user = {
        firstName: fullName[0],
        lastName: fullName[1],
        businessEmail: username,
        businessName: "",
        businessPhone: "",
        address: {
          street: "",
          city: "",
          zipcode: "",
          state: "",
        },
      };

      const validateMicrosoftResponse = await fetch(
        `https://etech7-wf-etech7-db-service.azuremicroservices.io/validateUser?token=microsoft`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );

      if (validateMicrosoftResponse.status === 200) {
        const microsoftUser = await validateMicrosoftResponse.json();
        navigator(`/dashboard/${microsoftUser.id}`);
        Cookie.set("microsoft_session_token", accessToken, {
          expires: 7,
        });
        Cookie.set("user_id", microsoftUser.id, {
          expires: 7,
        });
      } else {
        set({ errorMessage: "Error with Microsoft Login." });
      }
    } catch (e) {
      console.log(e);
    } finally {
      set({ loading: false });
    }
  },

  handleLoginEmailCheck: async () => {
    const { email } = get();
    if (isInputEmpty(email) || !isEmailInputValid(email)) {
      set({ errorMessage: "A valid email is required." });
      return;
    }

    try {
      const response = await fetch(
        `https://etech7-wf-etech7-db-service.azuremicroservices.io/getUserByEmail?email=${email}`
      );
      const user = await response.json();
      if (user.message === "No Users") {
        set({ errorMessage: "Account does not exists.  Please sign up." });
      } else if (user.password === null) {
        set({
          errorMessage:
            "Account was created with a provider sign in.  Please sign in with your provider.",
        });
      } else {
        set({
          errorMessage: "",
          showLoginForm: true,
        });
      }
    } catch (e) {
      console.log(e);
    }
  },

  handleLoginCredentialsAuth: async (navigator) => {
    const { email, password } = get();
    if (isInputEmpty(password)) {
      set({ errorMessage: "A password is required." });
      return;
    }
    const encodedClientUser = encodeURIComponent(email);
    const encodedClientPassword = encodeURIComponent(password);

    try {
      const response = await fetch(
        `https://etech7-wf-etech7-db-service.azuremicroservices.io/signin?emailId=${encodedClientUser}&password=${encodedClientPassword}`
      );
      if (response.ok) {
        set({ loading: true, showLoginForm: false, errorMessage: "" });
        const user = await response.json();
        navigator(`/dashboard/${user.id}`);
        Cookie.set("session_token", user.id, { expires: 7 });
        Cookie.set("client_id", user.id, { expires: 7 });
      } else {
        set({ errorMessage: "Invalid username or password." });
      }
    } catch (e) {
      console.log(e);
    } finally {
      set({ loading: false });
    }
  },

  handleSignupEmailCheck: async () => {
    const { email } = get();
    if (isInputEmpty(email) || !isEmailInputValid(email)) {
      set({ errorMessage: "A valid email is required." });
      return;
    }

    const encodedClientUser = encodeURIComponent(email);

    try {
      const response = await fetch(
        `https://etech7-wf-etech7-db-service.azuremicroservices.io/signup?emailId=${encodedClientUser}`
      );
      const text = await response.text();
      set({ errorMessage: "" });
      if (text === "Email already exists. Please sign in.") {
        set({ errorMessage: "Account exists." });
      } else {
        const parsedUser = JSON.parse(text);
        const user = Array.isArray(parsedUser) ? parsedUser[0] : parsedUser;
        set({
          showSignupForm: true,
          firstName: user.firstName || "",
          lastName: user.lastName || "",
          companyName: user.companyName || user.company?.name || "",
          companyId: user.companyId || user.company?.id || "",
          phoneNumber: user.phoneNumber || user.defaultPhoneNbr || "",
        });
      }
    } catch (e) {
      console.log(e);
    }
  },

  handleSignupCredentialsAuth: async (navigator) => {
    const {
      firstName,
      lastName,
      companyName,
      companyId,
      email,
      phoneNumber,
      companyAddress,
      password,
    } = get();

    const user = {
      companyId: companyId,
      firstName: firstName,
      lastName: lastName,
      companyName: companyName,
      email: email,
      phoneNumber: phoneNumber,
      companyAddress: companyAddress,
      password: password,
    };

    const validationError = validateInput(user);
    if (validationError) {
      set({ errorMessage: validationError });
      return;
    }

    try {
      const response = await fetch(
        `https://etech7-wf-etech7-db-service.azuremicroservices.io/createAccount`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );

      set({ errorMessage: "" });
      if (response.ok) {
        navigator("/auth/login");
      } else {
        set({ errorMessage: "Error occurred during sign up." });
      }
    } catch (e) {
      console.log(e);
    } finally {
      set({ loading: false, showSignupForm: false });
    }
  },

  handleShowSignup: (navigator) => {
    navigator("/auth/signup");
    set({ errorMessage: "", showSignupForm: false });
  },

  handleShowLogin: (navigator) => {
    navigator("/auth/login");
    set({ errorMessage: "", showSignupForm: false });
  },

  clearCredentials: () => {
    set({
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      companyName: "",
      companyId: null,
      companyAddress: {
        street: "",
        city: "",
        zipcode: "",
        state: "",
      },
    });
  },
}));

export default useAuthStore;
