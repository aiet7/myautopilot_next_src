import { create } from "zustand";

const inputRef = { current: null };
const textAreaRef = { current: null };
const docRef = { current: null };

const useRefStore = create((set, get) => ({
  inputRef,
  textAreaRef,
  docRef,
}));

export default useRefStore;
