import { ForgotPasswordForm } from "../auth-forms/forgot-password-form";

export function ForgotPassword() {
  return (
    <div className="auth-container">
      <main className="auth-card">
        <ForgotPasswordForm />
      </main>
    </div>
  );
}
