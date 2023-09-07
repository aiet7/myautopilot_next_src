import { create } from "zustand";

const inputRef = { current: null };
const textAreaRef = { current: null };

const useRefStore = create((set, get) => ({
  inputRef,
  textAreaRef,
}));

export default useRefStore;