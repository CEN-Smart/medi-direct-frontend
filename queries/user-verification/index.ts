import { ConfirmMail, ResetPassword, SendMail } from "@/schemas/mailing";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import {
  useForgotPassword,
  useUserValidation,
} from "@/state-management/validate-user";
import { usePathname, useRouter } from "next/navigation";

import { ErrorResponse } from "@/types";
import { UserVerificationResponse } from "@/types/onboarding";
import { apiClient } from "@/services/api";
import { toast } from "sonner";

//1.  Verify user by sending a request to the server
const sendUserEmail = async ({
  email,
}: SendMail): Promise<UserVerificationResponse> => {
  const response = await apiClient.post({
    url: "/send",
    body: { email },
    auth: false,
  });
  return response;
};
export const useSendUserEmail = (
  email: string,
  options?: UseMutationOptions<
    UserVerificationResponse,
    ErrorResponse,
    SendMail,
    unknown
  >,
) => {
  const { onEmailSent, setEmail } = useUserValidation();

  return useMutation({
    mutationFn: sendUserEmail,
    onSuccess: (data) => {
      if (data.status === "success") {
        onEmailSent(true);
        setEmail(email);
        toast.success(
          typeof data.message === "string"
            ? data.message
            : "Email sent successfully",
        );
      }

      if (data.status === "fail") {
        onEmailSent(false);
        toast.error(
          typeof data.message !== "string"
            ? data.message.map((msg) => msg.message).join(", ")
            : data.message,
        );
      }
    },
    onError: (error) => {
      onEmailSent(false);
      toast.error(error.response?.data.message || "Failed to send email");
    },
    ...options,
  });
};

//2.  Resent the OTP to the user's email
const resentOtp = async ({
  email,
}: SendMail): Promise<UserVerificationResponse> => {
  const response = await apiClient.post({
    url: "/resend-token",
    body: { email },
    auth: false,
  });
  return response;
};
export const useResendOtp = (
  email: string,
  options?: UseMutationOptions<
    UserVerificationResponse,
    ErrorResponse,
    SendMail,
    unknown
  >,
) => {
  const pathname = usePathname();
  const isForgotPassword = pathname.includes("forgot-password");
  const { onEmailSent, setEmail } = useUserValidation();
  const { onEmailSent: onEmailSentForgot, setEmail: setEmailForgot } =
    useForgotPassword();

  return useMutation({
    mutationFn: resentOtp,
    onSuccess: (data) => {
      if (data.status === "success") {
        onEmailSent(true);
        setEmail(email);
        if (isForgotPassword) {
          onEmailSentForgot(true);
          setEmailForgot(email);
        }
        toast.success(
          typeof data.message === "string"
            ? data.message
            : "OTP resent successfully",
        );
      }

      if (data.status === "fail") {
        toast.error(
          typeof data.message !== "string"
            ? data.message.map((msg) => msg.message).join(", ")
            : data.message,
        );
      }
    },
    onError: (error) => {
      toast.error(error.response?.data.message || "Failed to resend OTP");
    },
    ...options,
  });
};

//3.  Resent Password OTP to the user's email
const resendPasswordOtp = async ({
  email,
}: SendMail): Promise<UserVerificationResponse> => {
  const response = await apiClient.post({
    url: "/resend-reset",
    body: { email },
    auth: false,
  });
  return response;
};

export const useResendPasswordOtp = (
  email: string,
  options?: UseMutationOptions<
    UserVerificationResponse,
    ErrorResponse,
    SendMail,
    unknown
  >,
) => {
  const { onEmailSent, setEmail } = useForgotPassword();

  return useMutation({
    mutationFn: resendPasswordOtp,
    onSuccess: (data) => {
      if (data.status === "success") {
        onEmailSent(true);
        setEmail(email);
        toast.success(
          typeof data.message === "string"
            ? data.message
            : "OTP resent successfully",
        );
      }

      if (data.status === "fail") {
        onEmailSent(false);
        toast.error(
          typeof data.message !== "string"
            ? data.message.map((msg) => msg.message).join(", ")
            : data.message,
        );
      }
    },
    onError: (error) => {
      onEmailSent(false);
      toast.error(error.response?.data.message || "Failed to resend OTP");
    },
    ...options,
  });
};

