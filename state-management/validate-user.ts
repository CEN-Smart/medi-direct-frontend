import { create } from "zustand";
import { persist } from "zustand/middleware";

const userValidationKey = "user-validation";
const forgotPasswordKey = "forgot-password";

type User = {
  email: string;
  isEmailSent: boolean;
  onEmailSent: (isSent: boolean) => void;
  setEmail: (email: string) => void;
  isEmailVerified: boolean;
  onEmailVerified: (isVerified: boolean) => void;
  resetAll: () => void;
};

export const useUserValidation = create<User>()(
  persist(
    (set) => ({
      email: "",
      isEmailSent: false,
      isEmailVerified: false,
      onEmailVerified: (isVerified) => set({ isEmailVerified: isVerified }),
      onEmailSent: (isSent) => set({ isEmailSent: isSent }),
      setEmail: (email) => set({ email }),
      resetAll: () =>
        set({
          email: "",
          isEmailSent: false,
          isEmailVerified: false,
        }),
    }),
    {
      name: userValidationKey,
    },
  ),
);

type ForgotPassword = {
  email: string;
  isEmailSent: boolean;
  onEmailSent: (isSent: boolean) => void;
  setEmail: (email: string) => void;
  resetAll: () => void;
};

export const useForgotPassword = create<ForgotPassword>()(
  persist(
    (set) => ({
      email: "",
      isEmailSent: false,
      onEmailSent: (isSent) => set({ isEmailSent: isSent }),
      setEmail: (email) => set({ email }),
      resetAll: () =>
        set({
          email: "",
          isEmailSent: false,
        }),
    }),
    {
      name: forgotPasswordKey,
    },
  ),
);
