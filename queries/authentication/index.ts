import { LoginData, SignUp } from "@/schemas/auth";
import { SignInResponse, SignUpResponse } from "@/types/onboarding";
import {
  UseMutationOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { clearLocalStorage, setToLocalStorage } from "@/helpers";

import { ErrorResponse } from "@/types";
import { allKeysToValidate } from "../keys";
import { apiClient } from "@/services/api";
import { toast } from "sonner";
import { tokenKey } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useUserValidation } from "@/state-management/validate-user";

// Sign up a new user
const signUpUser = async (data: SignUp): Promise<SignUpResponse> => {
  const response = await apiClient.post({
    url: "/sign-up",
    body: data,
    auth: false,
  });
  return response;
};

export const useSignUpUser = (
  ref: React.RefObject<HTMLFormElement | null>,
  options?: UseMutationOptions<SignUpResponse, ErrorResponse, SignUp, unknown>,
) => {
  const router = useRouter();
  const { resetAll } = useUserValidation();
  return useMutation({
    mutationFn: signUpUser,
    onSuccess: (data) => {
      if (data.status === "success") {
        toast.success(
          typeof data.message === "string"
            ? data.message
            : "Sign up successful",
        );
        if (ref.current) {
          ref.current.reset();
        }
        resetAll();
        router.push("/auth/login");
      } else if (data.status === "fail") {
        toast.error(
          typeof data.message !== "string"
            ? data.message.map((msg) => msg.message)
            : data.message,
        );
        if (ref.current) {
          ref.current.reset();
        }
      }
    },
    onError: (error) => {
      toast.error(error.response?.data.message || "Failed to sign up");
    },
    ...options,
  });
};

// Login a user
const loginUser = async (data: LoginData): Promise<SignInResponse> => {
  const response = await apiClient.post({
    url: "/sign-in",
    body: data,
    auth: false,
  });
  return response;
};
export const useLoginUser = (
  ref: React.RefObject<HTMLFormElement | null>,
  options?: UseMutationOptions<
    SignInResponse,
    ErrorResponse,
    LoginData,
    unknown
  >,
) => {
  const router = useRouter();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      if (data.status === "success") {
        toast.success(
          typeof data.message === "string" ? data.message : "Login successful",
        );
        // Store user token in local storage
        setToLocalStorage(tokenKey, data.token);
        // Reset form if ref is provided
        if (ref.current) {
          ref.current.reset();
        }
        router.push("/dashboard");
        // Redirect to user dashboard
      } else if (data.status === "fail") {
        toast.error(
          typeof data.message !== "string"
            ? data.message.map((msg) => msg.message)
            : data.message,
        );
        // Reset form if ref is provided
        if (ref.current) {
          ref.current.reset();
        }
      }
    },
    onError: (error) => {
      toast.error(error.response?.data.message || "Failed to log in");
    },
    ...options,
  });
};

// Logout a user
export const useLogoutUser = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  return () => {
    // Clear all queries and reset the query client
    allKeysToValidate.forEach((key) => {
      queryClient.invalidateQueries({ queryKey: [key] });
    });
    queryClient.clear();
    // Clear local storage
    clearLocalStorage();
    // Redirect to login page
    router.push("/login");
  };
};
