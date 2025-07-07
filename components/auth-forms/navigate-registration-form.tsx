"use client";

import { SignUpForm } from "./registration-form";
import { ValidateUserForm } from "./validate-user-form";
import { useUserValidation } from "@/state-management/validate-user";

export function Register() {
  const { isEmailVerified } = useUserValidation();
  return (
    <div className="auth-container">
      <main className="auth-card">
        {isEmailVerified ? <SignUpForm /> : <ValidateUserForm />}
      </main>
    </div>
  );
}
