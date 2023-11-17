import { create } from "zustand";

const storeResetFns = new Set();

const resetAllStores = () => {
  storeResetFns.forEach((resetFn) => resetFn());
};


