import { create } from "zustand";

const listRef = { current: null };
const copyRef = { current: null };
const textAreaRef = { current: null };

const useRefStore = create((set, get) => ({
  listRef,
  copyRef,
  textAreaRef,
}));

export default useRefStore;
