import { create } from "zustand";

const inputRef = { current: null };

const useRefStore = create((set, get) => ({
  inputRef,
}));

export default useRefStore;
