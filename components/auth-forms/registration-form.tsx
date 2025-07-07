"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Mail, Phone, User } from "lucide-react";
import { SignUp, signUpSchema } from "@/schemas/auth";
import { useEffect, useRef } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { ToggleInputPassword } from "../ui/toggle-input-password";
import { animations } from "@/lib/animations";
import { useForm } from "react-hook-form";
import { useSignUpUser } from "@/queries/authentication";
import { useUserValidation } from "@/state-management/validate-user";
import { zodResolver } from "@hookform/resolvers/zod";

export function SignUpForm() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const { email } = useUserValidation();
  const form = useForm<SignUp>({
    resolver: zodResolver(signUpSchema),
    mode: "all",
    defaultValues: {
      email: email || "",
    },
  });

  const { mutate: signUp, isPending: pendingSignUp } = useSignUpUser(formRef);

  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardRef.current) {
      animations.pageEnter(cardRef.current);
    }
  }, []);

  async function handleSubmit(data: SignUp) {
    signUp({
      ...data,
      email: email || data.email,
    });

    if (formRef.current) {
      formRef.current.reset();
    }
  }

  return (
    <div>
      <Card ref={cardRef}>
        <CardHeader className="pb-6 text-center">
          <div className="flex justify-center items-center bg-blue-600 mx-auto mb-4 rounded-lg w-12 h-12">
            <span className="font-bold text-white text-lg">MD</span>
          </div>
          <CardTitle className="font-bold text-gray-900 text-2xl">
            Create Account
          </CardTitle>
          <p className="text-gray-600">
            Join MediDirect to bring your diagnostic centre online and reach
            more patients.
          </p>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form
              ref={formRef}
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-4"
            >
              <div className="gap-4 grid grid-cols-2">
                <div className="relative">
                  <FormField
                    name="firstName"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="sr-only">First Name</FormLabel>
                        <FormControl>
                          <div>
                            <User className="top-3 left-3 absolute w-4 h-4 text-gray-400" />
                            <Input
                              {...field}
                              type="text"
                              placeholder="First Name"
                              className="pl-10"
                            />
                            <FormMessage />
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="relative">
                  <FormField
                    name="lastName"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="sr-only">Last Name</FormLabel>
                        <FormControl>
                          <div>
                            <User className="top-3 left-3 absolute w-4 h-4 text-gray-400" />
                            <Input
                              {...field}
                              type="text"
                              placeholder="Last Name"
                              className="pl-10"
                            />
                            <FormMessage />
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="relative">
                <FormField
                  name="email"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="sr-only">Email Address</FormLabel>
                      <FormControl>
                        <div>
                          <Mail className="top-3 left-3 absolute w-4 h-4 text-gray-400" />
                          <Input
                            id="email"
                            value={email || field.value}
                            readOnly
                            disabled
                            type="email"
                            placeholder="Email Address"
                            className="pl-10"
                          />
                          <FormMessage />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div className="relative">
                <FormField
                  name="phone"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="sr-only">Phone Number</FormLabel>
                      <FormControl>
                        <div>
                          <Phone className="top-3 left-3 absolute w-4 h-4 text-gray-400" />
                          <Input
                            {...field}
                            type="tel"
                            placeholder="+234XXXXXXXXXX"
                            className="pl-10"
                          />
                          <FormMessage />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div className="relative">
                <FormField
                  name="password"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="sr-only">Password</FormLabel>
                      <FormControl>
                        <div>
                          <ToggleInputPassword
                            {...field}
                            placeholder="Password"
                          />
                          <FormMessage />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex items-center space-x-2">
                <FormField
                  name="agreedToTerms"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="terms"
                            checked={field.value}
                            onCheckedChange={(checked) =>
                              field.onChange(checked as boolean)
                            }
                          />
                          <label
                            htmlFor="terms"
                            className="text-gray-600 text-sm"
                          >
                            I agree to the{" "}
                            <Link
                              href="/terms"
                              className="text-blue-600 hover:underline"
                            >
                              Terms of Service
                            </Link>{" "}
                            and{" "}
                            <Link
                              href="/privacy"
                              className="text-blue-600 hover:underline"
                            >
                              Privacy Policy
                            </Link>
                          </label>
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 w-full"
                disabled={pendingSignUp || !form.formState.isValid}
              >
                {pendingSignUp ? "Creating Account..." : "Create Account"}
              </Button>
            </form>
          </Form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="font-medium text-blue-600 hover:underline"
              >
                Sign In
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
