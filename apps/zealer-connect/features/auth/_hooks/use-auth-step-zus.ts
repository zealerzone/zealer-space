import { create } from "zustand";

type AuthStep = {
  currentStep: number;
  setCurrentStep: (step: number) => void;
};

export const useAuthStepZus = create<AuthStep>((set) => ({
  currentStep: 1,
  setCurrentStep: (step) => set({ currentStep: step }),
}));