//4.  Validate user by confirming the OTP sent to the email
const validateUser = async ({
  email,
  token,
}: ConfirmMail): Promise<UserVerificationResponse> => {
  const response = await apiClient.post({
    url: "/verify",
    body: { email, token },
    auth: false,
  });
  return response;
};

export const useValidateUser = (
  options?: UseMutationOptions<
    UserVerificationResponse,
    ErrorResponse,
    ConfirmMail,
    unknown
  >,
) => {
  const { onEmailVerified } = useUserValidation();

  return useMutation({
    mutationFn: validateUser,
    onSuccess: (data) => {
      if (data.status === "success") {
        onEmailVerified(true);
        toast.success(
          typeof data.message === "string"
            ? data.message
            : "Email verified successfully",
        );
      }

      if (data.status === "fail") {
        onEmailVerified(false);
        toast.error(
          typeof data.message !== "string"
            ? data.message.map((msg) => msg.message).join(", ")
            : data.message,
        );
      }
    },
    onError: (error) => {
      onEmailVerified(false);
      toast.error(error.response?.data.message || "Failed to verify email");
    },
    ...options,
  });
};

//5. Forgot password functionality is handled in the same way as user verification,
const forgotPassword = async ({
  email,
}: SendMail): Promise<UserVerificationResponse> => {
  const response = await apiClient.post({
    url: "/forgot-password",
    body: { email },
    auth: false,
  });
  return response;
};

export const useForgotPasswordEmail = (
  email: string,
  options?: UseMutationOptions<
    UserVerificationResponse,
    ErrorResponse,
    SendMail,
    unknown
  >,
) => {
  const { onEmailSent, setEmail } = useForgotPassword();

  return useMutation({
    mutationFn: forgotPassword,
    onSuccess: (data) => {
      if (data.status === "success") {
        onEmailSent(true);
        setEmail(email);
        toast.success(
          typeof data.message === "string"
            ? data.message
            : "OTP resent successfully",
        );
      }

      if (data.status === "fail") {
        onEmailSent(false);
        toast.error(
          typeof data.message !== "string"
            ? data.message.map((msg) => msg.message).join(", ")
            : data.message,
        );
      }
    },
    onError: (error) => {
      onEmailSent(false);
      toast.error(error.response?.data.message || "Failed to send email");
    },
    ...options,
  });
};

//6. Reset password functionality is handled in the same way as user verification,
const resetPassword = async ({
  email,
  token,
  newPassword,
}: ResetPassword): Promise<UserVerificationResponse> => {
  const response = await apiClient.post({
    url: "/reset-password",
    body: { email, token, newPassword },
    auth: false,
  });
  return response;
};
export const useResetPassword = (
  options?: UseMutationOptions<
    UserVerificationResponse,
    ErrorResponse,
    ResetPassword,
    unknown
  >,
) => {
  const { resetAll } = useForgotPassword();
  const router = useRouter();

  return useMutation({
    mutationFn: resetPassword,
    onSuccess: (data) => {
      if (data.status === "success") {
        resetAll();
        router.push("/auth/login");
        toast.success(
          typeof data.message === "string"
            ? data.message
            : "Password reset successfully",
        );
      }

      if (data.status === "fail") {
        toast.error(
          typeof data.message !== "string"
            ? data.message.map((msg) => msg.message).join(", ")
            : data.message,
        );
      }
    },
    onError: (error) => {
      toast.error(error.response?.data.message || "Failed to reset password");
    },
    ...options,
  });
};
