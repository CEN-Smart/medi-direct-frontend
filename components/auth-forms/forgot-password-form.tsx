"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  useForgotPasswordEmail,
  useResendPasswordOtp,
  useResetPassword,
} from "@/queries/user-verification";
import {
  ResetPassword,
  SendMail,
  resetPasswordSchema,
  sendMailSchema,
} from "@/schemas/mailing";
import { useEffect, useRef } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ToggleInputPassword } from "@/components/ui/toggle-input-password";
import { useOtpCountDown } from "@/hooks/use-otp-count-down";
import { animations } from "@/lib/animations";
import { useForgotPassword } from "@/state-management/validate-user";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";

export function ForgotPasswordForm() {
  const { isEmailSent, email, setEmail } = useForgotPassword();

  console.log(email);

  const form = useForm<SendMail | ResetPassword>({
    resolver: zodResolver(isEmailSent ? resetPasswordSchema : sendMailSchema),
    mode: "all",
  });
  const { mutate: resendEmail, isPending: pendingResendOtp } =
    useResendPasswordOtp(form.watch("email"));

  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardRef.current) {
      animations.pageEnter(cardRef.current);
    }
  }, []);

  useEffect(() => {
    if (isEmailSent) {
      setEmail(email);
    }
  }, [email, isEmailSent, setEmail]);

  const { countDown, setCountDown } = useOtpCountDown();

  const { mutate: forgotPassword, isPending: pendingEmailSent } =
    useForgotPasswordEmail(form.watch("email"));

  const { mutate: resetPassword, isPending: pendingResetPassword } =
    useResetPassword();

  const onSubmit = (data: SendMail | ResetPassword) => {
    if (isEmailSent) {
      const { token, newPassword } = data as ResetPassword;
      resetPassword({
        email,
        token,
        newPassword,
      });
    } else {
      forgotPassword(data as SendMail);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card ref={cardRef}>
          <CardHeader className="text-center">
            <div className="flex justify-center items-center bg-blue-600 mx-auto mb-4 rounded-lg w-12 h-12">
              <span className="font-bold text-white text-lg">MD</span>
            </div>
            <CardTitle className="text-blue-700 text-2xl">
              {isEmailSent ? "Reset Password" : "Forgot Password"}
            </CardTitle>
            <CardDescription>
              {isEmailSent
                ? "Enter the one-time password sent to your email and your new password."
                : "Enter your email to receive a one-time password for resetting your password."}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 w-full">
            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Email</FormLabel>
                  <FormControl className="w-full">
                    <div className="relative">
                      <Mail className="top-3 left-3 absolute w-4 h-4 text-gray-400" />
                      <Input
                        disabled={isEmailSent}
                        readOnly={isEmailSent}
                        value={isEmailSent ? email : field.value}
                        className="pl-10"
                        id="email"
                        type="email"
                        onChange={isEmailSent ? undefined : field.onChange}
                        placeholder="john.doe@example.com"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {isEmailSent && (
              <>
                <FormField
                  control={form.control}
                  name="token"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>One-Time Password</FormLabel>
                      <FormControl>
                        <InputOTP maxLength={6} {...field}>
                          <InputOTPGroup className="flex w-full">
                            {[...Array(6)].map((_, index) => (
                              <InputOTPSlot
                                className="flex-1"
                                key={index}
                                id={`otp-slot-${index}`}
                                index={index}
                              />
                            ))}
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>
                      <FormDescription>
                        Please enter the one-time password sent to your email.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Password */}
                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Password</FormLabel>
                      <FormControl className="w-full">
                        <ToggleInputPassword
                          onChange={field.onChange}
                          placeholder="Password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="text-right">
                  {countDown <= 0 ? (
                    <Button
                      disabled={pendingResendOtp}
                      type="button"
                      variant="ghost"
                      className="text-blue-700 text-sm hover:underline transition-all duration-300 ease-in-out"
                      onClick={() => {
                        resendEmail({ email });
                        setCountDown(60);
                      }}
                    >
                      {pendingResendOtp ? "Resending..." : "Resend OTP"}
                    </Button>
                  ) : (
                    <span className="text-gray-500 text-sm">
                      Resend OTP in {countDown} seconds
                    </span>
                  )}
                </div>
              </>
            )}
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button
              type="submit"
              className="bg-blue-700 hover:bg-blue-800 w-full"
              disabled={pendingEmailSent || pendingResetPassword}
            >
              {isEmailSent
                ? "Reset Password"
                : pendingEmailSent
                  ? "Sending..."
                  : pendingResetPassword
                    ? "Resetting..."
                    : "Send OTP"}
            </Button>
            <div className="text-sm text-center">
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="text-blue-700 hover:underline"
              >
                Login
              </Link>
            </div>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
