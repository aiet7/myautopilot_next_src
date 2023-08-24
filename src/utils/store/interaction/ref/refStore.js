import { create } from "zustand";

const latestMessageRef = { current: null };
const chatContainerRef = { current: null };
const controllerRef = { current: null };
const inputRef = { current: null };
const messageIdRef = { current: null };

const useRefStore = create((set, get) => ({
  latestMessageRef,
  chatContainerRef,
  controllerRef,
  inputRef,
  messageIdRef,
}));

export default useRefStore;
