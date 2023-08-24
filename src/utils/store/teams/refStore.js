import { create } from "zustand";
const inputRef = { current: null };
const latestMessageRef = { current: null };
const chatContainerRef = { current: null };

const useRefStore = create((set, get) => ({
  inputRef,
  latestMessageRef,
  chatContainerRef,
}));

export default useRefStore;
