import { create } from "zustand";

const useBrandingStore = create((set, get) => ({
  primaryColor: { color: "#FF0000", showColorPicker: false },
  primaryButtonColor: { color: "#FF0000", showColorPicker: false },
  secondaryButtonColor: { color: "#FF0000", showColorPicker: false },

  setPrimaryColor: (color) =>
    set((state) => ({ primaryColor: { ...state.primaryColor, color } })),
  setPrimaryButtonColor: (color) =>
    set((state) => ({
      primaryButtonColor: { ...state.primaryButtonColor, color },
    })),
  setSecondaryButtonColor: (color) =>
    set((state) => ({
      secondaryButtonColor: { ...state.secondaryButtonColor, color },
    })),

  handleShowColorPicker: (colorKey) =>
    set((state) => ({
      [colorKey]: {
        ...state[colorKey],
        showColorPicker: !state[colorKey].showColorPicker,
      },
    })),
}));

export default useBrandingStore;
