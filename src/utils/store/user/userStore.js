import { create } from "zustand";
import useLocalStorageStore from "../localstorage/localStorageStore";
import useCookiesStore from "../cookies/cookiesStore";
import { googleLogout } from "@react-oauth/google";
import { validateField } from "../../../utils/formValidations";

import useAuthStore from "../auth/authStore";
import useTicketConversationsStore from "../interaction/conversations/ticketConversationsStore";
import useEngineerStore from "../assistant/sections/engineer/engineerStore";

const useUserStore = create((set, get) => ({
  user: null,
  addressFields: ["street", "city", "zipcode", "state"],
  editing: {},
  deleting: false,
  confirmationEmail: "",
  errorMessage: "",
  userInputs: {},
  userPasswords: {
    oldPassword: "",
    newPassword: "",
  },
  passwordError: false,

  setDeleting: (value) => set({ deleting: value }),
  setConfirmationEmail: (value) => set({ confirmationEmail: value }),
  setPasswordError: (value) => set({ passwordError: value }),
  setUserPasswords: (field, value) => {
    const { userPasswords } = get();
    const updatedPasswords = userPasswords;
    updatedPasswords[field] = value;
    set({ userPasswords: updatedPasswords });
  },

  initializeUser: (initialUser) => {
    set({
      user: initialUser,
      userInputs: {
        ...initialUser,
        companyAddress: {
          ...initialUser.companyAddress,
        },
      },
    });
  },

  handleAddFavoriteToUser: (newFavorite) => {
    set((state) => ({
      user: {
        ...state.user,
        favorite: [...(state.user.favorite || []), newFavorite],
      },
    }));
  },

  handleRemoveFavoriteFromuser: (favoriteToRemove) => {
    set((state) => ({
      user: {
        ...state.user,
        favorite: (state.user.favorite || []).filter(
          (fav) => fav !== favoriteToRemove
        ),
      },
    }));
  },

  handleStartEdit: (field) => {
    set((state) => ({
      editing: {
        ...state.editing,
        [field]: true,
      },
    }));
  },
  handleCancelEdit: (field) => {
    const { user, addressFields } = get();
    if (addressFields.includes(field)) {
      set((state) => ({
        userInputs: {
          ...state.userInputs,
          companyAddress: {
            ...state.userInputs.companyAddress,
            [field]: user.companyAddress[field],
          },
        },
        editing: {
          ...state.editing,
          [field]: false,
        },
      }));
    } else {
      set((state) => ({
        userInputs: {
          ...state.userInputs,
          [field]: user[field],
        },
        editing: {
          ...state.editing,
          [field]: false,
        },
      }));
    }
  },

  handlePasswordChange: (field, value) => {
    set((state) => ({
      userPasswords: {
        ...state.userPasswords,
        [field]: value,
      },
    }));
  },

  handleResetPassword: async () => {
    const { editing, userInputs, userPasswords } = get();

    try {
      const response = await fetch(
        "https://etech7-wf-etech7-db-service.azuremicroservices.io/resetPassword",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            emailId: userInputs.email,
            password: userPasswords.oldPassword,
            newPassword: userPasswords.newPassword,
          }),
        }
      );
      if (!response.ok) {
        set({ passwordError: true });
      } else {
        console.log("Password Changed!");
        set({
          passwordError: false,
          userPasswords: { oldPassword: "", newPassword: "" },
          editing: { ...editing, password: false },
        });
      }
    } catch (e) {
      console.log(e);
    }
  },

  handleEditOnChange: (field, value) => {
    const { addressFields } = get();

    if (addressFields.includes(field)) {
      set((state) => ({
        userInputs: {
          ...state.userInputs,
          companyAddress: {
            ...state.userInputs.companyAddress,
            [field]: value,
          },
        },
      }));
    } else {
      set((state) => ({
        userInputs: {
          ...state.userInputs,
          [field]: value,
        },
      }));
    }
  },

  handleSaveChanges: async (field, input) => {
    const { userInputs, addressFields } = get();

    const validationError = validateField(field, input);
    if (validationError) {
      set({ errorMessage: validationError });
      return;
    }

    let updatedData = {
      email: userInputs.email,
    };

    if (addressFields.includes(field)) {
      updatedData.companyAddress = {
        ...userInputs.companyAddress,
        [field]: input,
      };
    } else {
      updatedData[field] = input;
    }

    try {
      const response = await fetch(
        `https://etech7-wf-etech7-db-service.azuremicroservices.io/editClientUserProfile`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (!response.ok) {
        console.log("Error Saving");
      } else {
        set((state) => ({
          user: {
            ...state.user,
            ...updatedData,
          },
          editing: {
            ...state.editing,
            [field]: false,
          },
          userInputs: {
            ...state.userInputs,
            ...(addressFields.includes(field)
              ? { companyAddress: updatedData.companyAddress }
              : { [field]: updatedData[field] }),
          },
        }));
      }
    } catch (e) {
      console.log(e);
    }
  },

  handleDeleteUser: async (navigate) => {
    const { setShowLoginForm, setShowSignupForm } = useAuthStore.getState();
    const { clearStorage } = useLocalStorageStore.getState();
    const { clearCookies } = useCookiesStore.getState();
    const { user, confirmationEmail } = get();
    if (confirmationEmail !== user.businessEmail) {
      return;
    }

    try {
      const response = await fetch(
        `https://etech7-wf-etech7-db-service.azuremicroservices.io/deleteUser?id=${id}`
      );
      if (response.ok) {
        clearStorage();

        clearCookies();

        googleLogout();

        navigate("/auth/login");
        setShowLoginForm(false);
        setShowSignupForm(false);
      } else {
        console.log("Error Deleting");
      }
    } catch (e) {
      console.log(e);
    }
  },

  handleLogout: async () => {
    const { setShowLoginForm, setShowSignupForm } = useAuthStore.getState();
    const { clearStorage } = useLocalStorageStore.getState();
    const { clearCookies } = useCookiesStore.getState();
    const { clearCredentials } = useAuthStore.getState();
    const { clearInteraction } = useTicketConversationsStore.getState();
    const { clearEngineer } = useEngineerStore.getState();

    set({ user: null });

    clearStorage();
    clearCookies();
    clearCredentials();
    clearInteraction();
    clearEngineer();
    // navigate("/auth/login");
    setShowLoginForm(false);
    setShowSignupForm(false);
  },

  
}));

export default useUserStore;
