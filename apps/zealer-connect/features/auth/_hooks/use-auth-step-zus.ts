import { create } from "zustand";

type AuthStep = {
  currentStep: number;
  otp: string;
  userType: "athlete" | "lead";
  setCurrentStep: (step: number) => void;
  setOtp: (otp: string) => void;
  setUserType: (userType: "athlete" | "lead") => void;
};

export const useAuthStepZus = create<AuthStep>((set) => ({
  currentStep: 1,
  otp: "",
  userType: "athlete",
  setCurrentStep: (currentStep) => set({ currentStep }),
  setOtp: (otp) => set({ otp }),
  setUserType: (userType: "athlete" | "lead") => set({ userType }),
}));
